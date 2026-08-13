const test = require('node:test');
const assert = require('node:assert/strict');
const { parseQuizXml } = require('../../build_quiz.js');

const XML = `<?xml version="1.0" encoding="UTF-8"?>
<quiz>
  <question type="category"><category><text>$course$/Quick Sort</text></category></question>
  <question type="multichoice">
    <name><text>avg complexity</text></name>
    <questiontext format="html"><text><![CDATA[<p>Average-case time of quicksort?</p>]]></text></questiontext>
    <single>true</single>
    <answer fraction="100"><text>O(n log n)</text><feedback><text>Right.</text></feedback></answer>
    <answer fraction="0"><text>O(n^2)</text><feedback><text>Worst case.</text></feedback></answer>
    <generalfeedback><text>Partitioning halves the array on average.</text></generalfeedback>
  </question>
  <question type="truefalse">
    <name><text>stable</text></name>
    <questiontext format="html"><text>Quicksort is stable.</text></questiontext>
    <answer fraction="0"><text>true</text></answer>
    <answer fraction="100"><text>false</text></answer>
  </question>
  <question type="shortanswer">
    <name><text>pivot</text></name>
    <questiontext format="html"><text>The partition element is the ___.</text></questiontext>
    <usecase>0</usecase>
    <answer fraction="100"><text>pivot</text></answer>
    <answer fraction="100"><text>pivot*</text></answer>
  </question>
  <question type="essay"><name><text>ignored</text></name><questiontext><text>write</text></questiontext></question>
</quiz>`;

test('parses the three supported types, skips others', () => {
  const qs = parseQuizXml(XML);
  assert.equal(qs.length, 3, 'category + essay skipped');
  assert.deepEqual(qs.map((q) => q.type), ['multichoice', 'truefalse', 'shortanswer']);
});

test('multichoice: single flag, fractions, feedback, sanitized html', () => {
  const q = parseQuizXml(XML)[0];
  assert.equal(q.single, true);
  assert.match(q.text, /Average-case/);
  assert.equal(q.answers.length, 2);
  assert.equal(q.answers[0].fraction, 100);
  assert.equal(q.answers[0].text, 'O(n log n)');
  assert.match(q.answers[1].feedback, /Worst case/);
  assert.match(q.generalFeedback, /halves/);
});

test('truefalse answers keep true/false with fractions', () => {
  const q = parseQuizXml(XML)[1];
  assert.equal(q.type, 'truefalse');
  const byText = Object.fromEntries(q.answers.map((a) => [a.text, a.fraction]));
  assert.equal(byText.true, 0);
  assert.equal(byText.false, 100);
});

test('shortanswer keeps usecase + acceptable answers', () => {
  const q = parseQuizXml(XML)[2];
  assert.equal(q.usecase, false); // <usecase>0</usecase> => case-insensitive
  assert.deepEqual(q.answers.map((a) => a.text), ['pivot', 'pivot*']);
});

test('sanitize strips scripts/handlers', () => {
  const qs = parseQuizXml(`<quiz><question type="truefalse"><name><text>x</text></name>
    <questiontext format="html"><text><![CDATA[<p onclick="alert(1)">hi<script>bad()</script></p>]]></text></questiontext>
    <answer fraction="100"><text>true</text></answer><answer fraction="0"><text>false</text></answer></question></quiz>`);
  assert.doesNotMatch(qs[0].text, /onclick|<script/i);
});
