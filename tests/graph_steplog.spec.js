const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('Graph VCR: code drawer', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
    });
    const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(fileUri);
  });

  const VCR_METHODS = [
    ['graph-bfs', 'graph_bfs.cpp'],
    ['graph-dfs', 'graph_dfs.cpp'],
    ['graph-dijkstra', 'graph_dijkstra.cpp'],
    ['graph-kruskal', 'graph_kruskal.cpp'],
    ['graph-prim', 'graph_prim.cpp'],
    ['graph-boruvka', 'graph_boruvka.cpp'],
    ['graph-topo', 'graph_topo.cpp'],
    ['graph-bellman-ford', 'graph_bellman_ford.cpp'],
  ];

  for (const [id, file] of VCR_METHODS) {
    test(`${id}: source is in a collapsible code drawer`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      // Drawer present; inline side-by-side code panel absent.
      await expect(card.locator('[data-testid="code-drawer"]')).toHaveCount(1);
      await expect(card.locator('.method-section-grid--full')).toHaveCount(1);
      const toggle = card.locator('[data-testid="code-drawer-toggle"]');
      await expect(toggle).toBeVisible();
      // Filename lives inside the drawer, and matches this method's file.
      await expect(card.locator('[data-testid="code-drawer"] .code-panel-filename')).toContainText(file);
      // Opening the drawer works.
      await toggle.click();
      await expect(card.locator('[data-testid="code-drawer"]')).not.toHaveAttribute('hidden', /.*/);
    });
  }
});

test.describe('Graph VCR: step-log column', () => {
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => {
      try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
    });
    const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
    await page.goto(fileUri);
  });

  // Representative coverage: unweighted (bfs), weighted-with-source (dijkstra),
  // MST (kruskal), directed (bellman-ford).
  for (const id of ['graph-bfs', 'graph-dijkstra', 'graph-kruskal', 'graph-bellman-ford']) {
    test(`${id}: log has one row per frame, synced to transport`, async ({ page }) => {
      await loadMethod(page, id);
      const card = page.locator(`[data-method-section="${id}"]`);
      const log = card.locator('[data-testid="gw-log"]');
      await expect(card.locator('.gw-workbench')).toBeVisible();
      await expect(log).toBeVisible();

      // Row count === frame count === scrubber max + 1.
      const rows = card.locator('.gw-logrow');
      const max = parseInt(await card.locator('.stepctl-scrubber').getAttribute('max'), 10);
      await expect(rows).toHaveCount(max + 1);

      // Initial: row 0 highlighted, and its text equals the step-desc banner.
      await expect(rows.nth(0)).toHaveClass(/\bon\b/);
      const banner = card.locator('[data-testid="gw-stepdesc"]');
      await expect(rows.nth(0).locator('.gw-logmsg')).toHaveText(await banner.textContent());

      // Step forward moves the highlight to row 1 and updates the banner.
      await card.locator('.stepctl [data-action="step"]').click();
      await expect(rows.nth(1)).toHaveClass(/\bon\b/);
      await expect(rows.nth(0)).not.toHaveClass(/\bon\b/);
      await expect(rows.nth(1).locator('.gw-logmsg')).toHaveText(await banner.textContent());

      // Click the last row jumps there (highlight + banner follow).
      const lastRow = rows.nth(max);
      await lastRow.click();
      await expect(lastRow).toHaveClass(/\bon\b/);
      await expect(card.locator('.stepctl-count')).toContainText('/ ' + max);
      await expect(lastRow.locator('.gw-logmsg')).toHaveText(await banner.textContent());
    });
  }

  test('graph-bfs: step log and banner re-render bilingually on language toggle', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const rows = card.locator('.gw-logrow');
    const banner = card.locator('[data-testid="gw-stepdesc"]');

    const enRow0 = await rows.nth(0).locator('.gw-logmsg').textContent();
    const enBanner = await banner.textContent();
    expect(enRow0).toBeTruthy();
    expect(enRow0).toBe(enBanner);

    // Same mechanism the passing i18n tests in tests/visualizer.spec.js use.
    await page.evaluate(() => window.I18N.setLanguage('zh'));

    const zhRow0 = await rows.nth(0).locator('.gw-logmsg').textContent();
    const zhBanner = await banner.textContent();
    // Sync invariant still holds after the language switch re-render.
    expect(zhRow0).toBeTruthy();
    expect(zhRow0).toBe(zhBanner);
    // graph-bfs frame 0's zh/en messages are known to differ (source text authored
    // separately per language) — assert the log actually re-rendered, not stale.
    expect(zhRow0).not.toBe(enRow0);
  });

  test('graph-bfs: fullscreen keeps transport visible and log scrollable', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);
    await expect(card.locator('.stepctl')).toBeVisible();      // transport not pushed off-screen
    await expect(card.locator('[data-testid="gw-log"]')).toBeVisible();

    // Transport must be within the viewport, not just have a non-zero box —
    // toBeVisible() alone doesn't catch a grid item that overflows below the fold.
    const box = await card.locator('.stepctl').boundingBox();
    const vh = page.viewportSize().height;
    expect(box).not.toBeNull();
    expect(box.y + box.height).toBeLessThanOrEqual(vh + 1);

    // step still works in fullscreen
    const cnt = card.locator('.stepctl-count');
    const before = await cnt.textContent();
    await card.locator('.stepctl [data-action="step"]').click();
    await expect(cnt).not.toHaveText(before);
  });

  // Regression: a step log LONGER than the screen must scroll inside its own
  // column and keep the VCR transport within the viewport. graph-bellman-ford
  // has the most frames (~30 rows); a short viewport forces overflow. Before the
  // fix, the auto-sized grid row grew to the log's full content height, pushing
  // the transport far below the fold (bottom ~1200 vs viewport 900).
  test('graph-bellman-ford: fullscreen scrolls a long log, transport stays in-viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 700 });
    await loadMethod(page, 'graph-bellman-ford');
    const card = page.locator('[data-method-section="graph-bellman-ford"]');

    // Enough rows that the log cannot fit the 700px viewport uncapped.
    const rowCount = await card.locator('.gw-logrow').count();
    expect(rowCount).toBeGreaterThan(15);

    await card.locator('[data-testid="viz-focus-toggle"]').click();
    await expect(page.locator('body.viz-focus')).toHaveCount(1);

    const vh = page.viewportSize().height;

    // Transport within the viewport (not pushed below the fold by the long log).
    const tbox = await card.locator('.stepctl').boundingBox();
    expect(tbox).not.toBeNull();
    expect(tbox.y + tbox.height).toBeLessThanOrEqual(vh + 1);

    // The log column itself is bounded within the viewport...
    const lbox = await card.locator('.gw-logcol').boundingBox();
    expect(lbox).not.toBeNull();
    expect(lbox.y + lbox.height).toBeLessThanOrEqual(vh + 1);

    // ...and the step log scrolls internally rather than expanding the column.
    const scrollable = await card.locator('.gw-steplog').evaluate(
      (el) => el.scrollHeight > el.clientHeight + 1);
    expect(scrollable).toBe(true);
  });
});
