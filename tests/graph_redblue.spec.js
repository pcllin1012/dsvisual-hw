const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('Graph Red-Blue Rules MST', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    await loadMethod(page, 'graph-redblue');
  });

  test('renders workbench, colors 4 blue + 2 red at the final frame', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-redblue"]');
    await expect(sec.locator('[data-testid="gw-input"]')).toBeVisible();
    await expect(sec.locator('.stepctl')).toBeVisible();
    await expect(sec.locator('.gw-svg .graph-node')).toHaveCount(5);
    await expect(sec.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('graph_redblue.cpp');
    // no source picker, no directed toggle (MST undirected)
    await expect(sec.locator('[data-testid="gw-source"]')).toHaveCount(0);
    // scrub to the final frame
    await sec.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(sec.locator('.gw-svg .graph-edge.blue')).toHaveCount(4);
    await expect(sec.locator('.gw-svg .graph-edge.red')).toHaveCount(2);
  });

  test('step log present and clickable', async ({ page }) => {
    const sec = page.locator('[data-method-section="graph-redblue"]');
    await expect(sec.locator('.gw-workbench')).toBeVisible();
    const rows = sec.locator('.gw-logrow');
    const max = parseInt(await sec.locator('.stepctl-scrubber').getAttribute('max'), 10);
    await expect(rows).toHaveCount(max + 1);
    await rows.nth(max).click();
    await expect(rows.nth(max)).toHaveClass(/\bon\b/);
  });

  test('graph-redblue: bilingual slide deck served', async ({ page }) => {
    await loadMethod(page, 'graph-redblue');
    const counts = await page.evaluate(() => {
      const e = window.SLIDES_RENDERED && window.SLIDES_RENDERED['graph-redblue'];
      return e ? { zh: e.slides.zh.length, en: e.slides.en.length, body: e.slides.en.map((s) => s.body).join('') } : null;
    });
    expect(counts).not.toBeNull();
    expect(counts.en).toBeGreaterThan(1);
    expect(counts.zh).toBeGreaterThan(1);
    expect(counts.body).toContain('graph_redblue.cpp');
  });
});
