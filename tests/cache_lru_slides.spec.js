const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

for (const [lang, s1, s2] of [['en', 'LRU Cache', 'Core Concept'], ['zh', 'LRU', '核心概念']]) {
  test(`cache-lru slides render + navigate (${lang})`, async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript((l) => { try { localStorage.setItem('dsvisual-lang', l); } catch (e) {} }, lang);
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    await loadMethod(page, 'cache-lru');
    await page.locator('[data-method-section="cache-lru"] .method-slides-btn').click();
    const viewer = page.locator('[data-testid="slide-viewer"]');
    await expect(viewer).toBeVisible();
    const body = (await viewer.textContent()).toLowerCase();
    expect(body).not.toContain('no slides');
    expect(body).not.toContain('沒有投影片');
    await expect(page.locator('.slideviewer-slide h1.slide-title').first()).toContainText(s1);
    // navigate to slide 2 → confirms a real multi-slide deck
    await page.locator('#slide-next').click();
    await expect(page.locator('.slideviewer-slide h1.slide-title').first()).toContainText(s2);
  });
}
