const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Assert the shared step-log workbench is wired and the INITIAL frame's SVG is
// non-empty (catches a paint() that early-returns on the detached initial paint).
async function assertStepLog(page, id, svgContentSelector) {
  await loadMethod(page, id);
  const card = page.locator('[data-method-section="' + id + '"]');
  await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
  await expect(card.locator('.viz-workbench')).toBeVisible();
  const log = card.locator('[data-testid="viz-steplog"]');
  await expect(log).toBeVisible();
  const rows = card.locator('.viz-logrow');
  const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
  await expect(rows).toHaveCount(max + 1);
  // initial SVG content present WITHOUT any step interaction (carry-forward guard check)
  await expect(card.locator(svgContentSelector).first()).toBeVisible();
  // highlight follows the transport
  await expect(rows.nth(0)).toHaveClass(/\bon\b/);
  await card.locator('.stepctl [data-action="step"]').click();
  await expect(rows.nth(1)).toHaveClass(/\bon\b/);
  await expect(rows.nth(0)).not.toHaveClass(/\bon\b/);
  // row-click jumps
  await rows.nth(max).click();
  await expect(rows.nth(max)).toHaveClass(/\bon\b/);
  await expect(card.locator('.stepctl-count')).toContainText('/ ' + max);
  return card;
}

test.describe('Tree VCR step log (batch 2)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('tree-threaded: step log + initial SVG content', async ({ page }) => {
    await assertStepLog(page, 'tree-threaded', '.th-wrap svg *');
  });

  test('tree-catalan: step log + initial content', async ({ page }) => {
    // .cat-shape is only emitted by paint() (inside .cat-groups), never present in the
    // static template — unlike `.cat-wrap [class*="cat-"]`, this genuinely fails if the
    // initial (detached) paint is skipped by a stale `host.querySelector` guard.
    await assertStepLog(page, 'tree-catalan', '.cat-wrap .cat-shape');
  });

  test('game-tree: step log + initial SVG content', async ({ page }) => {
    const card = await assertStepLog(page, 'game-tree', '.gt-wrap svg .gt-node');
    // step-log rows carry the α-β/leaf/prune info text (non-empty)
    const firstMsg = await card.locator('.viz-logrow .viz-logmsg').first().textContent();
    expect(firstMsg.trim().length).toBeGreaterThan(0);
  });

  test('game-tree: fullscreen keeps transport in-viewport', async ({ page }) => {
    await loadMethod(page, 'game-tree');
    const card = page.locator('[data-method-section="game-tree"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await expect(card.locator('[data-testid="viz-steplog"]')).toBeVisible();
    const box = await card.locator('.stepctl').boundingBox();
    const vh = page.viewportSize().height;
    expect(box).not.toBeNull();
    expect(box.y + box.height).toBeLessThanOrEqual(vh + 1);
  });

  test('tree-general-binary: step log with synthesized LCRS messages', async ({ page }) => {
    const card = await assertStepLog(page, 'tree-general-binary', '.tgb-general-nodes .tree-node, .tgb-binary-nodes .tree-node');
    // synthesized message present (en: "Node ..." or the empty-tree fallback)
    const msgs = (await card.locator('.viz-logrow .viz-logmsg').allTextContents()).join(' ');
    expect(/Node |No links/.test(msgs)).toBe(true);
  });
});
