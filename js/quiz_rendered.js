window.QUIZ_RENDERED = {
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
  }
};
