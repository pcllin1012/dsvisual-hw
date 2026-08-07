# 有 VCR 的 tree viz:步驟紀錄欄(Batch 2/3)設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ ca9b13e,branch `feat/tree-vcr-steplog-batch2`)
- 動機:延續 Batch 1,為第二批有 VCR 的 tree viz 加旁邊步驟紀錄欄(這 4 個**已有** codeDrawer,故只加步驟欄)。重用 Batch 1 建立的共用 `K().buildStepWorkbench` + `.viz-*` CSS(不改)。

## 0. 範圍與決策(已與使用者確認)

- **Batch 2 = 4 個 viz(皆已 `codeDrawer:true`,只加步驟欄)**:`tree-threaded`、`tree-catalan`、`game-tree`、`tree-general-binary`。
- **重用 Batch 1 產物**:`K().buildStepWorkbench({stage,frames,paint,getMessage,runIntervalMs})` 與 `.viz-*` CSS 不變(本批不動 app.js 的 helper 與 style.css 的 `.viz-*`)。
- **各 viz 的 `getMessage`**(本批非齊一,已查證):
  - `tree-threaded`、`tree-catalan`:`(f)=>K().langOf(f.msg)`(frame `msg` 為 `{zh,en}`)。
  - `game-tree`:抽出 `infoFor(fr)`(英文,現有 banner 同源)供 paint 與 getMessage 共用;`getMessage=(f)=>infoFor(f)`。
  - `tree-general-binary`(tgb):frame 無訊息;`fr.active = {from,to,kind}`(當前 LCRS 鏈結),**合成雙語**訊息(見 §2.3)。
- **Carry-forward 修正(Batch 1 Opus 全分支審查提出,本批落實)**:
  - `buildStepWorkbench` 初始 `paint()` 在 stage 尚未接上 host 時同步觸發;採用的 viz 的 `paint()` **不得**以 `if(!svgEl.isConnected) return;` 提前返回(否則初始幀空白)。`tree-threaded`(viz_threaded.js:69)與 `game-tree`(viz_game_tree.js:69)目前有此 guard → **移除**。
  - E2E 需斷言**初始 SVG 內容**(非只驗列高亮),以捕捉「初始幀空白」回歸。
- **不動**:`buildFrameControls`、`buildStepWorkbench`(本批只呼叫)、`.viz-*` CSS、AVL/RB、Batch 1 已改的 viz、其他 viz、方法計數、`js/cloud-config.js`、`js/code_db.js`、frame 產生器/演算法。

## 1. 現況(已查證)

- 共用 helper `K().buildStepWorkbench({ stage, frames, paint, getMessage, runIntervalMs })`(Batch 1,js/app.js):建 2 欄 `.viz-workbench`(左 `.viz-stagecol`=stage + `buildFrameControls` transport;右 `.viz-logcol`=`.viz-steplog[data-testid="viz-steplog"]`,每幀一列 `getMessage`);onIndexChange 高亮、列點跳轉;回傳 workbench 元素。初始 `paint(frames[0])` 於 stage 仍 detached 時同步觸發。
- Batch 2 四 viz 現況(皆 `host.innerHTML` 內含 `*-wrap` + 已有 codeDrawer):
  - **threaded**(`js/viz/viz_threaded.js`):`.th-wrap`(53);`paint(fr)`(68)**第一行 `if(!svgEl.isConnected) return;`(69)**;設 `.th-phase`.textContent = `langOf(fr.msg)`(80);`wrap.appendChild(buildFrameControls(frames, paint,{runIntervalMs:700}))`(89)。
  - **catalan**(`js/viz/viz_tree_catalan.js`):`.cat-wrap`(47);`paint(fr,i)`(49,無 isConnected guard);設 `.et-phase`.textContent = `langOf(fr.msg)`(61);transport(63,runIntervalMs:800)。
  - **game-tree**(`js/viz/viz_game_tree.js`):`.gt-wrap`(59);`paint(fr,i)`(68)**第一行 `if(!svgEl.isConnected) return;`(69)**;內部算 `info` 字串(prune/leaf/node α-β/best;英文)設 `.gt-info`.textContent(98-104);transport(113,runIntervalMs:700)。
  - **tgb**(`js/viz/viz_tgb.js`):`.tgb-wrap`(160);`paint(fr)`(116,無 guard);顯示 general/binary 兩欄;**無 step banner**;transport(167,runIntervalMs:700)。frame 由 `TreeGeneralBinaryViz.convertFrames`(`js/tree_general_binary_viz.js:43-64`)產:`{links, active}`,`active = { from, to, kind:'left'|'right' }`(當前鏈結;`kind:'left'`=parent→第一個小孩、`kind:'right'`=前一個兄弟→此節點);退化(單節點/空)時 `active=null`。
- 各 viz 皆以 `wrap = host.querySelector('.*-wrap')` 取得(由 host.innerHTML 建),`buildStepWorkbench` 會把 wrap re-parent 進 stage 欄再整包 append 回 host(同 Batch 1 trie/dsu;之後的事件監聽以 `wrap.querySelector` 仍有效)。

## 2. 設計

### 2.1 通用接線(4 viz)

每個 viz:把原本 `wrap.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs }))` 改為
`host.appendChild(K().buildStepWorkbench({ stage: wrap, frames, paint, runIntervalMs, getMessage: <per-viz> }))`。
`paint`/`draw` 內容不動(除 §2.2 的 guard 移除與 game-tree 的 infoFor 抽出);`markFocusFit`/事件監聽等後續程式碼保留。

### 2.2 移除 `isConnected` guard(carry-forward)

- `viz_threaded.js`:刪除 `paint(fr)` 第一行 `if (!svgEl.isConnected) return;`(69)。
- `viz_game_tree.js`:刪除 `paint(fr,i)` 第一行 `if (!svgEl.isConnected) return;`(69)。
- 理由:初始 paint 在 detached stage 上執行;`buildFrameControls` 自身的 `strip.isConnected` guard 已負責 teardown 後不重繪(Batch 1 dsu 同樣處理、已驗證安全)。

### 2.3 `getMessage` 定義

- **threaded**:`(f) => K().langOf(f.msg)`。
- **catalan**:`(f) => K().langOf(f.msg)`。
- **game-tree**:抽出 helper(render 範圍內)
  `function infoFor(fr){ if(!fr) return ''; const ab=abText[fr.id]; if(fr.type==='prune') return 'Prune at node '+fr.id+': α='+fmt(fr.alpha)+' ≥ β='+fmt(fr.beta); if(fr.type==='leaf') return 'Leaf node '+fr.id+' = '+fmt(fr.value); if(ab) return 'Node '+fr.id+': α='+fmt(ab.alpha)+', β='+fmt(ab.beta)+(ab.value!==undefined?', best='+fmt(ab.value):''); return ''; }`
  paint 改用 `let info = infoFor(fr);`(其後既有的 root-value 追加維持,只寫 `.gt-info`);`getMessage = (f) => infoFor(f)`(英文,與該 viz banner 同語系;可接受)。
- **tgb**:合成雙語,依 `fr.active = {from,to,kind}`
  ```
  getMessage: (f) => {
    const a = f.active;
    if (!a) return K().langOf({ zh: '無鏈結(單節點或空樹)', en: 'No links (single node or empty tree)' });
    return a.kind === 'left'
      ? K().langOf({ zh: '節點 ' + a.from + ':左子 → 第一個小孩 ' + a.to, en: 'Node ' + a.from + ': left-child → first child ' + a.to })
      : K().langOf({ zh: '節點 ' + a.from + ':右子 → 下一個兄弟 ' + a.to, en: 'Node ' + a.from + ': right-child → next sibling ' + a.to });
  }
  ```

## 3. 檔案清單

- 修改:`js/viz/viz_threaded.js`、`js/viz/viz_tree_catalan.js`、`js/viz/viz_game_tree.js`、`js/viz/viz_tgb.js`(各改用 buildStepWorkbench;threaded/game-tree 移除 guard;game-tree 抽 infoFor)。
- 新增:`tests/tree_steplog_batch2.spec.js`(E2E;或延伸既有 `tests/tree_steplog.spec.js`——擇一,見 §4)。
- **不動**:`js/app.js`(4 viz 皆已 codeDrawer;不動 helper/METHODS)、`style.css`(重用 `.viz-*`)、`js/cloud-config.js`、`js/code_db.js`、`buildFrameControls`、AVL/RB、Batch 1 viz、frame 產生器、計數框架、`tests/random_push.spec.js`。

## 4. 測試

- **E2E**(對 4 viz;沿用 `loadMethod`,新增 `tests/tree_steplog_batch2.spec.js` 或延伸既有檔):
  - 載入 → `.viz-workbench`、`[data-testid="viz-steplog"]` 可見;`.viz-logrow` 列數 == `.stepctl-scrubber` `max`+1。
  - **初始 SVG 內容非空**(carry-forward):載入後(未點任何步)舞台 SVG 有內容——threaded `.th-wrap svg` 有節點;game-tree `.gt-wrap svg .gt-node`(或 `.gt-node-label`)count>0;catalan 舞台有內容;tgb general/binary 兩欄有節點。(此斷言會在 guard 未移除時失敗,守住回歸。)
  - 初始第 0 列 `.viz-logrow.on`;逐步 → 第 1 列 `.on`、第 0 列非 `.on`;列點末列 → 跳至該幀(`.stepctl-count` 顯示 `/ max`、該列 `.on`)。
  - `[data-testid="code-drawer"]` count 1(抽屜已存在)。
  - 步驟文字:tgb 首列含合成訊息(zh 含「節點」或 en 含「Node」/「No links」,寬鬆斷言);game-tree 首列非空。
  - 全螢幕(擇一,如 game-tree):進 focus → `.stepctl` bounding box 在視窗內、`[data-testid="viz-steplog"]` 可見。
  - 無 console error。
- **回歸**:既有 `tests/visualizer.spec.js`(及相關 spec)對 threaded/catalan/game-tree/tgb 的既有斷言續綠;Batch 1 的 `tests/tree_steplog.spec.js`(segment/fenwick/trie/dsu)不受影響。
- **計數**:overview tiles==methodCount、categories 不變(未增減方法)。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- Batch 2 四個 viz:右側可點擊步驟紀錄欄逐幀列出、播放/逐步/拖動即時高亮、列點跳轉、全螢幕 transport 可操作;抽屜維持。
- threaded/game-tree 初始幀不再空白(guard 已移除;E2E 初始 SVG 斷言守住);tgb 步驟欄呈現合成的 LCRS 鏈結雙語說明;game-tree 步驟欄呈現其 α-β/prune/leaf 資訊。
- 重用 Batch 1 helper/CSS 未改;AVL/RB、其他方法、計數不變;`buildFrameControls`/`cloud-config`/`code_db` 未動;E2E + 全套綠。

## 6. 風險與緩解

- **初始幀空白(guard)**:§2.2 移除 threaded/game-tree 的 `isConnected` guard;§4 初始-SVG-非空 E2E 守住(未移除即失敗)。
- **game-tree infoFor 抽出改變 paint 輸出**:infoFor 僅封裝既有 fr→info 計算;paint 仍加 root-value 後寫 `.gt-info`;既有 game-tree E2E 回歸驗 banner 不變。
- **tgb 合成訊息正確性**:`fr.active.{from,to,kind}` 直接對應 convertFrames 的 LCRS 鏈結(kind:left=首個小孩、right=下一個兄弟);退化 active=null 給「無鏈結」;E2E 寬鬆斷言(含關鍵詞)避免脆弱。
- **wrap re-parent 破壞後續監聽**:同 Batch 1 trie/dsu,wrap 為移動非銷毀,`wrap.querySelector` 事件監聽仍有效;既有互動 E2E 回歸守住。
- **語系**:threaded/catalan/tgb 雙語(langOf/合成);game-tree 英文(與其既有 banner 同,可接受)。
- **helper/CSS 未改**:本批僅呼叫 buildStepWorkbench 並提供 stage/getMessage,降低對 Batch 1 共用件的風險;若需微調 helper 應回頭修 Batch 1 檔並全批回歸(本批預期不需)。
