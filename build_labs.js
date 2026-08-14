const fs = require('fs');
const path = require('path');

const LABS = path.join(__dirname, 'labs');

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Minimal, dependency-free markdown for problem statements:
// fenced code (```), ATX headings (#/##/###), unordered lists (- ), inline `code`, paragraphs.
function mdToHtml(md) {
  const lines = String(md).replace(/\r\n/g, '\n').split('\n');
  const out = [];
  let i = 0, para = [], list = null;
  const flushPara = () => { if (para.length) { out.push('<p>' + inline(para.join(' ')) + '</p>'); para = []; } };
  const flushList = () => { if (list) { out.push('<ul>' + list.map((li) => '<li>' + inline(li) + '</li>').join('') + '</ul>'); list = null; } };
  const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith('```')) {
      flushPara(); flushList();
      const buf = []; i++;
      while (i < lines.length && !lines[i].startsWith('```')) { buf.push(lines[i]); i++; }
      i++; // skip closing fence
      out.push('<pre><code>' + esc(buf.join('\n')) + '\n</code></pre>');
      continue;
    }
    const h = line.match(/^(#{1,3})\s+(.*)$/);
    if (h) { flushPara(); flushList(); out.push('<h' + h[1].length + '>' + inline(h[2]) + '</h' + h[1].length + '>'); i++; continue; }
    const li = line.match(/^\s*-\s+(.*)$/);
    if (li) { flushPara(); (list = list || []).push(li[1]); i++; continue; }
    if (line.trim() === '') { flushPara(); flushList(); i++; continue; }
    flushList(); para.push(line); i++;
  }
  flushPara(); flushList();
  return out.join('\n');
}

function readSamples(slug) {
  const dir = path.join(LABS, slug, 'samples');
  const ins = fs.readdirSync(dir).filter((f) => f.endsWith('.in')).sort();
  return ins.map((f) => ({
    in: fs.readFileSync(path.join(dir, f), 'utf8'),
    out: fs.readFileSync(path.join(dir, f.replace(/\.in$/, '.out')), 'utf8'),
  }));
}

function h1Of(md) { const m = String(md).match(/^#\s+(.+)$/m); return m ? m[1].trim() : null; }

function buildLabs() {
  const reg = JSON.parse(fs.readFileSync(path.join(LABS, 'labs.json'), 'utf8'));
  const R = {};
  for (const [methodId, entries] of Object.entries(reg)) {
    R[methodId] = entries.map((e) => {
      const dir = path.join(LABS, e.slug);
      const meta = JSON.parse(fs.readFileSync(path.join(dir, 'meta.json'), 'utf8'));
      const zhMd = fs.readFileSync(path.join(dir, 'statement.md'), 'utf8');
      const enPath = path.join(dir, 'statement.en.md');
      const enMd = fs.existsSync(enPath) ? fs.readFileSync(enPath, 'utf8') : zhMd; // fall back en->zh
      return {
        slug: e.slug,
        titleZh: h1Of(zhMd) || meta.title || e.slug,
        titleEn: h1Of(enMd) || meta.title || e.slug,
        topic: meta.topic, week: meta.week, difficulty: meta.difficulty, tags: meta.tags || [],
        repoUrl: e.repoUrl, dsjudgeUrl: e.dsjudgeUrl ?? null,
        statementHtml: { zh: mdToHtml(zhMd), en: mdToHtml(enMd) },
        samples: readSamples(e.slug),
      };
    });
  }
  return R;
}

if (require.main === module) {
  const rendered = buildLabs();
  fs.writeFileSync(path.join(__dirname, 'js', 'labs_rendered.js'),
    'window.LAB_RENDERED = ' + JSON.stringify(rendered, null, 2) + ';\n');
  console.log('Generated lab decks:', Object.keys(rendered).join(', '));
}

module.exports = { mdToHtml, buildLabs };
