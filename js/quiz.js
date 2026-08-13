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
