const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('graph-boruvka (Borůvka MST)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'zh'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    await loadMethod(page, 'graph-boruvka');
  });

  test('renders MST workbench; final frame shows 4 tree edges; no source/toggle', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-boruvka"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.stepctl')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0);          // MST: no source
    await expect(sec.locator('[data-testid="gw-directed-toggle"]')).toHaveCount(0); // undirected-only
    await expect(sec.locator('.code-panel-filename')).toContainText('graph_boruvka.cpp');
    await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(sec.locator('.gw-svg .graph-edge.tree')).toHaveCount(4);           // MST on 5 nodes
  });

  test('random fills input and rebuilds', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-boruvka"]');
    await sec.locator('.rand-btn').click();
    await expect(sec.locator('[data-testid="gw-input"]')).not.toHaveValue('');
    await expect(sec.locator('.gw-svg .graph-node').first()).toBeVisible();
  });
});
