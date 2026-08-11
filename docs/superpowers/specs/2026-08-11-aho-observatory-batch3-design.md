# Search viz 觀測台化 Batch 3/3 設計文件(Aho-Corasick)

- 日期:2026-08-11
- Repo:`/Users/skhuang/course/dsvisual`(main @ c23f1d3,branch `feat/aho-observatory-batch3`)
- 動機:收尾搜尋觀測台化——將 Aho-Corasick(`search-aho`)轉為觀測台:VCR 控制、可點步驟欄、隱藏原始碼(code drawer)、example input(patterns + text)、全螢幕放大且維持 VCR 可操作。

## 0. 範圍與決策

- **Batch 3 = `search-aho`**(最後一個搜尋方法)。重用 `buildStepWorkbench` + code drawer + `.viz-*` 全螢幕 CSS + `ExamplesStore` + `esc()`。
- **動態化(核心工作)**:現況 trie/失敗連結/掃描/座標**全部硬編碼**(patterns {he,she,his,hers}、text 'ushers')。要支援 example input 必須**動態**由任意 patterns + text:建 trie(goto)、BFS 計算失敗連結、掃描配對、並計算節點 (x,y) 版面。
- **frame 模型**:產生器 `ahoFrames(patterns, text)` 回 `{ nodes, failSteps, output, text, frames }`;`frames` = build 階段(F+1 幀,F=非根節點數)+ scan 階段(T 幀,T=text 長度),每幀 `{ phase:'fail'|'scan', builtCount, buildCur, scanIdx, curNode, matches, message:{zh,en} }`(每幀完整預算顯示狀態,paint 不需累積重算)。paint 以 closure 取用 `nodes/failSteps/output/text`(SVG trie 呈現,非對齊列)。
- **example input = patterns + text**:輸入列兩欄(patterns CSV + text)+ Build + 🎲 + examples select;`ExamplesStore` 格式 `he,she,his,hers | ushers`;`RandomInput` 新增 `'aho'` case 回 `{ patterns:string[], text:string }`(text 偶爾含 pattern)。預設 patterns `['he','she','his','hers']`、text `'ushers'`。
- **保留 DOM hooks**(既有測試/樣式依賴):`.aho-svg circle`、`[data-testid="aho-phase"]`、`[data-testid="aho-stats"]`、`.aho-matches`、`.aho-char`/`.aho-char-cur`、`.aho-textrow`。
- **隱藏原始碼**:`search-aho` METHODS 加 `codeDrawer:true`(目前無 → 原始碼側欄常駐)。`updateLayout` 分支已 code-only,不需改。
- **全螢幕放大**:`.aho-stage` 正常給定高、`body.viz-focus .method-section-card.active` 下 `flex:1` 撐滿,SVG(width:100%,viewBox 動態)隨之放大;VCR/步驟欄由 `.viz-*` 祖先綁定(PR #203)維持可操作/可捲。
- **不動**:其他搜尋方法(Batch 1/2 已完成)、其他 domain、`buildFrameControls`/`buildStepWorkbench`、`js/cloud-config.js`、`js/code_db.js`、方法計數。

## 1. 現況(已查證)

- `js/viz/viz_aho.js`:`renderAhoCorasick()`——硬編碼 `nodes`(含 x/y)、`output`、`failSteps`(BFS 順序,{node,fail})、`text='ushers'`、`scanSteps`(每字元後的 automaton node + matches)。materialize `frames`(build:F+1、scan:T),`buildFrameControls`(僅 VCR,無步驟欄/輸入),`paint(fr,i)` 累積重算畫 SVG trie + 失敗連結(橘虛線)+ 節點(綠=cur、藍=有 output)+ text row + phase 文字 + matches。`attach('search-aho', {render, code:()=>codeSearchAho, layout:{host:'dynamic'}})`。
- app.js:METHODS 179-184(search-aho 無 codeDrawer);updateLayout 1861 分支僅設 codeTitle/codeDisplay(code-only,無 container)。index.html script 標籤 493。
- 既有測試(`tests/visualizer.spec.js` ~642-661):assert `.aho-svg circle` count=10、`[data-testid="aho-phase"]` Phase 1/2、`[data-action="step"]` click、matches `[she@1, he@2, hers@2]`。pin 舊 `buildFrameControls` `[data-action]` 契約 → 需改寫。另 743 smoke 導覽載入 search-aho。
- 觀測台範式:`js/domains/strsearch.js`(renderStrSearch + buildStepWorkbench + examples + esc)、`js/viz/viz_search_frames.js`/`viz_strsearch_frames.js`(純 dual-export 產生器)。zalgo/Batch 2 已示範「自有 SVG/grid paint + buildStepWorkbench」。

## 2. 設計

### 2.1 `js/viz/viz_aho_frames.js`(新,純函式 dual-export)

- `global.AhoFrames` + node `module.exports`;`AHO_DEFAULT_PATTERNS`/`AHO_DEFAULT_TEXT`。
- `ahoFrames(patterns, text)`:
  1. **建 trie**:root id 0;逐 pattern 插入,節點記 `{id, ch, parent, depth, children:{}, out:[]}`;pattern 結尾節點 `out.push(pattern)`。
  2. **BFS 失敗連結**:root 子節點 fail=0;深層 `fail[v]=goto(fail[u], ch)`;依 BFS 順序記 `failSteps=[{node, fail}]`(每個非根節點一筆)。
  3. **掃描**:cur=0;逐 text[k]:失敗回退 `while cur!==0 && !children[ch]: cur=fail[cur]`,再前進;沿 fail 鏈收集 `out` → matches(`pattern@start`,start=k-len+1)。記 `scanSteps=[{node, matches(累積), pos:k}]`。
  4. **版面 (x,y)**:DFS 指派葉節點連續 x、內部節點取子節點 x 平均;y=depth;縮放到 SVG 座標(spacingX/Y + margin);回傳 viewBox 尺寸。
  5. **frames**:build 幀 k=0..F(builtCount=k,buildCur=k<F?failSteps[k].node:-1)+ scan 幀 j=0..T-1(scanIdx=j,curNode=scanSteps[j].node,matches=scanSteps[j].matches);每幀 `message:{zh,en}`(build:「失敗連結 node→fail」;scan:「讀 text[k]=c → 狀態 N」+ 命中)。
  - 回 `{ nodes, failSteps, output, text, viewBox:{w,h}, frames }`。純函式;對「空 pattern、單 pattern、pattern 不出現、text 空」皆回合法結構。

### 2.2 `js/domains/aho.js`(新,取代 viz_aho.js)

- `renderAho(methodId)`(比照 renderStrSearch):dynamic host + 輸入列 `<input class="aho-patterns" data-testid="aho-patterns">`(CSV)+ `<input class="aho-text" data-testid="aho-text">` + Build + 🎲(`.rand-btn`)+ examples select;注入文字經 `esc()`;`ExamplesStore` 格式 `patterns | text`;`parseAho` 解析。
- `const A = AhoFrames.ahoFrames(patterns, text)`;`.aho-stage` 容器;`paint(f)` closure 取 A,畫 `<svg class="aho-svg" viewBox="0 0 A.viewBox.w A.viewBox.h">`(tree edges + build 到 `f.builtCount` 的 fail 虛線 + 節點高亮 `f.curNode`/`f.buildCur` + output 著色)+ `.aho-textrow`(`.aho-char`,highlight `f.scanIdx`)+ `[data-testid="aho-phase"]` + `[data-testid="aho-stats"]`/`.aho-matches`。
- `buildStepWorkbench({ stage, frames:A.frames, paint, getMessage:f=>langOf(f.message), runIntervalMs:500 })`。
- attach `search-aho` `{ render:()=>renderAho('search-aho'), code:()=>codeSearchAho, layout:{host:'dynamic'} }`;`C().registerDomain({ id:'aho' })`。

### 2.3 全螢幕 + CSS + 接線

- CSS:`.aho-stage { width:100%; min-height:220px; display:flex; flex-direction:column; gap:10px; overflow:auto }`;`body.viz-focus .method-section-card.active .aho-stage { flex:1 1 auto; min-height:0 }`;SVG `width:100%` 隨 stage 放大。保留既有 `.aho-*` 類別樣式。
- app.js:`search-aho` METHODS 加 `codeDrawer:true`;updateLayout 不變。
- index.html:載入 `viz_aho_frames.js` + `domains/aho.js`(frames 先),移除 `viz_aho.js` script;`git rm js/viz/viz_aho.js`。
- RandomInput:`case 'aho': return { patterns:[...], text }`。

## 3. 檔案清單

- 新增:`js/viz/viz_aho_frames.js`、`js/domains/aho.js`、`tests/unit/aho_frames.test.js`、`tests/aho_steplog.spec.js`。
- 修改:`js/app.js`(codeDrawer)、`index.html`(scripts)、`style.css`(`.aho-stage` + 全螢幕)、`js/random_input.js`(`'aho'`)、`tests/visualizer.spec.js`(改寫 aho 區塊)。
- 移除:`js/viz/viz_aho.js`。
- 不動:其他 domain、`js/cloud-config.js`、`js/code_db.js`、計數。

## 4. 測試

- **單元(aho_frames.test.js)**:多組 patterns/text(經典 {he,she,his,hers}/'ushers'、單 pattern、不命中、重疊、text 空):frames 非空、每幀雙語 message;**命中集正確**——末 scan 幀 matches(去 `@pos` 後的 (pattern,start) 集)== naive 多樣式搜尋(每 pattern 於 text 全部出現位置);節點數 == trie 應有節點數;failSteps 長度 == 非根節點數;版面 x/y 為有限數。純函式不改輸入。
- **E2E(aho_steplog.spec.js)**:patterns+text 輸入/examples/workbench/步驟欄/VCR/抽屜檔名(`search_aho.cpp`)/`.aho-svg circle` 數==節點數/`[data-testid="aho-phase"]` 顯示 Phase 1→2/scrub 末幀 `.aho-char-cur` 在最後字元且 `[data-testid="aho-stats"]` 列出全部命中;🎲 重建;**全螢幕**:進 focus → SVG 明顯放大、transport 可操作、步驟欄可捲(PR #203)。
- **回歸**:改寫 `tests/visualizer.spec.js` aho 區塊為觀測台(去 `[data-action="step"]`/固定 10 circle 硬編碼,改斷言動態);切換各模式不拋錯;其他搜尋/domain 不受影響。
- **random_input**:`'aho'` case 合法。
- **計數**:tiles==methodCount。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- Aho-Corasick 以觀測台呈現:VCR、可點步驟欄、隱藏原始碼(抽屜)、example input(patterns+text,動態建 trie/失敗連結/掃描/版面)、全螢幕 SVG 放大且 VCR/步驟欄可操作可捲。
- 命中集與 naive 多樣式搜尋一致(單元守正確性);兩階段(build/scan)敘述於步驟欄。
- 舊硬編碼 viz 移除、無殘留/報錯;其他方法與 domain 不受影響;E2E + 全套綠。
- **搜尋觀測台化三批全部完成**(數值 + 字串 + Aho-Corasick)。

## 6. 風險與緩解

- **動態 trie/失敗連結/掃描正確性**(最大風險):由硬編碼改為通用演算法易出錯 → 單元以「命中集 == naive 多樣式搜尋」+ failSteps 長度 + 節點數 守正確性;經典 {he,she,his,hers}/'ushers' 個案對照舊硬編碼結果(matches she@1/he@2/hers@2)。
- **版面 (x,y) 疊圖**:簡單 DFS 葉節點展開 + 內部取平均,足以避免大量重疊;版面僅為呈現,不影響正確性(不 assert 精確座標,只 assert 有限數)。
- **舊測試契約**:`tests/visualizer.spec.js` aho 區塊 pin `[data-action=step]`/10 circles → 改寫為觀測台動態斷言(circle 數 == 節點數、phase、scrub 末幀命中),不弱化。smoke 導覽確認仍可載入。
- **全螢幕 SVG 放大需定高父容器**:`.aho-stage` 給定高、全螢幕 `flex:1`(PR #203)+ SVG width:100% → 放大生效;E2E 驗正常與全螢幕尺寸。
- **RandomInput 'aho'**:新增 case,text 偶爾含 pattern 以利展示;不弱化既有 case。
