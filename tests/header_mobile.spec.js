const { test, expect } = require('@playwright/test');
const path = require('path');

// The header actions (language / cloud / settings) are absolutely positioned
// top-right on desktop; on a narrow phone the centered title ran underneath
// them. At mobile widths the actions must be in normal flow, not overlapping
// the title.
for (const width of [390, 360, 320]) {
  test(`header actions do not overlap the title at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    const r = await page.evaluate(() => {
      const h1 = document.querySelector('.app-header__text h1').getBoundingClientRect();
      const a = document.querySelector('.app-header__actions').getBoundingClientRect();
      const overlap = !(a.right <= h1.left || a.left >= h1.right || a.bottom <= h1.top || a.top >= h1.bottom);
      return { overlap, aBottom: a.bottom, h1Top: h1.top };
    });
    expect(r.overlap, `actions overlap title at ${width}px`).toBe(false);
  });
}

test('desktop keeps the actions floated top-right (no regression)', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  const pos = await page.evaluate(() => getComputedStyle(document.querySelector('.app-header__actions')).position);
  expect(pos).toBe('absolute');
});
