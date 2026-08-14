# Lab Feature (Dijkstra Pilot) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fourth per-method entry point — **Lab (實作)** — to the dsvisual viz, wired end-to-end for `graph-dijkstra`, with content derived from dsjudge's private `problems/dijkstra` and a public practice repo as the target.

**Architecture:** A build-time sync vendors only the *public* parts of dsjudge's problem (statement + samples) into `labs/<slug>/`; `build_labs.js` compiles that into `js/labs_rendered.js` (`window.LAB_RENDERED`), mirroring the existing `build_quiz.js` → `js/quiz_rendered.js` pipeline. `js/app.js` gains a `method-lab-btn` gated on `LAB_RENDERED[id]` that opens a `LabViewer` modal (`js/lab.js`), mirroring the Self-Test viewer. A generator script builds the public template repo contents; creating/pushing the org repo is a final, human-gated step.

**Tech Stack:** Vanilla JS (no framework), Node.js build scripts (no new npm deps), Playwright E2E (`tests/*.spec.js`), `node --test` unit (`tests/unit/*.test.js`), `gh` CLI + `make`/`g++` for the practice repo.

## Global Constraints

- No new npm dependencies — no markdown library; render statement markdown with a small built-in `mdToHtml()` in `build_labs.js`.
- `js/labs_rendered.js` is GENERATED — never hand-edit; always regenerate via `npm run build:labs` (same rule as `js/quiz_rendered.js`).
- dsjudge is a BUILD-TIME source only. Never fetch or link the private dsjudge repo at runtime. Vendor only `statement*.md` + `samples/`; never copy `tests/`, `ref.cpp`, `sol.cpp`, `wrong.cpp`, `gen.py`, `meta.in.yaml`.
- Never modify `js/cloud-config.js`, `js/code_db.js`, `js/slides_rendered.js`, `js/quiz_rendered.js`, or `build_quiz.js`.
- Practice repo namespace: `ds2026-lab-<slug>` (public template), distinct from Classroom `ds2026-lab{N}-github-<slug>-<handle>`.
- dsjudge frontend integration is reserved only: `dsjudgeUrl` stays `null`, the dsjudge button stays disabled. No runtime coupling.
- Generated-file writer pattern (copy from `build_quiz.js:73-74`): `fs.writeFileSync(path.join(__dirname,'js','labs_rendered.js'), 'window.LAB_RENDERED = ' + JSON.stringify(rendered, null, 2) + ';\n')`.
- English statement may be ABSENT (dijkstra has only zh `statement.md`); fall back en→zh everywhere.
- Commit trailer: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`. Branch: `feat/lab-dijkstra-pilot` (already created).
- Run E2E for a single spec with: `npx playwright test tests/<name>.spec.js --reporter=line`. Full gate: `npm run test:all`.

---

### Task 1: Vendored lab snapshot + `sync_labs.js`

**Files:**
- Create: `sync_labs.js`
- Create (via running the script): `labs/labs.json`, `labs/dijkstra/statement.md`, `labs/dijkstra/meta.json`, `labs/dijkstra/samples/01.in`, `labs/dijkstra/samples/01.out`

**Interfaces:**
- Consumes: `../dsjudge/problems/<slug>/` (`statement.md`, optional `statement.en.md`, `samples/*`, `meta.yaml`).
- Produces: on-disk snapshot under `labs/<slug>/` and the `labs/labs.json` registry consumed by Task 2's `build_labs.js`. `labs.json` shape: `{ "<methodId>": [ { "slug": "<slug>", "repoUrl": "<url>", "dsjudgeUrl": null } ] }`.

- [ ] **Step 1: Author `labs/labs.json`** (hand-written registry — this file is the source of truth for the mapping, not generated)

```json
{
  "graph-dijkstra": [
    {
      "slug": "dijkstra",
      "repoUrl": "https://github.com/nycu-cs-course-ds/ds2026-lab-dijkstra",
      "dsjudgeUrl": null
    }
  ]
}
```

- [ ] **Step 2: Write `sync_labs.js`**

```js
// Vendors ONLY the public parts of dsjudge problems into labs/<slug>/.
// Maintainer tool: requires ../dsjudge checked out. Run: node sync_labs.js
const fs = require('fs');
const path = require('path');

const DSJUDGE = path.resolve(__dirname, '..', 'dsjudge');
const LABS = path.join(__dirname, 'labs');
// Public fields lifted out of dsjudge meta.yaml (no YAML dep: line-scan the bank block).
function readPublicMeta(metaPath) {
  const txt = fs.readFileSync(metaPath, 'utf8');
  const grab = (re) => { const m = txt.match(re); return m ? m[1].trim().replace(/^["']|["']$/g, '') : null; };
  const tags = [];
  const tagBlock = txt.match(/tags:\s*\n((?:\s*-\s*.*\n)+)/);
  if (tagBlock) for (const line of tagBlock[1].split('\n')) { const m = line.match(/-\s*(.+)/); if (m) tags.push(m[1].trim()); }
  return {
    title: grab(/^\s*title:\s*(.+)$/m),
    topic: grab(/^\s*topic:\s*(.+)$/m),
    week: Number(grab(/^\s*week:\s*(.+)$/m)) || null,
    difficulty: Number(grab(/^\s*difficulty:\s*(.+)$/m)) || null,
    tags,
  };
}

function copyIfExists(src, dst) {
  if (fs.existsSync(src)) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); return true; }
  return false;
}

function syncSlug(slug) {
  const src = path.join(DSJUDGE, 'problems', slug);
  if (!fs.existsSync(src)) throw new Error('dsjudge problem not found: ' + src);
  const dst = path.join(LABS, slug);
  fs.mkdirSync(path.join(dst, 'samples'), { recursive: true });
  copyIfExists(path.join(src, 'statement.md'), path.join(dst, 'statement.md'));
  copyIfExists(path.join(src, 'statement.en.md'), path.join(dst, 'statement.en.md')); // may be absent
  for (const f of fs.readdirSync(path.join(src, 'samples'))) {
    fs.copyFileSync(path.join(src, 'samples', f), path.join(dst, 'samples', f));
  }
  fs.writeFileSync(path.join(dst, 'meta.json'), JSON.stringify(readPublicMeta(path.join(src, 'meta.yaml')), null, 2) + '\n');
  console.log('synced', slug);
}

if (require.main === module) {
  if (!fs.existsSync(DSJUDGE)) { console.error('ERROR: dsjudge not found at ' + DSJUDGE); process.exit(1); }
  const reg = JSON.parse(fs.readFileSync(path.join(LABS, 'labs.json'), 'utf8'));
  const slugs = [...new Set(Object.values(reg).flat().map((e) => e.slug))];
  slugs.forEach(syncSlug);
  console.log('done:', slugs.join(', '));
}

module.exports = { readPublicMeta, syncSlug };
```

- [ ] **Step 3: Run the sync to produce the committed snapshot**

Run: `node sync_labs.js`
Expected: prints `synced dijkstra` then `done: dijkstra`.

- [ ] **Step 4: Verify only public parts were vendored (no hidden test data / solutions)**

Run: `ls labs/dijkstra labs/dijkstra/samples && ! ls labs/dijkstra/tests 2>/dev/null && ! ls labs/dijkstra/ref.cpp 2>/dev/null && echo GUARD_OK`
Expected: lists `statement.md`, `meta.json`, `samples/` with `01.in 01.out`; prints `GUARD_OK` (no `tests/`, no `ref.cpp`).

- [ ] **Step 5: Commit**

```bash
git add sync_labs.js labs/labs.json labs/dijkstra
git commit -m "feat(lab): vendor dijkstra public snapshot + sync_labs tool"
```

---

### Task 2: `build_labs.js` → `js/labs_rendered.js` + `build:labs` wiring

**Files:**
- Create: `build_labs.js`
- Create: `tests/unit/build_labs.test.js`
- Create (generated): `js/labs_rendered.js`
- Modify: `package.json` (add `build:labs`, chain into `pages:prepare`)

**Interfaces:**
- Consumes: `labs/labs.json` + `labs/<slug>/{statement.md, statement.en.md?, meta.json, samples/*}` (from Task 1).
- Produces: global `window.LAB_RENDERED` with shape
  `{ "<methodId>": [ { slug, titleEn, titleZh, topic, week, difficulty, tags, repoUrl, dsjudgeUrl, statementHtml:{en,zh}, samples:[{in,out}] } ] }`.
  Also exports `{ mdToHtml, buildLabs }` for tests. `buildLabs()` returns the `LAB_RENDERED` object.

- [ ] **Step 1: Write the failing unit test**

```js
// tests/unit/build_labs.test.js
const test = require('node:test');
const assert = require('node:assert');
const { mdToHtml, buildLabs } = require('../../build_labs.js');

test('mdToHtml renders headings, paragraphs, and fenced code, escaping HTML', () => {
  const html = mdToHtml('# Title\n\nHello <x> world\n\n```\n1 2 3\n```\n');
  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /Hello &lt;x&gt; world/);
  assert.match(html, /<pre><code>1 2 3\n<\/code><\/pre>/);
});

test('buildLabs maps graph-dijkstra with public fields and no hidden data', () => {
  const R = buildLabs();
  assert.ok(R['graph-dijkstra'], 'graph-dijkstra present');
  const lab = R['graph-dijkstra'][0];
  assert.strictEqual(lab.slug, 'dijkstra');
  assert.strictEqual(lab.dsjudgeUrl, null);
  assert.match(lab.repoUrl, /ds2026-lab-dijkstra/);
  assert.ok(lab.statementHtml.zh && lab.statementHtml.en, 'both langs present (en falls back to zh)');
  assert.ok(Array.isArray(lab.samples) && lab.samples[0].in && lab.samples[0].out, 'samples present');
  assert.ok(lab.titleZh && lab.titleEn, 'titles present');
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/unit/build_labs.test.js`
Expected: FAIL — `Cannot find module '../../build_labs.js'`.

- [ ] **Step 3: Write `build_labs.js`**

```js
const fs = require('fs');
const path = require('path');

const LABS = path.join(__dirname, 'labs');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Minimal, dependency-free markdown for problem statements:
// fenced code (```), ATX headings (#/##/###), unordered lists (- ), inline `code`, paragraphs.
function mdToHtml(md) {
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0, para = [], list = null;
  const flushPara = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const flushList = () => { if (list) { out.push('<ul>' + list.map((li) => '<li>' + inline(li) + '</li>').join('') + '</ul>'); list = null; } };
  const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      flushPara(); flushList();
      const buf = []; i++;
      while (i < lines.length && !lines[i].startsWith('```')) { buf.push(lines[i]); i++; }
      i++; // skip closing fence
      out.push('<pre><code>' + esc(buf.join('\n')) + '\n</code></pre>');
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) { flushPara(); flushList(); out.push('<h' + h[1].length + '>' + inline(h[2]) + '</h' + h[1].length + '>'); i++; continue; }
    const li = line.match(/^\s*-\s+(.*)$/);
    if (li) { flushPara(); (list = list || []).push(li[1]); i++; continue; }
    if (line.trim() === '') { flushPara(); flushList(); i++; continue; }
    flushList(); para.push(line); i++;
  }
  flushPara(); flushList();
  return out.join('\n');
}

function readSamples(slug) {
  const dir = path.join(LABS, slug, 'samples');
  const ins = fs.readdirSync(dir).filter((f) => f.endsWith('.in')).sort();
  return ins.map((f) => ({
    in: fs.readFileSync(path.join(dir, f), 'utf8'),
    out: fs.readFileSync(path.join(dir, f.replace(/\.in$/, '.out')), 'utf8'),
  }));
}

function h1Of(md) { const m = String(md).match(/^#\s+(.+)$/m); return m ? m[1].trim() : null; }

function buildLabs() {
  const reg = JSON.parse(fs.readFileSync(path.join(LABS, 'labs.json'), 'utf8'));
  const R = {};
  for (const [methodId, entries] of Object.entries(reg)) {
    R[methodId] = entries.map((e) => {
      const dir = path.join(LABS, e.slug);
      const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
      const zhMd = fs.readFileSync(path.join(dir, 'statement.md'), 'utf8');
      const enPath = path.join(dir, 'statement.en.md');
      const enMd = fs.existsSync(enPath) ? fs.readFileSync(enPath, 'utf8') : zhMd; // fall back en->zh
      return {
        slug: e.slug,
        titleZh: h1Of(zhMd) || meta.title || e.slug,
        titleEn: h1Of(enMd) || meta.title || e.slug,
        topic: meta.topic, week: meta.week, difficulty: meta.difficulty, tags: meta.tags || [],
        repoUrl: e.repoUrl, dsjudgeUrl: e.dsjudgeUrl ?? null,
        statementHtml: { zh: mdToHtml(zhMd), en: mdToHtml(enMd) },
        samples: readSamples(e.slug),
      };
    });
  }
  return R;
}

if (require.main === module) {
  const rendered = buildLabs();
  fs.writeFileSync(path.join(__dirname, 'js', 'labs_rendered.js'),
    'window.LAB_RENDERED = ' + JSON.stringify(rendered, null, 2) + ';\n');
  console.log('Generated lab decks:', Object.keys(rendered).join(', '));
}

module.exports = { mdToHtml, buildLabs };
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test tests/unit/build_labs.test.js`
Expected: PASS (2 tests).

- [ ] **Step 5: Generate `js/labs_rendered.js` and wire `build:labs`**

Run: `node build_labs.js`
Expected: prints `Generated lab decks: graph-dijkstra`.

Then edit `package.json` scripts: add `"build:labs": "node build_labs.js"`, and change
`"pages:prepare": "npm run inject-env && npm run build:slides && npm run build:quiz"`
to `"pages:prepare": "npm run inject-env && npm run build:slides && npm run build:quiz && npm run build:labs"`.

- [ ] **Step 6: Commit**

```bash
git add build_labs.js tests/unit/build_labs.test.js js/labs_rendered.js package.json
git commit -m "feat(lab): build_labs.js generates LAB_RENDERED; wire build:labs into pages:prepare"
```

---

### Task 3: Viz "Lab" button + i18n

**Files:**
- Modify: `js/app.js` (button in the actions row ~`:643`; binding ~`:665-667`)
- Modify: `js/i18n.js` (`btn.lab` + lab.* keys, en block ~`:186` and zh block ~`:451`)
- Modify: `index.html` (load `js/labs_rendered.js` and `js/lab.js` before `js/app.js`, ~`:519-521`)
- Test: `tests/lab.spec.js`

**Interfaces:**
- Consumes: `window.LAB_RENDERED` (Task 2); `window.LabViewer.open(methodId)` (Task 4 — may be absent when this task lands; the click handler guards with `if (window.LabViewer)`).
- Produces: a `.method-lab-btn` element with `data-method` and `data-testid="method-lab-btn"`, shown only when `LAB_RENDERED[method.id]` exists.

- [ ] **Step 1: Write the failing E2E test**

```js
// tests/lab.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('lab entry point', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('Lab button shows on graph-dijkstra, hidden when no lab', async ({ page }) => {
    await loadMethod(page, 'graph-dijkstra');
    await expect(page.locator('[data-method-section="graph-dijkstra"] .method-lab-btn')).toBeVisible();
    // simulate a lab-less method: drop its entry before its (non-default) group first renders
    await page.evaluate(() => { if (window.LAB_RENDERED) delete window.LAB_RENDERED['graph-bfs']; });
    await loadMethod(page, 'graph-bfs');
    await expect(page.locator('[data-method-section="graph-bfs"] .method-lab-btn')).toHaveCount(0);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/lab.spec.js --reporter=line`
Expected: FAIL — `.method-lab-btn` not visible (button not implemented).

- [ ] **Step 3: Add the button, binding, i18n keys, and script includes**

In `js/app.js`, immediately after the Self-Test button line (`js/app.js:643`), add:

```js
                    ${(window.LAB_RENDERED && window.LAB_RENDERED[method.id]) ? `<button type="button" class="btn secondary method-lab-btn" data-method="${method.id}" data-testid="method-lab-btn">${t('btn.lab')}</button>` : ''}
```

After the quiz button binding (`js/app.js:667`), add:

```js
        const labBtn = section.querySelector('.method-lab-btn');
        if (labBtn) labBtn.addEventListener('click', () => { if (window.LabViewer) window.LabViewer.open(method.id); });
```

In `js/i18n.js`, in the EN block (near `'btn.quiz': 'Self-Test',`) add:

```js
            'btn.lab': 'Lab',
            'lab.openRepo': 'Open practice repo', 'lab.dsjudgeSoon': 'Practice on dsjudge (coming soon)',
            'lab.samples': 'Samples', 'lab.difficulty': 'Difficulty', 'lab.week': 'Week', 'lab.problems': 'Problems',
```

In the ZH block (near `'btn.quiz': '自我測驗',`) add:

```js
            'btn.lab': '實作',
            'lab.openRepo': '開啟練習 repo', 'lab.dsjudgeSoon': '到 dsjudge 練習（即將推出）',
            'lab.samples': '範例', 'lab.difficulty': '難度', 'lab.week': '週次', 'lab.problems': '題目',
```

In `index.html`, change the quiz includes (`:519-521`) to add the two lab scripts before `js/app.js`:

```html
    <script src="js/quiz_rendered.js" defer></script>
    <script src="js/quiz.js" defer></script>
    <script src="js/labs_rendered.js" defer></script>
    <script src="js/lab.js" defer></script>
    <script src="js/app.js" defer></script>
```

(`js/lab.js` is created in Task 4; the file must exist for the `<script>` to load without a 404. Create a one-line stub now: `window.LabViewer = window.LabViewer || { open() {} };` — Task 4 replaces it.)

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx playwright test tests/lab.spec.js --reporter=line`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add js/app.js js/i18n.js index.html js/lab.js tests/lab.spec.js
git commit -m "feat(lab): per-method Lab button (gated on LAB_RENDERED) + i18n + script includes"
```

---

### Task 4: `LabViewer` modal (`js/lab.js`) + `#lab-viewer` container

**Files:**
- Modify: `js/lab.js` (replace the Task 3 stub with the full viewer)
- Modify: `index.html` (add `#lab-viewer` modal container next to `#quiz-viewer`, ~`:339`)
- Modify: `style.css` (reuse quiz modal classes; add minimal `.labviewer-*` if needed)
- Test: extend `tests/lab.spec.js`

**Interfaces:**
- Consumes: `window.LAB_RENDERED[methodId]` (array of lab entries from Task 2); `#lab-viewer` DOM; `window.I18N` for `curLang()`/`t()`.
- Produces: `window.LabViewer.open(methodId)` — opens the modal; `close()` on Esc / overlay / close button.

- [ ] **Step 1: Write the failing E2E test (append to `tests/lab.spec.js`)**

```js
  test('opening Lab shows statement, samples, repo link, disabled dsjudge button', async ({ page }) => {
    await loadMethod(page, 'graph-dijkstra');
    await page.locator('[data-method-section="graph-dijkstra"] .method-lab-btn').click();
    const v = page.locator('#lab-viewer');
    await expect(v).toBeVisible();
    await expect(v.locator('[data-testid="lab-statement"]')).toContainText(/最短|shortest|dijkstra/i);
    await expect(v.locator('[data-testid="lab-samples"]')).toContainText('0 3 1 4 7');
    const repo = v.locator('[data-testid="lab-open-repo"]');
    await expect(repo).toHaveAttribute('href', /ds2026-lab-dijkstra/);
    await expect(v.locator('[data-testid="lab-dsjudge"]')).toBeDisabled();
    await page.keyboard.press('Escape');
    await expect(v).toBeHidden();
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx playwright test tests/lab.spec.js --reporter=line -g "opening Lab"`
Expected: FAIL — `#lab-viewer` not visible (stub only).

- [ ] **Step 3: Add the `#lab-viewer` container to `index.html`**

Immediately after the `#quiz-viewer` block (after `js/app.js` finds it around line 339), add:

```html
        <div id="lab-viewer" class="quizviewer-overlay" data-testid="lab-viewer" hidden>
            <div class="quizviewer-panel" role="dialog" aria-modal="true" aria-labelledby="lab-viewer-title" tabindex="-1">
                <div class="quizviewer-bar">
                    <h2 id="lab-viewer-title" class="quizviewer-title">Lab</h2>
                    <button type="button" id="lab-lang-toggle" class="quiz-lang-toggle" aria-label="Switch language">EN</button>
                    <button type="button" class="quizviewer-close" data-lab-close data-testid="labviewer-close" aria-label="Close">×</button>
                </div>
                <div id="lab-viewer-body" class="quizviewer-body" data-testid="labviewer-body"></div>
            </div>
        </div>
```

- [ ] **Step 4: Replace `js/lab.js` stub with the full viewer**

```js
(function (global) {
  'use strict';
  function curLang() { return (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en'; }
  function t(k, fb) { return (global.I18N && I18N.t) ? I18N.t(k) : (fb || k); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

  var overlay, body, lang, state = null;

  function ensureRefs() {
    overlay = document.getElementById('lab-viewer');
    body = document.getElementById('lab-viewer-body');
    if (overlay && !overlay._wired) {
      overlay._wired = true;
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay || (e.target.closest && e.target.closest('[data-lab-close]'))) close();
      });
      document.addEventListener('keydown', function (e) { if (overlay && !overlay.hidden && e.key === 'Escape') close(); });
      var lt = document.getElementById('lab-lang-toggle');
      if (lt) lt.addEventListener('click', function () { lang = lang === 'zh' ? 'en' : 'zh'; render(); });
    }
  }

  function sampleBlock(s, i) {
    return '<div class="lab-sample"><div class="lab-sample-col"><strong>#' + (i + 1) + ' in</strong>'
      + '<pre><code>' + esc(s.in) + '</code></pre></div>'
      + '<div class="lab-sample-col"><strong>out</strong><pre><code>' + esc(s.out) + '</code></pre></div></div>';
  }

  function render() {
    if (!state) return;
    var lab = state.lab;
    var title = lang === 'zh' ? lab.titleZh : lab.titleEn;
    var stmt = (lab.statementHtml && lab.statementHtml[lang]) || lab.statementHtml.en;
    var meta = [];
    if (lab.difficulty) meta.push(t('lab.difficulty', 'Difficulty') + ' ' + '★'.repeat(lab.difficulty));
    if (lab.week) meta.push(t('lab.week', 'Week') + ' ' + lab.week);
    var dsjudgeAttrs = lab.dsjudgeUrl ? ('href="' + lab.dsjudgeUrl + '" target="_blank" rel="noopener"') : 'aria-disabled="true" disabled';
    body.innerHTML =
      '<div class="lab-head"><h3>' + esc(title) + '</h3><div class="lab-meta muted">' + meta.map(esc).join(' · ') + '</div></div>'
      + '<div class="lab-statement" data-testid="lab-statement">' + stmt + '</div>'
      + '<h4>' + t('lab.samples', 'Samples') + '</h4>'
      + '<div class="lab-samples" data-testid="lab-samples">' + lab.samples.map(sampleBlock).join('') + '</div>'
      + '<div class="lab-actions">'
      + '<a class="btn primary" data-testid="lab-open-repo" href="' + lab.repoUrl + '" target="_blank" rel="noopener">' + t('lab.openRepo', 'Open practice repo') + ' ↗</a> '
      + '<button type="button" class="btn secondary" data-testid="lab-dsjudge" ' + dsjudgeAttrs + '>' + t('lab.dsjudgeSoon', 'Practice on dsjudge (coming soon)') + '</button>'
      + '</div>';
    var lt = document.getElementById('lab-lang-toggle'); if (lt) lt.textContent = lang === 'zh' ? 'EN' : '中';
  }

  function open(methodId) {
    ensureRefs();
    var arr = global.LAB_RENDERED && global.LAB_RENDERED[methodId];
    if (!arr || !arr.length || !overlay) return;
    lang = curLang();
    state = { methodId: methodId, lab: arr[0] }; // pilot: first problem; multi-problem picker is a later enhancement
    render();
    overlay.hidden = false; document.body.style.overflow = 'hidden';
    var panel = overlay.querySelector('.quizviewer-panel'); if (panel) panel.focus();
  }

  function close() { if (overlay) { overlay.hidden = true; document.body.style.overflow = ''; } state = null; }

  global.LabViewer = { open: open, close: close };
})(typeof window !== 'undefined' ? window : this);
```

- [ ] **Step 5: Add minimal styles to `style.css`**

```css
.lab-statement pre, .lab-sample pre { background: var(--code-bg, #f5f5f7); padding: .5rem .75rem; border-radius: 6px; overflow-x: auto; }
.lab-samples { display: grid; gap: .75rem; }
.lab-sample { display: grid; grid-template-columns: 1fr 1fr; gap: .75rem; }
.lab-actions { margin-top: 1rem; display: flex; gap: .5rem; flex-wrap: wrap; }
.lab-actions [disabled], .lab-actions [aria-disabled="true"] { opacity: .5; cursor: not-allowed; }
```

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npx playwright test tests/lab.spec.js --reporter=line`
Expected: PASS (both tests).

- [ ] **Step 7: Commit**

```bash
git add js/lab.js index.html style.css tests/lab.spec.js
git commit -m "feat(lab): LabViewer modal renders statement + samples + repo link; dsjudge reserved"
```

---

### Task 5: Practice-repo generator (no network)

**Files:**
- Create: `scripts/make_lab_repo.sh`
- Create: `scripts/lab-repo-template/` (files copied into each generated repo: `README.md`, `Makefile`, `src/main.cpp`, `.github/workflows/check.yml`)
- Test: manual generation into a temp dir + `make check`

**Interfaces:**
- Consumes: `labs/<slug>/{statement.md, statement.en.md?, samples/*}` (Task 1), `labs/labs.json` (for the repo URL/name).
- Produces: a self-contained repo tree at `dist/lab-repos/ds2026-lab-<slug>/` ready to push. No `gh`/network calls here.

- [ ] **Step 1: Create the template files**

`scripts/lab-repo-template/src/main.cpp`:
```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
    // TODO: read the input described in statement.md and print the answer.
    // Dijkstra: n m, then m lines "u v w", then source s.
    // Print n space-separated shortest distances (-1 if unreachable).
    return 0;
}
```

`scripts/lab-repo-template/Makefile`:
```make
CXX ?= g++
CXXFLAGS ?= -O2 -std=c++17 -pipe
build: ; @mkdir -p bin && $(CXX) $(CXXFLAGS) -o bin/sol src/main.cpp
check: build
	@pass=0; fail=0; \
	for f in samples/*.in; do \
	  exp="$${f%.in}.out"; got="$$(./bin/sol < $$f)"; \
	  if [ "$$got" = "$$(cat $$exp)" ]; then pass=$$((pass+1)); \
	  else fail=$$((fail+1)); echo "FAIL $$f"; echo "  expected: $$(cat $$exp)"; echo "  got:      $$got"; fi; \
	done; \
	echo "samples: $$pass passed, $$fail failed"; [ $$fail -eq 0 ]
.PHONY: build check
```

`scripts/lab-repo-template/.github/workflows/check.yml`:
```yaml
name: samples
on: [push, pull_request]
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run sample checks
        run: make check
      # Reserved: future dsjudge submission hook goes here (disabled for now).
```

`scripts/lab-repo-template/README.md` (uses `__SLUG__`/`__DSVISUAL__` placeholders the generator replaces):
```markdown
# ds2026-lab-__SLUG__

Practice lab for **__SLUG__**. Read `statement.md`, implement `src/main.cpp`, then:

```
make check   # compiles and runs your solution against the public samples
```

Samples only are included here; full grading runs on dsjudge (coming soon).
Visualize the algorithm: __DSVISUAL__

> Practice repo (open). Graded Classroom assignments live under `ds2026-lab{N}-github-...`.
```

- [ ] **Step 2: Write `scripts/make_lab_repo.sh`**

```bash
#!/usr/bin/env bash
# Generate a self-contained public-practice repo tree from a vendored lab snapshot.
# Usage: scripts/make_lab_repo.sh <slug>   (no network; writes dist/lab-repos/ds2026-lab-<slug>)
set -euo pipefail
slug="${1:?usage: make_lab_repo.sh <slug>}"
root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/labs/$slug"
[ -d "$src" ] || { echo "no vendored snapshot: $src"; exit 1; }
out="$root/dist/lab-repos/ds2026-lab-$slug"
rm -rf "$out"; mkdir -p "$out/src" "$out/samples" "$out/.github/workflows"

# public content only
cp "$src/statement.md" "$out/statement.md"
[ -f "$src/statement.en.md" ] && cp "$src/statement.en.md" "$out/statement.en.md" || true
cp "$src"/samples/* "$out/samples/"

# template files
tpl="$root/scripts/lab-repo-template"
cp "$tpl/src/main.cpp" "$out/src/main.cpp"
cp "$tpl/Makefile" "$out/Makefile"
cp "$tpl/.github/workflows/check.yml" "$out/.github/workflows/check.yml"
dsvisual="https://skhuang.github.io/dsvisual"
sed -e "s/__SLUG__/$slug/g" -e "s#__DSVISUAL__#$dsvisual#g" "$tpl/README.md" > "$out/README.md"

# guard: never ship hidden data
if ls "$out"/tests 2>/dev/null || ls "$out"/ref.cpp 2>/dev/null; then echo "GUARD FAILED: hidden data present"; exit 1; fi
echo "generated $out"
```

- [ ] **Step 3: Make it executable and generate the dijkstra repo tree**

Run: `chmod +x scripts/make_lab_repo.sh && ./scripts/make_lab_repo.sh dijkstra`
Expected: prints `generated .../dist/lab-repos/ds2026-lab-dijkstra`.

- [ ] **Step 4: Verify the starter compiles and samples FAIL (unimplemented), and no hidden data present**

Run: `cd dist/lab-repos/ds2026-lab-dijkstra && make check; echo "exit=$?"; ls tests 2>/dev/null || echo NO_TESTS_DIR; ls ref.cpp 2>/dev/null || echo NO_REF; cd -`
Expected: compiles, prints `samples: 0 passed, 1 failed`, `exit=2` (make check returns non-zero on failure), `NO_TESTS_DIR`, `NO_REF`.

- [ ] **Step 5: Commit** (ignore the generated `dist/` output)

```bash
echo "dist/" >> .gitignore
git add scripts/make_lab_repo.sh scripts/lab-repo-template .gitignore
git commit -m "feat(lab): generator for public practice repo (samples-only self-check + CI)"
```

---

### Task 6: Create + push the org practice repo — HUMAN-GATED, outward-facing

> This task performs an irreversible outward-facing action (creates a public repo in the `nycu-cs-course-ds` org). Do NOT run it from an autonomous subagent. Execute only after the user explicitly confirms the repo name `ds2026-lab-dijkstra` and public visibility.

**Files:** none in dsvisual (operates on the generated `dist/lab-repos/ds2026-lab-dijkstra/`).

**Interfaces:**
- Consumes: `dist/lab-repos/ds2026-lab-dijkstra/` (Task 5).
- Produces: `https://github.com/nycu-cs-course-ds/ds2026-lab-dijkstra` (public template), matching `labs.json` `repoUrl`.

- [ ] **Step 1: Confirm the target does not already exist**

Run: `gh repo view nycu-cs-course-ds/ds2026-lab-dijkstra 2>&1 | head -1`
Expected: `Could not resolve to a Repository` (safe to create). If it exists, STOP and reconcile with the user.

- [ ] **Step 2: Create the public repo and push the generated tree**

```bash
cd dist/lab-repos/ds2026-lab-dijkstra
git init -q && git add -A && git commit -q -m "Dijkstra practice lab (samples-only self-check)"
gh repo create nycu-cs-course-ds/ds2026-lab-dijkstra --public --source=. --push \
  --description "Dijkstra shortest-path practice lab (public). Graded assignments live under ds2026-lab{N}-github-*."
cd -
```

- [ ] **Step 3: Mark it as a template repo**

Run: `gh api -X PATCH repos/nycu-cs-course-ds/ds2026-lab-dijkstra -f is_template=true --jq '.is_template'`
Expected: `true`.

- [ ] **Step 4: Verify the pushed repo (public, template, no hidden data, CI present)**

Run: `gh repo view nycu-cs-course-ds/ds2026-lab-dijkstra --json visibility,isTemplate --jq '.visibility, .isTemplate' && gh api repos/nycu-cs-course-ds/ds2026-lab-dijkstra/git/trees/HEAD?recursive=1 --jq '.tree[].path' | grep -E 'tests/|ref.cpp' && echo "HIDDEN LEAK" || echo "NO_HIDDEN_OK"`
Expected: `PUBLIC`, `true`, then `NO_HIDDEN_OK`.

- [ ] **Step 5: Confirm `labs.json` `repoUrl` matches the created repo**

Run: `grep ds2026-lab-dijkstra labs/labs.json`
Expected: the URL matches the created repo (already set in Task 1 — no change needed).

---

## Final gate (after all tasks)

- [ ] Run the full suite: `npm run test:all` — expect green.
- [ ] Confirm guarded files untouched: `git status --porcelain js/cloud-config.js js/code_db.js js/quiz_rendered.js js/slides_rendered.js build_quiz.js` — expect empty.
- [ ] Open a PR to `main` (base `main`), body summarizing the pilot; merge on green CI, per the established flow.

## Notes for later replication (out of scope for this pilot)

- Adding another method's lab: append an entry to `labs/labs.json`, run `node sync_labs.js`, `node build_labs.js`, `./scripts/make_lab_repo.sh <slug>`, then Task 6 for that slug.
- Multi-problem-per-method: `LabViewer.open` currently shows `arr[0]`; add a problem picker when a method maps to >1 slug.
