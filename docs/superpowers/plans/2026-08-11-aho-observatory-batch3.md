# Aho-Corasick Observatory (Batch 3/3) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Aho-Corasick (`search-aho`) to the observatory — VCR transport + clickable step log + hidden source (code drawer) + example input (patterns + text) + fullscreen enlargement — by building the trie / failure links / scan / layout dynamically from arbitrary input.

**Architecture:** One self-contained `viz_aho_frames.js` with a pure `ahoFrames(patterns, text)` that builds the trie, computes failure links via BFS, scans the text, lays out node positions, and returns per-frame display state. One `renderAho(methodId)` in `js/domains/aho.js` (dynamic host + patterns/text inputs + examples + `buildStepWorkbench`) with an SVG `paint` closing over the automaton. Delete the hard-coded `viz_aho.js`. Correctness gate: a unit test asserting the match set equals a naive multi-pattern scan.

**Tech Stack:** Vanilla JS, plain CSS, Playwright E2E + `node --test`. No app build step.

## Global Constraints

- NEVER modify `js/cloud-config.js`; never hand-edit `js/code_db.js`.
- Do NOT modify `buildFrameControls`/`buildStepWorkbench`, the sort/numeric-search/string-search observatory, or any non-`search-aho` method.
- Method counts unchanged (114).
- Preserve DOM hooks: `.aho-svg circle`, `[data-testid="aho-phase"]`, `[data-testid="aho-stats"]`, `.aho-matches`, `.aho-char`/`.aho-char-cur`, `.aho-textrow`.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-11-aho-observatory-batch3-design.md`.

---

## File Structure

- `js/viz/viz_aho_frames.js` — NEW: `ahoFrames` + defaults; dual-export.
- `js/domains/aho.js` — NEW: `renderAho` + paint + examples + `esc`; attaches `search-aho`.
- `js/app.js` — add `codeDrawer:true` to the `search-aho` METHODS row (no updateLayout change).
- `index.html` — load the 2 new scripts; remove the `viz_aho.js` tag.
- `style.css` — `.aho-stage` + fullscreen enlarge.
- `js/random_input.js` — `'aho'` case.
- Tests: `tests/unit/aho_frames.test.js` (NEW), `tests/aho_steplog.spec.js` (NEW), rewrite the aho block in `tests/visualizer.spec.js`.
- Delete: `js/viz/viz_aho.js`.

---

### Task 1: `ahoFrames` generator + unit tests

**Files:** Create `js/viz/viz_aho_frames.js`; Create `tests/unit/aho_frames.test.js`.

- [ ] **Step 1: Write the failing unit test** — `tests/unit/aho_frames.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert');
const A = require('../../js/viz/viz_aho_frames.js');

// naive multi-pattern: {"pattern@start"} for every occurrence of every pattern
function naive(patterns, text) {
  const out = new Set();
  for (const p of patterns) {
    if (!p.length) continue;
    for (let i = 0; i + p.length <= text.length; i++) {
      if (text.substr(i, p.length) === p) out.add(p + '@' + i);
    }
  }
  return out;
}

const CASES = [
  [['he', 'she', 'his', 'hers'], 'ushers'],
  [['a'], 'aaa'],
  [['ab', 'ba'], 'abab'],
  [['xyz'], 'abcabc'],   // no match
  [['aa', 'aaa'], 'aaaa'], // overlapping / nested
];

for (const [patterns, text] of CASES) {
  test(`aho: ${JSON.stringify(patterns)} / "${text}"`, () => {
    const r = A.ahoFrames(patterns, text);
    assert.ok(Array.isArray(r.frames) && r.frames.length >= 1, 'non-empty frames');
    for (const f of r.frames) assert.ok(f.message && typeof f.message.zh === 'string' && typeof f.message.en === 'string', 'bilingual message');
    // node count = 1 (root) + total distinct trie edges
    assert.ok(r.nodes.length >= 1, 'has nodes');
    assert.strictEqual(r.failSteps.length, r.nodes.length - 1, 'one failure link per non-root node');
    for (const n of r.nodes) { assert.ok(Number.isFinite(n.x) && Number.isFinite(n.y), 'finite layout coords'); }
    // match set from the last scan frame equals naive
    const scanFrames = r.frames.filter((f) => f.phase === 'scan');
    const got = new Set(scanFrames.length ? scanFrames[scanFrames.length - 1].matches : []);
    assert.deepStrictEqual(got, naive(patterns, text), 'match set equals naive multi-pattern scan');
  });
}

test('aho: classic example reports she@1, he@2, hers@2', () => {
  const r = A.ahoFrames(['he', 'she', 'his', 'hers'], 'ushers');
  assert.strictEqual(r.nodes.length, 10, 'trie has 10 nodes');
  const last = r.frames[r.frames.length - 1];
  const set = new Set(last.matches);
  for (const m of ['she@1', 'he@2', 'hers@2']) assert.ok(set.has(m), 'has ' + m);
});
```

- [ ] **Step 2: Run to verify fail** — `node --test tests/unit/aho_frames.test.js` → FAIL (module missing).

- [ ] **Step 3: Create `js/viz/viz_aho_frames.js`** with this exact content:

```js
(function (global) {
  var AHO_DEFAULT_PATTERNS = ['he', 'she', 'his', 'hers'];
  var AHO_DEFAULT_TEXT = 'ushers';

  function ahoFrames(patterns, text) {
    patterns = (patterns || []).filter(function (p) { return p && p.length; });
    text = text || '';

    // 1. build trie
    var nodes = [{ id: 0, ch: '', parent: -1, depth: 0, children: {}, out: [] }];
    for (var pi = 0; pi < patterns.length; pi++) {
      var p = patterns[pi], cur = 0;
      for (var c = 0; c < p.length; c++) {
        var ch = p[c];
        if (nodes[cur].children[ch] === undefined) {
          var id = nodes.length;
          nodes.push({ id: id, ch: ch, parent: cur, depth: nodes[cur].depth + 1, children: {}, out: [] });
          nodes[cur].children[ch] = id;
        }
        cur = nodes[cur].children[ch];
      }
      if (nodes[cur].out.indexOf(p) < 0) nodes[cur].out.push(p);
    }

    // 2. BFS failure links
    var fail = new Array(nodes.length).fill(0);
    var failSteps = [], queue = [];
    var rk = Object.keys(nodes[0].children);
    for (var i = 0; i < rk.length; i++) { fail[nodes[0].children[rk[i]]] = 0; queue.push(nodes[0].children[rk[i]]); }
    while (queue.length) {
      var u = queue.shift();
      failSteps.push({ node: u, fail: fail[u] });
      var keys = Object.keys(nodes[u].children);
      for (var ki = 0; ki < keys.length; ki++) {
        var chc = keys[ki], v = nodes[u].children[chc];
        queue.push(v);
        var f = fail[u];
        while (f !== 0 && nodes[f].children[chc] === undefined) f = fail[f];
        var nf = nodes[f].children[chc];
        fail[v] = (nf !== undefined && nf !== v) ? nf : 0;
      }
    }

    // 3. scan
    var scanSteps = [], cur2 = 0, cum = [];
    for (var t = 0; t < text.length; t++) {
      var tch = text[t];
      while (cur2 !== 0 && nodes[cur2].children[tch] === undefined) cur2 = fail[cur2];
      cur2 = nodes[cur2].children[tch] !== undefined ? nodes[cur2].children[tch] : 0;
      var node = cur2;
      while (node !== 0) {
        for (var oi = 0; oi < nodes[node].out.length; oi++) { var pat = nodes[node].out[oi]; cum.push(pat + '@' + (t - pat.length + 1)); }
        node = fail[node];
      }
      scanSteps.push({ node: cur2, matches: cum.slice(), pos: t });
    }

    // 4. layout (x,y): leaves get consecutive columns, internal = mean of children
    var leaf = 0;
    (function assign(idn) {
      var kids = Object.keys(nodes[idn].children).map(function (k) { return nodes[idn].children[k]; });
      if (kids.length === 0) { nodes[idn].gx = leaf++; }
      else { var sum = 0; for (var q = 0; q < kids.length; q++) { assign(kids[q]); sum += nodes[kids[q]].gx; } nodes[idn].gx = sum / kids.length; }
    })(0);
    var maxDepth = 0; for (var d = 0; d < nodes.length; d++) maxDepth = Math.max(maxDepth, nodes[d].depth);
    var SPX = 64, SPY = 68, MX = 30, MY = 26;
    for (var e = 0; e < nodes.length; e++) { nodes[e].x = MX + nodes[e].gx * SPX; nodes[e].y = MY + nodes[e].depth * SPY; }
    var viewBox = { w: MX * 2 + Math.max(1, leaf) * SPX, h: MY * 2 + (maxDepth + 1) * SPY };

    // 5. frames
    var F = failSteps.length, frames = [];
    for (var b = 0; b <= F; b++) {
      var buildCur = b < F ? failSteps[b].node : -1, msg;
      if (b === 0) msg = { zh: '建構 trie 完成,開始以 BFS 計算失敗連結', en: 'Trie built; computing failure links via BFS' };
      else { var fsp = failSteps[b - 1]; msg = { zh: '失敗連結:節點 ' + fsp.node + ' → ' + fsp.fail, en: 'Failure link: node ' + fsp.node + ' → ' + fsp.fail }; }
      frames.push({ phase: 'fail', builtCount: b, buildCur: buildCur, scanIdx: -1, curNode: buildCur >= 0 ? buildCur : 0, matches: [], message: msg });
    }
    for (var s = 0; s < text.length; s++) {
      var ss = scanSteps[s];
      var prevLen = s === 0 ? 0 : scanSteps[s - 1].matches.length;
      var mnew = ss.matches.slice(prevLen);
      frames.push({ phase: 'scan', builtCount: F, buildCur: -1, scanIdx: s, curNode: ss.node, matches: ss.matches.slice(),
        message: { zh: '讀取 text[' + s + ']=\'' + text[s] + '\' → 狀態節點 ' + ss.node + (mnew.length ? ',命中 ' + mnew.join(', ') : ''),
                   en: 'Read text[' + s + ']=\'' + text[s] + '\' → state ' + ss.node + (mnew.length ? '; matched ' + mnew.join(', ') : '') } });
    }

    return { nodes: nodes, failSteps: failSteps, text: text, viewBox: viewBox, frames: frames };
  }

  var api = { ahoFrames: ahoFrames, AHO_DEFAULT_PATTERNS: AHO_DEFAULT_PATTERNS, AHO_DEFAULT_TEXT: AHO_DEFAULT_TEXT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.AhoFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Run to verify pass** — `node --test tests/unit/aho_frames.test.js` → PASS. If the match set disagrees with naive, fix the automaton (BFS fail / scan / output-via-fail-chain) — never weaken the test.

- [ ] **Step 5: Commit**

```bash
git add js/viz/viz_aho_frames.js tests/unit/aho_frames.test.js
git commit -m "feat(dsvisual): pure Aho-Corasick automaton frame generator (dynamic trie/fail/scan/layout)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: renderAho domain + SVG paint + wiring + fullscreen + E2E

**Files:** Create `js/domains/aho.js`; Modify `js/app.js`, `index.html`, `style.css`, `js/random_input.js`; Delete `js/viz/viz_aho.js`; Create `tests/aho_steplog.spec.js`.

- [ ] **Step 1: Write the failing E2E** — `tests/aho_steplog.spec.js`:

```js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('Aho-Corasick observatory (batch 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('search-aho: inputs + examples + VCR + step log + drawer; build→scan; matches', async ({ page }) => {
    await loadMethod(page, 'search-aho');
    const card = page.locator('[data-method-section="search-aho"]');
    await expect(card.locator('[data-testid="aho-patterns"]')).toBeVisible();
    await expect(card.locator('[data-testid="aho-text"]')).toBeVisible();
    await expect(card.locator('.ex-select')).toBeVisible();
    await expect(card.locator('.viz-workbench')).toBeVisible();
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    await expect(card.locator('.stepctl')).toBeVisible();
    await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('search_aho.cpp');

    // default {he,she,his,hers}/ushers → 10 trie nodes
    await expect(card.locator('.aho-svg circle')).toHaveCount(10);
    await expect(card.locator('[data-testid="aho-phase"]')).toContainText('Phase 1');

    const rows = card.locator('.viz-logrow');
    const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
    await expect(rows).toHaveCount(max + 1);

    // scrub to the final frame → scan phase, last char highlighted, all matches reported
    await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(card.locator('[data-testid="aho-phase"]')).toContainText('Phase 2');
    await expect(card.locator('.aho-char-cur')).toHaveCount(1);
    const stats = await card.locator('[data-testid="aho-stats"]').textContent();
    for (const m of ['she@1', 'he@2', 'hers@2']) expect(stats).toContain(m);
  });

  test('search-aho: SVG enlarges in fullscreen', async ({ page }) => {
    await loadMethod(page, 'search-aho');
    const card = page.locator('[data-method-section="search-aho"]');
    const h = () => card.locator('.aho-svg').evaluate((e) => e.getBoundingClientRect().height);
    const before = await h();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await h();
    expect(after).toBeGreaterThan(before * 1.15);
  });
});
```

- [ ] **Step 2: Run to verify fail** — `npx playwright test tests/aho_steplog.spec.js --reporter=line` → FAIL.

- [ ] **Step 3: Create `js/domains/aho.js`** with this exact content:

```js
(function (global) {
  const K = () => global.VizKit;
  const C = () => global.VizCore;
  const R = () => global.VizRegistry;
  const AF = () => global.AhoFrames;

  const DEFAULT_TEXT = () => AF().AHO_DEFAULT_PATTERNS.join(',') + ' | ' + AF().AHO_DEFAULT_TEXT;
  let _txt = null;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function loadEx(id) { try { return ExamplesStore.load(localStorage, id); } catch (e) { return []; } }
  function saveEx(id, text) { try { ExamplesStore.save(localStorage, id, text, DEFAULT_TEXT()); } catch (e) {} }
  function exSelectHtml(id) {
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    let h = '<select class="ex-select"><option value="">' + (lang === 'zh' ? '範例…' : 'Examples…') + '</option>';
    h += '<option value="' + esc(DEFAULT_TEXT()) + '">' + (lang === 'zh' ? '預設' : 'Default') + '</option>';
    for (const e of loadEx(id)) h += '<option value="' + esc(e.text) + '">' + esc(e.text) + '</option>';
    return h + '</select>';
  }
  function clean(s, cap) { return String(s).replace(/[^\x21-\x7e]/g, '').slice(0, cap); }
  function parseAho(text) {
    const idx = String(text).indexOf('|');
    let ps = idx >= 0 ? text.slice(0, idx) : text;
    let tt = idx >= 0 ? text.slice(idx + 1) : '';
    const patterns = ps.split(',').map((s) => clean(s.trim(), 12)).filter((s) => s.length).slice(0, 8);
    tt = clean(tt.trim(), 40);
    if (!patterns.length) return { patterns: AF().AHO_DEFAULT_PATTERNS.slice(), text: tt || AF().AHO_DEFAULT_TEXT };
    if (!tt) tt = AF().AHO_DEFAULT_TEXT;
    return { patterns: patterns, text: tt };
  }

  function renderAho(methodId) {
    const K1 = K();
    const host = K1.acquireDynamicVizHost();
    const lang = (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en';
    if (_txt === null) _txt = DEFAULT_TEXT();

    function rebuild() {
      host.innerHTML = '';
      const parsed = parseAho(_txt);
      const controls = document.createElement('div');
      controls.className = 'aho-controls-row';
      controls.innerHTML =
        '<label class="aho-plabel">' + (lang === 'zh' ? '樣式' : 'patterns') + ' <input type="text" class="aho-patterns" data-testid="aho-patterns" value="' + esc(parsed.patterns.join(',')) + '"></label>' +
        '<label class="aho-tlabel">' + (lang === 'zh' ? '文字' : 'text') + ' <input type="text" class="aho-text" data-testid="aho-text" value="' + esc(parsed.text) + '"></label>' +
        '<button type="button" class="aho-build btn primary">' + (lang === 'zh' ? '建立' : 'Build') + '</button>' +
        '<button type="button" class="rand-btn" title="' + (lang === 'zh' ? '隨機' : 'Random') + '">🎲</button>' +
        exSelectHtml(methodId);
      host.appendChild(controls);

      const A = AF().ahoFrames(parsed.patterns, parsed.text);
      const nodes = A.nodes, fs = A.failSteps, text = A.text, vb = A.viewBox;
      const stage = document.createElement('div');
      stage.className = 'aho-stage';

      function paint(f) {
        let svg = '';
        for (let i = 0; i < nodes.length; i++) { const n = nodes[i]; if (n.parent >= 0) { const p = nodes[n.parent]; svg += '<line x1="' + p.x + '" y1="' + p.y + '" x2="' + n.x + '" y2="' + n.y + '" stroke="#94a3b8" stroke-width="2"/>'; } }
        for (let k = 0; k < f.builtCount; k++) { const a = nodes[fs[k].node], b = nodes[fs[k].fail]; svg += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" stroke="#f59e0b" stroke-width="1.5" stroke-dasharray="4 3"/>'; }
        for (let j = 0; j < nodes.length; j++) { const nd = nodes[j]; const isCur = nd.id === f.curNode && (f.phase === 'scan' || f.buildCur >= 0); const hasOut = nd.out && nd.out.length > 0;
          svg += '<circle cx="' + nd.x + '" cy="' + nd.y + '" r="16" fill="' + (isCur ? '#34d399' : (hasOut ? '#dbeafe' : '#ffffff')) + '" stroke="#1e40af" stroke-width="2" data-node="' + nd.id + '"/>';
          svg += '<text x="' + nd.x + '" y="' + (nd.y + 5) + '" text-anchor="middle" font-size="13" font-weight="700" fill="#0f172a">' + esc(nd.ch || '·') + '</text>'; }
        let tr = '';
        for (let c = 0; c < text.length; c++) tr += '<span class="aho-char' + (c === f.scanIdx ? ' aho-char-cur' : '') + '">' + esc(text[c]) + '</span>';
        const phase = f.phase === 'fail'
          ? 'Phase 1: Building failure links (' + f.builtCount + '/' + fs.length + ')'
          : 'Phase 2: Scanning text (' + (f.scanIdx + 1) + '/' + text.length + ')';
        stage.innerHTML =
          '<div class="aho-phase" data-testid="aho-phase">' + phase + '</div>' +
          '<svg class="aho-svg" viewBox="0 0 ' + vb.w + ' ' + vb.h + '" width="100%" xmlns="http://www.w3.org/2000/svg">' + svg + '</svg>' +
          '<div class="aho-textrow">' + tr + '</div>' +
          '<div class="aho-stats" data-testid="aho-stats">matches: <span class="aho-matches">[' + f.matches.join(', ') + ']</span></div>';
      }
      host.appendChild(K1.buildStepWorkbench({ stage: stage, frames: A.frames, paint: paint, getMessage: (f) => K1.langOf(f.message), runIntervalMs: 500 }));

      function applyText(t) { _txt = t; saveEx(methodId, t); rebuild(); }
      controls.querySelector('.aho-build').addEventListener('click', () => {
        applyText(controls.querySelector('.aho-patterns').value + ' | ' + controls.querySelector('.aho-text').value);
      });
      controls.querySelector('.rand-btn').addEventListener('click', () => {
        const r = window.RandomInput && RandomInput.randomInputFor('aho', K1.getInputDifficulty());
        if (r && Array.isArray(r.patterns) && r.patterns.length) applyText(r.patterns.join(',') + ' | ' + r.text);
      });
      const ex = controls.querySelector('.ex-select');
      if (ex) ex.addEventListener('change', (e) => { if (e.target.value) applyText(e.target.value); });
    }
    rebuild();
  }

  R().attach('search-aho', { render: () => renderAho('search-aho'), code: () => codeSearchAho, layout: { host: 'dynamic' } });
  C().registerDomain({ id: 'aho' });
})(typeof window !== 'undefined' ? window : globalThis);
```

- [ ] **Step 4: Delete the old file** — `git rm js/viz/viz_aho.js`.

- [ ] **Step 5: `index.html`** — remove the `<script src="js/viz/viz_aho.js" defer></script>` tag (~line 493) and add in its place:

```html
    <script src="js/viz/viz_aho_frames.js" defer></script>
    <script src="js/domains/aho.js" defer></script>
```

(`viz_aho_frames.js` before `domains/aho.js`.)

- [ ] **Step 6: `js/app.js`** — add `codeDrawer: true` to the `search-aho` METHODS row (~line 184). Do NOT change its updateLayout branch (already code-only).

- [ ] **Step 7: `js/random_input.js`** — add before the `'sort'` case in `randomInputFor`'s switch:

```js
      case 'aho': {
        const alpha = 'abcde';
        const np = randInt(rng, 2, 4), patterns = [];
        for (let i = 0; i < np; i++) { const pl = randInt(rng, 2, 3); let p = ''; for (let k = 0; k < pl; k++) p += alpha[Math.floor(rng() * alpha.length)]; patterns.push(p); }
        const L = difficulty === 'large' ? randInt(rng, 14, 20) : randInt(rng, 8, 12);
        let text = '';
        for (let i = 0; i < L; i++) text += alpha[Math.floor(rng() * alpha.length)];
        if (rng() < 0.7) { const at = Math.floor(rng() * (L - patterns[0].length + 1)); text = text.slice(0, at) + patterns[0] + text.slice(at + patterns[0].length); }
        return { patterns, text };
      }
```

- [ ] **Step 8: `style.css`** — add:

```css
.aho-controls-row { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-bottom: 10px; }
.aho-patterns { min-width: 160px; }
.aho-text { min-width: 160px; }
.aho-stage { width: 100%; min-height: 220px; display: flex; flex-direction: column; gap: 10px; overflow: auto; }
body.viz-focus .method-section-card.active .aho-stage { flex: 1 1 auto; min-height: 0; }
body.viz-focus .method-section-card.active .aho-svg { max-height: none; }
```

- [ ] **Step 9: Run the E2E** — `npx playwright test tests/aho_steplog.spec.js --reporter=line` → PASS (both tests). If the fullscreen ancestor class differs, verify against `body.viz-focus`/`.method-section-card.active` and fix the CSS to the real class — do not weaken.

- [ ] **Step 10: Commit**

```bash
git add js/domains/aho.js js/app.js index.html style.css js/random_input.js tests/aho_steplog.spec.js
git commit -m "feat(dsvisual): Aho-Corasick observatory (dynamic trie + patterns/text inputs + step log + fullscreen)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Rewrite old test + full gate

**Files:** Modify `tests/visualizer.spec.js`.

- [ ] **Step 1: Rewrite the aho block** — the test around `tests/visualizer.spec.js:642` ("String: Aho-Corasick renders the trie and steps through build + scan") asserts the OLD `[data-action="step"]` VCR + a hard-coded 10-circle / `1/9` / phase contract. Read the file, find the exact block, and replace it with an observatory assertion:

```js
  test('String: Aho-Corasick renders the trie observatory (inputs + step log + build→scan)', async ({ page }) => {
    await loadMethod(page, 'search-aho');
    const card = page.locator('[data-method-section="search-aho"]');
    await expect(card.locator('.code-panel-filename')).toContainText('search_aho.cpp');
    await expect(card.locator('[data-testid="aho-patterns"]')).toBeVisible();
    await expect(card.locator('[data-testid="aho-text"]')).toBeVisible();
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    await expect(card.locator('.aho-svg circle')).toHaveCount(10); // default {he,she,his,hers}
    await expect(card.locator('[data-testid="aho-phase"]')).toContainText('Phase 1');
    // scrub to the end → scan phase with all matches
    await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(card.locator('[data-testid="aho-phase"]')).toContainText('Phase 2');
    const stats = await card.locator('[data-testid="aho-stats"]').textContent();
    for (const m of ['she@1', 'he@2', 'hers@2']) expect(stats).toContain(m);
  });
```

Remove all `[data-action="step"]` clicks and the `1/9`/`6/6` cursor-counter assertions. Leave the smoke-navigation touch (~line 743, just `loadMethod('search-aho')` while cycling) as-is.

- [ ] **Step 2: Cross-mode no-crash** — `npx playwright test tests/visualizer.spec.js tests/smoke_modes.spec.js --reporter=line` → PASS.

- [ ] **Step 3: Full-suite gate + guards**

```bash
git status --porcelain js/cloud-config.js js/code_db.js   # expect empty
npm run test:all
```

Expected: all green — unit (`aho_frames`: match set == naive, 10-node classic) + E2E (`aho_steplog`: observatory + fullscreen) + rewritten `visualizer` block + counts. No `search-aho` reference to the old `[data-action]` contract remains; other search methods + domains unaffected.

- [ ] **Step 4: Commit**

```bash
git add tests/visualizer.spec.js
git commit -m "test(dsvisual): rewrite Aho-Corasick viz test for the observatory DOM

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Pure `ahoFrames` (dynamic trie + BFS fail + scan + layout + per-frame state) → Task 1. ✓
- `renderAho` + patterns/text inputs + examples + SVG paint + `buildStepWorkbench` → Task 2 Step 3. ✓
- Hidden source (codeDrawer) → Task 2 Step 6. ✓
- Example input + `RandomInput 'aho'` → Task 2 Steps 3, 7. ✓
- Fullscreen SVG enlargement → Task 2 Step 8; E2E Step 1/9. ✓
- Delete hard-coded `viz_aho.js` + script tag → Task 2 Steps 4-5. ✓
- Tests: unit (match-set == naive, classic 10-node), E2E (observatory + fullscreen), rewritten visualizer block, cross-mode no-crash → Task 1/2/3. ✓
- Preserved DOM hooks (`.aho-svg circle`, `aho-phase`, `aho-stats`, `.aho-matches`, `.aho-char`/`-cur`, `.aho-textrow`) → Task 2 `paint`. ✓

**Placeholder scan:** No TBD/TODO. Full `ahoFrames` + `renderAho` + paint + CSS code given; exact anchors (METHODS 184, script tag 493, updateLayout unchanged).

**Type/name consistency:** `AhoFrames.ahoFrames` + `AHO_DEFAULT_PATTERNS`/`AHO_DEFAULT_TEXT` in module/domain/tests. `codeSearchAho` in attach + updateLayout (confirmed present). Frame fields `{phase,builtCount,buildCur,scanIdx,curNode,matches,message}` — paint reads exactly these + the closed-over `nodes/failSteps/text/viewBox`. `.aho-*` classes consistent between paint, CSS, and E2E. `getMessage`/`langOf` reuse valid (message is `{zh,en}`). New domain id `aho` (distinct from `search`/`strsearch`).
