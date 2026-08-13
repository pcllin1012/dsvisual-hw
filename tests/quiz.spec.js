const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

test.describe('self-test quiz', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); localStorage.removeItem('dsvisual:quiz:attempts:sort-quick'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('quiz button shows on sort-quick, not on a quiz-less method', async ({ page }) => {
    await loadMethod(page, 'sort-quick');
    await expect(page.locator('[data-method-section="sort-quick"] .method-quiz-btn')).toBeVisible();
    await loadMethod(page, 'sort-bubble');
    await expect(page.locator('[data-method-section="sort-bubble"] .method-quiz-btn')).toHaveCount(0);
  });

  test('practice mode: immediate feedback, then score; attempt saved', async ({ page }) => {
    await loadMethod(page, 'sort-quick');
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    const v = page.locator('#quiz-viewer');
    await expect(v).toBeVisible();
    await expect(v.locator('[data-testid="quiz-recent"]')).toContainText(/No attempts|attempt/i);
    await v.locator('[data-testid="quiz-begin"]').click();
    // Q1 (single MC): pick the first (correct O(n log n)), check → feedback
    await v.locator('.quiz-answers input').first().check();
    await v.locator('[data-testid="quiz-check"]').click();
    await expect(v.locator('[data-testid="quiz-feedback"]')).toBeVisible();
    // walk to the end
    for (let i = 0; i < 6; i++) {
      const next = v.locator('[data-testid="quiz-next"]');
      if (await next.count()) { await next.click(); }
      const check = v.locator('[data-testid="quiz-check"]');
      if (await check.count()) { const inp = v.locator('.quiz-answers input, .quiz-sa').first(); if (await inp.count()) await inp.click({ trial: false }).catch(() => {}); await check.click(); }
    }
    await expect(v.locator('[data-testid="quiz-score"]')).toBeVisible();
    // attempt persisted
    const n = await page.evaluate(() => JSON.parse(localStorage.getItem('dsvisual:quiz:attempts:sort-quick') || '[]').length);
    expect(n).toBe(1);
  });

  test('test mode: submit yields a score + review', async ({ page }) => {
    await loadMethod(page, 'sort-quick');
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    const v = page.locator('#quiz-viewer');
    await v.locator('input[name="qmode"][value="test"]').check();
    await v.locator('[data-testid="quiz-begin"]').click();
    for (let i = 0; i < 5; i++) { const nx = v.locator('[data-act="next"]'); if (await nx.count()) await nx.click(); }
    await v.locator('[data-testid="quiz-submit"]').click();
    await expect(v.locator('[data-testid="quiz-score"]')).toBeVisible();
    await expect(v.locator('[data-testid="quiz-summary"] .quiz-review')).toBeVisible();
    // retry returns to start
    await v.locator('[data-testid="quiz-retry"]').click();
    await expect(v.locator('[data-testid="quiz-begin"]')).toBeVisible();
    // esc closes
    await page.keyboard.press('Escape');
    await expect(v).toBeHidden();
  });
});
