# 有 VCR 的 tree viz:程式碼抽屜 + 步驟紀錄欄(Batch 1/3)設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ 894244d,branch `feat/tree-vcr-steplog-batch1`)
- 動機:比照 AVL/RB 觀測台,為有 VCR(`buildFrameControls`)的 tree viz 把 C++ 原始碼收進可折疊抽屜,並在旁邊加可點擊步驟紀錄欄。全部 12 個分 3 批;**本 spec = Batch 1**:`tree-segment`、`tree-fenwick`、`tree-trie`、`tree-dsu`。

## 0. 範圍與決策(已與使用者確認)

- **全部 12 個有 VCR 的 tree viz 分 3 批**,各自 spec→plan→SDD→PR:
  - Batch 1(本 spec):`tree-segment`、`tree-fenwick`(需抽屜 + 步驟欄);`tree-trie`、`tree-dsu`(已有抽屜,只需步驟欄)。
  - Batch 2:`tree-threaded`、`tree-general-binary`、`tree-catalan`、`game-tree`(只需步驟欄)。
  - Batch 3:`tree-mway`、`tree-expression`、`tree-array-rep`、`tree-obst`(需抽屜 + 步驟欄)。
- **共用架構**(本批建立,後批重用):新增共用 helper `K().buildStepWorkbench(opts)` 與共用 CSS `.viz-workbench/.viz-stagecol/.viz-logcol/.viz-steplog/.viz-logrow`,把「舞台 + VCR transport(左)/ 步驟紀錄欄(右)」的 2 欄版面與 onIndexChange 高亮、列點跳轉一次做好,含全螢幕修正。
- **不動**:`AVL/RB`(已是觀測台,且用自有 transport 非 buildFrameControls)、非 VCR 的 tree viz、`buildFrameControls` 契約(僅使用其 `onIndexChange` 與 scrubber)、`layout`/演算法/frame 產生器、方法計數、`js/cloud-config.js`、`js/code_db.js`。

## 1. 現況(已查證)

- `buildFrameControls(frames, paint, opts)`(js/app.js):渲染 `.stepctl`(⏮◀▶▶︎ + `.stepctl-scrubber` + 速度 + `.stepctl-count`);每次 render 呼叫 `paint(frames[idx], idx)` 與 `opts.onIndexChange(idx)`(含初始);scrubber `input` 事件驅動 `goTo(+value)`;`!strip.isConnected` 時停止。**不改此函式**。
- Batch 1 四個 viz 目前結構:
  - **segment**(`js/viz/viz_segment.js`):`renderSegmentTree()` → `host`;`wrap` 含 `gridEl`(svg)+ `phaseEl` + `msgEl`;`draw(f)` 設 `gridEl.innerHTML`、`phaseEl.textContent=f.phase`、`msgEl.textContent=f.msg`;`wrap.appendChild(buildFrameControls(frames, draw, {runIntervalMs:600}))`。frame:`{tree,lazy,phase:<string>,active,msg:<string>}`。
  - **fenwick**(`js/viz/viz_fenwick.js`):`wrap` 含 `.fenwick-phase` + `.fenwick-row` + `.fenwick-msg`;`draw(f)` 設 row + `phaseEl.textContent=f.phase(+running sum)`、`msgEl.textContent=f.msg`;`wrap.appendChild(buildFrameControls(frames, draw,{runIntervalMs:600}))`。frame:`{bit,phase:<string>,active,acc,msg:<string>}`。
  - **trie**(`js/viz/viz_trie.js`,已 `codeDrawer:true`):`wrap` + `paint(fr)`(設 svg、`msgEl.textContent=langOf(fr.msg)`、`showStatus`);`wrap.appendChild(buildFrameControls(frames, paint,{runIntervalMs:650}))`。frame `fr.msg` 為 `{zh,en}`。
  - **dsu**(`js/viz/viz_dsu.js`,已 `codeDrawer:true`):`.dsu-wrap` + `scrollEl` + `infoEl`;`paint(fr)` 設 svg、`infoEl.textContent = lang==='zh'?fr.msg.zh:fr.msg.en`;`wrap.appendChild(buildFrameControls(frames, paint,{runIntervalMs:700}))`;之後 `markFocusFit`。frame `fr.msg` 為 `{zh,en}`。
- codeDrawer 機制(app.js METHODS `codeDrawer:true`):原始碼進可折疊抽屜(`[data-testid="code-drawer"]`/`-toggle`,`.code-panel-filename` 在抽屜內),viz 佔滿 `#dynamic-viz-host`。`tree-trie`/`tree-dsu` 已有;`tree-segment`/`tree-fenwick` 尚無。
- 步驟欄樣板既有:`.rbviz-steplog`(tree.js,AVL/RB)、`.gw-steplog`(graph.js);全螢幕修正經驗(graph):grid 需 `grid-template-rows:minmax(0,1fr)` + `min-height:0` 讓 log 內部捲動、transport 不被推出。

## 2. 設計

### 2.1 共用 helper `K().buildStepWorkbench(opts)`(js/app.js,near buildFrameControls)

- `opts = { stage, frames, paint, getMessage, runIntervalMs }`:
  - `stage`:viz 已建好的左欄舞台元素(DOM element,含其 svg/row/phase/msg 等)。
  - `frames`、`paint`、`runIntervalMs`:原封不動轉交 `buildFrameControls`。
  - `getMessage(frame, i) → string`:每格步驟文字(viz 提供;見 §2.3)。
- 行為:
  1. 建 `.viz-workbench`(grid `1fr 260px`)> `.viz-stagecol` + `<aside class="viz-logcol">`。
  2. `.viz-stagecol` 依序放入:`stage`,然後 append `buildFrameControls(frames, paint, { runIntervalMs, onIndexChange: highlight })` 產生的 `.stepctl`。
  3. `.viz-logcol` = `<h4>` + `.viz-steplog[data-testid="viz-steplog"]`;以 `frames.map` 建 `<button class="viz-logrow" data-i="i"><span class="viz-logidx">i</span><span class="viz-logmsg"></span></button>`,每列 `.viz-logmsg` 以 `textContent = getMessage(frames[i], i)` 設定(避免 HTML 注入,與 graph 一致)。
  4. `highlight(i)`:切換各列 `.on`、`scrollIntoView({block:'nearest'})`(由 onIndexChange 每次呼叫,含初始 i=0)。
  5. 列點擊:取 `.stepctl-scrubber`,`scrub.value = i; scrub.dispatchEvent(new Event('input',{bubbles:true}))` → 經 buildFrameControls goTo 跳轉(paint + onIndexChange 同步)。
  6. 回傳 `.viz-workbench` 元素(viz 將它 append 到 host)。標題 `<h4>` 文字用 `langOf({zh:'步驟紀錄',en:'Step Log'})`。
- 純以既有 `buildFrameControls`/`langOf` 組裝;不改 buildFrameControls。

### 2.2 共用 CSS(style.css,鏡射 `.gw-*`/`.rbviz-*` 並含全螢幕修正)

```
.viz-workbench { display:grid; grid-template-columns:1fr 260px; gap:12px; align-items:start; }
.viz-stagecol { display:flex; flex-direction:column; gap:0.6rem; min-width:0; }
.viz-logcol { background:var(--card-bg); border:1px solid var(--card-border); border-radius:var(--app-radius-md); box-shadow:var(--app-shadow-sm); padding:12px; max-height:480px; display:flex; flex-direction:column; min-width:0; }
.viz-logcol h4 { margin:0 0 8px; font-size:0.72rem; letter-spacing:0.1em; color:var(--text-subtle); text-transform:uppercase; }
.viz-steplog { overflow-y:auto; min-height:0; display:flex; flex-direction:column; gap:2px; scrollbar-width:thin; }
.viz-logrow { display:flex; gap:8px; align-items:baseline; text-align:left; border:0; background:transparent; color:var(--text-muted); font:inherit; font-size:0.8rem; padding:6px; border-radius:var(--app-radius-sm); cursor:pointer; line-height:1.35; width:100%; }
.viz-logrow:hover { background:var(--surface-hover); }
.viz-logrow.on { background:rgba(52,152,219,0.14); color:var(--text-main); }
.viz-logidx { flex:0 0 auto; font-variant-numeric:tabular-nums; color:var(--text-subtle); min-width:1.6em; text-align:right; }
@media (max-width:1020px){ .viz-workbench{ grid-template-columns:1fr; } .viz-logcol{ max-height:260px; } }
/* fullscreen: bound the grid row so a long log scrolls internally & transport stays in view */
body.viz-focus .method-section-card.active .viz-workbench { flex:1 1 auto; min-height:0; align-items:stretch; grid-template-rows:minmax(0,1fr); }
body.viz-focus .method-section-card.active .viz-stagecol { flex:1 1 auto; min-height:0; display:flex; flex-direction:column; }
body.viz-focus .method-section-card.active .viz-logcol { max-height:none; min-height:0; }
```

### 2.3 各 viz 接線(Batch 1)

每個 viz:把「原本 append 進 wrap 的 transport」與舞台改成用 `buildStepWorkbench`。作法:保留 viz 既有建構(產生舞台元素與 `paint`/`draw`),但改為建立一個舞台容器 `stage`(含其原本的 svg/row/phase/msg 子元素),然後 `host.appendChild(K().buildStepWorkbench({ stage, frames, paint, getMessage, runIntervalMs }))`,取代原本的 `wrap.appendChild(buildFrameControls(...))`。`paint`/`draw` 內容不動(仍寫入 `stage` 內的 gridEl/phaseEl/msgEl 等)。

`getMessage` 各 viz:
- **segment**:`(f) => f.phase + (f.msg ? ' — ' + f.msg : '')`(純字串)。
- **fenwick**:`(f) => f.phase + (f.msg ? ' — ' + f.msg : '')`(純字串)。
- **trie**:`(f) => K().langOf(f.msg)`(`{zh,en}`)。
- **dsu**:`(f) => K().langOf(f.msg)`(`{zh,en}`)。

codeDrawer:於 `js/app.js` METHODS 為 `tree-segment`、`tree-fenwick` 各加 `codeDrawer: true`(其餘欄位不動);`tree-trie`、`tree-dsu` 已有。

## 3. 檔案清單

- 修改:
  - `js/app.js`(新增 `buildStepWorkbench` 並掛到 VizKit/`K()` 匯出;METHODS 為 segment/fenwick 加 `codeDrawer:true`)。
  - `style.css`(共用 `.viz-*` workbench/steplog + 全螢幕規則)。
  - `js/viz/viz_segment.js`、`js/viz/viz_fenwick.js`、`js/viz/viz_trie.js`、`js/viz/viz_dsu.js`(改用 buildStepWorkbench)。
- 新增:`tests/tree_steplog.spec.js`(E2E)。
- 不動:`js/cloud-config.js`、`js/code_db.js`、`buildFrameControls`、AVL/RB(tree.js)、其他 tree viz、frame 產生器、計數框架、`tests/random_push.spec.js`。

## 4. 測試

- **E2E(`tests/tree_steplog.spec.js`,沿用 `loadMethod`)**,對 `tree-segment`、`tree-fenwick`、`tree-trie`、`tree-dsu`:
  - 載入 → `.viz-workbench`、`[data-testid="viz-steplog"]` 可見;`.viz-logrow` 列數 == frame 數(== `.stepctl-scrubber` `max` + 1)。
  - 初始:第 0 列 `.viz-logrow.on`;逐步(點 `.stepctl [data-action="step"]`)→ 第 1 列 `.on`、第 0 列非 `.on`。
  - 列點擊末列 → 跳至該幀(`.stepctl-count` 顯示 `/ max`、該列 `.on`)。
  - 抽屜:`tree-segment`、`tree-fenwick` 有 `[data-testid="code-drawer"]` 且抽屜內 `.code-panel-filename` 含 `tree_segment.cpp`/`tree_fenwick.cpp`;`tree-trie`/`tree-dsu` 抽屜維持存在。
  - 全螢幕(擇一,如 tree-segment):進 focus → `.stepctl` bounding box 在視窗內、`[data-testid="viz-steplog"]` 可見(可捲)。
  - 無 console error。
- **計數**:overview tiles==methodCount、categories 不變(未增減方法)。
- **回歸**:既有 `tests/visualizer.spec.js` 對 segment/fenwick 的既有斷言(`fenwick-phase`、segtree 15 節點步進等)續綠;AVL/RB、非 VCR tree viz 不受影響。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- Batch 1 四個 viz:原始碼收進可折疊抽屜(segment/fenwick 新增,trie/dsu 維持);右側可點擊步驟紀錄欄逐幀列出、播放/逐步/拖動即時高亮同步、列點跳轉、全螢幕 transport 仍可操作、log 可捲。
- 共用 `buildStepWorkbench` + `.viz-*` CSS 建立且可被 Batch 2/3 重用。
- AVL/RB、其他方法、計數不變;`buildFrameControls`/`cloud-config`/`code_db` 未動;E2E + 全套綠。

## 6. 風險與緩解

- **各 viz 舞台重構破壞既有事件/測試**:paint/draw 內容不動,只是把舞台元素包進 `stage` 容器再交給 buildStepWorkbench;既有 `data-testid`(`fenwick-phase`/`fenwick-msg`、`segtree-node` 等)與事件監聽保留;E2E 回歸守住既有斷言。
- **transport 位置改變**:transport 由 append 進 wrap 改為 buildStepWorkbench 內 append 進 `.viz-stagecol`;`.stepctl` 仍為單一、仍可被既有 `.stepctl [data-action]` 測試選到。
- **全螢幕版面**(graph 曾遇 grid 撐高 bug):§2.2 全螢幕規則(`grid-template-rows:minmax(0,1fr)` + `min-height:0` + logcol 放開)一次做對,E2E 驗 transport 在視窗內。
- **訊息語系**:segment/fenwick 的 `f.phase`/`f.msg` 為純字串(與現有 banner 同源,語系切換時整個 viz 重繪);trie/dsu 為 `{zh,en}` 用 `langOf`。getMessage 各自處理;E2E 不硬編整句。
- **helper 命名/匯出**:`buildStepWorkbench` 掛在 VizKit(`K()`)與 buildFrameControls 同層匯出,供各 viz 呼叫;不動 buildFrameControls 既有簽章。
- **codeDrawer 對既有 filename 斷言**:segment/fenwick 加抽屜後 `.code-panel-filename` 移入(隱藏)抽屜;既有 `toContainText` 不要求可見仍過;破裂處改 `[data-testid="code-drawer"] .code-panel-filename`(不弱化)。
