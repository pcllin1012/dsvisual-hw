// tests/lab.spec.js
const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('lab entry point', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('Lab button shows on graph-dijkstra, hidden when no lab', async ({ page }) => {
    await loadMethod(page, 'graph-dijkstra');
    await expect(page.locator('[data-method-section="graph-dijkstra"] .method-lab-btn')).toBeVisible();
    // simulate a lab-less method: drop its entry before its (non-default) group first renders
    await page.evaluate(() => { if (window.LAB_RENDERED) delete window.LAB_RENDERED['graph-bfs']; });
    await loadMethod(page, 'graph-bfs');
    await expect(page.locator('[data-method-section="graph-bfs"] .method-lab-btn')).toHaveCount(0);
  });
});
