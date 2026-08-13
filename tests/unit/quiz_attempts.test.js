const test = require('node:test');
const assert = require('node:assert/strict');
const QA = require('../../js/quiz_attempts.js');

function memStorage() {
  const m = {};
  return { getItem: (k) => (k in m ? m[k] : null), setItem: (k, v) => { m[k] = String(v); }, removeItem: (k) => { delete m[k]; } };
}

test('per-method key isolation', () => {
  assert.equal(QA.key('sort-quick'), 'dsvisual:quiz:attempts:sort-quick');
});
test('records newest-first, caps at 10, per method', () => {
  const s = memStorage();
  for (let i = 0; i < 12; i++) QA.record(s, 'sort-quick', { id: i, correct: i, total: 6 });
  const r = QA.recentFor(s, 'sort-quick', 10);
  assert.equal(r.length, 10);
  assert.equal(r[0].id, 11);           // newest first
  assert.equal(r[9].id, 2);            // oldest kept
  QA.record(s, 'sort-bubble', { id: 99, correct: 1, total: 1 });
  assert.equal(QA.recentFor(s, 'sort-quick', 10).length, 10); // other method unaffected
  assert.equal(QA.recentFor(s, 'sort-bubble', 10).length, 1);
});
test('bad storage / corrupt data tolerated', () => {
  const s = memStorage(); s.setItem(QA.key('x'), 'not json');
  assert.deepEqual(QA.recentFor(s, 'x', 10), []);
});
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
