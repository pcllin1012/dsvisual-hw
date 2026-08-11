(function (global) {
  var SEARCH_DEFAULT_ARR = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  var SEARCH_DEFAULT_TARGET = 11;

  function linearFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    snap({}, { zh: '線性搜尋 target=' + target + ':從索引 0 開始', en: 'Linear search target=' + target + ': start at index 0' });
    for (var i = 0; i < n; i++) {
      var hi = {}; for (var k = 0; k < i; k++) hi[k] = 'eliminated'; hi[i] = 'mid';
      if (a[i] === target) { hi[i] = 'found'; snap(hi, { zh: 'a[' + i + ']=' + a[i] + ' == 目標,命中索引 ' + i, en: 'a[' + i + ']=' + a[i] + ' == target; found at index ' + i }); return frames; }
      snap(hi, { zh: 'a[' + i + ']=' + a[i] + ' != 目標,繼續', en: 'a[' + i + ']=' + a[i] + ' != target; continue' });
    }
    var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated';
    snap(all, { zh: '掃描完畢,找不到 ' + target, en: 'Scanned all; ' + target + ' not found' });
    return frames;
  }

  function rangeElim(n, lo, hi) { var h = {}; for (var k = 0; k < lo; k++) h[k] = 'eliminated'; for (var j = hi + 1; j < n; j++) h[j] = 'eliminated'; return h; }

  function binaryFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    snap({}, { zh: '二分搜尋 target=' + target + ':範圍 [0,' + (n - 1) + ']', en: 'Binary search target=' + target + ': range [0,' + (n - 1) + ']' });
    var lo = 0, hi = n - 1;
    while (lo <= hi) {
      var mid = Math.floor((lo + hi) / 2);
      var h = rangeElim(n, lo, hi); if (lo !== mid) h[lo] = 'lo'; if (hi !== mid) h[hi] = 'hi'; h[mid] = 'mid';
      if (a[mid] === target) { h[mid] = 'found'; snap(h, { zh: 'a[' + mid + ']=' + a[mid] + ' == 目標,命中索引 ' + mid, en: 'a[' + mid + ']=' + a[mid] + ' == target; found at index ' + mid }); return frames; }
      if (a[mid] < target) { snap(h, { zh: 'a[' + mid + ']=' + a[mid] + ' < 目標,取右半 lo=' + (mid + 1), en: 'a[' + mid + ']=' + a[mid] + ' < target; go right, lo=' + (mid + 1) }); lo = mid + 1; }
      else { snap(h, { zh: 'a[' + mid + ']=' + a[mid] + ' > 目標,取左半 hi=' + (mid - 1), en: 'a[' + mid + ']=' + a[mid] + ' > target; go left, hi=' + (mid - 1) }); hi = mid - 1; }
    }
    var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated';
    snap(all, { zh: '範圍為空,找不到 ' + target, en: 'Range empty; ' + target + ' not found' });
    return frames;
  }

  function fibonacciFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function elim(off) { var h = {}; for (var k = 0; k <= off; k++) h[k] = 'eliminated'; return h; }
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    var fib2 = 0, fib1 = 1, fibM = fib2 + fib1;
    while (fibM < n) { fib2 = fib1; fib1 = fibM; fibM = fib2 + fib1; }
    var offset = -1;
    snap({}, { zh: '費氏搜尋 target=' + target + ':取 ≥ n 的最小費氏數 ' + fibM, en: 'Fibonacci search target=' + target + ': smallest Fib ≥ n is ' + fibM });
    while (fibM > 1) {
      var i = Math.min(offset + fib2, n - 1);
      var h = elim(offset); h[i] = 'mid';
      if (a[i] < target) { snap(h, { zh: 'arr[' + i + ']=' + a[i] + ' < 目標,往右縮小範圍', en: 'arr[' + i + ']=' + a[i] + ' < target; shrink right' }); fibM = fib1; fib1 = fib2; fib2 = fibM - fib1; offset = i; }
      else if (a[i] > target) { snap(h, { zh: 'arr[' + i + ']=' + a[i] + ' > 目標,往左縮小範圍', en: 'arr[' + i + ']=' + a[i] + ' > target; shrink left' }); fibM = fib2; fib1 = fib1 - fib2; fib2 = fibM - fib1; }
      else { h[i] = 'found'; snap(h, { zh: '命中!目標在索引 ' + i, en: 'Hit! target at index ' + i }); return frames; }
    }
    if (fib1 === 1 && offset + 1 < n && a[offset + 1] === target) { var hh = elim(offset); hh[offset + 1] = 'found'; snap(hh, { zh: '比對最後一個元素,命中索引 ' + (offset + 1), en: 'Check last element; hit at index ' + (offset + 1) }); return frames; }
    var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated';
    snap(all, { zh: '找不到 ' + target, en: 'Target ' + target + ' not found' });
    return frames;
  }

  function interpolationFrames(arr, target) {
    var a = arr.slice(), n = a.length, frames = [];
    function snap(hi, msg) { frames.push({ array: a.slice(), hi: hi, message: msg }); }
    snap({}, { zh: '內插搜尋 target=' + target + ':範圍 [0,' + (n - 1) + ']', en: 'Interpolation search target=' + target + ': range [0,' + (n - 1) + ']' });
    var lo = 0, hi = n - 1, hit = false;
    while (lo <= hi && target >= a[lo] && target <= a[hi]) {
      if (a[hi] === a[lo]) {
        var he = rangeElim(n, lo, hi); he[lo] = 'mid';
        if (a[lo] === target) { he[lo] = 'found'; snap(he, { zh: '範圍內值相同,命中索引 ' + lo, en: 'Equal-valued range; hit at index ' + lo }); hit = true; }
        else snap(he, { zh: '範圍內值相同但不符,結束', en: 'Equal-valued range, no match' });
        break;
      }
      var pos = lo + Math.floor((target - a[lo]) * (hi - lo) / (a[hi] - a[lo]));
      if (pos < lo) pos = lo; if (pos > hi) pos = hi;
      var h = rangeElim(n, lo, hi); if (lo !== pos) h[lo] = 'lo'; if (hi !== pos) h[hi] = 'hi'; h[pos] = 'mid';
      if (a[pos] === target) { h[pos] = 'found'; snap(h, { zh: '內插位置 ' + pos + ' 命中', en: 'Interpolated position ' + pos + ' hits' }); hit = true; break; }
      else if (a[pos] < target) { snap(h, { zh: 'arr[' + pos + ']=' + a[pos] + ' < 目標,lo = ' + (pos + 1), en: 'arr[' + pos + ']=' + a[pos] + ' < target; lo = ' + (pos + 1) }); lo = pos + 1; }
      else { snap(h, { zh: 'arr[' + pos + ']=' + a[pos] + ' > 目標,hi = ' + (pos - 1), en: 'arr[' + pos + ']=' + a[pos] + ' > target; hi = ' + (pos - 1) }); hi = pos - 1; }
    }
    if (!hit) { var all = {}; for (var m = 0; m < n; m++) all[m] = 'eliminated'; snap(all, { zh: '找不到 ' + target, en: 'Target ' + target + ' not found' }); }
    return frames;
  }

  var api = { linearFrames: linearFrames, binaryFrames: binaryFrames, fibonacciFrames: fibonacciFrames, interpolationFrames: interpolationFrames, SEARCH_DEFAULT_ARR: SEARCH_DEFAULT_ARR, SEARCH_DEFAULT_TARGET: SEARCH_DEFAULT_TARGET };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SearchFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
