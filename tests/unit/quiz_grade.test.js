const test = require('node:test');
const assert = require('node:assert/strict');
const { gradeQuestion } = require('../../js/quiz_grade.js');

const single = { type: 'multichoice', single: true, answers: [{ text: 'a', fraction: 100 }, { text: 'b', fraction: 0 }], generalFeedback: 'g' };
const tf = { type: 'truefalse', answers: [{ text: 'true', fraction: 0 }, { text: 'false', fraction: 100 }] };
const multi = { type: 'multichoice', single: false, answers: [{ text: 'a', fraction: 50 }, { text: 'b', fraction: 50 }, { text: 'c', fraction: -50 }] };
const sa = { type: 'shortanswer', usecase: false, answers: [{ text: 'pivot', fraction: 100 }, { text: 'piv*', fraction: 100 }] };

test('single MC correct/incorrect', () => {
  assert.equal(gradeQuestion(single, 0).isCorrect, true);
  assert.equal(gradeQuestion(single, 1).isCorrect, false);
});
test('truefalse picks the fraction-100 side', () => {
  assert.equal(gradeQuestion(tf, 1).isCorrect, true);
  assert.equal(gradeQuestion(tf, 0).isCorrect, false);
});
test('multi MC needs exactly the positive set and no negatives', () => {
  assert.equal(gradeQuestion(multi, [0, 1]).isCorrect, true);
  assert.equal(gradeQuestion(multi, [0]).isCorrect, false);       // incomplete
  assert.equal(gradeQuestion(multi, [0, 1, 2]).isCorrect, false); // includes a negative
});
test('shortanswer: case-insensitive + wildcard', () => {
  assert.equal(gradeQuestion(sa, 'Pivot').isCorrect, true);   // usecase false
  assert.equal(gradeQuestion(sa, 'pivoting').isCorrect, true); // piv* matches
  assert.equal(gradeQuestion(sa, 'partition').isCorrect, false);
  assert.equal(gradeQuestion(sa, '').isCorrect, false);
});
test('shortanswer respects usecase when true', () => {
  const cs = { type: 'shortanswer', usecase: true, answers: [{ text: 'Pivot', fraction: 100 }] };
  assert.equal(gradeQuestion(cs, 'pivot').isCorrect, false);
  assert.equal(gradeQuestion(cs, 'Pivot').isCorrect, true);
});
