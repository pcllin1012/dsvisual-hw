(function (global) {
  function key(methodId) { return 'dsvisual:quiz:attempts:' + methodId; }
  function recentFor(storage, methodId, limit) {
    try {
      var raw = storage.getItem(key(methodId));
      var arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr.slice(0, limit || 10);
    } catch (e) { return []; }
  }
  function record(storage, methodId, attempt) {
    try {
      var arr = recentFor(storage, methodId, 100);
      arr.unshift(attempt);
      storage.setItem(key(methodId), JSON.stringify(arr.slice(0, 10)));
    } catch (e) { /* ignore */ }
  }
  function clearFor(storage, methodId) { try { storage.removeItem(key(methodId)); } catch (e) {} }
  var api = { key: key, record: record, recentFor: recentFor, clearFor: clearFor };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  global.QuizAttempts = api;
})(typeof window !== 'undefined' ? window : globalThis);
