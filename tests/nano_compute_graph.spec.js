const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('nano-compute-graph', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    });

    test('mode button appears in nav and code filename shows', async ({ page }) => {
        await loadMethod(page, 'nano-compute-graph');
        const sec = page.locator('[data-method-section="nano-compute-graph"]');
        await expect(sec.locator('.code-panel-filename')).toContainText('nano-compute-graph.cpp');
    });

    test('renders cg-nodes and completes forward pass', async ({ page }) => {
        await loadMethod(page, 'nano-compute-graph');
        const sec = page.locator('[data-method-section="nano-compute-graph"]');

        const nodesRow = sec.locator('[data-testid="cg-nodes"]');
        await expect(nodesRow).toBeVisible();

        const step = sec.locator('.stepctl [data-action="step"]');
        for (let i = 0; i < 40; i++) await step.click();

        await expect(nodesRow.locator('.cg-node')).toHaveCount(5);
        await expect(sec.locator('.cg-phase')).toContainText('complete');
    });

    test('draws the DAG: nodes are positioned and edges are rendered', async ({ page }) => {
        await loadMethod(page, 'nano-compute-graph');
        const sec = page.locator('[data-method-section="nano-compute-graph"]');
        // an actual graph must be drawn — an SVG with one edge per preset edge (4)
        const svg = sec.locator('[data-testid="cg-nodes"] svg.cg-svg');
        await expect(svg).toBeVisible();
        await expect(svg.locator('.cg-edge')).toHaveCount(4); // a→m, b→m, m→s, c→s
        await expect(svg.locator('.cg-node')).toHaveCount(5);
        // nodes occupy distinct positions (not a flat row at the same x)
        const xs = await svg.locator('.cg-node rect').evaluateAll((els) => [...new Set(els.map((e) => Math.round(+e.getAttribute('x'))))]);
        expect(xs.length).toBeGreaterThan(1); // multiple layers → a real DAG layout
    });
});
