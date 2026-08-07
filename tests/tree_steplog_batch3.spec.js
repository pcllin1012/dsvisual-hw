const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Assert the shared step-log workbench is wired and the INITIAL frame's content is
// non-empty (catches a paint() that early-returns on the detached initial paint).
async function assertStepLog(page, id, contentSelector) {
  await loadMethod(page, id);
  const card = page.locator('[data-method-section="' + id + '"]');
  await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
  await expect(card.locator('.viz-workbench')).toBeVisible();
  const log = card.locator('[data-testid="viz-steplog"]');
  await expect(log).toBeVisible();
  const rows = card.locator('.viz-logrow');
  const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
  await expect(rows).toHaveCount(max + 1);
  // initial content present WITHOUT any step interaction (carry-forward guard check)
  await expect(card.locator(contentSelector).first()).toBeVisible();
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

test.describe('Tree VCR step log (batch 3)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('tree-mway: code drawer + step log + initial content', async ({ page }) => {
    // Frame 0 is the "empty m-way tree" frame (no root yet), so paint draws no `.mw-node`
    // elements at all on the initial call — unlike other batches, node markup can't be the
    // proof that the detached initial paint reached the DOM. The real proof is `.mw-phase`
    // receiving its message text: the buggy `host.querySelector('.mw-nodes')` guard (host is
    // detached from `wrap` during the synchronous initial paint) would return early and skip
    // that write entirely, leaving `.mw-phase` empty.
    await loadMethod(page, 'tree-mway');
    const preCard = page.locator('[data-method-section="tree-mway"]');
    await expect(preCard.locator('.mw-phase')).not.toBeEmpty();

    const card = await assertStepLog(page, 'tree-mway', '.mw-stage .mw-edges');
    await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText('tree_mway.cpp');
    expect((await card.locator('.viz-logrow .viz-logmsg').first().textContent()).trim().length).toBeGreaterThan(0);
    // by the last frame (assertStepLog jumped there) the tree is non-empty; actual node
    // markup paints correctly too.
    await expect(card.locator('.mw-nodes .mw-node').first()).toBeVisible();
  });
});
