const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('Graph VCR: code drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
    });
    const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(fileUri);
  });

  const VCR_METHODS = [
    ['graph-bfs', 'graph_bfs.cpp'],
    ['graph-dfs', 'graph_dfs.cpp'],
    ['graph-dijkstra', 'graph_dijkstra.cpp'],
    ['graph-kruskal', 'graph_kruskal.cpp'],
    ['graph-prim', 'graph_prim.cpp'],
    ['graph-boruvka', 'graph_boruvka.cpp'],
    ['graph-topo', 'graph_topo.cpp'],
    ['graph-bellman-ford', 'graph_bellman_ford.cpp'],
  ];

  for (const [id, file] of VCR_METHODS) {
    test(`${id}: source is in a collapsible code drawer`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      // Drawer present; inline side-by-side code panel absent.
      await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
      await expect(card.locator('.method-section-grid--full')).toHaveCount(1);
      const toggle = card.locator('[data-testid="code-drawer-toggle"]');
      await expect(toggle).toBeVisible();
      // Filename lives inside the drawer, and matches this method's file.
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);
      // Opening the drawer works.
      await toggle.click();
      await expect(card.locator('[data-testid="code-drawer"]')).not.toHaveAttribute('hidden', /.*/);
    });
  }
});

test.describe('Graph VCR: step-log column', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
    });
    const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(fileUri);
  });

  // Representative coverage: unweighted (bfs), weighted-with-source (dijkstra),
  // MST (kruskal), directed (bellman-ford).
  for (const id of ['graph-bfs', 'graph-dijkstra', 'graph-kruskal', 'graph-bellman-ford']) {
    test(`${id}: log has one row per frame, synced to transport`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      const log = card.locator('[data-testid="gw-log"]');
      await expect(card.locator('.gw-workbench')).toBeVisible();
      await expect(log).toBeVisible();

      // Row count === frame count === scrubber max + 1.
      const rows = card.locator('.gw-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);

      // Initial: row 0 highlighted, and its text equals the step-desc banner.
      await expect(rows.nth(0)).toHaveClass(/\bon\b/);
      const banner = card.locator('[data-testid="gw-stepdesc"]');
      await expect(rows.nth(0).locator('.gw-logmsg')).toHaveText(await banner.textContent());

      // Step forward moves the highlight to row 1 and updates the banner.
      await card.locator('.stepctl [data-action="step"]').click();
      await expect(rows.nth(1)).toHaveClass(/\bon\b/);
      await expect(rows.nth(0)).not.toHaveClass(/\bon\b/);
      await expect(rows.nth(1).locator('.gw-logmsg')).toHaveText(await banner.textContent());

      // Click the last row jumps there (highlight + banner follow).
      const lastRow = rows.nth(max);
      await lastRow.click();
      await expect(lastRow).toHaveClass(/\bon\b/);
      await expect(card.locator('.stepctl-count')).toContainText('/ ' + max);
      await expect(lastRow.locator('.gw-logmsg')).toHaveText(await banner.textContent());
    });
  }

  test('graph-bfs: fullscreen keeps transport visible and log scrollable', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await expect(card.locator('.stepctl')).toBeVisible();      // transport not pushed off-screen
    await expect(card.locator('[data-testid="gw-log"]')).toBeVisible();
    // step still works in fullscreen
    const cnt = card.locator('.stepctl-count');
    const before = await cnt.textContent();
    await card.locator('.stepctl [data-action="step"]').click();
    await expect(cnt).not.toHaveText(before);
  });
});
