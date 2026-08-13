window.QUIZ_RENDERED = {
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
