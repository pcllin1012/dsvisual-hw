# 可拖拉節點 + 拖曳後重新佈局(graph draggable + re-settle)設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ bc53ac7,branch `feat/graph-draggable-layout`)
- 動機:讓所有 node-link 圖視覺化的節點可用滑鼠/觸控**拖拉**;放開後周圍節點以**短暫力導模擬**重新安置(hybrid),讓圖「活起來」,同時保留既有經過最佳化的低交叉初始佈局。

## 0. 範圍與決策(已與使用者確認)

- **互動模型 = Hybrid**:初始佈局仍用既有 `layout()`(低交叉,不變)。拖拉某節點時它跟隨指標(釘住);同時跑一段**衰減**的力導模擬讓其餘節點重新安置,冷卻後**凍結**。**放開的節點停留在放開位置**(成為固定錨點),鄰居繞著它重新整理。
- **適用範圍 = 全部 node-link 圖視覺化**:
  - 8 個 VCR 方法(`renderGraphVcr`:bfs/dfs/dijkstra/kruskal/prim/boruvka/topo/bellman-ford)。
  - 結構檢視(`renderGraphStruct`:graph/graph-adjlist/graph-multilist)。
  - 雙畫布(`renderGraphTraversal`:graph-traversal)。
- **不動**:`layout()` 演算法(維持低交叉初始佈局)、frame 產生器、labels/token 模型、`buildFrameControls`、方法計數、`js/cloud-config.js`、`js/code_db.js`。
- **不做**(YAGNI):重設佈局按鈕(換輸入 / 重新載入方法會呼叫 `rebuild()` → 重新 `layout()`,即為重設路徑);持久化拖曳位置;第三方物理庫(維持 vanilla、無 build step)。

## 1. 現況(已查證)

- 三個繪圖路徑皆先 `const pos = GraphWorkbench.layout(parsed.n, 300, 200, 150, parsed.edges)`(一次性),再以 `pos[k].x/y` 繪 SVG:
  - `renderGraphVcr`(graph.js ~200):`draw(f)` 每幀重建 `svg.innerHTML`,節點為 `'<circle class="'+cls+'" cx="'+pos[k].x+'" cy="'+pos[k].y+'" r="18"></circle>'`(~242),另有 `<text class="graph-node-label">`、`graph-weight`、`graph-distance`。
  - `renderGraphStruct`(graph.js ~356):`svg.innerHTML = drawUndirectedGraph(parsed, pos, null, dir)`(一次;~394)。
  - `renderGraphTraversal`(graph.js ~464):兩個 svg 共用同一 `pos`;`svgBfs.innerHTML = drawUndirectedGraph(...)`、`svgDfs.innerHTML = drawUndirectedGraph(...)`(~483-484)。
- `drawUndirectedGraph`(graph.js 117-149):節點 `'<circle class="'+cls+'" cx="'+pos[k].x+'" cy="'+pos[k].y+'" r="18"></circle>'`(145)+ `<text class="graph-node-label">`(146)。
- 物理模型(在 `layout()` 的 `fr(seed)` 內,viz_graph_workbench.js 105-166):`W=600,H=400`,`k = Math.sqrt((W*H)/n)*0.8`;每次迭代 = 全對排斥 `f=k²/d` + 邊吸引 `af=d²/k`,再以溫度 `t` 限制步長 `min(|disp|,t)`;`layout()` 尾端 `fitToBox` 收斂到 `(cx±r, cy±r)`。
- SVG 為 `viewBox="0 0 600 400"`;`.gw-svg { max-width:100%; height:auto }` → 呈現框維持 600:400 比例(無 letterbox)。app 另有縮放控制(對祖先元素施加 CSS transform)。

## 2. 設計

### 2.1 純物理步進 `forceStep(pos, edges, n, opts)`(viz_graph_workbench.js,加入 `api` 物件)

> 匯出:加到檔尾 `var api = { ... }` 物件中(該物件同時 `module.exports = api` 與 `global.GraphWorkbench = api`),故 `GraphWorkbench.forceStep` 於瀏覽器與 node 單元測試皆可用。

- 對既有 `fr()` 內單次迭代抽出成可重用、純函式的一步:
  - `opts`:`{ k, temp, fixed, bounds }`。`k` 預設 `Math.sqrt((600*400)/n)*0.8`;`temp` 預設 `600/12`;`fixed` 為節點索引的 `Set`(或含 `has()` 的物件),其位置本步**不動**;`bounds` 預設 `{ w:600, h:400, pad:20 }`。
  - 計算 disp:全對排斥(`k²/d`)+ 邊吸引(`d²/k`),與 `fr()` 完全相同的公式。
  - 對**非** fixed 節點:`pos[i] += (disp[i]/|disp[i]|) * min(|disp[i]|, temp)`;再夾到 `[pad, w-pad] × [pad, h-pad]`。fixed 節點略過(位置不變)。
  - 就地改 `pos` 並回傳 `pos`。純函式、不碰 DOM、無 RNG、無 `Date`/`Math.random`。
- `layout()` 內部**可選擇性**改呼叫 `forceStep`(DRY),但**不改變其輸出行為**;若重構有風險則 `layout()` 維持原樣、`forceStep` 為獨立實作(以單元測試確保與 `fr()` 迭代公式一致)。**決策:本次 `forceStep` 為獨立新函式,`layout()` 完全不動**,避免動到低交叉佈局的既有行為;僅共享常數語義。

### 2.2 拖曳控制器 `NodeDrag.attach(cfg)`(js/viz/viz_graph_drag.js,新檔)

> 模組樣式比照 `viz_graph_workbench.js`:IIFE、`var api = { attach: attach }`、`module.exports = api` + `global.NodeDrag = api`;於 `index.html` line ~534(`viz_graph_workbench.js` 之後)加 `<script src="js/viz/viz_graph_drag.js" defer></script>`。

- `cfg = { svgs, pos, edges, n, redraw }`:`svgs` 為一個或多個要綁定指標事件的 SVG 元素(陣列);`pos` 為**可變共享**位置陣列;`redraw()` 由呼叫端提供,重繪目前畫面(讀取 `pos`)。
- 內部狀態:`pinned`(Set,已被拖過而固定的節點)、`dragging`(目前拖曳的節點索引或 null)、`raf`(rAF id)、`temp`(目前模擬溫度)。
- **指標事件**(Pointer Events,滑鼠+觸控通用),綁在每個 svg 上:
  - `pointerdown`:以 `ev.target.closest('[data-node]')` 命中節點 → `dragging = k`;`pinned.add(k)`;`svg.setPointerCapture(ev.pointerId)`;`ev.preventDefault()`。未命中節點則忽略。
  - `pointermove`(拖曳中):把指標座標轉成 viewBox 座標 `pos[dragging] = screenToViewBox(svg, ev.clientX, ev.clientY)`(見下);`reheat()`(設 `temp = 600/12`、啟動 rAF 迴圈);`redraw()`。
  - `pointerup` / `pointercancel`:`dragging = null`;釋放 capture。被拖節點留在 `pinned`(停在放開位置)。
- **座標轉換 `screenToViewBox(svg, cx, cy)`**:以 `const r = svg.getBoundingClientRect()`,回傳 `{ x:(cx-r.left)/r.width*600, y:(cy-r.top)/r.height*400 }`。用呈現框比例(含任何祖先 CSS 縮放),因無 letterbox 故精確。
- **模擬迴圈**(rAF):每幀 `GraphWorkbench.forceStep(pos, edges, n, { fixed: pinned, temp })`;`temp *= 0.9`;`redraw()`;若 `temp < 0.5` 或所有 svg 皆 `!isConnected` → 停止(`cancelAnimationFrame`,`raf=null`)。拖曳中每次 `pointermove` 會 `reheat()` 續跑。
- **自清理**:rAF 迴圈以 `svgs.some(s=>s.isConnected)` 為續跑條件(比照 `buildFrameControls` 的 `isConnected` 守衛);指標監聽器綁在 svg 上,`rebuild()` 重設父層 `innerHTML` 時舊 svg 連同監聽器一併被 GC;另提供 `destroy()`(移除監聽 + `cancelAnimationFrame`)供呼叫端在重繪前主動呼叫(保險)。

### 2.3 三路徑接線

- **共同繪圖改動**:兩個繪圖點的 `<circle>` 加 `data-node="k"`。CSS 加 `.gw-svg .graph-node { cursor: grab }`、`.gw-svg .graph-node:active,.gw-svg.gw-dragging .graph-node { cursor: grabbing }`,並 `.gw-svg .graph-node-label, .gw-svg .graph-weight, .gw-svg .graph-distance { pointer-events: none }`(讓覆在節點上的文字不吃掉指標事件,`closest('[data-node]')` 才能命中圓)。
- **`renderGraphVcr`**:於 `rebuild()` 內保留 `let lastFrame = frames[0]`;`draw(f)` 首行 `lastFrame = f`。建 transport 後:
  `const drag = NodeDrag.attach({ svgs:[svg], pos, edges:parsed.edges, n:parsed.n, redraw:()=>draw(lastFrame) })`。位置持久於 VCR 逐幀與拖曳之間(`pos` 於 `draw` 之外擁有)。
- **`renderGraphStruct`**:
  `NodeDrag.attach({ svgs:[svg], pos, edges:parsed.edges, n:parsed.n, redraw:()=>{ svg.innerHTML = drawUndirectedGraph(parsed, pos, null, dir); } })`。
- **`renderGraphTraversal`**:單一控制器綁**兩個** svg、共用同一 `pos`:
  `NodeDrag.attach({ svgs:[svgBfs, svgDfs], pos, edges:parsed.edges, n:parsed.n, redraw:()=>{ svgBfs.innerHTML = drawUndirectedGraph(parsed,pos,fb,dir); svgDfs.innerHTML = drawUndirectedGraph(parsed,pos,fd,dir); } })`(`fb`/`fd` 取目前兩幀,比照現有 traversal 重繪來源)。在任一畫布拖曳都會同步移動兩畫布的同一節點。

## 3. 檔案清單

- 新增:`js/viz/viz_graph_drag.js`(`NodeDrag` 控制器)、`tests/graph_drag.spec.js`(E2E)。
- 修改:
  - `js/viz/viz_graph_workbench.js`(新增純 `forceStep` + 匯出)。
  - `js/domains/graph.js`(三路徑接 `NodeDrag`;`draw`/`drawUndirectedGraph` 的 `<circle>` 加 `data-node`;`renderGraphVcr` 加 `lastFrame`)。
  - `style.css`(cursor grab/grabbing + label/weight/distance `pointer-events:none`)。
  - `index.html`(引入 `js/viz/viz_graph_drag.js` script,比照 `viz_graph_workbench.js` 的載入位置)。
  - `tests/unit/graph_workbench.test.js`(`forceStep` 單元測試)。
- **不動**:`js/cloud-config.js`、`js/code_db.js`、`buildFrameControls`、`layout()`、`tests/random_push.spec.js`、計數框架。

## 4. 測試

- **單元(`forceStep`,`tests/unit/graph_workbench.test.js`)**:
  - fixed 不動:節點 0 置於 (100,100) 且 `fixed={0}`,跑 10 步後 `pos[0]` 仍為 (100,100)。
  - 界內:任意起始跑 20 步後,所有節點 `pad ≤ x ≤ 600-pad`、`pad ≤ y ≤ 400-pad`。
  - 收斂/有效:偏離平衡的自由節點單步後位移 > 0;簡單圖跑 50 步後總邊長有限、最小兩兩距離 > 0(不重疊、不發散)。
  - 決定性:同輸入兩次結果相同(無 RNG)。
- **E2E(`tests/graph_drag.spec.js`,共用 `loadMethod`)**:
  - `graph-bfs`:`.gw-svg .graph-node[data-node="0"]` 存在;以 Playwright 指標從節點中心 `mouse.down` → 移到新螢幕點 → `mouse.up`,該節點的螢幕 bounding box 中心移動到放開點附近(容差內)。
  - 重新安置:拖曳後,輪詢確認**另一**節點的 `cx/cy` 有變化(rAF 模擬確實跑動;給足等待)。
  - VCR 持久:拖曳後點一次 `.stepctl [data-action="step"]`,被拖節點 `cx` 不變(位置持久)。
  - `graph`(結構檢視):節點可拖曳、重繪不崩。
  - `graph-traversal`:於第一畫布拖節點 0,第二畫布的 `[data-node="0"]` 移到相符座標(共用 `pos`)。
  - 無 console error;fullscreen 下仍可拖曳(不破版)。
- **計數**:overview tiles==methodCount、categories 不變(未增減方法)。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- 全部 node-link 圖(8 VCR + 結構 3 + traversal)節點可用滑鼠/觸控拖拉;放開後鄰居以短暫力導重新安置再凍結;放開的節點停在放開位置。
- 初始佈局仍為既有低交叉 `layout()`;拖曳位置持久於 VCR 逐幀;traversal 兩畫布同步。
- 其他方法/版面不受影響;計數自洽;`js/cloud-config.js`/`js/code_db.js` 未動;單元 + E2E 全綠。

## 6. 風險與緩解

- **座標映射受 CSS 縮放影響**:改用 `getBoundingClientRect()` 呈現框比例映射(含祖先 CSS transform),而非 `getScreenCTM`;`.gw-svg` 維持 600:400 比例故無 letterbox 誤差。E2E 以螢幕 bounding box 驗證涵蓋此路徑。
- **VCR 重繪覆蓋拖曳**:`pos` 於 `draw` 外擁有且為可變共享;`draw`/redraw 每次讀最新 `pos`;`lastFrame` 讓 redraw 永遠畫當前幀。拖曳與逐幀通常不同時發生;即使同時,兩者都讀同一 `pos`,不衝突。
- **記憶體/監聽器洩漏**:rAF 以 `isConnected` 守衛(比照 `buildFrameControls`);監聽綁在會被 `innerHTML` 取代的 svg 上;另提供 `destroy()`。
- **文字吃掉指標**:label/weight/distance `pointer-events:none`,`closest('[data-node]')` 命中圓。
- **節點永久釘住致僵化**:符合「我擺放的就固定」直覺;換輸入/重載方法 `rebuild()` 重新 `layout()` 即重設;不另做重設鈕(YAGNI)。
- **E2E 物理時序 flaky**:確定性部分(拖後放開座標、VCR 持久)為主斷言;重新安置以輪詢 + 足夠 headroom 驗證;避免固定 sleep。
- **layout() 不動**:`forceStep` 為獨立函式,單元測試確保與 `fr()` 迭代公式一致;不重構 `layout()` 以免影響低交叉輸出。
