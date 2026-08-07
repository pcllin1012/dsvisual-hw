# 有 VCR 的 tree viz:程式碼抽屜 + 步驟紀錄欄(Batch 3/3,收尾)設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ b351929,branch `feat/tree-vcr-steplog-batch3`)
- 動機:完成 12 個有 VCR 的 tree viz 的觀測台化。最後 4 個(**皆無** codeDrawer,需抽屜 + 步驟欄):`tree-mway`、`tree-obst`、`tree-array-rep`、`tree-expression`。重用 Batch 1 的共用 `K().buildStepWorkbench` + `.viz-*` CSS(不改)。

## 0. 範圍與決策(已與使用者確認)

- **Batch 3 = 4 個 viz,需抽屜 + 步驟欄**:`tree-mway`、`tree-obst`、`tree-array-rep`、`tree-expression`。
- **重用 Batch 1 產物不改**:`K().buildStepWorkbench({stage,frames,paint,getMessage,runIntervalMs})`、`.viz-*` CSS。本批**不改** `buildStepWorkbench`/`buildFrameControls`/`.viz-*` CSS。
- **每 viz 需引入 wrapper**:這 4 個 viz 目前把 controls+stage 直接渲染進 `host`(無單一 `wrap` 容器);需在 `host.innerHTML` 外層包一個 `<div class="X-wrap">` 作為 buildStepWorkbench 的 `stage`。
- **Carry-forward(通用,本批全面套用)**:`buildStepWorkbench` 的初始 `paint()` 在 stage detached 時同步觸發 → `paint`(含 `if(!host.querySelector(...))return;` guard)內所有 `host.querySelector*` 改為 `wrap.querySelector*`,初始幀才會繪出(不靠 rAF 自癒)。E2E 用 **paint-only 選擇器** 斷言初始內容(避免靜態容器的弱守衛)。
- `getMessage`:mway/obst/array-rep = `(f)=>K().langOf(f.msg)`;expr-tree = `(f)=>(f.token ? '['+f.token+'] ' : '') + K().langOf(f.msg)`(比照其 banner)。
- **不動**:AVL/RB、Batch 1/2 已改 viz、其他 viz、frame 產生器/演算法、`js/cloud-config.js`、`js/code_db.js`、`style.css`(重用 `.viz-*`)、方法計數。

## 1. 現況(已查證)

- 共用 `K().buildStepWorkbench(...)`(Batch 1)行為見前批 spec;初始 paint 於 stage detached 時同步跑。
- 4 viz 現況(皆 `host.innerHTML` 直接放 controls+stage,**無 wrap**;transport append 到 `host`;paint 大量用 `host.querySelector`):
  - **mway**(`js/viz/viz_mway.js`):host.innerHTML=`.mw-controls`+`.mw-stage`(`.mw-edges`/`.mw-nodes`);`paint(fr)`(39)首行 `if(!host.querySelector('.mw-nodes'))return;`(40),用 `.mw-nodes`/`.mw-edges`/`.mw-phase`;設 `.mw-phase`=langOf(fr.msg)(44/59);transport `host.appendChild(buildFrameControls(frames,paint,{runIntervalMs:700}))`(61);handlers `.mw-apply`/`.mw-keys`/`.mw-m`/`.rand-btn`(62-67)。frame `fr.msg`={zh,en}。
  - **obst**(`js/viz/viz_obst.js`):host.innerHTML=`.obst-controls`+`.obst-grid`+`.obst-tree-stage`(`.obst-edges`/`.obst-nodes`);`paint(fr)`(37)首行 `if(!host.querySelector('.obst-grid'))return;`(38),用 `.obst-grid`/`.obst-nodes`/`.obst-edges`/`.obst-phase`;設 `.obst-phase`=langOf(fr.msg)(65);transport(67,runIntervalMs:600);handlers `.obst-apply`/`.obst-keys`/`.obst-freqs`/`.rand-btn`。frame `fr.msg`={zh,en}。
  - **array-rep**(`js/viz/viz_tree_array_rep.js`):host.innerHTML=`.ar-controls`+`.et-stage`(`.et-edges`/`.et-nodes`)+`.ar-array`+`.ar-stats`;`paint(fr)`(62)首行 `if(!host.querySelector('.et-stage'))return;`(63),用 `.et-stage`/`.et-edges`/`.et-nodes`/`.ar-array`/`.ar-stats`/`.et-phase`;設 `.et-phase`=langOf(fr.msg)(94);另有 `mark()`(54/56)用 host.querySelector 標記 `.ar-cell`/`.tree-node`(於 paint 呼叫);transport(需確認 append 行);handlers。frame `fr.msg`={zh,en}。
  - **expr-tree**(`js/viz/viz_expr_tree.js`):host.innerHTML=`.et-*` stage/stack/asg/result/truthtable;`paint(fr)`(134)設 `.et-phase`=`(fr.token?'['+fr.token+'] ':'')+langOf(fr.msg)`(151);transport `host.appendChild(buildFrameControls(frames,paint,{runIntervalMs:700}))`(153);另有 `paintForest`/`paintAsg`/truth-table(以 `.et-stage`/`.et-edges`/`.et-nodes`/`.et-asg`/`.et-result` host.querySelector);mode 按鈕等 handlers。frame `fr.msg`={zh,en},`fr.token` 可選。
- 4 個 METHODS(js/app.js)皆**無** codeDrawer:`tree-obst`(89)、`tree-mway`(91)、`tree-expression`(92)、`tree-array-rep`(97);cpp:`tree_obst.cpp`/`tree_mway.cpp`/`tree_expression.cpp`/`tree_array_rep.cpp`。

## 2. 設計

### 2.1 每 viz 通用改法

1. **引入 wrapper**:把該 viz `host.innerHTML` 的全部內容包進單一 `<div class="X-wrap">…</div>`(X = mw/obst/ar/et 對應既有前綴;沿用既有 `vizfit-host`/`vizfit-scroll` 若原本有,保留於 wrap 或其內)。取 `const wrap = host.querySelector('.X-wrap')`。
2. **host→wrap(paint 初始幀修正)**:把 render 函式內(尤其 `paint`,含其開頭的 `if(!host.querySelector(...))return;` guard、`mark()` 等 paint 期間呼叫者)所有 `host.querySelector*` 改為 `wrap.querySelector*`。post-append 的 handlers 亦一併改為 `wrap.querySelector*`(統一;attached 時 wrap 亦可查)。**唯一例外**:針對 viz 內容之外(如 host 本身尺寸)之查詢不改——本 4 viz 無此情況(所有 `.X-*` 皆在 wrap 內)。
3. **transport → buildStepWorkbench**:把 `host.appendChild(K().buildFrameControls(frames, paint, { runIntervalMs }))` 改為
   `host.appendChild(K().buildStepWorkbench({ stage: wrap, frames, paint, runIntervalMs, getMessage }))`。
4. **codeDrawer**:於 `js/app.js` METHODS 為該 viz 加 `codeDrawer: true`。
`paint`/繪圖邏輯內容不變(只換查詢根 host→wrap)。

### 2.2 `getMessage`

- **mway / obst / array-rep**:`(f) => K().langOf(f.msg)`。
- **expr-tree**:`(f) => (f.token ? '[' + f.token + '] ' : '') + K().langOf(f.msg)`(與其 banner 一致;`fr.msg` 為 {zh,en})。

## 3. 檔案清單

- 修改:`js/app.js`(4 個 METHODS 加 codeDrawer;**不動** buildStepWorkbench/buildFrameControls)、`js/viz/viz_mway.js`、`js/viz/viz_obst.js`、`js/viz/viz_tree_array_rep.js`、`js/viz/viz_expr_tree.js`。
- 新增:`tests/tree_steplog_batch3.spec.js`(E2E)。
- 不動:`style.css`(重用 `.viz-*`)、`js/cloud-config.js`、`js/code_db.js`、AVL/RB、Batch 1/2 viz、其他 viz、frame 產生器、計數框架、`tests/random_push.spec.js`。

## 4. 測試

- **E2E**(對 4 viz,新增 `tests/tree_steplog_batch3.spec.js`,沿用 `loadMethod` 與共用 `assertStepLog(page,id,contentSelector)` 樣式):
  - 抽屜:`[data-testid="code-drawer"]` count 1;抽屜內 `.code-panel-filename` 含對應 `tree_mway.cpp`/`tree_obst.cpp`/`tree_array_rep.cpp`/`tree_expression.cpp`。
  - 工作台:`.viz-workbench`、`[data-testid="viz-steplog"]` 可見;`.viz-logrow` 列數 == `.stepctl-scrubber` `max`+1。
  - **初始內容(paint-only 選擇器)**:載入後(未點步)舞台有 paint 繪出的內容——mway `.mw-nodes .tree-node`(或 paint 實際產生的節點類別);obst `.obst-grid` 內 paint 繪出的儲存格(如 `.obst-cell` / grid `td`);array-rep `.et-nodes .tree-node`;expr `.et-nodes .tree-node`。(實作時以該 viz paint 實際輸出的、靜態模板沒有的選擇器為準——避免靜態容器弱守衛;此斷言在 host→wrap 未修時會失敗。)
  - 高亮:初始第 0 列 `.viz-logrow.on`;逐步 → 第 1 列 `.on`、第 0 列非;列點末列 → 跳幀(`.stepctl-count` 顯示 `/ max`、該列 `.on`)。
  - 步驟文字:各 viz 首列 `.viz-logmsg` 非空;expr 若首幀有 token 則含 `[token]` 前綴(寬鬆:非空即可)。
  - 全螢幕(擇一):進 focus → `.stepctl` bounding box 在視窗內、`[data-testid="viz-steplog"]` 可見。
  - 無 console error。
- **回歸**:既有 `tests/visualizer.spec.js`(及各 viz 專屬 spec)對 mway/obst/array-rep/expr 的既有斷言續綠(尤其它們原本用 `.mw-*`/`.obst-*`/`.et-*`/`.ar-*` 的 testid/class,包 wrap 後仍為 host 之後代,選擇器仍命中);Batch 1/2 步驟欄 spec 不受影響。
- **計數**:overview tiles==methodCount、categories 不變(未增減方法)。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js`/`style.css` 未動。

## 5. 驗收標準

- Batch 3 四個 viz:原始碼收進可折疊抽屜(新增);右側可點擊步驟紀錄欄逐幀列出、播放/逐步/拖動即時高亮、列點跳轉、全螢幕 transport 可操作;初始幀同步繪出(不靠 rAF 自癒)。
- 12 個有 VCR 的 tree viz 全數觀測台化完成(AVL/RB + Batch 1/2/3)。
- 重用 helper/CSS 未改;AVL/RB、其他方法、計數不變;`buildFrameControls`/`cloud-config`/`code_db`/`style.css` 未動;E2E + 全套綠。

## 6. 風險與緩解

- **wrapper 引入破壞既有選擇器/測試**:既有 `.mw-*`/`.obst-*`/`.et-*`/`.ar-*` 測試以 `card.locator('.X')` 或 testid 查詢,包一層 wrap(仍在 host 內)後仍為後代,選擇器命中不變;E2E 回歸守住。若某既有測試依賴 host 直接子關係(罕見),改測試而非弱化。
- **paint 內大量 host→wrap 漏改**:每 viz paint 內 `host.querySelector*` 需全數改 wrap(含 guard 與 mark 等 helper);E2E 初始-內容(paint-only)斷言會在漏改時失敗(未繪出),守住。逐 viz task 審查逐一核對「paint 內無殘留 host.query*」。
- **handlers 用 host vs wrap**:post-append handlers 兩者皆可(attached);統一改 wrap 以一致、降風險;既有互動 E2E(apply/random/mode 切換)回歸守住。
- **expr-tree 較複雜(forest/truthtable/mode)**:其 paintForest/paintAsg/truth-table 亦用 host.querySelector → 一併改 wrap;getMessage 含 token 前綴;既有 expr E2E(布林/算術/真值表)回歸守住。
- **初始內容選擇器選錯(靜態容器)**:比照 tgb 教訓,選 paint 實際輸出、靜態模板沒有的選擇器;逐 task 驗證「暫時還原 host guard 時該斷言失敗」以確認為真守衛(若因 rAF 自癒無法在正常時序失敗,如 Batch 2 catalan,於報告誠實說明,production 修正仍為正確之 defense-in-depth)。
- **codeDrawer 對既有 filename 斷言**:加抽屜後 `.code-panel-filename` 移入(隱藏)抽屜;既有 `toContainText`(不要求可見)仍過;破裂處改 `[data-testid="code-drawer"] .code-panel-filename`(不弱化)。
- **markFocusFit / vizfit-scroll 結構**:若 viz 原有 `vizfit-host`/`vizfit-scroll`,包 wrap 時保留這些 class 於適當層級,避免破壞 focus-fit;E2E 全螢幕案例守住。
