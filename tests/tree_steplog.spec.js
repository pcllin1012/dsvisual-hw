const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('Tree VCR step log', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('tree-segment: code drawer + step log wired to the transport', async ({ page }) => {
    await loadMethod(page, 'tree-segment');
    const card = page.locator('[data-method-section="tree-segment"]');
    // code drawer (newly added)
    await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
    await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('tree_segment.cpp');
    // workbench + step log
    await expect(card.locator('.viz-workbench')).toBeVisible();
    const log = card.locator('[data-testid="viz-steplog"]');
    await expect(log).toBeVisible();
    const rows = card.locator('.viz-logrow');
    const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
    await expect(rows).toHaveCount(max + 1);
    // initial row 0 highlighted
    await expect(rows.nth(0)).toHaveClass(/\bon\b/);
    // step forward moves highlight
    await card.locator('.stepctl [data-action="step"]').click();
    await expect(rows.nth(1)).toHaveClass(/\bon\b/);
    await expect(rows.nth(0)).not.toHaveClass(/\bon\b/);
    // click last row jumps there
    await rows.nth(max).click();
    await expect(rows.nth(max)).toHaveClass(/\bon\b/);
    await expect(card.locator('.stepctl-count')).toContainText('/ ' + max);
  });

  test('tree-segment: fullscreen keeps transport in-viewport and log scrollable', async ({ page }) => {
    await loadMethod(page, 'tree-segment');
    const card = page.locator('[data-method-section="tree-segment"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    const box = await card.locator('.stepctl').boundingBox();
    const vh = page.viewportSize().height;
    expect(box).not.toBeNull();
    expect(box.y + box.height).toBeLessThanOrEqual(vh + 1);
  });
});
