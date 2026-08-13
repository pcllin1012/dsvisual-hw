window.QUIZ_RENDERED = {
  "decision-tree-coins": {
    "en": [
      {
        "type": "multichoice",
        "name": "Outcomes per weighing",
        "text": "<p>When you place coins on a two-pan <strong>balance scale</strong>, how many distinct outcomes can a single weighing produce?</p>",
        "answers": [
          {
            "text": "Three (left heavier, balanced, right heavier)",
            "fraction": 100,
            "feedback": "Correct — three outcomes, so the decision tree is ternary."
          },
          {
            "text": "Two (heavier or lighter)",
            "fraction": 0,
            "feedback": "That ignores the balanced case; a scale has three outcomes."
          },
          {
            "text": "Four",
            "fraction": 0,
            "feedback": "A single balance comparison yields only three distinguishable results."
          },
          {
            "text": "Eight, one per coin",
            "fraction": 0,
            "feedback": "The number of outcomes depends on the scale, not the coin count."
          }
        ],
        "generalFeedback": "A balance scale tilts left, stays level, or tilts right — three outcomes per weighing, which makes the decision tree ternary.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Decision tree branching factor",
        "text": "<p>The decision tree for the balance-scale coin problem is best described as which kind of tree?</p>",
        "answers": [
          {
            "text": "A ternary tree (up to three children per node)",
            "fraction": 100,
            "feedback": "Correct — each weighing has three outcomes."
          },
          {
            "text": "A binary tree (two children per node)",
            "fraction": 0,
            "feedback": "Binary would fit a yes/no test; a balance gives three results."
          },
          {
            "text": "A complete graph",
            "fraction": 0,
            "feedback": "The structure is a rooted decision tree, not a graph."
          },
          {
            "text": "A linked list",
            "fraction": 0,
            "feedback": "Each internal node branches on the weighing outcome, so it is a tree."
          }
        ],
        "generalFeedback": "Because each weighing has three outcomes, the decision tree branches up to three ways at every internal node — a ternary tree.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Information-theoretic bound",
        "text": "<p>To distinguish among <em>N</em> possible cases with a balance scale, the minimum number of weighings is at least which expression?</p>",
        "answers": [
          {
            "text": "&lceil;logN&rceil;",
            "fraction": 100,
            "feedback": "Correct — k weighings distinguish at most 3^k cases."
          },
          {
            "text": "&lceil;logN&rceil;",
            "fraction": 0,
            "feedback": "That base assumes two outcomes; a balance gives three."
          },
          {
            "text": "N &minus; 1",
            "fraction": 0,
            "feedback": "That is far more than needed; the bound is logarithmic base 3."
          },
          {
            "text": "N / 3",
            "fraction": 0,
            "feedback": "The relationship is logarithmic, not linear."
          }
        ],
        "generalFeedback": "Each weighing multiplies the number of distinguishable cases by 3, so k weighings cover 3^k cases and the lower bound is ceil(log base 3 of N).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Height equals weighings",
        "text": "<p>In the decision tree, what does the <strong>height</strong> of the tree represent?</p>",
        "answers": [
          {
            "text": "The worst-case number of weighings needed",
            "fraction": 100,
            "feedback": "Correct — the longest root-to-leaf path is the worst case."
          },
          {
            "text": "The total number of coins",
            "fraction": 0,
            "feedback": "Height measures path length, not the number of coins."
          },
          {
            "text": "The number of counterfeit coins",
            "fraction": 0,
            "feedback": "There is exactly one counterfeit; height is about weighings."
          },
          {
            "text": "The number of leaves",
            "fraction": 0,
            "feedback": "Leaves are the outcomes; height is the longest path to one."
          }
        ],
        "generalFeedback": "Each level of the tree is one weighing, so the height (longest root-to-leaf path) equals the worst-case number of weighings.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Balance three outcomes",
        "text": "<p>A single use of a balance scale can distinguish three outcomes, which is why the decision tree is ternary rather than binary.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — left-heavy, balanced, and right-heavy give three outcomes."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "The three tilt states make each weighing a three-way branch."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Eight coins two weighings",
        "text": "<p>If the counterfeit among 8 coins is known to be <em>lighter</em>, two weighings are enough to identify it.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — 3^2 = 9 &ge; 8, so two weighings suffice."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "With a known-lighter counterfeit there are 8 cases and 3^2 = 9 &ge; 8."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Outcomes number",
        "text": "<p>How many distinct outcomes does one weighing on a balance scale have? Answer with a single digit.</p>",
        "answers": [
          {
            "text": "3",
            "fraction": 100,
            "feedback": "Correct — three outcomes make the tree ternary."
          },
          {
            "text": "three",
            "fraction": 100,
            "feedback": "Correct — three outcomes make the tree ternary."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Decision tree facts",
        "text": "<p>Which statements about the 8-coins balance decision tree are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Each internal node corresponds to one weighing",
            "fraction": 50,
            "feedback": "Yes — every internal node is a weighing."
          },
          {
            "text": "k weighings can distinguish at most 3^k cases",
            "fraction": 50,
            "feedback": "Yes — each weighing triples the distinguishable cases."
          },
          {
            "text": "Each weighing has only two possible outcomes",
            "fraction": -50,
            "feedback": "No — a balance scale has three outcomes."
          },
          {
            "text": "The tree is binary because a coin is either counterfeit or genuine",
            "fraction": -50,
            "feedback": "No — branching follows the three weighing outcomes, so it is ternary."
          }
        ],
        "generalFeedback": "Internal nodes are weighings, each with three outcomes, so k weighings cover up to 3^k cases and the tree is ternary — not binary.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "每次秤重的結果數",
        "text": "<p>當你把硬幣放到雙盤<strong>天平</strong>上時,一次秤重可以產生幾種不同的結果?</p>",
        "answers": [
          {
            "text": "三種(左盤較重、平衡、右盤較重)",
            "fraction": 100,
            "feedback": "正確 —— 三種結果,因此決策樹是三元的。"
          },
          {
            "text": "兩種(較重或較輕)",
            "fraction": 0,
            "feedback": "這忽略了平衡的情況;天平有三種結果。"
          },
          {
            "text": "四種",
            "fraction": 0,
            "feedback": "單次天平比較只會產生三種可區分的結果。"
          },
          {
            "text": "八種,每個硬幣一種",
            "fraction": 0,
            "feedback": "結果數取決於天平,而非硬幣數量。"
          }
        ],
        "generalFeedback": "天平會向左傾、保持水平、或向右傾 —— 每次秤重三種結果,使決策樹成為三元樹。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "決策樹的分支度",
        "text": "<p>天平找假幣問題的決策樹,最適合描述為哪一種樹?</p>",
        "answers": [
          {
            "text": "三元樹(每個節點最多三個子節點)",
            "fraction": 100,
            "feedback": "正確 —— 每次秤重有三種結果。"
          },
          {
            "text": "二元樹(每個節點兩個子節點)",
            "fraction": 0,
            "feedback": "二元適合是非測試;天平會給出三種結果。"
          },
          {
            "text": "完全圖",
            "fraction": 0,
            "feedback": "此結構是有根的決策樹,不是圖。"
          },
          {
            "text": "鏈結串列",
            "fraction": 0,
            "feedback": "每個內部節點依秤重結果分支,因此是樹。"
          }
        ],
        "generalFeedback": "因為每次秤重有三種結果,決策樹在每個內部節點最多分成三支 —— 三元樹。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "資訊理論下界",
        "text": "<p>要用天平區分 <em>N</em> 種可能情況,所需秤重次數至少為下列哪個式子?</p>",
        "answers": [
          {
            "text": "&lceil;logN&rceil;",
            "fraction": 100,
            "feedback": "正確 —— k 次秤重最多可區分 3^k 種情況。"
          },
          {
            "text": "&lceil;logN&rceil;",
            "fraction": 0,
            "feedback": "此底數假設兩種結果;天平給出三種。"
          },
          {
            "text": "N &minus; 1",
            "fraction": 0,
            "feedback": "這遠多於所需;下界是以 3 為底的對數。"
          },
          {
            "text": "N / 3",
            "fraction": 0,
            "feedback": "此關係是對數的,而非線性的。"
          }
        ],
        "generalFeedback": "每次秤重使可區分情況數乘以 3,因此 k 次秤重可涵蓋 3^k 種情況,下界為 ceil(log 底數 3 的 N)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "高度等於秤重次數",
        "text": "<p>在此決策樹中,樹的<strong>高度</strong>代表什麼?</p>",
        "answers": [
          {
            "text": "最差情況所需的秤重次數",
            "fraction": 100,
            "feedback": "正確 —— 最長的根到葉路徑就是最差情況。"
          },
          {
            "text": "硬幣的總數",
            "fraction": 0,
            "feedback": "高度衡量路徑長度,不是硬幣數量。"
          },
          {
            "text": "假幣的數量",
            "fraction": 0,
            "feedback": "假幣恰好一枚;高度指的是秤重次數。"
          },
          {
            "text": "葉節點的數量",
            "fraction": 0,
            "feedback": "葉節點是結果;高度是到某葉的最長路徑。"
          }
        ],
        "generalFeedback": "樹的每一層是一次秤重,因此高度(最長的根到葉路徑)等於最差情況的秤重次數。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "天平三種結果",
        "text": "<p>單次使用天平可區分三種結果,這正是決策樹為三元而非二元的原因。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 左傾、平衡、右傾共三種結果。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "三種傾斜狀態使每次秤重成為三向分支。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "八枚硬幣兩次秤重",
        "text": "<p>若已知 8 枚硬幣中的假幣<em>較輕</em>,兩次秤重就足以找出它。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 3^2 = 9 &ge; 8,兩次秤重足夠。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "假幣已知較輕時共有 8 種情況,而 3^2 = 9 &ge; 8。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "結果數目",
        "text": "<p>天平的一次秤重有幾種不同的結果?請以單一數字作答。</p>",
        "answers": [
          {
            "text": "3",
            "fraction": 100,
            "feedback": "正確 —— 三種結果使樹成為三元。"
          },
          {
            "text": "three",
            "fraction": 100,
            "feedback": "正確 —— 三種結果使樹成為三元。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "決策樹事實",
        "text": "<p>關於 8 枚硬幣的天平決策樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "每個內部節點對應一次秤重",
            "fraction": 50,
            "feedback": "正確 —— 每個內部節點都是一次秤重。"
          },
          {
            "text": "k 次秤重最多可區分 3^k 種情況",
            "fraction": 50,
            "feedback": "正確 —— 每次秤重使可區分情況數變三倍。"
          },
          {
            "text": "每次秤重只有兩種可能結果",
            "fraction": -50,
            "feedback": "錯 —— 天平有三種結果。"
          },
          {
            "text": "因為硬幣不是假就是真,所以樹是二元的",
            "fraction": -50,
            "feedback": "錯 —— 分支依循三種秤重結果,因此是三元樹。"
          }
        ],
        "generalFeedback": "內部節點是秤重,每次三種結果,因此 k 次秤重涵蓋最多 3^k 種情況,樹為三元 —— 而非二元。",
        "single": false
      }
    ]
  },
  "game-tree": {
    "en": [
      {
        "type": "multichoice",
        "name": "Minimax value meaning",
        "text": "<p>In a game tree, what does the <strong>minimax value</strong> of a position represent?</p>",
        "answers": [
          {
            "text": "The best score MAX can guarantee assuming MIN plays optimally",
            "fraction": 100,
            "feedback": "Correct — minimax assumes an optimal opponent."
          },
          {
            "text": "The average score over all possible opponent moves",
            "fraction": 0,
            "feedback": "Minimax assumes optimal play, not an average."
          },
          {
            "text": "The score MAX gets if MIN plays randomly",
            "fraction": 0,
            "feedback": "Minimax assumes the opponent plays optimally, not randomly."
          },
          {
            "text": "The total number of leaf nodes",
            "fraction": 0,
            "feedback": "That is a size measure, not the minimax value."
          }
        ],
        "generalFeedback": "Minimax propagates values upward: MAX levels take the maximum child, MIN levels take the minimum, giving the score under optimal play by both sides.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "MAX and MIN levels",
        "text": "<p>At a <strong>MIN</strong> node in the game tree, which value is chosen from the children?</p>",
        "answers": [
          {
            "text": "The minimum child value",
            "fraction": 100,
            "feedback": "Correct — MIN minimizes MAX's score."
          },
          {
            "text": "The maximum child value",
            "fraction": 0,
            "feedback": "That is what a MAX node does, not a MIN node."
          },
          {
            "text": "The average of the child values",
            "fraction": 0,
            "feedback": "MIN takes the minimum, not an average."
          },
          {
            "text": "A random child value",
            "fraction": 0,
            "feedback": "MIN plays optimally by choosing the minimum."
          }
        ],
        "generalFeedback": "Levels alternate: MAX nodes take the maximum child value and MIN nodes take the minimum, modeling both players playing optimally.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Alpha-beta result",
        "text": "<p>Compared with plain minimax, what move does <strong>alpha-beta pruning</strong> return?</p>",
        "answers": [
          {
            "text": "Exactly the same move as plain minimax",
            "fraction": 100,
            "feedback": "Correct — alpha-beta only skips branches that cannot change the result."
          },
          {
            "text": "A better move than minimax could find",
            "fraction": 0,
            "feedback": "No — it returns the same optimal move, just faster."
          },
          {
            "text": "A slightly worse but faster move",
            "fraction": 0,
            "feedback": "Alpha-beta does not sacrifice quality; the move is identical."
          },
          {
            "text": "A random move among the top choices",
            "fraction": 0,
            "feedback": "It is exact, returning minimax's move."
          }
        ],
        "generalFeedback": "Alpha-beta prunes only branches that provably cannot affect the root decision, so it returns the identical move as minimax while examining fewer nodes.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Alpha-beta complexity",
        "text": "<p>With ideal move ordering, roughly how many nodes does alpha-beta explore, for branching factor <em>b</em> and depth <em>d</em>?</p>",
        "answers": [
          {
            "text": "O(b)",
            "fraction": 100,
            "feedback": "Correct — effectively doubling the searchable depth."
          },
          {
            "text": "O(b)",
            "fraction": 0,
            "feedback": "That is plain minimax; good ordering cuts the exponent roughly in half."
          },
          {
            "text": "O(b &middot; d)",
            "fraction": 0,
            "feedback": "The cost is exponential, not linear."
          },
          {
            "text": "O(d)",
            "fraction": 0,
            "feedback": "The exponent involves depth, roughly d/2, over base b."
          }
        ],
        "generalFeedback": "With good move ordering alpha-beta explores about O(b^(d/2)) nodes instead of O(b^d), effectively doubling the depth reachable for the same cost.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Alpha-beta same answer",
        "text": "<p>Alpha-beta pruning can return a different (worse) move than plain minimax.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "It prunes only branches that cannot affect the decision, so the move is identical."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — alpha-beta returns exactly the same move as minimax."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Alpha and beta bounds",
        "text": "<p>In alpha-beta pruning, &alpha; is the best value MAX can guarantee so far and &beta; is the best value MIN can guarantee so far.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — a branch is pruned once &alpha; &ge; &beta;."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "That is exactly what &alpha; and &beta; track."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Algorithm name",
        "text": "<p>What is the name of the algorithm that computes a position's value by alternating maximizing and minimizing levels? (one word)</p>",
        "answers": [
          {
            "text": "minimax",
            "fraction": 100,
            "feedback": "Correct — minimax."
          },
          {
            "text": "min-max",
            "fraction": 100,
            "feedback": "Correct — minimax."
          },
          {
            "text": "minmax",
            "fraction": 100,
            "feedback": "Correct — minimax."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Alpha-beta facts",
        "text": "<p>Which statements about alpha-beta pruning are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It returns the same value as plain minimax",
            "fraction": 50,
            "feedback": "Yes — it is an exact optimization."
          },
          {
            "text": "Good move ordering improves how much it can prune",
            "fraction": 50,
            "feedback": "Yes — ordering strong moves first prunes more branches."
          },
          {
            "text": "It may miss the optimal move to run faster",
            "fraction": -50,
            "feedback": "No — it never prunes a branch that could change the decision."
          },
          {
            "text": "It always explores every leaf of the tree",
            "fraction": -50,
            "feedback": "No — its whole point is to skip provably irrelevant branches."
          }
        ],
        "generalFeedback": "Alpha-beta is exact (same value as minimax) and benefits from good move ordering, pruning branches that cannot affect the root — so it does not visit every leaf.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "極小極大值的意義",
        "text": "<p>在賽局樹中,一個局面的<strong>極小極大值(minimax value)</strong>代表什麼?</p>",
        "answers": [
          {
            "text": "假設 MIN 採最佳走法時,MAX 能保證的最佳分數",
            "fraction": 100,
            "feedback": "正確 —— minimax 假設對手採最佳策略。"
          },
          {
            "text": "對手所有可能走法的平均分數",
            "fraction": 0,
            "feedback": "minimax 假設最佳走法,而非平均。"
          },
          {
            "text": "MIN 隨機走時 MAX 得到的分數",
            "fraction": 0,
            "feedback": "minimax 假設對手採最佳走法,而非隨機。"
          },
          {
            "text": "葉節點的總數",
            "fraction": 0,
            "feedback": "那是規模的度量,不是極小極大值。"
          }
        ],
        "generalFeedback": "minimax 由下往上傳遞數值:MAX 層取子節點的最大值,MIN 層取最小值,得到雙方皆採最佳走法下的分數。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "MAX 與 MIN 層",
        "text": "<p>在賽局樹的 <strong>MIN</strong> 節點,會從子節點中選出哪個值?</p>",
        "answers": [
          {
            "text": "子節點中的最小值",
            "fraction": 100,
            "feedback": "正確 —— MIN 會極小化 MAX 的分數。"
          },
          {
            "text": "子節點中的最大值",
            "fraction": 0,
            "feedback": "那是 MAX 節點的作法,不是 MIN 節點。"
          },
          {
            "text": "子節點值的平均",
            "fraction": 0,
            "feedback": "MIN 取最小值,而非平均。"
          },
          {
            "text": "隨機的子節點值",
            "fraction": 0,
            "feedback": "MIN 以選最小值來採最佳走法。"
          }
        ],
        "generalFeedback": "各層交替:MAX 節點取子節點的最大值,MIN 節點取最小值,以模擬雙方皆採最佳走法。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Alpha-beta 的結果",
        "text": "<p>與純 minimax 相比,<strong>alpha-beta 剪枝</strong>會回傳哪一步棋?</p>",
        "answers": [
          {
            "text": "與純 minimax 完全相同的走法",
            "fraction": 100,
            "feedback": "正確 —— alpha-beta 只略過不可能改變結果的分支。"
          },
          {
            "text": "比 minimax 能找到的更好的走法",
            "fraction": 0,
            "feedback": "錯 —— 它回傳相同的最佳走法,只是更快。"
          },
          {
            "text": "略差但較快的走法",
            "fraction": 0,
            "feedback": "alpha-beta 不犧牲品質;走法完全相同。"
          },
          {
            "text": "在最佳選項中隨機挑一步",
            "fraction": 0,
            "feedback": "它是精確的,回傳 minimax 的走法。"
          }
        ],
        "generalFeedback": "alpha-beta 只剪去可證明不會影響根決策的分支,因此回傳與 minimax 相同的走法,同時檢視較少的節點。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Alpha-beta 複雜度",
        "text": "<p>在理想的走法排序下,對分支度 <em>b</em> 與深度 <em>d</em>,alpha-beta 大約會探索多少節點?</p>",
        "answers": [
          {
            "text": "O(b)",
            "fraction": 100,
            "feedback": "正確 —— 實際上使可搜尋深度加倍。"
          },
          {
            "text": "O(b)",
            "fraction": 0,
            "feedback": "那是純 minimax;良好排序約可將指數減半。"
          },
          {
            "text": "O(b &middot; d)",
            "fraction": 0,
            "feedback": "成本是指數的,而非線性。"
          },
          {
            "text": "O(d)",
            "fraction": 0,
            "feedback": "指數涉及深度,約為 d/2,底數為 b。"
          }
        ],
        "generalFeedback": "在良好走法排序下,alpha-beta 大約探索 O(b^(d/2)) 個節點,而非 O(b^d),等於在相同成本下使可達深度加倍。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Alpha-beta 相同答案",
        "text": "<p>alpha-beta 剪枝可能回傳與純 minimax 不同(較差)的走法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "它只剪去不會影響決策的分支,因此走法完全相同。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— alpha-beta 回傳與 minimax 完全相同的走法。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Alpha 與 beta 界限",
        "text": "<p>在 alpha-beta 剪枝中,&alpha; 是目前 MAX 能保證的最佳值,&beta; 是目前 MIN 能保證的最佳值。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 當 &alpha; &ge; &beta; 時即可剪去該分支。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "這正是 &alpha; 與 &beta; 所追蹤的內容。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "演算法名稱",
        "text": "<p>藉由交替的極大化與極小化層來計算局面值的演算法叫什麼名字?(英文,一個字)</p>",
        "answers": [
          {
            "text": "minimax",
            "fraction": 100,
            "feedback": "正確 —— minimax。"
          },
          {
            "text": "min-max",
            "fraction": 100,
            "feedback": "正確 —— minimax。"
          },
          {
            "text": "minmax",
            "fraction": 100,
            "feedback": "正確 —— minimax。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Alpha-beta 的事實",
        "text": "<p>關於 alpha-beta 剪枝,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它回傳與純 minimax 相同的值",
            "fraction": 50,
            "feedback": "正確 —— 它是精確的最佳化。"
          },
          {
            "text": "良好的走法排序能提升它的剪枝量",
            "fraction": 50,
            "feedback": "正確 —— 先排入強棋可剪去更多分支。"
          },
          {
            "text": "它可能為了更快而錯過最佳走法",
            "fraction": -50,
            "feedback": "錯 —— 它絕不剪去可能改變決策的分支。"
          },
          {
            "text": "它總是探索樹的每一個葉節點",
            "fraction": -50,
            "feedback": "錯 —— 它的重點正是略過可證明無關的分支。"
          }
        ],
        "generalFeedback": "alpha-beta 是精確的(與 minimax 同值),並受益於良好的走法排序,剪去不會影響根的分支 —— 因此它不會走訪每一個葉節點。",
        "single": false
      }
    ]
  },
  "huffman": {
    "en": [
      {
        "type": "multichoice",
        "name": "Huffman greedy step",
        "text": "<p>At each step, Huffman's algorithm merges which two nodes?</p>",
        "answers": [
          {
            "text": "The two nodes with the lowest frequencies",
            "fraction": 100,
            "feedback": "Correct — greedily merge the two smallest, giving the merged node their combined frequency."
          },
          {
            "text": "The two nodes with the highest frequencies",
            "fraction": 0,
            "feedback": "No — merging the largest first would give frequent symbols longer codes."
          },
          {
            "text": "Any two adjacent nodes in the input order",
            "fraction": 0,
            "feedback": "No — the choice is by frequency, not position."
          },
          {
            "text": "The node with the highest and the node with the lowest frequency",
            "fraction": 0,
            "feedback": "No — always the two lowest are combined."
          }
        ],
        "generalFeedback": "Huffman is greedy: repeatedly extract the two lowest-frequency nodes from a min-heap and merge them into a parent whose frequency is their sum.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Prefix-free property",
        "text": "<p>What key property of a Huffman code makes decoding unambiguous?</p>",
        "answers": [
          {
            "text": "No codeword is a prefix of another codeword",
            "fraction": 100,
            "feedback": "Correct — this prefix-free property lets a decoder split the bitstream unambiguously."
          },
          {
            "text": "All codewords have the same length",
            "fraction": 0,
            "feedback": "No — Huffman codes are variable length; that describes a fixed-length code."
          },
          {
            "text": "Codewords are assigned in alphabetical order",
            "fraction": 0,
            "feedback": "No — assignment is driven by frequency, not alphabet."
          },
          {
            "text": "Every codeword starts with a 0 bit",
            "fraction": 0,
            "feedback": "No — that is not a property of Huffman codes."
          }
        ],
        "generalFeedback": "Because symbols sit only at leaves of the tree, no codeword is a prefix of another, so the decoder never needs lookahead.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Code length vs frequency",
        "text": "<p>In a Huffman code, symbols that appear <strong>more frequently</strong> receive codewords that are:</p>",
        "answers": [
          {
            "text": "Shorter",
            "fraction": 100,
            "feedback": "Correct — frequent symbols land near the root, giving shorter codes and minimizing total length."
          },
          {
            "text": "Longer",
            "fraction": 0,
            "feedback": "No — that would increase the encoded size."
          },
          {
            "text": "The same length as every other symbol",
            "fraction": 0,
            "feedback": "No — that is a fixed-length code, not Huffman."
          },
          {
            "text": "Always exactly one bit",
            "fraction": 0,
            "feedback": "No — only possible with two or fewer symbols."
          }
        ],
        "generalFeedback": "Assigning shorter codewords to more frequent symbols minimizes the expected number of bits, producing a minimum-redundancy code.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Huffman build complexity",
        "text": "<p>Using a min-heap (priority queue), what is the time to build a Huffman tree for <em>n</em> symbols?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "Correct — n-1 merges, each with O(log n) heap operations."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "No — heap operations add a log n factor unless frequencies are pre-sorted."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "No — a naive linear scan for the minimum would give this, but a heap is faster."
          },
          {
            "text": "O(2^n)",
            "fraction": 0,
            "feedback": "No — the construction is not exponential."
          }
        ],
        "generalFeedback": "There are n-1 merges; each extract-min and insert costs O(log n), so the total is O(n log n).",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Huffman optimality",
        "text": "<p>Huffman coding produces an optimal (minimum-length) prefix code for a given set of symbol frequencies.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it is optimal among symbol-by-symbol prefix codes."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It is provably optimal for per-symbol prefix codes."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Huffman is greedy not DP",
        "text": "<p>Huffman's algorithm requires dynamic programming to decide which nodes to merge.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — it is a greedy algorithm; the local choice of the two smallest is provably globally optimal."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — Huffman is greedy, not dynamic programming."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Prefix property term",
        "text": "<p>A code in which no codeword is a prefix of another is called a ______-free code.</p>",
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
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Huffman properties multi",
        "text": "<p>Which statements about Huffman coding are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It uses a min-heap to repeatedly extract the two lowest-frequency nodes",
            "fraction": 50,
            "feedback": "Yes — that is the core of the greedy construction."
          },
          {
            "text": "Symbols are stored only at the leaves of the tree",
            "fraction": 50,
            "feedback": "Yes — internal nodes are merged frequency sums, not symbols."
          },
          {
            "text": "All symbols get codewords of equal length",
            "fraction": -50,
            "feedback": "No — Huffman codes are variable length."
          },
          {
            "text": "The merged node's frequency is the product of its children's frequencies",
            "fraction": -50,
            "feedback": "No — it is the sum, not the product."
          }
        ],
        "generalFeedback": "Huffman: min-heap driven greedy merges of the two smallest, symbols at leaves, variable-length codewords, merged frequency = sum of children.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "霍夫曼貪婪步驟",
        "text": "<p>霍夫曼演算法每一步合併的是哪兩個節點?</p>",
        "answers": [
          {
            "text": "頻率最低的兩個節點",
            "fraction": 100,
            "feedback": "正確 —— 貪婪地合併兩個最小者,合併後節點的頻率為兩者之和。"
          },
          {
            "text": "頻率最高的兩個節點",
            "fraction": 0,
            "feedback": "錯 —— 先合併最大者會讓高頻符號得到較長的編碼。"
          },
          {
            "text": "輸入順序中相鄰的任意兩個節點",
            "fraction": 0,
            "feedback": "錯 —— 選擇依據是頻率,而非位置。"
          },
          {
            "text": "頻率最高的節點與頻率最低的節點",
            "fraction": 0,
            "feedback": "錯 —— 永遠合併兩個最低者。"
          }
        ],
        "generalFeedback": "霍夫曼是貪婪法:反覆從最小堆積取出頻率最低的兩個節點,合併為一個父節點,其頻率為兩者之和。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "無前綴性質",
        "text": "<p>霍夫曼編碼的哪一項關鍵性質使得解碼不會產生歧義?</p>",
        "answers": [
          {
            "text": "沒有任何一個編碼是另一個編碼的前綴",
            "fraction": 100,
            "feedback": "正確 —— 這種無前綴性質讓解碼器能明確地切分位元串。"
          },
          {
            "text": "所有編碼長度相同",
            "fraction": 0,
            "feedback": "錯 —— 霍夫曼編碼是變長的;那是固定長度編碼。"
          },
          {
            "text": "編碼依字母順序指派",
            "fraction": 0,
            "feedback": "錯 —— 指派依據頻率,而非字母。"
          },
          {
            "text": "每個編碼都以位元 0 開頭",
            "fraction": 0,
            "feedback": "錯 —— 這不是霍夫曼編碼的性質。"
          }
        ],
        "generalFeedback": "由於符號只位於樹的葉節點,沒有編碼是另一個的前綴,因此解碼器不需要向前預看。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "編碼長度與頻率",
        "text": "<p>在霍夫曼編碼中,出現<strong>越頻繁</strong>的符號所得到的編碼會:</p>",
        "answers": [
          {
            "text": "較短",
            "fraction": 100,
            "feedback": "正確 —— 高頻符號靠近根部,得到較短編碼,使總長度最小。"
          },
          {
            "text": "較長",
            "fraction": 0,
            "feedback": "錯 —— 那會增加編碼後的大小。"
          },
          {
            "text": "與其他所有符號等長",
            "fraction": 0,
            "feedback": "錯 —— 那是固定長度編碼,不是霍夫曼。"
          },
          {
            "text": "永遠恰好一個位元",
            "fraction": 0,
            "feedback": "錯 —— 只有在符號數不超過兩個時才可能。"
          }
        ],
        "generalFeedback": "將較短的編碼指派給較高頻的符號,可使期望位元數最小,產生最小冗餘碼。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "霍夫曼建構複雜度",
        "text": "<p>使用最小堆積(優先佇列),為 <em>n</em> 個符號建構霍夫曼樹的時間為何?</p>",
        "answers": [
          {
            "text": "O(n log n)",
            "fraction": 100,
            "feedback": "正確 —— 進行 n-1 次合併,每次為 O(log n) 的堆積操作。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "錯 —— 除非頻率已預先排序,否則堆積操作會加上 log n 因子。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "錯 —— 樸素地線性掃描找最小值才會如此,但堆積更快。"
          },
          {
            "text": "O(2^n)",
            "fraction": 0,
            "feedback": "錯 —— 此建構並非指數級。"
          }
        ],
        "generalFeedback": "共有 n-1 次合併;每次取最小與插入為 O(log n),總計 O(n log n)。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "霍夫曼最佳性",
        "text": "<p>對於給定的符號頻率集合,霍夫曼編碼會產生最佳(最小長度)的無前綴碼。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 在逐符號的無前綴碼中它是最佳的。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "它對逐符號的無前綴碼可被證明為最佳。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "霍夫曼是貪婪非動態規劃",
        "text": "<p>霍夫曼演算法需要動態規劃來決定要合併哪些節點。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 它是貪婪演算法;選兩個最小者的局部選擇可證明為全域最佳。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 霍夫曼是貪婪法,而非動態規劃。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "前綴性質名詞",
        "text": "<p>沒有任何編碼是另一個編碼前綴的碼,稱為無______碼(以英文作答)。</p>",
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
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "霍夫曼性質複選",
        "text": "<p>關於霍夫曼編碼,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "使用最小堆積反覆取出頻率最低的兩個節點",
            "fraction": 50,
            "feedback": "正確 —— 這是貪婪建構的核心。"
          },
          {
            "text": "符號只儲存在樹的葉節點",
            "fraction": 50,
            "feedback": "正確 —— 內部節點是合併後的頻率和,而非符號。"
          },
          {
            "text": "所有符號得到等長的編碼",
            "fraction": -50,
            "feedback": "錯 —— 霍夫曼編碼是變長的。"
          },
          {
            "text": "合併節點的頻率是其子節點頻率的乘積",
            "fraction": -50,
            "feedback": "錯 —— 是相加之和,而非乘積。"
          }
        ],
        "generalFeedback": "霍夫曼:以最小堆積驅動、貪婪合併兩個最小者、符號在葉節點、變長編碼、合併頻率為子節點之和。",
        "single": false
      }
    ]
  },
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
  },
  "tree-array-rep": {
    "en": [
      {
        "type": "multichoice",
        "name": "Child indices",
        "text": "<p>Storing a binary tree in a 1-based array, the children of the node at index <em>i</em> are at which indices?</p>",
        "answers": [
          {
            "text": "2i and 2i+1",
            "fraction": 100,
            "feedback": "Correct — left child at 2i, right child at 2i+1."
          },
          {
            "text": "i+1 and i+2",
            "fraction": 0,
            "feedback": "No — that is not how a heap-style array indexes children."
          },
          {
            "text": "i/2 and i/2+1",
            "fraction": 0,
            "feedback": "No — i/2 gives the parent, not the children."
          },
          {
            "text": "2i-1 and 2i",
            "fraction": 0,
            "feedback": "No — with 1-based indexing the children are 2i and 2i+1."
          }
        ],
        "generalFeedback": "With 1-based indexing, node i has children at 2i (left) and 2i+1 (right); no pointers are needed.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Parent index",
        "text": "<p>In a 1-based array representation, the parent of the node at index <em>i</em> is at which index?</p>",
        "answers": [
          {
            "text": "&lfloor;i/2&rfloor;",
            "fraction": 100,
            "feedback": "Correct — integer division of i by 2 gives the parent."
          },
          {
            "text": "2i",
            "fraction": 0,
            "feedback": "No — 2i is the left child, not the parent."
          },
          {
            "text": "i-1",
            "fraction": 0,
            "feedback": "No — that is the previous array slot, not the parent."
          },
          {
            "text": "2i+1",
            "fraction": 0,
            "feedback": "No — 2i+1 is the right child."
          }
        ],
        "generalFeedback": "Parent(i) = &lfloor;i/2&rfloor;, the inverse of the child formulas 2i and 2i+1.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Best fit for array storage",
        "text": "<p>The array representation is most space-efficient for which kind of tree?</p>",
        "answers": [
          {
            "text": "A complete (or nearly complete) binary tree, such as a heap",
            "fraction": 100,
            "feedback": "Correct — complete trees leave no gaps in the array."
          },
          {
            "text": "A long skewed tree that is essentially a linked list",
            "fraction": 0,
            "feedback": "No — a skewed tree wastes enormous amounts of array space."
          },
          {
            "text": "A sparse tree with many missing nodes",
            "fraction": 0,
            "feedback": "No — missing nodes still consume reserved array slots."
          },
          {
            "text": "A general tree of arbitrary degree",
            "fraction": 0,
            "feedback": "No — the 2i/2i+1 scheme is for binary trees."
          }
        ],
        "generalFeedback": "Because a complete tree packs tightly with no holes, the array wastes no slots — which is exactly why heaps use it.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Drawback of array storage",
        "text": "<p>What is the main drawback of the array representation?</p>",
        "answers": [
          {
            "text": "It wastes space for sparse or skewed trees",
            "fraction": 100,
            "feedback": "Correct — missing nodes still reserve array slots, so gaps are wasteful."
          },
          {
            "text": "Finding a child requires following pointers",
            "fraction": 0,
            "feedback": "No — the array uses index arithmetic, no pointers."
          },
          {
            "text": "The parent of a node cannot be computed",
            "fraction": 0,
            "feedback": "No — parent(i) = &lfloor;i/2&rfloor; is easy to compute."
          },
          {
            "text": "It cannot store the tree's node values",
            "fraction": 0,
            "feedback": "No — values are stored directly in the array cells."
          }
        ],
        "generalFeedback": "A skewed or sparse tree of height h can require up to 2^(h+1)-1 slots for only a few nodes, wasting memory.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Parent formula",
        "text": "<p>In a 1-based array representation, the parent of node <em>i</em> is at index &lfloor;i/2&rfloor;.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — integer division by 2 gives the parent."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It is true — parent(i) = &lfloor;i/2&rfloor;."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Array needs pointers",
        "text": "<p>The array representation of a binary tree requires explicit child pointers in each node.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — positions are computed with index arithmetic (2i, 2i+1), so no pointers are stored."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — the array needs no pointers; indices encode the structure."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Left-child index formula",
        "text": "<p>In a 1-based array, the left child of node <em>i</em> is at index ______. (Give the formula in terms of <em>i</em>.)</p>",
        "answers": [
          {
            "text": "2i",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "2*i",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "2i*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Facts about array representation",
        "text": "<p>Which statements about the array representation of a binary tree are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Node i's children are at indices 2i and 2i+1 (1-based)",
            "fraction": 50,
            "feedback": "Yes — that is the child formula."
          },
          {
            "text": "It is ideal for heaps and other complete trees",
            "fraction": 50,
            "feedback": "Yes — complete trees pack the array with no gaps."
          },
          {
            "text": "It stores structure using explicit child pointers",
            "fraction": -50,
            "feedback": "No — structure comes from index arithmetic, not pointers."
          },
          {
            "text": "It is the most space-efficient choice for a skewed tree",
            "fraction": -50,
            "feedback": "No — skewed trees waste huge amounts of array space."
          }
        ],
        "generalFeedback": "Children at 2i/2i+1, parent at &lfloor;i/2&rfloor;, no pointers, great for complete trees, wasteful for sparse/skewed ones.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "子節點索引",
        "text": "<p>將二元樹存進 1 為起始索引的陣列時,索引 <em>i</em> 之節點的兩個子節點位於哪些索引?</p>",
        "answers": [
          {
            "text": "2i 與 2i+1",
            "fraction": 100,
            "feedback": "正確 —— 左子在 2i,右子在 2i+1。"
          },
          {
            "text": "i+1 與 i+2",
            "fraction": 0,
            "feedback": "錯 —— 堆積式陣列並非如此索引子節點。"
          },
          {
            "text": "i/2 與 i/2+1",
            "fraction": 0,
            "feedback": "錯 —— i/2 得到的是父節點,不是子節點。"
          },
          {
            "text": "2i-1 與 2i",
            "fraction": 0,
            "feedback": "錯 —— 在 1 為起始的索引下,子節點是 2i 與 2i+1。"
          }
        ],
        "generalFeedback": "在 1 為起始的索引下,節點 i 的子節點在 2i(左)與 2i+1(右);不需要任何指標。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "父節點索引",
        "text": "<p>在 1 為起始索引的陣列表示法中,索引 <em>i</em> 之節點的父節點位於哪個索引?</p>",
        "answers": [
          {
            "text": "&lfloor;i/2&rfloor;",
            "fraction": 100,
            "feedback": "正確 —— 將 i 對 2 取整數除法即得父節點。"
          },
          {
            "text": "2i",
            "fraction": 0,
            "feedback": "錯 —— 2i 是左子節點,不是父節點。"
          },
          {
            "text": "i-1",
            "fraction": 0,
            "feedback": "錯 —— 那是前一個陣列格,不是父節點。"
          },
          {
            "text": "2i+1",
            "fraction": 0,
            "feedback": "錯 —— 2i+1 是右子節點。"
          }
        ],
        "generalFeedback": "父(i) = &lfloor;i/2&rfloor;,是子節點公式 2i 與 2i+1 的逆運算。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "最適合陣列儲存的樹",
        "text": "<p>陣列表示法對哪一種樹最節省空間?</p>",
        "answers": [
          {
            "text": "完全(或近乎完全)二元樹,例如堆積(heap)",
            "fraction": 100,
            "feedback": "正確 —— 完全樹在陣列中不留空隙。"
          },
          {
            "text": "本質上像鏈結串列的長歪斜樹",
            "fraction": 0,
            "feedback": "錯 —— 歪斜樹會浪費大量陣列空間。"
          },
          {
            "text": "缺少許多節點的稀疏樹",
            "fraction": 0,
            "feedback": "錯 —— 缺少的節點仍會占用保留的陣列格。"
          },
          {
            "text": "任意分支度的一般樹",
            "fraction": 0,
            "feedback": "錯 —— 2i/2i+1 的方案是給二元樹用的。"
          }
        ],
        "generalFeedback": "由於完全樹能緊密排列而不留空洞,陣列不會浪費任何格子 —— 這正是堆積採用它的原因。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "陣列儲存的缺點",
        "text": "<p>陣列表示法的主要缺點為何?</p>",
        "answers": [
          {
            "text": "對稀疏或歪斜的樹會浪費空間",
            "fraction": 100,
            "feedback": "正確 —— 缺少的節點仍保留陣列格,因此空隙很浪費。"
          },
          {
            "text": "尋找子節點需要跟隨指標",
            "fraction": 0,
            "feedback": "錯 —— 陣列使用索引運算,不需指標。"
          },
          {
            "text": "無法計算某節點的父節點",
            "fraction": 0,
            "feedback": "錯 —— 父(i) = &lfloor;i/2&rfloor; 很容易計算。"
          },
          {
            "text": "它無法儲存樹的節點值",
            "fraction": 0,
            "feedback": "錯 —— 值直接存放在陣列格中。"
          }
        ],
        "generalFeedback": "高度為 h 的歪斜或稀疏樹,可能需要多達 2^(h+1)-1 個格子卻只放少數節點,浪費記憶體。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "父節點公式",
        "text": "<p>在 1 為起始索引的陣列表示法中,節點 <em>i</em> 的父節點位於索引 &lfloor;i/2&rfloor;。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 對 2 取整數除法即得父節點。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "這是正確的 —— 父(i) = &lfloor;i/2&rfloor;。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "陣列需要指標",
        "text": "<p>二元樹的陣列表示法需要在每個節點中存放明確的子節點指標。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 位置以索引運算(2i、2i+1)計算,因此不需儲存指標。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 陣列不需指標;索引即編碼了結構。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "左子節點索引公式",
        "text": "<p>在 1 為起始的陣列中,節點 <em>i</em> 的左子節點位於索引 ______。(請以 <em>i</em> 表示公式。)</p>",
        "answers": [
          {
            "text": "2i",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "2*i",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "2i*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "關於陣列表示法的事實",
        "text": "<p>關於二元樹的陣列表示法,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "節點 i 的子節點在索引 2i 與 2i+1(1 為起始)",
            "fraction": 50,
            "feedback": "正確 —— 這就是子節點公式。"
          },
          {
            "text": "它非常適合堆積與其他完全樹",
            "fraction": 50,
            "feedback": "正確 —— 完全樹使陣列毫無空隙。"
          },
          {
            "text": "它以明確的子節點指標儲存結構",
            "fraction": -50,
            "feedback": "錯 —— 結構來自索引運算,而非指標。"
          },
          {
            "text": "它是歪斜樹最節省空間的選擇",
            "fraction": -50,
            "feedback": "錯 —— 歪斜樹會浪費大量陣列空間。"
          }
        ],
        "generalFeedback": "子節點在 2i/2i+1、父節點在 &lfloor;i/2&rfloor;、不需指標、對完全樹很棒、對稀疏/歪斜樹則浪費。",
        "single": false
      }
    ]
  },
  "tree-avl": {
    "en": [
      {
        "type": "multichoice",
        "name": "AVL what it is",
        "text": "<p>What best describes an <strong>AVL tree</strong>?</p>",
        "answers": [
          {
            "text": "A self-balancing binary search tree that keeps every node's balance factor in {-1, 0, 1}",
            "fraction": 100,
            "feedback": "Correct — the height-balance invariant is the defining feature."
          },
          {
            "text": "A binary heap that supports fast minimum extraction",
            "fraction": 0,
            "feedback": "That is a heap, not an AVL tree."
          },
          {
            "text": "A hash table variant that resolves collisions with trees",
            "fraction": 0,
            "feedback": "An AVL tree is a search tree, not a hashing scheme."
          },
          {
            "text": "A plain BST with no balancing guarantees",
            "fraction": 0,
            "feedback": "The whole point of AVL is that it does self-balance."
          }
        ],
        "generalFeedback": "An AVL tree is a self-balancing BST; the height difference between the two subtrees of any node (its balance factor) is at most 1.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "AVL worst-case complexity",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of search, insert, and delete in an AVL tree?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — the balance invariant keeps height O(log n) even in the worst case."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is the plain-BST worst case; AVL avoids it by rebalancing."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "You still descend a path of height ~log n."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is a sorting bound, not a single AVL operation."
          }
        ],
        "generalFeedback": "Because the balance factor is bounded, an AVL tree's height stays at most ~1.44&middot;log n, so every operation is O(log n) even in the worst case.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "AVL balance factor",
        "text": "<p>The AVL <strong>balance factor</strong> of a node is defined as the height of its left subtree minus the height of its right subtree. Which set of values is allowed for a valid AVL node?</p>",
        "answers": [
          {
            "text": "-1, 0, or +1",
            "fraction": 100,
            "feedback": "Correct — any node outside this range triggers rebalancing."
          },
          {
            "text": "0 only",
            "fraction": 0,
            "feedback": "Requiring exactly 0 would demand a perfectly balanced tree, which is too strict."
          },
          {
            "text": "Any value from -n to +n",
            "fraction": 0,
            "feedback": "That would allow an arbitrarily skewed tree."
          },
          {
            "text": "-2, -1, 0, +1, or +2",
            "fraction": 0,
            "feedback": "A magnitude of 2 is exactly the imbalance that must be fixed by rotation."
          }
        ],
        "generalFeedback": "A valid AVL node has a balance factor in {-1, 0, +1}; a factor of &plusmn;2 signals imbalance and is repaired by rotation.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "AVL rebalancing mechanism",
        "text": "<p>How does an AVL tree restore balance after an insertion or deletion breaks the invariant?</p>",
        "answers": [
          {
            "text": "By performing rotations (LL, RR, LR, RL cases)",
            "fraction": 100,
            "feedback": "Correct — single or double rotations restore the height balance."
          },
          {
            "text": "By recoloring nodes red or black",
            "fraction": 0,
            "feedback": "That is the red-black mechanism, not AVL."
          },
          {
            "text": "By rebuilding the entire tree from scratch each time",
            "fraction": 0,
            "feedback": "Rebalancing is local, touching only nodes along the insertion path."
          },
          {
            "text": "By moving the accessed node to the root",
            "fraction": 0,
            "feedback": "That is a splay tree's behavior, not AVL."
          }
        ],
        "generalFeedback": "AVL trees rebalance with rotations; the four cases (LL, RR, LR, RL) are chosen from the shape of the imbalance.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "AVL vs red-black rotations",
        "text": "<p>Compared with a red-black tree, an AVL tree is more strictly balanced, giving faster lookups but typically performing more rotations on updates.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — tighter balance means faster searches but more rebalancing work on insert/delete."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "AVL's stricter balance does trade extra rotations for faster lookups."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "AVL is a BST",
        "text": "<p>An AVL tree still obeys the binary-search-tree ordering property (left &lt; node &lt; right).</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — AVL is a BST plus a height-balance invariant."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "AVL preserves BST ordering; balancing does not violate it."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "AVL rebalance operation term",
        "text": "<p>What single-word operation does an AVL tree use to restore balance? A ______.</p>",
        "answers": [
          {
            "text": "rotation",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "rotation*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "rotate*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "AVL properties multi-select",
        "text": "<p>Which statements about AVL trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "They guarantee O(log n) worst-case search, insert, and delete",
            "fraction": 50,
            "feedback": "Yes — the height stays logarithmic."
          },
          {
            "text": "They rebalance using rotations classified as LL, RR, LR, and RL",
            "fraction": 50,
            "feedback": "Yes — those are the four rotation cases."
          },
          {
            "text": "They store a red/black color bit in every node",
            "fraction": -50,
            "feedback": "No — that is red-black trees; AVL stores heights or balance factors."
          },
          {
            "text": "They can degenerate into a linked list on sorted input",
            "fraction": -50,
            "feedback": "No — self-balancing prevents that degeneration."
          }
        ],
        "generalFeedback": "AVL trees guarantee O(log n) operations and rebalance via LL/RR/LR/RL rotations; they use balance factors (not colors) and never degenerate to a list.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "AVL 是什麼",
        "text": "<p>以下何者最能描述 <strong>AVL 樹</strong>?</p>",
        "answers": [
          {
            "text": "一種自我平衡的二元搜尋樹,使每個節點的平衡因子維持在 {-1, 0, 1}",
            "fraction": 100,
            "feedback": "正確 —— 高度平衡不變式正是其定義特徵。"
          },
          {
            "text": "一種支援快速取出最小值的二元堆積",
            "fraction": 0,
            "feedback": "那是堆積,不是 AVL 樹。"
          },
          {
            "text": "一種以樹來解決碰撞的雜湊表變體",
            "fraction": 0,
            "feedback": "AVL 樹是搜尋樹,不是雜湊機制。"
          },
          {
            "text": "沒有任何平衡保證的一般 BST",
            "fraction": 0,
            "feedback": "AVL 的重點正是它會自我平衡。"
          }
        ],
        "generalFeedback": "AVL 樹是自我平衡的 BST;任一節點兩子樹的高度差(平衡因子)至多為 1。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "AVL 最差情況複雜度",
        "text": "<p>AVL 樹的搜尋、插入、刪除的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 平衡不變式讓高度即使在最差情況仍為 O(log n)。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是一般 BST 的最差情況;AVL 透過再平衡避免它。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "你仍需沿一條高度約 log n 的路徑下降。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是排序的界,不是單一 AVL 操作。"
          }
        ],
        "generalFeedback": "因為平衡因子有界,AVL 樹高度至多約 1.44&middot;log n,所以每個操作即使在最差情況也是 O(log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "AVL 平衡因子",
        "text": "<p>AVL 的<strong>平衡因子</strong>定義為節點左子樹高度減右子樹高度。合法的 AVL 節點允許哪一組值?</p>",
        "answers": [
          {
            "text": "-1、0 或 +1",
            "fraction": 100,
            "feedback": "正確 —— 超出此範圍的節點會觸發再平衡。"
          },
          {
            "text": "只能是 0",
            "fraction": 0,
            "feedback": "要求恰好為 0 等於要求完美平衡,過於嚴苛。"
          },
          {
            "text": "-n 到 +n 的任意值",
            "fraction": 0,
            "feedback": "那會允許任意傾斜的樹。"
          },
          {
            "text": "-2、-1、0、+1 或 +2",
            "fraction": 0,
            "feedback": "大小為 2 正是必須以旋轉修正的失衡。"
          }
        ],
        "generalFeedback": "合法的 AVL 節點平衡因子屬於 {-1, 0, +1};出現 &plusmn;2 代表失衡,需以旋轉修復。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "AVL 再平衡機制",
        "text": "<p>當插入或刪除破壞不變式後,AVL 樹如何恢復平衡?</p>",
        "answers": [
          {
            "text": "執行旋轉(LL、RR、LR、RL 情況)",
            "fraction": 100,
            "feedback": "正確 —— 單旋轉或雙旋轉可恢復高度平衡。"
          },
          {
            "text": "將節點重新著色為紅或黑",
            "fraction": 0,
            "feedback": "那是紅黑樹的機制,不是 AVL。"
          },
          {
            "text": "每次都從頭重建整棵樹",
            "fraction": 0,
            "feedback": "再平衡是局部的,只觸及插入路徑上的節點。"
          },
          {
            "text": "將被存取的節點移到根",
            "fraction": 0,
            "feedback": "那是伸展樹的行為,不是 AVL。"
          }
        ],
        "generalFeedback": "AVL 樹以旋轉再平衡;四種情況(LL、RR、LR、RL)依失衡形狀選擇。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "AVL 與紅黑樹旋轉比較",
        "text": "<p>與紅黑樹相比,AVL 樹更嚴格平衡,因此查詢更快,但在更新時通常執行更多次旋轉。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 更緊的平衡帶來更快的搜尋,但插入/刪除時有更多再平衡工作。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "AVL 更嚴格的平衡確實以較多旋轉換取較快查詢。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "AVL 是一種 BST",
        "text": "<p>AVL 樹仍遵守二元搜尋樹的排序性質(左 &lt; 節點 &lt; 右)。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— AVL 是 BST 再加上高度平衡不變式。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "AVL 保持 BST 排序;平衡不會違反它。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "AVL 再平衡操作名詞",
        "text": "<p>AVL 樹用什麼單一(英文)操作來恢復平衡?答:一次 ______。</p>",
        "answers": [
          {
            "text": "rotation",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "rotation*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "rotate*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "AVL 性質複選",
        "text": "<p>關於 AVL 樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "保證搜尋、插入、刪除的最差情況為 O(log n)",
            "fraction": 50,
            "feedback": "正確 —— 高度維持對數。"
          },
          {
            "text": "以分類為 LL、RR、LR、RL 的旋轉再平衡",
            "fraction": 50,
            "feedback": "正確 —— 那是四種旋轉情況。"
          },
          {
            "text": "在每個節點儲存紅/黑顏色位元",
            "fraction": -50,
            "feedback": "錯 —— 那是紅黑樹;AVL 儲存高度或平衡因子。"
          },
          {
            "text": "對已排序的輸入會退化成鏈結串列",
            "fraction": -50,
            "feedback": "錯 —— 自我平衡可防止這種退化。"
          }
        ],
        "generalFeedback": "AVL 樹保證 O(log n) 操作並以 LL/RR/LR/RL 旋轉再平衡;它使用平衡因子(非顏色),且絕不會退化成串列。",
        "single": false
      }
    ]
  },
  "tree-bplus": {
    "en": [
      {
        "type": "multichoice",
        "name": "B+ Tree data location",
        "text": "<p>In a B+ tree, where do the actual <strong>records / data values</strong> reside?</p>",
        "answers": [
          {
            "text": "Only in the leaf nodes",
            "fraction": 100,
            "feedback": "Correct — all data lives in the leaves; internal nodes hold only routing keys."
          },
          {
            "text": "Only in the root node",
            "fraction": 0,
            "feedback": "The root is just an internal router, not a data store."
          },
          {
            "text": "In both internal and leaf nodes",
            "fraction": 0,
            "feedback": "That describes a classic B-tree; a B+ tree confines data to leaves."
          },
          {
            "text": "In a separate hash table",
            "fraction": 0,
            "feedback": "No — the data is held in the leaf level of the tree itself."
          }
        ],
        "generalFeedback": "A B+ tree separates navigation from storage: internal nodes route, leaves store.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B+ Tree internal nodes",
        "text": "<p>What role do the <strong>internal nodes</strong> of a B+ tree play?</p>",
        "answers": [
          {
            "text": "They hold keys only, acting as routers (separators) that guide the search downward",
            "fraction": 100,
            "feedback": "Correct — internal keys are separator copies, not data."
          },
          {
            "text": "They store the full data records",
            "fraction": 0,
            "feedback": "No — records live only in the leaves."
          },
          {
            "text": "They link horizontally to support range scans",
            "fraction": 0,
            "feedback": "It is the leaves that are linked, not the internal nodes."
          },
          {
            "text": "They are always empty until a delete occurs",
            "fraction": 0,
            "feedback": "Internal nodes always carry separator keys."
          }
        ],
        "generalFeedback": "Because internal nodes carry no data, they pack more separator keys per block, raising fan-out.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B+ Tree range scan",
        "text": "<p>Which structural feature makes B+ tree <strong>range and in-order scans</strong> especially fast?</p>",
        "answers": [
          {
            "text": "The leaves are linked together in a sorted list",
            "fraction": 100,
            "feedback": "Correct — after finding the start, you walk the leaf links sequentially."
          },
          {
            "text": "Every key is hashed for O(1) lookup",
            "fraction": 0,
            "feedback": "B+ trees are ordered, not hashed; hashing would break range order."
          },
          {
            "text": "Data is duplicated in every internal node",
            "fraction": 0,
            "feedback": "Internal nodes hold only routing keys, no data."
          },
          {
            "text": "The tree re-sorts itself on each query",
            "fraction": 0,
            "feedback": "No re-sorting occurs; order is maintained by structure."
          }
        ],
        "generalFeedback": "The linked leaf list turns a range query into one descent plus a sequential walk — ideal for databases.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B+ Tree fan-out",
        "text": "<p>Compared with a B-tree of the same block size, why does a B+ tree tend to be <strong>shorter</strong>?</p>",
        "answers": [
          {
            "text": "Internal nodes store no data, so each block packs more keys, raising fan-out",
            "fraction": 100,
            "feedback": "Correct — higher fan-out means fewer levels for the same key count."
          },
          {
            "text": "It removes duplicate keys entirely",
            "fraction": 0,
            "feedback": "Separator keys are actually duplicated into internal nodes."
          },
          {
            "text": "It uses binary nodes instead of multiway nodes",
            "fraction": 0,
            "feedback": "It is a multiway structure, like the B-tree."
          },
          {
            "text": "It stores everything in the root",
            "fraction": 0,
            "feedback": "Data is in the leaves, spread across the leaf level."
          }
        ],
        "generalFeedback": "Data-free internal nodes maximize branching factor, shrinking tree height and I/O per lookup.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "B+ Tree leaf linkage",
        "text": "<p>In a B+ tree the leaf nodes are chained together so they can be traversed as a sorted sequential list.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — the linked leaves enable fast sequential and range access."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Leaf linkage is a defining feature of the B+ tree."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "B+ Tree internal data",
        "text": "<p>In a B+ tree the internal nodes store full data records alongside their keys.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — internal nodes hold only separator keys; data lives in the leaves."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — internal nodes route only; the records are all in the leaves."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Index use case term",
        "text": "<p>The B+ tree is the standard on-disk ______ structure used by relational databases and filesystems. (one English word)</p>",
        "answers": [
          {
            "text": "index",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "index*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "indexing",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "B+ Tree vs B-Tree multi",
        "text": "<p>Which statements distinguishing a B+ tree from a B-tree are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "A B+ tree keeps all data records in the leaves; a B-tree keeps data in internal nodes too",
            "fraction": 50,
            "feedback": "Yes — this is the core structural difference."
          },
          {
            "text": "A B+ tree links its leaves for fast range scans; a plain B-tree does not",
            "fraction": 50,
            "feedback": "Yes — linked leaves are a B+ tree feature."
          },
          {
            "text": "A B+ tree is unbalanced while a B-tree is balanced",
            "fraction": -50,
            "feedback": "No — both are height-balanced with all leaves at equal depth."
          },
          {
            "text": "A B+ tree has lower fan-out than a B-tree of the same block size",
            "fraction": -50,
            "feedback": "No — data-free internal nodes give a B+ tree higher fan-out."
          }
        ],
        "generalFeedback": "B+ trees confine data to linked leaves and gain higher fan-out; both trees remain balanced.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "B+ Tree 資料位置",
        "text": "<p>在 B+ 樹中,實際的<strong>資料紀錄 / 資料值</strong>存放於何處?</p>",
        "answers": [
          {
            "text": "只存於葉節點",
            "fraction": 100,
            "feedback": "正確 —— 所有資料都在葉節點;內部節點只持有路由用的鍵。"
          },
          {
            "text": "只存於根節點",
            "fraction": 0,
            "feedback": "根節點只是內部路由器,不是資料儲存處。"
          },
          {
            "text": "內部節點與葉節點兩者皆有",
            "fraction": 0,
            "feedback": "那是傳統 B-tree;B+ 樹把資料限制在葉節點。"
          },
          {
            "text": "存於另一個雜湊表",
            "fraction": 0,
            "feedback": "錯 —— 資料就存在樹本身的葉節點層。"
          }
        ],
        "generalFeedback": "B+ 樹把導航與儲存分離:內部節點負責路由,葉節點負責儲存。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B+ Tree 內部節點",
        "text": "<p>B+ 樹的<strong>內部節點</strong>扮演什麼角色?</p>",
        "answers": [
          {
            "text": "只持有鍵,作為路由器(分隔鍵)引導搜尋往下走",
            "fraction": 100,
            "feedback": "正確 —— 內部節點的鍵是分隔用的副本,並非資料。"
          },
          {
            "text": "存放完整的資料紀錄",
            "fraction": 0,
            "feedback": "錯 —— 紀錄只存在葉節點。"
          },
          {
            "text": "橫向串接以支援範圍掃描",
            "fraction": 0,
            "feedback": "被串接的是葉節點,不是內部節點。"
          },
          {
            "text": "刪除發生前一直是空的",
            "fraction": 0,
            "feedback": "內部節點始終攜帶分隔鍵。"
          }
        ],
        "generalFeedback": "由於內部節點不帶資料,每個區塊能塞入更多分隔鍵,提高分支度。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B+ Tree 範圍掃描",
        "text": "<p>哪一項結構特徵使 B+ 樹的<strong>範圍與中序掃描</strong>特別快速?</p>",
        "answers": [
          {
            "text": "葉節點以排序好的串列彼此串接",
            "fraction": 100,
            "feedback": "正確 —— 找到起點後,沿著葉節點連結依序走訪即可。"
          },
          {
            "text": "每個鍵都經雜湊以達 O(1) 查找",
            "fraction": 0,
            "feedback": "B+ 樹是有序的,不是雜湊;雜湊會破壞範圍順序。"
          },
          {
            "text": "資料在每個內部節點都複製一份",
            "fraction": 0,
            "feedback": "內部節點只持有路由鍵,不含資料。"
          },
          {
            "text": "樹在每次查詢時重新排序自己",
            "fraction": 0,
            "feedback": "不會重新排序;順序由結構本身維持。"
          }
        ],
        "generalFeedback": "葉節點連結串列把範圍查詢變成一次下降加一次循序走訪 —— 對資料庫非常理想。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B+ Tree 分支度",
        "text": "<p>在相同區塊大小下,與 B-tree 相比,為何 B+ 樹傾向<strong>更矮</strong>?</p>",
        "answers": [
          {
            "text": "內部節點不存資料,故每個區塊能塞入更多鍵,提高分支度",
            "fraction": 100,
            "feedback": "正確 —— 分支度越高,相同鍵數所需的層數越少。"
          },
          {
            "text": "它完全移除重複的鍵",
            "fraction": 0,
            "feedback": "分隔鍵反而會被複製到內部節點。"
          },
          {
            "text": "它使用二元節點而非多路節點",
            "fraction": 0,
            "feedback": "它是多路結構,如同 B-tree。"
          },
          {
            "text": "它把所有東西都存在根節點",
            "fraction": 0,
            "feedback": "資料在葉節點,分散於整個葉層。"
          }
        ],
        "generalFeedback": "不帶資料的內部節點使分支因子最大化,降低樹高與每次查找的 I/O。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "B+ Tree 葉節點串接",
        "text": "<p>在 B+ 樹中,葉節點彼此串接,因此可作為一個排序好的循序串列走訪。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 串接的葉節點使循序與範圍存取快速。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "葉節點串接是 B+ 樹的定義特徵。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "B+ Tree 內部資料",
        "text": "<p>在 B+ 樹中,內部節點會連同鍵一起存放完整的資料紀錄。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 內部節點只持有分隔鍵;資料存於葉節點。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 內部節點只負責路由;紀錄全在葉節點。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "索引用途名詞",
        "text": "<p>B+ 樹是關聯式資料庫與檔案系統所採用的標準磁碟 ______ 結構。(請以英文單字作答)</p>",
        "answers": [
          {
            "text": "index",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "index*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "indexing",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "B+ Tree 與 B-Tree 差異複選",
        "text": "<p>下列區分 B+ 樹與 B-tree 的敘述,哪些正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "B+ 樹把所有資料紀錄放在葉節點;B-tree 的內部節點也放資料",
            "fraction": 50,
            "feedback": "正確 —— 這是核心的結構差異。"
          },
          {
            "text": "B+ 樹串接其葉節點以加速範圍掃描;一般 B-tree 則否",
            "fraction": 50,
            "feedback": "正確 —— 串接的葉節點是 B+ 樹的特徵。"
          },
          {
            "text": "B+ 樹不平衡,而 B-tree 平衡",
            "fraction": -50,
            "feedback": "錯 —— 兩者都是高度平衡,所有葉節點深度相等。"
          },
          {
            "text": "相同區塊大小下,B+ 樹的分支度低於 B-tree",
            "fraction": -50,
            "feedback": "錯 —— 不帶資料的內部節點使 B+ 樹分支度更高。"
          }
        ],
        "generalFeedback": "B+ 樹把資料限制在串接的葉節點並取得更高分支度;兩種樹皆保持平衡。",
        "single": false
      }
    ]
  },
  "tree-bst": {
    "en": [
      {
        "type": "multichoice",
        "name": "BST ordering property",
        "text": "<p>What is the defining <strong>ordering property</strong> of a binary search tree (BST)?</p>",
        "answers": [
          {
            "text": "For every node, all keys in its left subtree are smaller and all keys in its right subtree are larger",
            "fraction": 100,
            "feedback": "Correct — left < node < right holds at every node."
          },
          {
            "text": "Every node has exactly two children",
            "fraction": 0,
            "feedback": "That describes a full tree, not the BST ordering rule."
          },
          {
            "text": "All leaves are at the same depth",
            "fraction": 0,
            "feedback": "That is a perfect/complete tree property, unrelated to key ordering."
          },
          {
            "text": "Keys are stored only in the leaves",
            "fraction": 0,
            "feedback": "A BST stores keys in every node, not just leaves."
          }
        ],
        "generalFeedback": "A BST keeps left subtree keys < node key < right subtree keys, which is what makes ordered search possible.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "BST average search complexity",
        "text": "<p>For a reasonably balanced BST, what is the <strong>average-case</strong> time complexity of search, insert, and delete?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — each comparison discards about half the remaining tree."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "You still descend a path proportional to the height."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is a sorting bound, not a single BST operation."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "No single operation walks the tree quadratically."
          }
        ],
        "generalFeedback": "On a balanced BST the height is ~log n, so each operation follows a single root-to-node path of O(log n) steps.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "BST worst case",
        "text": "<p>Which situation causes a plain BST to degrade to <strong>O(n)</strong> per operation?</p>",
        "answers": [
          {
            "text": "Inserting keys in already-sorted order, so the tree degenerates into a linked list",
            "fraction": 100,
            "feedback": "Correct — a skewed tree has height n, so operations become linear."
          },
          {
            "text": "Inserting keys in random order",
            "fraction": 0,
            "feedback": "Random insertion gives expected height ~log n, not linear."
          },
          {
            "text": "Storing floating-point keys instead of integers",
            "fraction": 0,
            "feedback": "Key type does not affect the tree's shape."
          },
          {
            "text": "Using recursion instead of iteration for traversal",
            "fraction": 0,
            "feedback": "Implementation style does not change asymptotic height."
          }
        ],
        "generalFeedback": "A plain BST is not self-balancing; sorted insertions produce a fully skewed tree of height n, giving O(n) worst-case operations.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "BST in-order traversal",
        "text": "<p>What does an <strong>in-order</strong> traversal of a BST produce?</p>",
        "answers": [
          {
            "text": "The keys in ascending sorted order",
            "fraction": 100,
            "feedback": "Correct — visiting left, node, right yields sorted keys."
          },
          {
            "text": "The keys in the order they were inserted",
            "fraction": 0,
            "feedback": "Traversal order depends on structure, not insertion history."
          },
          {
            "text": "The keys grouped by tree level",
            "fraction": 0,
            "feedback": "That describes a level-order (breadth-first) traversal."
          },
          {
            "text": "The keys in random order",
            "fraction": 0,
            "feedback": "In-order traversal is deterministic and sorted."
          }
        ],
        "generalFeedback": "Because left < node < right everywhere, an in-order (left, node, right) walk emits keys in ascending order.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "BST self-balancing",
        "text": "<p>A plain binary search tree automatically keeps itself balanced as keys are inserted and deleted.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "A plain BST has no balancing mechanism; adversarial input makes it skewed."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — balancing requires an augmented structure such as AVL or red-black trees."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "BST space complexity",
        "text": "<p>A BST storing n keys uses O(n) space.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — one node per key, so space grows linearly with n."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Each key needs its own node, giving O(n) total space."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "BST sorted traversal term",
        "text": "<p>Name the traversal (one word) of a BST that visits keys in ascending sorted order: ______ (traversal).</p>",
        "answers": [
          {
            "text": "in-order",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "inorder",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "in-order*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "inorder*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "BST properties multi-select",
        "text": "<p>Which statements about a plain (unbalanced) BST are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "In-order traversal returns the keys in sorted order",
            "fraction": 50,
            "feedback": "Yes — this is a core BST property."
          },
          {
            "text": "Average-case search is O(log n) but worst-case is O(n)",
            "fraction": 50,
            "feedback": "Yes — balanced on average, linear when skewed."
          },
          {
            "text": "It guarantees O(log n) worst-case operations without any extra machinery",
            "fraction": -50,
            "feedback": "No — only self-balancing variants guarantee that."
          },
          {
            "text": "It stores color or balance-factor metadata in every node",
            "fraction": -50,
            "feedback": "No — that is red-black or AVL trees, not a plain BST."
          }
        ],
        "generalFeedback": "A plain BST gives sorted in-order output and O(log n) average operations, but it is not self-balancing and stores no balance metadata, so the worst case is O(n).",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "BST 排序性質",
        "text": "<p>二元搜尋樹(BST)最關鍵的<strong>排序性質</strong>是什麼?</p>",
        "answers": [
          {
            "text": "對每個節點,左子樹的所有鍵值都比它小,右子樹的所有鍵值都比它大",
            "fraction": 100,
            "feedback": "正確 —— 每個節點都滿足 左 < 節點 < 右。"
          },
          {
            "text": "每個節點恰好都有兩個子節點",
            "fraction": 0,
            "feedback": "那是完滿樹的描述,不是 BST 的排序規則。"
          },
          {
            "text": "所有葉節點都在相同深度",
            "fraction": 0,
            "feedback": "那是完美/完全樹的性質,與鍵值排序無關。"
          },
          {
            "text": "鍵值只儲存在葉節點",
            "fraction": 0,
            "feedback": "BST 在每個節點都儲存鍵值,不只葉節點。"
          }
        ],
        "generalFeedback": "BST 維持 左子樹鍵值 < 節點鍵值 < 右子樹鍵值,這正是能做有序搜尋的原因。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "BST 平均搜尋複雜度",
        "text": "<p>對一棵大致平衡的 BST,搜尋、插入、刪除的<strong>平均情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 每次比較大約排除掉一半的剩餘樹。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "你仍需沿著與高度成正比的路徑下降。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是排序的界,不是單一 BST 操作。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "沒有任何單一操作會以平方時間走訪整棵樹。"
          }
        ],
        "generalFeedback": "平衡的 BST 高度約為 log n,每個操作只沿一條根到節點的路徑走 O(log n) 步。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "BST 最差情況",
        "text": "<p>哪一種情況會讓一般 BST 每次操作退化為 <strong>O(n)</strong>?</p>",
        "answers": [
          {
            "text": "以已排序的順序插入鍵值,使樹退化成一條鏈結串列",
            "fraction": 100,
            "feedback": "正確 —— 傾斜的樹高度為 n,操作變成線性。"
          },
          {
            "text": "以隨機順序插入鍵值",
            "fraction": 0,
            "feedback": "隨機插入的期望高度約為 log n,不是線性。"
          },
          {
            "text": "儲存浮點數鍵值而非整數",
            "fraction": 0,
            "feedback": "鍵值型別不會影響樹的形狀。"
          },
          {
            "text": "走訪時使用遞迴而非迭代",
            "fraction": 0,
            "feedback": "實作方式不會改變漸進高度。"
          }
        ],
        "generalFeedback": "一般 BST 不會自我平衡;已排序的插入會產生完全傾斜、高度為 n 的樹,造成 O(n) 的最差情況。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "BST 中序走訪",
        "text": "<p>對 BST 做<strong>中序</strong>走訪會產生什麼結果?</p>",
        "answers": [
          {
            "text": "鍵值由小到大的排序順序",
            "fraction": 100,
            "feedback": "正確 —— 依 左、節點、右 走訪會得到排序後的鍵值。"
          },
          {
            "text": "鍵值被插入的順序",
            "fraction": 0,
            "feedback": "走訪順序取決於結構,而非插入歷程。"
          },
          {
            "text": "依樹的層級分組的鍵值",
            "fraction": 0,
            "feedback": "那是層序(廣度優先)走訪。"
          },
          {
            "text": "鍵值的隨機順序",
            "fraction": 0,
            "feedback": "中序走訪是確定且已排序的。"
          }
        ],
        "generalFeedback": "因為處處滿足 左 < 節點 < 右,中序(左、節點、右)走訪會由小到大輸出鍵值。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "BST 自我平衡",
        "text": "<p>一般的二元搜尋樹在插入與刪除鍵值時會自動保持平衡。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "一般 BST 沒有任何平衡機制;對抗性輸入會讓它傾斜。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 平衡需要像 AVL 或紅黑樹這類擴充結構。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "BST 空間複雜度",
        "text": "<p>儲存 n 個鍵值的 BST 使用 O(n) 空間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 每個鍵值一個節點,空間隨 n 線性成長。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "每個鍵值需要自己的節點,總空間為 O(n)。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "BST 排序走訪名詞",
        "text": "<p>請寫出 BST 中會依由小到大排序造訪鍵值的走訪名稱(英文一詞):______ (traversal)。</p>",
        "answers": [
          {
            "text": "in-order",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "inorder",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "in-order*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "inorder*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "BST 性質複選",
        "text": "<p>關於一般(未平衡)BST,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "中序走訪會回傳排序後的鍵值",
            "fraction": 50,
            "feedback": "正確 —— 這是 BST 的核心性質。"
          },
          {
            "text": "平均搜尋為 O(log n),但最差為 O(n)",
            "fraction": 50,
            "feedback": "正確 —— 平均平衡,傾斜時為線性。"
          },
          {
            "text": "不需任何額外機制即可保證 O(log n) 的最差情況操作",
            "fraction": -50,
            "feedback": "錯 —— 只有自我平衡的變體能保證這點。"
          },
          {
            "text": "它在每個節點儲存顏色或平衡因子資訊",
            "fraction": -50,
            "feedback": "錯 —— 那是紅黑樹或 AVL 樹,不是一般 BST。"
          }
        ],
        "generalFeedback": "一般 BST 的中序輸出已排序,且平均操作為 O(log n),但它不會自我平衡也不儲存平衡資訊,因此最差情況為 O(n)。",
        "single": false
      }
    ]
  },
  "tree-btree": {
    "en": [
      {
        "type": "multichoice",
        "name": "B-Tree node capacity",
        "text": "<p>In a B-tree of <strong>order m</strong>, how many keys and children can a single node hold at most?</p>",
        "answers": [
          {
            "text": "Up to m&minus;1 keys and up to m children",
            "fraction": 100,
            "feedback": "Correct — a node with k keys has k+1 children, so at most m&minus;1 keys and m children."
          },
          {
            "text": "Up to m keys and up to m&minus;1 children",
            "fraction": 0,
            "feedback": "Reversed — keys are one fewer than children."
          },
          {
            "text": "Exactly 2 keys and 3 children",
            "fraction": 0,
            "feedback": "That describes only a 2-3 tree (order 3), not the general case."
          },
          {
            "text": "Up to m keys and up to m children",
            "fraction": 0,
            "feedback": "Children always exceed keys by exactly one."
          }
        ],
        "generalFeedback": "Order m bounds a node to m&minus;1 keys; the separating keys create m child pointers.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B-Tree leaf depth",
        "text": "<p>What is true about the <strong>leaves</strong> of a B-tree?</p>",
        "answers": [
          {
            "text": "All leaves lie at the same depth",
            "fraction": 100,
            "feedback": "Correct — the B-tree stays perfectly height-balanced."
          },
          {
            "text": "Leaves may differ in depth by up to one level",
            "fraction": 0,
            "feedback": "No — every leaf is at exactly the same depth."
          },
          {
            "text": "Only the leftmost path reaches a leaf",
            "fraction": 0,
            "feedback": "Every root-to-leaf path has equal length."
          },
          {
            "text": "Leaves store no keys, only child pointers",
            "fraction": 0,
            "feedback": "In a B-tree leaves do store keys."
          }
        ],
        "generalFeedback": "Insertions grow the tree by splitting upward, so all leaves always remain equidistant from the root.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B-Tree disk motivation",
        "text": "<p>Why is a B-tree preferred over a binary search tree for <strong>disk-resident</strong> data?</p>",
        "answers": [
          {
            "text": "High fan-out gives low height, so a search touches few nodes and few disk/block reads",
            "fraction": 100,
            "feedback": "Correct — each node maps to a disk block; fewer levels mean fewer I/O operations."
          },
          {
            "text": "It stores every key in RAM so no disk is needed",
            "fraction": 0,
            "feedback": "B-trees are designed precisely for data too large for RAM."
          },
          {
            "text": "It compresses keys to save disk space",
            "fraction": 0,
            "feedback": "The motivation is reducing I/O count, not compression."
          },
          {
            "text": "It sorts data faster than quicksort",
            "fraction": 0,
            "feedback": "It is a search structure, not a sorting algorithm."
          }
        ],
        "generalFeedback": "A disk seek is far costlier than a comparison; wide nodes minimize the number of blocks read per query.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B-Tree operation complexity",
        "text": "<p>What is the time complexity of search, insert, and delete in a B-tree with n keys?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — the balanced height is logarithmic in n."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That would be a degenerate list, which B-trees avoid by balancing."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "You still descend a logarithmic number of levels."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is a total sorting cost, not a single operation."
          }
        ],
        "generalFeedback": "Balanced height guarantees logarithmic search, insert, and delete.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "B-Tree key placement",
        "text": "<p>In a classic B-tree, keys (and their associated data) are stored in <em>both</em> internal and leaf nodes.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — unlike a B+ tree, a B-tree keeps data in internal nodes too."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "A B-tree stores keys throughout; only the B+ tree confines data to leaves."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "B-Tree occupancy",
        "text": "<p>Every non-root node of a B-tree of order m must hold at least &lceil;m/2&rceil;&minus;1 keys.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — this minimum-occupancy rule keeps the tree at least half full and balanced."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "The lower bound &lceil;m/2&rceil;&minus;1 is exactly what guarantees balance."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Balance property term",
        "text": "<p>A B-tree is a <em>balanced</em> multiway search tree because all of its ______ lie at the same depth. (one word)</p>",
        "answers": [
          {
            "text": "leaves",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "leaf",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "leaves*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "B-Tree properties multi",
        "text": "<p>Which statements about B-trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Node occupancy is kept between &lceil;m/2&rceil;&minus;1 and m&minus;1 keys",
            "fraction": 50,
            "feedback": "Yes — this bounded fill keeps the structure balanced."
          },
          {
            "text": "They are designed to minimize disk/block accesses",
            "fraction": 50,
            "feedback": "Yes — low height means few I/O operations."
          },
          {
            "text": "They confine all data to the leaves and link the leaves together",
            "fraction": -50,
            "feedback": "No — that describes a B+ tree, not a B-tree."
          },
          {
            "text": "Each node has at most two children",
            "fraction": -50,
            "feedback": "No — that is a binary tree; a B-tree node has up to m children."
          }
        ],
        "generalFeedback": "B-trees keep bounded occupancy for balance and wide nodes for low-I/O search; leaf-only data with linked leaves is the B+ tree.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "B-Tree 節點容量",
        "text": "<p>在<strong>階數為 m</strong> 的 B-tree 中,單一節點最多可容納多少個鍵與多少個子節點?</p>",
        "answers": [
          {
            "text": "最多 m&minus;1 個鍵、最多 m 個子節點",
            "fraction": 100,
            "feedback": "正確 —— 有 k 個鍵的節點有 k+1 個子節點,故最多 m&minus;1 個鍵、m 個子節點。"
          },
          {
            "text": "最多 m 個鍵、最多 m&minus;1 個子節點",
            "fraction": 0,
            "feedback": "顛倒了 —— 鍵比子節點少一個。"
          },
          {
            "text": "剛好 2 個鍵、3 個子節點",
            "fraction": 0,
            "feedback": "那只描述 2-3 樹(階數 3),並非一般情況。"
          },
          {
            "text": "最多 m 個鍵、最多 m 個子節點",
            "fraction": 0,
            "feedback": "子節點數恆比鍵數多一。"
          }
        ],
        "generalFeedback": "階數 m 限制每個節點最多 m&minus;1 個鍵;分隔鍵形成 m 個子節點指標。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B-Tree 葉節點深度",
        "text": "<p>關於 B-tree 的<strong>葉節點</strong>,下列何者正確?</p>",
        "answers": [
          {
            "text": "所有葉節點都位於相同深度",
            "fraction": 100,
            "feedback": "正確 —— B-tree 維持完美的高度平衡。"
          },
          {
            "text": "葉節點深度最多可相差一層",
            "fraction": 0,
            "feedback": "錯 —— 每個葉節點都在完全相同的深度。"
          },
          {
            "text": "只有最左路徑會抵達葉節點",
            "fraction": 0,
            "feedback": "每條由根到葉的路徑長度都相等。"
          },
          {
            "text": "葉節點不存鍵,只存子節點指標",
            "fraction": 0,
            "feedback": "B-tree 的葉節點確實存放鍵。"
          }
        ],
        "generalFeedback": "插入時透過向上分裂使樹長高,因此所有葉節點與根始終等距。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B-Tree 磁碟動機",
        "text": "<p>對於<strong>存放於磁碟</strong>的資料,為何偏好 B-tree 而非二元搜尋樹?</p>",
        "answers": [
          {
            "text": "高分支度使樹高很低,一次搜尋只碰觸少數節點、少數磁碟/區塊讀取",
            "fraction": 100,
            "feedback": "正確 —— 每個節點對應一個磁碟區塊;層數少代表 I/O 次數少。"
          },
          {
            "text": "它把所有鍵放在 RAM,故不需磁碟",
            "fraction": 0,
            "feedback": "B-tree 正是為了處理大於 RAM 的資料而設計。"
          },
          {
            "text": "它壓縮鍵以節省磁碟空間",
            "fraction": 0,
            "feedback": "其動機是降低 I/O 次數,而非壓縮。"
          },
          {
            "text": "它排序資料比快速排序更快",
            "fraction": 0,
            "feedback": "它是搜尋結構,不是排序演算法。"
          }
        ],
        "generalFeedback": "一次磁碟尋道遠比一次比較昂貴;寬節點使每次查詢讀取的區塊數最少。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "B-Tree 操作複雜度",
        "text": "<p>在有 n 個鍵的 B-tree 中,搜尋、插入、刪除的時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 平衡的樹高與 n 呈對數關係。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是退化成串列的情況,B-tree 以平衡避免之。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "仍需下降對數層數。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是整體排序成本,不是單一操作。"
          }
        ],
        "generalFeedback": "平衡的樹高保證搜尋、插入、刪除皆為對數時間。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "B-Tree 鍵的放置",
        "text": "<p>在傳統 B-tree 中,鍵(及其對應資料)存放於<em>內部節點與葉節點兩者</em>。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 與 B+ 樹不同,B-tree 的內部節點也存放資料。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "B-tree 各處皆存鍵;只有 B+ 樹才把資料限制在葉節點。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "B-Tree 佔用率",
        "text": "<p>階數為 m 的 B-tree 中,除根節點外的每個節點都必須至少持有 &lceil;m/2&rceil;&minus;1 個鍵。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 此最低佔用規則使樹至少半滿並保持平衡。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "下界 &lceil;m/2&rceil;&minus;1 正是保證平衡的條件。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "平衡性質名詞",
        "text": "<p>B-tree 之所以是<em>平衡</em>的多路搜尋樹,是因為它所有的 ______ 都位於相同深度。(請以英文單字作答)</p>",
        "answers": [
          {
            "text": "leaves",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "leaf",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "leaves*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "B-Tree 性質複選",
        "text": "<p>關於 B-tree,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "節點佔用率維持在 &lceil;m/2&rceil;&minus;1 至 m&minus;1 個鍵之間",
            "fraction": 50,
            "feedback": "正確 —— 此有界填充使結構保持平衡。"
          },
          {
            "text": "其設計目的是最小化磁碟/區塊存取次數",
            "fraction": 50,
            "feedback": "正確 —— 低樹高代表少 I/O 次數。"
          },
          {
            "text": "它把所有資料限制在葉節點,並將葉節點彼此串接",
            "fraction": -50,
            "feedback": "錯 —— 那是 B+ 樹,不是 B-tree。"
          },
          {
            "text": "每個節點最多只有兩個子節點",
            "fraction": -50,
            "feedback": "錯 —— 那是二元樹;B-tree 節點最多有 m 個子節點。"
          }
        ],
        "generalFeedback": "B-tree 以有界佔用維持平衡、以寬節點達成低 I/O 搜尋;資料僅存葉節點且葉節點串接的是 B+ 樹。",
        "single": false
      }
    ]
  },
  "tree-catalan": {
    "en": [
      {
        "type": "multichoice",
        "name": "Number of BSTs",
        "text": "<p>The number of structurally distinct binary trees with <em>n</em> nodes is given by which sequence?</p>",
        "answers": [
          {
            "text": "The Catalan numbers",
            "fraction": 100,
            "feedback": "Correct — the count is the nth Catalan number."
          },
          {
            "text": "The Fibonacci numbers",
            "fraction": 0,
            "feedback": "No — Fibonacci counts a different recurrence, not tree shapes."
          },
          {
            "text": "The powers of two",
            "fraction": 0,
            "feedback": "No — 2^n overcounts; not every bit pattern is a valid tree shape."
          },
          {
            "text": "The factorials",
            "fraction": 0,
            "feedback": "No — n! counts permutations, not distinct tree structures."
          }
        ],
        "generalFeedback": "The number of distinct binary tree shapes on n nodes (and distinct BSTs over n keys) is the nth Catalan number.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Catalan formula",
        "text": "<p>Which closed-form expression gives the nth Catalan number C<sub>n</sub>?</p>",
        "answers": [
          {
            "text": "C(2n, n) / (n + 1)",
            "fraction": 100,
            "feedback": "Correct — the central binomial coefficient divided by n+1."
          },
          {
            "text": "n! / 2",
            "fraction": 0,
            "feedback": "No — that is not the Catalan formula."
          },
          {
            "text": "2^n / (n + 1)",
            "fraction": 0,
            "feedback": "No — the numerator is the binomial C(2n, n), not 2^n."
          },
          {
            "text": "C(2n, n) * (n + 1)",
            "fraction": 0,
            "feedback": "No — you divide by n+1, not multiply."
          }
        ],
        "generalFeedback": "C_n = C(2n, n) / (n + 1); equivalently C_n = (2n)! / ((n+1)! n!).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Catalan value n=3",
        "text": "<p>How many structurally distinct binary trees exist with <strong>3 nodes</strong> (i.e. C<sub>3</sub>)?</p>",
        "answers": [
          {
            "text": "5",
            "fraction": 100,
            "feedback": "Correct — C_3 = 5."
          },
          {
            "text": "6",
            "fraction": 0,
            "feedback": "No — 6 = 3!, the number of key orderings, not distinct tree shapes."
          },
          {
            "text": "3",
            "fraction": 0,
            "feedback": "No — there are more than 3 distinct shapes for 3 nodes."
          },
          {
            "text": "8",
            "fraction": 0,
            "feedback": "No — 2^3 overcounts; the answer is 5."
          }
        ],
        "generalFeedback": "C_0=1, C_1=1, C_2=2, C_3=5, C_4=14, C_5=42; so with 3 nodes there are 5 distinct binary tree shapes.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Catalan recurrence",
        "text": "<p>Which recurrence generates the Catalan numbers (splitting on the root's subtree sizes)?</p>",
        "answers": [
          {
            "text": "C= &Sigma;C&middot; C",
            "fraction": 100,
            "feedback": "Correct — sum over the left subtree size i and right subtree size n−i."
          },
          {
            "text": "C= C+ C",
            "fraction": 0,
            "feedback": "No — that is the Fibonacci recurrence."
          },
          {
            "text": "C= n &middot; C",
            "fraction": 0,
            "feedback": "No — that generates factorials."
          },
          {
            "text": "C= 2 &middot; C",
            "fraction": 0,
            "feedback": "No — that generates powers of two."
          }
        ],
        "generalFeedback": "Fixing the root, the left subtree has i nodes and the right has n−i, so C_{n+1} = Σ C_i·C_{n−i}.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Catalan counts BSTs",
        "text": "<p>The number of distinct binary search trees over <em>n</em> distinct keys equals the nth Catalan number.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — each distinct shape corresponds to exactly one BST over the sorted keys."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "The count of distinct BSTs is indeed the nth Catalan number."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Catalan not factorial",
        "text": "<p>The number of distinct binary tree shapes with n nodes equals n! (n factorial).</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — it is the nth Catalan number, which is smaller than n! for n > 2."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — it is the Catalan number, not n!."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Sequence name",
        "text": "<p>The sequence 1, 1, 2, 5, 14, 42, ... that counts binary tree shapes is called the ______ numbers.</p>",
        "answers": [
          {
            "text": "Catalan",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "Catalan*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Catalan counts multi",
        "text": "<p>Which of the following are counted by the nth Catalan number? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "The number of distinct binary search trees over n keys",
            "fraction": 50,
            "feedback": "Yes — one per distinct tree shape."
          },
          {
            "text": "The number of valid strings of n balanced pairs of parentheses",
            "fraction": 50,
            "feedback": "Yes — this is a classic Catalan interpretation."
          },
          {
            "text": "The number of permutations of n distinct elements",
            "fraction": -50,
            "feedback": "No — that is n!, not Catalan."
          },
          {
            "text": "The number of subsets of an n-element set",
            "fraction": -50,
            "feedback": "No — that is 2^n, not Catalan."
          }
        ],
        "generalFeedback": "Catalan counts binary tree shapes, distinct BSTs, balanced-parenthesis strings, full binary trees with n+1 leaves, and polygon triangulations — but not permutations (n!) or subsets (2^n).",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "BST 的數目",
        "text": "<p>具有 <em>n</em> 個節點、結構相異的二元樹數目由哪一個數列給出?</p>",
        "answers": [
          {
            "text": "卡塔蘭數(Catalan numbers)",
            "fraction": 100,
            "feedback": "正確 —— 其數目為第 n 個卡塔蘭數。"
          },
          {
            "text": "費氏數(Fibonacci numbers)",
            "fraction": 0,
            "feedback": "錯 —— 費氏數對應不同的遞迴,並非樹形數目。"
          },
          {
            "text": "2 的次方",
            "fraction": 0,
            "feedback": "錯 —— 2^n 會高估;並非每個位元樣式都是合法樹形。"
          },
          {
            "text": "階乘",
            "fraction": 0,
            "feedback": "錯 —— n! 計數排列,而非相異樹結構。"
          }
        ],
        "generalFeedback": "n 個節點的相異二元樹形數目(以及 n 個鍵值的相異 BST 數目)為第 n 個卡塔蘭數。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "卡塔蘭數公式",
        "text": "<p>下列哪個封閉式給出第 n 個卡塔蘭數 C<sub>n</sub>?</p>",
        "answers": [
          {
            "text": "C(2n, n) / (n + 1)",
            "fraction": 100,
            "feedback": "正確 —— 中央二項式係數除以 n+1。"
          },
          {
            "text": "n! / 2",
            "fraction": 0,
            "feedback": "錯 —— 那不是卡塔蘭數公式。"
          },
          {
            "text": "2^n / (n + 1)",
            "fraction": 0,
            "feedback": "錯 —— 分子是二項式 C(2n, n),而非 2^n。"
          },
          {
            "text": "C(2n, n) * (n + 1)",
            "fraction": 0,
            "feedback": "錯 —— 是除以 n+1,不是相乘。"
          }
        ],
        "generalFeedback": "C_n = C(2n, n) / (n + 1);等價於 C_n = (2n)! / ((n+1)! n!)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "卡塔蘭數值 n=3",
        "text": "<p>具有 <strong>3 個節點</strong>、結構相異的二元樹有幾種(即 C<sub>3</sub>)?</p>",
        "answers": [
          {
            "text": "5",
            "fraction": 100,
            "feedback": "正確 —— C_3 = 5。"
          },
          {
            "text": "6",
            "fraction": 0,
            "feedback": "錯 —— 6 = 3!,是鍵值排序數,而非相異樹形數。"
          },
          {
            "text": "3",
            "fraction": 0,
            "feedback": "錯 —— 3 個節點的相異樹形超過 3 種。"
          },
          {
            "text": "8",
            "fraction": 0,
            "feedback": "錯 —— 2^3 會高估;答案是 5。"
          }
        ],
        "generalFeedback": "C_0=1、C_1=1、C_2=2、C_3=5、C_4=14、C_5=42;故 3 個節點有 5 種相異二元樹形。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "卡塔蘭數遞迴",
        "text": "<p>哪一條遞迴式產生卡塔蘭數(依根節點的子樹大小拆分)?</p>",
        "answers": [
          {
            "text": "C= &Sigma;C&middot; C",
            "fraction": 100,
            "feedback": "正確 —— 對左子樹大小 i 與右子樹大小 n−i 求和。"
          },
          {
            "text": "C= C+ C",
            "fraction": 0,
            "feedback": "錯 —— 那是費氏數遞迴。"
          },
          {
            "text": "C= n &middot; C",
            "fraction": 0,
            "feedback": "錯 —— 那會產生階乘。"
          },
          {
            "text": "C= 2 &middot; C",
            "fraction": 0,
            "feedback": "錯 —— 那會產生 2 的次方。"
          }
        ],
        "generalFeedback": "固定根節點後,左子樹有 i 個節點、右子樹有 n−i 個,故 C_{n+1} = Σ C_i·C_{n−i}。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "卡塔蘭數計 BST",
        "text": "<p>由 <em>n</em> 個相異鍵值構成的相異二元搜尋樹數目等於第 n 個卡塔蘭數。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 每個相異樹形恰對應排序鍵值上的一棵 BST。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "相異 BST 的數目確實是第 n 個卡塔蘭數。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "卡塔蘭數非階乘",
        "text": "<p>n 個節點的相異二元樹形數目等於 n!(n 階乘)。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 它是第 n 個卡塔蘭數,對 n > 2 而言小於 n!。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 它是卡塔蘭數,而非 n!。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "數列名稱",
        "text": "<p>計數二元樹形的數列 1, 1, 2, 5, 14, 42, ... 稱為______數(以英文作答)。</p>",
        "answers": [
          {
            "text": "Catalan",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "Catalan*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "卡塔蘭數計數複選",
        "text": "<p>下列哪些可由第 n 個卡塔蘭數計數?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "n 個鍵值上的相異二元搜尋樹數目",
            "fraction": 50,
            "feedback": "正確 —— 每個相異樹形對應一棵。"
          },
          {
            "text": "n 對括號的合法平衡括號字串數目",
            "fraction": 50,
            "feedback": "正確 —— 這是經典的卡塔蘭數詮釋。"
          },
          {
            "text": "n 個相異元素的排列數目",
            "fraction": -50,
            "feedback": "錯 —— 那是 n!,而非卡塔蘭數。"
          },
          {
            "text": "n 元素集合的子集數目",
            "fraction": -50,
            "feedback": "錯 —— 那是 2^n,而非卡塔蘭數。"
          }
        ],
        "generalFeedback": "卡塔蘭數計數:二元樹形、相異 BST、平衡括號字串、n+1 葉的滿二元樹、多邊形三角剖分 —— 但不含排列(n!)或子集(2^n)。",
        "single": false
      }
    ]
  },
  "tree-copy-equal": {
    "en": [
      {
        "type": "multichoice",
        "name": "Complexity of COPY",
        "text": "<p>What is the time complexity of recursively copying a binary tree with <em>n</em> nodes?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — each node is visited and cloned exactly once."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "No — you must touch every node, not just a root-to-leaf path."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "No — there is no per-node logarithmic factor; it is linear."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "No — no node is processed more than once."
          }
        ],
        "generalFeedback": "COPY visits every node once to allocate a clone and recurse on both subtrees, giving O(n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "How COPY works",
        "text": "<p>Which recursive procedure correctly copies a binary tree?</p>",
        "answers": [
          {
            "text": "Create a new node with the same value, then recursively copy the left and right subtrees",
            "fraction": 100,
            "feedback": "Correct — clone the node, then recurse on both children."
          },
          {
            "text": "Return the same node reference so both trees share nodes",
            "fraction": 0,
            "feedback": "No — that aliases the original; a true copy allocates new nodes."
          },
          {
            "text": "Copy only the root and leave children NULL",
            "fraction": 0,
            "feedback": "No — a copy must reproduce the entire subtree structure."
          },
          {
            "text": "Copy the left subtree but link the original right subtree",
            "fraction": 0,
            "feedback": "No — both subtrees must be freshly copied."
          }
        ],
        "generalFeedback": "COPY(t): if t is empty return empty; else make a new node with t's value and set its children to COPY(t.left) and COPY(t.right).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "EQUAL base case: both empty",
        "text": "<p>In the EQUAL algorithm, what should be returned when <strong>both</strong> trees are empty?</p>",
        "answers": [
          {
            "text": "Equal (true)",
            "fraction": 100,
            "feedback": "Correct — two empty trees are considered equal."
          },
          {
            "text": "Not equal (false)",
            "fraction": 0,
            "feedback": "No — two empty trees match; this is the successful base case."
          },
          {
            "text": "It depends on the depth reached",
            "fraction": 0,
            "feedback": "No — depth is irrelevant; both-empty always means equal."
          },
          {
            "text": "Undefined behavior",
            "fraction": 0,
            "feedback": "No — both-empty is a well-defined base case returning true."
          }
        ],
        "generalFeedback": "Base cases: both empty ⇒ equal; exactly one empty ⇒ not equal; otherwise compare values and recurse.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "EQUAL: exactly one empty",
        "text": "<p>In EQUAL, what is returned when exactly <strong>one</strong> of the two trees is empty?</p>",
        "answers": [
          {
            "text": "Not equal (false)",
            "fraction": 100,
            "feedback": "Correct — one empty and one non-empty cannot match."
          },
          {
            "text": "Equal (true)",
            "fraction": 0,
            "feedback": "No — differing structure here means not equal."
          },
          {
            "text": "Compare their root values",
            "fraction": 0,
            "feedback": "No — the empty side has no value to compare; the answer is not equal."
          },
          {
            "text": "Recurse into the non-empty tree only",
            "fraction": 0,
            "feedback": "No — a structural mismatch is decided immediately as not equal."
          }
        ],
        "generalFeedback": "If one tree ends before the other, their structures differ, so EQUAL returns false immediately.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Both are O(n)",
        "text": "<p>Both the recursive COPY and EQUAL algorithms run in O(n) time on a tree of n nodes.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — each visits every node a constant number of times."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "They are — both are linear-time recursive traversals."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "EQUAL ignores values",
        "text": "<p>The EQUAL algorithm checks only that two trees have the same shape, ignoring node values.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — EQUAL requires identical structure AND matching node values."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — EQUAL compares both structure and values."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Traversal order of these algorithms",
        "text": "<p>COPY and EQUAL naturally finish a node's children before combining their results at the node — this matches which recursive traversal order? Answer with the traversal name.</p>",
        "answers": [
          {
            "text": "post-order",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "postorder",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "post order",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "post-order*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Facts about COPY and EQUAL",
        "text": "<p>Which statements about the COPY and EQUAL algorithms are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "COPY allocates a new node for every node in the original",
            "fraction": 50,
            "feedback": "Yes — a true copy creates fresh nodes."
          },
          {
            "text": "EQUAL returns true only when structure and values both match",
            "fraction": 50,
            "feedback": "Yes — both must agree."
          },
          {
            "text": "EQUAL of two empty trees returns not equal",
            "fraction": -50,
            "feedback": "No — two empty trees are equal."
          },
          {
            "text": "COPY runs in O(log n) time",
            "fraction": -50,
            "feedback": "No — COPY is O(n); every node is cloned."
          }
        ],
        "generalFeedback": "Both are O(n) recursive algorithms; COPY clones each node, and EQUAL demands matching structure and values, with both-empty ⇒ equal.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "COPY 的複雜度",
        "text": "<p>遞迴複製一棵有 <em>n</em> 個節點的二元樹,其時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 每個節點只被拜訪並複製一次。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "錯 —— 你必須碰過每個節點,而非只走一條根到葉的路徑。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "錯 —— 每個節點並無額外的對數因子;它是線性的。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "錯 —— 沒有節點會被處理超過一次。"
          }
        ],
        "generalFeedback": "COPY 拜訪每個節點一次以配置副本並對兩個子樹遞迴,因此為 O(n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "COPY 如何運作",
        "text": "<p>哪一段遞迴程序能正確複製一棵二元樹?</p>",
        "answers": [
          {
            "text": "建立一個值相同的新節點,然後遞迴複製左、右子樹",
            "fraction": 100,
            "feedback": "正確 —— 複製該節點,再對兩個子節點遞迴。"
          },
          {
            "text": "回傳同一個節點參考,讓兩棵樹共用節點",
            "fraction": 0,
            "feedback": "錯 —— 那會別名到原樹;真正的複製會配置新節點。"
          },
          {
            "text": "只複製根節點,並將子節點留為 NULL",
            "fraction": 0,
            "feedback": "錯 —— 複製必須重現整個子樹結構。"
          },
          {
            "text": "複製左子樹,但連結原本的右子樹",
            "fraction": 0,
            "feedback": "錯 —— 兩個子樹都必須重新複製。"
          }
        ],
        "generalFeedback": "COPY(t):若 t 為空則回傳空;否則以 t 的值建立新節點,並將其子節點設為 COPY(t.left) 與 COPY(t.right)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "EQUAL 基底情況:兩者皆空",
        "text": "<p>在 EQUAL 演算法中,當<strong>兩棵</strong>樹都為空時應回傳什麼?</p>",
        "answers": [
          {
            "text": "相等(true)",
            "fraction": 100,
            "feedback": "正確 —— 兩棵空樹視為相等。"
          },
          {
            "text": "不相等(false)",
            "fraction": 0,
            "feedback": "錯 —— 兩棵空樹相符;這是成功的基底情況。"
          },
          {
            "text": "視所達到的深度而定",
            "fraction": 0,
            "feedback": "錯 —— 深度無關;兩者皆空一律表示相等。"
          },
          {
            "text": "未定義行為",
            "fraction": 0,
            "feedback": "錯 —— 兩者皆空是定義明確的基底情況,回傳 true。"
          }
        ],
        "generalFeedback": "基底情況:兩者皆空 ⇒ 相等;恰有一者為空 ⇒ 不相等;否則比較值並遞迴。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "EQUAL:恰有一者為空",
        "text": "<p>在 EQUAL 中,當兩棵樹恰有<strong>一棵</strong>為空時應回傳什麼?</p>",
        "answers": [
          {
            "text": "不相等(false)",
            "fraction": 100,
            "feedback": "正確 —— 一空一非空無法相符。"
          },
          {
            "text": "相等(true)",
            "fraction": 0,
            "feedback": "錯 —— 此處結構不同即表示不相等。"
          },
          {
            "text": "比較它們的根值",
            "fraction": 0,
            "feedback": "錯 —— 空的那一側沒有值可比較;答案是不相等。"
          },
          {
            "text": "只對非空的那棵樹遞迴",
            "fraction": 0,
            "feedback": "錯 —— 結構不符會立刻判定為不相等。"
          }
        ],
        "generalFeedback": "若一棵樹比另一棵先結束,兩者結構不同,因此 EQUAL 立即回傳 false。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "兩者皆為 O(n)",
        "text": "<p>遞迴的 COPY 與 EQUAL 演算法在 n 個節點的樹上都以 O(n) 時間執行。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 兩者都對每個節點拜訪常數次。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "確實如此 —— 兩者都是線性時間的遞迴走訪。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "EQUAL 忽略值",
        "text": "<p>EQUAL 演算法只檢查兩棵樹是否形狀相同,並忽略節點值。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— EQUAL 要求結構相同「且」節點值相符。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— EQUAL 同時比較結構與值。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "這些演算法的走訪順序",
        "text": "<p>COPY 與 EQUAL 都會在節點處合併結果之前先完成其子節點 —— 這對應到哪一種遞迴走訪順序?請以走訪名稱作答(英文)。</p>",
        "answers": [
          {
            "text": "post-order",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "postorder",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "post order",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "post-order*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "關於 COPY 與 EQUAL 的事實",
        "text": "<p>關於 COPY 與 EQUAL 演算法,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "COPY 會為原樹中的每個節點配置一個新節點",
            "fraction": 50,
            "feedback": "正確 —— 真正的複製會建立新節點。"
          },
          {
            "text": "只有當結構與值都相符時 EQUAL 才回傳 true",
            "fraction": 50,
            "feedback": "正確 —— 兩者都必須一致。"
          },
          {
            "text": "對兩棵空樹進行 EQUAL 會回傳不相等",
            "fraction": -50,
            "feedback": "錯 —— 兩棵空樹相等。"
          },
          {
            "text": "COPY 以 O(log n) 時間執行",
            "fraction": -50,
            "feedback": "錯 —— COPY 為 O(n);每個節點都被複製。"
          }
        ],
        "generalFeedback": "兩者都是 O(n) 的遞迴演算法;COPY 複製每個節點,EQUAL 要求結構與值皆相符,且兩者皆空 ⇒ 相等。",
        "single": false
      }
    ]
  },
  "tree-dsu": {
    "en": [
      {
        "type": "multichoice",
        "name": "Union-Find core operations",
        "text": "<p>Which pair of operations does a <strong>disjoint-set (union-find)</strong> structure primarily support?</p>",
        "answers": [
          {
            "text": "FIND (representative of an element's set) and UNION (merge two sets)",
            "fraction": 100,
            "feedback": "Correct — FIND returns a set's representative and UNION merges two sets."
          },
          {
            "text": "INSERT and DELETE of a key in sorted order",
            "fraction": 0,
            "feedback": "That describes a search tree, not a disjoint-set structure."
          },
          {
            "text": "PUSH and POP from the top",
            "fraction": 0,
            "feedback": "Those are stack operations."
          },
          {
            "text": "ENQUEUE and DEQUEUE by priority",
            "fraction": 0,
            "feedback": "That describes a priority queue."
          }
        ],
        "generalFeedback": "Union-find maintains a partition of elements into disjoint sets, exposing FIND (which set an element belongs to) and UNION (merge two sets).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Union-Find amortized complexity",
        "text": "<p>With <strong>union by rank/size and path compression</strong>, what is the amortized time per operation?</p>",
        "answers": [
          {
            "text": "O(&alpha;(n)) — inverse Ackermann, effectively near-constant",
            "fraction": 100,
            "feedback": "Correct — &alpha;(n) &le; 4 for any practical n, so operations are near-constant amortized."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "That is the bound with only one optimization; combining both gives near-constant."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "Far too slow — the whole point is near-constant amortized cost."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is a sorting bound, unrelated to a single union-find operation."
          }
        ],
        "generalFeedback": "Union by rank/size keeps trees shallow and path compression flattens them, giving O(&alpha;(n)) amortized, where &alpha; is the inverse Ackermann function (&le; 4 in practice).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Path compression mechanism",
        "text": "<p>What does <strong>path compression</strong> do during a FIND operation?</p>",
        "answers": [
          {
            "text": "It re-points visited nodes directly to the root, flattening the tree",
            "fraction": 100,
            "feedback": "Correct — later FINDs on those nodes become almost immediate."
          },
          {
            "text": "It sorts the elements of the set in ascending order",
            "fraction": 0,
            "feedback": "Disjoint sets are unordered; no sorting happens."
          },
          {
            "text": "It deletes the smaller set to save memory",
            "fraction": 0,
            "feedback": "No elements are deleted; sets are merged, not removed."
          },
          {
            "text": "It rebalances the tree like an AVL rotation",
            "fraction": 0,
            "feedback": "Union-find uses no rotations; it just redirects parent pointers to the root."
          }
        ],
        "generalFeedback": "Path compression makes every node visited on the way to the root point straight at the root, so subsequent FINDs are nearly O(1).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Union-Find use case",
        "text": "<p>Which algorithm most naturally uses a disjoint-set structure?</p>",
        "answers": [
          {
            "text": "Kruskal's minimum spanning tree (detecting whether an edge joins two components)",
            "fraction": 100,
            "feedback": "Correct — union-find tracks components and rejects edges that would form a cycle."
          },
          {
            "text": "Dijkstra's shortest path with a priority queue",
            "fraction": 0,
            "feedback": "Dijkstra relies on a priority queue, not union-find."
          },
          {
            "text": "Binary search on a sorted array",
            "fraction": 0,
            "feedback": "That needs an ordered array, unrelated to disjoint sets."
          },
          {
            "text": "In-order traversal of a BST",
            "fraction": 0,
            "feedback": "Traversal is a tree operation, not a set-partition problem."
          }
        ],
        "generalFeedback": "Classic uses include connected components, Kruskal's MST, and cycle detection in an undirected graph — all built on FIND/UNION.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Union-Find properties (multi-select)",
        "text": "<p>Which statements about disjoint-set structures are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Union by rank/size attaches the shorter/smaller tree under the taller/larger one",
            "fraction": 50,
            "feedback": "Yes — this keeps the trees shallow."
          },
          {
            "text": "It maintains a partition of elements into disjoint sets",
            "fraction": 50,
            "feedback": "Yes — every element belongs to exactly one set."
          },
          {
            "text": "It supports efficient range-sum queries over an array",
            "fraction": -50,
            "feedback": "No — that is a Fenwick/segment tree task, not union-find."
          },
          {
            "text": "It is a self-balancing binary search tree",
            "fraction": -50,
            "feedback": "No — it is a forest of up-trees, not a search tree."
          }
        ],
        "generalFeedback": "Union-find is a partition maintained as up-trees with union by rank/size; it does not do ordered search or range queries.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Union-Find is a BST",
        "text": "<p>A disjoint-set (union-find) structure is a kind of self-balancing binary search tree.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — it is a forest of \"up-trees\" that only need parent pointers toward a root; there is no key ordering."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — it maintains a set partition, not an ordered search tree."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Combining both optimizations",
        "text": "<p>Combining path compression with union by rank/size gives near-constant amortized time per operation.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — together they yield O(&alpha;(n)) amortized, effectively constant."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "They do combine to give the O(&alpha;(n)) amortized bound."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Inverse Ackermann term",
        "text": "<p>The near-constant amortized bound of union-find is expressed with the inverse ______ function.</p>",
        "answers": [
          {
            "text": "Ackermann",
            "fraction": 100,
            "feedback": "Correct — the bound is O(&alpha;(n)), the inverse Ackermann function."
          },
          {
            "text": "Ackermann*",
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
        "name": "並查集核心操作",
        "text": "<p><strong>並查集(union-find)</strong>結構主要支援哪一對操作?</p>",
        "answers": [
          {
            "text": "FIND(找出元素所屬集合的代表)與 UNION(合併兩個集合)",
            "fraction": 100,
            "feedback": "正確 —— FIND 回傳集合代表,UNION 合併兩個集合。"
          },
          {
            "text": "依排序插入 INSERT 與刪除 DELETE 一個鍵",
            "fraction": 0,
            "feedback": "那是搜尋樹,不是並查集。"
          },
          {
            "text": "從頂端 PUSH 與 POP",
            "fraction": 0,
            "feedback": "那是堆疊操作。"
          },
          {
            "text": "依優先權 ENQUEUE 與 DEQUEUE",
            "fraction": 0,
            "feedback": "那是優先佇列。"
          }
        ],
        "generalFeedback": "並查集維護一組互斥集合的劃分,提供 FIND(元素屬於哪個集合)與 UNION(合併兩集合)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "並查集攤還複雜度",
        "text": "<p>採用<strong>按秩/大小合併與路徑壓縮</strong>後,每次操作的攤還時間為何?</p>",
        "answers": [
          {
            "text": "O(&alpha;(n)) —— 反阿克曼函數,實際上近乎常數",
            "fraction": 100,
            "feedback": "正確 —— 對任何實務規模 &alpha;(n) &le; 4,故操作攤還近乎常數。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "那是只用單一優化時的界;兩者並用可達近乎常數。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "太慢了 —— 重點正是近乎常數的攤還成本。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是排序的界,與單次並查集操作無關。"
          }
        ],
        "generalFeedback": "按秩/大小合併讓樹保持淺,路徑壓縮把樹壓平,得到 O(&alpha;(n)) 攤還,其中 &alpha; 為反阿克曼函數(實務上 &le; 4)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "路徑壓縮機制",
        "text": "<p>在 FIND 操作中,<strong>路徑壓縮</strong>做了什麼?</p>",
        "answers": [
          {
            "text": "把沿途經過的節點直接指向根,壓平整棵樹",
            "fraction": 100,
            "feedback": "正確 —— 之後對這些節點的 FIND 幾乎立即完成。"
          },
          {
            "text": "把集合中的元素依遞增排序",
            "fraction": 0,
            "feedback": "並查集是無序的,不會排序。"
          },
          {
            "text": "刪除較小的集合以節省記憶體",
            "fraction": 0,
            "feedback": "不會刪除任何元素;集合是被合併而非移除。"
          },
          {
            "text": "像 AVL 旋轉那樣重新平衡樹",
            "fraction": 0,
            "feedback": "並查集不使用旋轉,只是把父指標重導向根。"
          }
        ],
        "generalFeedback": "路徑壓縮讓通往根路徑上的每個節點直接指向根,後續 FIND 幾近 O(1)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "並查集應用場景",
        "text": "<p>哪個演算法最自然地使用並查集結構?</p>",
        "answers": [
          {
            "text": "Kruskal 最小生成樹(判斷一條邊是否連接兩個不同連通分量)",
            "fraction": 100,
            "feedback": "正確 —— 並查集追蹤連通分量並拒絕會形成環的邊。"
          },
          {
            "text": "使用優先佇列的 Dijkstra 最短路徑",
            "fraction": 0,
            "feedback": "Dijkstra 依賴優先佇列,而非並查集。"
          },
          {
            "text": "在已排序陣列上做二分搜尋",
            "fraction": 0,
            "feedback": "那需要有序陣列,與並查集無關。"
          },
          {
            "text": "BST 的中序走訪",
            "fraction": 0,
            "feedback": "走訪是樹操作,不是集合劃分問題。"
          }
        ],
        "generalFeedback": "經典應用包括連通分量、Kruskal 最小生成樹,以及無向圖的環偵測 —— 全都建立在 FIND/UNION 之上。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "並查集性質(複選)",
        "text": "<p>關於並查集結構,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "按秩/大小合併會把較矮/較小的樹掛到較高/較大的樹之下",
            "fraction": 50,
            "feedback": "正確 —— 這可讓樹保持淺。"
          },
          {
            "text": "它維護一組把元素劃分成互斥集合的劃分",
            "fraction": 50,
            "feedback": "正確 —— 每個元素恰屬於一個集合。"
          },
          {
            "text": "它支援對陣列的高效區間求和查詢",
            "fraction": -50,
            "feedback": "錯 —— 那是 Fenwick/線段樹的工作,不是並查集。"
          },
          {
            "text": "它是一種自平衡二元搜尋樹",
            "fraction": -50,
            "feedback": "錯 —— 它是一片向上樹的森林,不是搜尋樹。"
          }
        ],
        "generalFeedback": "並查集是以向上樹維護的集合劃分並搭配按秩/大小合併;它不做有序搜尋或區間查詢。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "並查集是不是 BST",
        "text": "<p>並查集(union-find)結構是一種自平衡二元搜尋樹。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 它是一片「向上樹」的森林,只需指向根的父指標,沒有鍵值排序。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 它維護集合劃分,而非有序搜尋樹。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "兩種優化並用",
        "text": "<p>將路徑壓縮與按秩/大小合併並用,可讓每次操作達到近乎常數的攤還時間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 兩者並用得到 O(&alpha;(n)) 攤還,實際上近乎常數。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "兩者確實並用即可達到 O(&alpha;(n)) 攤還界。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "反阿克曼名詞",
        "text": "<p>並查集近乎常數的攤還界是以反 ______ 函數(inverse ______ function)表示。</p>",
        "answers": [
          {
            "text": "Ackermann",
            "fraction": 100,
            "feedback": "正確 —— 該界為 O(&alpha;(n)),即反阿克曼函數。"
          },
          {
            "text": "Ackermann*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "tree-expression": {
    "en": [
      {
        "type": "multichoice",
        "name": "Expression tree nodes",
        "text": "<p>In a binary expression tree, what do the <strong>internal nodes</strong> and <strong>leaves</strong> represent?</p>",
        "answers": [
          {
            "text": "Internal nodes are operators; leaves are operands",
            "fraction": 100,
            "feedback": "Correct — operators combine the results of their operand subtrees."
          },
          {
            "text": "Internal nodes are operands; leaves are operators",
            "fraction": 0,
            "feedback": "No — it is the reverse: operators are internal, operands are leaves."
          },
          {
            "text": "Every node holds both an operator and an operand",
            "fraction": 0,
            "feedback": "No — each node is one or the other."
          },
          {
            "text": "All nodes are operands",
            "fraction": 0,
            "feedback": "No — operators must appear at internal nodes."
          }
        ],
        "generalFeedback": "An expression tree places operators at internal nodes and operands (constants or variables) at the leaves.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Postorder gives postfix",
        "text": "<p>Which traversal of an expression tree yields the <strong>postfix (RPN)</strong> form of the expression?</p>",
        "answers": [
          {
            "text": "Post-order",
            "fraction": 100,
            "feedback": "Correct — visiting both subtrees before the operator produces postfix."
          },
          {
            "text": "Pre-order",
            "fraction": 0,
            "feedback": "No — pre-order (operator first) gives prefix notation."
          },
          {
            "text": "In-order",
            "fraction": 0,
            "feedback": "No — in-order gives infix (needs parentheses to be unambiguous)."
          },
          {
            "text": "Level-order",
            "fraction": 0,
            "feedback": "No — a breadth-first walk does not correspond to a standard notation."
          }
        ],
        "generalFeedback": "Post-order visits left, right, then root, so operators follow their operands — exactly postfix / RPN.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Inorder gives infix",
        "text": "<p>An <strong>in-order</strong> traversal of an expression tree (with parentheses) produces which notation?</p>",
        "answers": [
          {
            "text": "Infix",
            "fraction": 100,
            "feedback": "Correct — the operator appears between its operands, the usual infix form."
          },
          {
            "text": "Postfix",
            "fraction": 0,
            "feedback": "No — postfix comes from post-order."
          },
          {
            "text": "Prefix",
            "fraction": 0,
            "feedback": "No — prefix comes from pre-order."
          },
          {
            "text": "Binary machine code",
            "fraction": 0,
            "feedback": "No — traversal order does not produce machine code."
          }
        ],
        "generalFeedback": "In-order visits left subtree, root, right subtree, so the operator sits between its operands — infix (parentheses restore precedence).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Evaluation traversal",
        "text": "<p>To evaluate an expression tree, which recursive strategy is natural?</p>",
        "answers": [
          {
            "text": "Post-order: evaluate both subtrees, then apply the operator",
            "fraction": 100,
            "feedback": "Correct — operand values must be ready before the operator is applied."
          },
          {
            "text": "Pre-order: apply the operator before evaluating subtrees",
            "fraction": 0,
            "feedback": "No — the operator needs its operands' values first."
          },
          {
            "text": "Level-order from the root down",
            "fraction": 0,
            "feedback": "No — a breadth-first pass does not respect operand dependencies."
          },
          {
            "text": "Evaluate only the left subtree",
            "fraction": 0,
            "feedback": "No — both operands are required."
          }
        ],
        "generalFeedback": "Evaluation recurses post-order: compute the left value, compute the right value, then combine them with the node's operator.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Preorder is prefix",
        "text": "<p>A pre-order traversal of an expression tree produces prefix (Polish) notation.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — visiting the operator before its operands gives prefix."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Pre-order visits root first, which is exactly prefix notation."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Operators at leaves false",
        "text": "<p>In a binary expression tree, operators are stored at the leaf nodes.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — operators are internal nodes; leaves hold operands."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — operators are internal; operands are at the leaves."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "RPN traversal term",
        "text": "<p>The postfix (RPN) form of an expression is produced by a ______ traversal (name the traversal, e.g. one word).</p>",
        "answers": [
          {
            "text": "postorder",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "post-order",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "postfix",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "post*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Expression tree traversals multi",
        "text": "<p>Which statements about expression trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Post-order traversal yields postfix (RPN)",
            "fraction": 50,
            "feedback": "Yes — operands precede their operator."
          },
          {
            "text": "Operands are stored at the leaf nodes",
            "fraction": 50,
            "feedback": "Yes — leaves are constants or variables."
          },
          {
            "text": "In-order traversal yields prefix notation",
            "fraction": -50,
            "feedback": "No — in-order yields infix; pre-order yields prefix."
          },
          {
            "text": "Operators are stored at the leaves",
            "fraction": -50,
            "feedback": "No — operators are internal nodes."
          }
        ],
        "generalFeedback": "Expression tree: operators internal, operands at leaves; post-order = postfix, in-order = infix, pre-order = prefix.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "運算式樹節點",
        "text": "<p>在二元運算式樹中,<strong>內部節點</strong>與<strong>葉節點</strong>分別代表什麼?</p>",
        "answers": [
          {
            "text": "內部節點是運算子;葉節點是運算元",
            "fraction": 100,
            "feedback": "正確 —— 運算子結合其運算元子樹的結果。"
          },
          {
            "text": "內部節點是運算元;葉節點是運算子",
            "fraction": 0,
            "feedback": "錯 —— 剛好相反:運算子在內部,運算元在葉節點。"
          },
          {
            "text": "每個節點同時含有一個運算子與一個運算元",
            "fraction": 0,
            "feedback": "錯 —— 每個節點只是其中一種。"
          },
          {
            "text": "所有節點都是運算元",
            "fraction": 0,
            "feedback": "錯 —— 運算子必定出現在內部節點。"
          }
        ],
        "generalFeedback": "運算式樹將運算子放在內部節點,運算元(常數或變數)放在葉節點。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "後序產生後綴",
        "text": "<p>對運算式樹進行哪一種走訪會產生<strong>後綴(RPN)</strong>形式?</p>",
        "answers": [
          {
            "text": "後序(Post-order)",
            "fraction": 100,
            "feedback": "正確 —— 先走訪兩個子樹再到運算子,即產生後綴。"
          },
          {
            "text": "前序(Pre-order)",
            "fraction": 0,
            "feedback": "錯 —— 前序(運算子在先)產生前綴表示法。"
          },
          {
            "text": "中序(In-order)",
            "fraction": 0,
            "feedback": "錯 —— 中序產生中綴(需括號才不歧義)。"
          },
          {
            "text": "層序(Level-order)",
            "fraction": 0,
            "feedback": "錯 —— 廣度優先走訪並不對應標準表示法。"
          }
        ],
        "generalFeedback": "後序走訪先左、再右、後根,運算子跟在運算元之後 —— 恰為後綴 / RPN。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "中序產生中綴",
        "text": "<p>對運算式樹做<strong>中序</strong>走訪(加上括號)會產生哪種表示法?</p>",
        "answers": [
          {
            "text": "中綴(Infix)",
            "fraction": 100,
            "feedback": "正確 —— 運算子出現在其運算元之間,即一般的中綴形式。"
          },
          {
            "text": "後綴(Postfix)",
            "fraction": 0,
            "feedback": "錯 —— 後綴來自後序。"
          },
          {
            "text": "前綴(Prefix)",
            "fraction": 0,
            "feedback": "錯 —— 前綴來自前序。"
          },
          {
            "text": "二進位機器碼",
            "fraction": 0,
            "feedback": "錯 —— 走訪順序不會產生機器碼。"
          }
        ],
        "generalFeedback": "中序走訪先左子樹、再根、後右子樹,運算子落在運算元之間 —— 即中綴(括號還原優先順序)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "求值走訪",
        "text": "<p>要對運算式樹求值,哪一種遞迴策略最自然?</p>",
        "answers": [
          {
            "text": "後序:先求兩個子樹的值,再套用運算子",
            "fraction": 100,
            "feedback": "正確 —— 套用運算子前必須先備妥運算元的值。"
          },
          {
            "text": "前序:先套用運算子再求子樹的值",
            "fraction": 0,
            "feedback": "錯 —— 運算子需要先有其運算元的值。"
          },
          {
            "text": "由根往下的層序",
            "fraction": 0,
            "feedback": "錯 —— 廣度優先走訪不遵守運算元的相依關係。"
          },
          {
            "text": "只求左子樹的值",
            "fraction": 0,
            "feedback": "錯 —— 兩個運算元都需要。"
          }
        ],
        "generalFeedback": "求值以後序遞迴:先算左值、再算右值,然後以該節點的運算子將兩者結合。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "前序是前綴",
        "text": "<p>對運算式樹做前序走訪會產生前綴(波蘭)表示法。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 先走訪運算子再到運算元,即前綴。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "前序先走訪根,正是前綴表示法。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "運算子在葉節點為誤",
        "text": "<p>在二元運算式樹中,運算子儲存於葉節點。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 運算子是內部節點;葉節點存放運算元。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 運算子在內部;運算元在葉節點。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "RPN 走訪名詞",
        "text": "<p>運算式的後綴(RPN)形式由______走訪產生(以英文寫出該走訪名稱)。</p>",
        "answers": [
          {
            "text": "postorder",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "post-order",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "postfix",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "post*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "運算式樹走訪複選",
        "text": "<p>關於運算式樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "後序走訪產生後綴(RPN)",
            "fraction": 50,
            "feedback": "正確 —— 運算元在其運算子之前。"
          },
          {
            "text": "運算元儲存於葉節點",
            "fraction": 50,
            "feedback": "正確 —— 葉節點是常數或變數。"
          },
          {
            "text": "中序走訪產生前綴表示法",
            "fraction": -50,
            "feedback": "錯 —— 中序產生中綴;前序才產生前綴。"
          },
          {
            "text": "運算子儲存於葉節點",
            "fraction": -50,
            "feedback": "錯 —— 運算子是內部節點。"
          }
        ],
        "generalFeedback": "運算式樹:運算子在內部、運算元在葉節點;後序=後綴、中序=中綴、前序=前綴。",
        "single": false
      }
    ]
  },
  "tree-fenwick": {
    "en": [
      {
        "type": "multichoice",
        "name": "Fenwick tree operations",
        "text": "<p>Which pair of operations does a <strong>Fenwick tree (Binary Indexed Tree)</strong> support in O(log n)?</p>",
        "answers": [
          {
            "text": "Prefix-sum query and point update",
            "fraction": 100,
            "feedback": "Correct — a BIT computes prefix sums and applies point updates, each in O(log n)."
          },
          {
            "text": "Find minimum and delete minimum",
            "fraction": 0,
            "feedback": "Those are heap operations, not a Fenwick tree's role."
          },
          {
            "text": "Insert key and search key in sorted order",
            "fraction": 0,
            "feedback": "That describes a search tree."
          },
          {
            "text": "Union and find of set representatives",
            "fraction": 0,
            "feedback": "Those are disjoint-set operations."
          }
        ],
        "generalFeedback": "A Fenwick tree supports prefix-sum queries and point updates in O(log n) using the binary representation of indices.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick lowbit mechanism",
        "text": "<p>How does a Fenwick tree move between the indices it must touch during a query or update?</p>",
        "answers": [
          {
            "text": "By jumping via the lowest set bit, computed as(the \"lowbit\")",
            "fraction": 100,
            "feedback": "Correct — adding or subtractingwalks the responsibility ranges."
          },
          {
            "text": "By following left and right child pointers of a binary tree",
            "fraction": 0,
            "feedback": "A BIT stores no explicit child pointers; it uses index arithmetic."
          },
          {
            "text": "By binary searching the array each step",
            "fraction": 0,
            "feedback": "No search is needed; the lowbit gives the next index directly."
          },
          {
            "text": "By hashing the index into a bucket",
            "fraction": 0,
            "feedback": "No hashing is involved; it is pure bit manipulation."
          }
        ],
        "generalFeedback": "The lowbitisolates the least-significant set bit; adding it (update) or subtracting it (query) steps through O(log n) indices.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick tree space",
        "text": "<p>How much space does a Fenwick tree use for n elements?</p>",
        "answers": [
          {
            "text": "O(n) — a single array of size about n, with a small constant",
            "fraction": 100,
            "feedback": "Correct — a BIT is just one array, lighter than a segment tree."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "A Fenwick tree is only O(n); each index owns exactly one range."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "You still need one slot per element, so space is O(n)."
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "Far too much; a BIT is linear in space."
          }
        ],
        "generalFeedback": "A Fenwick tree needs just one array of size ~n (O(n) space) with a small constant — simpler and lighter than a segment tree.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick vs segment tree limitation",
        "text": "<p>Compared with a segment tree, what is a key <strong>limitation</strong> of a plain Fenwick tree?</p>",
        "answers": [
          {
            "text": "It is less general — best for invertible/prefix aggregates like sums; range-minimum is not directly supported",
            "fraction": 100,
            "feedback": "Correct — subtraction of prefixes needs invertibility, so range-min does not map onto a plain BIT."
          },
          {
            "text": "It uses more memory than a segment tree",
            "fraction": 0,
            "feedback": "The opposite — a BIT is lighter, using a single O(n) array."
          },
          {
            "text": "Its queries are O(n) instead of O(log n)",
            "fraction": 0,
            "feedback": "No — BIT queries are O(log n)."
          },
          {
            "text": "It cannot perform point updates",
            "fraction": 0,
            "feedback": "Point updates are one of its two core operations."
          }
        ],
        "generalFeedback": "A Fenwick tree is simpler and lighter than a segment tree but less general: it shines for invertible/prefix aggregates (sums), whereas range-min/max are not directly supported.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick tree properties (multi-select)",
        "text": "<p>Which statements about Fenwick trees (BITs) are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Prefix-sum queries and point updates both run in O(log n)",
            "fraction": 50,
            "feedback": "Yes — each touches O(log n) indices."
          },
          {
            "text": "It uses only O(n) space with a small constant factor",
            "fraction": 50,
            "feedback": "Yes — a single array, lighter than a segment tree."
          },
          {
            "text": "It naturally supports range-minimum queries like a segment tree",
            "fraction": -50,
            "feedback": "No — range-min is not invertible, so a plain BIT cannot do it directly."
          },
          {
            "text": "It keeps its elements sorted for binary search",
            "fraction": -50,
            "feedback": "No — a BIT indexes by position and does not sort values."
          }
        ],
        "generalFeedback": "A BIT gives O(log n) prefix sums and point updates in O(n) space via lowbit index arithmetic; it is less general than a segment tree and does not do range-min.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Fenwick lighter than segment tree",
        "text": "<p>A Fenwick tree is generally simpler and uses less memory than a segment tree.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — a BIT is a single O(n) array with a small constant and short code."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "A BIT is indeed lighter and simpler than a segment tree."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Fenwick range minimum",
        "text": "<p>A plain Fenwick tree can directly answer range-minimum queries just as easily as prefix sums.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — range-min is not invertible, so a plain BIT cannot handle it directly; sums work because they are invertible."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — a plain BIT targets invertible/prefix aggregates like sums, not range-min."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Lowbit term",
        "text": "<p>The value <code>i &amp; -i</code> that isolates the least-significant set bit of an index is commonly called the ______.</p>",
        "answers": [
          {
            "text": "lowbit",
            "fraction": 100,
            "feedback": "Correct — the lowbit, i & -i."
          },
          {
            "text": "lowbit*",
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
        "name": "Fenwick 樹的操作",
        "text": "<p><strong>Fenwick 樹(樹狀陣列,BIT)</strong>以 O(log n) 支援哪一對操作?</p>",
        "answers": [
          {
            "text": "前綴和查詢與單點更新",
            "fraction": 100,
            "feedback": "正確 —— BIT 計算前綴和並做單點更新,各為 O(log n)。"
          },
          {
            "text": "取最小值與刪除最小值",
            "fraction": 0,
            "feedback": "那是堆積(heap)操作,不是 Fenwick 樹的職責。"
          },
          {
            "text": "依排序插入鍵與搜尋鍵",
            "fraction": 0,
            "feedback": "那是搜尋樹。"
          },
          {
            "text": "集合代表的 union 與 find",
            "fraction": 0,
            "feedback": "那是並查集操作。"
          }
        ],
        "generalFeedback": "Fenwick 樹利用索引的二進位表示,以 O(log n) 支援前綴和查詢與單點更新。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick 的 lowbit 機制",
        "text": "<p>在查詢或更新時,Fenwick 樹如何在必須碰觸的索引之間移動?</p>",
        "answers": [
          {
            "text": "藉由最低位設定位元跳躍,以計算(即「lowbit」)",
            "fraction": 100,
            "feedback": "正確 —— 加上或減去即可走過各負責區間。"
          },
          {
            "text": "沿著二元樹的左右子指標前進",
            "fraction": 0,
            "feedback": "BIT 不儲存明確的子指標;它使用索引運算。"
          },
          {
            "text": "每一步都對陣列做二分搜尋",
            "fraction": 0,
            "feedback": "不需搜尋;lowbit 直接給出下一個索引。"
          },
          {
            "text": "把索引雜湊到某個桶",
            "fraction": 0,
            "feedback": "不涉及雜湊;它純粹是位元運算。"
          }
        ],
        "generalFeedback": "lowbit取出最低有效設定位元;加上它(更新)或減去它(查詢)即可走過 O(log n) 個索引。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick 樹的空間",
        "text": "<p>對 n 個元素,Fenwick 樹使用多少空間?</p>",
        "answers": [
          {
            "text": "O(n) —— 單一大小約為 n 的陣列,常數很小",
            "fraction": 100,
            "feedback": "正確 —— BIT 只是一個陣列,比線段樹更輕量。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "Fenwick 樹只需 O(n);每個索引恰好負責一段區間。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "每個元素仍需一個位置,故空間為 O(n)。"
          },
          {
            "text": "O(n^2)",
            "fraction": 0,
            "feedback": "太多了;BIT 空間為線性。"
          }
        ],
        "generalFeedback": "Fenwick 樹只需一個大小約 n 的陣列(O(n) 空間)且常數很小 —— 比線段樹更簡單、更輕量。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick 與線段樹的限制",
        "text": "<p>相較於線段樹,一般 Fenwick 樹的主要<strong>限制</strong>是什麼?</p>",
        "answers": [
          {
            "text": "較不一般 —— 最適合可逆/前綴聚合(如求和);不直接支援區間最小值",
            "fraction": 100,
            "feedback": "正確 —— 前綴相減需要可逆性,故區間最小值無法對應到一般 BIT。"
          },
          {
            "text": "它比線段樹使用更多記憶體",
            "fraction": 0,
            "feedback": "恰好相反 —— BIT 更輕量,只用單一 O(n) 陣列。"
          },
          {
            "text": "它的查詢是 O(n) 而非 O(log n)",
            "fraction": 0,
            "feedback": "錯 —— BIT 查詢為 O(log n)。"
          },
          {
            "text": "它無法執行單點更新",
            "fraction": 0,
            "feedback": "單點更新正是它兩大核心操作之一。"
          }
        ],
        "generalFeedback": "Fenwick 樹比線段樹更簡單、更輕量,但較不一般:它擅長可逆/前綴聚合(求和),而區間最小/最大值則不直接支援。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Fenwick 樹性質(複選)",
        "text": "<p>關於 Fenwick 樹(BIT),以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "前綴和查詢與單點更新都是 O(log n)",
            "fraction": 50,
            "feedback": "正確 —— 各碰觸 O(log n) 個索引。"
          },
          {
            "text": "它只用 O(n) 空間且常數因子很小",
            "fraction": 50,
            "feedback": "正確 —— 單一陣列,比線段樹更輕量。"
          },
          {
            "text": "它像線段樹一樣自然支援區間最小值查詢",
            "fraction": -50,
            "feedback": "錯 —— 區間最小值不可逆,故一般 BIT 無法直接做。"
          },
          {
            "text": "它會把元素保持排序以便二分搜尋",
            "fraction": -50,
            "feedback": "錯 —— BIT 以位置索引,不對數值排序。"
          }
        ],
        "generalFeedback": "BIT 透過 lowbit 索引運算,以 O(n) 空間提供 O(log n) 的前綴和與單點更新;它比線段樹較不一般,且不做區間最小值。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Fenwick 比線段樹更輕",
        "text": "<p>Fenwick 樹通常比線段樹更簡單,且使用較少記憶體。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— BIT 是單一 O(n) 陣列,常數小、程式碼也短。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "BIT 確實比線段樹更輕量、更簡單。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Fenwick 區間最小值",
        "text": "<p>一般 Fenwick 樹能像求前綴和一樣容易地直接回答區間最小值查詢。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 區間最小值不可逆,故一般 BIT 無法直接處理;求和可行是因為它可逆。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 一般 BIT 針對可逆/前綴聚合(如求和),而非區間最小值。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "lowbit 名詞",
        "text": "<p>用來取出索引最低有效設定位元的值 <code>i &amp; -i</code>,通常稱為 ______。</p>",
        "answers": [
          {
            "text": "lowbit",
            "fraction": 100,
            "feedback": "正確 —— lowbit,即 i & -i。"
          },
          {
            "text": "lowbit*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "tree-general-binary": {
    "en": [
      {
        "type": "multichoice",
        "name": "Name of the representation",
        "text": "<p>Which representation lets any general (multiway) tree be stored as a binary tree?</p>",
        "answers": [
          {
            "text": "Left-child, right-sibling representation",
            "fraction": 100,
            "feedback": "Correct — first child goes left, next sibling goes right."
          },
          {
            "text": "Array (2i, 2i+1) representation",
            "fraction": 0,
            "feedback": "No — that stores a complete binary tree in an array, not a general tree as binary."
          },
          {
            "text": "Adjacency-matrix representation",
            "fraction": 0,
            "feedback": "No — that is a general graph representation, not this tree mapping."
          },
          {
            "text": "Threaded representation",
            "fraction": 0,
            "feedback": "No — threading reuses NULL pointers for traversal; it does not convert general to binary."
          }
        ],
        "generalFeedback": "The left-child, right-sibling scheme reuses a binary node's two pointers as \"first child\" and \"next sibling\", encoding an arbitrary-degree tree.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "What the left pointer holds",
        "text": "<p>In the left-child, right-sibling encoding, a node's <strong>left</strong> pointer refers to its ______.</p>",
        "answers": [
          {
            "text": "First child",
            "fraction": 100,
            "feedback": "Correct — the left pointer points to the node's first child."
          },
          {
            "text": "Next sibling",
            "fraction": 0,
            "feedback": "No — the next sibling is stored in the right pointer."
          },
          {
            "text": "Parent",
            "fraction": 0,
            "feedback": "No — the encoding stores first child and next sibling, not parent."
          },
          {
            "text": "Last child",
            "fraction": 0,
            "feedback": "No — it points to the first child; later children are reached via sibling links."
          }
        ],
        "generalFeedback": "Left = first child, right = next sibling. Descending left then chaining right visits all children of a node.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "What the right pointer holds",
        "text": "<p>In the left-child, right-sibling encoding, a node's <strong>right</strong> pointer refers to its ______.</p>",
        "answers": [
          {
            "text": "Next sibling",
            "fraction": 100,
            "feedback": "Correct — the right pointer chains to the next sibling."
          },
          {
            "text": "First child",
            "fraction": 0,
            "feedback": "No — the first child is stored in the left pointer."
          },
          {
            "text": "Parent",
            "fraction": 0,
            "feedback": "No — parent links are not part of this encoding."
          },
          {
            "text": "Right child in the original general tree",
            "fraction": 0,
            "feedback": "No — general-tree nodes have no fixed \"right child\"; the pointer holds the next sibling."
          }
        ],
        "generalFeedback": "Siblings form a right-linked chain, so a node of any degree needs only two pointers.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Nature of the mapping",
        "text": "<p>The left-child, right-sibling mapping between forests/general trees and binary trees is best described as a ______.</p>",
        "answers": [
          {
            "text": "Bijection (one-to-one and reversible)",
            "fraction": 100,
            "feedback": "Correct — every forest maps to exactly one binary tree and back."
          },
          {
            "text": "A lossy, one-way compression",
            "fraction": 0,
            "feedback": "No — the mapping loses no information and is fully reversible."
          },
          {
            "text": "Valid only for binary trees",
            "fraction": 0,
            "feedback": "No — it applies to trees of arbitrary degree and to forests."
          },
          {
            "text": "Valid only for balanced trees",
            "fraction": 0,
            "feedback": "No — balance is irrelevant to the encoding."
          }
        ],
        "generalFeedback": "The encoding is a bijection: a forest of general trees corresponds to exactly one binary tree, and the process reverses uniquely.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Any forest can be encoded",
        "text": "<p>Any general tree or forest can be represented as a binary tree using the left-child, right-sibling scheme.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — the encoding works for trees of any degree and for forests."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It can — this is a standard bijection between forests and binary trees."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Right pointer stores first child",
        "text": "<p>In the left-child, right-sibling encoding, a node's right pointer stores its first child.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — the right pointer stores the next sibling; the first child is on the left."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — right = next sibling, left = first child."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Right pointer meaning",
        "text": "<p>In the left-child, right-sibling representation, the right pointer stores a node's next ______.</p>",
        "answers": [
          {
            "text": "sibling",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "siblings",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "sibling*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Facts about the encoding",
        "text": "<p>Which statements about the left-child, right-sibling representation are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "A node's first child becomes its left pointer",
            "fraction": 50,
            "feedback": "Yes — first child goes left."
          },
          {
            "text": "It is a bijection between forests and binary trees",
            "fraction": 50,
            "feedback": "Yes — the mapping is one-to-one and reversible."
          },
          {
            "text": "It only works when every node has at most two children",
            "fraction": -50,
            "feedback": "No — it works for arbitrary degree; that is its purpose."
          },
          {
            "text": "A node's next sibling becomes its left pointer",
            "fraction": -50,
            "feedback": "No — the next sibling becomes the right pointer."
          }
        ],
        "generalFeedback": "First child = left, next sibling = right; the scheme handles any degree and is a reversible bijection with binary trees.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "表示法的名稱",
        "text": "<p>哪一種表示法可以把任意一般(多元)樹儲存成一棵二元樹?</p>",
        "answers": [
          {
            "text": "左子右兄弟(left-child, right-sibling)表示法",
            "fraction": 100,
            "feedback": "正確 —— 第一個子節點放左邊,下一個兄弟放右邊。"
          },
          {
            "text": "陣列(2i、2i+1)表示法",
            "fraction": 0,
            "feedback": "錯 —— 那是把完全二元樹存進陣列,而非把一般樹表示為二元樹。"
          },
          {
            "text": "相鄰矩陣表示法",
            "fraction": 0,
            "feedback": "錯 —— 那是一般圖的表示法,不是這個樹的對應。"
          },
          {
            "text": "引線表示法",
            "fraction": 0,
            "feedback": "錯 —— 引線重複利用 NULL 指標以利走訪,並不會把一般樹轉成二元樹。"
          }
        ],
        "generalFeedback": "左子右兄弟法把二元節點的兩個指標重新解讀為「第一個子節點」與「下一個兄弟」,即可編碼任意分支度的樹。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "左指標存放什麼",
        "text": "<p>在左子右兄弟編碼中,節點的<strong>左</strong>指標指向它的 ______。</p>",
        "answers": [
          {
            "text": "第一個子節點",
            "fraction": 100,
            "feedback": "正確 —— 左指標指向該節點的第一個子節點。"
          },
          {
            "text": "下一個兄弟",
            "fraction": 0,
            "feedback": "錯 —— 下一個兄弟存放在右指標。"
          },
          {
            "text": "父節點",
            "fraction": 0,
            "feedback": "錯 —— 此編碼存放第一個子節點與下一個兄弟,而非父節點。"
          },
          {
            "text": "最後一個子節點",
            "fraction": 0,
            "feedback": "錯 —— 它指向第一個子節點;後面的子節點透過兄弟連結抵達。"
          }
        ],
        "generalFeedback": "左 = 第一個子節點,右 = 下一個兄弟。先往左下降再沿右鏈走,即可拜訪某節點的所有子節點。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "右指標存放什麼",
        "text": "<p>在左子右兄弟編碼中,節點的<strong>右</strong>指標指向它的 ______。</p>",
        "answers": [
          {
            "text": "下一個兄弟",
            "fraction": 100,
            "feedback": "正確 —— 右指標串連到下一個兄弟。"
          },
          {
            "text": "第一個子節點",
            "fraction": 0,
            "feedback": "錯 —— 第一個子節點存放在左指標。"
          },
          {
            "text": "父節點",
            "fraction": 0,
            "feedback": "錯 —— 此編碼不包含父連結。"
          },
          {
            "text": "原一般樹中的右子節點",
            "fraction": 0,
            "feedback": "錯 —— 一般樹節點沒有固定的「右子節點」;該指標存放下一個兄弟。"
          }
        ],
        "generalFeedback": "兄弟形成一條向右串接的鏈,因此任意分支度的節點都只需要兩個指標。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "對應的本質",
        "text": "<p>左子右兄弟法在森林/一般樹與二元樹之間的對應,最適合描述為 ______。</p>",
        "answers": [
          {
            "text": "雙射(一對一且可逆)",
            "fraction": 100,
            "feedback": "正確 —— 每個森林恰好對應到一棵二元樹,並可還原。"
          },
          {
            "text": "有損、單向的壓縮",
            "fraction": 0,
            "feedback": "錯 —— 此對應不損失資訊,且完全可逆。"
          },
          {
            "text": "只對二元樹有效",
            "fraction": 0,
            "feedback": "錯 —— 它適用於任意分支度的樹以及森林。"
          },
          {
            "text": "只對平衡樹有效",
            "fraction": 0,
            "feedback": "錯 —— 平衡與否與此編碼無關。"
          }
        ],
        "generalFeedback": "此編碼是一個雙射:一片一般樹的森林恰好對應到一棵二元樹,且過程可唯一還原。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "任意森林皆可編碼",
        "text": "<p>任何一般樹或森林都可以用左子右兄弟法表示為一棵二元樹。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 此編碼適用於任意分支度的樹以及森林。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "確實可以 —— 這是森林與二元樹之間的標準雙射。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "右指標存放第一個子節點",
        "text": "<p>在左子右兄弟編碼中,節點的右指標存放它的第一個子節點。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 右指標存放下一個兄弟;第一個子節點在左邊。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 右 = 下一個兄弟,左 = 第一個子節點。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "右指標的意義",
        "text": "<p>在左子右兄弟表示法中,右指標存放節點的下一個 ______。請以英文作答。</p>",
        "answers": [
          {
            "text": "sibling",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "siblings",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "sibling*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "關於此編碼的事實",
        "text": "<p>關於左子右兄弟表示法,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "節點的第一個子節點成為它的左指標",
            "fraction": 50,
            "feedback": "正確 —— 第一個子節點放左邊。"
          },
          {
            "text": "它是森林與二元樹之間的雙射",
            "fraction": 50,
            "feedback": "正確 —— 此對應一對一且可逆。"
          },
          {
            "text": "只有當每個節點至多兩個子節點時才有效",
            "fraction": -50,
            "feedback": "錯 —— 它適用於任意分支度,這正是其目的。"
          },
          {
            "text": "節點的下一個兄弟成為它的左指標",
            "fraction": -50,
            "feedback": "錯 —— 下一個兄弟成為右指標。"
          }
        ],
        "generalFeedback": "第一個子節點 = 左,下一個兄弟 = 右;此法可處理任意分支度,且與二元樹之間是可逆的雙射。",
        "single": false
      }
    ]
  },
  "tree-mway": {
    "en": [
      {
        "type": "multichoice",
        "name": "m-way node structure",
        "text": "<p>In an <strong>m-way search tree</strong>, how many keys and children may a node have at most?</p>",
        "answers": [
          {
            "text": "Up to m&minus;1 keys and up to m children",
            "fraction": 100,
            "feedback": "Correct — m children are separated by m&minus;1 ordered keys."
          },
          {
            "text": "Exactly 1 key and 2 children",
            "fraction": 0,
            "feedback": "That is the binary special case (m=2), not the general m-way node."
          },
          {
            "text": "Up to m keys and up to m&minus;1 children",
            "fraction": 0,
            "feedback": "Reversed — children exceed keys by one."
          },
          {
            "text": "Unlimited keys and children",
            "fraction": 0,
            "feedback": "The order m caps both."
          }
        ],
        "generalFeedback": "An m-way search tree generalizes the BST: each node holds up to m&minus;1 keys and points to up to m subtrees.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "m-way generalizes BST",
        "text": "<p>An m-way search tree is best described as a generalization of which structure?</p>",
        "answers": [
          {
            "text": "The binary search tree, allowing more than two children per node",
            "fraction": 100,
            "feedback": "Correct — a BST is the m=2 case of an m-way search tree."
          },
          {
            "text": "The hash table",
            "fraction": 0,
            "feedback": "No — m-way trees are ordered comparison structures, not hashed."
          },
          {
            "text": "The heap",
            "fraction": 0,
            "feedback": "A heap orders by parent-child priority, not by ordered search keys."
          },
          {
            "text": "The linked list",
            "fraction": 0,
            "feedback": "A list has no branching search order."
          }
        ],
        "generalFeedback": "Raising the branching factor from 2 to m turns a binary search tree into an m-way search tree.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "m-way key ordering",
        "text": "<p>How are keys and subtrees ordered within an m-way search tree node?</p>",
        "answers": [
          {
            "text": "Keys are sorted, and the subtree between two consecutive keys holds values in that range",
            "fraction": 100,
            "feedback": "Correct — the ordering generalizes the BST invariant to multiple keys."
          },
          {
            "text": "Keys are unordered; search must scan every subtree",
            "fraction": 0,
            "feedback": "No — ordered keys are what make it a search tree."
          },
          {
            "text": "All keys in a subtree exceed the root's largest key",
            "fraction": 0,
            "feedback": "Only the rightmost subtree does; each gap has its own range."
          },
          {
            "text": "Subtrees are ordered by size, not by key value",
            "fraction": 0,
            "feedback": "Ordering is by key value, enabling directed search."
          }
        ],
        "generalFeedback": "Ordered keys partition the key space; child i covers the interval between key i&minus;1 and key i.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "m-way vs B-Tree",
        "text": "<p>What is the relationship between an m-way search tree and a B-tree?</p>",
        "answers": [
          {
            "text": "A B-tree is a balanced m-way search tree with minimum-occupancy constraints",
            "fraction": 100,
            "feedback": "Correct — the B-tree adds balancing and fill rules to the general m-way concept."
          },
          {
            "text": "They are completely unrelated structures",
            "fraction": 0,
            "feedback": "No — the B-tree is a special case of the m-way search tree."
          },
          {
            "text": "An m-way search tree is always balanced, a B-tree is not",
            "fraction": 0,
            "feedback": "Reversed — the B-tree adds the balance guarantee."
          },
          {
            "text": "A B-tree allows only two children, an m-way tree allows m",
            "fraction": 0,
            "feedback": "Both allow up to m children; the B-tree adds occupancy rules."
          }
        ],
        "generalFeedback": "The m-way search tree is the general concept; B-trees and B+ trees add the balancing rules that guarantee low height.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "m-way degeneracy",
        "text": "<p>A plain m-way search tree with no balancing rules can degenerate and give no height guarantee.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — without occupancy/balance rules it can become tall and unbalanced."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Only the added B-tree rules guarantee balance; the bare m-way tree does not."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "m-way children count",
        "text": "<p>In an m-way search tree, a node holding k keys has exactly k+1 children.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — k ordered keys create k+1 key-space intervals, hence k+1 subtrees."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Children always number one more than keys in a node."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Balanced special case term",
        "text": "<p>A ______ tree is the <em>balanced</em> special case of an m-way search tree, keeping all leaves at the same depth. (one letter/word, English)</p>",
        "answers": [
          {
            "text": "B",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "B-tree",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "B tree",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "m-way properties multi",
        "text": "<p>Which statements about m-way search trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Each node has up to m children and up to m&minus;1 ordered keys",
            "fraction": 50,
            "feedback": "Yes — this is the defining node shape."
          },
          {
            "text": "They are the general concept; B-trees and B+ trees add balancing rules",
            "fraction": 50,
            "feedback": "Yes — balanced variants build on the m-way idea."
          },
          {
            "text": "They always guarantee O(log n) height on their own",
            "fraction": -50,
            "feedback": "No — only balanced variants like the B-tree guarantee logarithmic height."
          },
          {
            "text": "They are limited to exactly two children per node",
            "fraction": -50,
            "feedback": "No — that is a binary search tree; an m-way node has up to m children."
          }
        ],
        "generalFeedback": "The m-way search tree generalizes the BST to m children with m&minus;1 ordered keys; balance is not automatic and is what B-trees add.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "m-way 節點結構",
        "text": "<p>在 <strong>m 路搜尋樹(m-way search tree)</strong>中,一個節點最多可有多少個鍵與多少個子節點?</p>",
        "answers": [
          {
            "text": "最多 m&minus;1 個鍵、最多 m 個子節點",
            "fraction": 100,
            "feedback": "正確 —— m 個子節點由 m&minus;1 個有序鍵分隔。"
          },
          {
            "text": "剛好 1 個鍵、2 個子節點",
            "fraction": 0,
            "feedback": "那是二元的特例(m=2),不是一般的 m 路節點。"
          },
          {
            "text": "最多 m 個鍵、最多 m&minus;1 個子節點",
            "fraction": 0,
            "feedback": "顛倒了 —— 子節點比鍵多一個。"
          },
          {
            "text": "鍵與子節點皆無上限",
            "fraction": 0,
            "feedback": "階數 m 同時限制兩者。"
          }
        ],
        "generalFeedback": "m 路搜尋樹推廣了 BST:每個節點最多持有 m&minus;1 個鍵,並指向最多 m 棵子樹。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "m-way 推廣自 BST",
        "text": "<p>m 路搜尋樹最適合被描述為哪一種結構的推廣?</p>",
        "answers": [
          {
            "text": "二元搜尋樹,允許每個節點有超過兩個子節點",
            "fraction": 100,
            "feedback": "正確 —— BST 是 m 路搜尋樹在 m=2 時的情況。"
          },
          {
            "text": "雜湊表",
            "fraction": 0,
            "feedback": "錯 —— m 路樹是有序的比較結構,不是雜湊。"
          },
          {
            "text": "堆積(heap)",
            "fraction": 0,
            "feedback": "堆積依父子優先權排序,而非依有序搜尋鍵。"
          },
          {
            "text": "連結串列",
            "fraction": 0,
            "feedback": "串列沒有分支的搜尋順序。"
          }
        ],
        "generalFeedback": "把分支因子從 2 提高到 m,就把二元搜尋樹變成 m 路搜尋樹。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "m-way 鍵的排序",
        "text": "<p>在 m 路搜尋樹的節點內,鍵與子樹如何排序?</p>",
        "answers": [
          {
            "text": "鍵為排序好的,兩個相鄰鍵之間的子樹持有落在該範圍內的值",
            "fraction": 100,
            "feedback": "正確 —— 此排序把 BST 不變量推廣到多個鍵。"
          },
          {
            "text": "鍵無序;搜尋時必須掃描每一棵子樹",
            "fraction": 0,
            "feedback": "錯 —— 有序的鍵正是使它成為搜尋樹的原因。"
          },
          {
            "text": "子樹中所有鍵都大於根節點的最大鍵",
            "fraction": 0,
            "feedback": "只有最右子樹如此;每個間隔各有其範圍。"
          },
          {
            "text": "子樹依大小排序,而非依鍵值",
            "fraction": 0,
            "feedback": "排序依鍵值進行,才能導向式搜尋。"
          }
        ],
        "generalFeedback": "有序的鍵切分鍵空間;第 i 個子節點涵蓋第 i&minus;1 個鍵與第 i 個鍵之間的區間。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "m-way 與 B-Tree",
        "text": "<p>m 路搜尋樹與 B-tree 之間的關係為何?</p>",
        "answers": [
          {
            "text": "B-tree 是一種帶有最低佔用限制的平衡 m 路搜尋樹",
            "fraction": 100,
            "feedback": "正確 —— B-tree 在一般 m 路概念上加入平衡與填充規則。"
          },
          {
            "text": "它們是完全無關的結構",
            "fraction": 0,
            "feedback": "錯 —— B-tree 是 m 路搜尋樹的特例。"
          },
          {
            "text": "m 路搜尋樹一定平衡,B-tree 則否",
            "fraction": 0,
            "feedback": "顛倒了 —— 是 B-tree 加入了平衡保證。"
          },
          {
            "text": "B-tree 只允許兩個子節點,m 路樹允許 m 個",
            "fraction": 0,
            "feedback": "兩者都允許最多 m 個子節點;B-tree 加的是佔用規則。"
          }
        ],
        "generalFeedback": "m 路搜尋樹是一般概念;B-tree 與 B+ 樹加入了保證低樹高的平衡規則。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "m-way 退化",
        "text": "<p>沒有平衡規則的純 m 路搜尋樹可能退化,而無法提供任何樹高保證。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 缺少佔用/平衡規則時,它可能變得又高又不平衡。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "只有 B-tree 額外的規則才保證平衡;純 m 路樹不保證。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "m-way 子節點數",
        "text": "<p>在 m 路搜尋樹中,持有 k 個鍵的節點恰有 k+1 個子節點。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— k 個有序鍵形成 k+1 個鍵空間區間,故有 k+1 棵子樹。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "節點的子節點數恆比鍵數多一。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "平衡特例名詞",
        "text": "<p>______ 樹是 m 路搜尋樹的<em>平衡</em>特例,使所有葉節點維持在相同深度。(請以英文字母/單字作答)</p>",
        "answers": [
          {
            "text": "B",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "B-tree",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "B tree",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "m-way 性質複選",
        "text": "<p>關於 m 路搜尋樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "每個節點最多有 m 個子節點與最多 m&minus;1 個有序鍵",
            "fraction": 50,
            "feedback": "正確 —— 這是其定義性的節點形狀。"
          },
          {
            "text": "它是一般概念;B-tree 與 B+ 樹在其上加入平衡規則",
            "fraction": 50,
            "feedback": "正確 —— 平衡變體建構於 m 路概念之上。"
          },
          {
            "text": "它本身總是保證 O(log n) 的樹高",
            "fraction": -50,
            "feedback": "錯 —— 只有像 B-tree 的平衡變體才保證對數樹高。"
          },
          {
            "text": "它每個節點僅限恰兩個子節點",
            "fraction": -50,
            "feedback": "錯 —— 那是二元搜尋樹;m 路節點最多有 m 個子節點。"
          }
        ],
        "generalFeedback": "m 路搜尋樹把 BST 推廣為 m 個子節點與 m&minus;1 個有序鍵;平衡並非自動,那是 B-tree 所加入的。",
        "single": false
      }
    ]
  },
  "tree-obst": {
    "en": [
      {
        "type": "multichoice",
        "name": "OBST objective",
        "text": "<p>Given keys with known search frequencies, what does the Optimal BST algorithm minimize?</p>",
        "answers": [
          {
            "text": "The expected (weighted) search cost",
            "fraction": 100,
            "feedback": "Correct — it minimizes the frequency-weighted total depth of searches."
          },
          {
            "text": "The height of the tree",
            "fraction": 0,
            "feedback": "No — minimizing height ignores the frequencies; a balanced tree is not always optimal here."
          },
          {
            "text": "The number of nodes",
            "fraction": 0,
            "feedback": "No — the node count is fixed by the key set."
          },
          {
            "text": "The total edge length",
            "fraction": 0,
            "feedback": "No — the objective is expected search cost, not edge length."
          }
        ],
        "generalFeedback": "OBST arranges keys so that the sum over all keys of (frequency × depth) is minimized — the expected search cost.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "OBST technique",
        "text": "<p>Which algorithmic technique is used to construct an Optimal BST?</p>",
        "answers": [
          {
            "text": "Dynamic programming",
            "fraction": 100,
            "feedback": "Correct — it builds solutions for larger key ranges from optimal sub-ranges."
          },
          {
            "text": "Greedy selection",
            "fraction": 0,
            "feedback": "No — unlike Huffman, a greedy root choice does not yield the optimum."
          },
          {
            "text": "Divide and conquer without memoization",
            "fraction": 0,
            "feedback": "No — naive recursion recomputes overlapping subproblems; DP tables are needed."
          },
          {
            "text": "Backtracking",
            "fraction": 0,
            "feedback": "No — the standard solution is dynamic programming."
          }
        ],
        "generalFeedback": "OBST is a classic dynamic programming problem: the optimal tree over a key range combines optimal subtrees over sub-ranges.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "OBST complexity",
        "text": "<p>What is the time complexity of the standard dynamic programming Optimal BST algorithm for <em>n</em> keys?</p>",
        "answers": [
          {
            "text": "O(n^3)",
            "fraction": 100,
            "feedback": "Correct — O(n^2) subproblems, each trying O(n) possible roots."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "No — that is too fast; the DP fills an O(n^2) table with an inner root loop."
          },
          {
            "text": "O(2^n)",
            "fraction": 0,
            "feedback": "No — DP avoids the exponential blow-up of trying every tree shape."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "No — a single pass cannot solve OBST."
          }
        ],
        "generalFeedback": "There are O(n^2) key-range subproblems and each tries O(n) roots, giving O(n^3); Knuth's optimization reduces it to O(n^2).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Frequent keys placement",
        "text": "<p>In an Optimal BST, keys that are searched more frequently tend to be placed:</p>",
        "answers": [
          {
            "text": "Nearer the root",
            "fraction": 100,
            "feedback": "Correct — shallower depth for frequent keys lowers the expected cost."
          },
          {
            "text": "In the deepest leaves",
            "fraction": 0,
            "feedback": "No — that would raise their access cost."
          },
          {
            "text": "Always as the rightmost node",
            "fraction": 0,
            "feedback": "No — position depends on key order and frequencies, not a fixed slot."
          },
          {
            "text": "Only in the left subtree",
            "fraction": 0,
            "feedback": "No — placement follows BST ordering and cost, not a fixed side."
          }
        ],
        "generalFeedback": "Because cost = frequency × depth, high-frequency keys are pushed toward the root to reduce their depth.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "OBST vs balanced",
        "text": "<p>An Optimal BST is always the same as a perfectly height-balanced BST.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — when frequencies are skewed, an unbalanced tree can have lower expected cost."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — optimality depends on frequencies, not just on balance."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "OBST maintains BST order",
        "text": "<p>An Optimal BST must still satisfy the binary-search-tree ordering property on its keys.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it is a BST, so in-order traversal yields the keys in sorted order."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It is still a BST; only the shape is chosen to minimize cost."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "OBST technique term",
        "text": "<p>The Optimal BST is solved by ______ programming (fill in the one-word technique name).</p>",
        "answers": [
          {
            "text": "dynamic",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "dynamic*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "OBST properties multi",
        "text": "<p>Which statements about Optimal BST construction are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It uses a dynamic programming table over ranges of consecutive keys",
            "fraction": 50,
            "feedback": "Yes — subproblems are contiguous key ranges."
          },
          {
            "text": "It minimizes expected search cost using the key frequencies",
            "fraction": 50,
            "feedback": "Yes — frequencies drive the objective."
          },
          {
            "text": "It is a greedy algorithm like Huffman coding",
            "fraction": -50,
            "feedback": "No — OBST needs DP; a greedy root choice is not optimal."
          },
          {
            "text": "It ignores search frequencies and only balances the tree",
            "fraction": -50,
            "feedback": "No — frequencies are central to the objective."
          }
        ],
        "generalFeedback": "OBST: dynamic programming over key ranges, minimizing frequency-weighted expected cost; it is not greedy and does not ignore frequencies.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "最佳 BST 目標",
        "text": "<p>給定已知搜尋頻率的鍵值,最佳二元搜尋樹演算法要最小化什麼?</p>",
        "answers": [
          {
            "text": "期望(加權)搜尋成本",
            "fraction": 100,
            "feedback": "正確 —— 它最小化以頻率加權的搜尋總深度。"
          },
          {
            "text": "樹的高度",
            "fraction": 0,
            "feedback": "錯 —— 最小化高度會忽略頻率;平衡樹在此不一定最佳。"
          },
          {
            "text": "節點數量",
            "fraction": 0,
            "feedback": "錯 —— 節點數由鍵值集合固定。"
          },
          {
            "text": "邊的總長度",
            "fraction": 0,
            "feedback": "錯 —— 目標是期望搜尋成本,而非邊長。"
          }
        ],
        "generalFeedback": "最佳 BST 安排鍵值,使所有鍵(頻率 × 深度)之總和最小,即期望搜尋成本。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "最佳 BST 技巧",
        "text": "<p>建構最佳 BST 使用哪一種演算法技巧?</p>",
        "answers": [
          {
            "text": "動態規劃",
            "fraction": 100,
            "feedback": "正確 —— 由較小鍵值範圍的最佳解組合出較大範圍的解。"
          },
          {
            "text": "貪婪選擇",
            "fraction": 0,
            "feedback": "錯 —— 與霍夫曼不同,貪婪地選根並不能得到最佳解。"
          },
          {
            "text": "不做記憶化的分治法",
            "fraction": 0,
            "feedback": "錯 —— 樸素遞迴會重算重疊子問題;需要 DP 表格。"
          },
          {
            "text": "回溯法",
            "fraction": 0,
            "feedback": "錯 —— 標準解法是動態規劃。"
          }
        ],
        "generalFeedback": "最佳 BST 是經典動態規劃問題:某鍵值範圍的最佳樹由其子範圍的最佳子樹組成。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "最佳 BST 複雜度",
        "text": "<p>對 <em>n</em> 個鍵值,標準動態規劃最佳 BST 演算法的時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(n^3)",
            "fraction": 100,
            "feedback": "正確 —— 有 O(n^2) 個子問題,每個嘗試 O(n) 個可能的根。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "錯 —— 太快了;DP 需填 O(n^2) 表格並含選根內迴圈。"
          },
          {
            "text": "O(2^n)",
            "fraction": 0,
            "feedback": "錯 —— DP 避免了嘗試所有樹形的指數級爆炸。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "錯 —— 單次掃描無法解出最佳 BST。"
          }
        ],
        "generalFeedback": "共有 O(n^2) 個鍵值範圍子問題,每個嘗試 O(n) 個根,故為 O(n^3);Knuth 最佳化可降為 O(n^2)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "高頻鍵值的位置",
        "text": "<p>在最佳 BST 中,被搜尋越頻繁的鍵值傾向被放在:</p>",
        "answers": [
          {
            "text": "越靠近根部",
            "fraction": 100,
            "feedback": "正確 —— 高頻鍵值深度較淺可降低期望成本。"
          },
          {
            "text": "最深的葉節點",
            "fraction": 0,
            "feedback": "錯 —— 那會提高其存取成本。"
          },
          {
            "text": "永遠作為最右邊的節點",
            "fraction": 0,
            "feedback": "錯 —— 位置取決於鍵值順序與頻率,而非固定位置。"
          },
          {
            "text": "只放在左子樹",
            "fraction": 0,
            "feedback": "錯 —— 位置依 BST 排序與成本決定,而非固定一側。"
          }
        ],
        "generalFeedback": "由於成本 = 頻率 × 深度,高頻鍵值會被推向根部以降低其深度。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "最佳 BST 與平衡樹",
        "text": "<p>最佳 BST 永遠等同於完全高度平衡的 BST。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 當頻率偏斜時,不平衡的樹反而可能有較低的期望成本。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 最佳性取決於頻率,而非僅取決於平衡。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "最佳 BST 維持排序性質",
        "text": "<p>最佳 BST 的鍵值仍必須滿足二元搜尋樹的排序性質。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它是一棵 BST,中序走訪會依排序輸出鍵值。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "它仍是 BST;只是選擇能最小化成本的樹形。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "最佳 BST 技巧名詞",
        "text": "<p>最佳 BST 是以______規劃(dynamic programming)求解,填入該技巧的英文單字。</p>",
        "answers": [
          {
            "text": "dynamic",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "dynamic*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "最佳 BST 性質複選",
        "text": "<p>關於最佳 BST 的建構,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它使用對連續鍵值範圍的動態規劃表格",
            "fraction": 50,
            "feedback": "正確 —— 子問題是連續的鍵值範圍。"
          },
          {
            "text": "它利用鍵值頻率最小化期望搜尋成本",
            "fraction": 50,
            "feedback": "正確 —— 頻率驅動目標函數。"
          },
          {
            "text": "它像霍夫曼編碼一樣是貪婪演算法",
            "fraction": -50,
            "feedback": "錯 —— 最佳 BST 需要 DP;貪婪選根並非最佳。"
          },
          {
            "text": "它忽略搜尋頻率,只把樹平衡化",
            "fraction": -50,
            "feedback": "錯 —— 頻率是目標函數的核心。"
          }
        ],
        "generalFeedback": "最佳 BST:對鍵值範圍做動態規劃,最小化以頻率加權的期望成本;它並非貪婪,也不忽略頻率。",
        "single": false
      }
    ]
  },
  "tree-radix": {
    "en": [
      {
        "type": "multichoice",
        "name": "Radix tree defining idea",
        "text": "<p>What is the defining difference between a radix tree (compressed trie) and a plain trie?</p>",
        "answers": [
          {
            "text": "Chains of single-child nodes are compressed, so each edge is labeled with a whole substring",
            "fraction": 100,
            "feedback": "Correct — that compression is exactly what defines a radix/Patricia tree."
          },
          {
            "text": "Each node has exactly three children",
            "fraction": 0,
            "feedback": "No — that describes a ternary search tree, not a radix tree."
          },
          {
            "text": "Keys are compared by hashing them to buckets",
            "fraction": 0,
            "feedback": "No — a radix tree still walks the key; it does not hash."
          },
          {
            "text": "It stores only numeric keys, never strings",
            "fraction": 0,
            "feedback": "No — radix trees handle string/byte keys just like tries."
          }
        ],
        "generalFeedback": "A radix tree is a trie in which every chain of single-child nodes is merged into one edge labeled with the whole shared substring.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Radix tree edge label",
        "text": "<p>In a radix tree, what does a single <strong>edge</strong> carry?</p>",
        "answers": [
          {
            "text": "A whole substring (possibly several characters)",
            "fraction": 100,
            "feedback": "Correct — compressed edges are labeled with multi-character substrings."
          },
          {
            "text": "Exactly one character",
            "fraction": 0,
            "feedback": "No — that is a plain trie; the radix tree merges single-child chains."
          },
          {
            "text": "A less-than / equal / greater-than pointer",
            "fraction": 0,
            "feedback": "No — that is a ternary search tree node."
          },
          {
            "text": "A hash of the remaining key",
            "fraction": 0,
            "feedback": "No — radix trees store literal substrings on edges, not hashes."
          }
        ],
        "generalFeedback": "Because single-child chains are compressed, a radix-tree edge is labeled with the entire shared substring rather than one character.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Radix tree benefit",
        "text": "<p>Compared with a plain trie storing the same keys, a radix tree mainly...</p>",
        "answers": [
          {
            "text": "Saves space by collapsing single-child chains, while keeping O(L) operations",
            "fraction": 100,
            "feedback": "Correct — fewer nodes, same O(L) time on a key of length L."
          },
          {
            "text": "Reduces search time from O(L) to O(log L)",
            "fraction": 0,
            "feedback": "No — operations stay O(L); the win is in space, not asymptotic time."
          },
          {
            "text": "Makes the structure comparison-based like a BST",
            "fraction": 0,
            "feedback": "No — it is still a trie; it navigates by characters, not comparisons."
          },
          {
            "text": "Loses the ability to answer prefix queries",
            "fraction": 0,
            "feedback": "No — it keeps the same prefix-query strengths as a trie."
          }
        ],
        "generalFeedback": "Compression removes redundant single-child nodes, cutting memory while search, insert, and delete of a length-L key remain O(L).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Radix tree application",
        "text": "<p>Which application is a classic use of radix trees?</p>",
        "answers": [
          {
            "text": "IP routing tables (longest-prefix match)",
            "fraction": 100,
            "feedback": "Correct — radix/Patricia trees are a staple of IP routing."
          },
          {
            "text": "Balancing a set of numbers for median queries",
            "fraction": 0,
            "feedback": "No — that is order-statistic territory, not radix trees."
          },
          {
            "text": "Priority-queue scheduling by key value",
            "fraction": 0,
            "feedback": "No — that is a heap's job, not a radix tree's."
          },
          {
            "text": "Cache eviction with least-recently-used order",
            "fraction": 0,
            "feedback": "No — LRU uses a list plus map, not a radix tree."
          }
        ],
        "generalFeedback": "Radix (Patricia) trees are widely used for IP routing tables and similar prefix-matching workloads.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Radix tree operation cost",
        "text": "<p>Compressing a trie into a radix tree keeps search, insert, and delete of a length-L key at O(L).</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — compression saves space without changing the O(L) time."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — operations remain O(L); only the node count shrinks."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Radix vs plain trie space",
        "text": "<p>A radix tree generally uses <em>more</em> memory than the plain trie holding the same keys.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — compression removes single-child nodes, so it uses less memory."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — the radix tree saves space compared with a plain trie."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Radix tree alias",
        "text": "<p>A radix tree that compresses single-child chains is also historically known as a ______ tree (one word, the classic name).</p>",
        "answers": [
          {
            "text": "Patricia",
            "fraction": 100,
            "feedback": "Correct — the radix tree is also called a Patricia tree/trie."
          },
          {
            "text": "Patricia*",
            "fraction": 100,
            "feedback": "Correct — the radix tree is also called a Patricia tree/trie."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Radix tree properties",
        "text": "<p>Which statements about radix trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "They merge single-child chains, labeling edges with whole substrings",
            "fraction": 50,
            "feedback": "Yes — that is the compression that defines them."
          },
          {
            "text": "They keep the same prefix-query strengths as an ordinary trie",
            "fraction": 50,
            "feedback": "Yes — shared prefixes still lead to a common subtree."
          },
          {
            "text": "They are comparison-based like a balanced BST",
            "fraction": -50,
            "feedback": "No — a radix tree is still a trie, navigating by characters."
          },
          {
            "text": "Compression raises operation cost above O(L)",
            "fraction": -50,
            "feedback": "No — operations remain O(L)."
          }
        ],
        "generalFeedback": "Radix trees compress single-child chains to save space, retain trie-style prefix queries, stay non-comparison-based, and keep O(L) operations.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "基數樹的定義概念",
        "text": "<p>基數樹(壓縮 trie)與純 trie 之間的定義性差異是什麼?</p>",
        "answers": [
          {
            "text": "單一子節點的鏈被壓縮,因此每條邊以一整段子字串標記",
            "fraction": 100,
            "feedback": "正確 —— 這種壓縮正是基數樹/Patricia 樹的定義。"
          },
          {
            "text": "每個節點剛好有三個子節點",
            "fraction": 0,
            "feedback": "錯 —— 那描述的是三元搜尋樹,不是基數樹。"
          },
          {
            "text": "鍵透過雜湊到桶中來比較",
            "fraction": 0,
            "feedback": "錯 —— 基數樹仍逐字元走過鍵;它不做雜湊。"
          },
          {
            "text": "它只儲存數值鍵,從不儲存字串",
            "fraction": 0,
            "feedback": "錯 —— 基數樹如 trie 一般處理字串/位元組鍵。"
          }
        ],
        "generalFeedback": "基數樹是一種 trie,其中每一段單一子節點的鏈都被合併成一條以整段共享子字串標記的邊。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "基數樹邊的標記",
        "text": "<p>在基數樹中,單一<strong>邊</strong>承載什麼?</p>",
        "answers": [
          {
            "text": "一整段子字串(可能有數個字元)",
            "fraction": 100,
            "feedback": "正確 —— 壓縮後的邊以多字元子字串標記。"
          },
          {
            "text": "剛好一個字元",
            "fraction": 0,
            "feedback": "錯 —— 那是純 trie;基數樹合併了單一子節點的鏈。"
          },
          {
            "text": "一個小於 / 等於 / 大於的指標",
            "fraction": 0,
            "feedback": "錯 —— 那是三元搜尋樹的節點。"
          },
          {
            "text": "剩餘鍵的雜湊值",
            "fraction": 0,
            "feedback": "錯 —— 基數樹在邊上儲存實際子字串,而非雜湊值。"
          }
        ],
        "generalFeedback": "由於單一子節點的鏈被壓縮,基數樹的邊以整段共享子字串標記,而非單一字元。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "基數樹的好處",
        "text": "<p>相較於儲存相同鍵的純 trie,基數樹主要...</p>",
        "answers": [
          {
            "text": "透過壓縮單一子節點的鏈來節省空間,同時保持 O(L) 操作",
            "fraction": 100,
            "feedback": "正確 —— 節點更少,對長度 L 的鍵時間仍為 O(L)。"
          },
          {
            "text": "將搜尋時間從 O(L) 降到 O(log L)",
            "fraction": 0,
            "feedback": "錯 —— 操作仍是 O(L);好處在空間,而非漸進時間。"
          },
          {
            "text": "使結構像 BST 一樣基於比較",
            "fraction": 0,
            "feedback": "錯 —— 它仍是 trie;以字元導航,而非比較。"
          },
          {
            "text": "失去回答前綴查詢的能力",
            "fraction": 0,
            "feedback": "錯 —— 它保有與 trie 相同的前綴查詢強項。"
          }
        ],
        "generalFeedback": "壓縮移除多餘的單一子節點,削減記憶體;而長度 L 的鍵之搜尋、插入、刪除仍為 O(L)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "基數樹的應用",
        "text": "<p>哪一項應用是基數樹的經典用途?</p>",
        "answers": [
          {
            "text": "IP 路由表(最長前綴匹配)",
            "fraction": 100,
            "feedback": "正確 —— 基數樹/Patricia 樹是 IP 路由的主力。"
          },
          {
            "text": "將一組數字平衡以查詢中位數",
            "fraction": 0,
            "feedback": "錯 —— 那是順序統計的領域,不是基數樹。"
          },
          {
            "text": "依鍵值進行優先佇列排程",
            "fraction": 0,
            "feedback": "錯 —— 那是堆積的工作,不是基數樹。"
          },
          {
            "text": "以最近最少使用順序進行快取淘汰",
            "fraction": 0,
            "feedback": "錯 —— LRU 使用鏈結串列加對映表,不是基數樹。"
          }
        ],
        "generalFeedback": "基數樹(Patricia 樹)廣泛用於 IP 路由表以及類似的前綴匹配工作負載。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "基數樹操作成本",
        "text": "<p>將 trie 壓縮成基數樹,長度 L 的鍵之搜尋、插入、刪除仍維持 O(L)。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 壓縮節省空間而不改變 O(L) 時間。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 操作仍為 O(L);只是節點數變少。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "基數樹與純 trie 的空間",
        "text": "<p>基數樹通常比儲存相同鍵的純 trie 使用<em>更多</em>記憶體。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 壓縮移除單一子節點,因此使用更少記憶體。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 基數樹相較純 trie 節省空間。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "基數樹別名",
        "text": "<p>壓縮單一子節點鏈的基數樹在歷史上也被稱為 ______ tree(請填一個英文單字,經典名稱)。</p>",
        "answers": [
          {
            "text": "Patricia",
            "fraction": 100,
            "feedback": "正確 —— 基數樹又稱為 Patricia tree/trie。"
          },
          {
            "text": "Patricia*",
            "fraction": 100,
            "feedback": "正確 —— 基數樹又稱為 Patricia tree/trie。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "基數樹性質",
        "text": "<p>關於基數樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它們合併單一子節點的鏈,並以整段子字串標記邊",
            "fraction": 50,
            "feedback": "正確 —— 這正是定義它們的壓縮。"
          },
          {
            "text": "它們保有與一般 trie 相同的前綴查詢強項",
            "fraction": 50,
            "feedback": "正確 —— 共享前綴仍導向共同的子樹。"
          },
          {
            "text": "它們像平衡 BST 一樣基於比較",
            "fraction": -50,
            "feedback": "錯 —— 基數樹仍是 trie,以字元導航。"
          },
          {
            "text": "壓縮使操作成本高於 O(L)",
            "fraction": -50,
            "feedback": "錯 —— 操作仍為 O(L)。"
          }
        ],
        "generalFeedback": "基數樹壓縮單一子節點的鏈以節省空間、保有 trie 式前綴查詢、維持非比較式、並保持 O(L) 操作。",
        "single": false
      }
    ]
  },
  "tree-rb": {
    "en": [
      {
        "type": "multichoice",
        "name": "Red-black what it is",
        "text": "<p>What is a <strong>red-black tree</strong>?</p>",
        "answers": [
          {
            "text": "A self-balancing BST that assigns each node a red or black color and enforces color invariants",
            "fraction": 100,
            "feedback": "Correct — colors plus invariants keep the tree approximately balanced."
          },
          {
            "text": "A BST where nodes are painted only for visualization and have no effect on balance",
            "fraction": 0,
            "feedback": "The colors are functional; they drive the balancing rules."
          },
          {
            "text": "A tree that stores a numeric balance factor in each node",
            "fraction": 0,
            "feedback": "That is an AVL tree; red-black uses colors instead."
          },
          {
            "text": "A heap ordered by node color",
            "fraction": 0,
            "feedback": "A red-black tree is a search tree, not a heap."
          }
        ],
        "generalFeedback": "A red-black tree is a self-balancing BST; each node is red or black, and invariants on those colors bound the height to O(log n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Red-black worst-case complexity",
        "text": "<p>What is the <strong>worst-case</strong> time complexity of search, insert, and delete in a red-black tree?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — the color invariants keep height at most 2&middot;log(n+1)."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is the unbalanced-BST worst case, which red-black trees avoid."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "You still descend a logarithmic-height path."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is a sorting bound, not a single operation."
          }
        ],
        "generalFeedback": "Red-black invariants bound the height by 2&middot;log(n+1), so all operations run in O(log n) worst case.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Red-black balancing mechanism",
        "text": "<p>How does a red-black tree keep itself balanced after an update?</p>",
        "answers": [
          {
            "text": "By recoloring nodes and performing rotations to restore the color invariants",
            "fraction": 100,
            "feedback": "Correct — recoloring and a small number of rotations repair violations."
          },
          {
            "text": "By requiring every node's balance factor to stay in {-1, 0, 1}",
            "fraction": 0,
            "feedback": "That is the AVL rule, not red-black."
          },
          {
            "text": "By splaying the inserted node to the root",
            "fraction": 0,
            "feedback": "That is a splay tree, not red-black."
          },
          {
            "text": "By rehashing all keys into a new table",
            "fraction": 0,
            "feedback": "Red-black trees do not use hashing."
          }
        ],
        "generalFeedback": "A red-black tree restores its invariants using recoloring plus rotations; insertions and deletions need only O(1) amortized rotations.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Red-black vs AVL rotations",
        "text": "<p>Why are red-black trees often preferred over AVL trees for <strong>update-heavy</strong> workloads?</p>",
        "answers": [
          {
            "text": "They perform fewer rotations per insertion/deletion (O(1) amortized)",
            "fraction": 100,
            "feedback": "Correct — looser balance means cheaper rebalancing on updates."
          },
          {
            "text": "They guarantee a perfectly balanced tree at all times",
            "fraction": 0,
            "feedback": "They are only approximately balanced; that is why updates are cheaper."
          },
          {
            "text": "They allow O(1) search regardless of tree size",
            "fraction": 0,
            "feedback": "Search is still O(log n)."
          },
          {
            "text": "They never require any rotations",
            "fraction": 0,
            "feedback": "They do rotate, just fewer times than AVL on average."
          }
        ],
        "generalFeedback": "Red-black trees are less strictly balanced than AVL, so insertions and deletions need fewer rotations (O(1) amortized), which pays off in update-heavy workloads.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Red-black real-world use",
        "text": "<p>Red-black trees underpin real-world libraries such as C++ <code>std::map</code>, Java's <code>TreeMap</code>, and structures in the Linux kernel.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — these are classic real-world uses of red-black trees."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "These libraries do rely on red-black trees."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Red-black is a BST",
        "text": "<p>A red-black tree is a binary search tree and still supports in-order traversal to list keys in sorted order.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — it is a BST with color invariants; in-order traversal is still sorted."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Red-black ordering is standard BST ordering, so in-order traversal is sorted."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Red-black color term",
        "text": "<p>Besides \"red\", what is the other node color used in a red-black tree? ______.</p>",
        "answers": [
          {
            "text": "black",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "black*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Red-black properties multi-select",
        "text": "<p>Which statements about red-black trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "They guarantee O(log n) worst-case search, insert, and delete",
            "fraction": 50,
            "feedback": "Yes — color invariants bound the height."
          },
          {
            "text": "They typically use fewer rotations on updates than AVL trees",
            "fraction": 50,
            "feedback": "Yes — O(1) amortized rotations makes them good for update-heavy use."
          },
          {
            "text": "They keep every node's balance factor in {-1, 0, 1}",
            "fraction": -50,
            "feedback": "No — that is the AVL invariant, not red-black."
          },
          {
            "text": "They move each accessed node to the root on every lookup",
            "fraction": -50,
            "feedback": "No — that is a splay tree."
          }
        ],
        "generalFeedback": "Red-black trees guarantee O(log n) operations and use few rotations on updates; they rely on color invariants (not balance factors) and do not splay accessed nodes.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "紅黑樹是什麼",
        "text": "<p><strong>紅黑樹</strong>是什麼?</p>",
        "answers": [
          {
            "text": "一種自我平衡的 BST,為每個節點指定紅或黑顏色並強制顏色不變式",
            "fraction": 100,
            "feedback": "正確 —— 顏色加上不變式使樹維持近似平衡。"
          },
          {
            "text": "一種只為視覺化上色、不影響平衡的 BST",
            "fraction": 0,
            "feedback": "顏色是功能性的;它驅動平衡規則。"
          },
          {
            "text": "一種在每個節點儲存數值平衡因子的樹",
            "fraction": 0,
            "feedback": "那是 AVL 樹;紅黑樹改用顏色。"
          },
          {
            "text": "一種以節點顏色排序的堆積",
            "fraction": 0,
            "feedback": "紅黑樹是搜尋樹,不是堆積。"
          }
        ],
        "generalFeedback": "紅黑樹是自我平衡的 BST;每個節點為紅或黑,顏色不變式將高度限制在 O(log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "紅黑樹最差情況複雜度",
        "text": "<p>紅黑樹的搜尋、插入、刪除的<strong>最差情況</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 顏色不變式將高度限制在至多 2&middot;log(n+1)。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是未平衡 BST 的最差情況,紅黑樹可避免。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "你仍需沿一條對數高度的路徑下降。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是排序的界,不是單一操作。"
          }
        ],
        "generalFeedback": "紅黑不變式將高度限制在 2&middot;log(n+1),因此所有操作的最差情況皆為 O(log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "紅黑樹平衡機制",
        "text": "<p>更新後,紅黑樹如何保持自身平衡?</p>",
        "answers": [
          {
            "text": "透過重新著色節點並執行旋轉,以恢復顏色不變式",
            "fraction": 100,
            "feedback": "正確 —— 重新著色與少量旋轉可修復違規。"
          },
          {
            "text": "要求每個節點的平衡因子維持在 {-1, 0, 1}",
            "fraction": 0,
            "feedback": "那是 AVL 的規則,不是紅黑樹。"
          },
          {
            "text": "將插入的節點伸展到根",
            "fraction": 0,
            "feedback": "那是伸展樹,不是紅黑樹。"
          },
          {
            "text": "將所有鍵值重新雜湊到新表",
            "fraction": 0,
            "feedback": "紅黑樹不使用雜湊。"
          }
        ],
        "generalFeedback": "紅黑樹以重新著色加旋轉恢復不變式;插入與刪除只需 O(1) 攤還次數的旋轉。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "紅黑樹與 AVL 旋轉比較",
        "text": "<p>為何在<strong>更新頻繁</strong>的工作負載中,紅黑樹常比 AVL 樹更受青睞?</p>",
        "answers": [
          {
            "text": "每次插入/刪除執行較少旋轉(O(1) 攤還)",
            "fraction": 100,
            "feedback": "正確 —— 較鬆的平衡使更新時的再平衡更便宜。"
          },
          {
            "text": "它們隨時保證完美平衡的樹",
            "fraction": 0,
            "feedback": "它們只是近似平衡;正因如此更新才更便宜。"
          },
          {
            "text": "不論樹大小都允許 O(1) 搜尋",
            "fraction": 0,
            "feedback": "搜尋仍是 O(log n)。"
          },
          {
            "text": "它們完全不需要任何旋轉",
            "fraction": 0,
            "feedback": "它們仍會旋轉,只是平均比 AVL 少。"
          }
        ],
        "generalFeedback": "紅黑樹平衡不如 AVL 嚴格,因此插入與刪除需要較少旋轉(O(1) 攤還),在更新頻繁的工作負載中更划算。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "紅黑樹的實務應用",
        "text": "<p>紅黑樹是許多實務函式庫的基礎,例如 C++ 的 <code>std::map</code>、Java 的 <code>TreeMap</code>,以及 Linux 核心中的結構。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 這些都是紅黑樹的經典實務應用。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "這些函式庫確實依賴紅黑樹。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "紅黑樹是一種 BST",
        "text": "<p>紅黑樹是二元搜尋樹,仍可透過中序走訪依排序列出鍵值。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 它是帶有顏色不變式的 BST;中序走訪仍是排序的。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "紅黑樹的排序就是標準 BST 排序,所以中序走訪是排序的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "紅黑樹顏色名詞",
        "text": "<p>除了「紅」以外,紅黑樹使用的另一種節點顏色(英文)是什麼?______。</p>",
        "answers": [
          {
            "text": "black",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "black*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "紅黑樹性質複選",
        "text": "<p>關於紅黑樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "保證搜尋、插入、刪除的最差情況為 O(log n)",
            "fraction": 50,
            "feedback": "正確 —— 顏色不變式限制了高度。"
          },
          {
            "text": "更新時通常比 AVL 樹使用較少旋轉",
            "fraction": 50,
            "feedback": "正確 —— O(1) 攤還旋轉使它適合更新頻繁的用途。"
          },
          {
            "text": "使每個節點的平衡因子維持在 {-1, 0, 1}",
            "fraction": -50,
            "feedback": "錯 —— 那是 AVL 的不變式,不是紅黑樹。"
          },
          {
            "text": "每次查詢都將被存取節點移到根",
            "fraction": -50,
            "feedback": "錯 —— 那是伸展樹。"
          }
        ],
        "generalFeedback": "紅黑樹保證 O(log n) 操作,且更新時旋轉次數少;它依賴顏色不變式(非平衡因子),也不會伸展被存取的節點。",
        "single": false
      }
    ]
  },
  "tree-reconstruct": {
    "en": [
      {
        "type": "multichoice",
        "name": "Pair that determines a tree",
        "text": "<p>Which pair of traversal sequences uniquely determines a binary tree?</p>",
        "answers": [
          {
            "text": "Pre-order + in-order",
            "fraction": 100,
            "feedback": "Correct — this pair reconstructs a unique binary tree."
          },
          {
            "text": "Pre-order + post-order",
            "fraction": 0,
            "feedback": "These do not determine a general binary tree uniquely."
          },
          {
            "text": "Pre-order alone",
            "fraction": 0,
            "feedback": "A single traversal is ambiguous by itself."
          },
          {
            "text": "In-order alone",
            "fraction": 0,
            "feedback": "In-order alone cannot fix the shape of the tree."
          }
        ],
        "generalFeedback": "Pre-order (or post-order) supplies the root, while in-order splits left and right subtrees; that combination is enough for a unique reconstruction.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Ambiguous combination",
        "text": "<p>Which of the following does <strong>not</strong> uniquely determine a general binary tree?</p>",
        "answers": [
          {
            "text": "Pre-order + post-order",
            "fraction": 100,
            "feedback": "Correct — this pair is ambiguous for general binary trees."
          },
          {
            "text": "Pre-order + in-order",
            "fraction": 0,
            "feedback": "This pair does determine a unique tree."
          },
          {
            "text": "Post-order + in-order",
            "fraction": 0,
            "feedback": "This pair also determines a unique tree."
          },
          {
            "text": "In-order + post-order",
            "fraction": 0,
            "feedback": "Same as post-order + in-order — it is sufficient."
          }
        ],
        "generalFeedback": "Pre-order + post-order cannot distinguish, for example, a node's single child as left versus right, so the reconstruction is ambiguous.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Finding the root",
        "text": "<p>In pre-order + in-order reconstruction, how do you identify the root of the (sub)tree?</p>",
        "answers": [
          {
            "text": "It is the first element of the pre-order sequence",
            "fraction": 100,
            "feedback": "Correct — pre-order visits the root first."
          },
          {
            "text": "It is the first element of the in-order sequence",
            "fraction": 0,
            "feedback": "The first in-order element is the leftmost node, not the root."
          },
          {
            "text": "It is the middle element of the in-order sequence",
            "fraction": 0,
            "feedback": "The root's position in in-order varies; it is not always the middle."
          },
          {
            "text": "It is the last element of the in-order sequence",
            "fraction": 0,
            "feedback": "That is the rightmost node, not necessarily the root."
          }
        ],
        "generalFeedback": "Pre-order lists the root first (and post-order lists it last); locating that root within in-order then splits the two subtrees.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Role of in-order",
        "text": "<p>Once the root is known, what does locating it inside the <em>in-order</em> sequence let you do?</p>",
        "answers": [
          {
            "text": "Split the remaining nodes into the left and right subtrees",
            "fraction": 100,
            "feedback": "Correct — everything left of the root is the left subtree, everything right is the right subtree."
          },
          {
            "text": "Determine the height of the tree directly",
            "fraction": 0,
            "feedback": "Height falls out of recursion, not from a single split."
          },
          {
            "text": "Sort the node values",
            "fraction": 0,
            "feedback": "In-order of a BST is sorted, but the split is what reconstruction uses."
          },
          {
            "text": "Count the number of leaves",
            "fraction": 0,
            "feedback": "The split identifies subtrees, not leaf counts."
          }
        ],
        "generalFeedback": "In in-order traversal, all nodes before the root belong to the left subtree and all after it to the right subtree — the recursive split that drives reconstruction.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Post-order plus in-order",
        "text": "<p>Post-order combined with in-order uniquely determines a binary tree.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — the last post-order element is the root, and in-order splits the subtrees."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Post-order + in-order is sufficient, just like pre-order + in-order."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Pre-order alone",
        "text": "<p>The pre-order sequence alone is enough to reconstruct a unique binary tree.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "A single traversal is ambiguous; you need in-order too."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — pre-order alone does not fix the tree shape."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Splitting traversal",
        "text": "<p>Which traversal is used together with pre-order (or post-order) to split the left and right subtrees? Answer with the traversal name (hyphenated).</p>",
        "answers": [
          {
            "text": "in-order",
            "fraction": 100,
            "feedback": "Correct — in-order splits the subtrees around the root."
          },
          {
            "text": "inorder",
            "fraction": 100,
            "feedback": "Correct — in-order splits the subtrees around the root."
          },
          {
            "text": "in order",
            "fraction": 100,
            "feedback": "Correct — in-order splits the subtrees around the root."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Reconstruction facts",
        "text": "<p>Which statements about reconstructing a binary tree from traversals are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "The first element of pre-order is the root of the whole tree",
            "fraction": 50,
            "feedback": "Yes — pre-order visits the root first."
          },
          {
            "text": "The last element of post-order is the root of the whole tree",
            "fraction": 50,
            "feedback": "Yes — post-order visits the root last."
          },
          {
            "text": "Pre-order + post-order uniquely determine any binary tree",
            "fraction": -50,
            "feedback": "No — that combination is ambiguous for general binary trees."
          },
          {
            "text": "In-order alone is enough to rebuild the tree",
            "fraction": -50,
            "feedback": "No — a single traversal cannot fix the shape."
          }
        ],
        "generalFeedback": "Pre-order gives the root first and post-order gives it last; in-order then splits subtrees. But pre-order + post-order, or any single traversal alone, is not enough.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "能唯一決定樹的組合",
        "text": "<p>下列哪一組走訪序列可以唯一決定一棵二元樹?</p>",
        "answers": [
          {
            "text": "前序 + 中序",
            "fraction": 100,
            "feedback": "正確 —— 這組可重建出唯一的二元樹。"
          },
          {
            "text": "前序 + 後序",
            "fraction": 0,
            "feedback": "這組無法唯一決定一般的二元樹。"
          },
          {
            "text": "僅前序",
            "fraction": 0,
            "feedback": "單一走訪本身是不明確的。"
          },
          {
            "text": "僅中序",
            "fraction": 0,
            "feedback": "僅中序無法固定樹的形狀。"
          }
        ],
        "generalFeedback": "前序(或後序)提供根節點,而中序將左右子樹分開;此組合足以唯一重建。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "不明確的組合",
        "text": "<p>下列哪一項<strong>無法</strong>唯一決定一般的二元樹?</p>",
        "answers": [
          {
            "text": "前序 + 後序",
            "fraction": 100,
            "feedback": "正確 —— 對一般二元樹而言此組合是不明確的。"
          },
          {
            "text": "前序 + 中序",
            "fraction": 0,
            "feedback": "這組確實能決定唯一的樹。"
          },
          {
            "text": "後序 + 中序",
            "fraction": 0,
            "feedback": "這組也能決定唯一的樹。"
          },
          {
            "text": "中序 + 後序",
            "fraction": 0,
            "feedback": "與後序 + 中序相同 —— 足以決定。"
          }
        ],
        "generalFeedback": "前序 + 後序無法區分例如某節點的唯一子節點是左還是右,因此重建是不明確的。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "找出根節點",
        "text": "<p>在前序 + 中序重建中,你如何辨識(子)樹的根節點?</p>",
        "answers": [
          {
            "text": "它是前序序列的第一個元素",
            "fraction": 100,
            "feedback": "正確 —— 前序最先走訪根節點。"
          },
          {
            "text": "它是中序序列的第一個元素",
            "fraction": 0,
            "feedback": "中序的第一個元素是最左節點,不是根。"
          },
          {
            "text": "它是中序序列的中間元素",
            "fraction": 0,
            "feedback": "根在中序中的位置會變動;不一定是中間。"
          },
          {
            "text": "它是中序序列的最後一個元素",
            "fraction": 0,
            "feedback": "那是最右節點,不一定是根。"
          }
        ],
        "generalFeedback": "前序最先列出根節點(後序最後列出根節點);在中序中定位該根即可分出左右兩棵子樹。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "中序的作用",
        "text": "<p>一旦知道根節點,在<em>中序</em>序列中定位它可以讓你做什麼?</p>",
        "answers": [
          {
            "text": "將其餘節點分成左子樹與右子樹",
            "fraction": 100,
            "feedback": "正確 —— 根左邊全部是左子樹,右邊全部是右子樹。"
          },
          {
            "text": "直接求出樹的高度",
            "fraction": 0,
            "feedback": "高度來自遞迴,而非單一次分割。"
          },
          {
            "text": "將節點值排序",
            "fraction": 0,
            "feedback": "二元搜尋樹的中序是排序的,但重建用的是分割。"
          },
          {
            "text": "計算葉節點的數目",
            "fraction": 0,
            "feedback": "分割辨識子樹,而非葉節點數目。"
          }
        ],
        "generalFeedback": "在中序走訪中,根之前的所有節點屬於左子樹,之後的屬於右子樹 —— 這正是驅動重建的遞迴分割。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "後序加中序",
        "text": "<p>後序與中序合併可唯一決定一棵二元樹。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 後序最後一個元素是根,中序再分割子樹。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "後序 + 中序是足夠的,與前序 + 中序一樣。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "僅前序",
        "text": "<p>僅前序序列就足以重建出唯一的二元樹。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "單一走訪是不明確的;你還需要中序。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 僅前序無法固定樹的形狀。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "用來分割的走訪",
        "text": "<p>哪一種走訪要與前序(或後序)一起使用,才能分割左右子樹?請以走訪名稱作答(英文,含連字號)。</p>",
        "answers": [
          {
            "text": "in-order",
            "fraction": 100,
            "feedback": "正確 —— 中序以根為界分割子樹。"
          },
          {
            "text": "inorder",
            "fraction": 100,
            "feedback": "正確 —— 中序以根為界分割子樹。"
          },
          {
            "text": "in order",
            "fraction": 100,
            "feedback": "正確 —— 中序以根為界分割子樹。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "重建的事實",
        "text": "<p>關於由走訪序列重建二元樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "前序的第一個元素是整棵樹的根",
            "fraction": 50,
            "feedback": "正確 —— 前序最先走訪根。"
          },
          {
            "text": "後序的最後一個元素是整棵樹的根",
            "fraction": 50,
            "feedback": "正確 —— 後序最後走訪根。"
          },
          {
            "text": "前序 + 後序可唯一決定任意二元樹",
            "fraction": -50,
            "feedback": "錯 —— 對一般二元樹此組合是不明確的。"
          },
          {
            "text": "僅中序就足以重建樹",
            "fraction": -50,
            "feedback": "錯 —— 單一走訪無法固定形狀。"
          }
        ],
        "generalFeedback": "前序最先給出根,後序最後給出根;中序再分割子樹。但前序 + 後序,或任何單一走訪,都不足夠。",
        "single": false
      }
    ]
  },
  "tree-segment": {
    "en": [
      {
        "type": "multichoice",
        "name": "Segment tree query complexity",
        "text": "<p>What is the time complexity of a <strong>range query</strong> (e.g. sum over [l, r]) on a segment tree?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — a query touches O(log n) canonical nodes."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "Only a precomputed prefix-sum array gives O(1) sum, but it cannot handle updates cheaply."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "That is a naive scan; the tree avoids it."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is the cost of many queries or a sort, not a single query."
          }
        ],
        "generalFeedback": "A segment tree decomposes any range into O(log n) nodes, so both range queries and point updates run in O(log n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Segment tree build and space",
        "text": "<p>For an array of n elements, what are the typical <strong>build time</strong> and <strong>space</strong> of a segment tree?</p>",
        "answers": [
          {
            "text": "Build O(n), space O(n) (about 2n–4n nodes)",
            "fraction": 100,
            "feedback": "Correct — a bottom-up build is linear and the node count is O(n)."
          },
          {
            "text": "Build O(n log n), space O(n log n)",
            "fraction": 0,
            "feedback": "The plain segment tree builds in O(n) with O(n) space."
          },
          {
            "text": "Build O(log n), space O(log n)",
            "fraction": 0,
            "feedback": "You must at least visit every element to build, so build is O(n)."
          },
          {
            "text": "Build O(n^2), space O(n^2)",
            "fraction": 0,
            "feedback": "Far too much; the structure is linear in space."
          }
        ],
        "generalFeedback": "Building a segment tree is O(n), and it stores about 2n–4n nodes, i.e. O(n) space.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Lazy propagation purpose",
        "text": "<p>What does <strong>lazy propagation</strong> enable in a segment tree?</p>",
        "answers": [
          {
            "text": "Range updates in O(log n) by deferring pending updates to child nodes",
            "fraction": 100,
            "feedback": "Correct — a whole range is updated by marking nodes and pushing down only when needed."
          },
          {
            "text": "Sorting the underlying array in O(n)",
            "fraction": 0,
            "feedback": "A segment tree does not sort the array."
          },
          {
            "text": "Reducing space from O(n) to O(log n)",
            "fraction": 0,
            "feedback": "Lazy propagation affects update time, not asymptotic space."
          },
          {
            "text": "Making point queries O(1)",
            "fraction": 0,
            "feedback": "Queries remain O(log n); lazy propagation targets range updates."
          }
        ],
        "generalFeedback": "Without lazy propagation a range update touches O(n) leaves; with it, updates are deferred and pushed down lazily, giving O(log n) range updates.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Segment tree vs Fenwick generality",
        "text": "<p>Compared with a Fenwick tree (BIT), a segment tree is more general because it can directly support:</p>",
        "answers": [
          {
            "text": "Any associative range aggregate, such as range minimum or maximum",
            "fraction": 100,
            "feedback": "Correct — segment trees handle min/max/gcd/etc., not just invertible sums."
          },
          {
            "text": "Only prefix sums and nothing else",
            "fraction": 0,
            "feedback": "That is closer to what a Fenwick tree specializes in."
          },
          {
            "text": "Hashing keys for O(1) lookup",
            "fraction": 0,
            "feedback": "That is a hash table, unrelated to segment trees."
          },
          {
            "text": "Ordered predecessor/successor queries on keys",
            "fraction": 0,
            "feedback": "That is a balanced BST task, not a segment tree's role."
          }
        ],
        "generalFeedback": "A segment tree supports any associative aggregate over a range (sum, min, max, gcd, ...), making it more general than a Fenwick tree.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Segment tree properties (multi-select)",
        "text": "<p>Which statements about segment trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "It is a binary tree whose nodes represent array intervals",
            "fraction": 50,
            "feedback": "Yes — each internal node covers the union of its children's intervals."
          },
          {
            "text": "Range queries and point updates each run in O(log n)",
            "fraction": 50,
            "feedback": "Yes — both operations touch O(log n) nodes."
          },
          {
            "text": "It requires the underlying array to be kept sorted",
            "fraction": -50,
            "feedback": "No — the array is indexed by position, not sorted by value."
          },
          {
            "text": "It can answer range sums but never range minimums",
            "fraction": -50,
            "feedback": "No — it handles min/max just as easily as sum."
          }
        ],
        "generalFeedback": "A segment tree is an interval binary tree giving O(log n) range queries and updates for any associative aggregate, with no sorting requirement.",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "Segment tree range update",
        "text": "<p>With lazy propagation, a segment tree can apply a range update in O(log n) time.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — pending updates are deferred and pushed down, so range updates are O(log n)."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Lazy propagation does give O(log n) range updates."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Segment tree only sums",
        "text": "<p>A segment tree can only compute range sums and cannot support range minimum or maximum queries.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — a segment tree supports any associative aggregate, including min and max."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — sum, min, max, gcd, and other associative aggregates all work."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Lazy technique term",
        "text": "<p>The technique that defers pending range updates to child nodes, enabling O(log n) range updates, is called lazy ______.</p>",
        "answers": [
          {
            "text": "propagation",
            "fraction": 100,
            "feedback": "Correct — lazy propagation."
          },
          {
            "text": "propagation*",
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
        "name": "線段樹查詢複雜度",
        "text": "<p>在線段樹上執行一次<strong>區間查詢</strong>(例如對 [l, r] 求和)的時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 一次查詢會碰觸 O(log n) 個標準節點。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "只有預先算好的前綴和陣列能 O(1) 求和,但它無法便宜地處理更新。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "那是樸素掃描;線段樹正是要避免它。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是多次查詢或排序的成本,不是單次查詢。"
          }
        ],
        "generalFeedback": "線段樹把任一區間分解為 O(log n) 個節點,故區間查詢與單點更新皆為 O(log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線段樹建樹與空間",
        "text": "<p>對 n 個元素的陣列,線段樹典型的<strong>建樹時間</strong>與<strong>空間</strong>為何?</p>",
        "answers": [
          {
            "text": "建樹 O(n),空間 O(n)(約 2n–4n 個節點)",
            "fraction": 100,
            "feedback": "正確 —— 由下而上建樹為線性,節點數為 O(n)。"
          },
          {
            "text": "建樹 O(n log n),空間 O(n log n)",
            "fraction": 0,
            "feedback": "一般線段樹建樹為 O(n)、空間 O(n)。"
          },
          {
            "text": "建樹 O(log n),空間 O(log n)",
            "fraction": 0,
            "feedback": "建樹至少要走訪每個元素,故建樹為 O(n)。"
          },
          {
            "text": "建樹 O(n^2),空間 O(n^2)",
            "fraction": 0,
            "feedback": "太多了;此結構空間為線性。"
          }
        ],
        "generalFeedback": "建立線段樹為 O(n),約儲存 2n–4n 個節點,即 O(n) 空間。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "懶惰傳遞用途",
        "text": "<p>在線段樹中,<strong>懶惰傳遞(lazy propagation)</strong>能達成什麼?</p>",
        "answers": [
          {
            "text": "藉由把待處理更新延後傳給子節點,以 O(log n) 完成區間更新",
            "fraction": 100,
            "feedback": "正確 —— 對整個區間先標記節點,需要時才向下推送。"
          },
          {
            "text": "以 O(n) 對底層陣列排序",
            "fraction": 0,
            "feedback": "線段樹不會對陣列排序。"
          },
          {
            "text": "把空間從 O(n) 降到 O(log n)",
            "fraction": 0,
            "feedback": "懶惰傳遞影響的是更新時間,而非漸進空間。"
          },
          {
            "text": "讓單點查詢變成 O(1)",
            "fraction": 0,
            "feedback": "查詢仍為 O(log n);懶惰傳遞針對的是區間更新。"
          }
        ],
        "generalFeedback": "沒有懶惰傳遞時,一次區間更新會碰到 O(n) 個葉節點;有了它,更新會被延後並惰性向下推,使區間更新為 O(log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線段樹與 Fenwick 的一般性",
        "text": "<p>相較於 Fenwick 樹(BIT),線段樹更為一般,因為它可直接支援:</p>",
        "answers": [
          {
            "text": "任何可結合的區間聚合,例如區間最小值或最大值",
            "fraction": 100,
            "feedback": "正確 —— 線段樹可處理 min/max/gcd 等,不只是可逆的求和。"
          },
          {
            "text": "只有前綴和,別無其他",
            "fraction": 0,
            "feedback": "那較接近 Fenwick 樹擅長的部分。"
          },
          {
            "text": "對鍵做雜湊以達 O(1) 查找",
            "fraction": 0,
            "feedback": "那是雜湊表,與線段樹無關。"
          },
          {
            "text": "對鍵做有序的前驅/後繼查詢",
            "fraction": 0,
            "feedback": "那是平衡 BST 的工作,不是線段樹的職責。"
          }
        ],
        "generalFeedback": "線段樹支援對區間的任何可結合聚合(sum、min、max、gcd……),因此比 Fenwick 樹更一般。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線段樹性質(複選)",
        "text": "<p>關於線段樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "它是一棵二元樹,節點代表陣列的區間",
            "fraction": 50,
            "feedback": "正確 —— 每個內部節點涵蓋其子節點區間的聯集。"
          },
          {
            "text": "區間查詢與單點更新各為 O(log n)",
            "fraction": 50,
            "feedback": "正確 —— 兩種操作都碰觸 O(log n) 個節點。"
          },
          {
            "text": "它要求底層陣列必須保持已排序",
            "fraction": -50,
            "feedback": "錯 —— 陣列以位置索引,而非依值排序。"
          },
          {
            "text": "它能回答區間求和,但永遠無法回答區間最小值",
            "fraction": -50,
            "feedback": "錯 —— 它處理 min/max 就跟 sum 一樣容易。"
          }
        ],
        "generalFeedback": "線段樹是一棵區間二元樹,對任何可結合聚合提供 O(log n) 的區間查詢與更新,且不需排序。",
        "single": false
      },
      {
        "type": "truefalse",
        "name": "線段樹區間更新",
        "text": "<p>搭配懶惰傳遞,線段樹能以 O(log n) 完成一次區間更新。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 待處理更新被延後並向下推送,故區間更新為 O(log n)。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "懶惰傳遞確實能提供 O(log n) 的區間更新。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "線段樹只能求和",
        "text": "<p>線段樹只能計算區間和,無法支援區間最小值或最大值查詢。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 線段樹支援任何可結合聚合,包括 min 與 max。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— sum、min、max、gcd 等可結合聚合都行。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "懶惰技術名詞",
        "text": "<p>把待處理的區間更新延後傳給子節點、從而達成 O(log n) 區間更新的技術,稱為 lazy ______。</p>",
        "answers": [
          {
            "text": "propagation",
            "fraction": 100,
            "feedback": "正確 —— lazy propagation(懶惰傳遞)。"
          },
          {
            "text": "propagation*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      }
    ]
  },
  "tree-splay": {
    "en": [
      {
        "type": "multichoice",
        "name": "Splay what it is",
        "text": "<p>What best describes a <strong>splay tree</strong>?</p>",
        "answers": [
          {
            "text": "A self-adjusting BST that rotates each accessed node up to the root",
            "fraction": 100,
            "feedback": "Correct — the splay operation moves the accessed node to the root."
          },
          {
            "text": "A BST that stores a balance factor in every node",
            "fraction": 0,
            "feedback": "That is an AVL tree; splay trees store no balance metadata."
          },
          {
            "text": "A tree that colors nodes red and black",
            "fraction": 0,
            "feedback": "That is a red-black tree, not a splay tree."
          },
          {
            "text": "A hash table with tree-based buckets",
            "fraction": 0,
            "feedback": "A splay tree is a search tree, not a hash structure."
          }
        ],
        "generalFeedback": "A splay tree is a self-adjusting BST; every access splays (rotates) the touched node up to the root, storing no explicit balance or color data.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Splay amortized complexity",
        "text": "<p>What is the <strong>amortized</strong> time complexity of a splay tree operation?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "Correct — amortized over a sequence of operations, each costs O(log n)."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "Access still touches a path proportional to depth on average."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "A single op can be O(n), but the amortized cost is O(log n)."
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "That is a sorting bound, not a single amortized operation."
          }
        ],
        "generalFeedback": "Splay trees guarantee O(log n) amortized per operation; individual operations can be more expensive but average out over a sequence.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Splay worst-case single operation",
        "text": "<p>What is the <strong>worst-case</strong> cost of a single splay-tree operation (not amortized)?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "Correct — one operation can traverse a long path, though the amortized cost is O(log n)."
          },
          {
            "text": "O(log n) guaranteed for every single operation",
            "fraction": 0,
            "feedback": "That is AVL/red-black; splay only guarantees O(log n) amortized."
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "A single access may follow a path of length up to n."
          },
          {
            "text": "O(sqrt n)",
            "fraction": 0,
            "feedback": "The worst single operation is linear, not sublinear."
          }
        ],
        "generalFeedback": "Unlike AVL or red-black trees, a splay tree gives no per-operation worst-case guarantee; a single operation can be O(n) while the amortized cost stays O(log n).",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Splay locality benefit",
        "text": "<p>What practical advantage does the splay-to-root policy give?</p>",
        "answers": [
          {
            "text": "Recently accessed keys become fast to reach again (good working-set/locality performance)",
            "fraction": 100,
            "feedback": "Correct — splaying keeps hot keys near the root."
          },
          {
            "text": "It guarantees the tree is always perfectly balanced",
            "fraction": 0,
            "feedback": "Splay trees are not height-balanced; they are self-adjusting."
          },
          {
            "text": "It removes the need to store keys at all",
            "fraction": 0,
            "feedback": "Keys are still stored in every node."
          },
          {
            "text": "It makes every operation strictly O(1)",
            "fraction": 0,
            "feedback": "Operations are O(log n) amortized, not O(1)."
          }
        ],
        "generalFeedback": "Because each access moves a key to the root, frequently or recently used keys stay shallow, giving strong working-set and locality-of-reference performance.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Splay stores no balance info",
        "text": "<p>A splay tree needs no extra per-node balance factor or color bit; balance emerges purely from the splaying rotations.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — splay trees store no explicit balance or color metadata."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "Splay trees really do avoid extra balance metadata; the splay operation alone maintains amortized balance."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Splay per-operation guarantee",
        "text": "<p>A splay tree guarantees O(log n) time for every individual operation, just like an AVL tree.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — splay trees only give O(log n) amortized; a single operation can be O(n)."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — the O(log n) bound is amortized, not per-operation."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Splay operation term",
        "text": "<p>What is the name of the operation (one word) that rotates an accessed node up to the root of the tree? ______.</p>",
        "answers": [
          {
            "text": "splay",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "splay*",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "splaying",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Splay properties multi-select",
        "text": "<p>Which statements about splay trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Each operation runs in O(log n) amortized time",
            "fraction": 50,
            "feedback": "Yes — amortized over a sequence of operations."
          },
          {
            "text": "Recently accessed keys are cheap to access again",
            "fraction": 50,
            "feedback": "Yes — splaying gives good working-set/locality behavior."
          },
          {
            "text": "Every single operation is guaranteed O(log n) in the worst case",
            "fraction": -50,
            "feedback": "No — a single operation can be O(n); only the amortized cost is O(log n)."
          },
          {
            "text": "Each node stores a red/black color or a balance factor",
            "fraction": -50,
            "feedback": "No — splay trees keep no explicit balance or color metadata."
          }
        ],
        "generalFeedback": "Splay trees give O(log n) amortized operations and fast repeat access to recent keys, but no per-operation worst-case guarantee, and they store no balance or color data.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "伸展樹是什麼",
        "text": "<p>以下何者最能描述<strong>伸展樹(splay tree)</strong>?</p>",
        "answers": [
          {
            "text": "一種自我調整的 BST,將每次被存取的節點旋轉到根",
            "fraction": 100,
            "feedback": "正確 —— 伸展操作會把被存取的節點移到根。"
          },
          {
            "text": "一種在每個節點儲存平衡因子的 BST",
            "fraction": 0,
            "feedback": "那是 AVL 樹;伸展樹不儲存平衡資訊。"
          },
          {
            "text": "一種為節點著紅黑色的樹",
            "fraction": 0,
            "feedback": "那是紅黑樹,不是伸展樹。"
          },
          {
            "text": "一種以樹為桶的雜湊表",
            "fraction": 0,
            "feedback": "伸展樹是搜尋樹,不是雜湊結構。"
          }
        ],
        "generalFeedback": "伸展樹是自我調整的 BST;每次存取都會將被觸及的節點伸展(旋轉)到根,且不儲存明確的平衡或顏色資料。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "伸展樹攤還複雜度",
        "text": "<p>伸展樹操作的<strong>攤還(amortized)</strong>時間複雜度為何?</p>",
        "answers": [
          {
            "text": "O(log n)",
            "fraction": 100,
            "feedback": "正確 —— 在一連串操作上攤還,每次為 O(log n)。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "存取平均仍需觸及與深度成正比的路徑。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "單一操作可能為 O(n),但攤還成本為 O(log n)。"
          },
          {
            "text": "O(n log n)",
            "fraction": 0,
            "feedback": "那是排序的界,不是單一攤還操作。"
          }
        ],
        "generalFeedback": "伸展樹保證每次操作攤還為 O(log n);個別操作可能較貴,但在一連串操作上平均下來為 O(log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "伸展樹單一操作最差情況",
        "text": "<p>伸展樹單一操作的<strong>最差情況</strong>成本(非攤還)為何?</p>",
        "answers": [
          {
            "text": "O(n)",
            "fraction": 100,
            "feedback": "正確 —— 單一操作可能走過一條很長的路徑,雖然攤還成本為 O(log n)。"
          },
          {
            "text": "每一次單一操作都保證 O(log n)",
            "fraction": 0,
            "feedback": "那是 AVL/紅黑樹;伸展樹只保證攤還 O(log n)。"
          },
          {
            "text": "O(1)",
            "fraction": 0,
            "feedback": "單一存取可能沿長度達 n 的路徑走。"
          },
          {
            "text": "O(sqrt n)",
            "fraction": 0,
            "feedback": "最差的單一操作是線性,不是次線性。"
          }
        ],
        "generalFeedback": "與 AVL 或紅黑樹不同,伸展樹不提供每次操作的最差情況保證;單一操作可能為 O(n),而攤還成本仍為 O(log n)。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "伸展樹的區域性優勢",
        "text": "<p>「伸展到根」的策略帶來什麼實務優勢?</p>",
        "answers": [
          {
            "text": "最近存取過的鍵值再次存取會很快(良好的工作集/區域性效能)",
            "fraction": 100,
            "feedback": "正確 —— 伸展讓熱門鍵值靠近根。"
          },
          {
            "text": "保證樹永遠完美平衡",
            "fraction": 0,
            "feedback": "伸展樹並非高度平衡;它是自我調整。"
          },
          {
            "text": "完全不需要儲存鍵值",
            "fraction": 0,
            "feedback": "鍵值仍儲存在每個節點。"
          },
          {
            "text": "使每個操作嚴格為 O(1)",
            "fraction": 0,
            "feedback": "操作是攤還 O(log n),不是 O(1)。"
          }
        ],
        "generalFeedback": "因為每次存取都把鍵值移到根,經常或最近使用的鍵值會保持在淺處,帶來強大的工作集與參考區域性效能。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "伸展樹不儲存平衡資訊",
        "text": "<p>伸展樹不需要每個節點額外的平衡因子或顏色位元;平衡純粹來自伸展的旋轉。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 伸展樹不儲存明確的平衡或顏色資訊。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "伸展樹確實不需額外的平衡資訊;僅靠伸展操作即維持攤還平衡。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "伸展樹的每次操作保證",
        "text": "<p>伸展樹像 AVL 樹一樣,保證每一次個別操作都是 O(log n) 時間。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 伸展樹只提供攤還 O(log n);單一操作可能為 O(n)。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— O(log n) 的界是攤還的,不是每次操作的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "伸展操作名詞",
        "text": "<p>將被存取的節點旋轉到樹根的操作(英文一詞)叫什麼?______。</p>",
        "answers": [
          {
            "text": "splay",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "splay*",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "splaying",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "伸展樹性質複選",
        "text": "<p>關於伸展樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "每次操作以攤還 O(log n) 時間執行",
            "fraction": 50,
            "feedback": "正確 —— 在一連串操作上攤還。"
          },
          {
            "text": "最近存取過的鍵值再次存取很便宜",
            "fraction": 50,
            "feedback": "正確 —— 伸展帶來良好的工作集/區域性表現。"
          },
          {
            "text": "每一次單一操作都保證最差情況 O(log n)",
            "fraction": -50,
            "feedback": "錯 —— 單一操作可能為 O(n);只有攤還成本為 O(log n)。"
          },
          {
            "text": "每個節點儲存紅/黑顏色或平衡因子",
            "fraction": -50,
            "feedback": "錯 —— 伸展樹不儲存明確的平衡或顏色資訊。"
          }
        ],
        "generalFeedback": "伸展樹提供攤還 O(log n) 操作與對近期鍵值的快速重複存取,但不保證每次操作的最差情況,也不儲存平衡或顏色資料。",
        "single": false
      }
    ]
  },
  "tree-ternary": {
    "en": [
      {
        "type": "multichoice",
        "name": "TST children count",
        "text": "<p>How many children does each node of a ternary search tree (TST) have?</p>",
        "answers": [
          {
            "text": "Three: less-than, equal, and greater-than",
            "fraction": 100,
            "feedback": "Correct — hence \"ternary\": low, equal, high."
          },
          {
            "text": "Two: left and right",
            "fraction": 0,
            "feedback": "No — that is a binary search tree; a TST adds a middle (equal) child."
          },
          {
            "text": "One per alphabet character",
            "fraction": 0,
            "feedback": "No — that is a plain trie node; a TST stores one character with three pointers."
          },
          {
            "text": "A variable number labeled with substrings",
            "fraction": 0,
            "feedback": "No — that describes a radix tree, not a TST."
          }
        ],
        "generalFeedback": "Each TST node holds one character and three children: less-than, equal, and greater-than — combining BST-style branching with trie descent.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "TST equal child role",
        "text": "<p>In a TST, what happens when you follow the <strong>equal (middle)</strong> child?</p>",
        "answers": [
          {
            "text": "You advance to the next character of the search key",
            "fraction": 100,
            "feedback": "Correct — the middle/equal child descends one position into the key."
          },
          {
            "text": "You compare the same character against a larger value",
            "fraction": 0,
            "feedback": "No — the greater-than child, not the equal child, does that."
          },
          {
            "text": "You restart the search from the root",
            "fraction": 0,
            "feedback": "No — descent continues; it does not restart."
          },
          {
            "text": "You skip to the end of the key",
            "fraction": 0,
            "feedback": "No — the equal child advances by exactly one character."
          }
        ],
        "generalFeedback": "Taking the equal child means the current character matched, so you move to the next character of the key — that is the trie-descent part of a TST.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "TST vs plain trie space",
        "text": "<p>Compared with a plain trie, a ternary search tree is generally...</p>",
        "answers": [
          {
            "text": "More space-efficient — no full array/map of children per node",
            "fraction": 100,
            "feedback": "Correct — three pointers per node instead of one slot per alphabet symbol."
          },
          {
            "text": "Less space-efficient because of the extra middle child",
            "fraction": 0,
            "feedback": "No — three pointers beat a full per-node child array; TSTs use less space."
          },
          {
            "text": "Identical in memory, differing only in speed",
            "fraction": 0,
            "feedback": "No — the memory profiles differ; TSTs avoid the trie's wide child arrays."
          },
          {
            "text": "Unable to store variable-length strings",
            "fraction": 0,
            "feedback": "No — TSTs store variable-length string keys just fine."
          }
        ],
        "generalFeedback": "A plain trie may reserve a child slot per alphabet symbol at every node; a TST keeps just three pointers per node, so it is more space-efficient.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "TST supported queries",
        "text": "<p>Which capability do ternary search trees support well, like tries?</p>",
        "answers": [
          {
            "text": "Prefix / autocomplete and nearest-neighbour queries",
            "fraction": 100,
            "feedback": "Correct — TSTs support prefix, autocomplete, and near-match lookups."
          },
          {
            "text": "Constant-time hashing of the whole key",
            "fraction": 0,
            "feedback": "No — that is a hash table; a TST walks the key character by character."
          },
          {
            "text": "Range-sum queries over numeric arrays",
            "fraction": 0,
            "feedback": "No — that is a Fenwick/segment tree, not a TST."
          },
          {
            "text": "Maintaining a min-heap of priorities",
            "fraction": 0,
            "feedback": "No — heaps do that, not TSTs."
          }
        ],
        "generalFeedback": "Because it descends by character like a trie, a TST supports prefix queries, autocomplete, and nearest-neighbour (near-match) searches.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "TST middle child advances",
        "text": "<p>In a ternary search tree, following the middle (equal) child advances the search to the next character of the key.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — the equal child is the trie-descent step."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — the middle child does advance to the next character."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "TST is pure BST",
        "text": "<p>A ternary search tree is just an ordinary binary search tree with no trie-like behaviour.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — a TST combines BST-style low/high branching with trie descent through the equal child."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — the equal child gives it trie-style character-by-character descent."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "TST middle-pointer term",
        "text": "<p>In a TST, the middle child that is taken when the current character matches is called the ______ child (one word).</p>",
        "answers": [
          {
            "text": "equal",
            "fraction": 100,
            "feedback": "Correct — the matching path is the equal (middle) child."
          },
          {
            "text": "equal*",
            "fraction": 100,
            "feedback": "Correct — the matching path is the equal (middle) child."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "TST properties",
        "text": "<p>Which statements about ternary search trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Each node stores one character and has three children (low, equal, high)",
            "fraction": 50,
            "feedback": "Yes — that is the TST node structure."
          },
          {
            "text": "They are more space-efficient than a plain trie",
            "fraction": 50,
            "feedback": "Yes — three pointers instead of a full child array per node."
          },
          {
            "text": "Each node holds a full array of children, one per alphabet symbol",
            "fraction": -50,
            "feedback": "No — that is a plain trie; a TST keeps only three pointers."
          },
          {
            "text": "They cannot support prefix or autocomplete queries",
            "fraction": -50,
            "feedback": "No — TSTs support prefix, autocomplete, and nearest-neighbour queries."
          }
        ],
        "generalFeedback": "A TST stores one character per node with low/equal/high children, is more space-efficient than a plain trie, and supports prefix, autocomplete, and near-match queries with lookups around O(L + log n).",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "TST 子節點數目",
        "text": "<p>三元搜尋樹(TST)的每個節點有幾個子節點?</p>",
        "answers": [
          {
            "text": "三個:小於、等於、大於",
            "fraction": 100,
            "feedback": "正確 —— 因此稱「三元」:低、等、高。"
          },
          {
            "text": "兩個:左與右",
            "fraction": 0,
            "feedback": "錯 —— 那是二元搜尋樹;TST 多了一個中間(等於)子節點。"
          },
          {
            "text": "每個字母字元各一個",
            "fraction": 0,
            "feedback": "錯 —— 那是純 trie 節點;TST 每個節點存一個字元並有三個指標。"
          },
          {
            "text": "數目可變,並以子字串標記",
            "fraction": 0,
            "feedback": "錯 —— 那描述的是基數樹,不是 TST。"
          }
        ],
        "generalFeedback": "每個 TST 節點存放一個字元與三個子節點:小於、等於、大於 —— 結合 BST 式分支與 trie 式下降。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "TST 等於子節點的角色",
        "text": "<p>在 TST 中,當你走<strong>等於(中間)</strong>子節點時會發生什麼?</p>",
        "answers": [
          {
            "text": "你前進到搜尋鍵的下一個字元",
            "fraction": 100,
            "feedback": "正確 —— 中間/等於子節點在鍵中下降一個位置。"
          },
          {
            "text": "你將同一個字元與較大的值比較",
            "fraction": 0,
            "feedback": "錯 —— 那是大於子節點做的,不是等於子節點。"
          },
          {
            "text": "你從根重新開始搜尋",
            "fraction": 0,
            "feedback": "錯 —— 下降會繼續;不會重新開始。"
          },
          {
            "text": "你跳到鍵的結尾",
            "fraction": 0,
            "feedback": "錯 —— 等於子節點剛好前進一個字元。"
          }
        ],
        "generalFeedback": "走等於子節點表示目前字元已匹配,因此你移到鍵的下一個字元 —— 這就是 TST 的 trie 式下降部分。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "TST 與純 trie 的空間",
        "text": "<p>相較於純 trie,三元搜尋樹通常...</p>",
        "answers": [
          {
            "text": "更省空間 —— 每個節點不需完整的子節點陣列/對映表",
            "fraction": 100,
            "feedback": "正確 —— 每個節點三個指標,而非每個字母符號一個槽。"
          },
          {
            "text": "因為多了中間子節點而更耗空間",
            "fraction": 0,
            "feedback": "錯 —— 三個指標優於每節點的完整子節點陣列;TST 使用更少空間。"
          },
          {
            "text": "記憶體相同,只在速度上不同",
            "fraction": 0,
            "feedback": "錯 —— 記憶體特性不同;TST 避開 trie 的寬子節點陣列。"
          },
          {
            "text": "無法儲存可變長度字串",
            "fraction": 0,
            "feedback": "錯 —— TST 完全可以儲存可變長度字串鍵。"
          }
        ],
        "generalFeedback": "純 trie 可能在每個節點為每個字母符號保留一個子節點槽;TST 每個節點只保留三個指標,因此更省空間。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "TST 支援的查詢",
        "text": "<p>三元搜尋樹和 trie 一樣,能良好支援哪一種能力?</p>",
        "answers": [
          {
            "text": "前綴 / 自動完成與最近鄰查詢",
            "fraction": 100,
            "feedback": "正確 —— TST 支援前綴、自動完成與近似匹配查找。"
          },
          {
            "text": "對整個鍵做常數時間雜湊",
            "fraction": 0,
            "feedback": "錯 —— 那是雜湊表;TST 逐字元走過鍵。"
          },
          {
            "text": "對數值陣列做區間求和查詢",
            "fraction": 0,
            "feedback": "錯 —— 那是樹狀陣列/線段樹,不是 TST。"
          },
          {
            "text": "維護優先權的最小堆積",
            "fraction": 0,
            "feedback": "錯 —— 那是堆積做的,不是 TST。"
          }
        ],
        "generalFeedback": "由於它像 trie 一樣逐字元下降,TST 支援前綴查詢、自動完成與最近鄰(近似匹配)搜尋。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "TST 中間子節點會前進",
        "text": "<p>在三元搜尋樹中,走中間(等於)子節點會使搜尋前進到鍵的下一個字元。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 等於子節點就是 trie 式下降的步驟。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 中間子節點確實會前進到下一個字元。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "TST 是純 BST",
        "text": "<p>三元搜尋樹只是一棵普通的二元搜尋樹,沒有任何類似 trie 的行為。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— TST 結合 BST 式的低/高分支與經由等於子節點的 trie 式下降。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 等於子節點賦予它 trie 式逐字元下降。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "TST 中間指標術語",
        "text": "<p>在 TST 中,當目前字元匹配時所走的中間子節點稱為 ______ child(請填一個英文單字)。</p>",
        "answers": [
          {
            "text": "equal",
            "fraction": 100,
            "feedback": "正確 —— 匹配的路徑是 equal(中間)子節點。"
          },
          {
            "text": "equal*",
            "fraction": 100,
            "feedback": "正確 —— 匹配的路徑是 equal(中間)子節點。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "TST 性質",
        "text": "<p>關於三元搜尋樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "每個節點存一個字元並有三個子節點(低、等、高)",
            "fraction": 50,
            "feedback": "正確 —— 這就是 TST 的節點結構。"
          },
          {
            "text": "它們比純 trie 更省空間",
            "fraction": 50,
            "feedback": "正確 —— 每節點三個指標,而非完整子節點陣列。"
          },
          {
            "text": "每個節點都放完整的子節點陣列,每個字母符號一個",
            "fraction": -50,
            "feedback": "錯 —— 那是純 trie;TST 只保留三個指標。"
          },
          {
            "text": "它們無法支援前綴或自動完成查詢",
            "fraction": -50,
            "feedback": "錯 —— TST 支援前綴、自動完成與最近鄰查詢。"
          }
        ],
        "generalFeedback": "TST 每個節點存一個字元並有低/等/高子節點,比純 trie 更省空間,並支援前綴、自動完成與近似匹配查詢,查找約為 O(L + log n)。",
        "single": false
      }
    ]
  },
  "tree-threaded": {
    "en": [
      {
        "type": "multichoice",
        "name": "What threads replace",
        "text": "<p>In a threaded binary tree, what do the <strong>threads</strong> reuse or replace?</p>",
        "answers": [
          {
            "text": "The otherwise-NULL child pointers",
            "fraction": 100,
            "feedback": "Correct — pointers that would be NULL are repurposed as threads."
          },
          {
            "text": "The node's data field",
            "fraction": 0,
            "feedback": "No — the payload is untouched; only unused child pointers become threads."
          },
          {
            "text": "The real links to existing children",
            "fraction": 0,
            "feedback": "No — genuine child links are kept; only NULL links become threads."
          },
          {
            "text": "The root pointer of the tree",
            "fraction": 0,
            "feedback": "No — threading concerns the leaf-level NULL child pointers, not the root handle."
          }
        ],
        "generalFeedback": "Threading fills the wasted, otherwise-NULL child pointers with useful links (threads) instead of leaving them empty.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Where a thread points",
        "text": "<p>A thread points to a node's ______ in the traversal order.</p>",
        "answers": [
          {
            "text": "In-order predecessor or successor",
            "fraction": 100,
            "feedback": "Correct — a left thread points to the in-order predecessor, a right thread to the in-order successor."
          },
          {
            "text": "Level-order successor",
            "fraction": 0,
            "feedback": "No — threads follow the in-order sequence, not level-order."
          },
          {
            "text": "The parent node always",
            "fraction": 0,
            "feedback": "No — a thread targets the in-order neighbor, which is not necessarily the parent."
          },
          {
            "text": "The tree's root",
            "fraction": 0,
            "feedback": "No — threads point to adjacent nodes in in-order sequence."
          }
        ],
        "generalFeedback": "A right thread links to the in-order successor and a left thread to the in-order predecessor, so you can walk the tree in in-order without recursion.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Main benefit of threading",
        "text": "<p>What is the main benefit of a threaded binary tree?</p>",
        "answers": [
          {
            "text": "In-order traversal without recursion or an explicit stack, in O(1) extra space",
            "fraction": 100,
            "feedback": "Correct — threads let you find the next node directly."
          },
          {
            "text": "It makes search O(1) in the worst case",
            "fraction": 0,
            "feedback": "No — search cost is unchanged by threading."
          },
          {
            "text": "It removes the need to store any data in nodes",
            "fraction": 0,
            "feedback": "No — data is still stored; only NULL pointers are reused."
          },
          {
            "text": "It automatically balances the tree",
            "fraction": 0,
            "feedback": "No — threading does not change the tree's shape or balance."
          }
        ],
        "generalFeedback": "Because each thread points at the in-order successor/predecessor, you can traverse in-order iteratively using O(1) extra space.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Distinguishing thread from child",
        "text": "<p>How does the structure tell a real child link apart from a thread?</p>",
        "answers": [
          {
            "text": "A boolean flag per pointer marks it as a child link or a thread",
            "fraction": 100,
            "feedback": "Correct — each node stores a tag bit for its left and right pointers."
          },
          {
            "text": "Threads are always NULL",
            "fraction": 0,
            "feedback": "No — a thread is a non-NULL link; that is the whole point."
          },
          {
            "text": "By comparing the pointer's numeric address to the root",
            "fraction": 0,
            "feedback": "No — a per-pointer flag is what marks the difference, not address arithmetic."
          },
          {
            "text": "Real children are stored in a separate array",
            "fraction": 0,
            "feedback": "No — both kinds share the same pointer field, distinguished by a flag."
          }
        ],
        "generalFeedback": "Each pointer carries a tag (e.g. isThread) so traversal knows whether to descend into a child or follow a thread.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Traversal without a stack",
        "text": "<p>A threaded binary tree enables in-order traversal without recursion or an explicit stack.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — threads provide the next in-order node directly, using O(1) extra space."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It does — that is the primary purpose of threading."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Threads follow level-order",
        "text": "<p>In a threaded binary tree, a thread points to the node's level-order successor.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — threads follow the in-order sequence, not level-order."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — a thread points to the in-order predecessor or successor."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Name of the substitute pointer",
        "text": "<p>The special link that replaces an otherwise-NULL child pointer and points to an in-order neighbor is called a ______.</p>",
        "answers": [
          {
            "text": "thread",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "threads",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "thread*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Facts about threaded trees",
        "text": "<p>Which statements about threaded binary trees are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Threads reuse pointers that would otherwise be NULL",
            "fraction": 50,
            "feedback": "Yes — wasted NULL child pointers become threads."
          },
          {
            "text": "A boolean flag distinguishes a thread from a real child link",
            "fraction": 50,
            "feedback": "Yes — each pointer carries a tag bit."
          },
          {
            "text": "Threading requires an auxiliary stack proportional to tree height",
            "fraction": -50,
            "feedback": "No — the point of threading is O(1) extra space with no stack."
          },
          {
            "text": "Threads point to a node's level-order successor",
            "fraction": -50,
            "feedback": "No — threads point to in-order predecessor/successor."
          }
        ],
        "generalFeedback": "Threads fill NULL child pointers, are marked by a flag, target in-order neighbors, and permit stackless in-order traversal in O(1) space.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "線索取代了什麼",
        "text": "<p>在引線二元樹(threaded binary tree)中,<strong>線索(thread)</strong>重複利用或取代了什麼?</p>",
        "answers": [
          {
            "text": "原本會是 NULL 的子節點指標",
            "fraction": 100,
            "feedback": "正確 —— 原本會是 NULL 的指標被改用為線索。"
          },
          {
            "text": "節點的資料欄位",
            "fraction": 0,
            "feedback": "錯 —— 資料不受影響;只有未使用的子節點指標會變成線索。"
          },
          {
            "text": "連往現有子節點的真實連結",
            "fraction": 0,
            "feedback": "錯 —— 真正的子節點連結會保留;只有 NULL 連結會變成線索。"
          },
          {
            "text": "整棵樹的根指標",
            "fraction": 0,
            "feedback": "錯 —— 引線處理的是葉層那些 NULL 子指標,而非根的把手。"
          }
        ],
        "generalFeedback": "引線會把浪費掉、原本為 NULL 的子指標填入有用的連結(線索),而不是讓它們空著。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "線索指向何處",
        "text": "<p>線索會指向某節點在走訪順序上的 ______。</p>",
        "answers": [
          {
            "text": "中序前驅或後繼",
            "fraction": 100,
            "feedback": "正確 —— 左線索指向中序前驅,右線索指向中序後繼。"
          },
          {
            "text": "層序後繼",
            "fraction": 0,
            "feedback": "錯 —— 線索遵循中序順序,而非層序。"
          },
          {
            "text": "永遠是父節點",
            "fraction": 0,
            "feedback": "錯 —— 線索指向中序上的鄰居,不一定是父節點。"
          },
          {
            "text": "樹的根",
            "fraction": 0,
            "feedback": "錯 —— 線索指向中序順序上相鄰的節點。"
          }
        ],
        "generalFeedback": "右線索連往中序後繼、左線索連往中序前驅,因此不需遞迴也能以中序走訪整棵樹。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "引線的主要好處",
        "text": "<p>引線二元樹的主要好處為何?</p>",
        "answers": [
          {
            "text": "不需遞迴或明確堆疊即可中序走訪,且只用 O(1) 額外空間",
            "fraction": 100,
            "feedback": "正確 —— 線索讓你能直接找到下一個節點。"
          },
          {
            "text": "它讓搜尋在最差情況下變成 O(1)",
            "fraction": 0,
            "feedback": "錯 —— 引線不會改變搜尋成本。"
          },
          {
            "text": "它讓節點不再需要儲存任何資料",
            "fraction": 0,
            "feedback": "錯 —— 資料仍需儲存;只有 NULL 指標被重複利用。"
          },
          {
            "text": "它會自動平衡這棵樹",
            "fraction": 0,
            "feedback": "錯 —— 引線不會改變樹的形狀或平衡。"
          }
        ],
        "generalFeedback": "由於每條線索指向中序後繼/前驅,你可以用 O(1) 額外空間以迭代方式進行中序走訪。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "區分線索與子連結",
        "text": "<p>資料結構如何區分真正的子連結與線索?</p>",
        "answers": [
          {
            "text": "每個指標附帶一個布林旗標,標示它是子連結還是線索",
            "fraction": 100,
            "feedback": "正確 —— 每個節點為其左、右指標各存一個標記位元。"
          },
          {
            "text": "線索永遠是 NULL",
            "fraction": 0,
            "feedback": "錯 —— 線索是非 NULL 的連結,這正是重點所在。"
          },
          {
            "text": "比較指標的數值位址與根的位址",
            "fraction": 0,
            "feedback": "錯 —— 用來標示差異的是每個指標的旗標,而非位址運算。"
          },
          {
            "text": "真正的子節點存放在另一個陣列中",
            "fraction": 0,
            "feedback": "錯 —— 兩者共用同一個指標欄位,由旗標區分。"
          }
        ],
        "generalFeedback": "每個指標帶有一個標記(例如 isThread),讓走訪知道要往子節點下降,還是沿著線索前進。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "不需堆疊即可走訪",
        "text": "<p>引線二元樹可以在不使用遞迴或明確堆疊的情況下進行中序走訪。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 線索直接提供下一個中序節點,只用 O(1) 額外空間。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "確實可以 —— 這正是引線的主要目的。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "線索遵循層序",
        "text": "<p>在引線二元樹中,線索指向該節點的層序後繼。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 線索遵循中序順序,而非層序。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 線索指向中序前驅或後繼。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "替代指標的名稱",
        "text": "<p>取代原本會是 NULL 的子指標、並指向中序鄰居的特殊連結稱為 ______。請以英文作答。</p>",
        "answers": [
          {
            "text": "thread",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "threads",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "thread*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "關於引線樹的事實",
        "text": "<p>關於引線二元樹,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "線索重複利用原本會是 NULL 的指標",
            "fraction": 50,
            "feedback": "正確 —— 浪費掉的 NULL 子指標變成線索。"
          },
          {
            "text": "用一個布林旗標區分線索與真正的子連結",
            "fraction": 50,
            "feedback": "正確 —— 每個指標帶有一個標記位元。"
          },
          {
            "text": "引線需要一個與樹高成正比的輔助堆疊",
            "fraction": -50,
            "feedback": "錯 —— 引線的重點正是 O(1) 額外空間、不需堆疊。"
          },
          {
            "text": "線索指向節點的層序後繼",
            "fraction": -50,
            "feedback": "錯 —— 線索指向中序前驅/後繼。"
          }
        ],
        "generalFeedback": "線索填入 NULL 子指標、以旗標標示、指向中序鄰居,並允許以 O(1) 空間進行不需堆疊的中序走訪。",
        "single": false
      }
    ]
  },
  "tree-traversal": {
    "en": [
      {
        "type": "multichoice",
        "name": "In-order of a BST",
        "text": "<p>Performing an <strong>in-order</strong> traversal of a binary <em>search</em> tree visits the keys in what order?</p>",
        "answers": [
          {
            "text": "Ascending sorted order",
            "fraction": 100,
            "feedback": "Correct — in-order (left, root, right) on a BST yields keys sorted ascending."
          },
          {
            "text": "The order the keys were inserted",
            "fraction": 0,
            "feedback": "No — insertion order is not preserved by an in-order walk."
          },
          {
            "text": "Descending sorted order",
            "fraction": 0,
            "feedback": "No — that would require visiting right before left."
          },
          {
            "text": "Level by level from the root",
            "fraction": 0,
            "feedback": "That is level-order, not in-order."
          }
        ],
        "generalFeedback": "Because a BST keeps smaller keys left and larger keys right, visiting left, root, then right produces keys in ascending sorted order.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Pre-order visit sequence",
        "text": "<p>In a <strong>pre-order</strong> traversal, in what order is each node's work performed?</p>",
        "answers": [
          {
            "text": "Root, then left subtree, then right subtree",
            "fraction": 100,
            "feedback": "Correct — pre-order processes the root before its children."
          },
          {
            "text": "Left subtree, then root, then right subtree",
            "fraction": 0,
            "feedback": "That is in-order."
          },
          {
            "text": "Left subtree, then right subtree, then root",
            "fraction": 0,
            "feedback": "That is post-order."
          },
          {
            "text": "Right subtree, then root, then left subtree",
            "fraction": 0,
            "feedback": "That is reverse in-order, not pre-order."
          }
        ],
        "generalFeedback": "Pre-order = root, left, right. It is handy for copying a tree or printing a prefix expression.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Traversal needing a queue",
        "text": "<p>Which traversal visits the tree level by level and is naturally implemented with a <strong>queue</strong>?</p>",
        "answers": [
          {
            "text": "Level-order (breadth-first) traversal",
            "fraction": 100,
            "feedback": "Correct — enqueue the root, then repeatedly dequeue a node and enqueue its children."
          },
          {
            "text": "Pre-order traversal",
            "fraction": 0,
            "feedback": "No — recursive DFS uses the call stack, not a queue."
          },
          {
            "text": "In-order traversal",
            "fraction": 0,
            "feedback": "No — in-order is a depth-first order backed by a stack."
          },
          {
            "text": "Post-order traversal",
            "fraction": 0,
            "feedback": "No — post-order is depth-first and uses a stack."
          }
        ],
        "generalFeedback": "Level-order / BFS uses a FIFO queue; the depth-first orders (pre/in/post) use the call stack or an explicit stack.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Purpose of post-order",
        "text": "<p>Why is <strong>post-order</strong> traversal the right choice for freeing a tree or evaluating an expression tree?</p>",
        "answers": [
          {
            "text": "It processes both children before their parent",
            "fraction": 100,
            "feedback": "Correct — left, right, then root means children are handled before the node that owns them."
          },
          {
            "text": "It processes the parent before either child",
            "fraction": 0,
            "feedback": "That is pre-order, which would free a parent before its children."
          },
          {
            "text": "It visits nodes level by level",
            "fraction": 0,
            "feedback": "That is level-order, not post-order."
          },
          {
            "text": "It only visits leaf nodes",
            "fraction": 0,
            "feedback": "No — post-order visits every node, internal and leaf."
          }
        ],
        "generalFeedback": "Post-order = left, right, root. Handling children first lets you free their memory, or compute their values, before the parent needs them.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "In-order yields sorted keys",
        "text": "<p>An in-order traversal of a binary search tree outputs its keys in ascending sorted order.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — left, root, right on a BST yields sorted keys."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "It does — that is a defining property of a BST in-order walk."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Level-order uses a stack",
        "text": "<p>Level-order (breadth-first) traversal is naturally implemented with a stack.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — a stack (LIFO) would give a depth-first order, not level-order."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — level-order uses a FIFO queue; a stack would produce a depth-first traversal."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Sorted-order traversal name",
        "text": "<p>Which depth-first traversal (name it) visits a BST's keys in ascending sorted order? Answer with the traversal name.</p>",
        "answers": [
          {
            "text": "in-order",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "inorder",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "in order",
            "fraction": 100,
            "feedback": "Correct."
          },
          {
            "text": "in-order*",
            "fraction": 100,
            "feedback": "Correct."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Facts about DFS orders",
        "text": "<p>Which statements about tree traversals are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Pre-order processes the root before its subtrees",
            "fraction": 50,
            "feedback": "Yes — pre-order is root, left, right."
          },
          {
            "text": "Post-order processes the root after both subtrees",
            "fraction": 50,
            "feedback": "Yes — post-order is left, right, root."
          },
          {
            "text": "In-order processes the root before its left subtree",
            "fraction": -50,
            "feedback": "No — in-order is left, root, right, so the left subtree comes first."
          },
          {
            "text": "Level-order is naturally implemented with a stack",
            "fraction": -50,
            "feedback": "No — level-order uses a queue."
          }
        ],
        "generalFeedback": "Pre = root/left/right, in = left/root/right, post = left/right/root. The DFS orders use a stack; level-order/BFS uses a queue.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "二元搜尋樹的中序走訪",
        "text": "<p>對一棵二元<em>搜尋</em>樹進行<strong>中序(in-order)</strong>走訪,會以什麼順序拜訪各鍵值?</p>",
        "answers": [
          {
            "text": "由小到大的排序順序",
            "fraction": 100,
            "feedback": "正確 —— 對 BST 進行中序(左、根、右)會得到由小到大排序的鍵值。"
          },
          {
            "text": "鍵值被插入的順序",
            "fraction": 0,
            "feedback": "錯 —— 中序走訪並不會保留插入順序。"
          },
          {
            "text": "由大到小的排序順序",
            "fraction": 0,
            "feedback": "錯 —— 那需要先拜訪右子樹再拜訪左子樹。"
          },
          {
            "text": "從根開始一層一層地拜訪",
            "fraction": 0,
            "feedback": "那是層序(level-order),不是中序。"
          }
        ],
        "generalFeedback": "由於 BST 把較小的鍵放在左邊、較大的放在右邊,依左、根、右拜訪即可得到由小到大的排序結果。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "前序的拜訪順序",
        "text": "<p>在<strong>前序(pre-order)</strong>走訪中,每個節點的處理順序為何?</p>",
        "answers": [
          {
            "text": "根,然後左子樹,再右子樹",
            "fraction": 100,
            "feedback": "正確 —— 前序會在拜訪子節點之前先處理根。"
          },
          {
            "text": "左子樹,然後根,再右子樹",
            "fraction": 0,
            "feedback": "那是中序。"
          },
          {
            "text": "左子樹,然後右子樹,再根",
            "fraction": 0,
            "feedback": "那是後序。"
          },
          {
            "text": "右子樹,然後根,再左子樹",
            "fraction": 0,
            "feedback": "那是反向中序,不是前序。"
          }
        ],
        "generalFeedback": "前序 = 根、左、右。適合用於複製樹或列印前綴(prefix)運算式。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "需要佇列的走訪",
        "text": "<p>哪一種走訪會一層一層地拜訪樹,並自然地以<strong>佇列(queue)</strong>實作?</p>",
        "answers": [
          {
            "text": "層序(廣度優先)走訪",
            "fraction": 100,
            "feedback": "正確 —— 先將根入列,再反覆出列一個節點並將其子節點入列。"
          },
          {
            "text": "前序走訪",
            "fraction": 0,
            "feedback": "錯 —— 遞迴的 DFS 使用呼叫堆疊,而非佇列。"
          },
          {
            "text": "中序走訪",
            "fraction": 0,
            "feedback": "錯 —— 中序是深度優先,以堆疊為後盾。"
          },
          {
            "text": "後序走訪",
            "fraction": 0,
            "feedback": "錯 —— 後序是深度優先,使用堆疊。"
          }
        ],
        "generalFeedback": "層序 / BFS 使用先進先出的佇列;深度優先的順序(前/中/後序)則使用呼叫堆疊或明確的堆疊。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "後序的用途",
        "text": "<p>為什麼<strong>後序(post-order)</strong>走訪最適合用來釋放整棵樹或求值運算式樹?</p>",
        "answers": [
          {
            "text": "它會在處理父節點之前先處理兩個子節點",
            "fraction": 100,
            "feedback": "正確 —— 左、右、根表示會在處理擁有子節點的父節點之前先處理子節點。"
          },
          {
            "text": "它會在處理任一子節點之前先處理父節點",
            "fraction": 0,
            "feedback": "那是前序,會在子節點之前就釋放父節點。"
          },
          {
            "text": "它一層一層地拜訪節點",
            "fraction": 0,
            "feedback": "那是層序,不是後序。"
          },
          {
            "text": "它只拜訪葉節點",
            "fraction": 0,
            "feedback": "錯 —— 後序會拜訪所有節點,包含內部節點與葉節點。"
          }
        ],
        "generalFeedback": "後序 = 左、右、根。先處理子節點,才能在父節點需要之前釋放其記憶體或計算其值。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "中序產生排序鍵值",
        "text": "<p>對二元搜尋樹進行中序走訪,會依由小到大的排序順序輸出其鍵值。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 對 BST 依左、根、右走訪會得到排序後的鍵值。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "確實會 —— 這是 BST 中序走訪的定義性性質。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "層序使用堆疊",
        "text": "<p>層序(廣度優先)走訪自然地以堆疊實作。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— 堆疊(後進先出)會產生深度優先的順序,而非層序。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— 層序使用先進先出的佇列;堆疊會產生深度優先的走訪。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "產生排序順序的走訪名稱",
        "text": "<p>哪一種深度優先走訪(請寫出名稱)會以由小到大的排序順序拜訪 BST 的鍵值?請以走訪名稱作答(英文)。</p>",
        "answers": [
          {
            "text": "in-order",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "inorder",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "in order",
            "fraction": 100,
            "feedback": "正確。"
          },
          {
            "text": "in-order*",
            "fraction": 100,
            "feedback": "正確。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "關於 DFS 順序的事實",
        "text": "<p>關於樹的走訪,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "前序會在其子樹之前先處理根",
            "fraction": 50,
            "feedback": "正確 —— 前序是根、左、右。"
          },
          {
            "text": "後序會在兩個子樹之後才處理根",
            "fraction": 50,
            "feedback": "正確 —— 後序是左、右、根。"
          },
          {
            "text": "中序會在其左子樹之前先處理根",
            "fraction": -50,
            "feedback": "錯 —— 中序是左、根、右,左子樹先處理。"
          },
          {
            "text": "層序自然地以堆疊實作",
            "fraction": -50,
            "feedback": "錯 —— 層序使用佇列。"
          }
        ],
        "generalFeedback": "前序 = 根/左/右,中序 = 左/根/右,後序 = 左/右/根。DFS 順序使用堆疊;層序 / BFS 使用佇列。",
        "single": false
      }
    ]
  },
  "tree-trie": {
    "en": [
      {
        "type": "multichoice",
        "name": "Trie lookup complexity",
        "text": "<p>In a trie storing <em>n</em> keys, what is the time to search for a key of length <strong>L</strong>?</p>",
        "answers": [
          {
            "text": "O(L)",
            "fraction": 100,
            "feedback": "Correct — you follow one edge per character, independent of n."
          },
          {
            "text": "O(L log n)",
            "fraction": 0,
            "feedback": "No — a trie needs no comparisons against other keys; the number of stored keys does not appear."
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "No — the cost depends on the key length, not on how many keys are stored."
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "No — that is a balanced-BST bound; a trie descends one node per character."
          }
        ],
        "generalFeedback": "A trie descends exactly one edge per character of the query key, so search, insert, and delete are all O(L), independent of the number n of stored keys.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Trie edge meaning",
        "text": "<p>In a standard trie, what does a single <strong>edge</strong> from a node to a child represent?</p>",
        "answers": [
          {
            "text": "One character of a key",
            "fraction": 100,
            "feedback": "Correct — each edge is labeled with a single character."
          },
          {
            "text": "A whole stored key",
            "fraction": 0,
            "feedback": "No — a key is spelled out along a root-to-node path, one character per edge."
          },
          {
            "text": "A comparison result (less/greater)",
            "fraction": 0,
            "feedback": "No — a trie is not comparison-based; edges are indexed by character."
          },
          {
            "text": "A compressed substring",
            "fraction": 0,
            "feedback": "No — that describes a radix/compressed trie, not a standard trie."
          }
        ],
        "generalFeedback": "A trie stores strings by shared prefixes; each edge carries one character, and a key is read off the path from the root.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Trie strength",
        "text": "<p>Which operation is a trie <strong>especially well suited</strong> for?</p>",
        "answers": [
          {
            "text": "Prefix queries / autocomplete",
            "fraction": 100,
            "feedback": "Correct — all keys sharing a prefix live under one subtree."
          },
          {
            "text": "Range-sum over numeric values",
            "fraction": 0,
            "feedback": "No — that is a job for a Fenwick/segment tree, not a trie."
          },
          {
            "text": "Finding the median of a set of numbers",
            "fraction": 0,
            "feedback": "No — tries index strings by character, not by numeric order statistics."
          },
          {
            "text": "Hashing keys to O(1) buckets",
            "fraction": 0,
            "feedback": "No — that describes a hash table; a trie walks the key character by character."
          }
        ],
        "generalFeedback": "Because every key that shares a prefix descends through the same nodes, a trie answers \"all words starting with…\" queries by walking to the prefix node and enumerating its subtree.",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Trie main drawback",
        "text": "<p>What is the main <strong>disadvantage</strong> of a plain trie?</p>",
        "answers": [
          {
            "text": "High space usage — a node or child-map per character position",
            "fraction": 100,
            "feedback": "Correct — a full child array/map at every node is memory-hungry."
          },
          {
            "text": "Search time grows with the number of stored keys",
            "fraction": 0,
            "feedback": "No — search is O(L), independent of n."
          },
          {
            "text": "It requires the keys to be sorted first",
            "fraction": 0,
            "feedback": "No — tries need no pre-sorting; insertion order does not matter."
          },
          {
            "text": "It cannot answer prefix queries",
            "fraction": 0,
            "feedback": "No — prefix queries are exactly what tries excel at."
          }
        ],
        "generalFeedback": "The classic cost of a trie is memory: each node may keep a child slot for every possible character, so many sparsely-used nodes waste space.",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Trie is comparison-based",
        "text": "<p>A trie locates a key by comparing it against other stored keys, like a binary search tree.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "No — a trie is not comparison-based; it indexes into children by the next character."
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "Correct — a trie navigates by character, never comparing whole keys."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Trie search independent of n",
        "text": "<p>Searching a trie for a key of length L takes time proportional to L, regardless of how many keys the trie stores.</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "Correct — the cost is O(L), independent of n."
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "No — the number of stored keys does not affect the O(L) walk."
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Trie alias term",
        "text": "<p>Because it stores strings by their shared leading characters, a trie is also called a ______ tree (one word).</p>",
        "answers": [
          {
            "text": "prefix",
            "fraction": 100,
            "feedback": "Correct — a trie is also known as a prefix tree."
          },
          {
            "text": "prefix*",
            "fraction": 100,
            "feedback": "Correct — a trie is also known as a prefix tree."
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Trie properties",
        "text": "<p>Which statements about tries are true? <em>(select all that apply)</em></p>",
        "answers": [
          {
            "text": "Keys sharing a prefix share the same upper path in the tree",
            "fraction": 50,
            "feedback": "Yes — shared prefixes are stored once."
          },
          {
            "text": "Insert, search, and delete of a length-L key are all O(L)",
            "fraction": 50,
            "feedback": "Yes — one edge per character for every operation."
          },
          {
            "text": "A trie uses less memory than storing the keys in a hash set",
            "fraction": -50,
            "feedback": "No — a plain trie is typically space-hungry, not thrifty."
          },
          {
            "text": "Trie search time grows as O(log n) in the number of keys",
            "fraction": -50,
            "feedback": "No — search is O(L) and does not depend on n."
          }
        ],
        "generalFeedback": "Tries share prefixes, give O(L) operations independent of n, and excel at prefix queries — but they pay for this in space, not memory savings.",
        "single": false
      }
    ],
    "zh": [
      {
        "type": "multichoice",
        "name": "Trie 查找複雜度",
        "text": "<p>在一個儲存 <em>n</em> 個鍵的 trie 中,搜尋一個長度為 <strong>L</strong> 的鍵需要多少時間?</p>",
        "answers": [
          {
            "text": "O(L)",
            "fraction": 100,
            "feedback": "正確 —— 每個字元走一條邊,與 n 無關。"
          },
          {
            "text": "O(L log n)",
            "fraction": 0,
            "feedback": "錯 —— trie 不需與其他鍵做比較,儲存的鍵數不會出現在成本中。"
          },
          {
            "text": "O(n)",
            "fraction": 0,
            "feedback": "錯 —— 成本取決於鍵的長度,而非儲存了多少鍵。"
          },
          {
            "text": "O(log n)",
            "fraction": 0,
            "feedback": "錯 —— 那是平衡 BST 的界;trie 每個字元下降一個節點。"
          }
        ],
        "generalFeedback": "trie 對查詢鍵的每個字元剛好走一條邊,因此搜尋、插入、刪除都是 O(L),與儲存的鍵數 n 無關。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Trie 邊的意義",
        "text": "<p>在標準 trie 中,從一個節點連到子節點的單一<strong>邊</strong>代表什麼?</p>",
        "answers": [
          {
            "text": "鍵的一個字元",
            "fraction": 100,
            "feedback": "正確 —— 每條邊以單一字元標記。"
          },
          {
            "text": "一整個儲存的鍵",
            "fraction": 0,
            "feedback": "錯 —— 一個鍵沿著根到節點的路徑拼出,每條邊一個字元。"
          },
          {
            "text": "一個比較結果(較小/較大)",
            "fraction": 0,
            "feedback": "錯 —— trie 不是基於比較的;邊以字元索引。"
          },
          {
            "text": "一段壓縮後的子字串",
            "fraction": 0,
            "feedback": "錯 —— 那描述的是基數樹(壓縮 trie),不是標準 trie。"
          }
        ],
        "generalFeedback": "trie 以共享前綴儲存字串;每條邊帶一個字元,鍵可從根到節點的路徑讀出。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Trie 的強項",
        "text": "<p>trie <strong>特別適合</strong>哪一種操作?</p>",
        "answers": [
          {
            "text": "前綴查詢 / 自動完成",
            "fraction": 100,
            "feedback": "正確 —— 所有共享前綴的鍵都位於同一棵子樹下。"
          },
          {
            "text": "對數值做區間求和",
            "fraction": 0,
            "feedback": "錯 —— 那是樹狀陣列/線段樹的工作,不是 trie。"
          },
          {
            "text": "找出一組數字的中位數",
            "fraction": 0,
            "feedback": "錯 —— trie 以字元索引字串,而非以數值順序統計。"
          },
          {
            "text": "將鍵雜湊到 O(1) 桶中",
            "fraction": 0,
            "feedback": "錯 —— 那描述的是雜湊表;trie 逐字元走過鍵。"
          }
        ],
        "generalFeedback": "由於每個共享前綴的鍵都經過相同的節點,trie 只要走到前綴節點並列舉其子樹,即可回答「所有以…開頭的字」查詢。",
        "single": true
      },
      {
        "type": "multichoice",
        "name": "Trie 主要缺點",
        "text": "<p>純 trie 的主要<strong>缺點</strong>是什麼?</p>",
        "answers": [
          {
            "text": "空間用量高 —— 每個字元位置都需一個節點或子節點對映表",
            "fraction": 100,
            "feedback": "正確 —— 每個節點都放完整子節點陣列/對映表,非常耗記憶體。"
          },
          {
            "text": "搜尋時間隨儲存鍵數增加",
            "fraction": 0,
            "feedback": "錯 —— 搜尋是 O(L),與 n 無關。"
          },
          {
            "text": "它要求鍵必須先排序",
            "fraction": 0,
            "feedback": "錯 —— trie 不需預先排序;插入順序無所謂。"
          },
          {
            "text": "它無法回答前綴查詢",
            "fraction": 0,
            "feedback": "錯 —— 前綴查詢正是 trie 的強項。"
          }
        ],
        "generalFeedback": "trie 的經典代價是記憶體:每個節點可能為所有可能字元各留一個子節點槽,因此許多稀疏使用的節點浪費空間。",
        "single": true
      },
      {
        "type": "truefalse",
        "name": "Trie 是否基於比較",
        "text": "<p>trie 像二元搜尋樹一樣,透過將鍵與其他已儲存的鍵做比較來定位。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 0,
            "feedback": "錯 —— trie 不是基於比較的;它以下一個字元索引子節點。"
          },
          {
            "text": "false",
            "fraction": 100,
            "feedback": "正確 —— trie 以字元導航,從不比較整個鍵。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "truefalse",
        "name": "Trie 搜尋與 n 無關",
        "text": "<p>在 trie 中搜尋一個長度為 L 的鍵,所需時間與 L 成正比,無論 trie 儲存了多少鍵。</p>",
        "answers": [
          {
            "text": "true",
            "fraction": 100,
            "feedback": "正確 —— 成本是 O(L),與 n 無關。"
          },
          {
            "text": "false",
            "fraction": 0,
            "feedback": "錯 —— 儲存的鍵數不影響這個 O(L) 的走訪。"
          }
        ],
        "generalFeedback": ""
      },
      {
        "type": "shortanswer",
        "name": "Trie 別名術語",
        "text": "<p>因為它以共享的起始字元儲存字串,trie 又稱為 ______ tree(前綴樹,請填一個英文單字)。</p>",
        "answers": [
          {
            "text": "prefix",
            "fraction": 100,
            "feedback": "正確 —— trie 又稱為 prefix tree(前綴樹)。"
          },
          {
            "text": "prefix*",
            "fraction": 100,
            "feedback": "正確 —— trie 又稱為 prefix tree(前綴樹)。"
          }
        ],
        "generalFeedback": "",
        "usecase": false
      },
      {
        "type": "multichoice",
        "name": "Trie 性質",
        "text": "<p>關於 trie,以下哪些敘述正確?<em>(複選)</em></p>",
        "answers": [
          {
            "text": "共享前綴的鍵在樹中共用相同的上層路徑",
            "fraction": 50,
            "feedback": "正確 —— 共享前綴只儲存一次。"
          },
          {
            "text": "長度為 L 的鍵之插入、搜尋、刪除都是 O(L)",
            "fraction": 50,
            "feedback": "正確 —— 每個操作每個字元走一條邊。"
          },
          {
            "text": "trie 比用雜湊集合儲存這些鍵更省記憶體",
            "fraction": -50,
            "feedback": "錯 —— 純 trie 通常耗空間,並不省。"
          },
          {
            "text": "trie 搜尋時間隨鍵數以 O(log n) 成長",
            "fraction": -50,
            "feedback": "錯 —— 搜尋是 O(L),與 n 無關。"
          }
        ],
        "generalFeedback": "trie 共享前綴、提供與 n 無關的 O(L) 操作、擅長前綴查詢 —— 但代價是空間,而非節省記憶體。",
        "single": false
      }
    ]
  }
};
