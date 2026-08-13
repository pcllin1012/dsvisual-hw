const fs = require('fs');
const path = require('path');
const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  cdataPropName: '__cdata',
  trimValues: true,
  parseTagValue: false,
  isArray: (name) => name === 'question' || name === 'answer',
});

function rawText(node) {
  if (node == null) return '';
  if (typeof node === 'string') return node;
  const t = node.text !== undefined ? node.text : node;
  if (t == null) return '';
  if (typeof t === 'string') return t;
  if (t.__cdata !== undefined) return String(t.__cdata);
  if (t['#text'] !== undefined) return String(t['#text']);
  return '';
}
function sanitize(html) {
  return String(html)
    .replace(/<\s*(script|style)\b[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, '')
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/javascript:/gi, '')
    .trim();
}
function normQuestion(q) {
  const type = q['@_type'];
  if (type !== 'multichoice' && type !== 'truefalse' && type !== 'shortanswer') return null;
  const answersRaw = q.answer || [];
  const answers = (Array.isArray(answersRaw) ? answersRaw : [answersRaw]).map((a) => ({
    text: sanitize(rawText(a)),
    fraction: parseFloat(a['@_fraction'] || '0') || 0,
    feedback: sanitize(rawText(a.feedback)),
  }));
  const out = { type, name: rawText(q.name), text: sanitize(rawText(q.questiontext)), answers, generalFeedback: sanitize(rawText(q.generalfeedback)) };
  if (type === 'multichoice') out.single = String(q.single) === 'true';
  if (type === 'shortanswer') out.usecase = String(q.usecase) === '1';
  return out;
}
function parseQuizXml(xml) {
  const doc = parser.parse(xml);
  const questions = (doc && doc.quiz && doc.quiz.question) ? doc.quiz.question : [];
  return questions.map(normQuestion).filter(Boolean);
}

function buildLang(dir) {
  const out = {};
  if (!fs.existsSync(dir)) return out;
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.xml'))) {
    const id = f.replace(/\.xml$/, '');
    try {
      const qs = parseQuizXml(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (qs.length) out[id] = qs; else console.warn('quiz: no supported questions in', f);
    } catch (e) { console.warn('quiz: failed to parse', f, e.message); }
  }
  return out;
}

module.exports = { parseQuizXml, normQuestion, sanitize };

if (require.main === module) {
  const en = buildLang(path.join(__dirname, 'quizzes', 'en'));
  const zh = buildLang(path.join(__dirname, 'quizzes', 'zh'));
  const rendered = {};
  for (const id of new Set([...Object.keys(en), ...Object.keys(zh)])) {
    rendered[id] = { en: en[id] || [], zh: zh[id] || [] };
  }
  fs.writeFileSync(path.join(__dirname, 'js', 'quiz_rendered.js'),
    'window.QUIZ_RENDERED = ' + JSON.stringify(rendered, null, 2) + ';\n');
  console.log('Generated quiz decks:', Object.keys(rendered).join(', ') || '(none)');
}
