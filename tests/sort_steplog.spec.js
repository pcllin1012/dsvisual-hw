const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

const SORTS = [
  ['sort-bubble', 'sort_bubble.cpp'],
  ['sort-select', 'sort_selection.cpp'],
  ['sort-insert', 'sort_insertion.cpp'],
  ['sort-quick', 'sort_quick.cpp'],
  ['sort-merge', 'sort_merge.cpp'],
  ['sort-shell', 'sort_shell.cpp'],
  ['sort-heap', 'sort_heap.cpp'],
  ['sort-bucket', 'sort_bucket.cpp'],
  ['sort-count', 'sort_counting.cpp'],
  ['sort-radix', 'sort_radix.cpp'],
  ['sort-shaker', 'sort_shaker.cpp'],
];

test.describe('Sort viz observatory (batch 1)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const [id, file] of SORTS) {
    test(`${id}: input + examples + VCR + step log + drawer; final all sorted`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      await expect(card.locator('[data-testid="sortviz-input"]')).toBeVisible();
      await expect(card.locator('.ex-select')).toBeVisible();
      await expect(card.locator('.viz-workbench')).toBeVisible();
      await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
      await expect(card.locator('.stepctl')).toBeVisible();
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);
      // legacy static container not shown for converted sorts (dynamic host is active instead)
      await expect(page.locator('#sort-container')).toBeHidden();

      const bars = card.locator('.sortviz-stage .sort-bar');
      const barCount = await bars.count();
      expect(barCount).toBeGreaterThan(1);
      // rows == frames == scrubber max+1
      const rows = card.locator('.viz-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);
      await expect(rows.nth(0)).toHaveClass(/\bon\b/);

      // scrub to final frame → all bars sorted, ascending heights
      await card.locator('.stepctl-scrubber').evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
      await expect(card.locator('.sortviz-stage .sort-bar.sorted')).toHaveCount(barCount);
      const heights = await bars.evaluateAll((els) => els.map((e) => parseFloat(e.style.height)));
      for (let i = 1; i < heights.length; i++) expect(heights[i]).toBeGreaterThanOrEqual(heights[i - 1]);
    });
  }

  test('sort-bubble: bars enlarge in fullscreen', async ({ page }) => {
    await loadMethod(page, 'sort-bubble');
    const card = page.locator('[data-method-section="sort-bubble"]');
    const tallest = () => card.locator('.sortviz-stage .sort-bar').evaluateAll((els) => Math.max(...els.map((e) => e.getBoundingClientRect().height)));
    const before = await tallest();
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await page.waitForTimeout(150);
    const after = await tallest();
    expect(after).toBeGreaterThan(before * 1.3); // bars grew to fill the fullscreen stage
  });

  test('sort-bubble: custom numeric input still builds bars correctly (escaping does not break normal use)', async ({ page }) => {
    await loadMethod(page, 'sort-bubble');
    const card = page.locator('[data-method-section="sort-bubble"]');
    const input = card.locator('[data-testid="sortviz-input"]');
    await input.fill('3,1,2');
    await card.locator('.sortviz-build').click();
    await expect(input).toHaveValue('3,1,2');
    const bars = card.locator('.sortviz-stage .sort-bar');
    await expect(bars).toHaveCount(3);
  });

  test('sort-bubble: a saved example round-trips (no [object Object]) and restores on select', async ({ page }) => {
    await loadMethod(page, 'sort-bubble');
    const card = page.locator('[data-method-section="sort-bubble"]');
    const input = card.locator('[data-testid="sortviz-input"]');
    // Build a custom input — this saves it as an example and re-renders the dropdown.
    await input.fill('8,6,7,5,3,0,9');
    await card.locator('.sortviz-build').click();

    const exSelect = card.locator('.ex-select');
    // The saved example must appear as its real text, never "[object Object]".
    await expect(exSelect.locator('option', { hasText: '[object Object]' })).toHaveCount(0);
    const saved = exSelect.locator('option[value="8,6,7,5,3,0,9"]');
    await expect(saved).toHaveCount(1);
    await expect(saved).toHaveText('8,6,7,5,3,0,9');

    // Change the input, then pick the saved example → it must restore the real value.
    await input.fill('1,2,3');
    await card.locator('.sortviz-build').click();
    await card.locator('.ex-select').selectOption('8,6,7,5,3,0,9');
    await expect(card.locator('[data-testid="sortviz-input"]')).toHaveValue('8,6,7,5,3,0,9');
  });

  test('sort-bubble: fullscreen keeps VCR transport in-viewport and step log scrollable', async ({ page }) => {
    await loadMethod(page, 'sort-bubble');
    const card = page.locator('[data-method-section="sort-bubble"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    const vh = page.viewportSize().height;
    // workbench bounded within the viewport (long 50+-row log must not overflow it)
    const wb = await card.locator('.viz-workbench').boundingBox();
    expect(wb).not.toBeNull();
    expect(wb.y + wb.height).toBeLessThanOrEqual(vh + 1);
    // VCR transport stays operable (within the viewport)
    const tp = await card.locator('.stepctl').boundingBox();
    expect(tp).not.toBeNull();
    expect(tp.y + tp.height).toBeLessThanOrEqual(vh + 1);
    // step log scrolls internally (content taller than its box) and stays usable
    const log = card.locator('[data-testid="viz-steplog"]');
    const info = await log.evaluate((el) => ({ scrollable: el.scrollHeight > el.clientHeight + 1, clientH: el.clientHeight }));
    expect(info.scrollable).toBe(true);
    expect(info.clientH).toBeGreaterThan(40);
  });
});
