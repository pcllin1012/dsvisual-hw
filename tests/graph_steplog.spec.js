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
