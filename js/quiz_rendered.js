window.QUIZ_RENDERED = {
  "search-aho": {
    "en": [
      {
        "type": "multichoice",
        "name": "What Aho-Corasick solves",
        "text": "<p>What problem does the Aho-Corasick algorithm solve?</p>",
        "answers": [
          {
            "text": "Finding all occurrences of a set of patterns in a text in one pass",
            "fraction": 100,
            "feedback": "Correct — it is a multi-pattern exact matching algorithm."
          },
          {
            "text": "Sorting the patterns lexicographically",
            "fraction": 0,
            "feedback": "No — it matches, it does not sort."
          },
          {
            "text": "Finding the longest common subsequence of two strings",
            "fraction": 0,
            "feedback": "No — that is a different dynamic-programming problem."
          },
          {
            "text": "Matching a single pattern only, like KMP",
            "fraction": 0,
            "feedback": "No — Aho-Corasick handles many patterns at once."
          }
        ],
        "generalFeedback": "Aho-Corasick locates every occurrence of any pattern from a dictionary during a single scan of the text.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Underlying data structure",
        "text": "<p>Aho-Corasick first builds which data structure from all the patterns?</p>",
        "answers": [
          {
            "text": "A trie of all the patterns",
            "fraction": 100,
            "feedback": "Correct — the patterns share prefixes in a trie."
          },
          {
            "text": "A binary search tree keyed by pattern length",
            "fraction": 0,
            "feedback": "No — it uses a trie, not a BST."
          },
          {
            "text": "A hash table of rolling hashes",
            "fraction": 0,
            "feedback": "No — that is Rabin-Karp's approach."
          },
          {
            "text": "A min-heap of characters",
            "fraction": 0,
            "feedback": "No — no heap is involved."
          }
        ],
        "generalFeedback": "All patterns are inserted into a trie; shared prefixes collapse onto shared paths.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Aho-Corasick complexity",
        "text": "<p>With n = text length, m = total length of all patterns, and z = number of matches reported, what is Aho-Corasick's time complexity?</p>",
        "answers": [
          {
            "text": "O(n + m + z)",
            "fraction": 100,
            "feedback": "Correct — build the automaton in O(m), scan in O(n), and report z matches."
          },
          {
            "text": "O(n * m)",
            "fraction": 0,
            "feedback": "No — that would be re-scanning per pattern; Aho-Corasick avoids it."
          },
          {
            "text": "O(n log m)",
            "fraction": 0,
            "feedback": "No — there is no logarithmic factor."
          },
          {
            "text": "O(m^2 + n)",
            "fraction": 0,
            "feedback": "No — automaton construction is linear in m."
          }
        ],
        "generalFeedback": "O(m) to build the trie plus failure links, O(n) for the single text pass, plus O(z) to output each match.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Failure links role",
        "text": "<p>What is the role of the <strong>failure links</strong> added to the Aho-Corasick trie?</p>",
        "answers": [
          {
            "text": "They generalize KMP's failure function to fall back to the longest proper suffix that is a trie prefix",
            "fraction": 100,
            "feedback": "Correct — they redirect the scan without re-reading text."
          },
          {
            "text": "They sort the trie's children alphabetically",
            "fraction": 0,
            "feedback": "No — failure links do not sort anything."
          },
          {
            "text": "They store the rolling hash of each node",
            "fraction": 0,
            "feedback": "No — Aho-Corasick does not use hashing."
          },
          {
            "text": "They delete matched patterns from the trie",
            "fraction": 0,
            "feedback": "No — nodes are not removed during matching."
          }
        ],
        "generalFeedback": "A failure link points from a node to the node representing the longest proper suffix that is also a prefix present in the trie — KMP's idea extended to many patterns.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Properties of Aho-Corasick",
        "text": "<p>Which statements about Aho-Corasick are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It performs multi-pattern matching in a single pass over the text",
            "fraction": 50,
            "feedback": "Yes — all patterns are matched simultaneously."
          },
          {
            "text": "It adds failure links (and output links) to a trie of the patterns",
            "fraction": 50,
            "feedback": "Yes — that is exactly how the automaton is built."
          },
          {
            "text": "It can only search for a single pattern at a time",
            "fraction": -50,
            "feedback": "No — its whole point is handling a set of patterns."
          },
          {
            "text": "It relies on a rolling hash like Rabin-Karp",
            "fraction": -50,
            "feedback": "No — it uses a trie automaton, not hashing."
          }
        ],
        "generalFeedback": "Aho-Corasick = trie + failure links + output links, scanning the text once to find all patterns.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Aho-Corasick applications",
        "text": "<p>Aho-Corasick is used by tools such as <code>grep -F</code>/<code>fgrep</code>, antivirus signature scanning, and intrusion-detection systems.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — these all screen text against a large set of fixed patterns."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "These are classic real-world uses of Aho-Corasick."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Failure vs KMP",
        "text": "<p>Aho-Corasick's failure links generalize KMP's failure function from one pattern to a whole set of patterns.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it is the multi-pattern extension of the same fall-back idea."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Failure links are precisely the multi-pattern generalization of KMP's failure function."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Automaton skeleton term",
        "text": "<p>Aho-Corasick builds its automaton on top of which prefix-tree data structure? (one word)</p>",
        "answers": [
          {
            "text": "trie",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "trie*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "Aho-Corasick 解決的問題",
        "text": "<p>Aho-Corasick 演算法解決什麼問題?</p>",
        "answers": [
          {
            "text": "在單次掃描中找出一組樣式在文字中的所有出現",
            "fraction": 100,
            "feedback": "正確 —— 它是多樣式精確比對演算法。"
          },
          {
            "text": "將樣式依字典序排序",
            "fraction": 0,
            "feedback": "錯 —— 它做比對,不做排序。"
          },
          {
            "text": "找兩個字串的最長共同子序列",
            "fraction": 0,
            "feedback": "錯 —— 那是另一個動態規劃問題。"
          },
          {
            "text": "只比對單一樣式,如同 KMP",
            "fraction": 0,
            "feedback": "錯 —— Aho-Corasick 同時處理多個樣式。"
          }
        ],
        "generalFeedback": "Aho-Corasick 在單次掃描文字時,找出字典中任一樣式的所有出現。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "底層資料結構",
        "text": "<p>Aho-Corasick 首先從所有樣式建立哪種資料結構?</p>",
        "answers": [
          {
            "text": "由所有樣式構成的字典樹(trie)",
            "fraction": 100,
            "feedback": "正確 —— 樣式在 trie 中共用前綴。"
          },
          {
            "text": "以樣式長度為鍵的二元搜尋樹",
            "fraction": 0,
            "feedback": "錯 —— 它使用 trie,不是 BST。"
          },
          {
            "text": "滾動雜湊的雜湊表",
            "fraction": 0,
            "feedback": "錯 —— 那是 Rabin-Karp 的做法。"
          },
          {
            "text": "字元的最小堆積",
            "fraction": 0,
            "feedback": "錯 —— 完全不涉及堆積。"
          }
        ],
        "generalFeedback": "所有樣式插入一棵 trie;共用前綴收合到共用路徑上。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Aho-Corasick 複雜度",
        "text": "<p>設 n = 文字長度,m = 所有樣式的總長度,z = 回報的比對數量,Aho-Corasick 的時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n + m + z)",
            "fraction": 100,
            "feedback": "正確 —— 以 O(m) 建自動機、O(n) 掃描、回報 z 個比對。"
          },
          {
            "text": "O(n * m)",
            "fraction": 0,
            "feedback": "錯 —— 那是逐樣式重掃;Aho-Corasick 避免了這點。"
          },
          {
            "text": "O(n log m)",
            "fraction": 0,
            "feedback": "錯 —— 沒有對數因子。"
          },
          {
            "text": "O(m^2 + n)",
            "fraction": 0,
            "feedback": "錯 —— 自動機建構對 m 是線性的。"
          }
        ],
        "generalFeedback": "建 trie 加失敗連結為 O(m),單次文字掃描為 O(n),再加輸出每個比對的 O(z)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "失敗連結的作用",
        "text": "<p>加到 Aho-Corasick trie 上的<strong>失敗連結</strong>作用為何?</p>",
        "answers": [
          {
            "text": "將 KMP 的失敗函數推廣,回退到「同時是 trie 前綴的最長真後綴」",
            "fraction": 100,
            "feedback": "正確 —— 它讓掃描轉向而不重讀文字。"
          },
          {
            "text": "將 trie 的子節點按字母排序",
            "fraction": 0,
            "feedback": "錯 —— 失敗連結不做任何排序。"
          },
          {
            "text": "儲存每個節點的滾動雜湊",
            "fraction": 0,
            "feedback": "錯 —— Aho-Corasick 不使用雜湊。"
          },
          {
            "text": "從 trie 中刪除已比對的樣式",
            "fraction": 0,
            "feedback": "錯 —— 比對過程中節點不會被移除。"
          }
        ],
        "generalFeedback": "失敗連結從某節點指向「代表最長真後綴且該後綴亦為 trie 中前綴」的節點 —— 即 KMP 概念擴展到多樣式。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Aho-Corasick 的特性",
        "text": "<p>關於 Aho-Corasick,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它以單次掃描文字執行多樣式比對",
            "fraction": 50,
            "feedback": "正確 —— 所有樣式同時被比對。"
          },
          {
            "text": "它在樣式的 trie 上加入失敗連結(與輸出連結)",
            "fraction": 50,
            "feedback": "正確 —— 這正是自動機的建構方式。"
          },
          {
            "text": "它一次只能搜尋單一樣式",
            "fraction": -50,
            "feedback": "錯 —— 它的重點正是處理一組樣式。"
          },
          {
            "text": "它像 Rabin-Karp 一樣依賴滾動雜湊",
            "fraction": -50,
            "feedback": "錯 —— 它使用 trie 自動機,而非雜湊。"
          }
        ],
        "generalFeedback": "Aho-Corasick = trie + 失敗連結 + 輸出連結,單次掃描文字即找出所有樣式。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Aho-Corasick 應用",
        "text": "<p>Aho-Corasick 被 <code>grep -F</code>/<code>fgrep</code>、防毒特徵掃描與入侵偵測系統等工具所使用。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 這些都是對大量固定樣式篩選文字。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "這些都是 Aho-Corasick 的經典實務應用。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "失敗連結與 KMP",
        "text": "<p>Aho-Corasick 的失敗連結將 KMP 的失敗函數從單一樣式推廣到一整組樣式。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它正是相同回退概念的多樣式擴展。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "失敗連結正是 KMP 失敗函數的多樣式推廣。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "自動機骨架名詞",
        "text": "<p>Aho-Corasick 在哪種前綴樹資料結構之上建立其自動機?(以英文單字作答)</p>",
        "answers": [
          {
            "text": "trie",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "trie*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "search-binary": {
    "en": [
      {
        "type": "multichoice",
        "name": "Binary search core mechanism",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of binary search?</p>",
        "answers": [
          {
            "text": "Compare the target with the middle element and discard the half that cannot contain it, repeatedly halving the interval",
            "fraction": 100,
            "feedback": "Correct — each comparison halves the remaining search space."
          },
          {
            "text": "Scan every element in order from the start",
            "fraction": 0,
            "feedback": "That is linear search."
          },
          {
            "text": "Estimate the probe position from the target's value",
            "fraction": 0,
            "feedback": "That is interpolation search."
          },
          {
            "text": "Split the interval using Fibonacci numbers",
            "fraction": 0,
            "feedback": "That is Fibonacci search."
          }
        ],
        "generalFeedback": "Binary search repeatedly compares the middle element and eliminates half of the remaining range.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Binary search worst case",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of binary search over n elements?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — halving the range gives about log&#8322; n steps."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is linear search; binary search halves each step."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "Only the best case (target at the middle) is constant."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Too large; a single search is logarithmic."
          }
        ],
        "generalFeedback": "Each step discards half the elements, so at most ~log&#8322; n comparisons are needed.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Binary search precondition",
        "text": "<p>What <strong>precondition</strong> must the input array satisfy for binary search to be correct?</p>",
        "answers": [
          {
            "text": "It must be sorted",
            "fraction": 100,
            "feedback": "Correct — binary search relies on order to decide which half to keep."
          },
          {
            "text": "It must be unsorted",
            "fraction": 0,
            "feedback": "No — without order the halving logic breaks."
          },
          {
            "text": "Its values must be uniformly distributed",
            "fraction": 0,
            "feedback": "Uniform distribution helps interpolation search, not binary search."
          },
          {
            "text": "It must contain only distinct values",
            "fraction": 0,
            "feedback": "No — binary search works with duplicates too."
          }
        ],
        "generalFeedback": "Binary search requires a sorted array (and random access) so it can rule out half the range at each comparison.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Binary search on linked lists",
        "text": "<p>Why is binary search a poor fit for a singly linked list?</p>",
        "answers": [
          {
            "text": "A linked list lacks O(1) random access, so reaching the middle element is itself O(n)",
            "fraction": 100,
            "feedback": "Correct — jumping to the midpoint costs O(n), defeating the speedup."
          },
          {
            "text": "Linked lists cannot store sorted data",
            "fraction": 0,
            "feedback": "No — a linked list can certainly be kept in sorted order."
          },
          {
            "text": "Binary search only works on floating-point values",
            "fraction": 0,
            "feedback": "No — it works on any ordered keys."
          },
          {
            "text": "Linked lists use too much memory",
            "fraction": 0,
            "feedback": "Not the reason; the issue is indexing cost."
          }
        ],
        "generalFeedback": "Binary search needs O(1) indexing to reach the midpoint; a linked list only offers sequential access.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Binary search properties",
        "text": "<p>Which statements about binary search are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It runs in O(log n) time in the worst case",
            "fraction": 50,
            "feedback": "Yes — the range halves each step."
          },
          {
            "text": "It requires the array to be sorted",
            "fraction": 50,
            "feedback": "Yes — order is what lets it discard half the range."
          },
          {
            "text": "It works correctly on unsorted arrays",
            "fraction": -50,
            "feedback": "No — it requires sorted input."
          },
          {
            "text": "It runs in O(n) time in the worst case",
            "fraction": -50,
            "feedback": "No — that is linear search; binary search is O(log n)."
          }
        ],
        "generalFeedback": "Binary search: O(log n) worst case, requires sorted input and random access.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Binary search on unsorted data",
        "text": "<p>Binary search returns correct results on an unsorted array.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — without a sorted order the discarded half may contain the target."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — binary search requires the array to be sorted."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Binary search space",
        "text": "<p>Iterative binary search uses only O(1) extra (auxiliary) space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it keeps just a few index variables."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "The iterative version needs only constant extra space."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Binary search complexity term",
        "text": "<p>Binary search's worst-case time is O(____ n). Fill in the three-letter function name that goes in the blank.</p>",
        "answers": [
          {
            "text": "log",
            "fraction": 100,
            "feedback": "Correct — O(log n)."
          },
          {
            "text": "log*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "二分搜尋核心機制",
        "text": "<p>下列何者最能描述二分搜尋的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "將目標與中間元素比較,捨棄不可能含有目標的那一半,反覆將區間對半縮小",
            "fraction": 100,
            "feedback": "正確 —— 每次比較都將剩餘搜尋空間減半。"
          },
          {
            "text": "從頭開始依序掃描每個元素",
            "fraction": 0,
            "feedback": "那是線性搜尋。"
          },
          {
            "text": "依據目標的數值估算探測位置",
            "fraction": 0,
            "feedback": "那是內插搜尋。"
          },
          {
            "text": "使用費氏數列分割區間",
            "fraction": 0,
            "feedback": "那是費氏搜尋。"
          }
        ],
        "generalFeedback": "二分搜尋反覆比較中間元素,並排除剩餘範圍的一半。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "二分搜尋最差情況",
        "text": "<p>對 n 個元素進行二分搜尋,其<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 範圍對半縮小約需 log&#8322; n 步。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是線性搜尋;二分搜尋每步減半。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "只有最佳情況(目標位於中間)才是常數。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "太大了;單次搜尋為對數級。"
          }
        ],
        "generalFeedback": "每步捨棄一半元素,因此最多需要約 log&#8322; n 次比較。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "二分搜尋前提條件",
        "text": "<p>為使二分搜尋正確,輸入陣列必須滿足哪個<strong>前提條件</strong>?</p>",
        "answers": [
          {
            "text": "必須已排序",
            "fraction": 100,
            "feedback": "正確 —— 二分搜尋仰賴順序來決定保留哪一半。"
          },
          {
            "text": "必須未排序",
            "fraction": 0,
            "feedback": "錯 —— 沒有順序,對半縮小的邏輯就會失效。"
          },
          {
            "text": "其數值必須均勻分布",
            "fraction": 0,
            "feedback": "均勻分布有助於內插搜尋,而非二分搜尋。"
          },
          {
            "text": "必須只含相異數值",
            "fraction": 0,
            "feedback": "錯 —— 二分搜尋對含重複值的資料也適用。"
          }
        ],
        "generalFeedback": "二分搜尋需要已排序陣列(以及隨機存取),才能在每次比較時排除一半範圍。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "鏈結串列上的二分搜尋",
        "text": "<p>為何二分搜尋不適合用於單向鏈結串列?</p>",
        "answers": [
          {
            "text": "鏈結串列缺乏 O(1) 隨機存取,因此走到中間元素本身就是 O(n)",
            "fraction": 100,
            "feedback": "正確 —— 跳到中點需 O(n),抵消了加速效果。"
          },
          {
            "text": "鏈結串列無法儲存已排序的資料",
            "fraction": 0,
            "feedback": "錯 —— 鏈結串列當然可以維持排序順序。"
          },
          {
            "text": "二分搜尋只能用於浮點數值",
            "fraction": 0,
            "feedback": "錯 —— 它適用於任何有序鍵值。"
          },
          {
            "text": "鏈結串列使用太多記憶體",
            "fraction": 0,
            "feedback": "不是原因;問題在於索引成本。"
          }
        ],
        "generalFeedback": "二分搜尋需要 O(1) 索引才能抵達中點;鏈結串列只提供循序存取。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "二分搜尋特性",
        "text": "<p>關於二分搜尋,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它在最差情況下以 O(log n) 時間執行",
            "fraction": 50,
            "feedback": "正確 —— 範圍每步減半。"
          },
          {
            "text": "它需要陣列已排序",
            "fraction": 50,
            "feedback": "正確 —— 順序讓它能捨棄一半範圍。"
          },
          {
            "text": "它在未排序陣列上也能正確運作",
            "fraction": -50,
            "feedback": "錯 —— 它需要已排序的輸入。"
          },
          {
            "text": "它在最差情況下以 O(n) 時間執行",
            "fraction": -50,
            "feedback": "錯 —— 那是線性搜尋;二分搜尋為 O(log n)。"
          }
        ],
        "generalFeedback": "二分搜尋:最差情況 O(log n),需要已排序輸入與隨機存取。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "未排序資料上的二分搜尋",
        "text": "<p>二分搜尋在未排序陣列上會回傳正確結果。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 沒有排序順序,被捨棄的一半可能含有目標。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 二分搜尋要求陣列已排序。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "二分搜尋空間",
        "text": "<p>迭代式二分搜尋僅使用 O(1) 的額外(輔助)空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 只保存少數索引變數。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "迭代版本只需常數額外空間。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "二分搜尋複雜度名詞",
        "text": "<p>二分搜尋的最差情況時間為 O(____ n)。請填入空格中那個三字母的函數名稱(英文)。</p>",
        "answers": [
          {
            "text": "log",
            "fraction": 100,
            "feedback": "正確 —— O(log n)。"
          },
          {
            "text": "log*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "search-bm": {
    "en": [
      {
        "type": "multichoice",
        "name": "Boyer-Moore scan direction",
        "text": "<p>Within each alignment, in which direction does <strong>Boyer-Moore</strong> compare the pattern against the text?</p>",
        "answers": [
          {
            "text": "Right to left (from the end of the pattern toward the front)",
            "fraction": 100,
            "feedback": "Correct — matching from the rightmost pattern character enables large skips."
          },
          {
            "text": "Left to right",
            "fraction": 0,
            "feedback": "No — that is KMP; Boyer-Moore compares right to left."
          },
          {
            "text": "From the middle outward",
            "fraction": 0,
            "feedback": "No — Boyer-Moore starts at the rightmost character."
          },
          {
            "text": "In random order",
            "fraction": 0,
            "feedback": "No — comparison order is fixed: right to left."
          }
        ],
        "generalFeedback": "Boyer-Moore aligns the pattern and compares from its last character backward, which is what makes its heuristics able to skip.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore heuristics",
        "text": "<p>Which two heuristics does classic Boyer-Moore use to decide how far to shift the pattern?</p>",
        "answers": [
          {
            "text": "Bad-character and good-suffix",
            "fraction": 100,
            "feedback": "Correct — these two rules determine the shift distance."
          },
          {
            "text": "Failure function and rolling hash",
            "fraction": 0,
            "feedback": "No — those belong to KMP and Rabin-Karp respectively."
          },
          {
            "text": "Bad-character and rolling hash",
            "fraction": 0,
            "feedback": "No — the rolling hash is Rabin-Karp, not Boyer-Moore."
          },
          {
            "text": "Good-suffix and binary search",
            "fraction": 0,
            "feedback": "No — Boyer-Moore does not use binary search."
          }
        ],
        "generalFeedback": "Boyer-Moore combines the bad-character heuristic and the good-suffix heuristic, taking the larger shift of the two.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore average performance",
        "text": "<p>Why is Boyer-Moore often described as <strong>sublinear</strong> in practice?</p>",
        "answers": [
          {
            "text": "Its heuristics let it skip many text characters without inspecting them, best case around O(n/m)",
            "fraction": 100,
            "feedback": "Correct — large skips mean it can examine far fewer than n characters."
          },
          {
            "text": "It uses a hash to test all windows in O(1)",
            "fraction": 0,
            "feedback": "No — that is Rabin-Karp; Boyer-Moore skips via heuristics."
          },
          {
            "text": "It sorts the text first to enable binary search",
            "fraction": 0,
            "feedback": "No — Boyer-Moore does not sort or binary-search."
          },
          {
            "text": "It never needs to preprocess the pattern",
            "fraction": 0,
            "feedback": "No — it does preprocess to build its heuristic tables."
          }
        ],
        "generalFeedback": "On large alphabets and long patterns, skips are large, so Boyer-Moore inspects far fewer than n characters — best case ~O(n/m). This is why grep uses it.",
        "single": true
      },
      {
        "type": "shortanswer",
        "name": "Bad character heuristic term",
        "text": "<p>The Boyer-Moore rule that shifts the pattern based on the mismatched text character is called the ______-character heuristic. Give the missing word.</p>",
        "answers": [
          {
            "text": "bad",
            "fraction": 100,
            "feedback": "Correct — the bad-character heuristic."
          },
          {
            "text": "bad*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore when to use",
        "text": "<p>When does Boyer-Moore tend to shine most?</p>",
        "answers": [
          {
            "text": "Searching a long pattern over a large alphabet, where average-case skipping is largest",
            "fraction": 100,
            "feedback": "Correct — big alphabets and long patterns produce the biggest skips."
          },
          {
            "text": "When you need a strict worst-case linear guarantee out of the box",
            "fraction": 0,
            "feedback": "No — naive Boyer-Moore is O(nm); KMP gives the built-in linear guarantee."
          },
          {
            "text": "When searching for many patterns at once",
            "fraction": 0,
            "feedback": "No — multi-pattern search favors Rabin-Karp."
          },
          {
            "text": "When the pattern is a single character",
            "fraction": 0,
            "feedback": "No — with m = 1 there is little to skip; Boyer-Moore's advantage shrinks."
          }
        ],
        "generalFeedback": "Boyer-Moore is fastest in practice for long patterns and large alphabets, which is why tools like grep use it.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Boyer-Moore worst case",
        "text": "<p>The naive Boyer-Moore (bad-character only) can degrade to O(n &times; m) in the worst case, but adding the Galil rule restores O(n + m).</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — worst case is O(nm) naively; the Galil rule gives a linear guarantee."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — the naive worst case really is O(nm), and the Galil rule really does bound it to O(n + m)."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Boyer-Moore grep use",
        "text": "<p>Boyer-Moore is a common choice for fast text search tools such as <code>grep</code>.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — its sublinear average behavior makes it a practical favorite."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — Boyer-Moore variants are indeed widely used in tools like grep."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore properties multi",
        "text": "<p>Which statements about Boyer-Moore are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Longer patterns and larger alphabets tend to make it faster (bigger skips)",
            "fraction": 50,
            "feedback": "Yes — more distinctive characters allow larger shifts."
          },
          {
            "text": "It compares characters from the right end of the pattern first",
            "fraction": 50,
            "feedback": "Yes — right-to-left comparison is central to the method."
          },
          {
            "text": "It guarantees O(n + m) time without any extra rule",
            "fraction": -50,
            "feedback": "No — the naive version is O(nm); linearity needs the Galil rule."
          },
          {
            "text": "It uses a rolling hash to compare windows",
            "fraction": -50,
            "feedback": "No — the rolling hash is Rabin-Karp, not Boyer-Moore."
          }
        ],
        "generalFeedback": "Boyer-Moore: right-to-left comparison, faster with long patterns/large alphabets, but only linear with the Galil rule; rolling hashes belong to Rabin-Karp.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "Boyer-Moore 掃描方向",
        "text": "<p>在每個對齊位置,<strong>Boyer-Moore</strong> 以何種方向將樣式與文字比對?</p>",
        "answers": [
          {
            "text": "由右至左(從樣式尾端往前)",
            "fraction": 100,
            "feedback": "正確 —— 從樣式最右字元開始比對,才能大幅跳躍。"
          },
          {
            "text": "由左至右",
            "fraction": 0,
            "feedback": "錯 —— 那是 KMP;Boyer-Moore 是由右至左比對。"
          },
          {
            "text": "從中間向外",
            "fraction": 0,
            "feedback": "錯 —— Boyer-Moore 從最右字元開始。"
          },
          {
            "text": "以隨機順序",
            "fraction": 0,
            "feedback": "錯 —— 比對順序是固定的:由右至左。"
          }
        ],
        "generalFeedback": "Boyer-Moore 對齊樣式後從最後一個字元往前比對,這正是其啟發式能跳躍的原因。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore 啟發式",
        "text": "<p>經典 Boyer-Moore 使用哪兩種啟發式來決定樣式要位移多遠?</p>",
        "answers": [
          {
            "text": "壞字元(bad-character)與好後綴(good-suffix)",
            "fraction": 100,
            "feedback": "正確 —— 這兩條規則決定位移距離。"
          },
          {
            "text": "失敗函數與滾動雜湊",
            "fraction": 0,
            "feedback": "錯 —— 那分別屬於 KMP 與 Rabin-Karp。"
          },
          {
            "text": "壞字元與滾動雜湊",
            "fraction": 0,
            "feedback": "錯 —— 滾動雜湊是 Rabin-Karp,不是 Boyer-Moore。"
          },
          {
            "text": "好後綴與二分搜尋",
            "fraction": 0,
            "feedback": "錯 —— Boyer-Moore 不使用二分搜尋。"
          }
        ],
        "generalFeedback": "Boyer-Moore 結合壞字元啟發式與好後綴啟發式,取兩者較大的位移。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore 平均效能",
        "text": "<p>為什麼實務上常說 Boyer-Moore 是<strong>次線性</strong>的?</p>",
        "answers": [
          {
            "text": "其啟發式讓它能跳過許多文字字元而不檢視,最佳情況約 O(n/m)",
            "fraction": 100,
            "feedback": "正確 —— 大幅跳躍意味著檢視的字元遠少於 n。"
          },
          {
            "text": "它用雜湊以 O(1) 測試所有視窗",
            "fraction": 0,
            "feedback": "錯 —— 那是 Rabin-Karp;Boyer-Moore 靠啟發式跳躍。"
          },
          {
            "text": "它先將文字排序以便二分搜尋",
            "fraction": 0,
            "feedback": "錯 —— Boyer-Moore 不排序也不二分搜尋。"
          },
          {
            "text": "它完全不需要對樣式做前處理",
            "fraction": 0,
            "feedback": "錯 —— 它確實會前處理以建立啟發式表。"
          }
        ],
        "generalFeedback": "在大字母集與長樣式下,跳躍很大,因此 Boyer-Moore 檢視的字元遠少於 n —— 最佳情況約 O(n/m)。這也是 grep 使用它的原因。",
        "single": true
      },
      {
        "type": "shortanswer",
        "name": "壞字元啟發式名詞",
        "text": "<p>Boyer-Moore 中根據不匹配的文字字元來位移樣式的規則,稱為 ______-character 啟發式。請填入缺少的英文單字。</p>",
        "answers": [
          {
            "text": "bad",
            "fraction": 100,
            "feedback": "正確 —— 壞字元(bad-character)啟發式。"
          },
          {
            "text": "bad*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore 何時使用",
        "text": "<p>Boyer-Moore 在什麼情況下最為出色?</p>",
        "answers": [
          {
            "text": "在大字母集上搜尋長樣式,此時平均情況跳躍最大",
            "fraction": 100,
            "feedback": "正確 —— 大字母集與長樣式產生最大的跳躍。"
          },
          {
            "text": "當你需要開箱即用的嚴格最差情況線性保證時",
            "fraction": 0,
            "feedback": "錯 —— 樸素 Boyer-Moore 為 O(nm);KMP 才有內建線性保證。"
          },
          {
            "text": "當一次搜尋多個樣式時",
            "fraction": 0,
            "feedback": "錯 —— 多樣式搜尋有利於 Rabin-Karp。"
          },
          {
            "text": "當樣式只有單一字元時",
            "fraction": 0,
            "feedback": "錯 —— m = 1 時幾乎無可跳躍,Boyer-Moore 的優勢縮小。"
          }
        ],
        "generalFeedback": "Boyer-Moore 在長樣式與大字母集下實務上最快,這也是 grep 等工具使用它的原因。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Boyer-Moore 最差情況",
        "text": "<p>樸素的 Boyer-Moore(僅壞字元)最差情況可能退化為 O(n &times; m),但加入 Galil 規則可恢復為 O(n + m)。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 樸素版最差為 O(nm);Galil 規則給出線性保證。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 樸素版最差確實是 O(nm),而 Galil 規則確實能將其界定為 O(n + m)。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Boyer-Moore 於 grep 的使用",
        "text": "<p>Boyer-Moore 是 <code>grep</code> 等快速文字搜尋工具常見的選擇。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 其次線性的平均表現使它成為實務上的常用選擇。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— Boyer-Moore 變體確實廣泛用於 grep 等工具。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore 性質複選",
        "text": "<p>關於 Boyer-Moore,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "較長的樣式與較大的字母集往往使它更快(跳躍更大)",
            "fraction": 50,
            "feedback": "正確 —— 更具區別性的字元允許更大的位移。"
          },
          {
            "text": "它先從樣式的右端字元開始比對",
            "fraction": 50,
            "feedback": "正確 —— 由右至左比對是此方法的核心。"
          },
          {
            "text": "它不需任何額外規則就保證 O(n + m) 時間",
            "fraction": -50,
            "feedback": "錯 —— 樸素版為 O(nm);線性需要 Galil 規則。"
          },
          {
            "text": "它使用滾動雜湊來比較視窗",
            "fraction": -50,
            "feedback": "錯 —— 滾動雜湊是 Rabin-Karp,不是 Boyer-Moore。"
          }
        ],
        "generalFeedback": "Boyer-Moore:由右至左比對,長樣式/大字母集時更快,但只有加上 Galil 規則才是線性;滾動雜湊屬於 Rabin-Karp。",
        "single": false
      }
    ]
  },
  "search-fibonacci": {
    "en": [
      {
        "type": "multichoice",
        "name": "Fibonacci search core mechanism",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of Fibonacci search?</p>",
        "answers": [
          {
            "text": "Narrow the sorted range using split points derived from Fibonacci numbers instead of always halving",
            "fraction": 100,
            "feedback": "Correct — successive Fibonacci numbers determine the probe positions."
          },
          {
            "text": "Scan every element in order from the start",
            "fraction": 0,
            "feedback": "That is linear search."
          },
          {
            "text": "Always compare the exact middle element to halve the interval",
            "fraction": 0,
            "feedback": "That is binary search; Fibonacci search splits by Fibonacci numbers, not exactly in half."
          },
          {
            "text": "Estimate the probe position from the target's value",
            "fraction": 0,
            "feedback": "That is interpolation search."
          }
        ],
        "generalFeedback": "Fibonacci search uses consecutive Fibonacci numbers to choose split points, examining elements toward the front of the range.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fibonacci search complexity",
        "text": "<p>How many comparisons (time complexity) does Fibonacci search need in the worst case over n elements?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — like binary search, it shrinks the range logarithmically."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is linear search; Fibonacci search is logarithmic."
          },
          {
            "text": "O(log log n)",
            "fraction": 0,
            "feedback": "That is interpolation search's average on uniform data."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Too large; Fibonacci search is O(log n)."
          }
        ],
        "generalFeedback": "Fibonacci search shrinks the interval by a constant factor each step, giving O(log n) comparisons.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fibonacci search precondition",
        "text": "<p>What <strong>precondition</strong> must the input satisfy for Fibonacci search to work correctly?</p>",
        "answers": [
          {
            "text": "The array must be sorted",
            "fraction": 100,
            "feedback": "Correct — like binary search, it relies on order to discard part of the range."
          },
          {
            "text": "The array must be unsorted",
            "fraction": 0,
            "feedback": "No — order is required."
          },
          {
            "text": "The values must be uniformly distributed",
            "fraction": 0,
            "feedback": "That matters for interpolation search, not Fibonacci search."
          },
          {
            "text": "The array length must itself be a Fibonacci number",
            "fraction": 0,
            "feedback": "No — the algorithm just uses the smallest Fibonacci number &ge; n; the length need not be Fibonacci."
          }
        ],
        "generalFeedback": "Fibonacci search requires a sorted array; it then uses Fibonacci numbers only to pick split points.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fibonacci search advantage",
        "text": "<p>What is a distinctive advantage of Fibonacci search over binary search?</p>",
        "answers": [
          {
            "text": "It computes split points using only addition and subtraction, avoiding division",
            "fraction": 100,
            "feedback": "Correct — historically useful when division or mid-index computation was costly."
          },
          {
            "text": "It works on unsorted data",
            "fraction": 0,
            "feedback": "No — it still requires a sorted array."
          },
          {
            "text": "It achieves O(1) worst-case time",
            "fraction": 0,
            "feedback": "No — it is O(log n), like binary search."
          },
          {
            "text": "It needs no comparisons at all",
            "fraction": 0,
            "feedback": "No — it still compares elements to the target."
          }
        ],
        "generalFeedback": "Fibonacci search advances its indices with additions/subtractions of Fibonacci numbers, so it needs no division to find a midpoint.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fibonacci search properties",
        "text": "<p>Which statements about Fibonacci search are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It requires a sorted array",
            "fraction": 50,
            "feedback": "Yes — order is needed to discard part of the range."
          },
          {
            "text": "It uses only addition and subtraction, with no division, to find split points",
            "fraction": 50,
            "feedback": "Yes — that is its historical selling point."
          },
          {
            "text": "It runs in O(n log n) time",
            "fraction": -50,
            "feedback": "No — it makes O(log n) comparisons."
          },
          {
            "text": "It works on unsorted arrays",
            "fraction": -50,
            "feedback": "No — it requires sorted input."
          }
        ],
        "generalFeedback": "Fibonacci search: O(log n) comparisons, sorted input, division-free split points via Fibonacci numbers, O(1) space.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Fibonacci search needs sorting",
        "text": "<p>Fibonacci search requires the input array to be sorted.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it relies on order to eliminate part of the range."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — like binary search, it needs sorted input."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Fibonacci search uses division",
        "text": "<p>Fibonacci search must perform a division to compute each split point.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — it advances indices using additions and subtractions of Fibonacci numbers, avoiding division."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — it needs only addition and subtraction, no division."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Fibonacci search number sequence",
        "text": "<p>The split points of this search are chosen using numbers from the ______ sequence. Name it (one word).</p>",
        "answers": [
          {
            "text": "Fibonacci",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "Fib*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "費氏搜尋核心機制",
        "text": "<p>下列何者最能描述費氏搜尋的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "使用由費氏數列導出的分割點來縮小已排序範圍,而非總是對半縮小",
            "fraction": 100,
            "feedback": "正確 —— 連續的費氏數決定探測位置。"
          },
          {
            "text": "從頭開始依序掃描每個元素",
            "fraction": 0,
            "feedback": "那是線性搜尋。"
          },
          {
            "text": "總是比較正中間元素以將區間對半",
            "fraction": 0,
            "feedback": "那是二分搜尋;費氏搜尋以費氏數分割,並非剛好對半。"
          },
          {
            "text": "依據目標的數值估算探測位置",
            "fraction": 0,
            "feedback": "那是內插搜尋。"
          }
        ],
        "generalFeedback": "費氏搜尋使用連續費氏數來選擇分割點,並偏向檢查範圍前段的元素。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "費氏搜尋複雜度",
        "text": "<p>對 n 個元素,費氏搜尋在最差情況下需要多少比較次數(時間複雜度)?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 與二分搜尋相同,以對數方式縮小範圍。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是線性搜尋;費氏搜尋為對數級。"
          },
          {
            "text": "O(log log n)",
            "fraction": 0,
            "feedback": "那是內插搜尋在均勻分布資料上的平均情況。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "太大了;費氏搜尋為 O(log n)。"
          }
        ],
        "generalFeedback": "費氏搜尋每步以固定比例縮小區間,因此需要 O(log n) 次比較。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "費氏搜尋前提條件",
        "text": "<p>為使費氏搜尋正確運作,輸入必須滿足哪個<strong>前提條件</strong>?</p>",
        "answers": [
          {
            "text": "陣列必須已排序",
            "fraction": 100,
            "feedback": "正確 —— 與二分搜尋相同,仰賴順序來捨棄部分範圍。"
          },
          {
            "text": "陣列必須未排序",
            "fraction": 0,
            "feedback": "錯 —— 需要順序。"
          },
          {
            "text": "數值必須均勻分布",
            "fraction": 0,
            "feedback": "那對內插搜尋才重要,而非費氏搜尋。"
          },
          {
            "text": "陣列長度本身必須是費氏數",
            "fraction": 0,
            "feedback": "錯 —— 演算法只是取不小於 n 的最小費氏數;長度不必是費氏數。"
          }
        ],
        "generalFeedback": "費氏搜尋需要已排序陣列;接著僅用費氏數來挑選分割點。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "費氏搜尋的優勢",
        "text": "<p>相較於二分搜尋,費氏搜尋的獨特優勢為何?</p>",
        "answers": [
          {
            "text": "它只用加法與減法計算分割點,避免使用除法",
            "fraction": 100,
            "feedback": "正確 —— 在除法或中點索引計算成本高昂的年代特別有用。"
          },
          {
            "text": "它可在未排序資料上運作",
            "fraction": 0,
            "feedback": "錯 —— 它仍需要已排序陣列。"
          },
          {
            "text": "它達到 O(1) 最差情況時間",
            "fraction": 0,
            "feedback": "錯 —— 它是 O(log n),與二分搜尋相同。"
          },
          {
            "text": "它完全不需要任何比較",
            "fraction": 0,
            "feedback": "錯 —— 它仍需將元素與目標比較。"
          }
        ],
        "generalFeedback": "費氏搜尋以費氏數的加減來推進索引,因此不需除法即可找到分割位置。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "費氏搜尋特性",
        "text": "<p>關於費氏搜尋,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它需要已排序陣列",
            "fraction": 50,
            "feedback": "正確 —— 需要順序才能捨棄部分範圍。"
          },
          {
            "text": "它只用加法與減法(不用除法)來找分割點",
            "fraction": 50,
            "feedback": "正確 —— 這是它的歷史賣點。"
          },
          {
            "text": "它以 O(n log n) 時間執行",
            "fraction": -50,
            "feedback": "錯 —— 它做 O(log n) 次比較。"
          },
          {
            "text": "它可在未排序陣列上運作",
            "fraction": -50,
            "feedback": "錯 —— 它需要已排序輸入。"
          }
        ],
        "generalFeedback": "費氏搜尋:O(log n) 次比較、已排序輸入、以費氏數提供免除法的分割點、O(1) 空間。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "費氏搜尋是否需要排序",
        "text": "<p>費氏搜尋需要輸入陣列已排序。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它仰賴順序來排除部分範圍。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 與二分搜尋相同,它需要已排序輸入。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "費氏搜尋是否使用除法",
        "text": "<p>費氏搜尋必須執行除法來計算每個分割點。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 它以費氏數的加減來推進索引,避免除法。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 它只需加法與減法,不用除法。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "費氏搜尋所用的數列",
        "text": "<p>此搜尋法的分割點是使用 ______ 數列中的數字來選擇。請以一個英文單字命名它。</p>",
        "answers": [
          {
            "text": "Fibonacci",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "Fib*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "search-interpolation": {
    "en": [
      {
        "type": "multichoice",
        "name": "Interpolation search core mechanism",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of interpolation search?</p>",
        "answers": [
          {
            "text": "Estimate the probe position from the target's value relative to the range endpoints, like looking up a name in a phone book",
            "fraction": 100,
            "feedback": "Correct — it interpolates where the target likely lies rather than always probing the middle."
          },
          {
            "text": "Always compare the exact middle element to halve the interval",
            "fraction": 0,
            "feedback": "That is binary search; interpolation search predicts a position from the value."
          },
          {
            "text": "Scan every element in order from the start",
            "fraction": 0,
            "feedback": "That is linear search."
          },
          {
            "text": "Split the range using Fibonacci numbers",
            "fraction": 0,
            "feedback": "That is Fibonacci search."
          }
        ],
        "generalFeedback": "Interpolation search computes a probe index by interpolating the target value between the low and high key values — a dictionary/phone-book style lookup.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Interpolation search average case",
        "text": "<p>On sorted, <strong>uniformly distributed</strong> numeric data, what is the <strong>average-case</strong> time complexity of interpolation search?</p>",
        "answers": [
          {
            "text": "O(log log n)",
            "fraction": 100,
            "feedback": "Correct — on uniform data the estimate is very accurate, giving O(log log n)."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "That is binary search; interpolation does better on uniform data."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is the worst case on skewed data, not the uniform-data average."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "Too optimistic; the average is O(log log n)."
          }
        ],
        "generalFeedback": "When keys are uniformly distributed the value-based estimate lands very close to the target, giving an average of O(log log n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Interpolation search worst case",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of interpolation search on skewed / non-uniform data?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — a badly skewed distribution makes each estimate poor, degrading to a linear scan."
          },
          {
            "text": "O(log log n)",
            "fraction": 0,
            "feedback": "That is only the average on uniformly distributed data."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "No — unlike binary search, interpolation can degrade to O(n) on skewed data."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "Far too optimistic for the worst case."
          }
        ],
        "generalFeedback": "If the data is highly non-uniform the interpolated probe is repeatedly off, so the worst case is O(n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Interpolation search preconditions",
        "text": "<p>Under which conditions does interpolation search perform best?</p>",
        "answers": [
          {
            "text": "The data is sorted and its values are roughly uniformly distributed",
            "fraction": 100,
            "feedback": "Correct — sorting is required, and uniform values make the estimate accurate."
          },
          {
            "text": "The data is unsorted but uniformly distributed",
            "fraction": 0,
            "feedback": "No — like binary search it still requires sorted input."
          },
          {
            "text": "The data is sorted but heavily skewed",
            "fraction": 0,
            "feedback": "Skew hurts it — that is the O(n) worst case."
          },
          {
            "text": "Any unsorted array",
            "fraction": 0,
            "feedback": "No — it requires sorted input to interpolate a position."
          }
        ],
        "generalFeedback": "Interpolation search requires sorted input and shines when values are uniformly distributed; skew degrades it toward O(n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Interpolation search properties",
        "text": "<p>Which statements about interpolation search are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It requires the input to be sorted",
            "fraction": 50,
            "feedback": "Yes — it interpolates a position within an ordered range."
          },
          {
            "text": "Its average is O(log log n) on uniform data but its worst case is O(n) on skewed data",
            "fraction": 50,
            "feedback": "Yes — performance depends heavily on the distribution."
          },
          {
            "text": "It works correctly on unsorted arrays",
            "fraction": -50,
            "feedback": "No — it requires sorted input."
          },
          {
            "text": "It guarantees O(log n) even on highly skewed data",
            "fraction": -50,
            "feedback": "No — on skewed data it can degrade to O(n)."
          }
        ],
        "generalFeedback": "Interpolation search: sorted input, value-based probing, O(log log n) average on uniform data, O(n) worst case, O(1) space.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Interpolation search needs sorting",
        "text": "<p>Interpolation search requires the input array to be sorted.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it interpolates a probe position within an ordered range."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — sorted input is required."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Interpolation vs binary on skewed data",
        "text": "<p>Interpolation search is always faster than binary search, even on highly skewed data.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — on skewed / non-uniform data it can degrade to O(n), worse than binary search's O(log n)."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — its advantage holds only on uniformly distributed data."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Interpolation search estimation term",
        "text": "<p>This search estimates the probe position by linear ______ of the target value between the range endpoints. Give the one-word term.</p>",
        "answers": [
          {
            "text": "interpolation",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "interpol*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "內插搜尋核心機制",
        "text": "<p>下列何者最能描述內插搜尋的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "依據目標值相對於範圍端點的位置來估算探測位置,就像在電話簿中查名字一樣",
            "fraction": 100,
            "feedback": "正確 —— 它內插目標可能所在之處,而非總是探測中間。"
          },
          {
            "text": "總是比較正中間元素以將區間對半",
            "fraction": 0,
            "feedback": "那是二分搜尋;內插搜尋依數值預測位置。"
          },
          {
            "text": "從頭開始依序掃描每個元素",
            "fraction": 0,
            "feedback": "那是線性搜尋。"
          },
          {
            "text": "使用費氏數列分割範圍",
            "fraction": 0,
            "feedback": "那是費氏搜尋。"
          }
        ],
        "generalFeedback": "內插搜尋以目標值在最低與最高鍵值之間的內插來計算探測索引 —— 一種字典/電話簿式的查找。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "內插搜尋平均情況",
        "text": "<p>在已排序且<strong>均勻分布</strong>的數值資料上,內插搜尋的<strong>平均情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log log n)",
            "fraction": 100,
            "feedback": "正確 —— 在均勻資料上估算非常精準,得到 O(log log n)。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "那是二分搜尋;在均勻資料上內插搜尋更好。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是在偏斜資料上的最差情況,不是均勻資料的平均。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "太樂觀了;平均為 O(log log n)。"
          }
        ],
        "generalFeedback": "當鍵值均勻分布時,依數值的估算會非常接近目標,平均為 O(log log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "內插搜尋最差情況",
        "text": "<p>在偏斜/非均勻資料上,內插搜尋的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 嚴重偏斜的分布使每次估算都很差,退化為線性掃描。"
          },
          {
            "text": "O(log log n)",
            "fraction": 0,
            "feedback": "那只是均勻分布資料上的平均情況。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "錯 —— 與二分搜尋不同,內插搜尋在偏斜資料上可能退化為 O(n)。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "對最差情況而言太樂觀了。"
          }
        ],
        "generalFeedback": "若資料高度非均勻,內插的探測會一再偏離,因此最差情況為 O(n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "內插搜尋前提條件",
        "text": "<p>在哪種條件下內插搜尋表現最佳?</p>",
        "answers": [
          {
            "text": "資料已排序,且其數值大致均勻分布",
            "fraction": 100,
            "feedback": "正確 —— 需要排序,而均勻的數值使估算精準。"
          },
          {
            "text": "資料未排序但均勻分布",
            "fraction": 0,
            "feedback": "錯 —— 與二分搜尋相同,它仍需已排序輸入。"
          },
          {
            "text": "資料已排序但嚴重偏斜",
            "fraction": 0,
            "feedback": "偏斜會傷害它 —— 那是 O(n) 最差情況。"
          },
          {
            "text": "任何未排序陣列",
            "fraction": 0,
            "feedback": "錯 —— 它需要已排序輸入才能內插位置。"
          }
        ],
        "generalFeedback": "內插搜尋需要已排序輸入,並在數值均勻分布時表現出色;偏斜會使它退化趨近 O(n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "內插搜尋特性",
        "text": "<p>關於內插搜尋,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它需要輸入已排序",
            "fraction": 50,
            "feedback": "正確 —— 它在有序範圍內內插位置。"
          },
          {
            "text": "在均勻資料上平均為 O(log log n),但在偏斜資料上最差為 O(n)",
            "fraction": 50,
            "feedback": "正確 —— 效能高度取決於分布。"
          },
          {
            "text": "它在未排序陣列上也能正確運作",
            "fraction": -50,
            "feedback": "錯 —— 它需要已排序輸入。"
          },
          {
            "text": "即使在高度偏斜資料上也保證 O(log n)",
            "fraction": -50,
            "feedback": "錯 —— 在偏斜資料上它可能退化為 O(n)。"
          }
        ],
        "generalFeedback": "內插搜尋:已排序輸入、依數值探測、均勻資料平均 O(log log n)、最差 O(n)、O(1) 空間。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "內插搜尋是否需要排序",
        "text": "<p>內插搜尋需要輸入陣列已排序。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它在有序範圍內內插探測位置。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 需要已排序輸入。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "偏斜資料上內插與二分之比較",
        "text": "<p>內插搜尋永遠比二分搜尋快,即使在高度偏斜的資料上也是如此。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 在偏斜/非均勻資料上它可能退化為 O(n),比二分搜尋的 O(log n) 更差。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 它的優勢只在均勻分布資料上成立。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "內插搜尋估算名詞",
        "text": "<p>此搜尋法透過將目標值在範圍端點之間做線性 ______ 來估算探測位置。請以一個英文單字作答。</p>",
        "answers": [
          {
            "text": "interpolation",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "interpol*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "search-kmp": {
    "en": [
      {
        "type": "multichoice",
        "name": "KMP purpose",
        "text": "<p>What problem does the <strong>Knuth-Morris-Pratt (KMP)</strong> algorithm solve?</p>",
        "answers": [
          {
            "text": "Finding all occurrences of a pattern string inside a text string",
            "fraction": 100,
            "feedback": "Correct — KMP is a single-pattern exact string-matching algorithm."
          },
          {
            "text": "Sorting a text string into lexicographic order",
            "fraction": 0,
            "feedback": "No — KMP does not sort; it searches for a pattern."
          },
          {
            "text": "Compressing a text string",
            "fraction": 0,
            "feedback": "No — that is data compression, unrelated to KMP."
          },
          {
            "text": "Computing the edit distance between two strings",
            "fraction": 0,
            "feedback": "No — that is dynamic-programming alignment, not KMP."
          }
        ],
        "generalFeedback": "KMP locates every occurrence of a pattern of length m within a text of length n using a precomputed failure function.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "KMP search time",
        "text": "<p>What is the <strong>worst-case</strong> total time complexity of KMP (preprocessing plus search)?</p>",
        "answers": [
          {
            "text": "O(n + m)",
            "fraction": 100,
            "feedback": "Correct — building the table is O(m) and the scan is O(n), giving guaranteed linear time."
          },
          {
            "text": "O(n &times; m)",
            "fraction": 0,
            "feedback": "No — that is the naive brute-force worst case; KMP avoids it via the failure function."
          },
          {
            "text": "O(n log m)",
            "fraction": 0,
            "feedback": "No — KMP has no logarithmic factor."
          },
          {
            "text": "O(m^2)",
            "fraction": 0,
            "feedback": "No — even the table construction is linear O(m)."
          }
        ],
        "generalFeedback": "KMP is optimal for single-pattern search: O(m) preprocessing plus O(n) scanning equals O(n + m) worst case.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "KMP space",
        "text": "<p>How much extra space does KMP use for its prefix/failure table?</p>",
        "answers": [
          {
            "text": "O(m)",
            "fraction": 100,
            "feedback": "Correct — the failure function stores one entry per pattern character."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "No — the table depends on the pattern length m, not the text length n."
          },
          {
            "text": "O(n + m)",
            "fraction": 0,
            "feedback": "No — no per-text-character table is stored."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "No — the failure table needs m entries."
          }
        ],
        "generalFeedback": "KMP precomputes an LPS/failure array of length m, so extra space is O(m).",
        "single": true
      },
      {
        "type": "shortanswer",
        "name": "LPS acronym",
        "text": "<p>KMP's failure function stores, for each prefix, the length of the longest proper prefix that is also a ______ of that prefix. Give the missing word.</p>",
        "answers": [
          {
            "text": "suffix",
            "fraction": 100,
            "feedback": "Correct — LPS = Longest Proper Prefix which is also a Suffix."
          },
          {
            "text": "suffix*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "KMP when to use",
        "text": "<p>When is KMP the best fit?</p>",
        "answers": [
          {
            "text": "When you need a guaranteed linear-time single-pattern search with no risk of quadratic blowup",
            "fraction": 100,
            "feedback": "Correct — KMP's worst-case O(n + m) guarantee is its main selling point."
          },
          {
            "text": "When you must search for hundreds of patterns at once",
            "fraction": 0,
            "feedback": "No — that favors Rabin-Karp's multi-pattern hashing."
          },
          {
            "text": "When the alphabet is huge and you want maximum average-case skipping",
            "fraction": 0,
            "feedback": "No — large-skip behavior is Boyer-Moore's niche."
          },
          {
            "text": "When you need to sort the text",
            "fraction": 0,
            "feedback": "No — KMP does not sort."
          }
        ],
        "generalFeedback": "Choose KMP when a hard worst-case linear guarantee for one pattern matters more than average-case skipping.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "KMP no text backtracking",
        "text": "<p>During the search phase, KMP never moves the <em>text</em> pointer backward: on a mismatch it only shifts the pattern using the failure table.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — the text index only advances; the failure function repositions the pattern instead."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — never backtracking the text is exactly what makes KMP linear."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "KMP right to left claim",
        "text": "<p>KMP compares the pattern against the text from <em>right to left</em> within each alignment.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — that describes Boyer-Moore; KMP compares left to right."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — KMP scans left to right; right-to-left comparison is Boyer-Moore."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "multichoice",
        "name": "KMP properties multi",
        "text": "<p>Which statements about KMP are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It guarantees O(n + m) time even on adversarial inputs",
            "fraction": 50,
            "feedback": "Yes — KMP's linear bound is worst-case, not just average."
          },
          {
            "text": "The failure table lets it reuse already-matched characters after a mismatch",
            "fraction": 50,
            "feedback": "Yes — that reuse is why the text pointer never backs up."
          },
          {
            "text": "It requires O(n) extra space proportional to the text length",
            "fraction": -50,
            "feedback": "No — extra space is O(m), tied to the pattern length."
          },
          {
            "text": "It skips ahead using a bad-character heuristic",
            "fraction": -50,
            "feedback": "No — the bad-character heuristic belongs to Boyer-Moore."
          }
        ],
        "generalFeedback": "KMP: guaranteed O(n + m) time, O(m) space, reuses matched prefixes via the failure function; heuristic skipping is Boyer-Moore.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "KMP 用途",
        "text": "<p><strong>Knuth-Morris-Pratt(KMP)</strong>演算法解決什麼問題?</p>",
        "answers": [
          {
            "text": "在文字字串中找出樣式字串的所有出現位置",
            "fraction": 100,
            "feedback": "正確 —— KMP 是單一樣式的精確字串比對演算法。"
          },
          {
            "text": "將文字字串依字典順序排序",
            "fraction": 0,
            "feedback": "錯 —— KMP 不排序,而是搜尋樣式。"
          },
          {
            "text": "壓縮文字字串",
            "fraction": 0,
            "feedback": "錯 —— 那是資料壓縮,與 KMP 無關。"
          },
          {
            "text": "計算兩個字串之間的編輯距離",
            "fraction": 0,
            "feedback": "錯 —— 那是動態規劃對齊,不是 KMP。"
          }
        ],
        "generalFeedback": "KMP 使用預先計算的失敗函數,在長度 n 的文字中找出長度 m 樣式的每一次出現。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "KMP 搜尋時間",
        "text": "<p>KMP 的<strong>最差情況</strong>總時間複雜度(前處理加搜尋)為何?</p>",
        "answers": [
          {
            "text": "O(n + m)",
            "fraction": 100,
            "feedback": "正確 —— 建表為 O(m)、掃描為 O(n),保證線性時間。"
          },
          {
            "text": "O(n &times; m)",
            "fraction": 0,
            "feedback": "錯 —— 那是樸素暴力法的最差情況;KMP 透過失敗函數避免它。"
          },
          {
            "text": "O(n log m)",
            "fraction": 0,
            "feedback": "錯 —— KMP 沒有對數因子。"
          },
          {
            "text": "O(m^2)",
            "fraction": 0,
            "feedback": "錯 —— 連建表都是線性 O(m)。"
          }
        ],
        "generalFeedback": "KMP 對單一樣式搜尋是最佳的:O(m) 前處理加 O(n) 掃描等於 O(n + m) 最差情況。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "KMP 空間",
        "text": "<p>KMP 的前綴/失敗表使用多少額外空間?</p>",
        "answers": [
          {
            "text": "O(m)",
            "fraction": 100,
            "feedback": "正確 —— 失敗函數為每個樣式字元存一個項目。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "錯 —— 該表取決於樣式長度 m,而非文字長度 n。"
          },
          {
            "text": "O(n + m)",
            "fraction": 0,
            "feedback": "錯 —— 不會為每個文字字元儲存表。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "錯 —— 失敗表需要 m 個項目。"
          }
        ],
        "generalFeedback": "KMP 預先計算長度 m 的 LPS/失敗陣列,因此額外空間為 O(m)。",
        "single": true
      },
      {
        "type": "shortanswer",
        "name": "LPS 縮寫",
        "text": "<p>KMP 的失敗函數為每個前綴儲存「最長的、既是真前綴又是該前綴之 ______」的長度。請填入缺少的英文單字。</p>",
        "answers": [
          {
            "text": "suffix",
            "fraction": 100,
            "feedback": "正確 —— LPS = Longest Proper Prefix which is also a Suffix(最長相同真前綴後綴)。"
          },
          {
            "text": "suffix*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "KMP 何時使用",
        "text": "<p>KMP 在什麼情況下最適用?</p>",
        "answers": [
          {
            "text": "當你需要單一樣式、保證線性時間且無退化為平方風險的搜尋",
            "fraction": 100,
            "feedback": "正確 —— KMP 的最差情況 O(n + m) 保證是其主要賣點。"
          },
          {
            "text": "當你必須一次搜尋數百個樣式",
            "fraction": 0,
            "feedback": "錯 —— 那有利於 Rabin-Karp 的多樣式雜湊。"
          },
          {
            "text": "當字母集很大且你想要最大的平均情況跳躍",
            "fraction": 0,
            "feedback": "錯 —— 大幅跳躍是 Boyer-Moore 的專長。"
          },
          {
            "text": "當你需要將文字排序時",
            "fraction": 0,
            "feedback": "錯 —— KMP 不排序。"
          }
        ],
        "generalFeedback": "當單一樣式的最差情況線性保證比平均情況跳躍更重要時,選擇 KMP。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "KMP 不回溯文字",
        "text": "<p>在搜尋階段,KMP 從不將<em>文字</em>指標往回移動:遇到不匹配時,只用失敗表移動樣式。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 文字索引只前進;失敗函數改為重新定位樣式。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 從不回溯文字正是 KMP 達到線性時間的關鍵。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "KMP 由右至左的說法",
        "text": "<p>在每個對齊位置,KMP 是由<em>右至左</em>將樣式與文字比對。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 那描述的是 Boyer-Moore;KMP 是由左至右比對。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— KMP 由左至右掃描;由右至左比對是 Boyer-Moore。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "multichoice",
        "name": "KMP 性質複選",
        "text": "<p>關於 KMP,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "即使面對刻意設計的輸入,也保證 O(n + m) 時間",
            "fraction": 50,
            "feedback": "正確 —— KMP 的線性界是最差情況,不僅是平均。"
          },
          {
            "text": "失敗表讓它在不匹配後能重用已比對過的字元",
            "fraction": 50,
            "feedback": "正確 —— 這種重用正是文字指標從不回退的原因。"
          },
          {
            "text": "它需要與文字長度成正比的 O(n) 額外空間",
            "fraction": -50,
            "feedback": "錯 —— 額外空間為 O(m),與樣式長度相關。"
          },
          {
            "text": "它使用壞字元啟發式來向前跳躍",
            "fraction": -50,
            "feedback": "錯 —— 壞字元啟發式屬於 Boyer-Moore。"
          }
        ],
        "generalFeedback": "KMP:保證 O(n + m) 時間、O(m) 空間,透過失敗函數重用已比對前綴;啟發式跳躍是 Boyer-Moore。",
        "single": false
      }
    ]
  },
  "search-linear": {
    "en": [
      {
        "type": "multichoice",
        "name": "Linear search core mechanism",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of linear search?</p>",
        "answers": [
          {
            "text": "Scan elements one by one from the start, comparing each with the target until a match is found or the end is reached",
            "fraction": 100,
            "feedback": "Correct — a sequential scan of every element in order."
          },
          {
            "text": "Repeatedly halve the search interval by comparing the middle element",
            "fraction": 0,
            "feedback": "That is binary search, which needs a sorted array."
          },
          {
            "text": "Estimate the probe position from the target's value",
            "fraction": 0,
            "feedback": "That is interpolation search."
          },
          {
            "text": "Split the range using Fibonacci numbers",
            "fraction": 0,
            "feedback": "That is Fibonacci search."
          }
        ],
        "generalFeedback": "Linear (sequential) search simply walks through the collection comparing each element to the target.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Linear search worst case",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of linear search over n elements?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — in the worst case every element must be examined."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "That requires a sorted array and halving (binary search)."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "That is the best case, when the target is the first element."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Too large; a single scan is O(n)."
          }
        ],
        "generalFeedback": "The target may be absent or last, forcing a full scan, so the worst case is O(n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Linear search best case",
        "text": "<p>What is the <strong>best-case</strong> time complexity of linear search?</p>",
        "answers": [
          {
            "text": "O(1)",
            "fraction": 100,
            "feedback": "Correct — the target is found at the very first position."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is the worst case, not the best."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "Linear search does not halve the range."
          },
          {
            "text": "O(log log n)",
            "fraction": 0,
            "feedback": "That is interpolation search's average on uniform data."
          }
        ],
        "generalFeedback": "If the first element checked is the target, the search finishes in constant time.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Linear search preconditions",
        "text": "<p>What ordering <strong>precondition</strong> does linear search require on its input?</p>",
        "answers": [
          {
            "text": "None — it works on unsorted data",
            "fraction": 100,
            "feedback": "Correct — linear search makes no assumption about ordering."
          },
          {
            "text": "The array must be sorted in ascending order",
            "fraction": 0,
            "feedback": "No — that is required by binary and Fibonacci search, not linear search."
          },
          {
            "text": "The values must be uniformly distributed",
            "fraction": 0,
            "feedback": "No — that helps interpolation search, not linear search."
          },
          {
            "text": "The array must support O(1) random access",
            "fraction": 0,
            "feedback": "No — linear search works even on linked lists with only sequential access."
          }
        ],
        "generalFeedback": "Because it just walks through elements, linear search needs no sorting or random access — it is the only option for unsorted or linked data without extra structure.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Linear search properties",
        "text": "<p>Which statements about linear search are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It works on unsorted data with no ordering precondition",
            "fraction": 50,
            "feedback": "Yes — no sorting is needed."
          },
          {
            "text": "It can search a singly linked list, which lacks O(1) random access",
            "fraction": 50,
            "feedback": "Yes — sequential access is enough."
          },
          {
            "text": "It runs in O(log n) time in the worst case",
            "fraction": -50,
            "feedback": "No — its worst case is O(n)."
          },
          {
            "text": "It requires the array to be sorted first",
            "fraction": -50,
            "feedback": "No — linear search has no sorting precondition."
          }
        ],
        "generalFeedback": "Linear search: O(n) worst case, no ordering requirement, works on unsorted and linked data.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Linear search needs sorting",
        "text": "<p>Linear search requires the array to be sorted before it can run.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — linear search works on unsorted data."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — no ordering precondition is needed."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Linear search space",
        "text": "<p>Linear search uses only O(1) extra (auxiliary) space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it needs only a constant number of variables."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Linear search keeps just an index, so its extra space is O(1)."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Linear search complexity term",
        "text": "<p>Because its running time grows in direct proportion to n, linear search is said to run in ______ time. Give the one-word adjective.</p>",
        "answers": [
          {
            "text": "linear",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "linear*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — linear time is O(n)."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "線性搜尋核心機制",
        "text": "<p>下列何者最能描述線性搜尋的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "從頭開始逐一掃描每個元素,將其與目標比較,直到找到相符者或掃描到結尾",
            "fraction": 100,
            "feedback": "正確 —— 依序掃描每個元素。"
          },
          {
            "text": "反覆比較中間元素以將搜尋區間對半縮小",
            "fraction": 0,
            "feedback": "那是二分搜尋,需要已排序的陣列。"
          },
          {
            "text": "依據目標的數值估算探測位置",
            "fraction": 0,
            "feedback": "那是內插搜尋。"
          },
          {
            "text": "使用費氏數列分割範圍",
            "fraction": 0,
            "feedback": "那是費氏搜尋。"
          }
        ],
        "generalFeedback": "線性(循序)搜尋就是逐一走訪集合中的每個元素,並與目標比較。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線性搜尋最差情況",
        "text": "<p>對 n 個元素進行線性搜尋,其<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 最差情況必須檢查每個元素。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "那需要已排序陣列並採用對半縮小(二分搜尋)。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "那是最佳情況,當目標為第一個元素時。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "太大了;單次掃描為 O(n)。"
          }
        ],
        "generalFeedback": "目標可能不存在或位於最後,迫使完整掃描,因此最差情況為 O(n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線性搜尋最佳情況",
        "text": "<p>線性搜尋的<strong>最佳情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(1)",
            "fraction": 100,
            "feedback": "正確 —— 目標剛好位於第一個位置。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是最差情況,不是最佳。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "線性搜尋不會對半縮小範圍。"
          },
          {
            "text": "O(log log n)",
            "fraction": 0,
            "feedback": "那是內插搜尋在均勻分布資料上的平均情況。"
          }
        ],
        "generalFeedback": "若第一個檢查的元素即為目標,搜尋在常數時間內完成。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線性搜尋前提條件",
        "text": "<p>線性搜尋對其輸入需要哪種排序<strong>前提條件</strong>?</p>",
        "answers": [
          {
            "text": "不需要 —— 它可在未排序的資料上運作",
            "fraction": 100,
            "feedback": "正確 —— 線性搜尋不對排序做任何假設。"
          },
          {
            "text": "陣列必須以遞增順序排序",
            "fraction": 0,
            "feedback": "錯 —— 那是二分與費氏搜尋的要求,不是線性搜尋。"
          },
          {
            "text": "數值必須均勻分布",
            "fraction": 0,
            "feedback": "錯 —— 那有助於內插搜尋,而非線性搜尋。"
          },
          {
            "text": "陣列必須支援 O(1) 隨機存取",
            "fraction": 0,
            "feedback": "錯 —— 線性搜尋即使在僅有循序存取的鏈結串列上也能運作。"
          }
        ],
        "generalFeedback": "由於只是逐一走訪元素,線性搜尋不需排序或隨機存取 —— 對於未排序或鏈結資料且無額外結構時,它是唯一選擇。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線性搜尋特性",
        "text": "<p>關於線性搜尋,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它可在未排序資料上運作,沒有排序前提",
            "fraction": 50,
            "feedback": "正確 —— 不需要排序。"
          },
          {
            "text": "它可搜尋不具 O(1) 隨機存取的單向鏈結串列",
            "fraction": 50,
            "feedback": "正確 —— 只要有循序存取即可。"
          },
          {
            "text": "它在最差情況下以 O(log n) 時間執行",
            "fraction": -50,
            "feedback": "錯 —— 其最差情況為 O(n)。"
          },
          {
            "text": "它需要先將陣列排序",
            "fraction": -50,
            "feedback": "錯 —— 線性搜尋沒有排序前提。"
          }
        ],
        "generalFeedback": "線性搜尋:最差情況 O(n)、沒有排序需求、可用於未排序與鏈結資料。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "線性搜尋是否需要排序",
        "text": "<p>線性搜尋在執行前需要先將陣列排序。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 線性搜尋可在未排序資料上運作。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 不需要任何排序前提。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "線性搜尋空間",
        "text": "<p>線性搜尋僅使用 O(1) 的額外(輔助)空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 只需常數個變數。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "線性搜尋只保存一個索引,額外空間為 O(1)。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "線性搜尋複雜度名詞",
        "text": "<p>由於執行時間與 n 成正比增長,線性搜尋被稱為以 ______ 時間執行。請以一個英文形容詞作答。</p>",
        "answers": [
          {
            "text": "linear",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "linear*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 線性時間即 O(n)。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "search-rk": {
    "en": [
      {
        "type": "multichoice",
        "name": "Rabin-Karp core idea",
        "text": "<p>What is the central mechanism of the <strong>Rabin-Karp</strong> algorithm?</p>",
        "answers": [
          {
            "text": "A rolling hash that compares each length-m window's hash against the pattern's hash",
            "fraction": 100,
            "feedback": "Correct — hashing turns each window comparison into an O(1) check."
          },
          {
            "text": "A failure function that avoids text backtracking",
            "fraction": 0,
            "feedback": "No — that is KMP."
          },
          {
            "text": "Right-to-left comparison with a bad-character rule",
            "fraction": 0,
            "feedback": "No — that is Boyer-Moore."
          },
          {
            "text": "Sorting the text and binary searching",
            "fraction": 0,
            "feedback": "No — Rabin-Karp does not sort."
          }
        ],
        "generalFeedback": "Rabin-Karp hashes the pattern once, then slides a rolling hash over the text so each window's hash updates in O(1).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp rolling hash cost",
        "text": "<p>Thanks to the rolling hash, how much work does Rabin-Karp do to update the window hash when it slides by one position?</p>",
        "answers": [
          {
            "text": "O(1) per step",
            "fraction": 100,
            "feedback": "Correct — the rolling hash removes the outgoing character and adds the incoming one in constant time."
          },
          {
            "text": "O(m) per step",
            "fraction": 0,
            "feedback": "No — recomputing from scratch would be O(m); the rolling hash avoids that."
          },
          {
            "text": "O(log m) per step",
            "fraction": 0,
            "feedback": "No — the update is constant time, not logarithmic."
          },
          {
            "text": "O(n) per step",
            "fraction": 0,
            "feedback": "No — each slide is O(1), not O(n)."
          }
        ],
        "generalFeedback": "The rolling hash updates in O(1) by subtracting the leaving character's contribution and adding the entering character's.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp complexity",
        "text": "<p>What are Rabin-Karp's <strong>average</strong> and <strong>worst-case</strong> time complexities?</p>",
        "answers": [
          {
            "text": "Average O(n + m), worst O(n &times; m)",
            "fraction": 100,
            "feedback": "Correct — worst case arises when hash collisions force verifying every window."
          },
          {
            "text": "Average O(n + m), worst O(n + m)",
            "fraction": 0,
            "feedback": "No — that is KMP; Rabin-Karp's worst case is O(nm) due to collisions."
          },
          {
            "text": "Average O(n/m), worst O(n &times; m)",
            "fraction": 0,
            "feedback": "No — sublinear average is Boyer-Moore, not Rabin-Karp."
          },
          {
            "text": "Average O(log n), worst O(n)",
            "fraction": 0,
            "feedback": "No — Rabin-Karp is linear on average, not logarithmic."
          }
        ],
        "generalFeedback": "Average O(n + m); worst O(nm) when many spurious hash hits force character-by-character verification.",
        "single": true
      },
      {
        "type": "shortanswer",
        "name": "Rolling hash term",
        "text": "<p>Rabin-Karp updates each window's fingerprint in O(1) using a ______ hash. Give the missing word.</p>",
        "answers": [
          {
            "text": "rolling",
            "fraction": 100,
            "feedback": "Correct — the rolling hash."
          },
          {
            "text": "rolling*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp when to use",
        "text": "<p>For which scenario is Rabin-Karp the most natural choice?</p>",
        "answers": [
          {
            "text": "Searching for many patterns of the same length at once (e.g. plagiarism/dedup detection)",
            "fraction": 100,
            "feedback": "Correct — one window hash can be tested against a whole set of pattern hashes."
          },
          {
            "text": "When you need a guaranteed worst-case linear single-pattern search",
            "fraction": 0,
            "feedback": "No — Rabin-Karp's worst case is O(nm); KMP gives the linear guarantee."
          },
          {
            "text": "When you want the largest average-case skips on a big alphabet",
            "fraction": 0,
            "feedback": "No — that is Boyer-Moore."
          },
          {
            "text": "When you must sort the text lexicographically",
            "fraction": 0,
            "feedback": "No — Rabin-Karp does not sort."
          }
        ],
        "generalFeedback": "Rabin-Karp's rolling hash makes checking a window against a set of pattern hashes cheap, so it excels at multi-pattern search.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Rabin-Karp verification",
        "text": "<p>A hash match in Rabin-Karp must still be verified character-by-character, because two different strings can share the same hash (a spurious hit).</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — equal hashes do not guarantee equal strings, so verification is required."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — hash collisions mean a match must be confirmed by direct comparison."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Rabin-Karp multi-pattern",
        "text": "<p>Rabin-Karp is especially well suited to searching for <em>many</em> patterns at once by comparing each window hash against a set of pattern hashes.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — multi-pattern search is Rabin-Karp's standout strength."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — checking one window hash against a set of hashes is exactly why Rabin-Karp shines for multiple patterns."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp properties multi",
        "text": "<p>Which statements about Rabin-Karp are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It excels at searching for multiple patterns simultaneously",
            "fraction": 50,
            "feedback": "Yes — compare each window hash against a set of pattern hashes."
          },
          {
            "text": "Its worst case is O(n &times; m) when hash collisions force many verifications",
            "fraction": 50,
            "feedback": "Yes — frequent spurious hits push it toward the naive bound."
          },
          {
            "text": "A hash match guarantees the strings are equal, so no verification is needed",
            "fraction": -50,
            "feedback": "No — collisions are possible, so matches must be verified."
          },
          {
            "text": "It guarantees O(n + m) worst-case time like KMP",
            "fraction": -50,
            "feedback": "No — its worst case is O(nm); only the average is O(n + m)."
          }
        ],
        "generalFeedback": "Rabin-Karp: great for multiple patterns, average O(n + m), worst O(nm) from collisions, and every hash hit needs verification.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "Rabin-Karp 核心概念",
        "text": "<p><strong>Rabin-Karp</strong> 演算法的核心機制是什麼?</p>",
        "answers": [
          {
            "text": "用滾動雜湊,將每個長度 m 視窗的雜湊值與樣式的雜湊值比較",
            "fraction": 100,
            "feedback": "正確 —— 雜湊把每次視窗比較變成 O(1) 檢查。"
          },
          {
            "text": "用失敗函數避免文字回溯",
            "fraction": 0,
            "feedback": "錯 —— 那是 KMP。"
          },
          {
            "text": "由右至左比對搭配壞字元規則",
            "fraction": 0,
            "feedback": "錯 —— 那是 Boyer-Moore。"
          },
          {
            "text": "將文字排序後做二分搜尋",
            "fraction": 0,
            "feedback": "錯 —— Rabin-Karp 不排序。"
          }
        ],
        "generalFeedback": "Rabin-Karp 先對樣式雜湊一次,再以滾動雜湊滑過文字,使每個視窗的雜湊值以 O(1) 更新。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp 滾動雜湊成本",
        "text": "<p>由於滾動雜湊,Rabin-Karp 每滑動一個位置更新視窗雜湊值需要多少工作量?</p>",
        "answers": [
          {
            "text": "每步 O(1)",
            "fraction": 100,
            "feedback": "正確 —— 滾動雜湊以常數時間移除離開的字元並加入進入的字元。"
          },
          {
            "text": "每步 O(m)",
            "fraction": 0,
            "feedback": "錯 —— 從頭重算才是 O(m);滾動雜湊避免了這點。"
          },
          {
            "text": "每步 O(log m)",
            "fraction": 0,
            "feedback": "錯 —— 更新是常數時間,不是對數。"
          },
          {
            "text": "每步 O(n)",
            "fraction": 0,
            "feedback": "錯 —— 每次滑動是 O(1),不是 O(n)。"
          }
        ],
        "generalFeedback": "滾動雜湊以 O(1) 更新:減去離開字元的貢獻,加上進入字元的貢獻。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp 複雜度",
        "text": "<p>Rabin-Karp 的<strong>平均</strong>與<strong>最差</strong>時間複雜度分別為何?</p>",
        "answers": [
          {
            "text": "平均 O(n + m),最差 O(n &times; m)",
            "fraction": 100,
            "feedback": "正確 —— 最差情況發生在雜湊碰撞迫使驗證每個視窗時。"
          },
          {
            "text": "平均 O(n + m),最差 O(n + m)",
            "fraction": 0,
            "feedback": "錯 —— 那是 KMP;Rabin-Karp 因碰撞最差為 O(nm)。"
          },
          {
            "text": "平均 O(n/m),最差 O(n &times; m)",
            "fraction": 0,
            "feedback": "錯 —— 次線性平均是 Boyer-Moore,不是 Rabin-Karp。"
          },
          {
            "text": "平均 O(log n),最差 O(n)",
            "fraction": 0,
            "feedback": "錯 —— Rabin-Karp 平均是線性,不是對數。"
          }
        ],
        "generalFeedback": "平均 O(n + m);當許多假雜湊命中迫使逐字元驗證時,最差為 O(nm)。",
        "single": true
      },
      {
        "type": "shortanswer",
        "name": "滾動雜湊名詞",
        "text": "<p>Rabin-Karp 使用 ______ 雜湊,以 O(1) 更新每個視窗的指紋。請填入缺少的英文單字。</p>",
        "answers": [
          {
            "text": "rolling",
            "fraction": 100,
            "feedback": "正確 —— 滾動(rolling)雜湊。"
          },
          {
            "text": "rolling*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp 何時使用",
        "text": "<p>Rabin-Karp 對哪種情境是最自然的選擇?</p>",
        "answers": [
          {
            "text": "一次搜尋許多相同長度的樣式(例如抄襲偵測/去重)",
            "fraction": 100,
            "feedback": "正確 —— 一個視窗雜湊值可與一整組樣式雜湊值比對。"
          },
          {
            "text": "當你需要保證最差情況線性的單一樣式搜尋時",
            "fraction": 0,
            "feedback": "錯 —— Rabin-Karp 最差為 O(nm);KMP 才給出線性保證。"
          },
          {
            "text": "當你想在大字母集上取得最大的平均情況跳躍時",
            "fraction": 0,
            "feedback": "錯 —— 那是 Boyer-Moore。"
          },
          {
            "text": "當你必須將文字依字典順序排序時",
            "fraction": 0,
            "feedback": "錯 —— Rabin-Karp 不排序。"
          }
        ],
        "generalFeedback": "Rabin-Karp 的滾動雜湊讓「將視窗與一組樣式雜湊值比對」變得便宜,因此擅長多樣式搜尋。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Rabin-Karp 驗證",
        "text": "<p>Rabin-Karp 中的雜湊相符仍須逐字元驗證,因為兩個不同的字串可能有相同的雜湊值(假命中)。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 雜湊相等不保證字串相等,因此需要驗證。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 雜湊碰撞意味著相符必須以直接比較確認。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Rabin-Karp 多樣式",
        "text": "<p>Rabin-Karp 特別適合一次搜尋<em>多個</em>樣式,做法是將每個視窗雜湊值與一組樣式雜湊值比較。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 多樣式搜尋是 Rabin-Karp 最突出的強項。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 將一個視窗雜湊值與一組雜湊值比對,正是 Rabin-Karp 在多樣式時出色的原因。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "multichoice",
        "name": "Rabin-Karp 性質複選",
        "text": "<p>關於 Rabin-Karp,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它擅長同時搜尋多個樣式",
            "fraction": 50,
            "feedback": "正確 —— 將每個視窗雜湊值與一組樣式雜湊值比較。"
          },
          {
            "text": "當雜湊碰撞迫使大量驗證時,其最差情況為 O(n &times; m)",
            "fraction": 50,
            "feedback": "正確 —— 頻繁的假命中會使它趨近樸素界。"
          },
          {
            "text": "雜湊相符即保證字串相等,因此不需驗證",
            "fraction": -50,
            "feedback": "錯 —— 可能發生碰撞,因此相符必須驗證。"
          },
          {
            "text": "它像 KMP 一樣保證 O(n + m) 最差時間",
            "fraction": -50,
            "feedback": "錯 —— 其最差為 O(nm);只有平均才是 O(n + m)。"
          }
        ],
        "generalFeedback": "Rabin-Karp:擅長多樣式、平均 O(n + m)、因碰撞最差 O(nm),且每次雜湊命中都需驗證。",
        "single": false
      }
    ]
  },
  "search-strcompare": {
    "en": [
      {
        "type": "multichoice",
        "name": "Right-to-left scan",
        "text": "<p>Which classic algorithm compares the pattern against the text <strong>right-to-left</strong>, enabling large skips?</p>",
        "answers": [
          {
            "text": "Boyer-Moore",
            "fraction": 100,
            "feedback": "Correct — its bad-character and good-suffix rules exploit right-to-left scanning."
          },
          {
            "text": "KMP",
            "fraction": 0,
            "feedback": "No — KMP scans left-to-right using its failure function."
          },
          {
            "text": "Rabin-Karp",
            "fraction": 0,
            "feedback": "No — Rabin-Karp compares hashes of left-to-right windows."
          },
          {
            "text": "Naive matching",
            "fraction": 0,
            "feedback": "No — naive matching scans left-to-right with no skips."
          }
        ],
        "generalFeedback": "Boyer-Moore matches from the pattern's end, letting mismatches shift the pattern far ahead.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Rolling hash owner",
        "text": "<p>Which algorithm identifies candidate matches using a <strong>rolling hash</strong>?</p>",
        "answers": [
          {
            "text": "Rabin-Karp",
            "fraction": 100,
            "feedback": "Correct — it slides a rolling hash over the text and compares hash values."
          },
          {
            "text": "KMP",
            "fraction": 0,
            "feedback": "No — KMP uses a prefix/failure function, not hashing."
          },
          {
            "text": "Boyer-Moore",
            "fraction": 0,
            "feedback": "No — Boyer-Moore uses skip tables, not hashing."
          },
          {
            "text": "Z-algorithm",
            "fraction": 0,
            "feedback": "No — the Z-algorithm uses the Z-array, not hashing."
          }
        ],
        "generalFeedback": "Rabin-Karp hashes each text window in O(1) amortized via a rolling hash, then verifies hits.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Failure function owner",
        "text": "<p>Which algorithm precomputes a <strong>prefix/failure function (LPS)</strong> and never backtracks in the text?</p>",
        "answers": [
          {
            "text": "KMP",
            "fraction": 100,
            "feedback": "Correct — the LPS table lets KMP advance the text pointer monotonically."
          },
          {
            "text": "Boyer-Moore",
            "fraction": 0,
            "feedback": "No — Boyer-Moore uses bad-character and good-suffix rules."
          },
          {
            "text": "Rabin-Karp",
            "fraction": 0,
            "feedback": "No — Rabin-Karp relies on hashing, not an LPS table."
          },
          {
            "text": "Naive matching",
            "fraction": 0,
            "feedback": "No — naive matching does backtrack the text pointer."
          }
        ],
        "generalFeedback": "KMP's longest-proper-prefix-suffix (LPS) array tells it how far to shift the pattern without re-reading text.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Properties of Boyer-Moore",
        "text": "<p>Which statements about <strong>Boyer-Moore</strong> are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It scans the pattern right-to-left",
            "fraction": 50,
            "feedback": "Yes — matching starts from the pattern's last character."
          },
          {
            "text": "It achieves sublinear average time with big skips on large alphabets",
            "fraction": 50,
            "feedback": "Yes — the bad-character rule shines when the alphabet is large."
          },
          {
            "text": "It uses a rolling hash to find candidates",
            "fraction": -50,
            "feedback": "No — that is Rabin-Karp."
          },
          {
            "text": "It is the best choice for searching many patterns at once",
            "fraction": -50,
            "feedback": "No — Rabin-Karp (or Aho-Corasick) handles multiple patterns better."
          }
        ],
        "generalFeedback": "Boyer-Moore is a single-pattern method: right-to-left scan, skip heuristics, sublinear on average for large alphabets.",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "Multiple patterns at once",
        "text": "<p>Among these three, which is best suited to searching for <strong>multiple patterns at once</strong> by hashing each pattern?</p>",
        "answers": [
          {
            "text": "Rabin-Karp",
            "fraction": 100,
            "feedback": "Correct — one text hash can be compared against a set of pattern hashes."
          },
          {
            "text": "Boyer-Moore",
            "fraction": 0,
            "feedback": "No — its skip tables are geared to a single pattern."
          },
          {
            "text": "KMP",
            "fraction": 0,
            "feedback": "No — KMP's failure function is built for one pattern."
          }
        ],
        "generalFeedback": "By storing many pattern hashes in a set, Rabin-Karp screens for any of them in one pass.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "All find exact matches",
        "text": "<p>KMP, Boyer-Moore, and Rabin-Karp all solve the <em>exact</em> string matching problem.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — all three report exact occurrences; they differ in strategy."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "All three do find exact matches."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "KMP linear time",
        "text": "<p>KMP runs in O(n + m) worst-case time, and Rabin-Karp runs in O(n + m) on average.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — KMP is linear worst-case; Rabin-Karp is linear on average (worst case O(n*m))."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "KMP is O(n+m) worst-case and Rabin-Karp is O(n+m) average."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Rolling hash algorithm",
        "text": "<p>Name the algorithm that finds candidate matches by comparing a rolling hash of each text window against the pattern's hash.</p>",
        "answers": [
          {
            "text": "Rabin-Karp",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "Rabin*Karp",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "Rabin Karp",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "由右至左掃描",
        "text": "<p>哪一個經典演算法將樣式對文字進行<strong>由右至左</strong>比對,以達成大幅跳躍?</p>",
        "answers": [
          {
            "text": "Boyer-Moore",
            "fraction": 100,
            "feedback": "正確 —— 其壞字元與好後綴規則利用由右至左的掃描。"
          },
          {
            "text": "KMP",
            "fraction": 0,
            "feedback": "錯 —— KMP 使用失敗函數由左至右掃描。"
          },
          {
            "text": "Rabin-Karp",
            "fraction": 0,
            "feedback": "錯 —— Rabin-Karp 比對由左至右視窗的雜湊值。"
          },
          {
            "text": "樸素比對",
            "fraction": 0,
            "feedback": "錯 —— 樸素比對由左至右且不跳躍。"
          }
        ],
        "generalFeedback": "Boyer-Moore 從樣式末端開始比對,讓不匹配時能把樣式大幅前移。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "滾動雜湊的擁有者",
        "text": "<p>哪一個演算法使用<strong>滾動雜湊</strong>來辨識候選比對?</p>",
        "answers": [
          {
            "text": "Rabin-Karp",
            "fraction": 100,
            "feedback": "正確 —— 它在文字上滑動滾動雜湊並比較雜湊值。"
          },
          {
            "text": "KMP",
            "fraction": 0,
            "feedback": "錯 —— KMP 使用前綴/失敗函數,而非雜湊。"
          },
          {
            "text": "Boyer-Moore",
            "fraction": 0,
            "feedback": "錯 —— Boyer-Moore 使用跳躍表,而非雜湊。"
          },
          {
            "text": "Z 演算法",
            "fraction": 0,
            "feedback": "錯 —— Z 演算法使用 Z 陣列,而非雜湊。"
          }
        ],
        "generalFeedback": "Rabin-Karp 以滾動雜湊在攤還 O(1) 內雜湊每個文字視窗,再驗證命中。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "失敗函數的擁有者",
        "text": "<p>哪一個演算法預先計算<strong>前綴/失敗函數(LPS)</strong>,且從不回溯文字?</p>",
        "answers": [
          {
            "text": "KMP",
            "fraction": 100,
            "feedback": "正確 —— LPS 表讓 KMP 的文字指標單調前進。"
          },
          {
            "text": "Boyer-Moore",
            "fraction": 0,
            "feedback": "錯 —— Boyer-Moore 使用壞字元與好後綴規則。"
          },
          {
            "text": "Rabin-Karp",
            "fraction": 0,
            "feedback": "錯 —— Rabin-Karp 依賴雜湊,而非 LPS 表。"
          },
          {
            "text": "樸素比對",
            "fraction": 0,
            "feedback": "錯 —— 樸素比對確實會回溯文字指標。"
          }
        ],
        "generalFeedback": "KMP 的最長真前綴後綴(LPS)陣列告訴它如何移動樣式而不重讀文字。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Boyer-Moore 的特性",
        "text": "<p>關於 <strong>Boyer-Moore</strong>,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它由右至左掃描樣式",
            "fraction": 50,
            "feedback": "正確 —— 比對從樣式的最後一個字元開始。"
          },
          {
            "text": "在大字母集上以大幅跳躍達成次線性平均時間",
            "fraction": 50,
            "feedback": "正確 —— 字母集越大,壞字元規則越有效。"
          },
          {
            "text": "它使用滾動雜湊來尋找候選",
            "fraction": -50,
            "feedback": "錯 —— 那是 Rabin-Karp。"
          },
          {
            "text": "它是同時搜尋多個樣式的最佳選擇",
            "fraction": -50,
            "feedback": "錯 —— Rabin-Karp(或 Aho-Corasick)更適合多樣式。"
          }
        ],
        "generalFeedback": "Boyer-Moore 是單一樣式方法:由右至左掃描、跳躍啟發式、對大字母集平均次線性。",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "同時處理多個樣式",
        "text": "<p>在這三者中,哪一個藉由雜湊每個樣式最適合<strong>同時搜尋多個樣式</strong>?</p>",
        "answers": [
          {
            "text": "Rabin-Karp",
            "fraction": 100,
            "feedback": "正確 —— 一個文字雜湊可與一組樣式雜湊比較。"
          },
          {
            "text": "Boyer-Moore",
            "fraction": 0,
            "feedback": "錯 —— 其跳躍表是為單一樣式設計的。"
          },
          {
            "text": "KMP",
            "fraction": 0,
            "feedback": "錯 —— KMP 的失敗函數是為單一樣式建立的。"
          }
        ],
        "generalFeedback": "將多個樣式雜湊存於集合中,Rabin-Karp 可在一次掃描中篩選其中任一者。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "三者都找精確比對",
        "text": "<p>KMP、Boyer-Moore 與 Rabin-Karp 都解決<em>精確</em>字串比對問題。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 三者都回報精確出現,差別在策略。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "三者都確實找精確比對。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "KMP 線性時間",
        "text": "<p>KMP 的最差情況時間為 O(n + m),而 Rabin-Karp 的平均時間為 O(n + m)。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— KMP 最差線性;Rabin-Karp 平均線性(最差 O(n*m))。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "KMP 最差 O(n+m),Rabin-Karp 平均 O(n+m)。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "滾動雜湊演算法",
        "text": "<p>請說出「藉由比較每個文字視窗的滾動雜湊與樣式雜湊來尋找候選比對」的演算法名稱。</p>",
        "answers": [
          {
            "text": "Rabin-Karp",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "Rabin*Karp",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "Rabin Karp",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "search-zalgo": {
    "en": [
      {
        "type": "multichoice",
        "name": "Z-array definition",
        "text": "<p>For a string S, what does the Z-value <strong>Z[i]</strong> measure?</p>",
        "answers": [
          {
            "text": "The length of the longest substring starting at position i that is also a prefix of S",
            "fraction": 100,
            "feedback": "Correct — Z[i] matches S against itself starting at i."
          },
          {
            "text": "The length of the longest suffix of S ending at position i",
            "fraction": 0,
            "feedback": "No — Z-values compare against the prefix, not a suffix."
          },
          {
            "text": "The number of times character S[i] appears in S",
            "fraction": 0,
            "feedback": "No — Z has nothing to do with character frequency."
          },
          {
            "text": "The index of the next occurrence of S[i]",
            "fraction": 0,
            "feedback": "No — Z[i] is a length, not an index."
          }
        ],
        "generalFeedback": "Z[i] is the length of the longest common prefix of S and the suffix of S starting at position i.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Z-algorithm time complexity",
        "text": "<p>Using the Z-algorithm for pattern matching (n = text length, m = pattern length), what is the total time complexity?</p>",
        "answers": [
          {
            "text": "O(n + m)",
            "fraction": 100,
            "feedback": "Correct — the Z-array is computed in a single linear pass."
          },
          {
            "text": "O(n log m)",
            "fraction": 0,
            "feedback": "No — no logarithmic factor is involved."
          },
          {
            "text": "O(n * m)",
            "fraction": 0,
            "feedback": "That is naive matching; the Z-algorithm avoids re-scanning."
          },
          {
            "text": "O(m^2)",
            "fraction": 0,
            "feedback": "No — the algorithm is linear, not quadratic."
          }
        ],
        "generalFeedback": "The Z-box amortizes work so each position is charged O(1), giving O(n + m) over the concatenation.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Z-algorithm pattern matching setup",
        "text": "<p>To find all occurrences of pattern P in text T with the Z-algorithm, on what string do you compute the Z-array?</p>",
        "answers": [
          {
            "text": "P + separator + T, where the separator is a character not in the alphabet",
            "fraction": 100,
            "feedback": "Correct — the separator stops Z-values from exceeding m."
          },
          {
            "text": "T + P with no separator",
            "fraction": 0,
            "feedback": "No — without a separator Z-values could bleed across the boundary."
          },
          {
            "text": "T reversed, concatenated with P",
            "fraction": 0,
            "feedback": "No — reversal is not part of the Z-algorithm."
          },
          {
            "text": "P alone; T is never needed",
            "fraction": 0,
            "feedback": "No — you must scan T to find matches."
          }
        ],
        "generalFeedback": "On P$T, any position i (inside the T region) with Z[i] = m marks an occurrence of P in T.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Z-algorithm properties",
        "text": "<p>Which statements about the Z-algorithm are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It runs in linear O(n + m) time",
            "fraction": 50,
            "feedback": "Yes — a single amortized pass builds the Z-array."
          },
          {
            "text": "It is a single-pattern exact matching method",
            "fraction": 50,
            "feedback": "Yes — like KMP, it searches for one pattern at a time."
          },
          {
            "text": "It requires O(n * m) time in the worst case",
            "fraction": -50,
            "feedback": "No — it is linear, not quadratic."
          },
          {
            "text": "It natively searches many patterns simultaneously like Aho-Corasick",
            "fraction": -50,
            "feedback": "No — that is Aho-Corasick's role, not the Z-algorithm's."
          }
        ],
        "generalFeedback": "The Z-algorithm is a simple linear single-pattern method; multi-pattern search is Aho-Corasick's domain.",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "Z-algorithm space complexity",
        "text": "<p>What auxiliary space does the Z-algorithm use to store its Z-array over the concatenation (n = text length, m = pattern length)?</p>",
        "answers": [
          {
            "text": "O(n + m)",
            "fraction": 100,
            "feedback": "Correct — one Z-value is stored per position of the P$T string."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "No — the Z-array itself grows with the input length."
          },
          {
            "text": "O(m^2)",
            "fraction": 0,
            "feedback": "No — the space is linear, not quadratic."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "No — you store a value for every position, so it is linear."
          }
        ],
        "generalFeedback": "The Z-array holds one entry per character of P + separator + T, giving O(n + m) space.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Z match condition",
        "text": "<p>On the string P + separator + T, a position i where Z[i] equals m (the pattern length) indicates an occurrence of the pattern.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — a full-length prefix match means P appears there."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Z[i] = m means the m-length prefix (the pattern) matches at i."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Z vs KMP relationship",
        "text": "<p>The Z-algorithm and KMP solve the same single-pattern matching problem in linear time, using different formulations.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — both are O(n + m) single-pattern methods with different internal structures."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "They are indeed two linear-time formulations of the same task."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Z-array term",
        "text": "<p>The array computed by this algorithm, whose entry at index i is the longest prefix-match length starting at i, is called the ______ array.</p>",
        "answers": [
          {
            "text": "Z",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "Z*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "Z 陣列定義",
        "text": "<p>對於字串 S,Z 值 <strong>Z[i]</strong> 衡量的是什麼?</p>",
        "answers": [
          {
            "text": "從位置 i 開始、同時也是 S 前綴的最長子字串長度",
            "fraction": 100,
            "feedback": "正確 —— Z[i] 是把 S 從 i 處與自身比對。"
          },
          {
            "text": "以位置 i 結尾的最長 S 後綴長度",
            "fraction": 0,
            "feedback": "錯 —— Z 值是與前綴比對,不是後綴。"
          },
          {
            "text": "字元 S[i] 在 S 中出現的次數",
            "fraction": 0,
            "feedback": "錯 —— Z 與字元出現頻率無關。"
          },
          {
            "text": "S[i] 下一次出現的索引位置",
            "fraction": 0,
            "feedback": "錯 —— Z[i] 是長度,不是索引。"
          }
        ],
        "generalFeedback": "Z[i] 是 S 與「從位置 i 開始的後綴」之間最長共同前綴的長度。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Z 演算法時間複雜度",
        "text": "<p>使用 Z 演算法進行字串比對(n = 文字長度,m = 樣式長度),總時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n + m)",
            "fraction": 100,
            "feedback": "正確 —— Z 陣列以單次線性掃描完成。"
          },
          {
            "text": "O(n log m)",
            "fraction": 0,
            "feedback": "錯 —— 過程中沒有對數因子。"
          },
          {
            "text": "O(n * m)",
            "fraction": 0,
            "feedback": "那是樸素比對;Z 演算法避免重複掃描。"
          },
          {
            "text": "O(m^2)",
            "fraction": 0,
            "feedback": "錯 —— 此演算法是線性而非平方。"
          }
        ],
        "generalFeedback": "Z-box 將工作攤還,使每個位置只花 O(1),對整個串接字串為 O(n + m)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Z 演算法比對設置",
        "text": "<p>要用 Z 演算法在文字 T 中找出樣式 P 的所有出現,你要在哪個字串上計算 Z 陣列?</p>",
        "answers": [
          {
            "text": "P + 分隔符 + T,其中分隔符是不屬於字母集的字元",
            "fraction": 100,
            "feedback": "正確 —— 分隔符可避免 Z 值超過 m。"
          },
          {
            "text": "T + P,不加分隔符",
            "fraction": 0,
            "feedback": "錯 —— 沒有分隔符時 Z 值可能跨越邊界。"
          },
          {
            "text": "將 T 反轉後與 P 串接",
            "fraction": 0,
            "feedback": "錯 —— 反轉不是 Z 演算法的一部分。"
          },
          {
            "text": "只用 P;完全不需要 T",
            "fraction": 0,
            "feedback": "錯 —— 你必須掃描 T 才能找到比對。"
          }
        ],
        "generalFeedback": "在 P$T 上,T 區域內任何 Z[i] = m 的位置 i 都標記 P 在 T 中的一次出現。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Z 演算法特性",
        "text": "<p>關於 Z 演算法,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它以線性 O(n + m) 時間執行",
            "fraction": 50,
            "feedback": "正確 —— 單次攤還掃描建立 Z 陣列。"
          },
          {
            "text": "它是單一樣式的精確比對方法",
            "fraction": 50,
            "feedback": "正確 —— 與 KMP 一樣,一次只搜尋一個樣式。"
          },
          {
            "text": "它在最差情況需要 O(n * m) 時間",
            "fraction": -50,
            "feedback": "錯 —— 它是線性而非平方。"
          },
          {
            "text": "它像 Aho-Corasick 一樣原生地同時搜尋多個樣式",
            "fraction": -50,
            "feedback": "錯 —— 那是 Aho-Corasick 的角色,不是 Z 演算法。"
          }
        ],
        "generalFeedback": "Z 演算法是簡單的線性單一樣式方法;多樣式搜尋屬於 Aho-Corasick 的領域。",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "Z 演算法空間複雜度",
        "text": "<p>Z 演算法在串接字串上儲存其 Z 陣列需要多少輔助空間(n = 文字長度,m = 樣式長度)?</p>",
        "answers": [
          {
            "text": "O(n + m)",
            "fraction": 100,
            "feedback": "正確 —— P$T 字串每個位置存一個 Z 值。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "錯 —— Z 陣列本身會隨輸入長度增長。"
          },
          {
            "text": "O(m^2)",
            "fraction": 0,
            "feedback": "錯 —— 空間是線性而非平方。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "錯 —— 每個位置都要存值,所以是線性。"
          }
        ],
        "generalFeedback": "Z 陣列對 P + 分隔符 + T 的每個字元存一項,故空間為 O(n + m)。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Z 比對條件",
        "text": "<p>在字串 P + 分隔符 + T 上,某位置 i 的 Z[i] 等於 m(樣式長度)代表樣式在此出現一次。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 完整長度的前綴比對表示 P 出現於此。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Z[i] = m 表示長度 m 的前綴(即樣式)在 i 處比對成功。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Z 與 KMP 的關係",
        "text": "<p>Z 演算法與 KMP 以不同的表述方式,在線性時間內解決相同的單一樣式比對問題。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 兩者都是 O(n + m) 的單一樣式方法,只是內部結構不同。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "它們確實是同一任務的兩種線性時間表述。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Z 陣列名詞",
        "text": "<p>此演算法所計算、其索引 i 的值為「從 i 開始的最長前綴比對長度」的陣列,稱為 ______ 陣列。</p>",
        "answers": [
          {
            "text": "Z",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "Z*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "sort-bubble": {
    "en": [
      {
        "type": "multichoice",
        "name": "Bubble sort core mechanism",
        "text": "<p>What does bubble sort do on each pass through the array?</p>",
        "answers": [
          {
            "text": "Repeatedly compares adjacent elements and swaps them if they are out of order",
            "fraction": 100,
            "feedback": "Correct — adjacent comparisons let the largest remaining element \"bubble\" to the end."
          },
          {
            "text": "Selects the minimum of the unsorted part and swaps it to the front",
            "fraction": 0,
            "feedback": "That describes selection sort."
          },
          {
            "text": "Partitions the array around a pivot element",
            "fraction": 0,
            "feedback": "That describes quicksort."
          },
          {
            "text": "Merges two sorted halves into one sorted array",
            "fraction": 0,
            "feedback": "That describes merge sort."
          }
        ],
        "generalFeedback": "Bubble sort walks the array comparing neighbours and swapping out-of-order pairs; each pass pushes the next largest element into place at the end.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Bubble sort worst case",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of bubble sort?</p>",
        "answers": [
          {
            "text": "O(n^2)",
            "fraction": 100,
            "feedback": "Correct — a reverse-sorted array needs about n passes of n comparisons."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Bubble sort only compares adjacent elements, so it cannot reach n log n."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is the best case with early-exit, not the worst case."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "You must at least touch every element."
          }
        ],
        "generalFeedback": "In the worst case (e.g. a reverse-sorted array) bubble sort performs on the order of n^2 comparisons and swaps.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Bubble sort best case",
        "text": "<p>With the early-exit optimization, what is bubble sort's <strong>best-case</strong> time complexity on an already-sorted array?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — one clean pass with no swaps lets the algorithm stop early."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "Without early-exit it would be O(n^2), but the optimization detects the sorted array in one pass."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Bubble sort does not divide the problem logarithmically."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "You still need one full pass to confirm the array is sorted."
          }
        ],
        "generalFeedback": "An early-exit flag lets bubble sort stop after a single swap-free pass, making it O(n) and adaptive on nearly-sorted input.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Bubble sort stability",
        "text": "<p>Bubble sort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it only swaps adjacent elements on a strict \"greater than\" comparison, so equal keys keep their relative order."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Bubble sort never swaps equal elements, so it preserves relative order and is stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Bubble sort in place",
        "text": "<p>Bubble sort is in-place, using only O(1) extra space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it sorts by swapping within the original array, needing only a constant amount of extra memory."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Bubble sort needs no auxiliary array; swaps happen in place."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Bubble sort space term",
        "text": "<p>Give the Big-O of bubble sort's extra (auxiliary) space. Write it like <code>O(1)</code>.</p>",
        "answers": [
          {
            "text": "O(1)",
            "fraction": 100,
            "feedback": "Correct — constant extra space."
          },
          {
            "text": "O(1)*",
            "fraction": 100,
            "feedback": "Correct — constant extra space."
          },
          {
            "text": "constant",
            "fraction": 100,
            "feedback": "Correct — constant extra space, i.e. O(1)."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Bubble sort properties",
        "text": "<p>Which statements about bubble sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Each pass moves the largest unsorted element to its final position at the end",
            "fraction": 50,
            "feedback": "Yes — that is why it is called \"bubbling up\"."
          },
          {
            "text": "With an early-exit flag it becomes adaptive on nearly-sorted data",
            "fraction": 50,
            "feedback": "Yes — it can finish in O(n) when few swaps are needed."
          },
          {
            "text": "It has average-case time complexity O(n log n)",
            "fraction": -50,
            "feedback": "No — the average case is O(n^2)."
          },
          {
            "text": "It requires an auxiliary array proportional to n",
            "fraction": -50,
            "feedback": "No — bubble sort is in-place, O(1) extra space."
          }
        ],
        "generalFeedback": "Bubble sort: bubbles the max to the end each pass, is stable and in-place, is adaptive with early-exit, but is O(n^2) on average.",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "When to use bubble sort",
        "text": "<p>Which is the most reasonable use of bubble sort?</p>",
        "answers": [
          {
            "text": "Teaching sorting concepts, or sorting very small or nearly-sorted inputs where simplicity matters",
            "fraction": 100,
            "feedback": "Correct — its clarity and early-exit make it fine for tiny or almost-sorted data, but not for large arrays."
          },
          {
            "text": "Sorting millions of records in a production database",
            "fraction": 0,
            "feedback": "No — O(n^2) is far too slow at that scale; use an O(n log n) sort."
          },
          {
            "text": "When you must guarantee O(n log n) worst-case performance",
            "fraction": 0,
            "feedback": "No — bubble sort's worst case is O(n^2)."
          }
        ],
        "generalFeedback": "Bubble sort is mainly pedagogical; in practice it only suits tiny or nearly-sorted inputs where its simplicity and early-exit pay off.",
        "single": true
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "氣泡排序核心機制",
        "text": "<p>氣泡排序在每一趟掃描陣列時做什麼?</p>",
        "answers": [
          {
            "text": "反覆比較相鄰的元素,若順序不對就交換",
            "fraction": 100,
            "feedback": "正確 —— 相鄰比較讓剩餘最大的元素「浮」到末端。"
          },
          {
            "text": "從未排序部分選出最小值,交換到最前面",
            "fraction": 0,
            "feedback": "那是選擇排序。"
          },
          {
            "text": "以樞紐元素對陣列進行分割",
            "fraction": 0,
            "feedback": "那是快速排序。"
          },
          {
            "text": "將兩個已排序的一半合併成一個排序好的陣列",
            "fraction": 0,
            "feedback": "那是合併排序。"
          }
        ],
        "generalFeedback": "氣泡排序沿著陣列比較相鄰元素並交換順序不對的配對;每一趟把下一個最大的元素送到末端就位。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "氣泡排序最差情況",
        "text": "<p>氣泡排序的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n^2)",
            "fraction": 100,
            "feedback": "正確 —— 反向排序的陣列需要約 n 趟、每趟 n 次比較。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "氣泡排序只比較相鄰元素,無法達到 n log n。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是有提早結束時的最佳情況,不是最差情況。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "至少要碰過每個元素。"
          }
        ],
        "generalFeedback": "在最差情況(例如反向排序的陣列),氣泡排序需要約 n^2 次比較與交換。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "氣泡排序最佳情況",
        "text": "<p>在有提早結束(early-exit)最佳化的情況下,對一個已排序好的陣列,氣泡排序的<strong>最佳情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 一趟乾淨、沒有交換的掃描讓演算法提早停止。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "沒有提早結束時會是 O(n^2),但此最佳化能在一趟內偵測到已排序的陣列。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "氣泡排序不會把問題以對數方式切分。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "你仍需一趟完整掃描來確認陣列已排序。"
          }
        ],
        "generalFeedback": "提早結束旗標讓氣泡排序在一趟無交換掃描後停止,對近乎排序好的輸入為 O(n) 且具適應性。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "氣泡排序穩定性",
        "text": "<p>氣泡排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它只在嚴格「大於」的比較下交換相鄰元素,因此相同鍵值維持原本相對順序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "氣泡排序不會交換相等的元素,因此保留相對順序,是穩定的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "原地氣泡排序",
        "text": "<p>氣泡排序是原地(in-place)的,只使用 O(1) 的額外空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它在原陣列內交換排序,只需常數量的額外記憶體。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "氣泡排序不需輔助陣列;交換就地進行。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "氣泡排序空間名詞",
        "text": "<p>寫出氣泡排序額外(輔助)空間的 Big-O。格式如 <code>O(1)</code>。</p>",
        "answers": [
          {
            "text": "O(1)",
            "fraction": 100,
            "feedback": "正確 —— 常數額外空間。"
          },
          {
            "text": "O(1)*",
            "fraction": 100,
            "feedback": "正確 —— 常數額外空間。"
          },
          {
            "text": "constant",
            "fraction": 100,
            "feedback": "正確 —— 常數額外空間,即 O(1)。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "氣泡排序性質",
        "text": "<p>關於氣泡排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "每一趟把最大的未排序元素移到末端的最終位置",
            "fraction": 50,
            "feedback": "正確 —— 這就是所謂「浮起」的原因。"
          },
          {
            "text": "加上提早結束旗標後,對近乎排序好的資料具適應性",
            "fraction": 50,
            "feedback": "正確 —— 當需要的交換很少時可在 O(n) 完成。"
          },
          {
            "text": "它的平均情況時間複雜度為 O(n log n)",
            "fraction": -50,
            "feedback": "錯 —— 平均情況為 O(n^2)。"
          },
          {
            "text": "它需要與 n 成正比的輔助陣列",
            "fraction": -50,
            "feedback": "錯 —— 氣泡排序是原地的,額外空間 O(1)。"
          }
        ],
        "generalFeedback": "氣泡排序:每趟把最大值浮到末端,穩定且原地,加上提早結束時具適應性,但平均為 O(n^2)。",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "何時使用氣泡排序",
        "text": "<p>哪一項是氣泡排序最合理的用途?</p>",
        "answers": [
          {
            "text": "教學排序概念,或排序非常小或近乎排序好、以簡單為重的輸入",
            "fraction": 100,
            "feedback": "正確 —— 它的清晰與提早結束適合極小或幾乎排序好的資料,但不適合大型陣列。"
          },
          {
            "text": "在正式的資料庫中排序數百萬筆記錄",
            "fraction": 0,
            "feedback": "錯 —— 在該規模下 O(n^2) 太慢;應使用 O(n log n) 的排序。"
          },
          {
            "text": "當你必須保證 O(n log n) 的最差情況效能時",
            "fraction": 0,
            "feedback": "錯 —— 氣泡排序的最差情況為 O(n^2)。"
          }
        ],
        "generalFeedback": "氣泡排序主要用於教學;實務上只適合極小或近乎排序好的輸入,此時其簡單性與提早結束才有價值。",
        "single": true
      }
    ]
  },
  "sort-bucket": {
    "en": [
      {
        "type": "multichoice",
        "name": "Bucket sort mechanism",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of bucket sort?</p>",
        "answers": [
          {
            "text": "Scatter elements into buckets by value range, sort each bucket, then concatenate the buckets in order",
            "fraction": 100,
            "feedback": "Correct — scatter, sort within each bucket, then gather."
          },
          {
            "text": "Repeatedly swap adjacent out-of-order elements until the array is sorted",
            "fraction": 0,
            "feedback": "That describes bubble sort, not bucket sort."
          },
          {
            "text": "Recursively pick a pivot and partition the array around it",
            "fraction": 0,
            "feedback": "That is quicksort, a comparison sort."
          },
          {
            "text": "Build a binary heap and repeatedly extract the maximum",
            "fraction": 0,
            "feedback": "That is heapsort."
          }
        ],
        "generalFeedback": "Bucket sort distributes elements across k buckets according to their value range, sorts each bucket (often with insertion sort), and concatenates.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Bucket sort average complexity",
        "text": "<p>For inputs <strong>uniformly distributed</strong> over the range and spread into k buckets, what is the <strong>average-case</strong> time complexity of bucket sort?</p>",
        "answers": [
          {
            "text": "O(n + k)",
            "fraction": 100,
            "feedback": "Correct — uniform inputs put ~constant elements per bucket, so scatter and gather dominate."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is the comparison-sort lower bound; bucket sort beats it under a distribution assumption."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "That is the worst case, not the average."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "You must at least touch every element once to place it."
          }
        ],
        "generalFeedback": "With uniform distribution each bucket holds O(1) elements on average, so the total work is O(n + k).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Bucket sort worst case",
        "text": "<p>What causes bucket sort's <strong>&Theta;(n<sup>2</sup>)</strong> worst case?</p>",
        "answers": [
          {
            "text": "A skewed distribution where nearly all elements land in a single bucket, so the per-bucket sort dominates",
            "fraction": 100,
            "feedback": "Correct — one overloaded bucket degrades to the cost of its inner sort."
          },
          {
            "text": "Using more buckets than there are elements",
            "fraction": 0,
            "feedback": "Extra empty buckets do not create quadratic behavior."
          },
          {
            "text": "The input being already sorted",
            "fraction": 0,
            "feedback": "Sorted uniform input is still fine; it is skew, not order, that hurts."
          },
          {
            "text": "Choosing a stable inner sort",
            "fraction": 0,
            "feedback": "Stability of the inner sort does not affect the worst-case bound."
          }
        ],
        "generalFeedback": "If the distribution is skewed so that one bucket receives O(n) elements, sorting that bucket costs O(n^2) with a comparison inner sort.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Bucket sort stability",
        "text": "<p>Bucket sort is <em>stable</em> provided the sort used within each bucket is stable and elements are appended in input order.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — stability is inherited from a stable per-bucket sort."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Bucket sort can be stable when the inner sort is stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Bucket sort comparison-based",
        "text": "<p>Bucket sort is a <em>comparison-based</em> sorting algorithm that is bound by the &Omega;(n log n) lower bound.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — bucket sort assumes a distribution over the key range, so it is not purely comparison-based."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — it distributes by value and can beat the comparison lower bound."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Bucket container term",
        "text": "<p>Elements are scattered into containers, each covering a sub-range of values, called a ______ (singular English term).</p>",
        "answers": [
          {
            "text": "bucket",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "bucket*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "Bucket sort distribution assumption",
        "text": "<p>Bucket sort achieves its O(n + k) average time when the input is assumed to be ______ distributed over the range (fill in the English word, e.g. \"uniform\").</p>",
        "answers": [
          {
            "text": "uniform",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "uniform*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Bucket sort properties",
        "text": "<p>Which statements about bucket sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Its auxiliary space is O(n + k) for the buckets",
            "fraction": 50,
            "feedback": "Yes — space grows with both the elements and the number of buckets."
          },
          {
            "text": "It works well when values are spread evenly across a known range",
            "fraction": 50,
            "feedback": "Yes — a uniform spread keeps buckets small."
          },
          {
            "text": "It performs no work proportional to the number of buckets",
            "fraction": -50,
            "feedback": "No — scattering and concatenation cost depends on k."
          },
          {
            "text": "It guarantees O(n log n) regardless of the input distribution",
            "fraction": -50,
            "feedback": "No — a skewed distribution degrades it to O(n^2)."
          }
        ],
        "generalFeedback": "Bucket sort uses O(n + k) space, thrives on uniform inputs, does k-proportional scatter/gather work, and degrades on skew.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "桶排序機制",
        "text": "<p>下列何者最能描述桶排序的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "依數值範圍把元素分散到各個桶中,對每個桶各自排序,再依序把桶串接起來",
            "fraction": 100,
            "feedback": "正確 —— 分散、桶內排序、再收集串接。"
          },
          {
            "text": "反覆交換相鄰且順序顛倒的元素,直到陣列排序完成",
            "fraction": 0,
            "feedback": "那是氣泡排序,不是桶排序。"
          },
          {
            "text": "遞迴選取樞紐並圍繞它分割陣列",
            "fraction": 0,
            "feedback": "那是快速排序,一種比較排序。"
          },
          {
            "text": "建立二元堆積並反覆取出最大值",
            "fraction": 0,
            "feedback": "那是堆積排序。"
          }
        ],
        "generalFeedback": "桶排序依數值範圍把元素分配到 k 個桶,對每個桶排序(常用插入排序),再串接。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "桶排序平均複雜度",
        "text": "<p>當輸入在範圍上<strong>均勻分布</strong>並分散到 k 個桶時,桶排序的<strong>平均情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n + k)",
            "fraction": 100,
            "feedback": "正確 —— 均勻輸入使每桶約含常數個元素,分散與收集為主導。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是比較排序的下界;桶排序在分布假設下可優於此界。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "那是最差情況,不是平均。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "至少要碰過每個元素一次才能放置它。"
          }
        ],
        "generalFeedback": "在均勻分布下每個桶平均含 O(1) 個元素,總工作量為 O(n + k)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "桶排序最差情況",
        "text": "<p>什麼原因造成桶排序的 <strong>&Theta;(n<sup>2</sup>)</strong> 最差情況?</p>",
        "answers": [
          {
            "text": "分布偏斜,使幾乎所有元素都落入同一個桶,導致桶內排序成為主導",
            "fraction": 100,
            "feedback": "正確 —— 單一過載的桶會退化成其內部排序的成本。"
          },
          {
            "text": "使用比元素數量還多的桶",
            "fraction": 0,
            "feedback": "多出來的空桶不會造成平方級行為。"
          },
          {
            "text": "輸入已經排序好",
            "fraction": 0,
            "feedback": "已排序的均勻輸入仍然沒問題;傷害來自偏斜而非順序。"
          },
          {
            "text": "選用穩定的桶內排序",
            "fraction": 0,
            "feedback": "桶內排序是否穩定不影響最差情況界限。"
          }
        ],
        "generalFeedback": "若分布偏斜使某一桶收到 O(n) 個元素,以比較式內部排序處理該桶需 O(n^2)。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "桶排序穩定性",
        "text": "<p>只要每個桶內所用的排序是穩定的,且元素依輸入順序附加,桶排序即為<em>穩定</em>。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 穩定性繼承自穩定的桶內排序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "當內部排序穩定時,桶排序可以是穩定的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "桶排序是否為比較排序",
        "text": "<p>桶排序是一種<em>比較式</em>排序演算法,受 &Omega;(n log n) 下界所限。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 桶排序對鍵值範圍的分布做出假設,並非純比較式。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 它依數值分配,可優於比較排序下界。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "桶容器名詞",
        "text": "<p>元素被分散進去、各自涵蓋一段數值子範圍的容器,稱為 ______(英文單數名詞)。</p>",
        "answers": [
          {
            "text": "bucket",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "bucket*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "桶排序分布假設",
        "text": "<p>當輸入被假設在範圍上呈 ______ 分布時,桶排序可達到 O(n + k) 的平均時間(填入英文單字,例如 \"uniform\")。</p>",
        "answers": [
          {
            "text": "uniform",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "uniform*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "桶排序性質",
        "text": "<p>關於桶排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它的輔助空間為 O(n + k),用於存放各個桶",
            "fraction": 50,
            "feedback": "正確 —— 空間隨元素數與桶數一起增長。"
          },
          {
            "text": "當數值在已知範圍上均勻散布時效果良好",
            "fraction": 50,
            "feedback": "正確 —— 均勻散布可使各桶保持很小。"
          },
          {
            "text": "它不會有任何與桶數成正比的工作量",
            "fraction": -50,
            "feedback": "錯 —— 分散與串接的成本取決於 k。"
          },
          {
            "text": "無論輸入分布為何,它都保證 O(n log n)",
            "fraction": -50,
            "feedback": "錯 —— 偏斜分布會使它退化為 O(n^2)。"
          }
        ],
        "generalFeedback": "桶排序使用 O(n + k) 空間、在均勻輸入下表現佳、有與 k 成正比的分散/收集工作,並在偏斜時退化。",
        "single": false
      }
    ]
  },
  "sort-count": {
    "en": [
      {
        "type": "multichoice",
        "name": "Counting sort mechanism",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of counting sort?</p>",
        "answers": [
          {
            "text": "Count how many times each key occurs, take prefix sums to find positions, then place each element into its output slot",
            "fraction": 100,
            "feedback": "Correct — count, prefix-sum, then place."
          },
          {
            "text": "Repeatedly select the minimum remaining element and append it",
            "fraction": 0,
            "feedback": "That is selection sort, a comparison sort."
          },
          {
            "text": "Divide the array in half, sort each half, and merge",
            "fraction": 0,
            "feedback": "That is merge sort."
          },
          {
            "text": "Choose a pivot and partition the array around it recursively",
            "fraction": 0,
            "feedback": "That is quicksort."
          }
        ],
        "generalFeedback": "Counting sort tallies key frequencies, converts the counts into starting positions via prefix sums, then scatters elements into a stable output array.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Counting sort complexity",
        "text": "<p>What is the time complexity of counting sort, where k is the <strong>range</strong> of key values?</p>",
        "answers": [
          {
            "text": "O(n + k)",
            "fraction": 100,
            "feedback": "Correct — linear in the number of elements plus the size of the key range."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is the comparison-sort bound; counting sort is not comparison-based."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "Counting sort never needs quadratic time."
          },
          {
            "text": "O(k log n)",
            "fraction": 0,
            "feedback": "There is no log factor; both the count and placement passes are linear."
          }
        ],
        "generalFeedback": "One pass counts (O(n)), one pass builds prefix sums over the range (O(k)), one pass places elements (O(n)) — total O(n + k).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "When counting sort is efficient",
        "text": "<p>Counting sort is efficient (effectively linear) only when which condition holds?</p>",
        "answers": [
          {
            "text": "The key range k is O(n), i.e. a small integer range relative to the element count",
            "fraction": 100,
            "feedback": "Correct — when k = O(n), O(n + k) collapses to O(n)."
          },
          {
            "text": "The keys are arbitrary floating-point numbers",
            "fraction": 0,
            "feedback": "Counting sort indexes by integer key and cannot directly bucket arbitrary floats."
          },
          {
            "text": "The array is already nearly sorted",
            "fraction": 0,
            "feedback": "Counting sort's cost does not depend on initial order."
          },
          {
            "text": "The range k is much larger than n",
            "fraction": 0,
            "feedback": "A huge range makes O(n + k) dominated by k and wastes space."
          }
        ],
        "generalFeedback": "Counting sort shines when the key range is small (k = O(n)); a range far larger than n makes it slow and memory-hungry.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Counting sort stability",
        "text": "<p>Counting sort is <em>stable</em> when elements are placed by iterating the input from right to left using the prefix-sum positions.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — right-to-left placement preserves the original order of equal keys."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Counting sort is a classic stable sort."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Counting sort comparison-based",
        "text": "<p>Counting sort is a <em>comparison-based</em> algorithm bound by the &Omega;(n log n) lower bound.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — it indexes by key value and never compares two elements, so it can be linear."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — counting sort is not comparison-based."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Prefix sum term",
        "text": "<p>To turn the per-key counts into starting output positions, counting sort computes the ______ sums of the count array (English term, e.g. \"prefix\").</p>",
        "answers": [
          {
            "text": "prefix",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "prefix*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "cumulative",
            "fraction": 100,
            "feedback": "Correct — cumulative sums serve the same purpose."
          },
          {
            "text": "cumulative*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "Counting sort limiting factor",
        "text": "<p>Counting sort becomes impractical when the key ______ (the spread of possible key values) is very large. Fill in the English word.</p>",
        "answers": [
          {
            "text": "range",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "range*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Counting sort properties",
        "text": "<p>Which statements about counting sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Its auxiliary space is O(n + k)",
            "fraction": 50,
            "feedback": "Yes — a count array of size k plus an output array of size n."
          },
          {
            "text": "It is well suited to sorting small non-negative integers",
            "fraction": 50,
            "feedback": "Yes — that is exactly its sweet spot."
          },
          {
            "text": "It can sort arbitrary floating-point keys directly without transformation",
            "fraction": -50,
            "feedback": "No — it indexes by integer keys and cannot bucket raw floats directly."
          },
          {
            "text": "It works by comparing pairs of elements",
            "fraction": -50,
            "feedback": "No — it never compares elements; it counts keys."
          }
        ],
        "generalFeedback": "Counting sort needs O(n + k) space, excels on small integer keys, cannot directly handle raw floats, and performs no comparisons.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "計數排序機制",
        "text": "<p>下列何者最能描述計數排序的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "計算每個鍵值出現的次數,取前綴和求出位置,再把每個元素放入其輸出槽位",
            "fraction": 100,
            "feedback": "正確 —— 計數、前綴和、放置。"
          },
          {
            "text": "反覆選出剩餘元素中的最小值並附加",
            "fraction": 0,
            "feedback": "那是選擇排序,一種比較排序。"
          },
          {
            "text": "把陣列切成兩半,各自排序後合併",
            "fraction": 0,
            "feedback": "那是合併排序。"
          },
          {
            "text": "選取樞紐並遞迴地圍繞它分割陣列",
            "fraction": 0,
            "feedback": "那是快速排序。"
          }
        ],
        "generalFeedback": "計數排序統計鍵值頻率,透過前綴和把計數轉成起始位置,再把元素穩定地散入輸出陣列。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "計數排序複雜度",
        "text": "<p>計數排序的時間複雜度為何?其中 k 是鍵值的<strong>範圍</strong>。</p>",
        "answers": [
          {
            "text": "O(n + k)",
            "fraction": 100,
            "feedback": "正確 —— 與元素數量加上鍵值範圍大小成線性。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是比較排序的界限;計數排序並非比較式。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "計數排序永遠不需要平方時間。"
          },
          {
            "text": "O(k log n)",
            "fraction": 0,
            "feedback": "沒有 log 因子;計數與放置兩趟都是線性。"
          }
        ],
        "generalFeedback": "一趟計數(O(n))、一趟在範圍上建前綴和(O(k))、一趟放置元素(O(n)),合計 O(n + k)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "計數排序何時有效率",
        "text": "<p>計數排序只有在下列哪個條件成立時才有效率(近乎線性)?</p>",
        "answers": [
          {
            "text": "鍵值範圍 k 為 O(n),即相對於元素數量而言是很小的整數範圍",
            "fraction": 100,
            "feedback": "正確 —— 當 k = O(n) 時,O(n + k) 收斂為 O(n)。"
          },
          {
            "text": "鍵值是任意的浮點數",
            "fraction": 0,
            "feedback": "計數排序以整數鍵值索引,無法直接對任意浮點數分桶。"
          },
          {
            "text": "陣列已經接近排序好",
            "fraction": 0,
            "feedback": "計數排序的成本不取決於初始順序。"
          },
          {
            "text": "範圍 k 遠大於 n",
            "fraction": 0,
            "feedback": "過大的範圍會使 O(n + k) 被 k 主導並浪費空間。"
          }
        ],
        "generalFeedback": "計數排序在鍵值範圍很小(k = O(n))時最出色;範圍遠大於 n 會使它變慢且耗記憶體。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "計數排序穩定性",
        "text": "<p>若使用前綴和位置、由右到左走訪輸入來放置元素,計數排序即為<em>穩定</em>。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 由右到左放置可保留相同鍵值的原始順序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "計數排序是經典的穩定排序。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "計數排序是否為比較排序",
        "text": "<p>計數排序是一種<em>比較式</em>演算法,受 &Omega;(n log n) 下界所限。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 它以鍵值索引、從不比較兩個元素,因此可達線性。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 計數排序並非比較式。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "前綴和名詞",
        "text": "<p>為了把各鍵值的計數轉成起始輸出位置,計數排序會計算計數陣列的 ______ 和(英文名詞,例如 \"prefix\")。</p>",
        "answers": [
          {
            "text": "prefix",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "prefix*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "cumulative",
            "fraction": 100,
            "feedback": "正確 —— 累積和(cumulative)有相同作用。"
          },
          {
            "text": "cumulative*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "計數排序的限制因素",
        "text": "<p>當鍵值的 ______(可能鍵值的分布幅度)非常大時,計數排序會變得不切實際。填入英文單字。</p>",
        "answers": [
          {
            "text": "range",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "range*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "計數排序性質",
        "text": "<p>關於計數排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它的輔助空間為 O(n + k)",
            "fraction": 50,
            "feedback": "正確 —— 大小為 k 的計數陣列加上大小為 n 的輸出陣列。"
          },
          {
            "text": "它很適合排序範圍不大的非負整數",
            "fraction": 50,
            "feedback": "正確 —— 這正是它的最佳適用場景。"
          },
          {
            "text": "它可以不經轉換就直接排序任意浮點鍵值",
            "fraction": -50,
            "feedback": "錯 —— 它以整數鍵值索引,無法直接對原始浮點數分桶。"
          },
          {
            "text": "它透過兩兩比較元素來運作",
            "fraction": -50,
            "feedback": "錯 —— 它從不比較元素,而是計數鍵值。"
          }
        ],
        "generalFeedback": "計數排序需要 O(n + k) 空間、在範圍不大的整數鍵值上出色、無法直接處理原始浮點數,且不做任何比較。",
        "single": false
      }
    ]
  },
  "sort-external": {
    "en": [
      {
        "type": "multichoice",
        "name": "Why external sorting",
        "text": "<p>What problem does <strong>external merge sort</strong> primarily solve?</p>",
        "answers": [
          {
            "text": "Sorting a dataset that is too large to fit entirely in main memory (RAM)",
            "fraction": 100,
            "feedback": "Correct — the data lives on disk and cannot be held in RAM all at once."
          },
          {
            "text": "Sorting an array faster than O(n log n) comparisons",
            "fraction": 0,
            "feedback": "No — it does not beat the comparison lower bound; it manages data that exceeds RAM."
          },
          {
            "text": "Removing duplicate keys from a small in-memory list",
            "fraction": 0,
            "feedback": "No — deduplication is not the point; the problem is scale beyond memory."
          },
          {
            "text": "Sorting linked lists without extra pointers",
            "fraction": 0,
            "feedback": "No — that is unrelated to external sorting."
          }
        ],
        "generalFeedback": "External sorting handles data too large for RAM by streaming it between memory and disk in sorted pieces.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Dominant cost",
        "text": "<p>What dominates the running time of external merge sort?</p>",
        "answers": [
          {
            "text": "Disk I/O — the number of passes made over the data",
            "fraction": 100,
            "feedback": "Correct — moving data to and from disk is far slower than in-memory comparisons."
          },
          {
            "text": "The number of key comparisons performed by the CPU",
            "fraction": 0,
            "feedback": "No — CPU comparisons are cheap relative to disk transfers here."
          },
          {
            "text": "The recursion stack depth",
            "fraction": 0,
            "feedback": "No — stack depth is not the bottleneck for external sorting."
          },
          {
            "text": "The number of pivot selections",
            "fraction": 0,
            "feedback": "No — pivots belong to quicksort, not external merge sort."
          }
        ],
        "generalFeedback": "Because disk access is orders of magnitude slower than memory, the cost model counts passes / I/O, not comparisons.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Run creation phase",
        "text": "<p>Which best describes the <strong>first phase</strong> (run creation) of external merge sort?</p>",
        "answers": [
          {
            "text": "Read chunks that fit in memory, sort each internally, and write them back as sorted \"runs\"",
            "fraction": 100,
            "feedback": "Correct — each memory-sized chunk becomes one sorted run on disk."
          },
          {
            "text": "Merge all runs at once into the final sorted output",
            "fraction": 0,
            "feedback": "No — that is the second (merge) phase."
          },
          {
            "text": "Partition the data around a pivot chosen from disk",
            "fraction": 0,
            "feedback": "No — external merge sort does not partition around pivots."
          },
          {
            "text": "Build a heap over the entire file in memory",
            "fraction": 0,
            "feedback": "No — the whole file does not fit in memory; only chunks do."
          }
        ],
        "generalFeedback": "Phase 1 produces sorted runs; phase 2 repeatedly k-way-merges those runs until one remains.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Merge passes",
        "text": "<p>Using a (B&minus;1)-way merge, how does increasing the merge order (fan-in <em>k</em>) affect the number of merge passes, roughly &lceil;log<sub>k</sub>(N/M)&rceil;?</p>",
        "answers": [
          {
            "text": "Larger k means fewer passes, so less total disk I/O",
            "fraction": 100,
            "feedback": "Correct — a higher fan-in raises the logarithm base, shrinking the pass count."
          },
          {
            "text": "Larger k means more passes and more I/O",
            "fraction": 0,
            "feedback": "No — a bigger merge order reduces the number of passes."
          },
          {
            "text": "k has no effect on the number of passes",
            "fraction": 0,
            "feedback": "No — k is the logarithm base, so it directly changes the pass count."
          },
          {
            "text": "Passes depend only on CPU speed, not k",
            "fraction": 0,
            "feedback": "No — passes depend on N, M, and the fan-in k, not CPU speed."
          }
        ],
        "generalFeedback": "Number of merge passes &asymp; &lceil;log(N/M)&rceil;; each pass moves &asymp; 2N records, so higher k lowers both passes and I/O.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "External merge stability",
        "text": "<p>External merge sort, like ordinary merge sort, can be implemented as a <em>stable</em> sort.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — a careful merge preserves the relative order of equal keys."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — merging can keep equal keys in their original order, so it is stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "CPU vs IO",
        "text": "<p>For a file far larger than RAM, the number of CPU key comparisons is the main bottleneck of external merge sort.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — disk I/O (passes over the data), not comparisons, dominates."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — disk passes dominate; comparisons are comparatively cheap."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Sorted chunk term",
        "text": "<p>A sorted chunk written to disk during phase 1, later combined by merging, is called a ______.</p>",
        "answers": [
          {
            "text": "run",
            "fraction": 100,
            "feedback": "Correct — these sorted pieces are called runs."
          },
          {
            "text": "run*",
            "fraction": 100,
            "feedback": "Correct — a sorted \"run\"."
          },
          {
            "text": "sorted run",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Reducing passes",
        "text": "<p>Which changes <strong>reduce</strong> the number of passes (and thus disk I/O) in external merge sort? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Giving the sort more memory M so each initial run is longer",
            "fraction": 50,
            "feedback": "Yes — larger runs mean fewer runs to merge, so fewer passes."
          },
          {
            "text": "Increasing the merge fan-in k (a higher-order merge)",
            "fraction": 50,
            "feedback": "Yes — a larger k raises the log base and cuts the pass count."
          },
          {
            "text": "Using a smaller memory buffer to save RAM",
            "fraction": -50,
            "feedback": "No — less memory yields shorter runs and more passes."
          },
          {
            "text": "Performing more CPU comparisons per record",
            "fraction": -50,
            "feedback": "No — extra comparisons do not reduce disk passes."
          }
        ],
        "generalFeedback": "Fewer passes come from bigger memory (longer runs) and higher merge order; both attack the &lceil;log(N/M)&rceil; pass count.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "為何需要外部排序",
        "text": "<p><strong>外部合併排序(external merge sort)</strong>主要解決什麼問題?</p>",
        "answers": [
          {
            "text": "排序一份大到無法完整放入主記憶體(RAM)的資料",
            "fraction": 100,
            "feedback": "正確 —— 資料存放於磁碟,無法一次全部載入 RAM。"
          },
          {
            "text": "以少於 O(n log n) 次比較完成排序",
            "fraction": 0,
            "feedback": "錯 —— 它不會突破比較下界;它處理的是超過記憶體容量的資料。"
          },
          {
            "text": "從一份小型記憶體清單移除重複鍵值",
            "fraction": 0,
            "feedback": "錯 —— 重點不是去重,而是資料規模超過記憶體。"
          },
          {
            "text": "在不使用額外指標的情況下排序鏈結串列",
            "fraction": 0,
            "feedback": "錯 —— 這與外部排序無關。"
          }
        ],
        "generalFeedback": "外部排序透過在記憶體與磁碟之間以已排序片段串流資料,處理大於 RAM 的資料。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "主要成本",
        "text": "<p>外部合併排序的執行時間主要由什麼主導?</p>",
        "answers": [
          {
            "text": "磁碟 I/O —— 也就是掃過資料的回合(pass)數",
            "fraction": 100,
            "feedback": "正確 —— 資料進出磁碟遠比記憶體內的比較慢。"
          },
          {
            "text": "CPU 執行的鍵值比較次數",
            "fraction": 0,
            "feedback": "錯 —— 相較於磁碟傳輸,CPU 比較在此非常便宜。"
          },
          {
            "text": "遞迴堆疊的深度",
            "fraction": 0,
            "feedback": "錯 —— 堆疊深度並非外部排序的瓶頸。"
          },
          {
            "text": "樞紐選取的次數",
            "fraction": 0,
            "feedback": "錯 —— 樞紐屬於快速排序,而非外部合併排序。"
          }
        ],
        "generalFeedback": "由於磁碟存取比記憶體慢好幾個數量級,其成本模型計算的是回合數 / I/O,而非比較次數。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "建立初始段落階段",
        "text": "<p>下列何者最能描述外部合併排序的<strong>第一階段</strong>(建立初始段落)?</p>",
        "answers": [
          {
            "text": "讀入能放進記憶體的資料塊,各自於記憶體內排序,再寫回成為已排序的「段落(run)」",
            "fraction": 100,
            "feedback": "正確 —— 每個記憶體大小的資料塊成為磁碟上一個已排序段落。"
          },
          {
            "text": "一次把所有段落合併成最終排序輸出",
            "fraction": 0,
            "feedback": "錯 —— 那是第二階段(合併)。"
          },
          {
            "text": "以從磁碟選出的樞紐對資料進行分割",
            "fraction": 0,
            "feedback": "錯 —— 外部合併排序不會繞著樞紐分割。"
          },
          {
            "text": "在記憶體中對整個檔案建立堆積",
            "fraction": 0,
            "feedback": "錯 —— 整個檔案放不進記憶體,只有資料塊可以。"
          }
        ],
        "generalFeedback": "第一階段產生已排序段落;第二階段反覆對這些段落做 k 路合併,直到只剩一個。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "合併回合數",
        "text": "<p>採用 (B&minus;1) 路合併時,增大合併路數(fan-in <em>k</em>)如何影響大約 &lceil;log<sub>k</sub>(N/M)&rceil; 的合併回合數?</p>",
        "answers": [
          {
            "text": "k 越大回合數越少,因此總磁碟 I/O 越少",
            "fraction": 100,
            "feedback": "正確 —— 較高的 fan-in 抬高對數底數,縮小回合數。"
          },
          {
            "text": "k 越大回合數越多、I/O 越多",
            "fraction": 0,
            "feedback": "錯 —— 較大的合併路數會減少回合數。"
          },
          {
            "text": "k 對回合數沒有影響",
            "fraction": 0,
            "feedback": "錯 —— k 是對數的底數,會直接改變回合數。"
          },
          {
            "text": "回合數只取決於 CPU 速度,與 k 無關",
            "fraction": 0,
            "feedback": "錯 —— 回合數取決於 N、M 與 fan-in k,而非 CPU 速度。"
          }
        ],
        "generalFeedback": "合併回合數 &asymp; &lceil;log(N/M)&rceil;;每個回合搬動 &asymp; 2N 筆記錄,故 k 越大回合數與 I/O 都越少。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "外部合併排序穩定性",
        "text": "<p>外部合併排序如同一般合併排序,可以實作為<em>穩定</em>的排序。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 謹慎的合併可保留相同鍵值的相對次序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 合併可讓相同鍵值維持原本次序,故為穩定。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "CPU 與 IO",
        "text": "<p>對於遠大於 RAM 的檔案,CPU 的鍵值比較次數是外部合併排序的主要瓶頸。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 主導的是磁碟 I/O(掃過資料的回合數),而非比較次數。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 磁碟回合主導成本;比較相對便宜。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "已排序段落名詞",
        "text": "<p>第一階段寫入磁碟、之後透過合併結合的已排序資料塊,英文稱為 ______。</p>",
        "answers": [
          {
            "text": "run",
            "fraction": 100,
            "feedback": "正確 —— 這些已排序片段稱為 run(段落)。"
          },
          {
            "text": "run*",
            "fraction": 100,
            "feedback": "正確 —— 已排序的「run」。"
          },
          {
            "text": "sorted run",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "減少回合數",
        "text": "<p>下列哪些改變可<strong>減少</strong>外部合併排序的回合數(進而減少磁碟 I/O)?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "給排序更多記憶體 M,使每個初始段落更長",
            "fraction": 50,
            "feedback": "正確 —— 段落越長、待合併的段落越少,回合數越少。"
          },
          {
            "text": "增大合併 fan-in k(更高路數的合併)",
            "fraction": 50,
            "feedback": "正確 —— k 越大抬高對數底數,削減回合數。"
          },
          {
            "text": "使用較小的記憶體緩衝以節省 RAM",
            "fraction": -50,
            "feedback": "錯 —— 記憶體越少段落越短,回合數越多。"
          },
          {
            "text": "每筆記錄執行更多 CPU 比較",
            "fraction": -50,
            "feedback": "錯 —— 額外比較無法減少磁碟回合。"
          }
        ],
        "generalFeedback": "更少的回合來自更大的記憶體(更長段落)與更高的合併路數;兩者都針對 &lceil;log(N/M)&rceil; 的回合數。",
        "single": false
      }
    ]
  },
  "sort-heap": {
    "en": [
      {
        "type": "multichoice",
        "name": "Heap sort core idea",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of heap sort?</p>",
        "answers": [
          {
            "text": "Build a max-heap, then repeatedly swap the root to the end and sift the new root down over the shrinking heap",
            "fraction": 100,
            "feedback": "Correct — build once, then extract-max n times via sift-down."
          },
          {
            "text": "Divide the array into halves, sort each, then merge",
            "fraction": 0,
            "feedback": "That is merge sort."
          },
          {
            "text": "Partition around a pivot and recurse on each side",
            "fraction": 0,
            "feedback": "That is quicksort."
          },
          {
            "text": "Insertion-sort elements at diminishing gaps",
            "fraction": 0,
            "feedback": "That is shell sort."
          }
        ],
        "generalFeedback": "Heap sort turns the array into a binary max-heap, then repeatedly moves the maximum (the root) to the end and restores the heap with sift-down.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Heap sort worst case",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of heap sort?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "Correct — n extractions, each with an O(log n) sift-down."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "No — unlike quicksort, heap sort never degrades to quadratic."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "Comparison sorts cannot beat O(n log n)."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "You must process every element."
          }
        ],
        "generalFeedback": "Heap sort's best, average, and worst cases are all O(n log n) — a guaranteed bound that quicksort does not offer.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Heap sort space",
        "text": "<p>What is the auxiliary <strong>space complexity</strong> of heap sort?</p>",
        "answers": [
          {
            "text": "O(1)",
            "fraction": 100,
            "feedback": "Correct — the heap lives inside the input array; sorting is in-place."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "No — unlike merge sort, heap sort needs no auxiliary array."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "An iterative sift-down uses only constant extra space."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is a time bound, not space."
          }
        ],
        "generalFeedback": "Heap sort sorts in place with O(1) extra memory — its key advantage over merge sort, while still guaranteeing O(n log n).",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Heap sort stability",
        "text": "<p>Heap sort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — sift-down swaps distant elements, so equal keys can be reordered."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — heap sort is not stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Heap sort guarantee",
        "text": "<p>Heap sort guarantees O(n log n) time while using only O(1) extra space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — this combination of guaranteed time and in-place operation is heap sort's signature strength."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It does — heap sort is both O(n log n) worst case and in-place."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Heap sift operation",
        "text": "<p>After swapping the root to the end, the operation that restores the max-heap property by moving the new root downward is called sift-______ (also known as heapify or percolate-down).</p>",
        "answers": [
          {
            "text": "down",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "down*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "Heap build cost",
        "text": "<p>Building a heap from an unsorted array with the bottom-up method takes how much time? Answer as O(_).</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — bottom-up build-heap is linear time."
          },
          {
            "text": "n",
            "fraction": 100,
            "feedback": "Correct — bottom-up build-heap is O(n)."
          },
          {
            "text": "O(n)*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Heap sort properties",
        "text": "<p>Which statements about heap sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It runs in O(n log n) in the best, average, and worst cases",
            "fraction": 50,
            "feedback": "Yes — its time bound does not depend on input order."
          },
          {
            "text": "It sorts in place with O(1) auxiliary space",
            "fraction": 50,
            "feedback": "Yes — the heap is maintained inside the array."
          },
          {
            "text": "It is a stable sort",
            "fraction": -50,
            "feedback": "No — heap sort is not stable."
          },
          {
            "text": "It is adaptive, running in O(n) on already-sorted input",
            "fraction": -50,
            "feedback": "No — heap sort is not adaptive; it is O(n log n) regardless."
          }
        ],
        "generalFeedback": "Heap sort: guaranteed O(n log n), in-place O(1) space, but not stable and not adaptive.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "堆積排序核心概念",
        "text": "<p>下列何者最能描述堆積排序的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "先建立最大堆積,再反覆將根節點交換到尾端,並對新的根在縮小的堆積上做下沉",
            "fraction": 100,
            "feedback": "正確 —— 建堆一次,之後透過下沉取出最大值 n 次。"
          },
          {
            "text": "將陣列分成兩半,各自排序,再合併",
            "fraction": 0,
            "feedback": "那是合併排序。"
          },
          {
            "text": "以樞紐分割,並在兩側遞迴",
            "fraction": 0,
            "feedback": "那是快速排序。"
          },
          {
            "text": "以逐漸縮小的間隔做插入排序",
            "fraction": 0,
            "feedback": "那是希爾排序。"
          }
        ],
        "generalFeedback": "堆積排序將陣列轉為二元最大堆積,再反覆將最大值(根)移到尾端,並以下沉還原堆積性質。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "堆積排序最差情況",
        "text": "<p>堆積排序的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "正確 —— n 次取出,每次下沉為 O(log n)。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "錯 —— 與快速排序不同,堆積排序不會退化為平方級。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "比較排序無法優於 O(n log n)。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "你必須處理每個元素。"
          }
        ],
        "generalFeedback": "堆積排序的最佳、平均、最差情況皆為 O(n log n) —— 這是快速排序無法提供的保證上界。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "堆積排序空間",
        "text": "<p>堆積排序的輔助<strong>空間複雜度</strong>為何?</p>",
        "answers": [
          {
            "text": "O(1)",
            "fraction": 100,
            "feedback": "正確 —— 堆積就存在於輸入陣列中;排序為原地進行。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "錯 —— 與合併排序不同,堆積排序不需輔助陣列。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "疊代式下沉只使用常數額外空間。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是時間上界,不是空間。"
          }
        ],
        "generalFeedback": "堆積排序以 O(1) 額外記憶體原地排序 —— 這是它相對合併排序的關鍵優勢,同時仍保證 O(n log n)。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "堆積排序穩定性",
        "text": "<p>堆積排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 下沉會交換相距很遠的元素,因此相同鍵值可能被重新排序。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 堆積排序不穩定。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "堆積排序保證",
        "text": "<p>堆積排序保證 O(n log n) 時間,同時只使用 O(1) 額外空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 保證時間加上原地運作的組合,是堆積排序的招牌優勢。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "它確實如此 —— 堆積排序既是最差 O(n log n) 又是原地。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "堆積下沉操作",
        "text": "<p>將根交換到尾端後,藉由把新的根往下移動來還原最大堆積性質的操作,英文稱為 sift-______(也稱為 heapify 或 percolate-down)。</p>",
        "answers": [
          {
            "text": "down",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "down*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "建堆成本",
        "text": "<p>以由下而上的方法從未排序陣列建立堆積需要多少時間?請以 O(_) 作答。</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 由下而上建堆是線性時間。"
          },
          {
            "text": "n",
            "fraction": 100,
            "feedback": "正確 —— 由下而上建堆是 O(n)。"
          },
          {
            "text": "O(n)*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "堆積排序特性",
        "text": "<p>關於堆積排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它在最佳、平均、最差情況下都以 O(n log n) 執行",
            "fraction": 50,
            "feedback": "正確 —— 其時間上界與輸入順序無關。"
          },
          {
            "text": "它以 O(1) 輔助空間原地排序",
            "fraction": 50,
            "feedback": "正確 —— 堆積維護在陣列內部。"
          },
          {
            "text": "它是穩定排序",
            "fraction": -50,
            "feedback": "錯 —— 堆積排序不穩定。"
          },
          {
            "text": "它是適應性的,對已排序輸入以 O(n) 執行",
            "fraction": -50,
            "feedback": "錯 —— 堆積排序不具適應性;無論如何都是 O(n log n)。"
          }
        ],
        "generalFeedback": "堆積排序:保證 O(n log n)、原地 O(1) 空間,但不穩定且不具適應性。",
        "single": false
      }
    ]
  },
  "sort-insert": {
    "en": [
      {
        "type": "multichoice",
        "name": "Insertion sort core mechanism",
        "text": "<p>How does insertion sort build up a sorted result?</p>",
        "answers": [
          {
            "text": "It grows a sorted prefix, taking each next element and shifting larger sorted elements right to insert it into place",
            "fraction": 100,
            "feedback": "Correct — like sorting a hand of cards."
          },
          {
            "text": "It repeatedly selects the minimum of the unsorted part",
            "fraction": 0,
            "feedback": "That describes selection sort."
          },
          {
            "text": "It compares and swaps only adjacent elements pass after pass",
            "fraction": 0,
            "feedback": "That describes bubble sort."
          },
          {
            "text": "It recursively merges sorted halves",
            "fraction": 0,
            "feedback": "That describes merge sort."
          }
        ],
        "generalFeedback": "Insertion sort keeps a sorted prefix on the left; each new element is inserted into its correct spot by shifting larger elements one position right.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Insertion sort best case",
        "text": "<p>What is insertion sort's <strong>best-case</strong> time complexity on an already-sorted array?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — each element only needs one comparison and no shifts, so it is adaptive."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "That is the worst/average case; on sorted input insertion sort is O(n)."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Insertion sort does not divide the problem logarithmically."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "You still must scan all n elements once."
          }
        ],
        "generalFeedback": "On sorted or nearly-sorted input, each element is already at or near its place, so insertion sort runs in O(n) — it is adaptive.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Insertion sort worst case",
        "text": "<p>What is insertion sort's <strong>worst-case</strong> time complexity?</p>",
        "answers": [
          {
            "text": "O(n^2)",
            "fraction": 100,
            "feedback": "Correct — a reverse-sorted array forces every new element to shift past all previous ones."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is the best case on sorted input, not the worst case."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Shifting elements one at a time makes it quadratic in the worst case."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "You must at least touch every element."
          }
        ],
        "generalFeedback": "In the worst case (reverse-sorted input) each of the n elements shifts past up to n prior elements, giving O(n^2).",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Insertion sort stability",
        "text": "<p>Insertion sort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it stops shifting on a strict \"greater than\", so equal keys keep their original order."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Insertion sort inserts after equal elements, preserving relative order, so it is stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Insertion sort online",
        "text": "<p>Insertion sort is an <em>online</em> algorithm: it can sort a list as elements arrive one at a time.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — each new element is inserted into the already-sorted prefix, so it handles streaming input."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Insertion sort maintains a sorted prefix and can absorb each new element as it arrives, so it is online."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Insertion sort adaptivity term",
        "text": "<p>An algorithm that runs faster when the input is already partly sorted is called ______ (one English word). Insertion sort has this property.</p>",
        "answers": [
          {
            "text": "adaptive",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "adaptive*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "adaptivity",
            "fraction": 100,
            "feedback": "Correct — the property is \"adaptive\"."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Insertion sort properties",
        "text": "<p>Which statements about insertion sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It is adaptive, running in O(n) on nearly-sorted input",
            "fraction": 50,
            "feedback": "Yes — fewer shifts when data is nearly ordered."
          },
          {
            "text": "It is stable and in-place (O(1) extra space)",
            "fraction": 50,
            "feedback": "Yes — equal keys keep order and it sorts within the array."
          },
          {
            "text": "Its worst-case time is O(n log n)",
            "fraction": -50,
            "feedback": "No — the worst case is O(n^2)."
          },
          {
            "text": "It cannot process input arriving one element at a time",
            "fraction": -50,
            "feedback": "No — insertion sort is online and handles streaming input."
          }
        ],
        "generalFeedback": "Insertion sort: adaptive (O(n) best case), stable, in-place, online; worst/average case O(n^2).",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "When to use insertion sort",
        "text": "<p>When is insertion sort a particularly good choice?</p>",
        "answers": [
          {
            "text": "For small arrays or nearly-sorted data, and as the base case inside faster divide-and-conquer sorts",
            "fraction": 100,
            "feedback": "Correct — its low overhead and adaptivity shine on small or almost-sorted inputs."
          },
          {
            "text": "For sorting very large random arrays where asymptotic speed matters most",
            "fraction": 0,
            "feedback": "No — O(n^2) is too slow there; use an O(n log n) sort."
          },
          {
            "text": "When you specifically need to minimize the number of writes",
            "fraction": 0,
            "feedback": "No — that is selection sort's niche; insertion sort can do many shifts."
          }
        ],
        "generalFeedback": "Insertion sort excels on small or nearly-sorted inputs and is often the cutoff base case in quicksort/merge sort implementations.",
        "single": true
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "插入排序核心機制",
        "text": "<p>插入排序如何逐步建立排序好的結果?</p>",
        "answers": [
          {
            "text": "它成長一個已排序前綴,取下一個元素並把較大的已排序元素右移,將它插入正確位置",
            "fraction": 100,
            "feedback": "正確 —— 就像整理手中的撲克牌。"
          },
          {
            "text": "它反覆選出未排序部分的最小值",
            "fraction": 0,
            "feedback": "那是選擇排序。"
          },
          {
            "text": "它一趟又一趟只比較並交換相鄰元素",
            "fraction": 0,
            "feedback": "那是氣泡排序。"
          },
          {
            "text": "它遞迴地合併已排序的一半",
            "fraction": 0,
            "feedback": "那是合併排序。"
          }
        ],
        "generalFeedback": "插入排序在左側維持一個已排序前綴;每個新元素透過把較大的元素右移一格,插入到它的正確位置。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "插入排序最佳情況",
        "text": "<p>對一個已排序好的陣列,插入排序的<strong>最佳情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 每個元素只需一次比較且無需搬移,因此具適應性。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "那是最差/平均情況;對已排序輸入,插入排序為 O(n)。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "插入排序不會以對數方式切分問題。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "你仍必須掃描全部 n 個元素一次。"
          }
        ],
        "generalFeedback": "對已排序或近乎排序好的輸入,每個元素都已在或接近其位置,因此插入排序以 O(n) 執行 —— 它具適應性。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "插入排序最差情況",
        "text": "<p>插入排序的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n^2)",
            "fraction": 100,
            "feedback": "正確 —— 反向排序的陣列迫使每個新元素搬移過前面所有元素。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是對已排序輸入的最佳情況,不是最差情況。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "逐一搬移元素使它在最差情況下為平方級。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "至少要碰過每個元素。"
          }
        ],
        "generalFeedback": "在最差情況(反向排序輸入),n 個元素中的每一個都可能搬移過至多 n 個前面的元素,得到 O(n^2)。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "插入排序穩定性",
        "text": "<p>插入排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它在嚴格「大於」時停止搬移,因此相同鍵值維持原本順序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "插入排序會插入在相等元素之後,保留相對順序,因此是穩定的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "插入排序線上性",
        "text": "<p>插入排序是一種<em>線上(online)</em>演算法:它能在元素逐一到達時邊排序。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 每個新元素被插入到已排序前綴中,因此能處理串流輸入。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "插入排序維持一個已排序前綴,能在每個新元素到達時吸收它,因此是線上的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "插入排序適應性名詞",
        "text": "<p>當輸入已部分排序時能跑得更快的演算法,稱為 ______(一個英文單字)。插入排序具有此性質。</p>",
        "answers": [
          {
            "text": "adaptive",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "adaptive*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "adaptivity",
            "fraction": 100,
            "feedback": "正確 —— 此性質為「adaptive」。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "插入排序性質",
        "text": "<p>關於插入排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它具適應性,對近乎排序好的輸入以 O(n) 執行",
            "fraction": 50,
            "feedback": "正確 —— 資料近乎有序時搬移較少。"
          },
          {
            "text": "它是穩定且原地的(O(1) 額外空間)",
            "fraction": 50,
            "feedback": "正確 —— 相同鍵值維持順序,且在陣列內排序。"
          },
          {
            "text": "它的最差情況時間為 O(n log n)",
            "fraction": -50,
            "feedback": "錯 —— 最差情況為 O(n^2)。"
          },
          {
            "text": "它無法處理逐一到達的輸入元素",
            "fraction": -50,
            "feedback": "錯 —— 插入排序是線上的,能處理串流輸入。"
          }
        ],
        "generalFeedback": "插入排序:具適應性(最佳情況 O(n))、穩定、原地、線上;最差/平均情況 O(n^2)。",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "何時使用插入排序",
        "text": "<p>插入排序在什麼情況下是特別好的選擇?</p>",
        "answers": [
          {
            "text": "用於小型陣列或近乎排序好的資料,以及作為更快的分治排序內部的基底情況",
            "fraction": 100,
            "feedback": "正確 —— 它的低額外負擔與適應性在小型或幾乎排序好的輸入上表現出色。"
          },
          {
            "text": "用於排序非常大的隨機陣列、漸進速度最重要時",
            "fraction": 0,
            "feedback": "錯 —— 在此 O(n^2) 太慢;應使用 O(n log n) 的排序。"
          },
          {
            "text": "當你特別需要把寫入次數降到最低時",
            "fraction": 0,
            "feedback": "錯 —— 那是選擇排序的利基;插入排序可能做很多次搬移。"
          }
        ],
        "generalFeedback": "插入排序在小型或近乎排序好的輸入上表現優異,常作為快速排序/合併排序實作中切換的基底情況。",
        "single": true
      }
    ]
  },
  "sort-merge": {
    "en": [
      {
        "type": "multichoice",
        "name": "Merge sort core idea",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of merge sort?</p>",
        "answers": [
          {
            "text": "Divide the array into halves, recursively sort each half, then merge the two sorted halves",
            "fraction": 100,
            "feedback": "Correct — divide, conquer, then combine via merge."
          },
          {
            "text": "Repeatedly swap adjacent out-of-order elements until no swaps remain",
            "fraction": 0,
            "feedback": "That describes bubble sort, not merge sort."
          },
          {
            "text": "Partition around a pivot and recurse on each side",
            "fraction": 0,
            "feedback": "That is quicksort's partitioning, not merging."
          },
          {
            "text": "Build a heap and repeatedly extract the maximum",
            "fraction": 0,
            "feedback": "That is heap sort."
          }
        ],
        "generalFeedback": "Merge sort is a divide-and-conquer algorithm: split, recursively sort, and merge sorted runs.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Merge sort worst case",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of merge sort?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "Correct — log n levels of merging, each O(n)."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "Unlike quicksort, merge sort never degrades to quadratic."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "Comparison sorts cannot beat O(n log n)."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "You must at least process every element."
          }
        ],
        "generalFeedback": "Merge sort's best, average, and worst cases are all O(n log n) — performance is predictable regardless of input order.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Merge sort space",
        "text": "<p>What is the auxiliary <strong>space complexity</strong> of standard array-based merge sort?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — merging needs a temporary buffer proportional to the input."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "Standard merge sort is not in-place; it needs an O(n) buffer."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "The recursion stack is O(log n), but the merge buffer dominates at O(n)."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "Far too much; a single O(n) buffer suffices."
          }
        ],
        "generalFeedback": "The merge step copies elements into a temporary array of size O(n), so standard merge sort is not in-place.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Merge sort stability",
        "text": "<p>Merge sort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — a careful merge that favors the left run preserves the order of equal keys."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Merge sort is stable when the merge takes the left element on ties."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Merge sort in place",
        "text": "<p>Standard array-based merge sort sorts <em>in place</em> using only O(1) extra memory.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — the merge step needs an O(n) auxiliary buffer."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — standard merge sort requires O(n) auxiliary space."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Merge operation term",
        "text": "<p>The step that combines two already-sorted subarrays into one sorted array is called the ______ step.</p>",
        "answers": [
          {
            "text": "merge",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "merg*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "Merge sort paradigm",
        "text": "<p>Merge sort is a classic example of which algorithm-design paradigm? Answer with the hyphenated three-word term (e.g. \"d______-and-c______\").</p>",
        "answers": [
          {
            "text": "divide-and-conquer",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "divide and conquer",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "divide*conquer",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Merge sort properties",
        "text": "<p>Which statements about merge sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It is well suited to sorting linked lists and forms the basis of external sorting",
            "fraction": 50,
            "feedback": "Yes — linked-list merging needs no random access, and merging drives external sorts."
          },
          {
            "text": "Its running time is O(n log n) regardless of the input's initial order",
            "fraction": 50,
            "feedback": "Yes — best, average, and worst are all O(n log n)."
          },
          {
            "text": "It sorts in place with O(1) extra memory",
            "fraction": -50,
            "feedback": "No — standard merge sort needs O(n) auxiliary space."
          },
          {
            "text": "It is unstable, so equal keys may be reordered",
            "fraction": -50,
            "feedback": "No — merge sort is stable."
          }
        ],
        "generalFeedback": "Merge sort: predictable O(n log n), stable, great for linked lists and external sorting, but needs O(n) extra space.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "合併排序核心概念",
        "text": "<p>下列何者最能描述合併排序的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "將陣列分成兩半,遞迴排序每一半,再將兩個已排序的半段合併",
            "fraction": 100,
            "feedback": "正確 —— 分割、遞迴、再以合併結合。"
          },
          {
            "text": "反覆交換相鄰的逆序元素,直到不再有交換",
            "fraction": 0,
            "feedback": "那是氣泡排序,不是合併排序。"
          },
          {
            "text": "以樞紐進行分割,並在兩側遞迴",
            "fraction": 0,
            "feedback": "那是快速排序的分割,不是合併。"
          },
          {
            "text": "建立堆積,反覆取出最大值",
            "fraction": 0,
            "feedback": "那是堆積排序。"
          }
        ],
        "generalFeedback": "合併排序是分治法:分割、遞迴排序、再合併已排序的區段。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "合併排序最差情況",
        "text": "<p>合併排序的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "正確 —— 共 log n 層合併,每層 O(n)。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "與快速排序不同,合併排序不會退化為平方級。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "比較排序無法優於 O(n log n)。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "至少要處理每個元素。"
          }
        ],
        "generalFeedback": "合併排序的最佳、平均、最差情況皆為 O(n log n) —— 不受輸入順序影響,效能可預期。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "合併排序空間",
        "text": "<p>標準以陣列實作的合併排序,其輔助<strong>空間複雜度</strong>為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 合併需要與輸入成比例的暫存緩衝區。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "標準合併排序不是原地排序;需要 O(n) 緩衝區。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "遞迴堆疊是 O(log n),但合併緩衝區以 O(n) 為主導。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "太多了;單一 O(n) 緩衝區即足夠。"
          }
        ],
        "generalFeedback": "合併步驟會把元素複製到大小 O(n) 的暫存陣列,因此標準合併排序不是原地排序。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "合併排序穩定性",
        "text": "<p>合併排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 相同鍵值時優先取左側區段的合併能保留原有順序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "當合併在相等時取左側元素,合併排序就是穩定的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "合併排序是否原地",
        "text": "<p>標準以陣列實作的合併排序能<em>原地</em>排序,只使用 O(1) 額外記憶體。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 合併步驟需要 O(n) 的輔助緩衝區。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 標準合併排序需要 O(n) 輔助空間。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "合併操作名詞",
        "text": "<p>將兩個已排序的子陣列結合成一個已排序陣列的步驟,英文稱為 ______ 步驟。</p>",
        "answers": [
          {
            "text": "merge",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "merg*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "合併排序設計範式",
        "text": "<p>合併排序是哪一種演算法設計範式的經典範例?請以英文帶連字號的三字詞回答(例如 \"d______-and-c______\")。</p>",
        "answers": [
          {
            "text": "divide-and-conquer",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "divide and conquer",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "divide*conquer",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "合併排序特性",
        "text": "<p>關於合併排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它非常適合排序鏈結串列,並且是外部排序的基礎",
            "fraction": 50,
            "feedback": "正確 —— 鏈結串列合併不需隨機存取,合併也驅動外部排序。"
          },
          {
            "text": "不論輸入的初始順序如何,其執行時間皆為 O(n log n)",
            "fraction": 50,
            "feedback": "正確 —— 最佳、平均、最差皆為 O(n log n)。"
          },
          {
            "text": "它能以 O(1) 額外記憶體原地排序",
            "fraction": -50,
            "feedback": "錯 —— 標準合併排序需要 O(n) 輔助空間。"
          },
          {
            "text": "它不穩定,因此相同鍵值可能被重新排序",
            "fraction": -50,
            "feedback": "錯 —— 合併排序是穩定的。"
          }
        ],
        "generalFeedback": "合併排序:效能可預期的 O(n log n)、穩定、適合鏈結串列與外部排序,但需要 O(n) 額外空間。",
        "single": false
      }
    ]
  },
  "sort-polyphase": {
    "en": [
      {
        "type": "multichoice",
        "name": "What polyphase is",
        "text": "<p>What is <strong>polyphase merge sort</strong>?</p>",
        "answers": [
          {
            "text": "An external (tape) merge-sort strategy that uses P tapes but merges P&minus;1 inputs into one output, rotating roles",
            "fraction": 100,
            "feedback": "Correct — it keeps one output tape and merges from the other P&minus;1, then rotates."
          },
          {
            "text": "An in-memory variant of quicksort using multiple pivots",
            "fraction": 0,
            "feedback": "No — polyphase is an external merge strategy, unrelated to pivots."
          },
          {
            "text": "A hashing scheme for distributing keys across buckets",
            "fraction": 0,
            "feedback": "No — it merges sorted runs across tapes; it is not hashing."
          },
          {
            "text": "A stable counting sort for small integer keys",
            "fraction": 0,
            "feedback": "No — that describes counting sort, not polyphase merge."
          }
        ],
        "generalFeedback": "Polyphase merge sort distributes runs over P tapes and repeatedly does (P&minus;1)-way merges into one output, rotating which tape is the output.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Run distribution",
        "text": "<p>How are the initial runs distributed across the tapes so the merges stay \"perfect\" (no idle passes)?</p>",
        "answers": [
          {
            "text": "In a (generalized) Fibonacci proportion",
            "fraction": 100,
            "feedback": "Correct — Fibonacci-numbered counts keep every merge phase perfectly balanced."
          },
          {
            "text": "Split exactly evenly across all tapes",
            "fraction": 0,
            "feedback": "No — an even split is balanced merge, not polyphase; it wastes rewind passes."
          },
          {
            "text": "All runs placed on a single tape",
            "fraction": 0,
            "feedback": "No — the merges need runs spread over P&minus;1 input tapes."
          },
          {
            "text": "In powers of two on two tapes",
            "fraction": 0,
            "feedback": "No — the distribution follows Fibonacci-like numbers, not simple powers of two."
          }
        ],
        "generalFeedback": "Choosing run counts as consecutive (generalized) Fibonacci numbers lets each phase merge without leaving a tape idle.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Advantage over balanced merge",
        "text": "<p>What is the main advantage of polyphase merge over balanced k-way merge?</p>",
        "answers": [
          {
            "text": "It achieves comparable performance with fewer tapes and avoids full rewind/copy passes",
            "fraction": 100,
            "feedback": "Correct — clever distribution replaces the balanced method's idle rewind/redistribution passes."
          },
          {
            "text": "It removes the need to compare keys at all",
            "fraction": 0,
            "feedback": "No — it still compares keys during each merge."
          },
          {
            "text": "It makes the sort run in O(n) time",
            "fraction": 0,
            "feedback": "No — it is still an O(n log n)-work merge sort; the win is fewer tape passes."
          },
          {
            "text": "It requires no initial run creation phase",
            "fraction": 0,
            "feedback": "No — it still starts by creating sorted runs."
          }
        ],
        "generalFeedback": "Balanced merge needs an even split and wastes rewind/redistribution passes; polyphase trades a Fibonacci distribution for fewer tapes and fewer total passes.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Rotating single output",
        "text": "<p>In polyphase merge sort, each phase merges from P&minus;1 input tapes onto a single output tape, and the roles of the tapes rotate between phases.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — one output, P&minus;1 inputs, and the output role rotates each phase."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — this rotating single-output scheme is exactly how polyphase works."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Even distribution needed",
        "text": "<p>Polyphase merge sort requires the initial runs to be distributed <em>equally</em> across all the tapes.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — it uses an uneven, Fibonacci-like distribution, not an equal split."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — the runs follow a (generalized) Fibonacci distribution, not an even one."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Distribution sequence",
        "text": "<p>The number sequence whose values give the ideal initial run counts for polyphase merge is the ______ sequence.</p>",
        "answers": [
          {
            "text": "Fibonacci",
            "fraction": 100,
            "feedback": "Correct — (generalized) Fibonacci numbers."
          },
          {
            "text": "Fibonacci*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "*Fibonacci*",
            "fraction": 100,
            "feedback": "Correct — generalized Fibonacci also accepted."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Historical use",
        "text": "<p>Polyphase merge sort was historically important for which storage technology?</p>",
        "answers": [
          {
            "text": "Magnetic tape drives, where the number of tapes and rewinds mattered",
            "fraction": 100,
            "feedback": "Correct — minimizing tapes and rewind passes was crucial on tape systems."
          },
          {
            "text": "CPU registers",
            "fraction": 0,
            "feedback": "No — it is about external, sequential storage, not registers."
          },
          {
            "text": "Content-addressable memory",
            "fraction": 0,
            "feedback": "No — the motivation was sequential tape access, not associative memory."
          },
          {
            "text": "GPU shared memory",
            "fraction": 0,
            "feedback": "No — polyphase predates and is unrelated to GPU memory."
          }
        ],
        "generalFeedback": "On tape drives, having few tapes and avoiding rewind/copy passes was vital, which is exactly what polyphase optimizes.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Polyphase properties",
        "text": "<p>Which statements about polyphase merge sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It uses P tapes but merges only P&minus;1 of them at a time into one output",
            "fraction": 50,
            "feedback": "Yes — one tape is the output while P&minus;1 serve as inputs."
          },
          {
            "text": "Initial runs are distributed in (generalized) Fibonacci counts to keep merges perfect",
            "fraction": 50,
            "feedback": "Yes — the Fibonacci distribution avoids idle passes."
          },
          {
            "text": "It splits the runs evenly like balanced merge",
            "fraction": -50,
            "feedback": "No — an even split is balanced merge; polyphase is deliberately uneven."
          },
          {
            "text": "It eliminates the initial run-creation phase entirely",
            "fraction": -50,
            "feedback": "No — sorted runs must still be created first."
          }
        ],
        "generalFeedback": "Polyphase = P tapes, (P&minus;1)-way rotating merges, Fibonacci run distribution; it still needs run creation and is not an even split.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "多相合併是什麼",
        "text": "<p><strong>多相合併排序(polyphase merge sort)</strong>是什麼?</p>",
        "answers": [
          {
            "text": "一種外部(磁帶)合併排序策略,使用 P 條磁帶,但每次以 P&minus;1 個輸入合併到一個輸出,並輪替角色",
            "fraction": 100,
            "feedback": "正確 —— 保留一條輸出磁帶,從其餘 P&minus;1 條合併,然後輪替。"
          },
          {
            "text": "使用多個樞紐的記憶體內快速排序變體",
            "fraction": 0,
            "feedback": "錯 —— 多相是外部合併策略,與樞紐無關。"
          },
          {
            "text": "把鍵值分散到桶中的雜湊方法",
            "fraction": 0,
            "feedback": "錯 —— 它在磁帶間合併已排序段落,並非雜湊。"
          },
          {
            "text": "適用於小整數鍵的穩定計數排序",
            "fraction": 0,
            "feedback": "錯 —— 那描述的是計數排序,不是多相合併。"
          }
        ],
        "generalFeedback": "多相合併排序把段落分散到 P 條磁帶,反覆做 (P&minus;1) 路合併到一個輸出,並輪替哪一條磁帶當輸出。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "段落分配",
        "text": "<p>初始段落如何分配到各磁帶,才能讓合併保持「完美」(沒有閒置的回合)?</p>",
        "answers": [
          {
            "text": "依(廣義)費氏數列比例分配",
            "fraction": 100,
            "feedback": "正確 —— 以費氏數為段落數,可讓每個合併相位完美平衡。"
          },
          {
            "text": "在所有磁帶間完全均分",
            "fraction": 0,
            "feedback": "錯 —— 均分是平衡式合併而非多相;它會浪費倒帶回合。"
          },
          {
            "text": "把所有段落放在單一磁帶上",
            "fraction": 0,
            "feedback": "錯 —— 合併需要段落分散在 P&minus;1 條輸入磁帶上。"
          },
          {
            "text": "在兩條磁帶上以 2 的次方分配",
            "fraction": 0,
            "feedback": "錯 —— 其分配遵循類費氏數,而非單純的 2 的次方。"
          }
        ],
        "generalFeedback": "把段落數選為連續的(廣義)費氏數,可讓每個相位合併時不留下閒置磁帶。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "相較平衡合併的優勢",
        "text": "<p>相較於平衡式 k 路合併,多相合併的主要優勢是什麼?</p>",
        "answers": [
          {
            "text": "以更少的磁帶達到相當的效能,並避免整段倒帶/複製的回合",
            "fraction": 100,
            "feedback": "正確 —— 巧妙的分配取代了平衡法中閒置的倒帶/重新分配回合。"
          },
          {
            "text": "完全不需要比較鍵值",
            "fraction": 0,
            "feedback": "錯 —— 每次合併仍需比較鍵值。"
          },
          {
            "text": "讓排序以 O(n) 時間完成",
            "fraction": 0,
            "feedback": "錯 —— 它仍是 O(n log n) 工作量的合併排序;優勢在於更少的磁帶回合。"
          },
          {
            "text": "不需要建立初始段落的階段",
            "fraction": 0,
            "feedback": "錯 —— 它仍須先建立已排序段落。"
          }
        ],
        "generalFeedback": "平衡式合併需要均分並浪費倒帶/重新分配回合;多相以費氏分配換取更少的磁帶與更少的總回合。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "輪替的單一輸出",
        "text": "<p>在多相合併排序中,每個相位從 P&minus;1 條輸入磁帶合併到單一輸出磁帶,且各磁帶的角色會在相位之間輪替。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 一個輸出、P&minus;1 個輸入,且輸出角色每相位輪替。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 這種輪替單一輸出的機制正是多相的運作方式。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "是否需要均分",
        "text": "<p>多相合併排序要求初始段落<em>均等</em>地分配到所有磁帶。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 它使用不均等的類費氏分配,而非均分。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 段落遵循(廣義)費氏分配,而非均等分配。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "分配所用數列",
        "text": "<p>能給出多相合併理想初始段落數的數列,英文名稱為 ______ 數列。</p>",
        "answers": [
          {
            "text": "Fibonacci",
            "fraction": 100,
            "feedback": "正確 —— (廣義)費氏數。"
          },
          {
            "text": "Fibonacci*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "*Fibonacci*",
            "fraction": 100,
            "feedback": "正確 —— 廣義費氏亦可接受。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "歷史用途",
        "text": "<p>多相合併排序在歷史上對哪一種儲存技術特別重要?</p>",
        "answers": [
          {
            "text": "磁帶機,因為磁帶條數與倒帶次數很關鍵",
            "fraction": 100,
            "feedback": "正確 —— 在磁帶系統上,盡量減少磁帶與倒帶回合至為重要。"
          },
          {
            "text": "CPU 暫存器",
            "fraction": 0,
            "feedback": "錯 —— 這關乎外部、循序的儲存,而非暫存器。"
          },
          {
            "text": "內容定址記憶體",
            "fraction": 0,
            "feedback": "錯 —— 其動機是循序的磁帶存取,而非關聯式記憶體。"
          },
          {
            "text": "GPU 共享記憶體",
            "fraction": 0,
            "feedback": "錯 —— 多相早於 GPU 記憶體,且與之無關。"
          }
        ],
        "generalFeedback": "在磁帶機上,擁有少量磁帶並避免倒帶/複製回合至關重要,而這正是多相所最佳化的。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "多相特性",
        "text": "<p>關於多相合併排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "使用 P 條磁帶,但每次只合併其中 P&minus;1 條到一個輸出",
            "fraction": 50,
            "feedback": "正確 —— 一條磁帶當輸出,其餘 P&minus;1 條作為輸入。"
          },
          {
            "text": "初始段落依(廣義)費氏數分配,以維持合併完美",
            "fraction": 50,
            "feedback": "正確 —— 費氏分配避免閒置回合。"
          },
          {
            "text": "它像平衡式合併那樣把段落均分",
            "fraction": -50,
            "feedback": "錯 —— 均分是平衡式合併;多相刻意採不均等分配。"
          },
          {
            "text": "它完全省去建立初始段落的階段",
            "fraction": -50,
            "feedback": "錯 —— 仍須先建立已排序段落。"
          }
        ],
        "generalFeedback": "多相 = P 條磁帶、(P&minus;1) 路輪替合併、費氏段落分配;它仍需建立段落,且非均分。",
        "single": false
      }
    ]
  },
  "sort-quick": {
    "en": [
      {
        "type": "multichoice",
        "name": "Quicksort average complexity",
        "text": "<p>What is the <strong>average-case</strong> time complexity of quicksort?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "Correct — balanced partitions give log n levels of O(n) work."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "That is the worst case, not the average."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "Comparison sorts cannot beat O(n log n) on average."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "You must at least touch every element."
          }
        ],
        "generalFeedback": "On average each partition splits the array roughly in half, giving ~log n levels of O(n) partitioning.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Quicksort worst case",
        "text": "<p>Which situation triggers quicksort's &Theta;(n<sup>2</sup>) worst case?</p>",
        "answers": [
          {
            "text": "An already-sorted array when the pivot is always the first or last element",
            "fraction": 100,
            "feedback": "Yes — every partition peels off just one element."
          },
          {
            "text": "A random array with a median-of-three pivot",
            "fraction": 0,
            "feedback": "That gives balanced splits, close to the average case."
          },
          {
            "text": "An array containing only distinct primes",
            "fraction": 0,
            "feedback": "Element values do not by themselves cause the worst case."
          }
        ],
        "generalFeedback": "Poor pivot choice on structured input causes maximally unbalanced partitions.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Quicksort stability",
        "text": "<p>Standard quicksort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "Partitioning swaps distant elements, so equal keys can be reordered."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — quicksort is not stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Quicksort in place",
        "text": "<p>In-place quicksort uses only O(log n) extra space on average (the recursion stack).</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — no auxiliary array; just the call stack."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Unlike merge sort, quicksort partitions in place."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Pivot term",
        "text": "<p>The element chosen to partition the array around is called the ______.</p>",
        "answers": [
          {
            "text": "pivot",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "pivot*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Lomuto partition",
        "text": "<p>Which statements about the Lomuto partition scheme are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It scans with one index and keeps a boundary for elements &le; pivot",
            "fraction": 50,
            "feedback": "Yes."
          },
          {
            "text": "After partitioning, the pivot sits in its final sorted position",
            "fraction": 50,
            "feedback": "Yes."
          },
          {
            "text": "It makes quicksort stable",
            "fraction": -50,
            "feedback": "No — partitioning is not stable."
          },
          {
            "text": "It always selects the true median as the pivot",
            "fraction": -50,
            "feedback": "No — it typically uses the last element."
          }
        ],
        "generalFeedback": "Lomuto: single forward scan, boundary index, pivot lands in place; it is neither stable nor median-selecting.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "快速排序平均複雜度",
        "text": "<p>快速排序的<strong>平均情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "正確 —— 平衡分割產生約 log n 層、每層 O(n)。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "那是最差情況,不是平均。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "比較排序平均無法優於 O(n log n)。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "至少要碰過每個元素。"
          }
        ],
        "generalFeedback": "平均而言每次分割大致對半,約 log n 層、每層 O(n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "快速排序最差情況",
        "text": "<p>哪一種情況會觸發快速排序的 &Theta;(n<sup>2</sup>) 最差情況?</p>",
        "answers": [
          {
            "text": "當樞紐總是取第一個或最後一個元素,且陣列已經排序好",
            "fraction": 100,
            "feedback": "正確 —— 每次分割只切下一個元素。"
          },
          {
            "text": "使用三數取中樞紐的隨機陣列",
            "fraction": 0,
            "feedback": "那會產生平衡分割,接近平均情況。"
          },
          {
            "text": "只包含相異質數的陣列",
            "fraction": 0,
            "feedback": "元素的數值本身不會造成最差情況。"
          }
        ],
        "generalFeedback": "對結構化輸入選到不良樞紐,會造成極度不平衡的分割。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "快速排序穩定性",
        "text": "<p>標準的快速排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "分割會交換相距很遠的元素,因此相同鍵值可能被重新排序。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 快速排序並不穩定。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "原地快速排序",
        "text": "<p>原地快速排序平均只使用 O(log n) 的額外空間(遞迴堆疊)。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 不需要輔助陣列,只有呼叫堆疊。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "與合併排序不同,快速排序是原地分割。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "樞紐名詞",
        "text": "<p>用來對陣列進行分割所選定的元素稱為 ______。</p>",
        "answers": [
          {
            "text": "pivot",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "pivot*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Lomuto 分割",
        "text": "<p>關於 Lomuto 分割法,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "以單一索引掃描,並維護一個小於等於樞紐元素的邊界",
            "fraction": 50,
            "feedback": "正確。"
          },
          {
            "text": "分割完成後,樞紐會位於其最終排序位置",
            "fraction": 50,
            "feedback": "正確。"
          },
          {
            "text": "它會讓快速排序變得穩定",
            "fraction": -50,
            "feedback": "錯 —— 分割並不穩定。"
          },
          {
            "text": "它一定會選擇真正的中位數作為樞紐",
            "fraction": -50,
            "feedback": "錯 —— 它通常使用最後一個元素。"
          }
        ],
        "generalFeedback": "Lomuto:單向掃描、邊界索引、樞紐就定位;它既不穩定也不選中位數。",
        "single": false
      }
    ]
  },
  "sort-radix": {
    "en": [
      {
        "type": "multichoice",
        "name": "Radix sort mechanism",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of LSD radix sort?</p>",
        "answers": [
          {
            "text": "Sort by one digit at a time from least-significant to most-significant, using a stable sort on each digit pass",
            "fraction": 100,
            "feedback": "Correct — LSD processes digits from least to most significant with a stable per-digit sort."
          },
          {
            "text": "Repeatedly swap adjacent elements that are out of order",
            "fraction": 0,
            "feedback": "That is bubble sort."
          },
          {
            "text": "Recursively pick a pivot and partition around it",
            "fraction": 0,
            "feedback": "That is quicksort."
          },
          {
            "text": "Compare full keys with a balanced binary search tree",
            "fraction": 0,
            "feedback": "That is a comparison-based tree sort, not radix sort."
          }
        ],
        "generalFeedback": "LSD radix sort makes d passes, one per digit from least to most significant, each pass being a stable sort that preserves the order established by earlier passes.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Radix sort complexity",
        "text": "<p>What is the time complexity of radix sort, where d = number of digits and k = the base/radix?</p>",
        "answers": [
          {
            "text": "O(d &middot; (n + k))",
            "fraction": 100,
            "feedback": "Correct — d passes, each a counting sort costing O(n + k)."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is the comparison-sort bound; radix sort is not comparison-based."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "Radix sort does not degrade to quadratic time."
          },
          {
            "text": "O(n + k)",
            "fraction": 0,
            "feedback": "That is a single counting-sort pass; radix sort runs d such passes."
          }
        ],
        "generalFeedback": "Each of the d digit passes is a stable counting sort taking O(n + k), so the total is O(d(n + k)).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Radix sort per-digit subroutine",
        "text": "<p>Which stable sort is <strong>typically</strong> used to sort each digit within LSD radix sort?</p>",
        "answers": [
          {
            "text": "Counting sort",
            "fraction": 100,
            "feedback": "Correct — counting sort is stable and linear per digit."
          },
          {
            "text": "Quicksort",
            "fraction": 0,
            "feedback": "Quicksort is not stable, which would break the per-digit invariant."
          },
          {
            "text": "Heapsort",
            "fraction": 0,
            "feedback": "Heapsort is not stable and is comparison-based."
          },
          {
            "text": "Binary search",
            "fraction": 0,
            "feedback": "Binary search is not a sorting algorithm."
          }
        ],
        "generalFeedback": "Counting sort is the usual per-digit subroutine because it is stable and runs in O(n + k) per pass.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Radix sort stability",
        "text": "<p>LSD radix sort requires that the sort used on each digit be <em>stable</em> for the overall result to be correct.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — stability preserves the ordering from less-significant digits across later passes."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Without a stable per-digit sort, earlier-digit order would be lost."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Radix sort comparison-based",
        "text": "<p>Radix sort is a <em>comparison-based</em> algorithm bound by the &Omega;(n log n) lower bound.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — it distributes elements by digit values rather than comparing whole keys."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — radix sort is not comparison-based."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Radix per-digit sort name",
        "text": "<p>Name the stable linear-time sort commonly used on each digit pass of radix sort (two English words, e.g. \"counting sort\").</p>",
        "answers": [
          {
            "text": "counting sort",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "counting*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "LSD starting digit",
        "text": "<p>LSD radix sort begins with the ______-significant digit (fill in the English word: least or most).</p>",
        "answers": [
          {
            "text": "least",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "least*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Radix sort properties",
        "text": "<p>Which statements about radix sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Its auxiliary space is O(n + k)",
            "fraction": 50,
            "feedback": "Yes — the per-pass counting sort needs an output array of size n and counts of size k."
          },
          {
            "text": "It works well for fixed-width integers or strings",
            "fraction": 50,
            "feedback": "Yes — a bounded number of digits keeps d small."
          },
          {
            "text": "It compares whole keys against one another",
            "fraction": -50,
            "feedback": "No — it distributes by individual digits, not by comparing full keys."
          },
          {
            "text": "An unstable per-digit sort works just as well",
            "fraction": -50,
            "feedback": "No — LSD radix sort requires a stable per-digit sort."
          }
        ],
        "generalFeedback": "Radix sort uses O(n + k) space, suits fixed-width keys, never compares whole keys, and depends on a stable per-digit sort.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "基數排序機制",
        "text": "<p>下列何者最能描述 LSD 基數排序的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "從最低位數到最高位數,一次處理一個位數,每一趟位數都使用穩定排序",
            "fraction": 100,
            "feedback": "正確 —— LSD 由最低位到最高位處理,每趟位數使用穩定排序。"
          },
          {
            "text": "反覆交換相鄰且順序顛倒的元素",
            "fraction": 0,
            "feedback": "那是氣泡排序。"
          },
          {
            "text": "遞迴選取樞紐並圍繞它分割",
            "fraction": 0,
            "feedback": "那是快速排序。"
          },
          {
            "text": "以平衡二元搜尋樹比較完整鍵值",
            "fraction": 0,
            "feedback": "那是比較式的樹狀排序,不是基數排序。"
          }
        ],
        "generalFeedback": "LSD 基數排序進行 d 趟,由最低位到最高位各一趟,每趟都是穩定排序,以保留前面各趟建立的順序。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "基數排序複雜度",
        "text": "<p>基數排序的時間複雜度為何?其中 d = 位數個數,k = 基底(radix)。</p>",
        "answers": [
          {
            "text": "O(d &middot; (n + k))",
            "fraction": 100,
            "feedback": "正確 —— 共 d 趟,每趟為一次成本 O(n + k) 的計數排序。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是比較排序的界限;基數排序並非比較式。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "基數排序不會退化為平方時間。"
          },
          {
            "text": "O(n + k)",
            "fraction": 0,
            "feedback": "那是單一趟計數排序;基數排序會執行 d 趟這樣的排序。"
          }
        ],
        "generalFeedback": "d 趟中的每一趟都是成本 O(n + k) 的穩定計數排序,故總計為 O(d(n + k))。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "基數排序的每位數子程序",
        "text": "<p>在 LSD 基數排序中,<strong>通常</strong>使用哪一種穩定排序來排序每個位數?</p>",
        "answers": [
          {
            "text": "計數排序",
            "fraction": 100,
            "feedback": "正確 —— 計數排序穩定且每位數為線性。"
          },
          {
            "text": "快速排序",
            "fraction": 0,
            "feedback": "快速排序不穩定,會破壞每位數的不變性。"
          },
          {
            "text": "堆積排序",
            "fraction": 0,
            "feedback": "堆積排序不穩定且為比較式。"
          },
          {
            "text": "二分搜尋",
            "fraction": 0,
            "feedback": "二分搜尋不是排序演算法。"
          }
        ],
        "generalFeedback": "計數排序是常用的每位數子程序,因為它穩定且每趟為 O(n + k)。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "基數排序穩定性",
        "text": "<p>LSD 基數排序要求每個位數所用的排序必須是<em>穩定</em>的,整體結果才會正確。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 穩定性能在後續各趟中保留低位數建立的順序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "若每位數的排序不穩定,先前位數的順序就會遺失。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "基數排序是否為比較排序",
        "text": "<p>基數排序是一種<em>比較式</em>演算法,受 &Omega;(n log n) 下界所限。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 它依位數值分配元素,而非比較整個鍵值。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 基數排序並非比較式。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "基數排序每位數所用排序名稱",
        "text": "<p>寫出基數排序每一趟位數常用的穩定、線性時間排序名稱(兩個英文字,例如 \"counting sort\")。</p>",
        "answers": [
          {
            "text": "counting sort",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "counting*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "LSD 起始位數",
        "text": "<p>LSD 基數排序從 ______ 位數開始處理(填入英文單字:least 或 most)。</p>",
        "answers": [
          {
            "text": "least",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "least*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "基數排序性質",
        "text": "<p>關於基數排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它的輔助空間為 O(n + k)",
            "fraction": 50,
            "feedback": "正確 —— 每趟計數排序需要大小 n 的輸出陣列與大小 k 的計數。"
          },
          {
            "text": "它很適合固定寬度的整數或字串",
            "fraction": 50,
            "feedback": "正確 —— 位數個數有上限可使 d 保持很小。"
          },
          {
            "text": "它會把完整鍵值兩兩相互比較",
            "fraction": -50,
            "feedback": "錯 —— 它依個別位數分配,而非比較完整鍵值。"
          },
          {
            "text": "使用不穩定的每位數排序也一樣可行",
            "fraction": -50,
            "feedback": "錯 —— LSD 基數排序需要穩定的每位數排序。"
          }
        ],
        "generalFeedback": "基數排序使用 O(n + k) 空間、適合固定寬度鍵值、從不比較完整鍵值,且依賴穩定的每位數排序。",
        "single": false
      }
    ]
  },
  "sort-select": {
    "en": [
      {
        "type": "multichoice",
        "name": "Selection sort core mechanism",
        "text": "<p>What does selection sort do on each iteration?</p>",
        "answers": [
          {
            "text": "Finds the minimum of the unsorted part and swaps it to the boundary of the sorted part",
            "fraction": 100,
            "feedback": "Correct — it selects the smallest remaining element and places it next."
          },
          {
            "text": "Compares and swaps adjacent elements repeatedly",
            "fraction": 0,
            "feedback": "That describes bubble sort."
          },
          {
            "text": "Shifts larger sorted elements right to insert the next element",
            "fraction": 0,
            "feedback": "That describes insertion sort."
          },
          {
            "text": "Partitions the array around a pivot",
            "fraction": 0,
            "feedback": "That describes quicksort."
          }
        ],
        "generalFeedback": "Selection sort scans the unsorted region for its minimum, then swaps that minimum into the growing sorted prefix's boundary.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Selection sort comparison count",
        "text": "<p>How many <strong>comparisons</strong> does selection sort make across best, average, and worst cases?</p>",
        "answers": [
          {
            "text": "Always &Theta;(n^2) — it is not adaptive",
            "fraction": 100,
            "feedback": "Correct — it scans the whole unsorted part every time regardless of input order."
          },
          {
            "text": "O(n) in the best case, O(n^2) otherwise",
            "fraction": 0,
            "feedback": "No — unlike insertion or bubble sort, selection sort has no early-exit; it always does &Theta;(n^2) comparisons."
          },
          {
            "text": "O(n log n) on average",
            "fraction": 0,
            "feedback": "No — selection sort does not divide the problem; it is quadratic."
          },
          {
            "text": "O(n) always",
            "fraction": 0,
            "feedback": "No — finding each minimum requires scanning the remaining elements."
          }
        ],
        "generalFeedback": "Selection sort always performs about n(n-1)/2 comparisons regardless of the input, so best = average = worst = &Theta;(n^2). It is not adaptive.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Selection sort swap count",
        "text": "<p>What is notable about the number of <strong>swaps (writes)</strong> selection sort performs?</p>",
        "answers": [
          {
            "text": "Only O(n) swaps — at most one per iteration",
            "fraction": 100,
            "feedback": "Correct — this makes it attractive when writes are expensive (e.g. flash memory)."
          },
          {
            "text": "O(n^2) swaps, matching its comparison count",
            "fraction": 0,
            "feedback": "No — comparisons are O(n^2) but swaps are only O(n)."
          },
          {
            "text": "O(n log n) swaps",
            "fraction": 0,
            "feedback": "No — selection sort does at most one swap per pass, so O(n) total."
          },
          {
            "text": "Zero swaps; it uses an auxiliary array",
            "fraction": 0,
            "feedback": "No — it sorts in place with swaps."
          }
        ],
        "generalFeedback": "Selection sort makes at most one swap per outer iteration, so only O(n) writes overall — useful when write cost dominates.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Selection sort stability",
        "text": "<p>The standard array-based selection sort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — swapping a distant minimum into place can jump one equal key past another, breaking relative order."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — the standard array version is not stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Selection sort in place",
        "text": "<p>Selection sort is in-place, using only O(1) extra space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it sorts by swapping within the array, needing only constant extra memory."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Selection sort needs no auxiliary array; swaps happen in place."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Selection sort selected term",
        "text": "<p>On each pass, selection sort searches the unsorted part for its ______ element (the smallest). Answer in one English word.</p>",
        "answers": [
          {
            "text": "minimum",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "minimum*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "min*",
            "fraction": 100,
            "feedback": "Correct — \"minimum\"."
          },
          {
            "text": "smallest",
            "fraction": 100,
            "feedback": "Correct — the minimum element."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Selection sort properties",
        "text": "<p>Which statements about selection sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It performs only O(n) swaps, useful when writes are costly",
            "fraction": 50,
            "feedback": "Yes — at most one swap per outer pass."
          },
          {
            "text": "Its comparison count is &Theta;(n^2) regardless of the input",
            "fraction": 50,
            "feedback": "Yes — it is not adaptive."
          },
          {
            "text": "It runs in O(n) on an already-sorted array",
            "fraction": -50,
            "feedback": "No — it is not adaptive; it is always &Theta;(n^2) comparisons."
          },
          {
            "text": "The standard array version is stable",
            "fraction": -50,
            "feedback": "No — the standard array version is not stable."
          }
        ],
        "generalFeedback": "Selection sort: always &Theta;(n^2) comparisons but only O(n) swaps; in-place; not adaptive; the standard array version is not stable.",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "When to use selection sort",
        "text": "<p>When is selection sort a particularly reasonable choice?</p>",
        "answers": [
          {
            "text": "When the cost of writing/swapping elements dominates and you want to minimize the number of writes",
            "fraction": 100,
            "feedback": "Correct — it does at most O(n) swaps, which is its main practical appeal."
          },
          {
            "text": "When the input is nearly sorted and you want O(n) behaviour",
            "fraction": 0,
            "feedback": "No — selection sort is not adaptive; insertion sort is the adaptive choice."
          },
          {
            "text": "When you must sort millions of records quickly",
            "fraction": 0,
            "feedback": "No — O(n^2) comparisons make it too slow at scale."
          }
        ],
        "generalFeedback": "Selection sort's edge is its O(n) writes; choose it when swaps/writes are the expensive operation, not for large or nearly-sorted inputs.",
        "single": true
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "選擇排序核心機制",
        "text": "<p>選擇排序在每一輪迭代做什麼?</p>",
        "answers": [
          {
            "text": "從未排序部分找出最小值,並交換到已排序部分的邊界",
            "fraction": 100,
            "feedback": "正確 —— 它選出剩餘最小的元素,放到下一個位置。"
          },
          {
            "text": "反覆比較並交換相鄰元素",
            "fraction": 0,
            "feedback": "那是氣泡排序。"
          },
          {
            "text": "將較大的已排序元素右移,以插入下一個元素",
            "fraction": 0,
            "feedback": "那是插入排序。"
          },
          {
            "text": "以樞紐對陣列進行分割",
            "fraction": 0,
            "feedback": "那是快速排序。"
          }
        ],
        "generalFeedback": "選擇排序在未排序區域掃描其最小值,然後把該最小值交換到逐漸成長的已排序前綴之邊界。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "選擇排序比較次數",
        "text": "<p>選擇排序在最佳、平均與最差情況下做多少次<strong>比較</strong>?</p>",
        "answers": [
          {
            "text": "永遠是 &Theta;(n^2) —— 它不具適應性",
            "fraction": 100,
            "feedback": "正確 —— 不論輸入順序,它每次都掃描整個未排序部分。"
          },
          {
            "text": "最佳情況 O(n),其餘為 O(n^2)",
            "fraction": 0,
            "feedback": "錯 —— 與插入或氣泡排序不同,選擇排序沒有提早結束;它永遠做 &Theta;(n^2) 次比較。"
          },
          {
            "text": "平均為 O(n log n)",
            "fraction": 0,
            "feedback": "錯 —— 選擇排序不切分問題;它是平方級的。"
          },
          {
            "text": "永遠 O(n)",
            "fraction": 0,
            "feedback": "錯 —— 找出每個最小值都需掃描剩餘元素。"
          }
        ],
        "generalFeedback": "選擇排序不論輸入永遠做約 n(n-1)/2 次比較,因此最佳=平均=最差=&Theta;(n^2)。它不具適應性。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "選擇排序交換次數",
        "text": "<p>選擇排序所做的<strong>交換(寫入)</strong>次數有何值得注意之處?</p>",
        "answers": [
          {
            "text": "只有 O(n) 次交換 —— 每輪迭代至多一次",
            "fraction": 100,
            "feedback": "正確 —— 當寫入昂貴時(例如快閃記憶體)這很有吸引力。"
          },
          {
            "text": "O(n^2) 次交換,與其比較次數相同",
            "fraction": 0,
            "feedback": "錯 —— 比較是 O(n^2),但交換只有 O(n)。"
          },
          {
            "text": "O(n log n) 次交換",
            "fraction": 0,
            "feedback": "錯 —— 選擇排序每趟至多一次交換,總計 O(n)。"
          },
          {
            "text": "零次交換;它使用輔助陣列",
            "fraction": 0,
            "feedback": "錯 —— 它以交換原地排序。"
          }
        ],
        "generalFeedback": "選擇排序每輪外層迭代至多一次交換,因此總寫入只有 O(n) —— 當寫入成本佔主導時很有用。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "選擇排序穩定性",
        "text": "<p>標準以陣列實作的選擇排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 把相距很遠的最小值交換就位,可能讓一個相等鍵值跳過另一個,破壞相對順序。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 標準陣列版本並不穩定。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "原地選擇排序",
        "text": "<p>選擇排序是原地(in-place)的,只使用 O(1) 的額外空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它在陣列內交換排序,只需常數量的額外記憶體。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "選擇排序不需輔助陣列;交換就地進行。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "選擇排序所選名詞",
        "text": "<p>每一趟,選擇排序在未排序部分尋找它的 ______ 元素(最小的那個)。以一個英文單字作答。</p>",
        "answers": [
          {
            "text": "minimum",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "minimum*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "min*",
            "fraction": 100,
            "feedback": "正確 ——「minimum」。"
          },
          {
            "text": "smallest",
            "fraction": 100,
            "feedback": "正確 —— 最小元素。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "選擇排序性質",
        "text": "<p>關於選擇排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它只做 O(n) 次交換,當寫入昂貴時很有用",
            "fraction": 50,
            "feedback": "正確 —— 每輪外層迭代至多一次交換。"
          },
          {
            "text": "不論輸入,它的比較次數都是 &Theta;(n^2)",
            "fraction": 50,
            "feedback": "正確 —— 它不具適應性。"
          },
          {
            "text": "對已排序好的陣列它以 O(n) 執行",
            "fraction": -50,
            "feedback": "錯 —— 它不具適應性;比較永遠是 &Theta;(n^2)。"
          },
          {
            "text": "標準陣列版本是穩定的",
            "fraction": -50,
            "feedback": "錯 —— 標準陣列版本並不穩定。"
          }
        ],
        "generalFeedback": "選擇排序:比較永遠 &Theta;(n^2),但交換只有 O(n);原地;不具適應性;標準陣列版本不穩定。",
        "single": false
      },
      {
        "type": "multichoice",
        "name": "何時使用選擇排序",
        "text": "<p>選擇排序在什麼情況下特別合理?</p>",
        "answers": [
          {
            "text": "當寫入/交換元素的成本佔主導,且你想把寫入次數降到最低時",
            "fraction": 100,
            "feedback": "正確 —— 它至多做 O(n) 次交換,這是它主要的實務優勢。"
          },
          {
            "text": "當輸入近乎排序好、你想要 O(n) 的行為時",
            "fraction": 0,
            "feedback": "錯 —— 選擇排序不具適應性;插入排序才是具適應性的選擇。"
          },
          {
            "text": "當你必須快速排序數百萬筆記錄時",
            "fraction": 0,
            "feedback": "錯 —— O(n^2) 次比較在大規模下太慢。"
          }
        ],
        "generalFeedback": "選擇排序的優勢在於 O(n) 的寫入;當交換/寫入是昂貴操作時選它,而非用於大型或近乎排序好的輸入。",
        "single": true
      }
    ]
  },
  "sort-shaker": {
    "en": [
      {
        "type": "multichoice",
        "name": "Shaker sort core idea",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of cocktail shaker sort?</p>",
        "answers": [
          {
            "text": "Like bubble sort, but it alternates direction each pass — left-to-right, then right-to-left",
            "fraction": 100,
            "feedback": "Correct — bidirectional bubbling moves the largest to the end and the smallest to the front."
          },
          {
            "text": "Divide the array into halves, sort each, then merge",
            "fraction": 0,
            "feedback": "That is merge sort."
          },
          {
            "text": "Build a heap and repeatedly extract the maximum",
            "fraction": 0,
            "feedback": "That is heap sort."
          },
          {
            "text": "Insertion-sort elements at diminishing gaps",
            "fraction": 0,
            "feedback": "That is shell sort."
          }
        ],
        "generalFeedback": "Shaker sort is a bidirectional bubble sort: each round bubbles the largest element rightward, then the smallest element leftward.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Shaker sort worst case",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of shaker sort?</p>",
        "answers": [
          {
            "text": "O(n^2)",
            "fraction": 100,
            "feedback": "Correct — like bubble sort, it does quadratic work in the worst case."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "No — that would require a divide-and-conquer or heap approach."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is only the best case, on nearly-sorted input."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "Far too fast for a comparison-swap bubble variant."
          }
        ],
        "generalFeedback": "Shaker sort's average and worst cases are O(n^2); its bidirectional passes only offer a constant-factor improvement over plain bubble sort.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Shaker sort best case",
        "text": "<p>With an early-exit check, what is shaker sort's <strong>best-case</strong> time on an already-sorted array?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — one pass with no swaps detects sortedness and stops."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "That is the worst case, not the best."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "No — a single clean pass is linear."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "You still must scan all n elements once to confirm order."
          }
        ],
        "generalFeedback": "Because it can stop when a pass makes no swaps, shaker sort is adaptive: already-sorted input costs only O(n).",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Shaker sort stability",
        "text": "<p>Shaker sort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it only swaps adjacent elements when strictly out of order, preserving equal keys' order."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It is stable: adjacent-only swaps never reorder equal keys."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Shaker sort in place",
        "text": "<p>Shaker sort is an in-place algorithm using only O(1) auxiliary space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it swaps within the array with constant extra memory."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Shaker sort needs no auxiliary array; it sorts in place."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Shaker sort base algorithm",
        "text": "<p>Shaker sort is a bidirectional variant of which basic O(n^2) sort? Answer with one English word.</p>",
        "answers": [
          {
            "text": "bubble",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "bubble*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "Shaker sort turtles",
        "text": "<p>Small values stuck near the end of the array, which plain bubble sort moves very slowly, are nicknamed ______. Shaker sort mitigates them by also passing right-to-left.</p>",
        "answers": [
          {
            "text": "turtles",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "turtle*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Shaker sort properties",
        "text": "<p>Which statements about shaker sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It is stable and sorts in place",
            "fraction": 50,
            "feedback": "Yes — adjacent swaps keep it stable, and it needs only O(1) extra space."
          },
          {
            "text": "By passing in both directions it reduces the \"turtles\" problem of plain bubble sort",
            "fraction": 50,
            "feedback": "Yes — the right-to-left pass moves small values toward the front quickly."
          },
          {
            "text": "Its average-case time is O(n log n)",
            "fraction": -50,
            "feedback": "No — its average case is O(n^2)."
          },
          {
            "text": "It is a divide-and-conquer algorithm",
            "fraction": -50,
            "feedback": "No — it is a bubble-sort variant, not divide-and-conquer."
          }
        ],
        "generalFeedback": "Shaker sort: stable, in-place, adaptive (best O(n)), but average/worst O(n^2) — only a constant-factor gain over bubble sort.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "雞尾酒排序核心概念",
        "text": "<p>下列何者最能描述雞尾酒(搖動)排序的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "類似氣泡排序,但每一回合交替方向 —— 先由左到右,再由右到左",
            "fraction": 100,
            "feedback": "正確 —— 雙向冒泡把最大值移到尾端、最小值移到前端。"
          },
          {
            "text": "將陣列分成兩半,各自排序,再合併",
            "fraction": 0,
            "feedback": "那是合併排序。"
          },
          {
            "text": "建立堆積,反覆取出最大值",
            "fraction": 0,
            "feedback": "那是堆積排序。"
          },
          {
            "text": "以逐漸縮小的間隔做插入排序",
            "fraction": 0,
            "feedback": "那是希爾排序。"
          }
        ],
        "generalFeedback": "搖動排序是雙向氣泡排序:每一輪先將最大元素往右冒泡,再將最小元素往左冒泡。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "雞尾酒排序最差情況",
        "text": "<p>搖動排序的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n^2)",
            "fraction": 100,
            "feedback": "正確 —— 與氣泡排序相同,最差情況為平方級工作量。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "錯 —— 那需要分治或堆積的做法。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那只是最佳情況,發生在幾乎已排序的輸入。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "對於比較交換的氣泡變體來說太快了。"
          }
        ],
        "generalFeedback": "搖動排序的平均與最差情況皆為 O(n^2);其雙向回合僅比普通氣泡排序帶來常數因子的改善。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "雞尾酒排序最佳情況",
        "text": "<p>在具備提早結束檢查的情況下,搖動排序對已排序陣列的<strong>最佳情況</strong>時間為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 一次沒有交換的掃描即可偵測已排序並停止。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "那是最差情況,不是最佳。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "錯 —— 單次乾淨掃描是線性的。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "你仍須掃描全部 n 個元素一次以確認順序。"
          }
        ],
        "generalFeedback": "因為在某一回合沒有交換時即可停止,搖動排序具適應性:已排序輸入僅耗費 O(n)。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "雞尾酒排序穩定性",
        "text": "<p>搖動排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它只在嚴格逆序時交換相鄰元素,能保留相同鍵值的順序。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "它是穩定的:僅交換相鄰元素永遠不會重新排列相同鍵值。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "雞尾酒排序是否原地",
        "text": "<p>搖動排序是原地演算法,只使用 O(1) 輔助空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它在陣列內以常數額外記憶體交換。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "搖動排序不需輔助陣列;它是原地排序。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "雞尾酒排序基礎演算法",
        "text": "<p>搖動排序是哪一種基本 O(n^2) 排序的雙向變體?請以一個英文單字作答。</p>",
        "answers": [
          {
            "text": "bubble",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "bubble*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "雞尾酒排序中的烏龜",
        "text": "<p>卡在陣列尾端附近、普通氣泡排序移動得非常慢的小數值,英文暱稱為 ______。搖動排序藉由也進行由右到左的掃描來緩解它們。</p>",
        "answers": [
          {
            "text": "turtles",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "turtle*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "雞尾酒排序特性",
        "text": "<p>關於搖動排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它是穩定的且原地排序",
            "fraction": 50,
            "feedback": "正確 —— 相鄰交換使其穩定,且只需 O(1) 額外空間。"
          },
          {
            "text": "藉由雙向掃描,它減輕了普通氣泡排序的「烏龜」問題",
            "fraction": 50,
            "feedback": "正確 —— 由右到左的掃描讓小數值快速往前端移動。"
          },
          {
            "text": "它的平均情況時間是 O(n log n)",
            "fraction": -50,
            "feedback": "錯 —— 其平均情況為 O(n^2)。"
          },
          {
            "text": "它是分治演算法",
            "fraction": -50,
            "feedback": "錯 —— 它是氣泡排序的變體,不是分治。"
          }
        ],
        "generalFeedback": "搖動排序:穩定、原地、具適應性(最佳 O(n)),但平均/最差為 O(n^2) —— 相較氣泡排序僅有常數因子的改善。",
        "single": false
      }
    ]
  },
  "sort-shell": {
    "en": [
      {
        "type": "multichoice",
        "name": "Shell sort core idea",
        "text": "<p>Which best describes the <strong>core mechanism</strong> of shell sort?</p>",
        "answers": [
          {
            "text": "Insertion-sort elements that are a fixed gap apart, then repeat with a smaller gap until the gap is 1",
            "fraction": 100,
            "feedback": "Correct — it h-sorts with a diminishing gap sequence."
          },
          {
            "text": "Divide into halves, recursively sort, then merge",
            "fraction": 0,
            "feedback": "That is merge sort."
          },
          {
            "text": "Partition around a pivot and recurse on each side",
            "fraction": 0,
            "feedback": "That is quicksort."
          },
          {
            "text": "Build a heap and repeatedly extract the maximum",
            "fraction": 0,
            "feedback": "That is heap sort."
          }
        ],
        "generalFeedback": "Shell sort generalizes insertion sort: by first sorting far-apart elements, it moves items closer to their final position quickly, then finishes with a gap-1 insertion sort.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Shell sort is a generalization of",
        "text": "<p>Shell sort is best understood as a generalization of which simpler sort?</p>",
        "answers": [
          {
            "text": "Insertion sort",
            "fraction": 100,
            "feedback": "Correct — each gap pass is an insertion sort over gap-spaced subsequences."
          },
          {
            "text": "Merge sort",
            "fraction": 0,
            "feedback": "No — shell sort does not merge sorted runs."
          },
          {
            "text": "Heap sort",
            "fraction": 0,
            "feedback": "No — shell sort uses no heap."
          },
          {
            "text": "Counting sort",
            "fraction": 0,
            "feedback": "No — shell sort is comparison-based, not key-distribution based."
          }
        ],
        "generalFeedback": "With gap = 1, shell sort is exactly insertion sort; larger gaps let elements jump toward their final spot, reducing later work.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Shell sort time depends on",
        "text": "<p>The overall time complexity of shell sort depends primarily on what?</p>",
        "answers": [
          {
            "text": "The chosen gap (increment) sequence",
            "fraction": 100,
            "feedback": "Correct — Shell's original gaps give O(n^2), while Hibbard/Sedgewick sequences give roughly O(n^1.5) or better."
          },
          {
            "text": "The pivot-selection strategy",
            "fraction": 0,
            "feedback": "Shell sort has no pivot."
          },
          {
            "text": "The size of the auxiliary merge buffer",
            "fraction": 0,
            "feedback": "Shell sort uses no merge buffer."
          },
          {
            "text": "Nothing — it is always exactly O(n log n)",
            "fraction": 0,
            "feedback": "No — its complexity varies with the gap sequence."
          }
        ],
        "generalFeedback": "Shell's original gaps → worst case O(n^2); better sequences (Hibbard ~O(n^1.5), Sedgewick ~O(n^(4/3))) improve it substantially.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Shell sort stability",
        "text": "<p>Shell sort is a <em>stable</em> sorting algorithm.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — comparing and moving elements across large gaps can reorder equal keys."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — shell sort is not stable."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Shell sort in place",
        "text": "<p>Shell sort is an in-place algorithm using only O(1) auxiliary space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it rearranges within the array with a constant amount of extra memory."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Shell sort needs no auxiliary array; it sorts in place."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Shell sort gap term",
        "text": "<p>The spacing between the elements compared in one pass of shell sort is called the ______ (also known as the increment).</p>",
        "answers": [
          {
            "text": "gap",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "gap*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "Shell sort final gap",
        "text": "<p>What gap value does the final pass of shell sort always use? Answer with a single digit.</p>",
        "answers": [
          {
            "text": "1",
            "fraction": 100,
            "feedback": "Correct — the last pass is a plain insertion sort with gap 1."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Shell sort properties",
        "text": "<p>Which statements about shell sort are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It improves on insertion sort by first moving elements over long distances",
            "fraction": 50,
            "feedback": "Yes — large gaps quickly reduce disorder before the final gap-1 pass."
          },
          {
            "text": "Its worst-case complexity depends on the gap sequence used",
            "fraction": 50,
            "feedback": "Yes — e.g. Shell's gaps give O(n^2), Hibbard's give ~O(n^1.5)."
          },
          {
            "text": "It is stable and preserves the order of equal keys",
            "fraction": -50,
            "feedback": "No — shell sort is not stable."
          },
          {
            "text": "It requires O(n) auxiliary space like merge sort",
            "fraction": -50,
            "feedback": "No — shell sort is in-place, O(1) extra space."
          }
        ],
        "generalFeedback": "Shell sort: in-place, not stable, a gap-based generalization of insertion sort whose speed hinges on the increment sequence.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "希爾排序核心概念",
        "text": "<p>下列何者最能描述希爾排序的<strong>核心機制</strong>?</p>",
        "answers": [
          {
            "text": "對相距固定間隔的元素做插入排序,再以更小的間隔重複,直到間隔為 1",
            "fraction": 100,
            "feedback": "正確 —— 它以逐漸縮小的間隔序列進行 h-排序。"
          },
          {
            "text": "分成兩半,遞迴排序,再合併",
            "fraction": 0,
            "feedback": "那是合併排序。"
          },
          {
            "text": "以樞紐分割,並在兩側遞迴",
            "fraction": 0,
            "feedback": "那是快速排序。"
          },
          {
            "text": "建立堆積,反覆取出最大值",
            "fraction": 0,
            "feedback": "那是堆積排序。"
          }
        ],
        "generalFeedback": "希爾排序是插入排序的推廣:先排序相距較遠的元素,讓元素快速接近最終位置,最後再以間隔 1 的插入排序收尾。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "希爾排序是何者的推廣",
        "text": "<p>希爾排序最適合理解為哪一種較簡單排序的推廣?</p>",
        "answers": [
          {
            "text": "插入排序",
            "fraction": 100,
            "feedback": "正確 —— 每一個間隔回合都是對間隔子序列做插入排序。"
          },
          {
            "text": "合併排序",
            "fraction": 0,
            "feedback": "錯 —— 希爾排序不合併已排序區段。"
          },
          {
            "text": "堆積排序",
            "fraction": 0,
            "feedback": "錯 —— 希爾排序不使用堆積。"
          },
          {
            "text": "計數排序",
            "fraction": 0,
            "feedback": "錯 —— 希爾排序是以比較為基礎,而非以鍵值分佈。"
          }
        ],
        "generalFeedback": "當間隔為 1 時,希爾排序就是插入排序;較大的間隔讓元素跳向最終位置,減少後續工作量。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "希爾排序時間取決於",
        "text": "<p>希爾排序的整體時間複雜度主要取決於什麼?</p>",
        "answers": [
          {
            "text": "所選用的間隔(增量)序列",
            "fraction": 100,
            "feedback": "正確 —— Shell 原始間隔為 O(n^2),而 Hibbard/Sedgewick 序列可達約 O(n^1.5) 或更佳。"
          },
          {
            "text": "樞紐選取策略",
            "fraction": 0,
            "feedback": "希爾排序沒有樞紐。"
          },
          {
            "text": "輔助合併緩衝區的大小",
            "fraction": 0,
            "feedback": "希爾排序不使用合併緩衝區。"
          },
          {
            "text": "沒有 —— 它永遠恰好是 O(n log n)",
            "fraction": 0,
            "feedback": "錯 —— 其複雜度隨間隔序列而變。"
          }
        ],
        "generalFeedback": "Shell 原始間隔 → 最差 O(n^2);較佳序列(Hibbard 約 O(n^1.5)、Sedgewick 約 O(n^(4/3)))可大幅改善。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "希爾排序穩定性",
        "text": "<p>希爾排序是一種<em>穩定</em>的排序演算法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 跨越大間隔比較與移動元素可能會重新排列相同鍵值。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 希爾排序不穩定。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "希爾排序是否原地",
        "text": "<p>希爾排序是原地演算法,只使用 O(1) 輔助空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它在陣列內以常數額外記憶體重新排列。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "希爾排序不需輔助陣列;它是原地排序。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "希爾排序間隔名詞",
        "text": "<p>希爾排序在一個回合中所比較元素之間的間距,英文稱為 ______(也稱為增量 increment)。</p>",
        "answers": [
          {
            "text": "gap",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "gap*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "shortanswer",
        "name": "希爾排序最終間隔",
        "text": "<p>希爾排序的最後一個回合一定使用哪一個間隔值?請以單一數字作答。</p>",
        "answers": [
          {
            "text": "1",
            "fraction": 100,
            "feedback": "正確 —— 最後一回合就是間隔為 1 的普通插入排序。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "希爾排序特性",
        "text": "<p>關於希爾排序,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它先讓元素做長距離移動,藉此改進插入排序",
            "fraction": 50,
            "feedback": "正確 —— 大間隔在最終間隔 1 回合之前快速降低亂序程度。"
          },
          {
            "text": "它的最差情況複雜度取決於所使用的間隔序列",
            "fraction": 50,
            "feedback": "正確 —— 例如 Shell 間隔為 O(n^2)、Hibbard 約 O(n^1.5)。"
          },
          {
            "text": "它是穩定的,能保留相同鍵值的順序",
            "fraction": -50,
            "feedback": "錯 —— 希爾排序不穩定。"
          },
          {
            "text": "它像合併排序一樣需要 O(n) 輔助空間",
            "fraction": -50,
            "feedback": "錯 —— 希爾排序是原地排序,額外空間 O(1)。"
          }
        ],
        "generalFeedback": "希爾排序:原地、不穩定,是插入排序以間隔為基礎的推廣,其速度取決於增量序列。",
        "single": false
      }
    ]
  }
};
