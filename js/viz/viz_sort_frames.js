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

  function quickFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    var st = [[0, n - 1]];
    while (st.length) {
      var seg = st.pop(), low = seg[0], high = seg[1];
      if (low > high) continue;
      if (low === high) { sorted[low] = 'sorted'; snap({}, { zh: 'a[' + low + '] 已就位', en: 'a[' + low + '] settled' }); continue; }
      var pivot = a[high], i = low - 1;
      var pc = {}; pc[high] = 'pivot';
      snap(pc, { zh: '選 pivot = a[' + high + ']=' + pivot, en: 'Pick pivot = a[' + high + ']=' + pivot });
      for (var j = low; j < high; j++) {
        var cc = {}; cc[high] = 'pivot'; cc[j] = 'comparing';
        snap(cc, { zh: '比較 a[' + j + ']=' + a[j] + ' 與 pivot', en: 'Compare a[' + j + ']=' + a[j] + ' with pivot' });
        if (a[j] < pivot) { i++; var t = a[i]; a[i] = a[j]; a[j] = t; var sc = {}; sc[high] = 'pivot'; sc[i] = 'swapping'; snap(sc, { zh: 'a[' + j + '] < pivot,交換到位置 ' + i, en: 'a[' + j + '] < pivot, swap to position ' + i }); }
      }
      var t2 = a[i + 1]; a[i + 1] = a[high]; a[high] = t2; var p = i + 1; sorted[p] = 'sorted';
      var dc = {}; dc[p] = 'sorted';
      snap(dc, { zh: 'pivot 定位於 ' + p, en: 'pivot placed at ' + p });
      st.push([low, p - 1]); st.push([p + 1, high]);
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function mergeFrames(input) {
    var a = input.slice(), n = a.length, frames = [];
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: cur || {}, message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    function ms(l, r) {
      if (l >= r) return;
      var m = Math.floor((l + r) / 2);
      ms(l, m); ms(m + 1, r);
      var L = a.slice(l, m + 1), R = a.slice(m + 1, r + 1);
      snap({}, { zh: '合併 [' + l + ',' + m + '] 與 [' + (m + 1) + ',' + r + ']', en: 'Merge [' + l + ',' + m + '] and [' + (m + 1) + ',' + r + ']' });
      var i = 0, j = 0, k = l;
      while (i < L.length && j < R.length) {
        if (L[i] <= R[j]) { a[k] = L[i]; i++; } else { a[k] = R[j]; j++; }
        var c = {}; c[k] = 'sorted';
        snap(c, { zh: '取較小者寫入 a[' + k + ']=' + a[k], en: 'Write smaller into a[' + k + ']=' + a[k] });
        k++;
      }
      while (i < L.length) { a[k] = L[i]; var c1 = {}; c1[k] = 'sorted'; snap(c1, { zh: '寫入剩餘 a[' + k + ']=' + a[k], en: 'Write remaining a[' + k + ']=' + a[k] }); i++; k++; }
      while (j < R.length) { a[k] = R[j]; var c2 = {}; c2[k] = 'sorted'; snap(c2, { zh: '寫入剩餘 a[' + k + ']=' + a[k], en: 'Write remaining a[' + k + ']=' + a[k] }); j++; k++; }
    }
    ms(0, n - 1);
    var all = {}; for (var x = 0; x < n; x++) all[x] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function shellFrames(input) {
    var a = input.slice(), n = a.length, frames = [];
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: cur || {}, message: msg }); }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      for (var i = gap; i < n; i++) {
        var j = i;
        while (j >= gap && a[j - gap] > a[j]) {
          var c = {}; c[j] = 'comparing'; c[j - gap] = 'comparing';
          snap(c, { zh: 'gap=' + gap + ':比較 a[' + (j - gap) + '] 與 a[' + j + ']', en: 'gap=' + gap + ': compare a[' + (j - gap) + '] and a[' + j + ']' });
          var t = a[j]; a[j] = a[j - gap]; a[j - gap] = t;
          var s = {}; s[j] = 'swapping'; s[j - gap] = 'swapping';
          snap(s, { zh: 'gap=' + gap + ':交換', en: 'gap=' + gap + ': swap' });
          j -= gap;
        }
      }
    }
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  function heapFrames(input) {
    var a = input.slice(), n = a.length, frames = [], sorted = {};
    function snap(cur, msg) { frames.push({ array: a.slice(), hi: hiOf(sorted, cur), message: msg }); }
    function siftDown(i, size) {
      while (true) {
        var l = 2 * i + 1, r = 2 * i + 2, largest = i;
        if (l < size && a[l] > a[largest]) largest = l;
        if (r < size && a[r] > a[largest]) largest = r;
        if (largest === i) break;
        var c = {}; c[i] = 'active'; c[largest] = 'active';
        snap(c, { zh: '下沉:交換 a[' + i + '] 與較大子節點 a[' + largest + ']', en: 'Sift-down: swap a[' + i + '] with larger child a[' + largest + ']' });
        var t = a[i]; a[i] = a[largest]; a[largest] = t;
        i = largest;
      }
    }
    snap({}, { zh: '起始陣列', en: 'Initial array' });
    for (var i = Math.floor(n / 2) - 1; i >= 0; i--) siftDown(i, n);
    snap({}, { zh: '最大堆建立完成', en: 'Max-heap built' });
    for (var e = n - 1; e > 0; e--) {
      var c = {}; c[0] = 'active'; c[e] = 'active';
      snap(c, { zh: '取出堆頂 a[0] 到位置 ' + e, en: 'Extract max a[0] to position ' + e });
      var t = a[0]; a[0] = a[e]; a[e] = t; sorted[e] = 'sorted';
      siftDown(0, e);
    }
    sorted[0] = 'sorted';
    var all = {}; for (var k = 0; k < n; k++) all[k] = 'sorted';
    frames.push({ array: a.slice(), hi: all, message: { zh: '排序完成', en: 'Sorted' } });
    return frames;
  }

  var api = { bubbleFrames: bubbleFrames, selectionFrames: selectionFrames, insertionFrames: insertionFrames, quickFrames: quickFrames, mergeFrames: mergeFrames, shellFrames: shellFrames, heapFrames: heapFrames, SORT_DEFAULT: SORT_DEFAULT };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.SortFrames = api;
})(typeof window !== 'undefined' ? window : globalThis);
