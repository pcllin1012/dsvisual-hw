// Vendors ONLY the public parts of dsjudge problems into labs/<slug>/.
// Maintainer tool: requires ../dsjudge checked out. Run: node sync_labs.js
const fs = require('fs');
const path = require('path');

const DSJUDGE = path.resolve(__dirname, '..', 'dsjudge');
const LABS = path.join(__dirname, 'labs');
// Public fields lifted out of dsjudge meta.yaml (no YAML dep: line-scan the bank block).
function readPublicMeta(metaPath) {
  const txt = fs.readFileSync(metaPath, 'utf8');
  const grab = (re) => { const m = txt.match(re); return m ? m[1].trim().replace(/^["']|["']$/g, '') : null; };
  const tags = [];
  const tagBlock = txt.match(/tags:\s*\n((?:\s*-\s*.*\n)+)/);
  if (tagBlock) for (const line of tagBlock[1].split('\n')) { const m = line.match(/-\s*(.+)/); if (m) tags.push(m[1].trim()); }
  return {
    title: grab(/^\s*title:\s*(.+)$/m),
    topic: grab(/^\s*topic:\s*(.+)$/m),
    week: Number(grab(/^\s*week:\s*(.+)$/m)) || null,
    difficulty: Number(grab(/^\s*difficulty:\s*(.+)$/m)) || null,
    tags,
  };
}

function copyIfExists(src, dst) {
  if (fs.existsSync(src)) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); return true; }
  return false;
}

function syncSlug(slug) {
  const src = path.join(DSJUDGE, 'problems', slug);
  if (!fs.existsSync(src)) throw new Error('dsjudge problem not found: ' + src);
  const dst = path.join(LABS, slug);
  fs.mkdirSync(path.join(dst, 'samples'), { recursive: true });
  copyIfExists(path.join(src, 'statement.md'), path.join(dst, 'statement.md'));
  copyIfExists(path.join(src, 'statement.en.md'), path.join(dst, 'statement.en.md')); // may be absent
  for (const f of fs.readdirSync(path.join(src, 'samples'))) {
    fs.copyFileSync(path.join(src, 'samples', f), path.join(dst, 'samples', f));
  }
  fs.writeFileSync(path.join(dst, 'meta.json'), JSON.stringify(readPublicMeta(path.join(src, 'meta.yaml')), null, 2) + '\n');
  console.log('synced', slug);
}

if (require.main === module) {
  if (!fs.existsSync(DSJUDGE)) { console.error('ERROR: dsjudge not found at ' + DSJUDGE); process.exit(1); }
  const reg = JSON.parse(fs.readFileSync(path.join(LABS, 'labs.json'), 'utf8'));
  const slugs = [...new Set(Object.values(reg).flat().map((e) => e.slug))];
  slugs.forEach(syncSlug);
  console.log('done:', slugs.join(', '));
}

module.exports = { readPublicMeta, syncSlug };
