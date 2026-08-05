# Graph VCR:程式碼抽屜 + 步驟紀錄欄(codeDrawer + step log)設計文件

- 日期:2026-08-05
- Repo:`/Users/skhuang/course/dsvisual`(main @ baba091,branch `feat/graph-vcr-codedrawer-steplog`)
- 動機:比照 AVL / 紅黑樹「觀測台」版面,把**有 VCR 的 graph 視覺化**的 C++ 原始碼收進可折疊抽屜(不再與畫布左右並排搶空間),並在視覺化**右側加一條可點擊的步驟紀錄欄**(step log),讓每一幀都能被列出、點擊即跳轉、播放時即時高亮同步。

## 0. 範圍與決策(已與使用者確認)

- **適用**:8 個以 `renderGraphVcr(methodId)` 呈現的單畫布 VCR 方法 ——
  `graph-bfs`、`graph-dfs`、`graph-dijkstra`、`graph-kruskal`、`graph-prim`、`graph-boruvka`、`graph-topo`、`graph-bellman-ford`。
- **不動**(明確排除,理由):
  - `graph-traversal`(雙畫布 dual-pane,版面不同)。
  - `graph`、`graph-adjlist`、`graph-multilist`(結構檢視,無 VCR、無 frame)。
  - `graph-floyd-warshall`(矩陣視覺化,非 `renderGraphVcr`)。
- **兩件事**:
  1. 為這 8 個方法在 METHODS 註冊加上 `codeDrawer: true`,讓原始碼改以既有的可折疊抽屜(`[data-testid="code-drawer"]`)呈現,與 AVL/RB 完全一致。
  2. 把 `renderGraphVcr` 的 `.gw-body` 從「說明 + 畫布」改成 2 欄工作台 `.gw-workbench`:左欄(說明 banner + 畫布 + VCR transport)、右欄 `.gw-logcol`(標題 + 可點擊 `.gw-steplog`,每幀一列)。
- **不改**:演算法、frame 產生器、labels/token 模型、`buildFrameControls` 對外介面(僅**使用**其既有的 `onIndexChange` / scrubber)、方法計數框架、`js/cloud-config.js`。
- 計數不變(不新增/刪除方法);overview tiles==methodCount、categories==14 皆維持。

## 1. 現況(已查證)

- **codeDrawer 既有機制**:`js/app.js` METHODS 中 `tree-avl`(76)、`tree-rb`(77)、`graph`/`graph-adjlist` 等有 `codeDrawer: true`;渲染時原始碼進入可折疊抽屜,DOM 具 `[data-testid="code-drawer"]`、`[data-testid="code-drawer-toggle"]`,檔名元素 `.code-panel-filename` 位於抽屜內(即使收合仍存在於 DOM)。這 8 個目標方法**目前皆無** `codeDrawer`,原始碼與畫布左右並排。
- **`renderGraphVcr` body**(`js/domains/graph.js`):
  - 外層殼建立空的 `<div class="gw-body"></div>`(176);`const body = host.querySelector('.gw-body')`(182)。
  - `rebuild()` 每次重繪把 `body.innerHTML` 設為
    `'<div class="gw-stepdesc" data-testid="gw-stepdesc"></div>' + '<div class="gw-stage"><svg class="gw-svg" data-testid="gw-svg" viewBox="0 0 600 400"></svg></div>'`(202-204),
    取 `svg`(205)、`descEl`(206),定義 `draw(f)`(208-248,末行 `descEl.textContent = langOf(f.message)`),最後 `body.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 700 }))`(250)。
- **`buildFrameControls(frames, paint, opts)`**(`js/app.js`):回傳 `.stepctl` strip(⏮◀▶▶︎ + `.stepctl-scrubber` + 速度 + `.stepctl-count`);每次 `render()` 呼叫 `paint(frame, idx)` 與 `opts.onIndexChange(idx)`;支援 `opts.initialIndex`;若 `!strip.isConnected` 則停止重繪。跳轉可用 `.stepctl-scrubber` 設 `value` + 觸發 `input` 事件驅動。**本次不改此函式**。
- **RB/AVL 步驟紀錄樣板**(`js/domains/tree.js` 189-203):`.rbviz-workbench`(grid `1fr 280px`)> `.rbviz-stagecol`(desc + stage + transport + legend)+ `<aside class="rbviz-logcol">`(`<h4>步驟紀錄/Step Log</h4>` + `.rbviz-steplog[data-testid="rbviz-log"]`);log 列 `.row`(`.on` 高亮、click 跳轉)。CSS 於 `style.css` 2981-2990、響應式 3041-3042。
- **fullscreen(focus mode)**:`style.css` 3391-3398 以 `body.viz-focus … :has(.gw)` 讓 `.gw` / `.gw-body` 成為填滿高度的 flex column、`.gw-stage` `flex:1`、transport(`.stepctl`,append 進 `.gw-body`)固定在底。**改成 `.gw-workbench` 後,`.gw-stage` 不再是 `.gw-body` 直接子孫的舊路徑**,需補 focus-mode 規則(見 §2.3)。
- **既有檔名斷言**:多處以 `sec.locator('.code-panel-filename').toContainText('graph_X.cpp')`(`tests/graph_boruvka.spec.js:19`、`tests/graph_workbench.spec.js`、`tests/visualizer.spec.js` 218/225/232/246/255/264/691/703)。加 `codeDrawer` 後 `.code-panel-filename` 仍存在於抽屜 DOM(收合亦在),`toContainText`(不要求可見)仍應命中;實作時逐一驗證,若某處改用 `.first()` 或要求可見度才需調整(見 §4)。

## 2. 設計

### 2.1 註冊加 `codeDrawer`(`js/app.js` METHODS)

為以下 8 個方法各加 `codeDrawer: true`(其餘欄位不動):
`graph-bfs`、`graph-dfs`、`graph-dijkstra`、`graph-kruskal`、`graph-prim`、`graph-boruvka`、`graph-topo`、`graph-bellman-ford`。
效果:原始碼改走既有 codeDrawer 分支,以可折疊抽屜呈現(與 AVL/RB 一致),不再與畫布並排。

### 2.2 `renderGraphVcr` 2 欄工作台 + 步驟紀錄(`js/domains/graph.js`)

`rebuild()` 內把 `body.innerHTML` 由 §1 的兩段改成:

```
body.innerHTML =
  '<div class="gw-workbench">' +
    '<div class="gw-stagecol">' +
      '<div class="gw-stepdesc" data-testid="gw-stepdesc"></div>' +
      '<div class="gw-stage"><svg class="gw-svg" data-testid="gw-svg" viewBox="0 0 600 400"></svg></div>' +
    '</div>' +
    '<aside class="gw-logcol">' +
      '<h4>' + langOf({ zh: '步驟紀錄', en: 'Step Log' }) + '</h4>' +
      '<div class="gw-steplog" data-testid="gw-log"></div>' +
    '</aside>' +
  '</div>';

const stagecol = body.querySelector('.gw-stagecol');
const svg = body.querySelector('.gw-svg');
const descEl = body.querySelector('.gw-stepdesc');
const logEl = body.querySelector('.gw-steplog');
```

- **`draw(f)`**:內容不變(SVG 繪製 + `descEl.textContent = langOf(f.message)`)。
- **建 log 列**(重繪一次,依 `frames`):每幀一顆 `<button class="gw-logrow" data-i="i">`,內含 `<span class="gw-logidx">i</span>` + `<span class="gw-logmsg">langOf(frames[i].message)</span>`(index 由 0 起,顯示 `i`;訊息以 `langOf` 取當前語系)。以字串組出後 `logEl.innerHTML = rows`。
- **transport 掛到左欄**:`stagecol.appendChild(K().buildFrameControls(frames, draw, { runIntervalMs: 700, onIndexChange: highlightLog }))`(由 append 進 `body` 改為 append 進 `stagecol`)。
- **高亮同步**:
  ```
  function highlightLog(i) {
    const rows = logEl.querySelectorAll('.gw-logrow');
    rows.forEach((r, k) => r.classList.toggle('on', k === i));
    const on = rows[i];
    if (on) on.scrollIntoView({ block: 'nearest' });
  }
  ```
  透過 `buildFrameControls` 的 `onIndexChange(idx)` 於每次 render(step / play / scrub)呼叫,列高亮 + 捲動至可視。
- **列點擊跳轉**:transport append 後取 scrubber 驅動 goTo:
  ```
  const scrub = stagecol.querySelector('.stepctl-scrubber');
  logEl.querySelectorAll('.gw-logrow').forEach((r) => {
    r.addEventListener('click', () => {
      scrub.value = r.dataset.i;
      scrub.dispatchEvent(new Event('input', { bubbles: true }));
    });
  });
  ```
  (scrubber 的 `input` 事件觸發 `buildFrameControls` 內 `goTo`,連帶 `paint` + `onIndexChange` → 畫布 + banner + log 高亮一致。)
- **初始**:render 首幀時 `onIndexChange(0)` 會高亮第 0 列,無需額外處理。

### 2.3 CSS(`style.css`,鏡射 `.rbviz-*`)

新增(靠近 `.gw-stage` 區塊):

```
.gw-workbench { display: grid; grid-template-columns: 1fr 260px; gap: 12px; align-items: start; }
.gw-stagecol { display: flex; flex-direction: column; gap: 0.6rem; min-width: 0; }
.gw-logcol { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: var(--app-radius-md); box-shadow: var(--app-shadow-sm); padding: 12px; max-height: 480px; display: flex; flex-direction: column; min-width: 0; }
.gw-logcol h4 { margin: 0 0 8px; font-size: 0.72rem; letter-spacing: 0.1em; color: var(--text-subtle); text-transform: uppercase; }
.gw-steplog { overflow-y: auto; display: flex; flex-direction: column; gap: 2px; scrollbar-width: thin; }
.gw-logrow { display: flex; gap: 8px; align-items: baseline; text-align: left; border: 0; background: transparent; color: var(--text-muted); font: inherit; font-size: 0.8rem; padding: 6px; border-radius: var(--app-radius-sm); cursor: pointer; line-height: 1.35; width: 100%; }
.gw-logrow:hover { background: var(--surface-hover); }
.gw-logrow.on { background: rgba(52, 152, 219, 0.14); color: var(--text-main); }
.gw-logidx { flex: 0 0 auto; font-variant-numeric: tabular-nums; color: var(--text-subtle); min-width: 1.6em; text-align: right; }
```

響應式(比照 RB 的 3040-3043,同斷點 `max-width: 1020px`,窄畫面單欄):

```
@media (max-width: 1020px) {
  .gw-workbench { grid-template-columns: 1fr; }
  .gw-logcol { max-height: 260px; }
}
```

**fullscreen(focus mode)**:延伸 3391-3398,讓新 nesting 仍把畫布撐滿、transport 固定、log 可捲:

```
body.viz-focus .method-section-card.active .gw-workbench { flex: 1 1 auto; min-height: 0; }
body.viz-focus .method-section-card.active .gw-stagecol { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; }
body.viz-focus .method-section-card.active .gw-stagecol .gw-stage { flex: 1 1 auto; min-height: 0; }
body.viz-focus .method-section-card.active .gw-logcol { max-height: none; }
```

(保留既有 `.gw` / `.gw-body` flex-column 規則;`.gw-body` 現在直接子為 `.gw-workbench`,上列讓 grid 兩欄各自撐滿高度、`.gw-stage` 續 `flex:1`、`.stepctl`(現 append 進 `.gw-stagecol`)固定在底。)

## 3. 檔案清單

- 修改:
  - `js/app.js`:8 個方法註冊加 `codeDrawer: true`。
  - `js/domains/graph.js`:`renderGraphVcr` body 2 欄化 + step log 建列 / 高亮 / 點擊跳轉 + transport 改掛 `.gw-stagecol`。
  - `style.css`:`.gw-workbench` / `.gw-stagecol` / `.gw-logcol` / `.gw-steplog` / `.gw-logrow` + 響應式 + focus-mode 規則。
- 測試:
  - `tests/graph_workbench.spec.js` / `tests/visualizer.spec.js` / `tests/graph_boruvka.spec.js`:視需要調整檔名斷言為抽屜感知(見 §4);新增 step-log 與 codeDrawer 的 E2E。
  - 視情況新增 `tests/graph_steplog.spec.js`(集中步驟紀錄欄行為)。
- **不動**:`js/cloud-config.js`、`js/code_db.js`(本次無 cpp 變更)、`js/viz/viz_graph_workbench.js`(frame 產生器)、`buildFrameControls`、`tests/random_push.spec.js`、其他方法、計數框架。

## 4. 測試

- **codeDrawer(8 方法各驗一致性,抽屜感知)**:載入方法 → `[data-testid="code-drawer"]` 存在;`[data-testid="code-drawer-toggle"]` 可點開合;抽屜內 `.code-panel-filename` 含對應 `graph_X.cpp`。既有 `sec.locator('.code-panel-filename').toContainText('graph_X.cpp')` 逐一確認仍過;若因 codeDrawer 導致 `.code-panel-filename` 多重/需可見度,改用 `[data-testid="code-drawer"] .code-panel-filename` 定位(不弱化,只是更精確)。
- **步驟紀錄欄(至少 bfs + 一個加權如 dijkstra + 一個 MST 如 kruskal)**:
  - 載入 → `.gw-workbench`、`[data-testid="gw-log"]` 可見;`.gw-logrow` 列數 === `frames` 幀數(以畫面既有 `.stepctl-count` 或直接數列驗證一致)。
  - 播放 / 逐步:`onIndexChange` 使當前列 `.gw-logrow.on` 唯一且與 `.stepctl` 進度一致;banner `[data-testid="gw-stepdesc"]` 文字 === 該列 `.gw-logmsg` 文字。
  - 點列跳轉:點第 k 列 → 畫布重繪至該幀、`.gw-logrow.on` 移到第 k 列、banner 同步。
  - 雙語:切語系後列文字與 banner 皆更新(`langOf`)。
- **fullscreen**:進 focus mode → transport(`.stepctl`)仍在畫布下方可見可用、log 欄可捲動、畫布撐滿不被推出。
- **計數**:overview tiles==methodCount、categories==14 仍過(未增減方法)。
- **回歸**:`graph-traversal` / `graph` / `graph-adjlist` / `graph-multilist` / `graph-floyd-warshall` 版面不受影響(未加 `codeDrawer`、未走 2 欄化)。
- 全套 `npm run test:all` 綠;`js/cloud-config.js` 未動。

## 5. 驗收標準

- 8 個 renderGraphVcr 方法:原始碼收進可折疊抽屜(與 AVL/RB 一致);視覺化右側有可點擊步驟紀錄欄,逐幀列出、點擊跳轉、播放即時高亮同步、雙語即時。
- transport / 畫布 / banner / log 四者步驟一致;fullscreen 下 transport 固定、log 可捲。
- 被排除的方法(traversal / 結構 / floyd)版面不變;計數自洽;`js/cloud-config.js` 未動。
- E2E + 既有全套綠。

## 6. 風險與緩解

- **檔名斷言破裂**:加 codeDrawer 後 `.code-panel-filename` 移入抽屜。緩解:先本機驗證既有斷言是否仍過(`toContainText` 不要求可見);破裂處改用 `[data-testid="code-drawer"] .code-panel-filename`,語意不弱化。
- **fullscreen 版面**:2 欄 grid 打斷舊 `.gw-body > .gw-stage` 撐高鏈。緩解:§2.3 focus-mode 規則讓 `.gw-workbench` / `.gw-stagecol` 續撐高、`.gw-stage` `flex:1`、`.gw-logcol` 放開 `max-height`;E2E 驗 transport 可見可用。
- **列數過多(如 bellman-ford ~40 幀)**:`.gw-steplog` `overflow-y:auto` + `scrollIntoView({block:'nearest'})` 自動捲動;不塞爆版面。
- **buildFrameControls 契約**:僅使用既有 `onIndexChange` 與 scrubber `input` 驅動,不改該函式;避免動到其他 20+ 個使用者。
- **窄畫面**:響應式單欄 fallback(log 移到畫布下方),不擠壓畫布。
- **語系切換**:重繪(`rebuild()`)會以當前 `langOf` 重建列與 banner,語系切換即時。
