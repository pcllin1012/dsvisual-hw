(function (global) {
  var STRSEARCH_DEFAULT_TEXT = 'ABABDABACDABABCABAB';
  var STRSEARCH_DEFAULT_PATTERN = 'ABABCABAB';

  function escCh(c) { return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : c; }

  // Shared alignment paint core (consolidated from the 4 old private copies).
  function buildAlignmentRow(text, pattern, offset, hi) {
    function cls(on) { return on && hi && hi.status ? ' strsearch-' + hi.status : ''; }
    var t = '<div class="strsearch-row strsearch-text">';
    for (var k = 0; k < text.length; k++) {
      var on = false;
      if (hi && hi.kind === 'cell') on = (k === hi.textIdx);
      else if (hi && hi.kind === 'window') on = (k >= offset && k < offset + pattern.length);
      t += '<span class="strsearch-cell' + cls(on) + '">' + escCh(text[k]) + '</span>';
    }
    t += '</div>';
    var p = '<div class="strsearch-row strsearch-pattern">';
    for (var s = 0; s < offset; s++) p += '<span class="strsearch-cell strsearch-spacer"></span>';
    for (var q = 0; q < pattern.length; q++) {
      var on2 = false;
      if (hi && hi.kind === 'cell') on2 = (q === hi.patIdx);
      else if (hi && hi.kind === 'window') on2 = true;
      p += '<span class="strsearch-cell' + cls(on2) + '">' + escCh(pattern[q]) + '</span>';
    }
    p += '</div>';
    return t + p;
  }

  function kmpFrames(text, pattern) {
    var m = pattern.length, lps = new Array(m).fill(0);
    for (var len = 0, k = 1; k < m;) { if (pattern[k] === pattern[len]) lps[k++] = ++len; else if (len !== 0) len = lps[len - 1]; else lps[k++] = 0; }
    var frames = [], i = 0, j = 0, comparisons = 0, matches = [];
    function push(offset, hi, lpsActive, msg) { frames.push({ text: text, pattern: pattern, offset: offset, hi: hi, extras: { kind: 'kmp', lps: lps.slice(), lpsActive: lpsActive, comparisons: comparisons, matches: matches.slice() }, message: msg }); }
    push(0, null, -1, { zh: 'KMP:先算 LPS,i=j=0 開始掃描', en: 'KMP: LPS ready; scan from i=j=0' });
    while (i < text.length && m > 0) {
      comparisons++;
      var ti = i, pj = j, drawOffset = i - j;
      if (text[i] === pattern[j]) {
        i++; j++;
        if (j === m) { var pos = i - m; matches.push(pos); j = lps[j - 1]; push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, -1, { zh: '相符 → pattern 完整命中於位置 ' + pos, en: 'match → full pattern at index ' + pos }); }
        else push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, -1, { zh: '字元相符 text[' + ti + ']=pattern[' + pj + '],往右', en: 'chars match text[' + ti + ']=pattern[' + pj + '], advance' });
      } else if (j !== 0) { var la = pj - 1; j = lps[j - 1]; push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, la, { zh: '不相符,j 依 LPS 退回 ' + j, en: 'mismatch; fall back j to ' + j + ' via LPS' }); }
      else { i++; push(drawOffset, { kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, -1, { zh: '不相符且 j=0,i 前進', en: 'mismatch at j=0; advance i' }); }
    }
    push(0, null, -1, { zh: '完成,命中位置 [' + matches.join(',') + ']', en: 'Done. Matches at [' + matches.join(',') + ']' });
    return frames;
  }

  function bmFrames(text, pattern) {
    var n = text.length, m = pattern.length;
    var badChar = {}; for (var b = 0; b < m; b++) badChar[pattern[b]] = b;
    var shift = new Array(m + 1).fill(0), bpos = new Array(m + 1).fill(0);
    (function () { var i = m, j = m + 1; bpos[i] = j; while (i > 0) { while (j <= m && pattern[i - 1] !== pattern[j - 1]) { if (shift[j] === 0) shift[j] = j - i; j = bpos[j]; } i--; j--; bpos[i] = j; } j = bpos[0]; for (i = 0; i <= m; i++) { if (shift[i] === 0) shift[i] = j; if (i === j) j = bpos[j]; } })();
    var frames = [], s = 0, jj = m - 1, comparisons = 0, matches = [];
    function push(hi, note, msg) { frames.push({ text: text, pattern: pattern, offset: Math.min(s, Math.max(0, n - m)), hi: hi, extras: { kind: 'bm', note: note, comparisons: comparisons, matches: matches.slice() }, message: msg }); }
    push(null, '', { zh: 'Boyer–Moore:預處理 bad-char/good-suffix,從右往左比對', en: 'Boyer–Moore: preprocess; compare right-to-left' });
    while (s <= n - m && m > 0) {
      comparisons++;
      var ti = s + jj, pj = jj;
      if (pattern[jj] === text[s + jj]) {
        if (jj === 0) { matches.push(s); push({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, 'full match at index ' + s, { zh: '完全命中於位置 ' + s, en: 'full match at index ' + s }); s += shift[0]; jj = m - 1; }
        else { push({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'match' }, 'match — scan left', { zh: '相符,往左掃描 j=' + (jj - 1), en: 'match; scan left j=' + (jj - 1) }); jj--; }
      } else {
        var bcRaw = badChar[text[s + jj]]; var bcShift = Math.max(1, jj - (bcRaw === undefined ? -1 : bcRaw)); var gsShift = shift[jj + 1]; var by = Math.max(bcShift, gsShift); var used = gsShift >= bcShift ? 'good-suffix' : 'bad-character';
        push({ kind: 'cell', textIdx: ti, patIdx: pj, status: 'mismatch' }, 'mismatch — bad-char=' + bcShift + ', good-suffix=' + gsShift + ' &rarr; shift by ' + by + ' (' + used + ')', { zh: '不相符,位移 ' + by + '(' + used + ')', en: 'mismatch; shift by ' + by + ' (' + used + ')' });
        s += by; jj = m - 1;
      }
    }
    push(null, '', { zh: '完成,命中位置 [' + matches.join(',') + ']', en: 'Done. Matches at [' + matches.join(',') + ']' });
    return frames;
  }

  function rkFrames(text, pattern) {
    var BASE = 256, MOD = 101, n = text.length, m = pattern.length;
    var h = 1; for (var a = 0; a < m - 1; a++) h = (h * BASE) % MOD;
    var patHash = 0; for (var b = 0; b < m; b++) patHash = (BASE * patHash + pattern.charCodeAt(b)) % MOD;
    function windowHash(start) { var wh = 0; for (var k = 0; k < m; k++) wh = (BASE * wh + text.charCodeAt(start + k)) % MOD; return wh; }
    var frames = [], s = 0, winHash = (m > 0 && m <= n) ? windowHash(0) : 0, hashChecks = 0, verifyChecks = 0, matches = [];
    function push(status, note, msg) { frames.push({ text: text, pattern: pattern, offset: Math.min(s, Math.max(0, n - m)), hi: { kind: 'window', status: status }, extras: { kind: 'rk', patHash: patHash, winHash: winHash, hashChecks: hashChecks, verifyChecks: verifyChecks, matches: matches.slice(), note: note }, message: msg }); }
    push(null, '', { zh: 'Rabin–Karp:比較 pattern 雜湊與視窗雜湊', en: 'Rabin–Karp: compare pattern hash vs window hash' });
    while (s <= n - m && m > 0) {
      hashChecks++;
      var status, note, msg;
      if (winHash === patHash) { var k = 0; while (k < m && text[s + k] === pattern[k]) { verifyChecks++; k++; } if (k === m) { matches.push(s); status = 'match'; note = 'hash hit + verified &rarr; match at ' + s; msg = { zh: '雜湊命中並驗證,位置 ' + s, en: 'hash hit + verified at ' + s }; } else { status = 'collision'; note = 'hash hit but verify failed &rarr; collision'; msg = { zh: '雜湊碰撞(驗證失敗)', en: 'hash collision (verify failed)' }; } }
      else { status = 'mismatch'; note = 'hash mismatch &rarr; slide window'; msg = { zh: '雜湊不符,滑動視窗', en: 'hash mismatch; slide window' }; }
      push(status, note, msg);
      if (s < n - m) { winHash = (BASE * (winHash - text.charCodeAt(s) * h) + text.charCodeAt(s + m)) % MOD; winHash = ((winHash % MOD) + MOD) % MOD; }
      s++;
    }
    push(null, '', { zh: '完成,命中位置 [' + matches.join(',') + ']', en: 'Done. Matches at [' + matches.join(',') + ']' });
    return frames;
  }

  function zalgoFrames(text, pattern) {
    var combined = pattern + '$' + text, n = combined.length, m = pattern.length;
    var z = new Array(n).fill(0), trace = [{ l: 0, r: 0 }];
    (function () { var l = 0, r = 0; for (var i = 1; i < n; i++) { if (i < r) z[i] = Math.min(r - i, z[i - l]); while (i + z[i] < n && combined[z[i]] === combined[i + z[i]]) z[i]++; if (i + z[i] > r) { l = i; r = i + z[i]; } trace[i] = { l: l, r: r }; } })();
    var allMatches = []; for (var k = 1; k < n; k++) { if (m > 0 && z[k] === m) allMatches.push(k - m - 1); }
    var frames = [];
    for (var i = 0; i < n; i++) {
      var cur = i + 1, box = trace[i] || { l: 0, r: 0 };
      frames.push({ text: text, pattern: pattern, offset: null, hi: null, extras: { kind: 'zalgo', combined: combined, z: z, cur: cur, box: box, matches: allMatches.slice() }, message: i === 0 ? { zh: 'Z 演算法:s = pattern$text,逐格計算 Z 值', en: 'Z-algorithm: s = pattern$text; compute Z per index' } : { zh: '計算 Z[' + i + ']=' + z[i] + (z[i] === m ? ' → 命中!' : ''), en: 'Z[' + i + ']=' + z[i] + (z[i] === m ? ' → match!' : '') } });
    }
    return frames;
  }

  function strcompareFrames(text, pattern) {
    var n = text.length, m = pattern.length;
    var lps = new Array(m).fill(0);
    for (var len = 0, k = 1; k < m;) { if (pattern[k] === pattern[len]) lps[k++] = ++len; else if (len !== 0) len = lps[len - 1]; else lps[k++] = 0; }
    var kmp = { i: 0, j: 0, cmp: 0, done: m === 0 };
    function kmpStep() { if (kmp.done || kmp.i >= n) { kmp.done = true; return; } kmp.cmp++; if (text[kmp.i] === pattern[kmp.j]) { kmp.i++; kmp.j++; if (kmp.j === m) kmp.j = lps[kmp.j - 1]; } else if (kmp.j !== 0) { kmp.j = lps[kmp.j - 1]; } else { kmp.i++; } if (kmp.i >= n) kmp.done = true; }
    var bad = {}; for (var b = 0; b < m; b++) bad[pattern[b]] = b;
    var bm = { s: 0, j: m - 1, cmp: 0, done: m === 0 || m > n };
    function bmStep() { if (bm.done || bm.s > n - m) { bm.done = true; return; } bm.cmp++; if (pattern[bm.j] === text[bm.s + bm.j]) { if (bm.j === 0) { bm.s += 1; bm.j = m - 1; } else bm.j--; } else { var bcRaw = bad[text[bm.s + bm.j]]; bm.s += Math.max(1, bm.j - (bcRaw === undefined ? -1 : bcRaw)); bm.j = m - 1; } if (bm.s > n - m) bm.done = true; }
    var BASE = 256, MOD = 101, rkH = 1; for (var a = 0; a < m - 1; a++) rkH = (rkH * BASE) % MOD;
    var rkPat = 0; for (var c = 0; c < m; c++) rkPat = (BASE * rkPat + pattern.charCodeAt(c)) % MOD;
    function rkWindow(start) { var wh = 0; for (var k = 0; k < m; k++) wh = (BASE * wh + text.charCodeAt(start + k)) % MOD; return wh; }
    var rk = { s: 0, hash: (m > 0 && m <= n) ? rkWindow(0) : 0, cmp: 0, done: m === 0 || m > n };
    function rkStep() { if (rk.done || rk.s > n - m) { rk.done = true; return; } rk.cmp++; if (rk.hash === rkPat) { var k = 0; while (k < m && text[rk.s + k] === pattern[k]) { rk.cmp++; k++; } } if (rk.s < n - m) { rk.hash = (BASE * (rk.hash - text.charCodeAt(rk.s) * rkH) + text.charCodeAt(rk.s + m)) % MOD; rk.hash = ((rk.hash % MOD) + MOD) % MOD; } rk.s++; if (rk.s > n - m) rk.done = true; }
    function snap(msg) { return { text: text, pattern: pattern, panes: { kmp: { offset: kmp.i - kmp.j, hi: null, cmp: kmp.cmp, done: kmp.done }, bm: { offset: Math.min(bm.s, Math.max(0, n - m)), hi: null, cmp: bm.cmp, done: bm.done }, rk: { offset: Math.min(rk.s, Math.max(0, n - m)), hi: { kind: 'window', status: null }, cmp: rk.cmp, done: rk.done } }, message: msg }; }
    var frames = [snap({ zh: '三演算法同步比較:每步各推進一次', en: 'Compare three algorithms in lockstep; each advances one step' })];
    var guard = 0;
    while (!(kmp.done && bm.done && rk.done) && guard++ < 100000) { kmpStep(); bmStep(); rkStep(); frames.push(snap({ zh: '步驟 ' + guard + ':KMP cmp=' + kmp.cmp + ', BM cmp=' + bm.cmp + ', RK cmp=' + rk.cmp, en: 'Step ' + guard + ': KMP cmp=' + kmp.cmp + ', BM cmp=' + bm.cmp + ', RK cmp=' + rk.cmp } )); }
    return frames;
  }

  var api = { buildAlignmentRow: buildAlignmentRow, kmpFrames: kmpFrames, bmFrames: bmFrames, rkFrames: rkFrames, zalgoFrames: zalgoFrames, strcompareFrames: strcompareFrames, STRSEARCH_DEFAULT_TEXT: STRSEARCH_DEFAULT_TEXT, STRSEARCH_DEFAULT_PATTERN: STRSEARCH_DEFAULT_PATTERN };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.StrSearchFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
