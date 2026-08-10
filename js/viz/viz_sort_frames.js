(function (global) {
  'use strict';

  var SORT_DEFAULT = [5, 2, 8, 1, 9, 3, 7, 4, 6];

  // merge the persistent "sorted" map with the current-step highlight map
  function hiOf(sorted, cur) {
    var h = {}, k;
    for (k in sorted) h[k] = sorted[k];
    for (k in cur) h[k] = cur[k];
    return h;
  }

  function bubbleFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var i = 0; i < n - 1; i++) {
      for (var j = 0; j < n - i - 1; j++) {
        var c = {}; c[j] = 'comparing'; c[j + 1] = 'comparing';
        snap(c, { zh: '比較 a[' + j + ']=' + a[j] + ' 與 a[' + (j + 1) + ']=' + a[j + 1], en: 'Compare a[' + j + ']=' + a[j] + ' and a[' + (j + 1) + ']=' + a[j + 1] });
        if (a[j] > a[j + 1]) {
          var t = a[j]; a[j] = a[j + 1]; a[j + 1] = t;
          var s = {}; s[j] = 'swapping'; s[j + 1] = 'swapping';
          snap(s, { zh: '交換 a[' + j + '] ↔ a[' + (j + 1) + ']', en: 'Swap a[' + j + '] ↔ a[' + (j + 1) + ']' });
        }
      }
      sorted[n - i - 1] = 'sorted';
    }
    sorted[0] = 'sorted';
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function selectionFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var i = 0; i < n - 1; i++) {
      var min = i;
      for (var j = i + 1; j < n; j++) {
        var c = {}; c[min] = 'pivot'; c[j] = 'comparing';
        snap(c, { zh: '掃描:目前最小 a[' + min + ']=' + a[min] + ',比較 a[' + j + ']=' + a[j], en: 'Scan: current min a[' + min + ']=' + a[min] + ', compare a[' + j + ']=' + a[j] });
        if (a[j] < a[min]) min = j;
      }
      if (min !== i) { var t = a[i]; a[i] = a[min]; a[min] = t; }
      var s = {}; s[i] = 'swapping';
      snap(s, { zh: '將最小值放到位置 ' + i, en: 'Place the minimum at position ' + i });
      sorted[i] = 'sorted';
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function insertionFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    sorted[0] = 'sorted';
    for (var i = 1; i < n; i++) {
      var j = i;
      var pick = {}; pick[i] = 'swapping';
      snap(pick, { zh: '取出 key=a[' + i + ']=' + a[i] + ',往左插入', en: 'Take key=a[' + i + ']=' + a[i] + ', insert leftward' });
      while (j > 0 && a[j - 1] > a[j]) {
        var c = {}; c[j - 1] = 'comparing'; c[j] = 'comparing';
        snap(c, { zh: 'a[' + (j - 1) + ']=' + a[j - 1] + ' > key,右移', en: 'a[' + (j - 1) + ']=' + a[j - 1] + ' > key, shift right' });
        var t = a[j - 1]; a[j - 1] = a[j]; a[j] = t;
        j--;
      }
      for (var s = 0; s <= i; s++) sorted[s] = 'sorted';
      snap({}, { zh: 'key 插入位置 ' + j, en: 'key inserted at position ' + j });
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  var api = { bubbleFrames: bubbleFrames, selectionFrames: selectionFrames, insertionFrames: insertionFrames, SORT_DEFAULT: SORT_DEFAULT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SortFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
