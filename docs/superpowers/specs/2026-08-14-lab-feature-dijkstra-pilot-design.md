# Lab 功能設計 — 每個 viz 方法新增「實作 Lab」項目(Dijkstra 先導)

- 日期:2026-08-14
- Repos:`dsvisual`(viz + pipeline;主要改動)、`dsjudge`(private,題庫真實來源;唯讀取用)、`nycu-cs-course-ds` org(新增 public 練習 repo)
- 動機:目前每個 viz 方法有 **Slides / Source / Self-Test** 三個入口。新增第四個 **Lab(實作)** 入口,讓學生從視覺化直接進到「動手寫程式」的練習題。先以 **Dijkstra** 建立端到端範式,之後可複製到其他方法。

## 0. 範圍與決策(已與使用者確認)

- **內容真實來源 = dsjudge**:Lab 題目內容衍生自 dsjudge 既有的 `problems/dijkstra`(單一真實來源),不在 dsvisual 另寫題目。
- **每題一個 public template repo**:於 org 建立獨立命名空間的 public 練習 repo(如 `ds2026-lab-dijkstra`),與 Classroom 計分作業 repo(`ds2026-lab{N}-github-{slug}-{handle}`)區隔。
- **先導範圍 = 只有 `dijkstra`**:dsvisual 端把 `graph-dijkstra` 的 Lab 串到底 + 測試;org 端只建 **1** 個 repo。其餘方法日後複製。
- **Lab 按鈕 = inline 面板 + 連結**:比照 Slides/Self-Test 開一個 viewer,顯示題敘 + 範例,並提供「Open practice repo ↗」與停用的「Practice on dsjudge(coming soon)」。
- **dsjudge 隔離(關鍵)**:private 的 dsjudge repo **永不**成為對外連結目標;僅在 build 時本機讀取其**公開部分**。對外只有三種公開產物:(1) vendor 進 dsvisual 的公開快照、(2) public 練習 repo、(3) 未來的 dsjudge **web frontend**(非 GitHub repo)。隱藏 `tests/` 與 `ref.cpp`/`sol.cpp` 不外流。

## 1. 現況(已查證)

### 1.1 dsvisual 每方法動作列(`js/app.js`)
- `renderMethodSections()` 在 `section.innerHTML` 內產生動作按鈕(約 `js/app.js:634-644`):
  - Slides:恆顯示 `<button class="btn secondary method-slides-btn" data-method="${id}">`;點擊 → `openSlides(id)`。
  - Self-Test:`${(window.QUIZ_RENDERED && window.QUIZ_RENDERED[id]) ? '<button ... method-quiz-btn ...>' : ''}`;點擊 → `window.QuizViewer.open(id)`(約 `:665-667`)。
- Self-Test 資料管線可比照:Moodle XML → `build_quiz.js` → `js/quiz_rendered.js`(`window.QUIZ_RENDERED`),`build:quiz` 串進 `pages:prepare`;UI 在 `js/quiz.js`(`window.QuizViewer`,`#quiz-viewer` modal)。

### 1.2 dsjudge 題目格式(`../dsjudge`)
- `problems-src/<slug>/`(authoring source):`gen.py`、`meta.in.yaml`、`statement.md`、`statement.en.md`、`sol.cpp`、`wrong.cpp`。
- `problems/<slug>/`(built):`meta.yaml`、`statement.md`、`samples/NN.{in,out}`(公開)、`tests/NN.{in,out}`(隱藏、含配分)、`ref.cpp`(隱藏)。
- `problems/dijkstra/meta.yaml` 摘要:`problem_id: dijkstra`、`language: cpp`、`entrypoint: main.cpp`、`compile: g++ -O2 -std=c++17 ... -o bin/sol src/main.cpp`、`checker: diff`、`bank: { title: "Dijkstra 最短路", topic: graphs, week: 7, difficulty: 3, tags: [graph, shortest-path] }`、`tests:` 逐筆配分。
- `problems/dijkstra/statement.md`(zh)+ `statement.en.md`(en);`samples/01.{in,out}` 為公開範例。
- Classroom starter repo 內容(已存在的學生 repo):`README.md`、`statement.md`、`samples/01.{in,out}`、`src/main.cpp`;無隱藏測資/解答(計分走 dsjudge)。

## 2. 設計

### 2.1 dsvisual 內容管線(比照 slides/quiz)

**目錄與檔案**
- `labs/labs.json` — 對應表與 repo 連結:
  ```json
  {
    "graph-dijkstra": [
      { "slug": "dijkstra", "repoUrl": "https://github.com/nycu-cs-course-ds/ds2026-lab-dijkstra", "dsjudgeUrl": null }
    ]
  }
  ```
  - key = dsvisual 方法 id(`graph-dijkstra`);`slug` = dsjudge 題目 slug(`dijkstra`)。一個方法可含多題(陣列)。
- `labs/<slug>/`(vendored 公開快照,commit 進 dsvisual):`statement.md`、`statement.en.md`、`samples/NN.in`、`samples/NN.out`、`meta.json`(從 dsjudge `meta.yaml` 取公開欄位:`title`、`topic`、`week`、`difficulty`、`tags`)。**不含** `tests/`、`ref.cpp`。

**同步腳本 `sync_labs.js`(maintainer 手動執行,需 dsjudge 在 `../dsjudge`)**
- 讀 `labs/labs.json` 所列每個 `slug`,從 `../dsjudge/problems/<slug>/` 複製公開部分到 `labs/<slug>/`:`statement.md`、`statement.en.md`、`samples/*`;由 `meta.yaml` 萃取公開欄位寫成 `labs/<slug>/meta.json`。
- 明確**略過** `tests/`、`ref.cpp`、`sol.cpp`、`wrong.cpp`、`gen.py`、`meta.in.yaml`。
- dsjudge 缺席時報錯並中止(不動既有快照);快照已 commit,故一般 build 不需 dsjudge。

**建置腳本 `build_labs.js`(`build:labs`,串進 `pages:prepare`)**
- 讀 `labs/labs.json` + 各 `labs/<slug>/`,產生 `js/labs_rendered.js`:
  ```js
  window.LAB_RENDERED = {
    "graph-dijkstra": [
      { slug, titleEn, titleZh, topic, week, difficulty, tags,
        repoUrl, dsjudgeUrl,                     // dsjudgeUrl 目前為 null
        statementHtml: { en, zh },               // markdown → 消毒後 HTML
        samples: [ { in, out } ] }
    ]
  };
  ```
- 標題來源:`titleZh` 取 `statement.md` 的 H1(退而取 `meta.json.title`);`titleEn` 取 `statement.en.md` 的 H1。
- Markdown→HTML 與消毒沿用既有 quiz 的 `sanitize` 慣例(僅允許安全標籤);statement 以 fenced code 呈現 I/O。
- `js/labs_rendered.js` 為**產生檔**,不手改(與 `js/quiz_rendered.js`、`js/slides_rendered.js` 同規)。

### 2.2 viz「Lab」按鈕(`js/app.js` + 新 `js/lab.js`)

- `js/app.js` 動作列在 Self-Test 之後加入(gated):
  ```js
  ${(window.LAB_RENDERED && window.LAB_RENDERED[method.id]) ? `<button type="button" class="btn secondary method-lab-btn" data-method="${method.id}" data-testid="method-lab-btn">${t('btn.lab')}</button>` : ''}
  ```
  綁定:`const labBtn = section.querySelector('.method-lab-btn'); if (labBtn) labBtn.addEventListener('click', () => { if (window.LabViewer) window.LabViewer.open(method.id); });`
- 新增 `index.html` 內 `#lab-viewer` modal 容器(比照 `#quiz-viewer`)。
- 新 `js/lab.js` 匯出 `window.LabViewer`:
  - `open(methodId)`:讀 `LAB_RENDERED[methodId]`;若該方法多題,顯示題目清單→選題;單題直接進題目視圖。
  - 題目視圖:標題 + 難度/週次標籤 + **依語言**顯示 `statementHtml`(zh/en,沿用 `dsvisual-lang`)+ 範例 I/O(可複製)。
  - 動作:
    - **Open practice repo ↗** → `repoUrl`(新分頁)。
    - **Practice on dsjudge**:`dsjudgeUrl` 為 null 時**停用**並標「coming soon」;非 null 時啟用連出。
  - `Esc` 關閉;a11y 比照 quiz viewer(focus trap、`aria-modal`)。
- i18n(`js/i18n.js`):`btn.lab`(`Lab` / `實作`)、`lab.openRepo`(`Open practice repo` / `開啟練習 repo`)、`lab.dsjudgeSoon`(`Practice on dsjudge (coming soon)` / `到 dsjudge 練習(即將推出)`)、`lab.samples`(`Samples` / `範例`)、`lab.difficulty`、`lab.week`。

### 2.3 org public 練習 repo `ds2026-lab-dijkstra`

**由腳本 `scripts/make_lab_repo.sh`(或 `make_lab_repo.js`)從 dsjudge 公開部分產生**,內容:
- `README.md` — 練習說明(clone → 編輯 `src/main.cpp` → `make check` 對範例自測 → 未來可提交 dsjudge);中英雙語摘要 + 連回 dsvisual 該方法。
- `statement.md`、`statement.en.md` — 自 dsjudge 複製。
- `samples/01.in`、`samples/01.out` — 公開範例。
- `src/main.cpp` — starter stub(讀輸入框架 + `// TODO`)。
- `Makefile`:
  - `make build` → `g++ -O2 -std=c++17 -o bin/sol src/main.cpp`(與 dsjudge 編譯設定一致)。
  - `make check` → build 後對 `samples/*.in` 執行並 `diff` `samples/*.out`,回報 PASS/FAIL。**僅對範例**;隱藏測資留在 dsjudge。
- `.github/workflows/check.yml` — push/PR 時跑 `make check`(僅範例);內含註解標記**未來 dsjudge 提交**的整合掛點(現為 placeholder,不啟用)。
- repo 設為 GitHub **template**(`--template` / 設定 `is_template`),學生可「Use this template」或直接 clone。
- 可見度 **public**;不含任何隱藏測資或參考解。

**建立方式**:以 `gh repo create nycu-cs-course-ds/ds2026-lab-dijkstra --public`(建立後推入上述檔案並設為 template)。此為對外動作,**需在實作階段明確確認後才執行**。

### 2.4 未來 dsjudge frontend 整合(僅預留)

- runtime 無任何 dsjudge 耦合:`dsjudgeUrl: null`、按鈕停用、repo/workflow 僅留文件化 placeholder。
- 未來 dsjudge 前端上線題庫後:於 `labs/labs.json` 填入 `dsjudgeUrl`(指向判題**網站**),`build:labs` 帶出、Lab 面板按鈕自動啟用;`.github/workflows/check.yml` 可接上提交流程。無需重構。

## 3. 檔案清單

**dsvisual(本 PR 先導)**
- 新增:`labs/labs.json`、`labs/dijkstra/{statement.md,statement.en.md,meta.json,samples/01.in,samples/01.out}`、`sync_labs.js`、`build_labs.js`、`js/lab.js`、`js/labs_rendered.js`(產生)、`scripts/make_lab_repo.sh`。
- 修改:`js/app.js`(Lab 按鈕 + 綁定)、`index.html`(`#lab-viewer` 容器 + 載入 `js/lab.js`、`js/labs_rendered.js`)、`js/i18n.js`(鍵)、`style.css`(小幅,沿用 quiz modal 樣式)、`package.json`(`build:labs` 串進 `pages:prepare`)。
- 測試:`tests/lab.spec.js`(E2E)、（可選）`tests/unit/build_labs.test.js`。
- 不動:`build_quiz.js`、`js/quiz*.js`、`js/quiz_rendered.js`、`js/cloud-config.js`、`js/code_db.js`、`js/slides_rendered.js`。

**org**
- 新增 repo:`nycu-cs-course-ds/ds2026-lab-dijkstra`(public template)。

## 4. 測試

- **E2E(`tests/lab.spec.js`)**:
  - `graph-dijkstra` 顯示 `.method-lab-btn`;某無 lab 的方法不顯示(比照 quiz「無題庫→無按鈕」以 runtime 移除 `LAB_RENDERED[id]` 模擬)。
  - 點 Lab → `#lab-viewer` 顯示;含題敘關鍵字(如「最短路」/「shortest」)+ 範例 I/O。
  - 「Open practice repo」連結 `href` 指向 `ds2026-lab-dijkstra`;「dsjudge」按鈕在 `dsjudgeUrl===null` 時為 disabled。
  - `Esc` 關閉;語言切換時題敘 zh/en 切換。
- **建置**:`build:labs` 產生 `js/labs_rendered.js` 且含 `graph-dijkstra`;`pages:prepare` 綠。
- **回歸/全套**:`npm run test:all` 綠;`js/cloud-config.js`/`js/code_db.js` 未動。
- **練習 repo**:`make check` 對 starter stub 應「編譯成功、範例 FAIL(未實作)」;放入參考解後範例 PASS(僅本機驗證,不入庫)。

## 5. 驗收標準

- viz 每方法動作列在有 lab 時多出 **Lab** 入口;`graph-dijkstra` 可開面板看到題敘 + 範例 + 練習 repo 連結;dsjudge 按鈕預留停用。
- 對外零私有耦合:runtime 不 fetch dsjudge;連結目標皆 public;隱藏測資/解答不外流。
- 內容單一真實來源:`sync_labs.js` 可從 dsjudge 重新同步公開快照;`build:labs` 產出資料檔。
- `ds2026-lab-dijkstra` 為 public template,含 statement/samples/starter/`make check`/CI placeholder;`make check` 僅對範例。
- E2E + 全套綠;既有 Slides/Self-Test 不退化。

## 6. 風險與緩解

- **公開題敘/範例**:vendor 進 public 產物等於公開題敘與範例 —— 但這些本為 Classroom starter 的公開部分,隱藏測資/解答不動,與現況一致。
- **dsjudge 缺席時 build**:快照已 commit,`build:labs` 只讀 `labs/`;僅 `sync_labs.js` 需 dsjudge,缺席時報錯不動快照。
- **命名混淆**:練習 repo 用 `ds2026-lab-<slug>` 與計分作業 `ds2026-lab{N}-github-<slug>-<handle>` 區隔。
- **多題/複製**:`labs.json` 以陣列支援一個方法多題;新方法只需加 `labs.json` 條目 + 跑 `sync_labs.js` + 建 repo。
- **對外動作(建 repo)**:屬 outward-facing,實作階段建立前明確確認;先導僅 1 個 repo。
- **產生檔規範**:`js/labs_rendered.js` 不手改,一律經 `build:labs` 重建(同 `quiz_rendered.js`)。
