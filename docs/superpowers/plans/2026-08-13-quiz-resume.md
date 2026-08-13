# Quiz Resume / Review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let students pick a row in the quiz's Recent-attempts panel — **resume** an unfinished attempt (restore mode/position/answers) or **review** a completed one (read-only score + per-question review).

**Architecture:** Attempts get an `id` + `status` at Begin and auto-save on every step via a new `QuizAttempts.upsert` (replace-by-id, per-method cap-10). `finish()` upserts the same id to `completed`. The Recent panel renders clickable rows (Resume / Review); `resume()` / `review()` load a stored record back into the session. Pure frontend — no data-pipeline/deck changes.

**Tech Stack:** Vanilla JS, plain CSS, Playwright E2E + `node --test`.

## Global Constraints

- NEVER modify `js/cloud-config.js`, `js/code_db.js`, `js/quiz_rendered.js`, `build_quiz.js`, `quizzes/*`, `js/quiz_grade.js`.
- All localStorage quiz access stays inside `QuizAttempts` (the single DB seam).
- Keep #217 behavior intact: a single finish still yields exactly 1 stored record (same-id upsert).
- Back-compat: old records without `status` are treated as completed; a `resume` only fires when the stored answer count equals the current deck length.
- Commit trailer (exact): `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
- Spec: `docs/superpowers/specs/2026-08-13-quiz-resume-design.md`.

---

## File Structure

- `js/quiz_attempts.js` — add `upsert`.
- `js/quiz.js` — session lifecycle (id/status/autosave), `finish`→upsert, `resume`/`review`, clickable recent panel, resume/review click handlers.
- `js/i18n.js` — `quiz.resume` / `quiz.review` / `quiz.inprogress` (en+zh).
- `style.css` — `.quiz-recent-row` clickable row + badge.
- Tests: `tests/unit/quiz_attempts.test.js` (+upsert), `tests/quiz.spec.js` (+resume, +review).

---

### Task 1: `QuizAttempts.upsert` + unit tests

**Files:** Modify `js/quiz_attempts.js`, `tests/unit/quiz_attempts.test.js`.

- [ ] **Step 1: Extend the unit test** — append to `tests/unit/quiz_attempts.test.js`:

```js
test('upsert: new id prepends, existing id replaces in place (no dup)', () => {
  const s = memStorage();
  QA.upsert(s, 'sort-quick', { id: 1, status: 'in-progress', idx: 0, correct: 0, total: 6 });
  QA.upsert(s, 'sort-quick', { id: 2, status: 'in-progress', idx: 1, correct: 0, total: 6 });
  let r = QA.recentFor(s, 'sort-quick', 10);
  assert.equal(r.length, 2);
  assert.equal(r[0].id, 2); // newest first
  // update id 1 in place -> still 2 rows, id 1 keeps its position (index 1), new fields applied
  QA.upsert(s, 'sort-quick', { id: 1, status: 'completed', idx: 6, correct: 5, total: 6 });
  r = QA.recentFor(s, 'sort-quick', 10);
  assert.equal(r.length, 2, 'no duplicate row');
  const one = r.find((a) => a.id === 1);
  assert.equal(one.status, 'completed');
  assert.equal(one.correct, 5);
});
test('upsert keeps the cap at 10', () => {
  const s = memStorage();
  for (let i = 0; i < 12; i++) QA.upsert(s, 'm', { id: i, total: 1, correct: 0 });
  assert.equal(QA.recentFor(s, 'm', 100).length, 10);
});
```

- [ ] **Step 2: Run to verify fail** — `node --test tests/unit/quiz_attempts.test.js` → the 2 new tests FAIL (`QA.upsert` undefined).

- [ ] **Step 3: Add `upsert` to `js/quiz_attempts.js`** — insert before the `clearFor` line and add to `api`:

```js
  function upsert(storage, methodId, attempt) {
    try {
      var arr = recentFor(storage, methodId, 100);
      var i = -1;
      for (var k = 0; k < arr.length; k++) { if (arr[k] && arr[k].id === attempt.id) { i = k; break; } }
      if (i >= 0) arr[i] = attempt; else arr.unshift(attempt);
      storage.setItem(key(methodId), JSON.stringify(arr.slice(0, 10)));
    } catch (e) { /* ignore */ }
  }
```

Change the api line to:
```js
  var api = { key: key, record: record, upsert: upsert, recentFor: recentFor, clearFor: clearFor };
```

- [ ] **Step 4: Run to verify pass** — `node --test tests/unit/quiz_attempts.test.js` → all PASS (original 3 + 2 new).

- [ ] **Step 5: Commit**

```bash
git add js/quiz_attempts.js tests/unit/quiz_attempts.test.js
git commit -m "feat(dsvisual): QuizAttempts.upsert (replace-by-id, per-method cap-10)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: quiz.js resume/review + autosave + E2E

**Files:** Modify `js/quiz.js`, `js/i18n.js`, `style.css`; Test `tests/quiz.spec.js`.

- [ ] **Step 1: Write the failing E2E** — append to `tests/quiz.spec.js` (inside the `test.describe('self-test quiz', ...)` block, before its closing `});`):

```js
  test('resume: unfinished attempt is restored from the recent panel', async ({ page }) => {
    await loadMethod(page, 'sort-quick');
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    const v = page.locator('#quiz-viewer');
    await v.locator('[data-testid="quiz-begin"]').click();          // practice
    // answer Q1 and advance to Q2
    await v.locator('.quiz-answers input').first().check();
    await v.locator('[data-testid="quiz-check"]').click();
    await v.locator('[data-testid="quiz-next"]').click();
    await expect(v.locator('.quiz-q-head')).toContainText('2 / 6');
    // close without finishing (auto-saved as in-progress)
    await page.keyboard.press('Escape');
    await expect(v).toBeHidden();
    // exactly one (in-progress) record
    let n = await page.evaluate(() => JSON.parse(localStorage.getItem('dsvisual:quiz:attempts:sort-quick') || '[]'));
    expect(n.length).toBe(1);
    expect(n[0].status).toBe('in-progress');
    // reopen -> resume row present -> click -> back on Q2
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    await expect(v.locator('[data-testid="quiz-recent-resume"]')).toBeVisible();
    await v.locator('[data-testid="quiz-recent-resume"]').click();
    await expect(v.locator('.quiz-q-head')).toContainText('2 / 6');
    // finishing flips the SAME record to completed (still 1 row)
    for (let i = 0; i < 6; i++) {
      const check = v.locator('[data-testid="quiz-check"]');
      if (await check.count()) { const inp = v.locator('.quiz-answers input, .quiz-sa').first(); if (await inp.count()) await inp.click().catch(() => {}); await check.click(); }
      const next = v.locator('[data-testid="quiz-next"]'); if (await next.count()) await next.click();
    }
    await expect(v.locator('[data-testid="quiz-score"]')).toBeVisible();
    n = await page.evaluate(() => JSON.parse(localStorage.getItem('dsvisual:quiz:attempts:sort-quick') || '[]'));
    expect(n.length).toBe(1);
    expect(n[0].status).toBe('completed');
  });

  test('review: completed attempt reopens read-only with score', async ({ page }) => {
    // seed one completed attempt
    await page.evaluate(() => localStorage.setItem('dsvisual:quiz:attempts:sort-quick', JSON.stringify([
      { id: 111, methodId: 'sort-quick', mode: 'test', lang: 'en', status: 'completed', idx: 6, given: [0, 0, 1, 0, 'pivot', [0, 1]], checked: [], startedAt: 1, finishedAt: 2, total: 6, correct: 6, perQuestion: [] },
    ])));
    await loadMethod(page, 'sort-quick');
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    const v = page.locator('#quiz-viewer');
    await expect(v.locator('[data-testid="quiz-recent-review"]')).toBeVisible();
    await v.locator('[data-testid="quiz-recent-review"]').click();
    await expect(v.locator('[data-testid="quiz-summary"]')).toBeVisible();
    await expect(v.locator('[data-testid="quiz-score"]')).toContainText('6 / 6');
    // review must not add a new record
    const n = await page.evaluate(() => JSON.parse(localStorage.getItem('dsvisual:quiz:attempts:sort-quick') || '[]').length);
    expect(n).toBe(1);
  });
```

- [ ] **Step 2: Run to verify fail** — `npx playwright test tests/quiz.spec.js -g "resume|review" --reporter=line` → FAIL.

- [ ] **Step 3: Replace `js/quiz.js` with the full updated module** (adds id/status/autosave, finish→upsert, resume/review, clickable recent panel):

```js
(function (global) {
  var overlay = null, body = null, titleEl = null, langToggle = null, lastFocus = null;
  var st = null;

  function curLang() { return (global.I18N && I18N.getCurrentLanguage && I18N.getCurrentLanguage() === 'zh') ? 'zh' : 'en'; }
  function t(k, f) { var v = (global.I18N && I18N.t) ? I18N.t(k) : null; return (v && v !== k) ? v : (f || k); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function deckFor(id, lg) { var d = global.QUIZ_RENDERED && global.QUIZ_RENDERED[id]; if (!d) return []; return (d[lg] && d[lg].length) ? d[lg] : (d.en || []); }
  function has(id) { return deckFor(id, 'en').length > 0 || deckFor(id, 'zh').length > 0; }
  function modeLabel(m) { return m === 'test' ? t('quiz.test', 'Test') : t('quiz.practice', 'Practice'); }
  function fmtTime(ms) { try { var d = new Date(ms); return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); } catch (e) { return ''; } }
  function isDone(a) { return a.status === 'completed' || (a.status == null && a.finishedAt); }

  function ensureRefs() {
    if (overlay) return;
    overlay = document.getElementById('quiz-viewer');
    body = document.getElementById('quiz-viewer-body');
    titleEl = document.getElementById('quiz-viewer-title');
    langToggle = document.getElementById('quiz-lang-toggle');
    overlay.addEventListener('click', function (e) { if (e.target === overlay || (e.target.closest && e.target.closest('[data-quiz-close]'))) close(); });
    document.addEventListener('keydown', function (e) { if (overlay && !overlay.hidden && e.key === 'Escape') close(); });
    body.addEventListener('click', onBodyClick);
    if (langToggle) langToggle.addEventListener('click', function () {
      if (!st) return;
      st.lang = st.lang === 'zh' ? 'en' : 'zh';
      var qs = deckFor(st.methodId, st.lang); if (qs.length) st.questions = qs;
      langToggle.textContent = st.lang === 'zh' ? '中' : 'EN';
      rerender();
    });
  }

  function open(methodId) {
    ensureRefs();
    var lg = curLang(), qs = deckFor(methodId, lg);
    if (!qs.length) return;
    lastFocus = document.activeElement;
    st = { methodId: methodId, id: null, status: null, lang: lg, mode: 'practice', questions: qs, idx: 0,
      given: new Array(qs.length).fill(null), checked: new Array(qs.length).fill(false),
      startedAt: Date.now(), phase: 'start', readonly: false, result: null };
    titleEl.textContent = t('btn.quiz', 'Self-Test');
    if (langToggle) langToggle.textContent = st.lang === 'zh' ? '中' : 'EN';
    overlay.hidden = false; document.body.style.overflow = 'hidden';
    rerender();
    overlay.querySelector('.quizviewer-panel').focus();
  }
  function close() {
    if (!overlay) return;
    if (st && st.phase === 'quiz' && st.status === 'in-progress') autosave();
    overlay.hidden = true; document.body.style.overflow = ''; st = null;
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function gradeAll() {
    var correct = 0;
    var per = st.questions.map(function (q, idx) { var r = global.QuizGrade.gradeQuestion(q, st.given[idx]); if (r.isCorrect) correct++; return { qIndex: idx, type: q.type, isCorrect: r.isCorrect }; });
    return { correct: correct, per: per };
  }
  function autosave() {
    if (!st || !st.id || !global.QuizAttempts) return;
    var g = gradeAll();
    QuizAttempts.upsert(localStorage, st.methodId, { id: st.id, methodId: st.methodId, mode: st.mode, lang: st.lang, status: 'in-progress', idx: st.idx, given: st.given, checked: st.checked, startedAt: st.startedAt, finishedAt: null, total: st.questions.length, correct: g.correct, perQuestion: g.per });
  }

  function rerender() { if (!st) return; if (st.phase === 'start') renderStart(); else if (st.phase === 'summary') renderSummary(); else renderQuestion(); }

  function recentRow(a) {
    var done = isDone(a);
    var stale = !done && (!a.given || a.given.length !== st.questions.length);
    var meta = done ? (a.correct + '/' + a.total) : (t('quiz.question', 'Q') + ' ' + ((a.idx || 0) + 1) + '/' + a.total);
    var badge = done ? t('quiz.review', 'Review') : (stale ? t('quiz.inprogress', 'In progress') : t('quiz.resume', 'Resume'));
    var inner = '<span class="qr-mode">' + esc(modeLabel(a.mode)) + '</span> <span class="qr-score">' + esc(meta) + '</span> <span class="qr-time">' + esc(fmtTime(a.finishedAt || a.startedAt)) + '</span> <span class="qr-act">' + esc(badge) + '</span>';
    if (done) return '<li><button type="button" class="quiz-recent-row" data-act="review" data-id="' + a.id + '" data-testid="quiz-recent-review">' + inner + '</button></li>';
    if (stale) return '<li><span class="quiz-recent-row stale">' + inner + '</span></li>';
    return '<li><button type="button" class="quiz-recent-row" data-act="resume" data-id="' + a.id + '" data-testid="quiz-recent-resume">' + inner + '</button></li>';
  }

  function renderStart() {
    var recent = global.QuizAttempts ? QuizAttempts.recentFor(localStorage, st.methodId, 10) : [];
    body.innerHTML =
      '<div class="quiz-start">' +
        '<p class="quiz-count">' + st.questions.length + ' ' + t('quiz.questions', 'questions') + '</p>' +
        '<div class="quiz-mode" role="radiogroup" aria-label="' + esc(t('quiz.mode', 'Mode')) + '">' +
          '<label class="quiz-mode-opt"><input type="radio" name="qmode" value="practice"' + (st.mode === 'practice' ? ' checked' : '') + '> ' + t('quiz.practice', 'Practice') + '</label>' +
          '<label class="quiz-mode-opt"><input type="radio" name="qmode" value="test"' + (st.mode === 'test' ? ' checked' : '') + '> ' + t('quiz.test', 'Test') + '</label>' +
        '</div>' +
        '<button type="button" class="btn primary" data-act="begin" data-testid="quiz-begin">' + t('quiz.begin', 'Begin') + '</button>' +
        '<div class="quiz-recent" data-testid="quiz-recent"><h4>' + t('quiz.recent', 'Recent attempts') + '</h4>' +
          (recent.length ? '<ul>' + recent.map(recentRow).join('') + '</ul>' : '<p class="quiz-recent-empty">' + t('quiz.recent.empty', 'No attempts yet') + '</p>') +
        '</div>' +
      '</div>';
  }

  function renderAnswers(q, given, disabled, res) {
    if (q.type === 'shortanswer') return '<input type="text" class="quiz-sa" data-testid="quiz-sa" value="' + esc(given || '') + '"' + (disabled ? ' disabled' : '') + '>';
    var multi = (q.type === 'multichoice' && !q.single);
    return q.answers.map(function (a, idx) {
      var sel = multi ? (Array.isArray(given) && given.indexOf(idx) >= 0) : (given === idx);
      var cls = 'quiz-ans'; if (res) { if (a.fraction > 0) cls += ' correct'; if (sel && a.fraction <= 0) cls += ' wrong'; }
      return '<label class="' + cls + '"><input type="' + (multi ? 'checkbox' : 'radio') + '" name="qa" value="' + idx + '"' + (sel ? ' checked' : '') + (disabled ? ' disabled' : '') + '> <span>' + a.text + '</span></label>';
    }).join('');
  }

  function footButtons(i, checked) {
    var last = i === st.questions.length - 1;
    if (st.mode === 'practice') {
      if (!checked) return '<button type="button" class="btn primary" data-act="check" data-testid="quiz-check">' + t('quiz.check', 'Check') + '</button>';
      return '<button type="button" class="btn primary" data-act="next" data-testid="quiz-next">' + (last ? t('quiz.finish', 'Finish') : t('quiz.next', 'Next')) + '</button>';
    }
    var h = '';
    if (i > 0) h += '<button type="button" class="btn secondary" data-act="prev">' + t('quiz.prev', 'Previous') + '</button>';
    if (!last) h += '<button type="button" class="btn primary" data-act="next">' + t('quiz.next', 'Next') + '</button>';
    else h += '<button type="button" class="btn primary" data-act="submit" data-testid="quiz-submit">' + t('quiz.submit', 'Submit') + '</button>';
    return h;
  }

  function renderQuestion() {
    var i = st.idx, q = st.questions[i], checked = st.checked[i], given = st.given[i];
    var res = (checked && st.mode === 'practice') ? global.QuizGrade.gradeQuestion(q, given) : null;
    var html = '<div class="quiz-q" data-testid="quiz-q">' +
      '<div class="quiz-q-head">' + t('quiz.question', 'Question') + ' ' + (i + 1) + ' / ' + st.questions.length + '</div>' +
      '<div class="quiz-q-text">' + q.text + '</div>' +
      '<div class="quiz-answers">' + renderAnswers(q, given, checked && st.mode === 'practice', res) + '</div>';
    if (res) {
      html += '<div class="quiz-feedback ' + (res.isCorrect ? 'ok' : 'bad') + '" data-testid="quiz-feedback">' +
        '<strong>' + (res.isCorrect ? t('quiz.correct', 'Correct') : t('quiz.incorrect', 'Incorrect')) + '</strong>' +
        (res.feedback ? '<div class="quiz-fb-text">' + res.feedback + '</div>' : '') + '</div>';
    }
    html += '<div class="quiz-foot">' + footButtons(i, checked) + '</div></div>';
    body.innerHTML = html;
  }

  function collectAnswer() {
    var q = st.questions[st.idx];
    if (q.type === 'shortanswer') { var el = body.querySelector('.quiz-sa'); st.given[st.idx] = el ? el.value : ''; return; }
    var multi = (q.type === 'multichoice' && !q.single);
    var inputs = [].slice.call(body.querySelectorAll('input[name="qa"]'));
    if (multi) st.given[st.idx] = inputs.filter(function (c) { return c.checked; }).map(function (c) { return +c.value; });
    else { var sel = inputs.filter(function (c) { return c.checked; })[0]; st.given[st.idx] = sel ? +sel.value : null; }
  }

  function finish() {
    var g = gradeAll();
    st.result = { total: st.questions.length, correct: g.correct };
    st.phase = 'summary';
    if (global.QuizAttempts) QuizAttempts.upsert(localStorage, st.methodId, { id: st.id || Date.now(), methodId: st.methodId, mode: st.mode, lang: st.lang, status: 'completed', idx: st.idx, given: st.given, checked: st.checked, startedAt: st.startedAt, finishedAt: Date.now(), total: st.questions.length, correct: g.correct, perQuestion: g.per });
    renderSummary();
  }

  function renderSummary() {
    var r = st.result;
    var html = '<div class="quiz-summary" data-testid="quiz-summary">' +
      '<h3>' + t('quiz.score', 'Score') + ': <span data-testid="quiz-score">' + r.correct + ' / ' + r.total + '</span></h3>';
    if (st.mode === 'test' && st.given.length === st.questions.length) {
      html += '<ol class="quiz-review">' + st.questions.map(function (q, idx) {
        var res = global.QuizGrade.gradeQuestion(q, st.given[idx]);
        return '<li class="' + (res.isCorrect ? 'ok' : 'bad') + '"><div class="quiz-q-text">' + q.text + '</div>' +
          '<div class="quiz-review-line">' + (res.isCorrect ? t('quiz.correct', 'Correct') : t('quiz.incorrect', 'Incorrect')) + '</div>' +
          (q.generalFeedback ? '<div class="quiz-fb-general">' + q.generalFeedback + '</div>' : '') + '</li>';
      }).join('') + '</ol>';
    }
    html += '<div class="quiz-foot"><button type="button" class="btn secondary" data-act="home">' + t('quiz.home', 'Back') + '</button><button type="button" class="btn primary" data-act="retry" data-testid="quiz-retry">' + t('quiz.retry', 'Retry') + '</button></div></div>';
    body.innerHTML = html;
  }

  function resume(a) {
    var qs = deckFor(st.methodId, a.lang);
    var given = a.given || [];
    if (!qs.length || given.length !== qs.length) return; // stale — ignore
    st = { methodId: st.methodId, id: a.id, status: 'in-progress', lang: a.lang, mode: a.mode, questions: qs,
      idx: Math.min(a.idx || 0, qs.length - 1), given: given.slice(), checked: (a.checked || new Array(qs.length).fill(false)).slice(),
      startedAt: a.startedAt || Date.now(), phase: 'quiz', readonly: false, result: null };
    if (langToggle) langToggle.textContent = st.lang === 'zh' ? '中' : 'EN';
    renderQuestion();
  }
  function review(a) {
    var qs = deckFor(st.methodId, a.lang);
    var given = a.given || [];
    st = { methodId: st.methodId, id: a.id, status: 'completed', lang: a.lang, mode: a.mode, questions: qs,
      idx: 0, given: given.slice(), checked: (a.checked || []).slice(), startedAt: a.startedAt, phase: 'summary', readonly: true,
      result: { total: a.total, correct: a.correct } };
    if (langToggle) langToggle.textContent = st.lang === 'zh' ? '中' : 'EN';
    renderSummary();
  }
  function findAttempt(id) {
    var list = global.QuizAttempts ? QuizAttempts.recentFor(localStorage, st.methodId, 10) : [];
    for (var k = 0; k < list.length; k++) { if (String(list[k].id) === String(id)) return list[k]; }
    return null;
  }

  function onBodyClick(e) {
    var b = e.target.closest ? e.target.closest('[data-act]') : null;
    if (!b || !st) return;
    var act = b.getAttribute('data-act');
    if (act === 'resume') { var ra = findAttempt(b.getAttribute('data-id')); if (ra) resume(ra); return; }
    if (act === 'review') { var va = findAttempt(b.getAttribute('data-id')); if (va) review(va); return; }
    if (act === 'begin') { var m = body.querySelector('input[name="qmode"]:checked'); st.mode = m ? m.value : 'practice'; st.phase = 'quiz'; st.idx = 0; st.given = new Array(st.questions.length).fill(null); st.checked = new Array(st.questions.length).fill(false); st.startedAt = Date.now(); st.id = Date.now(); st.status = 'in-progress'; renderQuestion(); autosave(); return; }
    if (act === 'check') { collectAnswer(); st.checked[st.idx] = true; renderQuestion(); autosave(); return; }
    if (act === 'prev') { collectAnswer(); st.idx = Math.max(0, st.idx - 1); renderQuestion(); autosave(); return; }
    if (act === 'next') { collectAnswer(); if (st.idx < st.questions.length - 1) { st.idx++; renderQuestion(); autosave(); } else { finish(); } return; }
    if (act === 'submit') { collectAnswer(); finish(); return; }
    if (act === 'retry') { open(st.methodId); return; }
    if (act === 'home') { open(st.methodId); return; }
  }

  var api = { open: open, close: close, has: has };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.QuizViewer = api;
})(typeof window !== 'undefined' ? window : globalThis);
```

(Note: `home` now calls `open(methodId)` for a clean fresh start screen — safe for both normal and review states.)

- [ ] **Step 4: i18n keys in `js/i18n.js`** — add to the `en` quiz block and the matching `zh` block:

en (near the other `quiz.*` keys):
```js
            'quiz.resume': 'Resume', 'quiz.review': 'Review', 'quiz.inprogress': 'In progress',
```
zh:
```js
            'quiz.resume': '繼續', 'quiz.review': '重看', 'quiz.inprogress': '進行中',
```

- [ ] **Step 5: CSS in `style.css`** — add after the `.quiz-recent` rules:

```css
.quiz-recent-row { width: 100%; display: flex; align-items: center; gap: 10px; text-align: left; background: transparent; border: 1px solid var(--card-border); border-radius: 8px; padding: 8px 10px; color: var(--text-main); cursor: pointer; font: inherit; }
.quiz-recent-row:hover:not(.stale) { border-color: #3b82f6; background: rgba(59, 130, 246, 0.06); }
.quiz-recent-row.stale { cursor: default; opacity: 0.55; }
.quiz-recent-row .qr-act { margin-left: auto; font-weight: 700; color: #3b82f6; }
.quiz-recent-row.stale .qr-act { color: var(--text-main); }
```

- [ ] **Step 6: Run the E2E** — `npx playwright test tests/quiz.spec.js --reporter=line` → PASS (existing #217 tests + resume + review). Fix any selector drift against the real DOM (do not weaken assertions).

- [ ] **Step 7: Full gate + guards**

```bash
git status --porcelain js/cloud-config.js js/code_db.js js/quiz_rendered.js   # expect empty
npm run test:all
```
Expected: all green — unit (`quiz_attempts` incl. upsert) + E2E (`quiz` incl. resume/review) + counts. #217 behavior intact (single finish = 1 record). `smoke_modes` `tree-trie`/`recursion` may flake under parallel load — confirm they pass in isolation; not a regression.

- [ ] **Step 8: Commit**

```bash
git add js/quiz.js js/i18n.js style.css tests/quiz.spec.js
git commit -m "feat(dsvisual): resume unfinished / review completed quiz attempts from recent panel

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- `QuizAttempts.upsert` (replace-by-id, cap-10) → Task 1. ✓
- Auto-save every step (begin/check/prev/next/close) + finish→upsert(completed) → Task 2 quiz.js (`autosave`, `close`, `finish`, `onBodyClick`). ✓
- Schema grows with status/idx/given/checked → autosave + finish payloads. ✓
- Recent panel clickable: in-progress→Resume, completed→Review, stale→disabled → `recentRow`. ✓
- `resume` (restore mode/idx/answers, deck-length guard) + `review` (read-only score+review, no re-record) → Task 2. ✓
- Back-compat: `isDone` treats status-less records as completed; resume guarded by given-length. ✓
- #217 intact: begin sets id, finish upserts same id → 1 record; existing E2E assertions hold. ✓
- Tests: unit upsert, E2E resume (1 record, restored Q2, flips to completed) + review (read-only, no new record) → Task 1/2. ✓

**Placeholder scan:** No TBD/TODO. Full replacement `quiz.js`; exact i18n + CSS additions; full E2E.

**Type/name consistency:** `QuizAttempts.upsert` signature matches quiz.js callers and unit test. Record schema identical across `autosave`/`finish` (status/idx/given/checked/perQuestion). `data-act`/`data-id` + `data-testid` (`quiz-recent-resume`, `quiz-recent-review`) consistent between `recentRow` and the E2E. `id` is a number (`Date.now()`); compared with `String(id)` in `findAttempt` and rendered as `data-id`. `home` → `open()` avoids stale-state re-render.
