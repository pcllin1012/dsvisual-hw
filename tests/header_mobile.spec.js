const { test, expect } = require('@playwright/test');
const path = require('path');

// The header actions (language / cloud / settings) are absolutely positioned
// top-right on desktop. Below the desktop breakpoint the centered title grew
// wide enough (relative to the viewport) to run *underneath* them — visible
// from ~320px phones up through ~820px tablet-portrait. Overlap is measured on
// the VISIBLE TEXT (a Range over the <h1>), not the full-width block box, so a
// centered block-level <h1> doesn't read as a false overlap on wide screens.
async function textOverlapsActions(page) {
  return page.evaluate(() => {
    const h1 = document.querySelector('.app-header__text h1');
    const a = document.querySelector('.app-header__actions').getBoundingClientRect();
    const rg = document.createRange();
    rg.selectNodeContents(h1);
    const t = rg.getBoundingClientRect(); // tight bounds of the rendered text
    return !(a.right <= t.left || a.left >= t.right || a.bottom <= t.top || a.top >= t.bottom);
  });
}

// phones + the tablet-portrait dead-zone that #215 missed
for (const width of [320, 360, 390, 640, 700, 768, 820, 900]) {
  test(`header actions do not overlap the title at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    expect(await textOverlapsActions(page), `title text overlaps actions at ${width}px`).toBe(false);
  });
}

test('desktop keeps the actions floated top-right, no overlap', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  const pos = await page.evaluate(() => getComputedStyle(document.querySelector('.app-header__actions')).position);
  expect(pos).toBe('absolute');
  expect(await textOverlapsActions(page)).toBe(false);
});
