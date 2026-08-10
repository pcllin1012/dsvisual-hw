# Sort viz → 觀測台化(VCR + step log + examples + code drawer)Batch 1/3 設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ 0d33571,branch `feat/sort-vcr-steplog-batch1`)
- 動機:把 sort 視覺化從 legacy 命令式動畫(`run*Sort` + `await sleep` + 靜態 `#sort-actions`/`#sort-container`)改為與 graph/tree 相同的 frame 模型:VCR transport(`buildFrameControls`)、可點擊步驟紀錄欄(`buildStepWorkbench`)、輸入範例(examples)、原始碼收進抽屜(codeDrawer)。11 個主要排序分 3 批;本 spec = **Batch 1**:共用基礎建設 + `sort-bubble`、`sort-select`、`sort-insert`。

## 0. 範圍與決策(已與使用者確認)

- **11 個主要排序分 3 批**;Batch 1 = 共用 infra + bubble/select/insert 三個 pilot。Batch 2 = quick/merge/shell/heap。Batch 3 = bucket/count/radix/shaker **+ 移除 legacy**。
- **架構**:新純模組 `js/viz/viz_sort_frames.js`(每演算法一個 frame 產生器;frame = 陣列快照 + 每格高亮 class + 雙語訊息);新 `renderSort(methodId)`(dynamic host;輸入列 + `buildStepWorkbench`);重用共用 `K().buildStepWorkbench` + `.viz-*` CSS + 既有 `.sort-bar` 樣式;`codeDrawer:true`。
- **Legacy 共存(重要)**:Batch 1/2 期間,尚未轉換的排序仍用 legacy(`renderSortBars`/`run*Sort`/`#sort-actions`/`#sort-container`);**legacy 機制與靜態 DOM 於 Batch 3(最後一個排序轉換後)才移除**。Batch 1 只把 bubble/select/insert 切到新模型,其餘 8 個維持不變、仍可運作。
- **不動**:`sort-external`/`sort-polyphase`(獨立 tape-merge viz,不在此 12→ 11 主排序範圍)、其他 domain、`buildFrameControls`/`buildStepWorkbench`(僅使用)、`js/cloud-config.js`、方法計數。

## 1. 現況(已查證)

- `js/domains/sort.js`(295 行):`renderSortBars()` 把 `sortArrData` 畫成 `.sort-bar` 進**靜態** `#sort-container`;各演算法 `async run*Sort()` 命令式 mutate + `setBarColor`/`setBarVal` + `await K().sleep(getDelay())`;`init()` 綁 `#btn-sort-start`/`#btn-sort-random`(於 `#sort-actions`);`animState` 播放/暫停;`attach('sort-X', { render: renderSortBars, code, layout:null })`(283-293);`registerDomain({id:'sort', init, onModeSwitch})`。**無** frame list、examples、codeDrawer、step log、dynamic host。
- 色彩 class(既有 CSS `.sort-bar.*`):`comparing`、`swapping`、`sorted`、`pivot`(選擇排序另用 `swapping` 標 min)。
- `updateLayout()`(js/app.js):switch on `currentMode`(method id);先隱藏所有 containers + actions + `#dynamic-viz-host`,再逐模式顯示。sort 分支(~1909):`else if (currentMode.includes('sort-')) { sortContainer.classList.remove('hidden'); sortActions.classList.remove('hidden'); /* per-method code panel */ }`(catch-all;`sort-external`/`sort-polyphase` 於此之前各有自己的分支)。graph VCR 方法的分支為 **code-panel-only**(只設 codeTitle/codeDisplay,不顯示任何靜態容器;由 `render()` 內 `acquireDynamicVizHost()` 顯示 dynamic host)。
- 共用 `K().buildStepWorkbench({ stage, frames, paint, getMessage, runIntervalMs })`(app.js;tree/graph 使用):建 `.viz-workbench`(左 stage + `buildFrameControls` transport;右 `.viz-logcol` 步驟欄),onIndexChange 高亮、列點跳轉;回傳 workbench 元素。**注意**:初始 `paint()` 於 stage detached 時同步觸發 → `paint` 內查詢須用傳入之 stage 參照,不可用 `host.querySelector`(見 §2.2)。
- examples 樣板:`ExamplesStore.load/save`(localStorage)+ 每 viz 自帶 `loadExamples/saveExample/buildExamplesSelect` 小包裝(見 `js/viz/viz_graph_matrix.js`)。
- `js/random_input.js`:`RandomInput.randomInputFor('sort', difficulty)` → `{ data:number[] }`。
- 11 主排序 METHODS(js/app.js 158-168):`visualizer:'sort', controls:'sort'`,皆**無** codeDrawer;cpp `sort_bubble.cpp`/`sort_selection.cpp`/`sort_insertion.cpp`(+ 其餘)。

## 2. 設計

### 2.1 純模組 `js/viz/viz_sort_frames.js`(新;dual-export,可單元測試)

- IIFE + `var api = { … }`、`module.exports = api`、`global.SortFrames = api`。
- Frame 形狀:`{ array: number[](快照), hi: { <index>: '<class>' }, message: { zh, en } }`。`hi` 為稀疏物件(僅高亮的格)。
- 產生器(Batch 1):`bubbleFrames(arr)`、`selectionFrames(arr)`、`insertionFrames(arr)`。把既有 `run*Sort` 命令式邏輯改為:每次「比較 / 交換 / 定位」時 push 一個快照(`array` 為當前 `a.slice()`,`hi` 標當前參與格的 class,`message` 雙語描述該步)。首幀為初始陣列(全 `''`),末幀為完成(全 `'sorted'`)。純函式、無 DOM/RNG/sleep。
  - bubble:外圈每輪、內圈每次比較 push(`{i:'comparing', i+1:'comparing'}`);若交換,交換後再 push(`swapping`);每輪尾將已定位尾端標 `sorted`。訊息如「比較 a[j],a[j+1]」/「交換 a[j]↔a[j+1]」/「a[k] 已就位」。
  - selection:每輪找 min(掃描時標 `comparing`,目前 min 標 `swapping`/pivot),換到前段,標 `sorted`。
  - insertion:取 key(標 `swapping`),向左比較右移(`comparing`),插入定位(`sorted`)。
- helper `SORT_DEFAULT = [5, 2, 8, 1, 9, 3, 7, 4, 6]`(9 格、值 1–9,清楚可辨;或匯出 `DEFAULT`)。

### 2.2 `renderSort(methodId)`(js/domains/sort.js;取代該 3 方法的 renderSortBars 掛法)

- `const host = K().acquireDynamicVizHost();`
- state:`{ text }`(輸入陣列字串,預設由 `SORT_DEFAULT` join `','`)。
- `parse(text)`:以逗號/空白切、`parseInt`、`Number.isFinite` 過濾、clamp 個數(3–20)與值(1–99);空則回預設。
- `rebuild()`:
  - `host.innerHTML = ''`;建輸入列 `.sortviz-controls`:陣列 `<input class="sortviz-input" data-testid="sortviz-input">` + `Build`(`.sortviz-build`)+ `🎲`(`.rand-btn`)+ examples `<select class="ex-select">`(`buildExamplesSelect(methodId, DEFAULT)`)。append 到 host。
  - `const arr = parse(st.text); const frames = FRAMES[methodId](arr);`(FRAMES 對照 `SortFrames.bubbleFrames` 等)。
  - `const stage = document.createElement('div'); stage.className = 'sortviz-stage';`
  - `function paint(f){ stage.innerHTML = f.array.map((v,i)=>'<div class="sort-bar '+(f.hi[i]||'')+'" style="height:'+(v* SCALE)+'px"><span>'+v+'</span></div>').join(''); }`(SCALE 依既有 bar 高度慣例,如 `*2.5`,或依值域調整;沿用 `.sort-bar`)。
  - `host.appendChild(K().buildStepWorkbench({ stage, frames, paint, getMessage:(f)=>K().langOf(f.message), runIntervalMs: 400 }));`
  - wire:Build → `applyText(input.value)`;🎲 → `RandomInput.randomInputFor('sort', difficulty)` → applyText(data.join(','));examples select change → applyText(value)。`applyText(text){ st.text=text; saveExample(methodId, text, DEFAULT); refreshExamples(); rebuild(); }`。
  - **paint 內只用 `stage`**(不可用 host.querySelector;stage 於初始 paint 時 detached)。
- examples 小包裝(sort.js 內):`loadExamples/saveExample/buildExamplesSelect/refreshExamples` 包 `ExamplesStore`(比照 viz_graph_matrix)。
- attach:`R().attach('sort-bubble', { render: () => renderSort('sort-bubble'), code: () => codeSortBubble, layout: { host: 'dynamic' } })`;select、insert 同。

### 2.3 app.js 接線(僅 bubble/select/insert)

- METHODS(158-160):bubble/select/insert 三列加 `codeDrawer: true`(其餘 8 個不動)。
- updateLayout:在 `else if (currentMode.includes('sort-'))` catch-all **之前**,加三個 code-panel-only 分支:
  `else if (currentMode === 'sort-bubble') { codeTitle.textContent='sort_bubble.cpp'; codeDisplay.textContent=codeSortBubble; }`(select/insert 同)。
  → 這 3 個不再顯示 `#sort-container`/`#sort-actions`,改由 renderSort 的 dynamic host 呈現;catch-all 繼續處理其餘 8 個(catch-all 內對 bubble/select/insert 的 if 分支變成 dead,可留可刪——留亦無害,因前置分支先命中)。
- `index.html` script 載入 `js/viz/viz_sort_frames.js`(比照其他 `js/viz/*` 於適當位置;需在 sort.js 使用前載入)。

### 2.4 CSS(style.css)

- 重用既有 `.sort-bar`/`.sort-bar.comparing/.swapping/.sorted/.pivot` 與 `.viz-*`(buildStepWorkbench)。
- 新增 `.sortviz-stage`(bar 容器:flex、底部對齊、gap、overflow-x auto、min-height 合適)與 `.sortviz-controls`(輸入列排版,比照 gw-controls)。若既有 `.sort-container` flex 樣式可套用,沿用其視覺。

## 3. 檔案清單

- 新增:`js/viz/viz_sort_frames.js`、`tests/sort_steplog.spec.js`(E2E)、`tests/unit/sort_frames.test.js`(單元)。
- 修改:`js/domains/sort.js`(+renderSort + examples 小包裝;改 bubble/select/insert attach;**不動** 其餘 8 個的 legacy render/attach)、`js/app.js`(3 METHODS +codeDrawer;updateLayout +3 code-panel 分支)、`index.html`(載入 viz_sort_frames.js)、`style.css`(`.sortviz-*`)。
- **不動(Batch 1)**:legacy `renderSortBars`/`run*Sort`/`animState`/`init`/`dom`/`#sort-actions`/`#sort-container`(仍供其餘 8 個使用;Batch 3 移除)、`js/cloud-config.js`、`js/code_db.js`、其他 domain、計數框架、`tests/random_push.spec.js`。

## 4. 測試

- **單元(`tests/unit/sort_frames.test.js`)**:對 bubble/select/insert 三產生器,於數組(含 `SORT_DEFAULT` + 反序 + 已排序 + 含重複值 + 單元素):
  - 末幀 `array` 為升冪排序;`array` 為輸入之置換(multiset 相等);frames 非空;每幀 `message.{zh,en}` 非空;`hi` 之 class 皆屬允許集合。
- **E2E(`tests/sort_steplog.spec.js`,沿用 loadMethod)**,對 `sort-bubble`/`sort-select`/`sort-insert`:
  - 載入 → `[data-testid="sortviz-input"]`、`.ex-select`、`.viz-workbench`、`[data-testid="viz-steplog"]`、`.stepctl` 可見;`.sortviz-stage .sort-bar` 數 == 輸入長度。
  - `.viz-logrow` 數 == frame 數(== scrubber max+1);初始第 0 列 `.on`;逐步高亮移動;列點末列跳轉。
  - scrub 到末幀 → 全部 `.sort-bar.sorted`;且高度序列為升冪。
  - code drawer:`[data-testid="code-drawer"] .code-panel-filename` 含 `sort_bubble.cpp`/`sort_selection.cpp`/`sort_insertion.cpp`。
  - 🎲 隨機 / 改輸入 + Build → 重繪成功、bar 數更新。
  - **不顯示 legacy**:`#sort-actions`/`#sort-container` 對這 3 個方法不可見(改用 dynamic host)。
- **回歸**:未轉換的 8 個排序仍用 legacy 正常(至少抽查 `sort-quick` 顯示 `#sort-container`/可播放);既有 sort 相關 E2E(若有)續綠。
- **計數**:tiles==methodCount、categories 不變(未增減方法)。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- `sort-bubble`/`sort-select`/`sort-insert` 以新模型呈現:輸入列 + examples、VCR transport、可點擊步驟欄、bar 逐步著色、末幀全排序;原始碼在可折疊抽屜;不再顯示 legacy `#sort-actions`/`#sort-container`。
- 共用 `viz_sort_frames.js` + `renderSort` + `.sortviz-*` 建立且可被 Batch 2/3 重用;其餘 8 個排序 legacy 仍運作。
- 計數自洽;`buildFrameControls`/`buildStepWorkbench`/`cloud-config`/`code_db` 未動;單元 + E2E + 全套綠。

## 6. 風險與緩解

- **Legacy 共存**:Batch 1 只切 3 個,其餘 8 個維持 legacy;不移除 legacy 機制/DOM(Batch 3 才移)。E2E 同時驗「新 3 個用 dynamic host、不顯示 #sort-actions」與「舊 8 個(抽查)仍顯示 #sort-container」。
- **detached 初始 paint**(graph/tree 已遇):`renderSort` 的 `paint` 只操作傳入的 `stage` 元素參照,不用 `host.querySelector`;初始 bar 會於 stage detached 時繪出(參照有效)。E2E 驗初始 bar 數。
- **frame 正確性**:單元測試以「末幀升冪 + 輸入置換」把關每個產生器;含重複值/反序/單元素邊界。
- **bar 高度縮放**:值域 1–99,SCALE 取使最高 bar 合理(如 `*2.5` 上限 ~247px,或依 stage 高度正規化);沿用既有 `.sort-bar` 視覺。
- **examples key**:每方法各自 key(`saveExample(methodId, …)`)或共用 'sort'——採 per-method(與 gw 慣例一致,避免跨演算法污染)。
- **index.html 載入順序**:`viz_sort_frames.js` 須於 domain 初始化前載入(defer script,置於其他 `js/viz/*` 之列)。
- **legacy catch-all dead 分支**:bubble/select/insert 前置 code-panel 分支先命中,catch-all 內其 if 變 dead;留置無害(Batch 3 清)。
