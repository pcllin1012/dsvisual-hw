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
    var dsjudgeControl = lab.dsjudgeUrl
      ? '<a class="btn secondary" data-testid="lab-dsjudge" href="' + lab.dsjudgeUrl + '" target="_blank" rel="noopener">' + t('lab.dsjudgeSoon', 'Practice on dsjudge (coming soon)') + '</a>'
      : '<button type="button" class="btn secondary" data-testid="lab-dsjudge" aria-disabled="true" disabled>' + t('lab.dsjudgeSoon', 'Practice on dsjudge (coming soon)') + '</button>';
    body.innerHTML =
      '<div class="lab-head"><h3>' + esc(title) + '</h3><div class="lab-meta muted">' + meta.map(esc).join(' · ') + '</div></div>'
      + '<div class="lab-statement" data-testid="lab-statement">' + stmt + '</div>'
      + '<h4>' + t('lab.samples', 'Samples') + '</h4>'
      + '<div class="lab-samples" data-testid="lab-samples">' + lab.samples.map(sampleBlock).join('') + '</div>'
      + '<div class="lab-actions">'
      + '<a class="btn primary" data-testid="lab-open-repo" href="' + lab.repoUrl + '" target="_blank" rel="noopener">' + t('lab.openRepo', 'Open practice repo') + ' ↗</a> '
      + dsjudgeControl
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
