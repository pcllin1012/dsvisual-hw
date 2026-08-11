const { test, expect } = require('@playwright/test');
const { loadMethod } = require('./helpers');
const path = require('path');

test.describe('tree-avl (AVL 旋轉觀測站)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'zh'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-avl');
    });

    test('renders the sandbox with toolbar, 7 presets, transport and step log', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        await expect(sec.locator('[data-testid="avlviz-input"]')).toBeVisible();
        await expect(sec.locator('.avlviz-preset')).toHaveCount(7);
        await expect(sec.locator('[data-testid="avlviz-transport"] .tbtn')).toHaveCount(5);
        await expect(sec.locator('.avlviz-logcol h4')).toHaveText('步驟紀錄');
    });

    test('Key input defaults to a random 1–99 value on load', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        const v = await sec.locator('[data-testid="avlviz-input"]').inputValue();
        expect(v).not.toBe('');
        const n = Number(v);
        expect(Number.isInteger(n)).toBe(true);
        expect(n).toBeGreaterThanOrEqual(1);
        expect(n).toBeLessThanOrEqual(99);
    });

    test('code panel is a collapsed drawer, opened via the header toggle', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        await expect(sec.locator('.method-section-grid .code-panel')).toHaveCount(0);
        const drawer = sec.locator('[data-testid="code-drawer"]');
        await expect(drawer).toBeHidden();
        await sec.locator('[data-testid="code-drawer-toggle"]').click();
        await expect(drawer).toBeVisible();
        await expect(drawer.locator('.code-panel-filename')).toContainText('tree_avl.cpp');
        await expect(drawer.locator('code')).toContainText('Rotate');
    });

    test('inserting an LL sequence grows the tree and logs a rotation', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        const input = sec.locator('[data-testid="avlviz-input"]');
        for (const v of ['3', '2', '1']) { await input.fill(v); await sec.locator('[data-testid="avlviz-insert"]').click(); }
        await expect(sec.locator('[data-testid="avlviz-stage"] .nd')).toHaveCount(3, { timeout: 15000 });
        await expect(sec.locator('[data-testid="avlviz-log"] .dot.k-rotate').first()).toBeAttached();
        const cnt0 = await sec.locator('[data-testid="avlviz-transport"] .cnt').textContent();
        await page.keyboard.press('ArrowLeft');
        await expect(sec.locator('[data-testid="avlviz-transport"] .cnt')).not.toHaveText(cnt0);
    });

    test('LR preset loads parked; slider to the end shows a rotation', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        await sec.locator('.avlviz-preset[data-preset="lr"]').click();
        await expect(sec.locator('[data-testid="avlviz-transport"] .tbtn.play')).toHaveText('▶');
        await sec.locator('[data-testid="avlviz-transport"] input[type=range]')
            .evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
        await expect(sec.locator('[data-testid="avlviz-stage"] .nd')).toHaveCount(3);
        await expect(sec.locator('[data-testid="avlviz-log"] .dot.k-rotate').first()).toBeAttached();
    });

    test('delete-rot preset reaches a rotation at the end', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        await sec.locator('.avlviz-preset[data-preset="delete-rot"]').click();
        await sec.locator('[data-testid="avlviz-transport"] input[type=range]')
            .evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
        await expect(sec.locator('[data-testid="avlviz-log"] .dot.k-rotate').first()).toBeAttached();
    });

    test('duplicate insert rejected; clear empties the tree', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        const input = sec.locator('[data-testid="avlviz-input"]');
        await input.fill('7'); await sec.locator('[data-testid="avlviz-insert"]').click();
        await input.fill('7'); await sec.locator('[data-testid="avlviz-insert"]').click();
        await expect(page.locator('#status-message')).toContainText('已經在樹裡了');
        await sec.locator('[data-testid="avlviz-clear"]').click();
        await expect(sec.locator('[data-testid="avlviz-stage"] .nd')).toHaveCount(0);
        await expect(sec.locator('.avlviz-empty')).toBeVisible();
    });

    test('other tree methods keep the side-by-side code panel', async ({ page }) => {
        await loadMethod(page, 'tree-bst');
        const sec = page.locator('[data-method-section="tree-bst"]');
        await expect(sec.locator('.method-section-grid .code-panel')).toHaveCount(1);
    });
});

test.describe('tree-avl (English)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-avl');
    });
    test('renders English UI and step log', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        await expect(sec.locator('[data-testid="avlviz-insert"]')).toHaveText('Insert');
        await expect(sec.locator('.avlviz-logcol h4')).toHaveText('Step Log');
        const input = sec.locator('[data-testid="avlviz-input"]');
        await input.fill('1'); await sec.locator('[data-testid="avlviz-insert"]').click();
        await input.fill('2'); await sec.locator('[data-testid="avlviz-insert"]').click();
        await input.fill('3'); await sec.locator('[data-testid="avlviz-insert"]').click();
        await expect(sec.locator('[data-testid="avlviz-log"] .op-h').first()).toContainText('Insert');
    });
});

// Deep interactive coverage: verify the tree is structurally rebalanced (which
// key ends up at the root), not merely that a rotation was logged, and that the
// real ▶ play timer advances the transport to the end on its own.
test.describe('tree-avl (interactive: rebalance + playback)', () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => { try { localStorage.setItem('dsvisual-lang', 'en'); } catch (e) {} });
        await page.goto('file://' + path.resolve(__dirname, '../index.html'));
        await loadMethod(page, 'tree-avl');
    });

    // read rendered nodes as {key, cy} — the root is the topmost (smallest cy).
    async function nodes(sec) {
        return await sec.locator('[data-testid="avlviz-stage"] .nd').evaluateAll((els) =>
            els.map((e) => { const r = e.getBoundingClientRect(); return { key: e.dataset.key, cy: r.y + r.height / 2 }; }));
    }

    test('inserting 10,20,30 left-rotates so 20 becomes the root', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        const input = sec.locator('[data-testid="avlviz-input"]');
        const stageNodes = sec.locator('[data-testid="avlviz-stage"] .nd');
        // insert one at a time, waiting for each op to register before the next
        for (let i = 0; i < 3; i++) {
            await input.fill(['10', '20', '30'][i]);
            await sec.locator('[data-testid="avlviz-insert"]').click();
            await expect(stageNodes).toHaveCount(i + 1, { timeout: 15000 });
        }
        const slider = sec.locator('[data-testid="avlviz-transport"] input[type=range]');
        // Drive to the final frame and read the root; poll so we land on the
        // settled post-rotation frame rather than a mid-rotation one (and so a
        // still-updating slider max can't leave us parked before the rotation).
        await expect.poll(async () => {
            await slider.evaluate((el) => { el.value = el.max; el.dispatchEvent(new Event('input', { bubbles: true })); });
            const ns = await nodes(sec);
            if (ns.length !== 3) return null;
            return ns.reduce((a, b) => (b.cy < a.cy ? b : a)).key;
        }, { timeout: 15000 }).toBe('20'); // AVL rebalanced (RR case → single left rotation)

        const ns = await nodes(sec);
        expect(ns.map((n) => n.key).sort()).toEqual(['10', '20', '30']);
        await expect(sec.locator('[data-testid="avlviz-log"] .dot.k-rotate').first()).toBeAttached();
    });

    test('pressing ▶ plays a scenario through to the final step', async ({ page }) => {
        const sec = page.locator('[data-method-section="tree-avl"]');
        await sec.locator('.avlviz-preset[data-preset="lr"]').click();
        const slider = sec.locator('[data-testid="avlviz-transport"] input[type=range]');
        const max = parseInt(await slider.getAttribute('max'), 10);
        expect(max).toBeGreaterThan(0);
        const play = sec.locator('[data-testid="avlviz-transport"] .tbtn.play');
        await expect(play).toHaveText('▶');
        await play.click(); // start the auto-advance timer
        // the timer should carry the cursor all the way to the last step on its own
        await expect.poll(async () => parseInt(await slider.inputValue(), 10), { timeout: 20000 }).toBe(max);
        await expect(sec.locator('[data-testid="avlviz-stage"] .nd')).toHaveCount(3);
        await expect(sec.locator('[data-testid="avlviz-log"] .dot.k-rotate').first()).toBeAttached();
    });
});
