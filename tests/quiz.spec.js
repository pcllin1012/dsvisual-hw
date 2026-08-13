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

  test('resume: unfinished attempt is restored from the recent panel', async ({ page }) => {
    await loadMethod(page, 'sort-quick');
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    const v = page.locator('#quiz-viewer');
    await v.locator('[data-testid="quiz-begin"]').click();          // practice
    // answer Q1 and advance to Q2
    await v.locator('.quiz-answers input').first().check();
    await v.locator('[data-testid="quiz-check"]').click();
    await v.locator('[data-testid="quiz-next"]').click();
    await expect(v.locator('.quiz-q-head')).toContainText('2 / 6');
    // close without finishing (auto-saved as in-progress)
    await page.keyboard.press('Escape');
    await expect(v).toBeHidden();
    // exactly one (in-progress) record
    let n = await page.evaluate(() => JSON.parse(localStorage.getItem('dsvisual:quiz:attempts:sort-quick') || '[]'));
    expect(n.length).toBe(1);
    expect(n[0].status).toBe('in-progress');
    // reopen -> resume row present -> click -> back on Q2
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    await expect(v.locator('[data-testid="quiz-recent-resume"]')).toBeVisible();
    await v.locator('[data-testid="quiz-recent-resume"]').click();
    await expect(v.locator('.quiz-q-head')).toContainText('2 / 6');
    // finishing flips the SAME record to completed (still 1 row)
    for (let i = 0; i < 6; i++) {
      const check = v.locator('[data-testid="quiz-check"]');
      if (await check.count()) { const inp = v.locator('.quiz-answers input, .quiz-sa').first(); if (await inp.count()) await inp.click().catch(() => {}); await check.click(); }
      const next = v.locator('[data-testid="quiz-next"]'); if (await next.count()) await next.click();
    }
    await expect(v.locator('[data-testid="quiz-score"]')).toBeVisible();
    n = await page.evaluate(() => JSON.parse(localStorage.getItem('dsvisual:quiz:attempts:sort-quick') || '[]'));
    expect(n.length).toBe(1);
    expect(n[0].status).toBe('completed');
  });

  test('review: completed attempt reopens read-only with score', async ({ page }) => {
    // seed one completed attempt
    await page.evaluate(() => localStorage.setItem('dsvisual:quiz:attempts:sort-quick', JSON.stringify([
      { id: 111, methodId: 'sort-quick', mode: 'test', lang: 'en', status: 'completed', idx: 6, given: [0, 0, 1, 0, 'pivot', [0, 1]], checked: [], startedAt: 1, finishedAt: 2, total: 6, correct: 6, perQuestion: [] },
    ])));
    await loadMethod(page, 'sort-quick');
    await page.locator('[data-method-section="sort-quick"] .method-quiz-btn').click();
    const v = page.locator('#quiz-viewer');
    await expect(v.locator('[data-testid="quiz-recent-review"]')).toBeVisible();
    await v.locator('[data-testid="quiz-recent-review"]').click();
    await expect(v.locator('[data-testid="quiz-summary"]')).toBeVisible();
    await expect(v.locator('[data-testid="quiz-score"]')).toContainText('6 / 6');
    // review must not add a new record
    const n = await page.evaluate(() => JSON.parse(localStorage.getItem('dsvisual:quiz:attempts:sort-quick') || '[]').length);
    expect(n).toBe(1);
  });
});
