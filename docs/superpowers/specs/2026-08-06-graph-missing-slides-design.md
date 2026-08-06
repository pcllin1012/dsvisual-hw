# 補齊缺少的 graph 視覺化中英文 slides 設計文件

- 日期:2026-08-06
- Repo:`/Users/skhuang/course/dsvisual`(main @ 0a56606,branch 待建)
- 動機:7 個 graph 方法在 Slides 面板顯示「無投影片」(`SLIDES_RENDERED` 無對應 deck)。為它們補上與既有 graph deck 一致的**中英文雙語**投影片,採「rich + 逐步範例」深度。

## 0. 範圍與決策(已與使用者確認)

- **補齊 7 個缺 deck 的 graph 方法**(在 METHODS 但未被 `slides_rendered.js` 服務):
  `graph-multilist`、`graph-matrix`、`graph-components`、`graph-bipartite`、`graph-closure`、`graph-scc`、`graph-boruvka`。
- **深度 = rich + worked example**:每 deck ~7 張(見 §2.2)。
- **雙語**:`slides_db.js` 每個 block 的文字皆 `{ zh, en }`。
- **不動**:app 程式(openSlides 已能服務任何存在於 `SLIDES_RENDERED` 的 deck)、既有其他 deck、方法計數、演算法/viz、`js/cloud-config.js`。
- 已確認:`graph-aoe` 已有 deck(不在範圍);`graphs`(app.js:103)是分類 id 非方法;7 個 cpp 皆存在可內嵌;`npm run build:slides` 在本環境可正常執行(含 mermaid 經 `node_modules/.bin/mmdc`,已煙霧測試 119 decks 正常)。

## 1. 現況(已查證)

- 投影片來源真相 = `slides_db.js`(以 method id 為 key 的物件);`build_slides.js`(`npm run build:slides`)由它產生:
  - `js/slides_rendered.js`(`window.SLIDES_RENDERED[id] = { slides: { zh:[...], en:[...] } }`;app 服務用)
  - `slides/zh/<id>.md`、`slides/en/<id>.md`(每 deck 每語系一檔;參考/私有投影片用)
- Deck schema(`slides_db.js`):
  ```
  "<method-id>": {
    "category": "Graphs",
    "title": { "zh": ..., "en": ... },
    "slides": [ { "heading": { "zh":..., "en":... }, "blocks": [ <block>, ... ] } ]
  }
  ```
- Block 型別(`build_slides.js` `blockToHtml`/`blockToMarkdown` 支援):`paragraph{text:{zh,en}}`、`bullets{items:[{zh,en}]}`、`steps{items:[{zh,en}]}`、`table{headers:[{zh,en}],rows:[[{zh,en}]]}`、`code{lang,code,file?}`、`note{text:{zh,en}}`、`math{tex,caption?}`、`image{src,alt}`、`svg{svg}`、`mermaid{code}`。行內 `$...$` 由 KaTeX 轉譯。
- `app.js` `publicSlidesFor(methodId)`:讀 `SLIDES_RENDERED[methodId].slides[lang]`;缺項或空陣列 → 單張「無投影片」佔位(`t('slide.no-slides')`)。
- 無「每方法必須有 slides」的覆蓋測試;無 `slides_rendered.js` 對 `slides_db.js` 的 drift 守衛測試——但**仍須重新產生** `slides_rendered.js`(服務用),否則新 deck 不會出現。
- 7 個 cpp 來源(可內嵌真實碼):`cpp/graph_multilist.cpp`(42)、`graph_matrix.cpp`(62)、`graph_components.cpp`(60)、`graph_bipartite.cpp`(64)、`graph_closure.cpp`(29)、`graph_scc.cpp`(50)、`graph_boruvka.cpp`(44 行)。
- 對應 viz 預設輸入(worked example 對齊,使投影片與視覺化一致):取自 `GraphWorkbench.DEFAULTS[methodId]`(加權/有向依方法而定);Borůvka 預設 `A-B:4,B-C:1,C-D:6,D-E:2,E-A:3,A-C:5`(MST 權重 10)。

## 2. 設計

### 2.1 新增位置(slides_db.js)

- 在 `slides_db.js` 既有 graph deck 附近插入 7 個新 key(檔案內順序不影響 app 顯示順序——app 依 METHODS 排序;僅為可讀性分組):結構表示法 `graph-matrix`/`graph-multilist` 靠近 `graph-adjlist`;`graph-boruvka` 靠近 `graph-prim`;`graph-components`/`graph-bipartite`/`graph-closure`/`graph-scc` 成一組(可置於 `graph-floyd-warshall` 之後)。
- 每個 deck `category: "Graphs"`,`title:{zh,en}` 用既有 i18n 方法名的中英(如 `graph-scc` → 「強連通分量 / Strongly Connected Components」)。

### 2.2 每 deck 投影片結構(~7 張,rich + worked example)

1. **簡介**:`paragraph` —— 這是什麼 + 標題級複雜度(例:$O(V+E)$)。
2. **核心概念**:`paragraph` + `bullets` —— 關鍵不變式/資料結構/前提。
3. **運作流程**:`steps`(編號)+ `mermaid` flowchart(比照既有 graph deck 的 flowchart 風格)。
4. **示意圖**:`svg`(手繪小圖示意結構或結果)或 `mermaid`(擇一;結構表示法類用小 svg 呈現矩陣/多重表,演算法類用 mermaid/svg 呈現結果)。
5. **逐步範例**:`steps` —— 以該方法的 **viz 預設輸入**(§1)為具體小圖,逐步追蹤演算法(如 SCC 的兩次 DFS、Borůvka 每輪各分量選最小邊),讓投影片與視覺化一致。
6. **複雜度**:`table` —— 時間/空間 + 使用的資料結構(每格 `{zh,en}`)。
7. **C++**:`code{ lang:'cpp', file:'graph_X.cpp', code: <cpp/graph_X.cpp 原碼> }` —— 內嵌真實可編譯來源。

各 block 文字皆雙語;演算法內容需正確(見 §5 驗收/§6 風險的正確性把關)。

### 2.3 重新產生(生成檔,勿手改)

- 執行 `npm run build:slides` → 重新產生 `js/slides_rendered.js` 與全部 `slides/{zh,en}/*.md`。
- 提交:`slides_db.js`(手寫來源)+ `js/slides_rendered.js`(生成)+ `slides/zh/<id>.md`、`slides/en/<id>.md`(7×2=14 新檔;生成)。**不得手改生成檔**。

## 3. 檔案清單

- 修改:`slides_db.js`(+7 decks)、`js/slides_rendered.js`(生成)。
- 新增:`slides/zh/{graph-multilist,graph-matrix,graph-components,graph-bipartite,graph-closure,graph-scc,graph-boruvka}.md`、`slides/en/…`(同,共 14 檔;生成)、`tests/graph_slides.spec.js`(E2E)。
- 不動:`js/app.js`、其他 deck、`js/cloud-config.js`、`js/code_db.js`、演算法/viz、計數框架、`tests/random_push.spec.js`。

## 4. 測試

- **E2E(`tests/graph_slides.spec.js`,沿用 `loadMethod` 與既有 slides viewer 開啟方式)**:對 7 個方法各驗:
  - 開啟 Slides(點 `.method-slides-btn`)→ deck 標題/檢視器出現;投影片張數 > 1(非「無投影片」佔位);首張 heading 非空。
  - 切換語系(en/zh)各驗一次:內容非空且對應語系(例 zh 首張含中文、en 首張含英文,以「非佔位字串」+「與另一語系不同」寬鬆斷言,不硬編整句)。
  - 內含 C++ code panel(`.code-panel-filename` 含 `graph_X.cpp`)。
- **生成守衛**:`js/slides_rendered.js` 含 7 個新 key,且各自 `slides.en.length > 1`、`slides.zh.length > 1`(單元或 E2E 讀 `window.SLIDES_RENDERED`)。
- **建置**:`npm run build:slides` 無誤;`slides_db.js` 為合法 JS(require 成功);既有 `tests/unit/build_slides.test.js`、`tests/slides_viewer.spec.js` 續綠。
- 全套 `npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- 7 個 graph 方法的 Slides 面板顯示完整雙語 deck(~7 張,含逐步範例),不再是「無投影片」。
- 內容與既有 graph deck 風格/深度一致;C++ 為真實來源;worked example 對齊 viz 預設輸入。
- 生成檔由 `build:slides` 產生(未手改);其他 deck/方法/計數不變;E2E + 全套綠。

## 6. 風險與緩解

- **演算法內容正確性**:逐 deck 對照該 cpp 來源與標準定義撰寫(SCC=Kosaraju/Tarjan 兩趟、Bipartite=BFS 二著色、Closure=Warshall 位元遞移、Components=DFS/BFS 連通塊、Multilist/Matrix=表示法);worked example 以預設輸入手算對照。實作階段每 deck 內容納入 task 審查。
- **生成檔漂移**:僅改 `slides_db.js` 後**必跑** `npm run build:slides` 重生;E2E 讀 `SLIDES_RENDERED` 確保新 deck 真的被服務(而非只改來源忘了重生)。
- **mermaid 建置相依**:`mmdc` 於 `node_modules/.bin`,`build:slides` 會渲染所有 mermaid(含新圖);已煙霧測試可用;若某新 mermaid 語法錯誤會建置失敗 → 及早跑 `build:slides` 驗證。
- **雙語一致**:每 block 必含 `zh` 與 `en`;避免僅單語(E2E 對兩語系各驗非空)。
- **slides_db.js 巨大**:僅插入新 key,不動既有 key;以 method id 分組插入,避免破壞既有結構。
- **worked example 與 viz 預設不同步**:以 `GraphWorkbench.DEFAULTS` 的實際字串為準抄寫,plan 明列每個方法的預設輸入。
