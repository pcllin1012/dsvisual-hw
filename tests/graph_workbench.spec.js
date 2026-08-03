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
});
