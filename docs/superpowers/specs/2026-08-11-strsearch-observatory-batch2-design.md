# Search viz 觀測台化 Batch 2/3 設計文件(字串比對:kmp/bm/rk/zalgo/strcompare)

- 日期:2026-08-11
- Repo:`/Users/skhuang/course/dsvisual`(main @ d086399,branch `feat/strsearch-observatory-batch2`)
- 動機:延續 Batch 1,將字串比對搜尋轉為觀測台——VCR 控制、可點步驟欄、隱藏原始碼(code drawer)、example input(text+pattern)、全螢幕放大且維持 VCR 可操作。

## 0. 範圍與決策

- **Batch 2 = 字串比對五法**:`search-kmp`、`search-bm`、`search-rk`、`search-zalgo`、`search-strcompare`,轉為觀測台(重用 `buildStepWorkbench` + code drawer + `.viz-*` 全螢幕 CSS + `ExamplesStore` + `esc()`)。
- **frame 模型(單一 pattern:kmp/bm/rk/zalgo)**:`{ text, pattern, offset, hi, extras, message:{zh,en} }`。`text`/`pattern` 每幀不變;`offset`=pattern 對齊位移;`hi`=`buildAlignmentRow` 既有形狀(`null` / `{kind:'cell',textIdx,patIdx,status}` / `{kind:'window',status}`,status ∈ `match/mismatch/collision`);`extras`=各法側欄資料(kmp:`{lps, lpsActive}`;bm:`{note}`;rk:`{patHash, winHash, status, note}`;zalgo:`{z, zActive, combined}`);`message`=雙語敘述。
- **frame 模型(strcompare,複合)**:`{ panes:{ kmp:{offset,hi,cmp}, bm:{offset,hi,cmp}, rk:{offset,hi,cmp} }, message:{zh,en} }`;三演算法**同步逐步**,以最長者為總步數,已結束者保持定格。**保留** `.strcompare-grid`/`.strcompare-pane`/`.strcompare-align`/`.strcompare-cmp` 類別與三欄結構(既有測試依賴)。
- **純 frame 產生器**:kmp/bm/rk/strcompare 目前是**即時 mutating 閉包、無純函式**——需新寫純產生器(把 live-stepping 邏輯移植成一次算完 frames)。zalgo 已 precompute + `buildFrameControls`,升級到 `buildStepWorkbench` + 輸入列。
- **example input = text + pattern**:輸入列兩欄(text + pattern)+ Build + 🎲 + examples select;`ExamplesStore` 格式 `text | pattern`;`RandomInput` 新增 `'strsearch'` case 回 `{ text, pattern }`(pattern 偶爾出現於 text 以利展示)。預設 `text='ABABDABACDABABCABAB'`、`pattern='ABABCABAB'`。
- **隱藏原始碼**:五法 METHODS 加 `codeDrawer:true`(目前無 → 原始碼側欄常駐;加後收進抽屜)。`updateLayout` 分支已是 code-only,**不需改**。
- **全螢幕放大**:`.strsearch-stage` 正常給定高、`body.viz-focus .method-section-card.active` 下 `flex:1` 撐滿,對齊列 cell 隨之放大;VCR/步驟欄由 `.viz-*` 祖先綁定(PR #203)維持可操作/可捲。
- **consolidate `buildAlignmentRow`**:目前於 kmp/bm/rk/strcompare **重複 4 份**;收斂到新 `viz_strsearch_frames.js` 為共用 paint 核心。
- **不動**:數值搜尋(Batch 1 已完成)、Aho-Corasick(`search-aho`,Batch 3)、其他 domain、`buildFrameControls`/`buildStepWorkbench`、`js/cloud-config.js`、`js/code_db.js`、方法計數。

## 1. 現況(已查證)

- 五法皆 `VizRegistry.attach('search-X', { render, code:()=>codeSearchX, layout:{host:'dynamic'} })`,`updateLayout`(app.js 1841-1861)僅設 codeTitle/codeDisplay(無 container),與 Batch 1 數值搜尋同構。**無 index.html 靜態 DOM**(只有 script 標籤)。
- 檔案/函式:`js/viz/viz_kmp.js`(`renderKMP`)、`js/viz/viz_bm.js`(`renderBM`)、`js/viz/viz_rk.js`(`renderRK`)、`js/viz/viz_zalgo.js`(`renderZAlgo`,已 `buildFrameControls`)、`js/viz/viz_strcompare.js`(`renderStringCompare`,三欄)。script 標籤 index.html 491-496。
- 控制模型:kmp/bm/rk/strcompare = 手寫 `data-action="step|run|reset"` + `setInterval(step,500)`,即時 mutating(`i,j,comparisons,matches[]`…),**無純函式**。zalgo = frames 陣列 + `buildFrameControls`(無步驟欄/輸入)。
- `buildAlignmentRow(text, pattern, offset, hi)`:回 HTML 字串(text 列 + 位移 pattern 列,`<span class="strsearch-cell">`,status→`strsearch-<status>`,offset→`strsearch-spacer`)。重複於 kmp/bm/rk/strcompare 四檔;zalgo 自有 grid painter。
- 輸入硬編碼:`text='ABABDABACDABABCABAB'`、`pattern='ABABCABAB'`(zalgo 用 `s=pattern+'$'+text`)。無輸入框/範例。
- 各法 precompute:kmp `lps[]`;bm `badChar{}`+good-suffix `shift[]/bpos[]`;rk `patHash`+rolling `h`;zalgo `z[]`+`trace[]`。side 欄:kmp LPS strip(`.strsearch-lps-cell`)、bm note、rk hash panel(`[data-testid="rk-hash"]`)、zalgo z-grid(`.zalgo-cell`,`[data-testid="zalgo-stats"]`)。
- 觀測台範式(Batch 1):`js/domains/search.js` `renderSearch`(dynamic host + 輸入列 + examples + esc + `buildStepWorkbench({stage,frames,paint,getMessage:f=>langOf(f.message),runIntervalMs})`);`js/viz/viz_search_frames.js` 純產生器;`.searchviz-*` + 全螢幕放大 CSS。
- 既有測試(`tests/visualizer.spec.js`):kmp(528-536,19 text cells、9 lps、`[data-action=step]`→`[data-testid=kmp-stats]`)、bm(538-546)、rk(548-556,`[data-testid=rk-hash]`)、strcompare(558-567,`.strcompare-pane`×3、`.strcompare-cmp`)、zalgo(637-643,29 `.zalgo-cell`、`[data-testid=zalgo-stats]`)。皆 pin 舊 `[data-action]`/stats 契約 → 需改寫為 VCR + 步驟欄。另 smoke 導覽(740/746)載入 kmp/zalgo。

## 2. 設計

### 2.1 `js/viz/viz_strsearch_frames.js`(新,純函式 dual-export)

- `global.StrSearchFrames` + node `module.exports`;`STRSEARCH_DEFAULT_TEXT`/`STRSEARCH_DEFAULT_PATTERN`;consolidated `buildAlignmentRow(text, pattern, offset, hi)`(回 HTML 字串,自 kmp 檔搬入)。
- **kmpFrames(text, pattern)**:移植 `renderKMP` 的 `step()` 邏輯(precompute `lps`,i/j 前進,match/mismatch),每步 push `{text, pattern, offset:i-j, hi:{kind:'cell',textIdx:i,patIdx:j,status}, extras:{lps, lpsActive}, message}`;命中時記入 `matches`,末幀 message 總結命中位置。
- **bmFrames(text, pattern)**:移植 `renderBM`(badChar + good-suffix `shift`),每步 `{..., hi:{kind:'cell',textIdx:s+j,patIdx:j,status}, extras:{note}, message}`,note 說明 bad-char/good-suffix 位移。
- **rkFrames(text, pattern)**:移植 `renderRK`(rolling hash),每步 `{..., offset:s, hi:{kind:'window',status:'match'|'collision'|'mismatch'}, extras:{patHash, winHash, note}, message}`。
- **zalgoFrames(text, pattern)**:以 `s=pattern+'$'+text` precompute `z[]`,每步 `{text, pattern, offset:null, hi:..., extras:{z, zActive, combined:s}, message}`(保留 z-grid 呈現所需資料;paint 以 `.zalgo-cell` 呈現)。
- **strcompareFrames(text, pattern)**:三個 stepper(kmp/bm/rk)同步逐步至 `allDone`;每步 push `{ panes:{ kmp:{offset,hi,cmp}, bm:{offset,hi,cmp}, rk:{offset,hi,cmp} }, message }`;已結束 pane 定格最後狀態。
- 純函式:不改輸入;每產生器對「pattern 出現/不出現/邊界(空 pattern、pattern 長於 text)」皆回合法 frames。`api` 匯出全部 + defaults + `buildAlignmentRow`。

### 2.2 `js/domains/strsearch.js`(新,取代五個 render 檔)

- `renderStrSearch(methodId)`(比照 `renderSearch`):dynamic host + 輸入列 `<input class="strsearch-text" data-testid="strsearch-text">` + `<input class="strsearch-pattern" data-testid="strsearch-pattern">` + Build + 🎲(`.rand-btn`)+ examples select;全部注入文字經 `esc()`;`ExamplesStore` 格式 `text | pattern`。
- `FRAMES` map(五法 → 對應產生器);`parseStrSearch(text)` 解析 `text | pattern`(pattern 空則用預設)。
- **paint(單一 pattern:kmp/bm/rk/zalgo)**:一個 `.strsearch-stage`;
  - kmp/bm/rk:`buildAlignmentRow(f.text,f.pattern,f.offset,f.hi)` + 依 `f.extras` 附側欄(kmp LPS strip `.strsearch-lps-cell`;bm note;rk hash panel `[data-testid="rk-hash"]`)。
  - zalgo:z-grid 呈現(`.zalgo-cell`,`[data-testid="zalgo-stats"]`)。
  - detached-initial-paint(只碰 `stage`)。
- **paint(strcompare)**:`.strcompare-grid` 三 `.strcompare-pane`(data-pane kmp/bm/rk),各 `buildAlignmentRow(f.text,f.pattern,f.panes.X.offset,f.panes.X.hi)` + `.strcompare-cmp` 計數。
- `getMessage:(f)=>langOf(f.message)`;`buildStepWorkbench({stage,frames,paint,getMessage,runIntervalMs:450})`。
- attach 五法 `{ render:()=>renderStrSearch('search-X'), code:()=>codeSearchX, layout:{host:'dynamic'} }`;`C().registerDomain({ id:'strsearch' })`。

### 2.3 全螢幕放大 + CSS

- 沿用既有 `.strsearch-*`/`.strcompare-*`/`.zalgo-*` 類別(style.css 已有)。新增 `.strsearch-stage { width:100%; min-height:200px; ... overflow:auto }` 包裹;`body.viz-focus .method-section-card.active .strsearch-stage { flex:1 1 auto; min-height:0 }` + cell 放大(`.strsearch-cell`/`.zalgo-cell` 全螢幕加大字級/尺寸)。

### 2.4 接線 + 舊檔移除

- **app.js**:五法 METHODS 加 `codeDrawer:true`(隱藏原始碼)。`updateLayout` 分支不變(已 code-only)。
- **index.html**:載入 `js/viz/viz_strsearch_frames.js` + `js/domains/strsearch.js`(於既有 search 區塊);移除五個舊 script 標籤(491-496 的 kmp/bm/rk/zalgo/strcompare)。
- **移除舊檔**:`git rm js/viz/viz_kmp.js js/viz/viz_bm.js js/viz/viz_rk.js js/viz/viz_zalgo.js js/viz/viz_strcompare.js`(避免重複 attach)。
- **RandomInput**:`randomInputFor` 新增 `case 'strsearch': return { text, pattern }`(pattern 偶爾嵌入 text)。

## 3. 檔案清單

- 新增:`js/viz/viz_strsearch_frames.js`(5 產生器 + buildAlignmentRow)、`js/domains/strsearch.js`(renderStrSearch)、`tests/unit/strsearch_frames.test.js`、`tests/strsearch_steplog.spec.js`(E2E)。
- 修改:`js/app.js`(5 METHODS codeDrawer)、`index.html`(載入新檔、移除 5 舊 script)、`style.css`(`.strsearch-stage` + 全螢幕放大)、`js/random_input.js`(`'strsearch'` case)、`tests/visualizer.spec.js`(移除/改寫 5 個舊 per-method 測試區塊)。
- 移除:`js/viz/viz_kmp.js`、`viz_bm.js`、`viz_rk.js`、`viz_zalgo.js`、`viz_strcompare.js`。
- 不動:`search-aho`、數值搜尋、其他 domain、`js/cloud-config.js`、`js/code_db.js`、計數。

## 4. 測試

- **單元(strsearch_frames.test.js)**:kmp/bm/rk/zalgo × 多輸入(命中一/多次、不命中、pattern 長於 text、pattern==text):frames 非空、text/pattern 每幀不變、雙語 message、hi 合法;**命中位置正確**——各產生器算出的 matches == naive 搜尋 `text.indexOf` 全部出現位置。strcompare:三 pane 皆存在、最終皆 done、三者命中位置一致。純函式不改輸入。
- **E2E(strsearch_steplog.spec.js)**:五法——text+pattern 輸入/examples/workbench/步驟欄/VCR/抽屜檔名/對齊列 cell/列數==frames/scrub 末幀(命中反白或顯示未命中);🎲 重建;strcompare 保留 3 pane;**全螢幕**:進 focus → cell 明顯放大、transport 可操作、步驟欄可捲(PR #203)。
- **回歸**:五法皆觀測台;無 `data-action="step"` 舊契約殘留於這些方法;切換各模式不拋錯;`search-aho` 與數值搜尋、其他 domain 不受影響。
- **random_input**:`'strsearch'` case 產生合法 text+pattern。
- **計數**:tiles==methodCount、categories 不變。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- kmp/bm/rk/zalgo/strcompare 以觀測台呈現:VCR、可點步驟欄、隱藏原始碼(抽屜)、example input(text+pattern)、全螢幕放大且 VCR/步驟欄可操作可捲。
- 命中位置與 naive 搜尋一致(單元守正確性);strcompare 保留三欄比較。
- 舊 render 檔與重複 `buildAlignmentRow` 移除、無殘留/報錯;`search-aho`、數值搜尋、其他 domain 不受影響;E2E + 全套綠。

## 6. 風險與緩解

- **live-stepping 移植正確性**(最大風險):kmp/bm/rk/strcompare 無純函式,移植易出語意錯 → 單元以「matches == naive 搜尋」對每法守正確性;保留舊檔邏輯為對照直到綠。
- **strcompare 複合 frame**:三演算法步數不一 → 以最長者為總步數、結束者定格;paint 保留既有三欄類別;E2E 驗 3 pane。
- **舊測試契約**:`tests/visualizer.spec.js` 五區塊 pin 舊 `[data-action]`/stats → 改寫為 VCR/步驟欄斷言,不弱化(命中反白、frames 數、輸入)。smoke 導覽(kmp/zalgo)確認仍可載入。
- **雙重 attach**:移除五舊 script + 檔案,確保每 id 僅一 attach;E2E 載入五法驗渲染。
- **全螢幕放大需定高父容器**:`.strsearch-stage` 給定高、全螢幕 `flex:1`(PR #203)→ 放大生效;E2E 驗正常與全螢幕 cell 尺寸。
- **RandomInput 'strsearch'**:新增 case,pattern 偶爾嵌入 text 以利展示;不弱化既有 case。
- **範圍較大**:五法 + 複合 strcompare + 移植 4 live stepper + 5 測試改寫。計畫以「單一 pattern 產生器 → strcompare 產生器 → renderStrSearch 接線 → 測試改寫」分工,strcompare 隔離為獨立 task 便於審查。
