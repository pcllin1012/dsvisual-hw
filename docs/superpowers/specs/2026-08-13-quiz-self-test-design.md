# Self-Test Quiz(Moodle XML)設計文件 — 首發於 Quick Sort viz

- 日期:2026-08-13
- Repo:`/Users/skhuang/course/dsvisual`(main,branch `feat/quiz-self-test-quicksort`)
- 動機:讓學生針對每個 viz 的知識自我測驗。題庫以 **Moodle XML quiz 格式**撰寫(可與 Moodle 互通),在 viz 卡片工具列新增「Self-Test / 自我測驗」按鈕,與 source code drawer、Slides、Fullscreen 並行。**首發只掛在 Quick Sort(`sort-quick`)**,資料管線可推廣到全部方法。

## 0. 範圍與決策(已與使用者確認)

- **首發方法**:`sort-quick`(其餘方法無 quiz 時不顯示按鈕)。
- **題型(v1)**:`multichoice`(單選 + 複選)、`truefalse`、`shortanswer`(含 Moodle `usecase` 大小寫 + `*` 萬用字元)。**不做** matching/cloze/essay/numerical(後續版本)。
- **作答/回饋(兩種模式,可切換)**:
  - **練習 Practice**:作答 → *Check* → 立即顯示對錯 + Moodle 每答案回饋 + 題目總回饋 → *Next*。
  - **測驗 Test**:逐題作答(Prev/Next)→ *Submit* → 一次顯示分數 + 逐題檢討。
- **雙語**:每語一個 XML —— `quizzes/en/<method>.xml` + `quizzes/zh/<method>.xml`(對齊 `slides/en`、`slides/zh`);隨 app 語言切換題庫,modal 內也可切換。
- **作答紀錄(localStorage,未來上 DB)**:**每個 quiz 各自保留最近 10 次**作答(練習或測驗)。以 `QuizAttempts` 模組封裝(唯一 seam,未來換 DB 只改此模組)。
- **管線對齊 slides**:Moodle XML 原始檔 → `build_quiz.js` 產生 `js/quiz_rendered.js`(`window.QUIZ_RENDERED`)→ `<script defer>` 載入;`build:quiz` 併入 `pages:prepare`。

## 1. 現況(已查證)

- **卡片工具列**(`js/app.js` ~635-643):`.method-section-actions` 內含 zoom controls、(條件)code-drawer toggle、Fullscreen toggle、**Slides 按鈕**(`.method-slides-btn` → `openSlides(method.id)`)。新按鈕加於此列。
- **Slides overlay modal**(`index.html` 298-320):`#slide-viewer.slideviewer-overlay[hidden]` + panel(role=dialog)+ bar(title/lang-toggle/close)+ stage + foot(prev/next/meta)。Quiz modal 比照此結構。Esc/backdrop 關閉、focus 管理已於 slides 實作(`closeSlides` 等)可參照。
- **Slides 資料管線**:`slides_db.js`(源)→ `build_slides.js` → `js/slides_rendered.js`(`window.SLIDES_RENDERED`,`<script defer>` 載入,`index.html:469`);`build:slides` 於 `pages:prepare`(package.json)。`slides/{en,zh}` 雙語目錄。
- **儲存模組範式**:`js/examples_store.js`(`ExamplesStore`)—— `key(id)` + `load/save` + cap,try/catch 包 localStorage。`QuizAttempts` 比照。
- **i18n**:`js/i18n.js` `TRANSLATIONS.en`(line 8)/`TRANSLATIONS.zh`(266),鍵如 `'btn.fullscreen'`;`t(key)` 取當前語言字串。新增 `btn.quiz` 等鍵至兩語。

## 2. 設計

### 2.1 資料管線:Moodle XML → `js/quiz_rendered.js`

- **原始檔**:`quizzes/en/sort-quick.xml`、`quizzes/zh/sort-quick.xml`(標準 Moodle question XML,`<quiz><question type="...">…`)。
- **`build_quiz.js`**(Node,對齊 build_slides 結構):讀 `quizzes/{en,zh}/*.xml`,以 XML parser(輕量,如 `fast-xml-parser` 或內建正則式解析——優先用已在 devDeps 的解析器;否則加最小依賴)解析每個 `<question>`,正規化成統一 schema,輸出 `js/quiz_rendered.js`:
  ```js
  window.QUIZ_RENDERED = { 'sort-quick': { en: [ <question>… ], zh: [ … ] } };
  ```
- **正規化 question schema**:
  ```js
  { type: 'multichoice'|'truefalse'|'shortanswer',
    name,                      // Moodle <name>
    text,                      // <questiontext> HTML(sanitized)
    single,                    // multichoice: <single>true|false(單/複選)
    answers: [ { text, fraction, feedback } ],  // fraction 0..100 或負;>0 視為(部分)正解
    generalFeedback }          // <generalfeedback>
  ```
  - **multichoice**:`<answer fraction="...">`;`single=true` → 恰一 fraction=100;`single=false` → 多個正 fraction(總和 100)+ 可能負 fraction(選錯扣分)。
  - **truefalse**:Moodle 產生兩個 answer(True/False),fraction 100/0;正規化為 `answers:[{text:'True',fraction:100|0},{text:'False',...}]`。
  - **shortanswer**:多個 `<answer fraction=100>` 可接受字串;帶 `usecase`(大小寫)與 `*` 萬用字元;正規化保留 `usecase` 旗標於 question(或每答案)。
- **HTML 淨化**:題幹/回饋為 Moodle HTML;以白名單淨化(允許基本標籤,移除 script/on*),避免 XSS(題庫雖為教師撰寫,仍防禦)。

### 2.2 儲存:`js/quiz_attempts.js`(`QuizAttempts` 模組,localStorage,未來 DB seam)

- key:`dsvisual:quiz:attempts:<methodId>`。
- API:
  - `record(storage, methodId, attempt)` → 取現有陣列、`unshift(attempt)`、`slice(0, 10)`、存回(try/catch)。
  - `recentFor(storage, methodId, limit=10)` → 讀回陣列(驗證形狀)。
  - `clearFor(storage, methodId)`(可選,供「清除紀錄」)。
- **attempt 紀錄 schema**(為未來 DB row 設計):
  ```js
  { id,                         // 時間戳 id(瀏覽器 Date.now 可用)
    methodId, mode, lang,       // 'practice'|'test' ; 'en'|'zh'
    startedAt, finishedAt,      // ms
    total, correct,             // 分數
    perQuestion: [ { qIndex, type, isCorrect } ] }  // 不存原始作答文字,保持精簡
  ```
- **未來 DB**:只需把這三個方法改為打 API(或 async);app 其他處**不直接碰** localStorage quiz 資料。

### 2.3 UI:按鈕 + Quiz overlay modal

- **按鈕**:於 `.method-section-actions`(Slides 旁)新增 `<button class="btn secondary method-quiz-btn" data-method="${id}">${t('btn.quiz')}</button>`,**僅當 `window.QUIZ_RENDERED[id]` 存在時 render**(比照 code-drawer 的條件)。click → `openQuiz(method.id)`。
- **Modal**(`index.html`,比照 slide-viewer):`#quiz-viewer.quizviewer-overlay[hidden]` + panel(role=dialog,aria-modal)+ bar(標題 + 語言切換 + close)+ body(依狀態渲染)+ foot(依模式的導覽/動作)。Esc/backdrop 關閉、focus trap(比照 slides)。
- **狀態機**:
  1. **Start 畫面**:題數、模式切換(**練習 / 測驗**)、開始鈕、**最近紀錄面板**(該方法最近 10 次:mode · 分數 · 時間)。
  2. **作答畫面**(逐題):題幹 HTML + 依題型 renderer:
     - single-MC → radio;multi-MC → checkbox;truefalse → radio(True/False);shortanswer → text input。
     - **練習模式**:*Check* → 評分該題 → 標示對/錯 + 每答案回饋 + 題目總回饋 → *Next*。
     - **測驗模式**:*Prev/Next* 自由導覽,不即時判分;末題 *Submit*。
  3. **Summary 畫面**:分數 X/N + (測驗)逐題檢討(你的答案/正解/回饋)+ **Retry** + 回 Start。作答結束時 `QuizAttempts.record(...)`。
- **評分邏輯(client-side, 純函式 `gradeQuestion(q, given)`)**:
  - single-MC:given 為所選 answer index;正解 = fraction 最大且 >0 者。
  - multi-MC:given 為所選 index 集合;正解 = 恰好選滿所有 fraction>0、且未選任何 fraction<0(即達 100%)。
  - truefalse:所選側為 fraction=100 者。
  - shortanswer:正規化 given(trim;`usecase=0` 則 lowercase)後,比對任一可接受答案(`*` 轉為 regex `.*`);命中即正確。
  - 回 `{ isCorrect, correctAnswers, feedback }`。
- **雙語**:modal 讀 `QUIZ_RENDERED[id][currentLang]`;語言切換重建題目(比照 slides lang-toggle)。
- **i18n**:新增鍵 `btn.quiz`(Self-Test / 自我測驗)、`quiz.practice`、`quiz.test`、`quiz.check`、`quiz.submit`、`quiz.next`、`quiz.retry`、`quiz.score`、`quiz.recent`、`aria.quiz-toggle` 等至 en+zh。

### 2.4 接線

- `index.html`:新增 `#quiz-viewer` overlay;`<script src="js/quiz_attempts.js" defer>`、`<script src="js/quiz_rendered.js" defer>`(於 app.js 前)。
- `js/app.js`:卡片工具列條件 render quiz 按鈕 + `openQuiz`/`closeQuiz` + modal 狀態機 + 評分 + 語言切換 + `QuizAttempts` 串接。
- `package.json`:`"build:quiz": "node build_quiz.js"`;`pages:prepare` 追加 `&& npm run build:quiz`。
- `js/i18n.js`:新增鍵(en+zh)。
- **首發題庫**:`quizzes/en/sort-quick.xml` + `zh`,約 6 題混合題型(平均 vs 最差複雜度、最差情況成因、穩定性=否、in-place=是、"pivot" 簡答、Lomuto/partition 複選)。

## 3. 檔案清單

- 新增:`quizzes/en/sort-quick.xml`、`quizzes/zh/sort-quick.xml`、`build_quiz.js`、`js/quiz_rendered.js`(產生)、`js/quiz_attempts.js`、`js/quiz.js`(modal 狀態機 + 評分,或併入 app.js — 見風險)、`tests/unit/quiz_build.test.js`、`tests/unit/quiz_grade.test.js`、`tests/unit/quiz_attempts.test.js`、`tests/quiz.spec.js`(E2E)。
- 修改:`index.html`(modal + script)、`js/app.js`(按鈕 + openQuiz 串接)、`js/i18n.js`(鍵)、`package.json`(build:quiz)、`style.css`(`.quizviewer-*`)。
- 不動:`js/cloud-config.js`、`js/code_db.js`、`js/slides_rendered.js`、其他 viz。

## 4. 測試

- **單元**:
  - `quiz_build`:Moodle XML(三題型 fixture)→ 正規化 schema 正確(fraction、single、shortanswer usecase/`*`、feedback)。
  - `quiz_grade`:`gradeQuestion` 對每題型的對/錯/部分(multi-MC 全對才對、shortanswer 大小寫與萬用字元、truefalse)。
  - `quiz_attempts`:per-method cap-10(存 12 筆只留最新 10、`recentFor` 順序、壞資料容錯)。
- **E2E(quiz.spec.js)**:
  - `sort-quick` 顯示 Self-Test 按鈕;非 quiz 方法(如 sort-bubble)**不**顯示。
  - 開啟 modal → Start 畫面(題數 + 模式切換 + 最近紀錄面板)。
  - **練習模式**:選答 → Check → 顯示對錯 + 回饋 → Next;走完 → Summary 分數。
  - **測驗模式**:逐題作答 → Submit → 分數 + 逐題檢討。
  - 完成後 `QuizAttempts` 存一筆,重開 modal 於「最近紀錄」可見(分數/模式/時間)。
  - 語言切換題庫更新;Esc/close 關閉;鍵盤可操作。
- **回歸/計數**:Slides/code-drawer/Fullscreen 不受影響;方法計數不變;`js/cloud-config.js`/`js/code_db.js`/`js/slides_rendered.js` 未動;全套 `npm run test:all` 綠。

## 5. 驗收標準

- Quick Sort viz 工具列出現「Self-Test / 自我測驗」按鈕,與 code drawer / Slides / Fullscreen 並行;其他無題庫方法不顯示。
- 題庫來自 Moodle XML(en+zh),經 `build:quiz` 產出;支援 multichoice/truefalse/shortanswer。
- 練習(即時回饋)與測驗(統一計分)兩模式皆可用,評分正確,回饋顯示。
- 每個 quiz 各自保留最近 10 次作答於 localStorage(`QuizAttempts`),modal 可檢視;儲存邏輯集中於單一模組以利未來上 DB。
- 雙語切換、鍵盤/Esc、focus 管理正確;E2E + 全套綠。

## 6. 風險與緩解

- **Moodle XML 解析**:格式多變(CDATA、HTML entity、`<text>` 巢狀、feedback 選填)。緩解:先鎖定三題型的常見輸出;`build_quiz.js` 對缺欄位有預設值;單元測試以真實 Moodle 匯出片段為 fixture;無法解析的題目跳過並 `log` 警告(不靜默吞掉)。
- **XML parser 依賴**:優先用內建/已存在依賴;若需新增,選輕量無傳遞依賴者(如 `fast-xml-parser`),並僅用於 build(不進前端 bundle)。
- **HTML 淨化(XSS)**:題幹/回饋為 HTML;以白名單淨化於 build 階段(輸出到 quiz_rendered.js 前),前端只插入已淨化字串。
- **modal 複雜度(狀態機)**:練習/測驗兩模式 + 三題型 + summary + 最近紀錄,狀態不少。緩解:抽出純函式(`gradeQuestion`、渲染器 per type)+ 明確狀態機;`js/quiz.js` 獨立檔案便於測試與審查。
- **localStorage 配額/壞資料**:cap-10 + 精簡 schema(不存原文)使用量極小;`QuizAttempts` try/catch + 形狀驗證容錯。
- **未來 DB 遷移**:`QuizAttempts` 為唯一儲存 seam;schema 已含 methodId/mode/lang/時間/分數/逐題結果,可直接對應 DB row;之後改為 async API 即可。
- **範圍**:首發僅 `sort-quick` 一份題庫 + 按鈕條件顯示,管線與 modal 通用,後續加題庫即自動出現按鈕。
