const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('graph-multilist (adjacency multilist)', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'zh'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    await loadMethod(page, 'graph-multilist');
  });

  test('renders drawing + edge-node legend + shared per-vertex chains, no VCR/toggle', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-multilist"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);   // pentagon default
    await expect(sec.locator('.gml-edge-node')).toHaveCount(6);        // 6 edges = 6 shared nodes
    await expect(sec.locator('.gml-row')).toHaveCount(5);              // one chain row per vertex
    await expect(sec.locator('.stepctl')).toHaveCount(0);             // structural view, no VCR
    await expect(sec.locator('[data-testid="gw-directed-toggle"]')).toHaveCount(0); // undirected-only
    await expect(sec.locator('.code-panel-filename')).toContainText('graph_multilist.cpp');
  });

  test('random fills input and rebuilds', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-multilist"]');
    await sec.locator('.rand-btn').click();
    await expect(sec.locator('[data-testid="gw-input"]')).not.toHaveValue('');
    await expect(sec.locator('.gw-svg .graph-node').first()).toBeVisible();
    await expect(sec.locator('.gml-edge-node').first()).toBeVisible();
  });
});
