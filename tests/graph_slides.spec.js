const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Open a method's slide deck and return the viewer root locator.
async function openSlides(page, methodId) {
  await loadMethod(page, methodId);
  const card = page.locator(`[data-method-section="${methodId}"]`);
  await card.locator('.method-slides-btn').click();
}

const DECKS_TASK1 = ['graph-matrix', 'graph-multilist'];

test.describe('Graph slides: structural decks', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  for (const id of DECKS_TASK1) {
    test(`${id}: has a multi-slide deck (not the placeholder), served in en+zh`, async ({ page }) => {
      // Guard via the served artifact: both languages present with >1 slide.
      const counts = await page.evaluate((mid) => {
        const e = window.SLIDES_RENDERED && window.SLIDES_RENDERED[mid];
        return e ? { zh: e.slides.zh.length, en: e.slides.en.length,
                     zh0: (e.slides.zh[0] || {}).title || '', en0: (e.slides.en[0] || {}).title || '' } : null;
      }, id);
      expect(counts).not.toBeNull();
      expect(counts.en).toBeGreaterThan(1);
      expect(counts.zh).toBeGreaterThan(1);
      expect(counts.en0.length).toBeGreaterThan(0);
      expect(counts.zh0.length).toBeGreaterThan(0);
      // Decks differ by language (not accidentally identical / single-language).
      const bodies = await page.evaluate((mid) => {
        const e = window.SLIDES_RENDERED[mid];
        return { zh: e.slides.zh.map((s) => s.body).join(''), en: e.slides.en.map((s) => s.body).join('') };
      }, id);
      expect(bodies.zh).not.toBe(bodies.en);
      // The C++ slide embeds the real source filename.
      expect(bodies.en).toContain(`${id}.cpp`);
    });
  }
});
