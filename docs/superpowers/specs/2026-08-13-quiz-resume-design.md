# Quiz 續作 / 重看設計文件 — 從 Recent attempts 繼續未完成的作答

- 日期:2026-08-13
- Repo:`/Users/skhuang/course/dsvisual`(main @ c237012,branch `feat/quiz-resume`)
- 動機:延伸 #217 的 Self-Test quiz。目前 attempt **只在完成時**才寫入,且不含原始作答,無法續作。本功能:**在「最近紀錄」面板選一筆紀錄——未完成者「繼續」作答,已完成者「重看」結果。**

## 0. 範圍與決策(已與使用者確認)

- **未完成 attempt 可續作**:自 Recent attempts 面板點選 in-progress 紀錄 → 從上次停留的題目、模式、已作答內容**繼續**。
- **已完成 attempt 可重看(Review)**:點選 completed 紀錄 → 唯讀重新顯示當次分數與逐題檢討(不重新計分、不新增紀錄)。
- **自動存檔(每步)**:作答/Check/Next/Prev/關閉 modal 時,將進行中狀態 upsert 存回(同一 id),使關閉 modal 或分頁後進度不遺失。`finish()` 將該筆標為 completed。
- **儲存仍為 per-method 最近 10 筆**(含 in-progress 與 completed);以 `id` upsert,不產生重複列。
- **未來 DB**:延續 #217 的 `QuizAttempts` 單一 seam;schema 擴充後仍可對應 DB row。

## 1. 現況(已查證,#217)

- `js/quiz.js`:session 狀態 `st = { methodId, lang, mode, questions, idx, given[], checked[], startedAt, phase, result }`。attempt **僅於 `finish()`** 呼叫 `QuizAttempts.record(...)`(prepend + cap 10);record 內容為 `{ id, methodId, mode, lang, startedAt, finishedAt, total, correct, perQuestion:[{qIndex,type,isCorrect}] }` —— **無 status、無 idx、無原始 given/checked**。
- `renderStart()` 的 `.quiz-recent` 面板:`QuizAttempts.recentFor(...)` → 逐列唯讀顯示 `mode · correct/total · time`。**不可點**。
- `js/quiz_attempts.js`:`key/record/recentFor/clearFor`;`record` = prepend + `slice(0,10)`。
- `onBodyClick`:`begin/check/prev/next/submit/retry/home` 動作(event delegation on `#quiz-viewer-body`)。`close()` 直接關閉、清 `st`(不存檔)。

## 2. 設計

### 2.1 `js/quiz_attempts.js` — 新增 `upsert`

- `upsert(storage, methodId, attempt)`:讀現有陣列;若存在同 `attempt.id` → **就地取代**(保留位置);否則 `unshift`;`slice(0,10)` 存回(try/catch)。
- 保留 `record`(向後相容 + 既有測試);quiz.js 改用 `upsert`。
- `recentFor` 不變(回最近 10 筆,含 in-progress + completed)。

### 2.2 attempt 紀錄 schema(擴充,續作所需)

```js
{ id, methodId, mode, lang,
  status,                    // 'in-progress' | 'completed'   ← 新增
  idx,                       // 目前題號(續作起點)            ← 新增
  given,                     // 原始作答陣列(每題:index/index[]/string) ← 新增
  checked,                   // 練習模式每題是否已 Check         ← 新增
  startedAt, finishedAt,     // finishedAt 於 completed 才有值
  total, correct,            // 目前(或最終)得分
  perQuestion: [ { qIndex, type, isCorrect } ] }
```

- 體積仍小(每 attempt 幾題;given 為短整數/短字串);per-method cap-10 用量無虞。

### 2.3 `js/quiz.js` — session 生命週期 + 續作/重看

- `st` 新增 `id`、`status`。
- **Begin**(`onBodyClick` begin):`st.id = Date.now()`、`st.status='in-progress'`、`autosave()`。
- **`autosave()`**(每次狀態變動後呼叫:check/next/prev/collectAnswer 後、close 前):以目前 `idx/given/checked` + `status='in-progress'` **upsert**;`correct` 以目前已作答評分(僅供顯示,非最終)。
- **`close()`**:若 `st && st.phase==='quiz' && st.status==='in-progress'` → `autosave()` 再關閉。
- **`finish()`**:改為 `upsert(... status:'completed', finishedAt:Date.now(), 最終 correct/perQuestion ...)`(同一 `st.id`,不新增列)→ renderSummary。
- **`resume(attempt)`**:
  - 守衛:`deckFor(methodId, attempt.lang).length === attempt.given.length`(否則視為過期,不續作,可提示)。
  - 還原 `st = { methodId, id:attempt.id, lang:attempt.lang, mode:attempt.mode, questions:<deck>, idx:attempt.idx, given:attempt.given.slice(), checked:(attempt.checked||[]).slice(), startedAt:attempt.startedAt, status:'in-progress', phase:'quiz', result:null }` → `renderQuestion()`。
- **`review(attempt)`**:
  - 唯讀:`st = { ...從 attempt 還原..., mode:attempt.mode, given:attempt.given, phase:'summary', readonly:true, result:{total,correct} }` → `renderSummary()`(以儲存的 given 重建逐題檢討;**不** upsert、**不** 顯示會改狀態的動作,Retry 可保留為「用相同題目重測」→ 走正常 open/begin 流程)。
- **`renderStart()` recent 面板**:每列依 status 呈現、可點(button + `data-act` + `data-id`):
  - `in-progress` → `data-act="resume"`,顯示 `mode · 第(idx+1)/total 題 · time` + 標籤「繼續 / Resume」;過期(deck 不符)則標示不可續作(唯讀或隱藏 resume)。
  - `completed` → `data-act="review"`,顯示 `mode · correct/total · time` + 標籤「重看 / Review」。
- **`onBodyClick`** 新增:`resume`(以 `data-id` 於 `recentFor` 找該 attempt → `resume(it)`)、`review`(→ `review(it)`)。

### 2.4 i18n

- 新增鍵(en+zh):`quiz.resume`(Resume / 繼續)、`quiz.review`(Review / 重看)、`quiz.inprogress`(In progress / 進行中)、`quiz.qofn`(可用格式字串或以現有拼接)。

## 3. 檔案清單

- 修改:`js/quiz_attempts.js`(+`upsert`)、`js/quiz.js`(生命週期 + resume/review + 面板可點)、`js/i18n.js`(鍵)、`style.css`(可點列/繼續徽章樣式,小幅)。
- 測試:`tests/unit/quiz_attempts.test.js`(+`upsert` 案例)、`tests/quiz.spec.js`(+ 續作 + 重看 E2E)。
- 不動:`build_quiz.js`、`quizzes/*`、`js/quiz_grade.js`、`js/quiz_rendered.js`、`js/cloud-config.js`、`js/code_db.js`、其他 viz。

## 4. 測試

- **單元(quiz_attempts)**:
  - `upsert` 新 id → prepend;既有 id → 就地取代(長度不增、位置保留);cap 10 維持;per-method 隔離;壞資料容錯。
- **E2E(quiz.spec.js 擴充)**:
  - **續作**:sort-quick 開 quiz → Practice Begin → 答第 1 題並 Check、Next 到第 2 題 → **Esc 關閉**(未完成)→ 重開 quiz → 面板出現 in-progress「繼續」列(顯示 Q2/6)→ 點擊 → 回到第 2 題,先前作答/勾選還原;localStorage 該 methodId 僅 1 筆(upsert,非重複)。
  - **完成後標記**:續作走到 finish → 該筆 status 變 completed、面板顯示分數(仍 1 筆)。
  - **重看**:completed 列可點 → Review 顯示分數 + 逐題檢討(唯讀);不新增紀錄。
  - 既有 practice/test/按鈕可見性測試不退化。
- **回歸/全套**:`npm run test:all` 綠;既有 quiz 測試(#217)不變或相容;`js/cloud-config.js`/`js/code_db.js` 未動。

## 5. 驗收標準

- Recent attempts 面板可點:未完成 → 從停留處續作(模式/題號/作答還原);已完成 → 重看分數與逐題檢討。
- 進行中狀態每步自動存檔,關閉 modal 後可續作;同一 attempt 以 id upsert,不產生重複列;仍 per-method 最近 10 筆。
- 完成後該筆標為 completed;重看為唯讀不改資料。
- 儲存邏輯仍集中於 `QuizAttempts`(單一 DB seam);E2E + 全套綠。

## 6. 風險與緩解

- **schema 擴充相容**:舊紀錄(#217,無 status/idx/given)可能已存在於使用者 localStorage。緩解:`renderStart` 對缺 `status` 者視為 completed(有 finishedAt);缺 given/idx 者不提供 resume(僅顯示/可 review 用 perQuestion,或標為舊資料)。`resume` 守衛 given 長度。
- **自動存檔頻率**:每步 upsert 寫 localStorage;資料小、頻率低(使用者手動作答),效能無虞;try/catch 容錯配額。
- **重看 vs 續作誤觸**:以 status 決定 `data-act`(resume/review)與標籤,兩者視覺區隔(徽章)。
- **deck 變更使舊 in-progress 過期**:`resume` 以 given.length === deck.length 守衛;不符則不可續作(標示),避免錯位。
- **既有 E2E 相容**:finish 改 upsert 後,完成一次仍為 1 筆;Begin 建 in-progress 亦同 id,故「完成後 1 筆」不變 —— 確認 #217 的「attempt saved (length 1)」測試仍過。
- **範圍**:純前端(quiz.js + quiz_attempts + i18n + css + 測試),不動資料管線與題庫。
