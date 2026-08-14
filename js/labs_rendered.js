window.LAB_RENDERED = {
  "graph-dijkstra": [
    {
      "slug": "dijkstra",
      "titleZh": "dijkstra — 單源最短路徑",
      "titleEn": "dijkstra — 單源最短路徑",
      "topic": "graphs",
      "week": 7,
      "difficulty": 3,
      "tags": [
        "graph",
        "shortest-path"
      ],
      "repoUrl": "https://github.com/nycu-cs-course-ds/ds2026-lab-dijkstra",
      "dsjudgeUrl": null,
      "statementHtml": {
        "zh": "<h1>dijkstra — 單源最短路徑</h1>\n<p>給定一個 <code>n</code> 個節點(編號 <code>0</code> 到 <code>n-1</code>)、<code>m</code> 條邊的<strong>無向帶權圖</strong>(邊權重非負),以及一個來源節點 <code>s</code>,請計算從 <code>s</code> 到每個節點的最短路徑長度(邊權重總和)。若某節點從 <code>s</code> 無法到達,輸出 <code>-1</code>。</p>\n<h2>輸入</h2>\n<ul><li>第 1 行:兩個整數 <code>n m</code>(節點數、邊數)</li><li>接下來 <code>m</code> 行:每行三個整數 <code>u v w</code>,代表節點 <code>u</code> 與節點 <code>v</code> 之間有一條權重為 <code>w</code> 的無向邊(<code>0 &lt;= w</code>)</li><li>最後 1 行:一個整數 <code>s</code>(來源節點)</li></ul>\n<h2>輸出</h2>\n<ul><li>一行,包含 <code>n</code> 個以空白分隔的整數:節點 <code>0</code> 到 <code>n-1</code> 各自到 <code>s</code> 的最短距離;若無法到達則輸出 <code>-1</code>。</li></ul>\n<h2>範例</h2>\n<p>輸入:</p>\n<pre><code>5 6\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3\n0\n</code></pre>\n<p>輸出:</p>\n<pre><code>0 3 1 4 7\n</code></pre>",
        "en": "<h1>dijkstra — 單源最短路徑</h1>\n<p>給定一個 <code>n</code> 個節點(編號 <code>0</code> 到 <code>n-1</code>)、<code>m</code> 條邊的<strong>無向帶權圖</strong>(邊權重非負),以及一個來源節點 <code>s</code>,請計算從 <code>s</code> 到每個節點的最短路徑長度(邊權重總和)。若某節點從 <code>s</code> 無法到達,輸出 <code>-1</code>。</p>\n<h2>輸入</h2>\n<ul><li>第 1 行:兩個整數 <code>n m</code>(節點數、邊數)</li><li>接下來 <code>m</code> 行:每行三個整數 <code>u v w</code>,代表節點 <code>u</code> 與節點 <code>v</code> 之間有一條權重為 <code>w</code> 的無向邊(<code>0 &lt;= w</code>)</li><li>最後 1 行:一個整數 <code>s</code>(來源節點)</li></ul>\n<h2>輸出</h2>\n<ul><li>一行,包含 <code>n</code> 個以空白分隔的整數:節點 <code>0</code> 到 <code>n-1</code> 各自到 <code>s</code> 的最短距離;若無法到達則輸出 <code>-1</code>。</li></ul>\n<h2>範例</h2>\n<p>輸入:</p>\n<pre><code>5 6\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3\n0\n</code></pre>\n<p>輸出:</p>\n<pre><code>0 3 1 4 7\n</code></pre>"
      },
      "samples": [
        {
          "in": "5 6\n0 1 4\n0 2 1\n2 1 2\n1 3 1\n2 3 5\n3 4 3\n0\n",
          "out": "0 3 1 4 7\n"
        }
      ]
    }
  ]
};
