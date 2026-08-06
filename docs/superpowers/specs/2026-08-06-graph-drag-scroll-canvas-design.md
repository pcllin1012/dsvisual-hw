# 拖曳可超出視窗、viz 可捲動(graph drag scrollable canvas)設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ 79f8871,branch `feat/graph-drag-scroll-canvas`)
- 動機:拖曳節點時可把節點拉出目前 `0 0 600 400` 視框而被裁切/看不到。改為:被拖出的節點所在區域讓繪圖視窗**可捲動**(viewBox 動態成長 + SVG 寬度百分比 > 100% 觸發 `.gw-stage` 既有 `overflow:auto`),節點不再遺失、可捲動抵達。

## 0. 範圍與決策(已與使用者確認)

- **可捲動的較大畫布**(非夾住在視框內):被拖到基準 600×400 外的節點所在區域,`.gw-stage` 出現捲軸可捲動抵達;on-screen 比例**維持不變**(節點不縮小),只是畫布延伸。
- 適用:全部 node-link 圖(8 個 VCR `renderGraphVcr` + 結構 `renderGraphStruct` graph/adjlist/multilist + 雙畫布 `renderGraphTraversal`)。
- **`forceStep` 不改**:被拖節點在 `pinned`(fixed)集合中,`forceStep` 本就跳過它(不夾);未拖曳節點仍夾在基準 600×400。故畫布只在**你拖出去的節點**處延伸,成長有界、乾淨。
- 自我校正:`fitCanvas` 每次重繪都依當前所有節點重算邊界,節點被拖回內部時畫布隨之縮回。
- 不動:`js/cloud-config.js`、`js/code_db.js`、`buildFrameControls`、`layout()`、`forceStep`、方法計數框架、frame 產生器。

## 1. 現況(已查證)

- `.gw-stage { display:flex; justify-content:center; overflow:auto }`(style.css:424)——已可捲動,但…
- `.gw-svg { max-width:100%; height:auto }`(425)——SVG 永遠縮到 stage 寬度,故從不溢出、捲軸永不出現;viewBox 固定寫在 HTML `viewBox="0 0 600 400"`,超出座標的節點被 SVG 視框裁切。
- `NodeDrag.screenToViewBox`(js/viz/viz_graph_drag.js:7-11):以 `getBoundingClientRect` 比例硬寫映射到 `600 / 400`。拖曳時 `pinned`(fixed)的被拖節點在 `onMove` 直接設為指標座標(**無夾**)→ 可超出 600×400。`forceStep`(GW)對未拖曳節點夾在 `[pad,580]×[pad,380]`,對 fixed 節點整個跳過(不動、不夾)。
- 全螢幕 focus:`body.viz-focus … .gw-stage { flex:1 1 auto; min-height:0 }`(3415)+ `.gw-svg { max-height:100% }`(3416);transport 位於 `.gw-stagecol` 內、`.gw-stage` **之外**。

## 2. 設計

### 2.1 `fitCanvas(svg, pos, n)`(js/viz/viz_graph_drag.js,匯出於 `api`)

- 計算所有節點座標的邊界(含 padding `P=30`),與基準 `0 0 600 400` 取聯集(原點可為負,支援向左/上拖):
  - `minX = min(0, min_i(pos[i].x)-P)`;`minY = min(0, min_i(pos[i].y)-P)`
  - `maxX = max(600, max_i(pos[i].x)+P)`;`maxY = max(400, max_i(pos[i].y)+P)`
  - `vbW = maxX-minX`;`vbH = maxY-minY`
- `svg.setAttribute('viewBox', minX+' '+minY+' '+vbW+' '+vbH)`。
- `svg.style.width = (vbW/600*100) + '%'`;**不設 inline height**(靠 CSS `height:auto` + viewBox 比例)。
- **為何用百分比寬**:基準 `vbW=600` → `width:100%` → 恰好填滿 stage(維持現行、完全 RWD、免 resize 監聽);成長時 `vbW=900` → `width:150%` → SVG 超出 stage → `.gw-stage overflow:auto` 出現捲軸。`height:auto` + viewBox 保持**均勻且固定的螢幕比例** `stageWidth/600`(節點不縮小,只是畫布延伸)。
- 純 DOM 屬性/樣式設定,無 RNG、無 `Date`。加入 `api = { attach, fitCanvas }`。

### 2.2 `screenToViewBox` 改讀 live viewBox(js/viz/viz_graph_drag.js:7-11)

```
function screenToViewBox(svg, cx, cy) {
  var r = svg.getBoundingClientRect();
  var w = r.width || 1, h = r.height || 1;
  var vb = (svg.viewBox && svg.viewBox.baseVal) ? svg.viewBox.baseVal : { x:0, y:0, width:600, height:400 };
  return { x: vb.x + (cx - r.left) / w * vb.width, y: vb.y + (cy - r.top) / h * vb.height };
}
```
viewBox 成長/位移後映射仍正確;`getBoundingClientRect` 已含捲動位置與祖先 CSS 縮放。

### 2.3 初始套用 + 每次重繪套用

- `NodeDrag.attach` 尾端對每個 `svg` 呼叫一次 `fitCanvas(svg, pos, n)`(初始一致化;涵蓋 struct 這種初始不經 redraw 的路徑)。
- 三個繪圖路徑於重繪後呼叫 `fitCanvas`(見 §2.4)。

### 2.4 三路徑接線(js/domains/graph.js)

- **VCR `renderGraphVcr`**:`draw(f)` 尾端(`svg.innerHTML = s; descEl.textContent=...` 之後)加 `NodeDrag.fitCanvas(svg, pos, parsed.n)`。(逐幀/拖曳/重新安置都會 refit;pos 不變時 viewBox 不變,無副作用。)
- **結構 `renderGraphStruct`**:其 `NodeDrag.attach` 的 `redraw` 由 `() => { svg.innerHTML = drawUndirectedGraph(parsed, pos, null, dir); }` 改為結尾追加 `NodeDrag.fitCanvas(svg, pos, parsed.n);`。
- **雙畫布 `renderGraphTraversal`**:`paint` 尾端對兩個 svg 各呼叫 `NodeDrag.fitCanvas(svgBfs, pos, parsed.n)`、`NodeDrag.fitCanvas(svgDfs, pos, parsed.n)`(共用同一 `pos` → 兩畫布一致延伸/捲動)。

### 2.5 CSS(style.css)

- `.gw-svg { max-width: none; height: auto; }`(425;把 `max-width:100%` 改 `none`,否則 100% 上限會壓掉溢出、捲軸永不出現;寬度改由 inline `width:%` 驅動)。基準時 inline `width:100%` = 與現行同,視覺不變。
- 全螢幕:`body.viz-focus .method-section-card.active .gw-svg { max-height: none; }`(取代 3416 的 `max-height:100%`)。transport 在 `.gw-stage` 之外,`.gw-stage`(flex:1、min-height:0、overflow:auto)內部捲動高的 SVG,transport 仍在視窗內可操作。
- (可選)溢出時捲動起點:`.gw-stage` 維持 `justify-content:center`;內容比容器寬時可能置中裁切,使用者可捲動抵達——列為可接受行為(見風險)。

## 3. 檔案清單

- 修改:
  - `js/viz/viz_graph_drag.js`(新增 `fitCanvas` + 匯出;`screenToViewBox` 改讀 live viewBox;`attach` 尾端初始 fit)。
  - `js/domains/graph.js`(三路徑重繪後呼叫 `fitCanvas`)。
  - `style.css`(`.gw-svg` max-width:none;全螢幕 gw-svg max-height:none)。
  - `tests/graph_drag.spec.js`(新增可捲動畫布 E2E)。
- 不動:`js/cloud-config.js`、`js/code_db.js`、`buildFrameControls`、`layout()`、`forceStep`、frame 產生器、計數框架、`tests/random_push.spec.js`。

## 4. 測試

- **E2E(`tests/graph_drag.spec.js`,沿用 `loadMethod`/`stableBox`/`dragNode`)**:
  - **基準無成長**:載入 `graph-bfs`(未拖曳),`svg.getAttribute('viewBox')` 為 `0 0 600 400`,`svg.style.width` 為 `100%`,`.gw-stage` 無水平溢出(`scrollWidth <= clientWidth + 1`)。
  - **拖出 → 成長 + 可捲動**:把節點 0 拖到遠超右下(大 dx/dy,終點在視窗內但映射到 viewBox 遠處),`stableBox` 等模擬冷卻後:viewBox 的 `width` > 600(成長);`.gw-svg` inline `width` 解析 > 100%;`.gw-stage.scrollWidth > .gw-stage.clientWidth`(可水平捲動)。
  - **節點可達/不遺失**:被拖節點 `data-node="0"` 仍存在於 DOM 且 `cx` 反映放開位置(位於延伸區,可能 > 600)。
  - **映射正確**:成長後在節點上再起一次小拖曳,`closest('[data-node]')` 仍命中該節點(live viewBox 映射正確)——以「小幅拖曳後該節點 cx 有變化」驗證。
  - **拖回縮回**:把外拉的節點再拖回中央,`stableBox` 後 viewBox 回到接近 `0 0 600 400`、`.gw-stage` 不再水平溢出(自我校正)。
  - **結構/雙畫布**:`graph` 拖出可捲動;`graph-traversal` 於一畫布拖出,兩畫布 viewBox 一致成長。
  - **全螢幕**:`graph-bfs` 進 focus、拖出節點後,transport(`.stepctl`)bounding box 仍在視窗內,`.gw-stage` 可捲動。
  - 無 console error;既有拖曳/重新安置/持久/雙語/step-log/fullscreen 測試不回歸。
- **計數**:tiles==methodCount、categories 不變。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- 拖曳節點超出基準視框時不再被裁切遺失;`.gw-stage` 出現捲軸可捲動抵達;節點螢幕比例維持不變。
- 未拖出時 viewBox 與外觀與現行一致(無回歸);節點拖回後畫布自我縮回。
- 全部三路徑(含雙畫布同步、全螢幕)一致;`forceStep`/`layout()`/`buildFrameControls`/`cloud-config`/`code_db` 未動;計數自洽;E2E 全綠。

## 6. 風險與緩解

- **`max-width:100%` → `none` 影響非拖曳情境**:`.gw-svg` 皆為 graph node-link;基準 inline `width:100%` 與現行等價,視覺不變(E2E 基準案例守住)。
- **全螢幕移除 `max-height:100%`**:transport 在 `.gw-stage` 外,stage 內部捲動;既有 fullscreen 測試(transport 在視窗內、log 可捲)須續綠——E2E 明確驗證。
- **溢出時置中裁切**:`justify-content:center` 下內容比容器寬會置中,起點可能被裁,使用者可捲動抵達;列為可接受;若體驗不佳,plan 可改為溢出時 `justify-content:flex-start`(留待實作觀察,不預先加複雜度)。
- **每幀 refit 造成 jank**:`fitCanvas` 為 n≤12 的常數級計算 + 兩個屬性設定;每幀成本可忽略。
- **live viewBox 映射**:`screenToViewBox` 改讀 `svg.viewBox.baseVal`,含負原點與捲動;E2E 以「成長後仍能命中節點」守住。
- **雙畫布兩個獨立捲動容器**:各自 `fitCanvas` 同一 `pos` → 一致成長,但為兩個捲軸;可接受(共用 pos 保證座標一致)。
