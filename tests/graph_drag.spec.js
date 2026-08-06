const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Method activation triggers an app-level smooth-scroll (scrollToCategory in
// js/app.js) that keeps moving the card for a few hundred ms after loadMethod
// resolves — unrelated to drag, but it races a boundingBox() taken right away.
// Poll until the box stops moving so the computed cx/cy are accurate.
async function stableBox(locator) {
  let last = null;
  for (let i = 0; i < 30; i++) {
    const b = await locator.boundingBox();
    if (last && Math.abs(b.x - last.x) < 0.5 && Math.abs(b.y - last.y) < 0.5) return b;
    last = b;
    await new Promise((r) => setTimeout(r, 50));
  }
  return last;
}

// Drag a node by its on-screen center to a new point; returns {before, after} bbox centers.
async function dragNode(page, card, dataNode, dx, dy) {
  const node = card.locator(`.gw-svg .graph-node[data-node="${dataNode}"]`).first();
  const b = await stableBox(node);
  const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
  await page.mouse.move(cx, cy);
  await page.mouse.down();
  await page.mouse.move(cx + dx, cy + dy, { steps: 8 });
  await page.mouse.up();
  return { cx, cy, target: { x: cx + dx, y: cy + dy } };
}

test.describe('Graph drag: VCR path', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('graph-bfs: nodes carry data-node and drag repositions the dragged node', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await expect(card.locator('.gw-svg .graph-node[data-node="0"]')).toHaveCount(1);

    const { target } = await dragNode(page, card, 0, 140, -80);
    await page.waitForTimeout(700); // let the re-settle cool

    // Dragged node stays pinned near the drop point.
    const nb = await card.locator('.gw-svg .graph-node[data-node="0"]').first().boundingBox();
    const nc = { x: nb.x + nb.width / 2, y: nb.y + nb.height / 2 };
    expect(Math.hypot(nc.x - target.x, nc.y - target.y)).toBeLessThan(25);
  });

  test('graph-bfs: dragging re-settles neighbors', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const other = () => card.locator('.gw-svg .graph-node[data-node="2"]').first().getAttribute('cx');
    const before = parseFloat(await other());
    await dragNode(page, card, 0, 160, -60);
    await expect.poll(async () => Math.abs(parseFloat(await other()) - before), { timeout: 3000 })
      .toBeGreaterThan(0.5); // a non-dragged node moved as the sim re-settled
  });

  test('graph-bfs: dragged position persists across a VCR step', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await dragNode(page, card, 0, 120, -70);
    await page.waitForTimeout(700);
    const cxBefore = await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx');
    await card.locator('.stepctl [data-action="step"]').click();
    const cxAfter = await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx');
    expect(parseFloat(cxAfter)).toBeCloseTo(parseFloat(cxBefore), 1);
  });

  test('graph-bfs: no console errors during drag', async ({ page }) => {
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await dragNode(page, card, 0, 100, 60);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });
});

test.describe('Graph drag: struct + traversal', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1400, height: 900 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('graph (structural): node drags and repositions', async ({ page }) => {
    await loadMethod(page, 'graph');
    const card = page.locator('[data-method-section="graph"]');
    await expect(card.locator('.gw-svg .graph-node[data-node="0"]')).toHaveCount(1);
    const node = card.locator('.gw-svg .graph-node[data-node="0"]').first();
    const b = await node.boundingBox();
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 130, cy - 70, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(700);
    const nb = await node.boundingBox();
    expect(Math.hypot((nb.x + nb.width / 2) - (cx + 130), (nb.y + nb.height / 2) - (cy - 70))).toBeLessThan(25);
  });

  test('graph-traversal: dragging in one pane moves the same node in both', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const card = page.locator('[data-method-section="graph-traversal"]');
    const bfsNode = card.locator('.gw-svg-bfs .graph-node[data-node="0"]').first();
    const dfsNode = card.locator('.gw-svg-dfs .graph-node[data-node="0"]').first();
    await expect(bfsNode).toHaveCount(1);
    await expect(dfsNode).toHaveCount(1);

    const b = await bfsNode.boundingBox();
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 120, cy - 60, { steps: 8 });
    await page.mouse.up();
    await page.waitForTimeout(700);

    // Both panes share one pos → node 0's cx matches across panes.
    const bx = parseFloat(await bfsNode.getAttribute('cx'));
    const dx = parseFloat(await dfsNode.getAttribute('cx'));
    expect(dx).toBeCloseTo(bx, 1);
  });
});
