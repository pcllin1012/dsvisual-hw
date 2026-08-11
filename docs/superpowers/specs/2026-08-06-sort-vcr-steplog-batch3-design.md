# Sort viz 觀測台化 Batch 3/3 設計文件(bucket/count/radix/shaker + legacy 移除 + 全螢幕放大)

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ 7ba418a,branch `feat/sort-vcr-steplog-batch3`)
- 動機:收尾 sort 觀測台化——轉換最後 4 個排序(bucket/count/radix/shaker),移除全部 legacy 命令式機制與靜態 DOM,並讓全螢幕下 bar 適當放大填滿空間。

## 0. 範圍與決策(已與使用者確認)

- **Batch 3 = 最後 4 個排序**:`sort-bucket`、`sort-count`、`sort-radix`、`sort-shaker`,轉為觀測台模型(重用 Batch-1 `renderSort` + `viz_sort_frames.js` + examples + `esc()`)。
- **分布式排序以「bar + 步驟訊息」呈現(對齊 legacy)**:legacy 的 bucket/counting/radix 本就**不顯示輔助結構**(桶、count[]、位數 bins),僅以主 bar 陣列重繪/重寫 + 狀態文字敘述。故轉換為 bar frame + 每步雙語步驟訊息承載該敘述(distribute→桶、count[v]++/前綴和、位數 pass exp、雙向掃描),為 parity(且步驟欄比原本 transient 狀態文字更佳)。**不擴充 frame 模型加 aux lane**(YAGNI;legacy 亦無)。
- **每幀置換旗標**:shaker(雙向氣泡,就地交換)= true;counting/radix(以 output[] 重寫陣列)= false(如 merge);bucket 依實作(對齊 legacy 的「著色 + 重組」;若就地則 true)。單元測試以旗標豁免非置換者,仍恒驗末幀升冪 + 末幀置換。
- **移除全部 legacy**(此時 11 個排序皆用 renderSort):`renderSortBars`/所有 `run*Sort`(含 qs/ms/heapify 輔助)/`setBarVal`/`setBarColor`/`generateSortArray`/`onModeSwitch`/`init`/`dom`/`animState`/`sortArrData`;`index.html` 的 `#sort-actions`(103-107)、`#sort-container`(207);`js/app.js` updateLayout 的 `else if (currentMode.includes('sort-'))` catch-all,以及 `containers`/`actions` 陣列與 `sortContainer`/`sortActions` 變數宣告(1375/1380)。
- **全螢幕 bar 放大**:bar 改用**百分比高度**(`v/maxV * 100%` of `.sortviz-stage`);`.sortviz-stage` 正常給定高(如 260px),全螢幕 `flex:1` 撐滿 stagecol → bar 隨之放大填滿。適用全部 sort viz(共用 renderSort paint + CSS,Batch 1/2/3 皆受惠)。
- **不動**:`sort-external`/`sort-polyphase`(獨立 tape-merge viz)、其他 domain、`buildFrameControls`/`buildStepWorkbench`、`js/cloud-config.js`、方法計數。

## 1. 現況(已查證)

- Batch 1/2:`js/viz/viz_sort_frames.js`(7 產生器 + `hiOf` + `SORT_DEFAULT` + dual-export)、`renderSort(methodId)`(dynamic host + 輸入列 + examples + `esc()` + `buildStepWorkbench`;`paint` 目前 bar 高度 `Math.round((v/maxV)*200+20)+'px'`,只操作 `stage`);`FRAMES` map(7 條);7 個 attach 已切 renderSort。
- 目標 4 個 legacy 命令式(sort.js):
  - **bucket**(183):`max` 分 5 色標桶 + 對整體做 insertion(shift)重組。不顯示真桶。
  - **counting**(207):建 `count[]` 頻率(標 active)、前綴和、依 `output[]` 重寫回 `sortArrData`(標 sorted)。
  - **radix**(228):對每個位數 `exp=1,10,…` 做 counting(位數桶),`output[]` 重寫回(標 active)。
  - **shaker**(269):雙向氣泡,就地交換(comparing/swapping),兩端逐一標 sorted。
- legacy 移除點(line map):`renderSortBars`(78)、`setBarVal`(82)、`setBarColor`(83)、`generateSortArray`(85)、`runBubbleSort`(98)…`runShakerSort`(269)+ 其 helper、`onModeSwitch`(323)、`init`(327)、`C().registerDomain({id:'sort',init,onModeSwitch})`(363)、`sortArrData`/`dom`/`animState`。11 個 attach(bubble…shaker)最終皆為 `{ render: () => renderSort('sort-X'), code, layout:{host:'dynamic'} }`。
- `index.html`:`#sort-actions`(103-107,含 randomize/start/pause/stop 按鈕)、`#sort-container`(207)。
- `js/app.js`:`sortContainer`(1375)、`sortActions`(1380)宣告;updateLayout `containers`/`actions` 陣列含它們;catch-all `else if (currentMode.includes('sort-')) { sortContainer/sortActions.classList.remove('hidden'); … }`(1916)。`sort-external`(1799)/`sort-polyphase`(1807)各有獨立分支(在 catch-all 前,保留)。
- **陷阱**:移除 `#sort-container`/`#sort-actions` HTML 後,`document.getElementById('sort-container'/'sort-actions')` 回 null;若 `containers`/`actions` 陣列仍含它們,`updateLayout` 的 `.classList.add('hidden')` 會對 null 拋錯。→ 必須同步移除陣列項與變數宣告。
- `tests/random_input.spec.js:87` 「Randomize on sort visualizer honors large difficulty」載入 `sort-radix` 驗 legacy `#sort-container` 的 randomize;radix 轉換後無 legacy → 須改寫為新模型(🎲 → 新 frames)或移除。
- `.sortviz-stage` CSS(536):`min-height:240px; align-items:flex-end`;全螢幕 `.viz-*` 祖先綁定已於 PR #203 修好(workbench 在 focus 下已 bounded、log 可捲)。

## 2. 設計

### 2.1 `viz_sort_frames.js` 新增 4 產生器

- `bucketFrames/countingFrames/radixFrames/shakerFrames(input) → [{array, hi, message:{zh,en}}]`;首幀初始、末幀全 `'sorted'`;class ∈ 允許集合;純函式。
- **shakerFrames**:雙向氣泡就地交換(比照 batch-2 bubble 風格,forward/backward pass;comparing/swapping;兩端漸標 sorted)。perFrame **true**。
- **countingFrames**:pass1 掃描計數(標 active + 訊息「count[a[i]]++」);pass2 前綴和(訊息;陣列不變);pass3 由 output 逆序放置、重寫 `a`(標 sorted + 訊息「放置 a[i] 到位置 …」)→ 中間幀非置換。perFrame **false**。末幀升冪 + 置換。
- **radixFrames**:對每個位數 exp(1,10,…直到覆蓋 max):counting by digit,重寫 `a`(標 active + 訊息「位數 pass exp=…:依 %10 digit 分配」)。perFrame **false**。末幀升冪 + 置換。
- **bucketFrames**:對齊 legacy——依值域著色/標示桶(訊息「a[i] → 桶 k」),再對陣列做就地 insertion(相鄰交換)重組(comparing/swapping)。perFrame **true**(就地)。末幀升冪 + 置換。(桶不以 aux lane 呈現,以訊息敘述。)
- `api` 加 4 個。

### 2.2 全螢幕 bar 放大(paint + CSS)

- **paint**(renderSort,js/domains/sort.js):bar 高度改百分比——`height: (v/maxV*100).toFixed(2) + '%'`(取代 px)。
- **CSS**(style.css):
  - `.sortviz-stage { height: 260px; min-height: 200px; }`(給定高度使 % 生效;取代 min-height:240 單一值)。
  - 全螢幕:`body.viz-focus .method-section-card.active .sortviz-stage { flex: 1 1 auto; height: auto; min-height: 0; }`(stagecol flex 子項撐滿 → bar % 隨 stage 高度放大)。`.viz-stagecol` 於 focus 已 flex column(PR #203)。
- 效果:全螢幕 bar 填滿可用高度(適當放大);正常模式維持約 260px。

### 2.3 接線(4 個)+ legacy 移除

- **FRAMES**(sort.js line 7)加 bucket/count/radix/shaker → `SortFrames.{bucket,counting,radix,shaker}Frames`。
- **attach**(358/359/360/362)改為 `() => renderSort('sort-X')` + `layout:{host:'dynamic'}`。
- **app.js**:4 METHODS 加 `codeDrawer:true`;updateLayout 加 4 個 code-panel-only 分支(bucket/count/radix/shaker,檔名 `sort_bucket.cpp`/`sort_counting.cpp`/`sort_radix.cpp`/`sort_shaker.cpp`,變數 codeSortBucket/codeSortCounting/codeSortRadix/codeSortShaker)於 catch-all 前。
- **legacy 移除**(§0 清單):
  - sort.js:刪 renderSortBars/setBar*/generateSortArray/所有 run*Sort + helper/onModeSwitch/init/dom/animState/sortArrData;`C().registerDomain` 改為 `{ id: 'sort' }`(去除 init/onModeSwitch;確認 app 仍載入,若框架允許可整個移除)。保留:renderSort/FRAMES/examples/esc/11 attach。
  - index.html:刪 `#sort-actions`(103-107)、`#sort-container`(207)。
  - app.js:刪 updateLayout catch-all `else if (currentMode.includes('sort-')) {…}`(所有 sort 皆有顯式分支);**刪 `containers`/`actions` 陣列中的 `sortContainer`/`sortActions` 項與其變數宣告(1375/1380)**(避免 null.classList 拋錯)。
- **測試改寫**:`tests/random_input.spec.js:87` 改為新模型——載入某排序,點 `.rand-btn`(🎲),驗 `.sortviz-stage .sort-bar` 依難度重繪(數量變化/存在),或移除該測試(新 E2E 已涵蓋)。

## 3. 檔案清單

- 修改:`js/viz/viz_sort_frames.js`(+4 產生器)、`js/domains/sort.js`(FRAMES +4;4 attach 切;**移除全部 legacy**;paint 改 %)、`js/app.js`(4 METHODS codeDrawer;updateLayout +4 分支、-catch-all、-sortContainer/sortActions 陣列項與宣告)、`index.html`(-#sort-actions/-#sort-container)、`style.css`(`.sortviz-stage` 高度 + 全螢幕放大)、`tests/random_input.spec.js`(改寫/移除 legacy-sort 測試)。
- 新增/擴充:`tests/unit/sort_frames.test.js`(+4 產生器)、`tests/sort_steplog.spec.js`(+4 排序 + 全螢幕放大驗證)。
- 不動:`sort-external`/`sort-polyphase`、其他 domain、`js/cloud-config.js`、`js/code_db.js`、計數框架。

## 4. 測試

- **單元(sort_frames.test.js 擴充)**:bucket/count/radix/shaker 於各輸入:末幀升冪 + 末幀置換 + 非空 + 雙語 + class 合法;per-frame permutation 依旗標(shaker/bucket true;counting/radix false)。
- **E2E(sort_steplog.spec.js 擴充)**:4 排序——輸入/examples/workbench/步驟欄/VCR/抽屜檔名(`sort_bucket.cpp`/`sort_counting.cpp`/`sort_radix.cpp`/`sort_shaker.cpp`)/bar 數==輸入長度/列數==frames/scrub 末幀全 sorted 升冪/不顯示 legacy。
  - **全螢幕放大**:某排序進 focus → `.sortviz-stage .sort-bar` 最高 bar 的像素高度明顯大於非全螢幕(或 stage 高度 > 正常 260),transport 仍在視窗內、步驟欄可捲(沿用 PR #203 驗證)。
- **legacy 移除回歸**:全部 11 個排序皆以觀測台呈現;`#sort-actions`/`#sort-container` 不存在於 DOM;切換各排序模式不拋錯(updateLayout null-ref 陷阱已處理);`sort-external`/`sort-polyphase` 不受影響。
- **計數**:tiles==methodCount、categories 不變。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- bucket/count/radix/shaker 以觀測台呈現(bar + 步驟訊息承載分布敘述);全部 11 排序統一新模型;legacy 機制與靜態 DOM 完全移除且無殘留/報錯。
- 全螢幕下 bar 適當放大填滿可用空間;transport 可操作、步驟欄可捲(PR #203)。
- `sort-external`/`sort-polyphase`、計數、其他 domain 不變;E2E + 全套綠。

## 6. 風險與緩解

- **legacy 移除的 null-ref**(最大風險):移除 `#sort-container`/`#sort-actions` 後,`containers`/`actions` 陣列與變數宣告若殘留 → `updateLayout` 對 null `.classList` 拋錯,切到任何模式即崩。**必須**同步移除陣列項 + 宣告 + catch-all;E2E 切換多個模式(含非 sort)驗不拋錯。
- **registerDomain 去 init**:確認 domain 去掉 init/onModeSwitch 後 app 仍正常載入(attach 已註冊方法);若框架要求 init,給 no-op。E2E 載入 sort 方法驗渲染。
- **分布式排序 aux 未顯示**:對齊 legacy(本就不顯示);步驟訊息承載敘述,為 parity 非退化;末幀升冪 + 置換單元守住正確性。
- **bar 百分比高度需定高父容器**:`.sortviz-stage` 正常給 260px、全螢幕 flex:1(bounded stagecol,PR #203)→ % 生效;E2E 驗正常與全螢幕 bar 高度。
- **counting/radix 中間幀非置換**:刻意(重寫 output);perFrame=false 豁免;末幀置換守住。
- **random_input 測試**:改寫為新 🎲 行為或移除;不弱化其他斷言。
- **sort-external/polyphase**:其 updateLayout 分支在 catch-all 前、獨立 visualizer,不受 sort catch-all 移除影響;抽查其仍正常。
