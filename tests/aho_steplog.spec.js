const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('Aho-Corasick observatory (batch 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('search-aho: inputs + examples + VCR + step log + drawer; build→scan; matches', async ({ page }) => {
    await loadMethod(page, 'search-aho');
    const card = page.locator('[data-method-section="search-aho"]');
    await expect(card.locator('[data-testid="aho-patterns"]')).toBeVisible();
    await expect(card.locator('[data-testid="aho-text"]')).toBeVisible();
    await expect(card.locator('.ex-select')).toBeVisible();
    await expect(card.locator('.viz-workbench')).toBeVisible();
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    await expect(card.locator('.stepctl')).toBeVisible();
    await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('search_aho.cpp');

    // default {he,she,his,hers}/ushers → 10 trie nodes
    await expect(card.locator('.aho-svg circle')).toHaveCount(10);
    await expect(card.locator('[data-testid="aho-phase"]')).toContainText('Phase 1');

    const rows = card.locator('.viz-logrow');
    const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
    await expect(rows).toHaveCount(max + 1);

    // scrub to the final frame → scan phase, last char highlighted, all matches reported
    await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
    await expect(card.locator('[data-testid="aho-phase"]')).toContainText('Phase 2');
    await expect(card.locator('.aho-char-cur')).toHaveCount(1);
    const stats = await card.locator('[data-testid="aho-stats"]').textContent();
    for (const m of ['she@1', 'he@2', 'hers@2']) expect(stats).toContain(m);
  });

  test('search-aho: SVG enlarges in fullscreen', async ({ page }) => {
    await loadMethod(page, 'search-aho');
    const card = page.locator('[data-method-section="search-aho"]');
    const h = () => card.locator('.aho-svg').evaluate((e) => e.getBoundingClientRect().height);
    const before = await h();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await h();
    expect(after).toBeGreaterThan(before * 1.15);
  });
});
