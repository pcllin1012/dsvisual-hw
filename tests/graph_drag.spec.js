const { test, expect } = require('@playwright/test');
const path = require('path');
const { loadMethod } = require('./helpers.js');

// Poll a node's box until it stops moving, then return it. Two independent
// churn sources make a plain boundingBox() unreliable:
//   1. Method activation smooth-scrolls the card (scrollToCategory in js/app.js)
//      for a few hundred ms after loadMethod resolves.
//   2. After a drag, the re-settle sim replaces svg.innerHTML every rAF frame
//      until it cools (~44 frames ≈ 730ms at 60fps, longer on slow CI). A read
//      landing between swaps sees a detached element and returns null.
// So: tolerate null (mid-swap) and require two consecutive stable non-null
// reads — which only happens once scrolling AND the sim have settled.
async function stableBox(locator) {
  let last = null;
  for (let i = 0; i < 80; i++) {
    let b = null;
    try { b = await locator.boundingBox(); } catch (e) { b = null; }
    if (b) {
      if (last && Math.abs(b.x - last.x) < 0.5 && Math.abs(b.y - last.y) < 0.5) return b;
      last = b;
    } else {
      last = null; // mid-repaint — wait for a stable pair
    }
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

    // Dragged node stays pinned near the drop point. stableBox waits out the
    // re-settle churn (svg.innerHTML swaps each frame until the sim cools).
    const nb = await stableBox(card.locator('.gw-svg .graph-node[data-node="0"]').first());
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
    const b = await stableBox(node);
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.move(cx + 130, cy - 70, { steps: 8 });
    await page.mouse.up();
    const nb = await stableBox(node); // waits out the re-settle churn
    expect(Math.hypot((nb.x + nb.width / 2) - (cx + 130), (nb.y + nb.height / 2) - (cy - 70))).toBeLessThan(25);
  });

  test('graph-traversal: dragging in one pane moves the same node in both', async ({ page }) => {
    await loadMethod(page, 'graph-traversal');
    const card = page.locator('[data-method-section="graph-traversal"]');
    const bfsNode = card.locator('.gw-svg-bfs .graph-node[data-node="0"]').first();
    const dfsNode = card.locator('.gw-svg-dfs .graph-node[data-node="0"]').first();
    await expect(bfsNode).toHaveCount(1);
    await expect(dfsNode).toHaveCount(1);

    const b = await stableBox(bfsNode);
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

test.describe('Graph drag: scrollable canvas', () => {
  test.beforeEach(async ({ page }) => {
    // Height bumped 900 -> 1000 vs. the brief's literal snippet: node 0's default
    // graph-bfs screen position (~y=645) plus this suite's largest drag (dy=260)
    // lands the drop point at clientY≈905 — a few px below a 900-tall viewport.
    // A drop point outside the viewport can never be hit-tested by a later,
    // independent pointerdown (no pointer capture is active yet), which is not a
    // fitCanvas/mapping defect — it reproduces before fitCanvas even runs, from
    // screen-pixel arithmetic alone. Verified with the unmodified 900px viewport:
    // the drag DOES land the node exactly at the intended drop pixel (proving
    // drag-follows-cursor works correctly); it's just off-screen for a fresh click.
    await page.setViewportSize({ width: 1400, height: 1000 });
    await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
    await page.goto('file://' + path.resolve(__dirname, '../index.html'));
  });

  test('graph-bfs: base state has viewBox 600x400 and width 100%, no overflow', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const svg = card.locator('.gw-svg');
    await expect(svg).toHaveAttribute('viewBox', '0 0 600 400');
    expect(await svg.evaluate((el) => el.style.width)).toBe('100%');
    const noHOverflow = await card.locator('.gw-stage').evaluate((el) => el.scrollWidth <= el.clientWidth + 1);
    expect(noHOverflow).toBe(true);
  });

  test('graph-bfs: dragging a node far out grows the viewBox and makes the stage scrollable', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const svg = card.locator('.gw-svg');

    // Drag node 0 far to the right+down, well past the stage edge.
    await dragNode(page, card, 0, 520, 300);
    // Wait until the sim cools and fitCanvas has grown the canvas.
    await expect.poll(async () => {
      const vb = await svg.getAttribute('viewBox');
      return parseFloat(vb.split(' ')[2]); // vbW
    }, { timeout: 4000 }).toBeGreaterThan(600);

    // width% > 100 and the stage now scrolls horizontally.
    const widthPct = await svg.evaluate((el) => parseFloat(el.style.width));
    expect(widthPct).toBeGreaterThan(100);
    const scrollable = await card.locator('.gw-stage').evaluate((el) => el.scrollWidth > el.clientWidth + 1);
    expect(scrollable).toBe(true);

    // The dragged node is still in the DOM and reachable (not clipped away).
    await expect(card.locator('.gw-svg .graph-node[data-node="0"]')).toHaveCount(1);
  });

  test('graph-bfs: mapping stays correct after growth (a second drag still hits the node)', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    await dragNode(page, card, 0, 500, 260);           // grow the canvas
    const cxAfterFirst = parseFloat(await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx'));
    await dragNode(page, card, 0, -120, -80);          // grab node 0 again, move it back a bit
    await expect.poll(async () =>
      Math.abs(parseFloat(await card.locator('.gw-svg .graph-node[data-node="0"]').first().getAttribute('cx')) - cxAfterFirst),
      { timeout: 3000 }).toBeGreaterThan(1); // the second grab actually moved node 0 → hit-test + live mapping work
  });

  test('graph-bfs: dragging the node back in shrinks the canvas (self-correcting)', async ({ page }) => {
    await loadMethod(page, 'graph-bfs');
    const card = page.locator('[data-method-section="graph-bfs"]');
    const svg = card.locator('.gw-svg');
    await dragNode(page, card, 0, 520, 300);
    await expect.poll(async () => parseFloat((await svg.getAttribute('viewBox')).split(' ')[2]), { timeout: 4000 }).toBeGreaterThan(600);
    // Grab node 0 (now off to the lower-right) and drag it back toward the center.
    await dragNode(page, card, 0, -480, -280);
    await expect.poll(async () => parseFloat((await svg.getAttribute('viewBox')).split(' ')[2]), { timeout: 4000 }).toBeLessThan(650);
  });
});
