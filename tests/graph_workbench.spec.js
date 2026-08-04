const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

const PILOTS = ['graph-bfs', 'graph-dfs', 'graph-dijkstra'];

test.describe('graph workbench (edge-list + VCR)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'zh'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const id of PILOTS) {
    test(id + ': input + transport render, random+build draws nodes, stepping advances', async ({ page }) => {
      await loadMethod(page, id);
      const sec = page.locator('[data-method-section="' + id + '"]');
      await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
      await expect(sec.locator('.stepctl')).toBeVisible();
      await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
      // random fills a non-empty input and rebuilds with nodes
      await sec.locator('.rand-btn').click();
      await expect(sec.locator('[data-testid="gw-input"]')).not.toHaveValue('');
      await expect(sec.locator('.gw-svg .graph-node').first()).toBeVisible();
      // stepping forward advances the counter
      const cnt = sec.locator('.stepctl-count');
      const before = await cnt.textContent();
      await sec.locator('.stepctl [data-action="step"]').click();
      await expect(cnt).not.toHaveText(before);
    });
  }

  test('graph-dijkstra: shows distance labels; example round-trips', async ({ page }) => {
    await loadMethod(page, 'graph-dijkstra');
    const sec = page.locator('[data-method-section="graph-dijkstra"]');
    const input = sec.locator('[data-testid="gw-input"]');
    await input.fill('0 1 2\n1 2 3');
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('.gw-svg .graph-distance').first()).toBeVisible();
    // saved example now appears in the select; change input then pick it back
    await input.fill('0 1 7\n0 2 7');
    await sec.locator('[data-testid="gw-build"]').click();
    const ex = sec.locator('.ex-select');
    // option list: [Examples…, Default, "0 1 7...", "0 1 2..."] (newest first). Select the one containing 0 1 2.
    await ex.selectOption({ value: '0 1 2\n1 2 3' });
    await expect(input).toHaveValue('0 1 2\n1 2 3');
  });

  test('graph-bfs: invalid input shows a bilingual error', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await sec.locator('[data-testid="gw-input"]').fill('not a graph');
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('[data-testid="gw-err"]')).toBeVisible();
  });

  test('workbench accepts compact comma edge-list input', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await sec.locator('[data-testid="gw-input"]').fill('0-1,1-2,2-0');
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(3);
    await expect(sec.locator('[data-testid="gw-err"]')).toBeHidden();
  });

  test('language toggle updates workbench text', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await expect(sec.locator('[data-testid="gw-build"]')).toHaveText('建立');
    await page.evaluate(() => window.I18N.setLanguage('en'));
    await expect(sec.locator('[data-testid="gw-build"]')).toHaveText('Build');
  });

  for (const id of ['graph-kruskal', 'graph-prim']) {
    test(id + ': workbench renders and the final frame shows MST tree edges', async ({ page }) => {
      await loadMethod(page, id);
      const sec = page.locator('[data-method-section="' + id + '"]');
      await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
      await expect(sec.locator('.stepctl')).toBeVisible();
      await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
      // jump the scrubber to the end → MST complete → tree edges present
      await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
      await expect(sec.locator('.gw-svg .graph-edge.tree')).toHaveCount(4); // MST on 5 nodes = 4 edges
    });
  }

  test('graph-kruskal has no source selector; graph-prim has one', async ({ page }) => {
    await loadMethod(page, 'graph-kruskal');
    await expect(page.locator('[data-method-section="graph-kruskal"] [data-testid="gw-source"]')).toHaveCount(0);
    await loadMethod(page, 'graph-prim');
    await expect(page.locator('[data-method-section="graph-prim"] [data-testid="gw-source"]')).toHaveCount(1);
  });

  test('graph-topo: directed workbench renders 6 nodes with arrows, no source', async ({ page }) => {
    await loadMethod(page, 'graph-topo');
    const sec = page.locator('[data-method-section="graph-topo"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.stepctl')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(6);
    await expect(sec.locator('.gw-svg line[marker-end]').first()).toBeAttached();
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0); // topo has no source
    const cnt = sec.locator('.stepctl-count');
    const before = await cnt.textContent();
    await sec.locator('.stepctl [data-action="step"]').click();
    await expect(cnt).not.toHaveText(before);
  });

  test('graph-bellman-ford: directed workbench has a source and directed arrows', async ({ page }) => {
    await loadMethod(page, 'graph-bellman-ford');
    const sec = page.locator('[data-method-section="graph-bellman-ford"]');
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('.gw-svg line[marker-end]').first()).toBeAttached();
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(1);
    // scrub to the last frame → distances shown (graph-distance labels present)
    await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(sec.locator('.gw-svg .graph-distance').first()).toBeVisible();
  });

  test('graph: workbench renders drawing + adjacency matrix, no VCR', async ({ page }) => {
    await loadMethod(page, 'graph');
    const sec = page.locator('[data-method-section="graph"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('.gw-matrix')).toBeVisible();
    await expect(sec.locator('.stepctl')).toHaveCount(0);       // structural view: no VCR
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0);
  });

  test('graph-adjlist: workbench renders drawing + adjacency list rows', async ({ page }) => {
    await loadMethod(page, 'graph-adjlist');
    const sec = page.locator('[data-method-section="graph-adjlist"]');
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('.adjlist-row')).toHaveCount(5);
    await expect(sec.locator('.stepctl')).toHaveCount(0);
  });

  test('graph-traversal: dual panes driven by one synchronized VCR', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const sec = page.locator('[data-method-section="graph-traversal"]');
    await expect(sec.locator('.graph-dual-pane')).toHaveCount(2);
    await expect(sec.locator('.stepctl')).toHaveCount(1);        // ONE shared transport
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(1);
    await expect(sec.locator('.gw-svg-bfs .graph-node')).toHaveCount(5);
    await expect(sec.locator('.gw-svg-dfs .graph-node')).toHaveCount(5);
    // Panes must actually be rendered (a 0×0 collapsed SVG is not "visible").
    await expect(sec.locator('.gw-svg-bfs')).toBeVisible();
    await expect(sec.locator('.gw-svg-dfs')).toBeVisible();
    const cnt = sec.locator('.stepctl-count');
    const before = await cnt.textContent();
    await sec.locator('.stepctl [data-action="step"]').click();
    await expect(cnt).not.toHaveText(before);
  });

  test('workbench graph methods do not show the legacy #graph-actions editor bar', async ({ page }) => {
    for (const id of ['graph', 'graph-adjlist', 'graph-traversal', 'graph-bfs', 'graph-dfs', 'graph-kruskal', 'graph-dijkstra', 'graph-topo']) {
      await loadMethod(page, id);
      await expect(page.locator('#graph-actions')).toBeHidden();
    }
  });

  test('graph/adjlist/traversal: random fills input and rebuilds', async ({ page }) => {
    for (const id of ['graph', 'graph-adjlist', 'graph-traversal']) {
      await loadMethod(page, id);
      const sec = page.locator('[data-method-section="' + id + '"]');
      await sec.locator('.rand-btn').click();
      await expect(sec.locator('[data-testid="gw-input"]')).not.toHaveValue('');
      await expect(sec.locator('.gw-svg .graph-node').first()).toBeVisible();
    }
  });

  test('directed toggle present on the 6 undirected viz, absent on MST/directed ones', async ({ page }) => {
    for (const id of ['graph', 'graph-adjlist', 'graph-traversal', 'graph-bfs', 'graph-dfs', 'graph-dijkstra']) {
      await loadMethod(page, id);
      await expect(page.locator('[data-method-section="' + id + '"] [data-testid="gw-directed-toggle"]')).toHaveCount(1);
    }
    for (const id of ['graph-kruskal', 'graph-prim', 'graph-topo', 'graph-bellman-ford']) {
      await loadMethod(page, id);
      await expect(page.locator('[data-method-section="' + id + '"] [data-testid="gw-directed-toggle"]')).toHaveCount(0);
    }
  });

  test('graph-bfs: toggling to directed adds arrowheads', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const sec = page.locator('[data-method-section="graph-bfs"]');
    await expect(sec.locator('.gw-svg line[marker-end]')).toHaveCount(0); // undirected default
    await sec.locator('[data-testid="gw-directed-toggle"]').click();
    await expect(sec.locator('.gw-svg line[marker-end]').first()).toBeAttached(); // directed → arrows
  });

  test('graph-traversal: toggling to directed adds arrowheads in both panes', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const sec = page.locator('[data-method-section="graph-traversal"]');
    await sec.locator('[data-testid="gw-directed-toggle"]').click();
    await expect(sec.locator('.gw-svg-bfs line[marker-end]').first()).toBeAttached();
    await expect(sec.locator('.gw-svg-dfs line[marker-end]').first()).toBeAttached();
  });

  test('graph-dijkstra: rejects negative weights even when directed', async ({ page }) => {
    await loadMethod(page, 'graph-dijkstra');
    const sec = page.locator('[data-method-section="graph-dijkstra"]');
    await sec.locator('[data-testid="gw-directed-toggle"]').click();  // directed
    await sec.locator('[data-testid="gw-input"]').fill('0-1:-4');
    await sec.locator('[data-testid="gw-build"]').click();
    await expect(sec.locator('[data-testid="gw-err"]')).toBeVisible();
  });
});
