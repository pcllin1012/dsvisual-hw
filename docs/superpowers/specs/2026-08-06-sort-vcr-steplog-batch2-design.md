# Sort viz 觀測台化 Batch 2/3 設計文件(quick / merge / shell / heap)

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ 50b424c,branch `feat/sort-vcr-steplog-batch2`)
- 動機:延續 Batch 1,把 `sort-quick`、`sort-merge`、`sort-shell`、`sort-heap` 轉為觀測台模型(VCR + 步驟欄 + examples + code drawer)。重用 Batch 1 建立的 infra(`viz_sort_frames.js` + `renderSort` + `FRAMES` map + examples helpers + `esc()`),只新增 4 個 frame 產生器 + 接線。

## 0. 範圍與決策(已與使用者確認)

- **Batch 2 = 4 個排序**:quick / merge / shell / heap。重用 Batch-1 infra 不改(`renderSort`、examples、`esc()`、`buildStepWorkbench`)。
- **每個排序**:於 `viz_sort_frames.js` 加一個 frame 產生器;`FRAMES` map 加一條;`attach` 切到 `renderSort`;METHODS 加 `codeDrawer:true`;updateLayout 加 code-panel-only 分支(置於 `currentMode.includes('sort-')` catch-all 之前)。
- **每幀置換不變量(per-frame permutation)**:quick/shell/heap 為就地交換 → 每幀皆為輸入之置換(單元測試斷言);**merge 為輔助陣列覆寫**(標準合併長條動畫會在寫回過程中暫時出現重複值)→ **不**斷言每幀置換,只斷言末幀已排序且為置換。此為刻意設計,符合經典 merge 視覺化。
- **Legacy 共存**:剩餘 4 個(bucket/count/radix/shaker)+ external/polyphase 維持 legacy;**legacy 機制與靜態 DOM 於 Batch 3 移除**(本批不移)。
- **不動**:Batch-1 已轉換的 bubble/select/insert、剩餘 legacy 排序、`renderSort`/examples/`esc()` infra、`buildFrameControls`/`buildStepWorkbench`、`js/cloud-config.js`、方法計數。

## 1. 現況(已查證)

- Batch 1 infra:`js/viz/viz_sort_frames.js`(`bubbleFrames`/`selectionFrames`/`insertionFrames` + `SORT_DEFAULT`,dual-export `SortFrames`;frame `{array, hi:{index:class}, message:{zh,en}}`,`insertionFrames` 用相鄰交換保每幀置換);`js/domains/sort.js` 的 `renderSort(methodId)`(dynamic host + 輸入列 + examples + `buildStepWorkbench({stage,frames,paint,getMessage,runIntervalMs})`;`paint` 只操作 `stage`;examples/`esc()` 齊備),`FRAMES` map(line 7),3 個 attach 已切 `renderSort`。
- 目標 4 個的 legacy 命令式(sort.js):
  - **quick**(`qsPartition`):就地交換(`a[i]↔a[j]`、`a[i+1]↔a[high]`);pivot=high('pivot');掃描 'comparing';交換 'swapping';放定 pivot 標 'sorted'。就地 → 每幀置換。
  - **merge**(`msMerge`):輔助 `L`/`R`,`setBarVal(k, chosen)` 覆寫回 `l..r`;逐次寫入時陣列非置換(標準動畫)。'comparing'/'sorted'。
  - **shell**(gapped insertion):`setBarVal(j, a[j-gap])` 位移 + 末端放 temp(shift-and-hold);轉換時**改用 gapped 相鄰交換**(`swap a[j], a[j-gap]` while `a[j-gap] > a[j]`)保每幀置換。'pivot'/'comparing'/'swapping'。
  - **heap**(`heapify` + extract):就地交換(root↔largest、root↔last);用 **`'active'`** 標參與格;extract 後尾端標 'sorted'。就地 → 每幀置換。
- attach 錨點(sort.js):quick 351、merge 352、shell 353、heap 357(皆 `{ render: renderSortBars, code, layout: null }`)。
- METHODS(js/app.js 161-166):quick/merge/shell/heap `visualizer:'sort', controls:'sort'`,皆無 codeDrawer;cpp `sort_quick.cpp`/`sort_merge.cpp`/`sort_shell.cpp`/`sort_heap.cpp`。
- updateLayout:Batch 1 已於 catch-all `else if (currentMode.includes('sort-'))` 之前加了 bubble/select/insert 三個 code-panel 分支;本批於同處再加 quick/merge/shell/heap 四個。
- CSS:`.sort-bar.comparing/.swapping/.sorted/.pivot` 存在;**`.sort-bar.active` 不存在**(heap 用 'active')→ 需新增。
- `index.html`:`js/viz/viz_sort_frames.js` 已載入(不改)。

## 2. 設計

### 2.1 `viz_sort_frames.js` 新增 4 產生器(比照既有樣式)

- 皆 `xFrames(input) → [{array, hi, message:{zh,en}}]`;首幀初始、末幀全 `'sorted'`;`hi` class ∈ `{'', comparing, swapping, sorted, pivot, active}`(新增 `active`);純函式。
- **`quickFrames(input)`**:以顯式 stack(或遞迴)攤平 `qsHelper`/`qsPartition`;pivot=high 標 'pivot';掃描 j 標 'comparing';`a[j]<pivot` 時 `swap(a[i],a[j])` 標 'swapping';末將 `swap(a[i+1],a[high])`;`i+1` 標 'sorted';單元素分割標 'sorted'。就地交換 → 每幀置換。訊息如「選 pivot=a[high]」/「比較 a[j] 與 pivot」/「交換」/「pivot 定位於 k」。
- **`mergeFrames(input)`**:遞迴 `msHelper`/`msMerge`;merge 時建 `L`/`R`,逐次比較(標 'comparing')並寫回 `a[k]`,寫入格標 'sorted'。**不保證每幀置換**(輔助覆寫);末幀全 'sorted' 且為置換。訊息如「合併 [l,m] 與 [m+1,r]」/「取較小者寫入 a[k]」。
- **`shellFrames(input)`**:gap = n/2,/2,…,1;每 gap 對每 i 做 gapped 相鄰交換(`while j>=gap && a[j-gap]>a[j]: 比較(標 comparing)→ swap(a[j],a[j-gap])(標 swapping)→ j-=gap`)。就地交換 → 每幀置換。訊息含 gap。
- **`heapFrames(input)`**:build max-heap(`for i=n/2-1..0: siftDown(i,n)`)+ extract(`for i=n-1..1: swap(a[0],a[i]); mark i sorted; siftDown(0,i)`);siftDown 比較子節點(標 'comparing' 或 'active')、交換('active'/'swapping')。就地交換 → 每幀置換。訊息如「建堆」/「上浮/下沉」/「取出最大到位置 i」。
- `api` 加 `quickFrames/mergeFrames/shellFrames/heapFrames`。

### 2.2 sort.js 接線(4 個)

- `FRAMES`(line 7)加:`'sort-quick': (a)=>global.SortFrames.quickFrames(a)`、`'sort-merge': …mergeFrames`、`'sort-shell': …shellFrames`、`'sort-heap': …heapFrames`。
- attach(351/352/353/357)四個改為 `{ render: () => renderSort('sort-X'), code: () => codeSortX, layout: { host: 'dynamic' } }`(bubble/select/insert 已是此形式)。legacy `run*Sort`/`renderSortBars`/`init`/`dom` 不動(供剩餘 4 個 legacy 排序;Batch 3 移)。

### 2.3 app.js 接線(4 個)

- METHODS(161-166):quick/merge/shell/heap 四列加 `codeDrawer: true`。
- updateLayout:於 `else if (currentMode.includes('sort-'))` catch-all 之前(Batch 1 的 bubble/select/insert 分支旁)加四個 code-panel-only 分支:
  `else if (currentMode === 'sort-quick') { codeTitle.textContent='sort_quick.cpp'; codeDisplay.textContent=codeSortQuick; }`(merge/shell/heap 同,檔名 `sort_merge.cpp`/`sort_shell.cpp`/`sort_heap.cpp`,變數 `codeSortMerge`/`codeSortShell`/`codeSortHeap`)。

### 2.4 CSS(style.css)

- 新增 `.sort-bar.active { background: #a78bfa; }`(或與既有 pivot 區隔的色,如 `#818cf8`;heap 的 'active' 表當前參與節點)。其餘 bar 樣式沿用。

## 3. 檔案清單

- 修改:`js/viz/viz_sort_frames.js`(+4 產生器 + api)、`js/domains/sort.js`(FRAMES +4;4 attach 切 renderSort)、`js/app.js`(4 METHODS +codeDrawer;updateLayout +4 分支)、`style.css`(`.sort-bar.active`)。
- 新增:E2E 併入既有 `tests/sort_steplog.spec.js`(擴充 4 個)或新增 `tests/sort_steplog_batch2.spec.js`;單元併入 `tests/unit/sort_frames.test.js`。
- 不動(Batch 2):Batch-1 viz、剩餘 legacy 排序(bucket/count/radix/shaker)、external/polyphase、`renderSort`/examples/`esc()`、`js/cloud-config.js`、`js/code_db.js`、`index.html`、計數框架。

## 4. 測試

- **單元(`tests/unit/sort_frames.test.js` 擴充)**:對 quick/merge/shell/heap 四產生器,於數組(SORT_DEFAULT + 反序 + 已排序 + 重複 + 單元素 + 全相等):
  - 末幀 `array` 升冪;末幀 `array` 為輸入置換;frames 非空;每幀 `message.{zh,en}` 非空;`hi` class ∈ 允許集合(含 'active')。
  - **每幀置換**:僅 quick/shell/heap 斷言(以 per-generator 旗標);**merge 不斷言每幀置換**(僅末幀)。
- **E2E(`tests/sort_steplog.spec.js` 擴充,共用既有 harness)**,對 `sort-quick`/`sort-merge`/`sort-shell`/`sort-heap`:
  - 載入 → `[data-testid="sortviz-input"]`、`.ex-select`、`.viz-workbench`、`[data-testid="viz-steplog"]`、`.stepctl` 可見;`.sortviz-stage .sort-bar` 數 == 輸入長度;`.viz-logrow` 數 == scrubber max+1;初始第 0 列 `.on`;逐步高亮。
  - scrub 到末幀 → 全 `.sort-bar.sorted`、高度升冪。
  - code drawer:`[data-testid="code-drawer"] .code-panel-filename` 含 `sort_quick.cpp`/`sort_merge.cpp`/`sort_shell.cpp`/`sort_heap.cpp`。
  - legacy `#sort-container` 對這 4 個不可見(改用 dynamic host)。
- **回歸**:Batch-1 三個 + 剩餘 legacy 4 個(抽查 `sort-radix` 仍 legacy 顯示 `#sort-container`)不受影響;既有 sort E2E 續綠。
- **計數**:tiles==methodCount、categories 不變。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- quick/merge/shell/heap 以觀測台模型呈現(輸入 + examples、VCR、步驟欄、抽屜、末幀全排序);不再顯示 legacy `#sort-container`。
- 4 產生器正確(末幀升冪 + 輸入置換);quick/shell/heap 每幀置換;merge 末幀置換(中間幀為標準合併寫入視覺,刻意不保證置換)。
- 重用 Batch-1 infra 未改;剩餘 legacy 4 個仍運作;計數自洽;E2E + 全套綠。

## 6. 風險與緩解

- **merge 每幀非置換**:刻意(標準合併長條動畫寫回中會暫現重複值);單元測試以 per-generator 旗標豁免 merge 之每幀置換,仍守末幀升冪 + 末幀置換;E2E 只驗末幀(全 sorted、升冪),不受影響。
- **shell shift-and-hold 陷阱**:改用 gapped 相鄰交換(比照 insertion 修正),保每幀置換;單元每幀置換守住。
- **quick 遞迴深度**:用顯式 stack 或遞迴輔助 push 進 frames;n≤20,無深度問題;末幀升冪 + 置換守住。
- **heap 'active' class**:新增 `.sort-bar.active` CSS;允許集合加 'active';E2E scrub 末幀驗全 sorted。
- **legacy 共存**:只切 4 個;剩餘 4 個 + external/polyphase legacy 不動;E2E 抽查 legacy 仍顯示 `#sort-container`。
- **paint 已 stage-only、esc() 已備**(Batch 1);本批不改 infra,無 detached-paint/XSS 新風險。
