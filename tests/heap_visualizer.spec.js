const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

const heapModes = [
    { id: 'heap-binary', file: 'heap_binary.cpp', title: 'Binary Heap' },
    { id: 'heap-binomial', file: 'heap_binomial.cpp', title: 'Binomial Heap' },
    { id: 'heap-fibonacci', file: 'heap_fibonacci.cpp', title: 'Fibonacci Heap' },
    { id: 'heap-leftist', file: 'heap_leftist.cpp', title: 'Leftist Heap' },
    { id: 'heap-skew', file: 'heap_skew.cpp', title: 'Skew Heap' },
    { id: 'heap-dary', file: 'heap_dary.cpp', title: 'D-ary Heap' },
    { id: 'heap-pairing', file: 'heap_pairing.cpp', title: 'Pairing Heap' },
];

test.describe('Heap Visualizer Suite', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => {
            try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {}
        });
        const fileUri = 'file://' + path.resolve(__dirname, '../index.html');
        await page.goto(fileUri);
    });

    for (const mode of heapModes) {
        test(`${mode.id}: menu selection activates card and opens slides`, async ({ page }) => {
            await loadMethod(page, mode.id);

            const card = page.locator(`[data-method-section="${mode.id}"]`);
            await expect(card).toBeVisible();
            await expect(card.locator('.code-panel-filename')).toHaveText(mode.file);

            await card.locator('.method-slides-btn').click();
            await expect(page.locator('[data-testid="slide-viewer"]')).toBeVisible();
            // Bar now shows deckTitle only; slide.title is injected as <h1> in the body.
            await expect(page.locator('.slideviewer-slide h1.slide-title').first()).toContainText(mode.title);

            await page.locator('.slideviewer-close').click();
            await expect(page.locator('[data-testid="slide-viewer"]')).toBeHidden();
        });
    }
});

// Deep interactive coverage: enter values, watch the sift animation settle, and
// verify the heap invariant (min at the root) holds after insert and extract.
test.describe('Heap Visualizer (interactive: insert + extract-min)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
    });

    // read rendered heap nodes as {v, root}; the root carries the .root class.
    async function heapNodes(page) {
        return await page.locator('#heap-nodes-container .heap-node').evaluateAll((els) =>
            els.map((e) => ({ v: parseInt(e.textContent, 10), root: e.classList.contains('root') })));
    }

    async function insertAll(page, vals) {
        for (let i = 0; i < vals.length; i++) {
            await page.fill('#heap-val', String(vals[i]));
            await page.click('#btn-heap-insert');
            await expect(page.locator('#heap-nodes-container .heap-node')).toHaveCount(i + 1, { timeout: 10000 });
        }
    }

    test('heap-binary: insert bubbles the min to the root; extract surfaces the next min', async ({ page }) => {
        await loadMethod(page, 'heap-binary');
        await insertAll(page, [50, 30, 70, 10, 40]);

        let root = (await heapNodes(page)).find((n) => n.root);
        expect(root.v).toBe(10); // min-heap invariant: smallest at the root

        await page.click('#btn-heap-extract');
        await expect(page.locator('#heap-nodes-container .heap-node')).toHaveCount(4, { timeout: 10000 });
        const after = await heapNodes(page);
        expect(after.find((n) => n.root).v).toBe(30); // next minimum after removing 10
        expect(after.map((n) => n.v).sort((a, b) => a - b)).toEqual([30, 40, 50, 70]);
    });

    test('heap-fibonacci: extract-min consolidates and keeps the new min at the root', async ({ page }) => {
        await loadMethod(page, 'heap-fibonacci');
        await insertAll(page, [25, 8, 15, 3, 20]);

        await page.click('#btn-heap-extract');
        await expect(page.locator('#heap-nodes-container .heap-node')).toHaveCount(4, { timeout: 10000 });
        const after = await heapNodes(page);
        expect(after.find((n) => n.root).v).toBe(8); // min 3 removed → 8 is the new min
        expect(after.map((n) => n.v).sort((a, b) => a - b)).toEqual([8, 15, 20, 25]);
    });
});
