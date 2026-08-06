---
marp: true
theme: default
paginate: true
math: katex
title: "鄰接矩陣"
category: "Graphs"
---

## 鄰接矩陣

鄰接矩陣以一個 $V\times V$ 的矩陣 $M$ 表示圖：若頂點 $i$ 與 $j$ 之間有邊，$M[i][j]$ 就記錄這條邊（或其權重）。空間為 $O(V^2)$，邊查詢僅需 $O(1)$。

---

## 核心概念

矩陣的第 $i$ 列描述頂點 $i$ 的所有邊；在無向圖中 $M[i][j] = M[j][i]$，因此矩陣沿主對角線對稱。

- 無向圖 ⇒ 對稱矩陣（對角線恆為 0，代表沒有自環）。
- 有權重的圖：格內存權重 $w$ 而非單純的 1；0 仍代表「無邊」。
- 列舉頂點 $i$ 的所有鄰居須掃過整列，花費 $O(V)$。
- 適合稠密圖；圖越稀疏，矩陣中的 0 越多，空間浪費越明顯。

---

## 運作流程

1. 建立 $V\times V$ 的矩陣，所有格子初始化為 0。
2. 加入邊 $(u, v, w)$ 時，設定 `adj[u][v] = w`。
3. 若圖為無向，額外鏡射設定 `adj[v][u] = w`，維持矩陣對稱。
4. 邊查詢 $(i, j)$ 直接讀取 `adj[i][j]`；非 0 即代表有邊（值即為權重）。

<svg id="my-svg" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="flowchart" style="max-width: 1177.03px; background-color: transparent;" viewBox="0 0 1177.03125 140.1015625" role="graphics-document document" aria-roledescription="flowchart-v2"><style>#my-svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;fill:#333;}@keyframes edge-animation-frame{from{stroke-dashoffset:0;}}@keyframes dash{to{stroke-dashoffset:0;}}#my-svg .edge-animation-slow{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 50s linear infinite;stroke-linecap:round;}#my-svg .edge-animation-fast{stroke-dasharray:9,5!important;stroke-dashoffset:900;animation:dash 20s linear infinite;stroke-linecap:round;}#my-svg .error-icon{fill:#552222;}#my-svg .error-text{fill:#552222;stroke:#552222;}#my-svg .edge-thickness-normal{stroke-width:1px;}#my-svg .edge-thickness-thick{stroke-width:3.5px;}#my-svg .edge-pattern-solid{stroke-dasharray:0;}#my-svg .edge-thickness-invisible{stroke-width:0;fill:none;}#my-svg .edge-pattern-dashed{stroke-dasharray:3;}#my-svg .edge-pattern-dotted{stroke-dasharray:2;}#my-svg .marker{fill:#333333;stroke:#333333;}#my-svg .marker.cross{stroke:#333333;}#my-svg svg{font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:16px;}#my-svg p{margin:0;}#my-svg .label{font-family:"trebuchet ms",verdana,arial,sans-serif;color:#333;}#my-svg .cluster-label text{fill:#333;}#my-svg .cluster-label span{color:#333;}#my-svg .cluster-label span p{background-color:transparent;}#my-svg .label text,#my-svg span{fill:#333;color:#333;}#my-svg .node rect,#my-svg .node circle,#my-svg .node ellipse,#my-svg .node polygon,#my-svg .node path{fill:#ECECFF;stroke:#9370DB;stroke-width:1px;}#my-svg .rough-node .label text,#my-svg .node .label text,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-anchor:middle;}#my-svg .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#my-svg .rough-node .label,#my-svg .node .label,#my-svg .image-shape .label,#my-svg .icon-shape .label{text-align:center;}#my-svg .node.clickable{cursor:pointer;}#my-svg .root .anchor path{fill:#333333!important;stroke-width:0;stroke:#333333;}#my-svg .arrowheadPath{fill:#333333;}#my-svg .edgePath .path{stroke:#333333;stroke-width:1px;}#my-svg .flowchart-link{stroke:#333333;fill:none;}#my-svg .edgeLabel{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .edgeLabel p{background-color:rgba(232,232,232, 0.8);}#my-svg .edgeLabel rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .labelBkg{background-color:rgba(232, 232, 232, 0.5);}#my-svg .cluster rect{fill:#ffffde;stroke:#aaaa33;stroke-width:1px;}#my-svg .cluster text{fill:#333;}#my-svg .cluster span{color:#333;}#my-svg div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:"trebuchet ms",verdana,arial,sans-serif;font-size:12px;background:hsl(80, 100%, 96.2745098039%);border:1px solid #aaaa33;border-radius:2px;pointer-events:none;z-index:100;}#my-svg .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#333;}#my-svg rect.text{fill:none;stroke-width:0;}#my-svg .icon-shape,#my-svg .image-shape{background-color:rgba(232,232,232, 0.8);text-align:center;}#my-svg .icon-shape p,#my-svg .image-shape p{background-color:rgba(232,232,232, 0.8);padding:2px;}#my-svg .icon-shape .label rect,#my-svg .image-shape .label rect{opacity:0.5;background-color:rgba(232,232,232, 0.8);fill:rgba(232,232,232, 0.8);}#my-svg .label-icon{display:inline-block;height:1em;overflow:visible;vertical-align:-0.125em;}#my-svg .node .label-icon path{fill:currentColor;stroke:revert;stroke-width:revert;}#my-svg .node .neo-node{stroke:#9370DB;}#my-svg [data-look="neo"].node rect,#my-svg [data-look="neo"].cluster rect,#my-svg [data-look="neo"].node polygon{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node path{stroke:#9370DB;stroke-width:1px;}#my-svg [data-look="neo"].node .outer-path{filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node .neo-line path{stroke:#9370DB;filter:none;}#my-svg [data-look="neo"].node circle{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].node circle .state-start{fill:#000000;}#my-svg [data-look="neo"].icon-shape .icon{fill:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg [data-look="neo"].icon-shape .icon-neo path{stroke:#9370DB;filter:drop-shadow(1px 2px 2px rgba(185, 185, 185, 1));}#my-svg :root{--mermaid-font-family:"trebuchet ms",verdana,arial,sans-serif;}</style><g><marker id="my-svg_flowchart-v2-pointEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="4.5" refY="5" markerUnits="userSpaceOnUse" markerWidth="8" markerHeight="8" orient="auto"><path d="M 0 5 L 10 10 L 10 0 z" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointEnd-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="11.5" refY="7" markerUnits="userSpaceOnUse" markerWidth="10.5" markerHeight="14" orient="auto"><path d="M 0 0 L 11.5 7 L 0 14 z" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-pointStart-margin" class="marker flowchart-v2" viewBox="0 0 11.5 14" refX="1" refY="7" markerUnits="userSpaceOnUse" markerWidth="11.5" markerHeight="14" orient="auto"><polygon points="0,7 11.5,14 11.5,0" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd" class="marker flowchart-v2" viewBox="0 0 10 10" refX="11" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-1" refY="5" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 1; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleEnd-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refY="5" refX="12.25" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-circleStart-margin" class="marker flowchart-v2" viewBox="0 0 10 10" refX="-2" refY="5" markerUnits="userSpaceOnUse" markerWidth="14" markerHeight="14" orient="auto"><circle cx="5" cy="5" r="5" class="arrowMarkerPath" style="stroke-width: 0; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="12" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossStart" class="marker cross flowchart-v2" viewBox="0 0 11 11" refX="-1" refY="5.2" markerUnits="userSpaceOnUse" markerWidth="11" markerHeight="11" orient="auto"><path d="M 1,1 l 9,9 M 10,1 l -9,9" class="arrowMarkerPath" style="stroke-width: 2; stroke-dasharray: 1, 0;"/></marker><marker id="my-svg_flowchart-v2-crossEnd-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="17.7" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5;"/></marker><marker id="my-svg_flowchart-v2-crossStart-margin" class="marker cross flowchart-v2" viewBox="0 0 15 15" refX="-3.5" refY="7.5" markerUnits="userSpaceOnUse" markerWidth="12" markerHeight="12" orient="auto"><path d="M 1,1 L 14,14 M 1,14 L 14,1" class="arrowMarkerPath" style="stroke-width: 2.5; stroke-dasharray: 1, 0;"/></marker><g class="root"><g class="clusters"/><g class="edgePaths"><path d="M141.25,68.102L145.417,68.102C149.583,68.102,157.917,68.102,165.583,68.102C173.25,68.102,180.25,68.102,183.75,68.102L187.25,68.102" id="my-svg-L_A_B_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_A_B_0" data-points="W3sieCI6MTQxLjI1LCJ5Ijo2OC4xMDE1NjI1fSx7IngiOjE2Ni4yNSwieSI6NjguMTAxNTYyNX0seyJ4IjoxOTEuMjUsInkiOjY4LjEwMTU2MjV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M359.875,68.102L364.042,68.102C368.208,68.102,376.542,68.102,384.208,68.102C391.875,68.102,398.875,68.102,402.375,68.102L405.875,68.102" id="my-svg-L_B_C_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_B_C_0" data-points="W3sieCI6MzU5Ljg3NSwieSI6NjguMTAxNTYyNX0seyJ4IjozODQuODc1LCJ5Ijo2OC4xMDE1NjI1fSx7IngiOjQwOS44NzUsInkiOjY4LjEwMTU2MjV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M563.078,68.102L567.245,68.102C571.411,68.102,579.745,68.102,587.411,68.102C595.078,68.102,602.078,68.102,605.578,68.102L609.078,68.102" id="my-svg-L_C_D_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_C_D_0" data-points="W3sieCI6NTYzLjA3ODEyNSwieSI6NjguMTAxNTYyNX0seyJ4Ijo1ODguMDc4MTI1LCJ5Ijo2OC4xMDE1NjI1fSx7IngiOjYxMy4wNzgxMjUsInkiOjY4LjEwMTU2MjV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M716.276,85.107L724.721,88.44C733.165,91.772,750.055,98.437,763.444,101.769C776.833,105.102,786.721,105.102,791.665,105.102L796.609,105.102" id="my-svg-L_D_E_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_D_E_0" data-points="W3sieCI6NzE2LjI3NTU3NDI5MjAzMDEsInkiOjg1LjEwNzIzODIwNzk2OTg5fSx7IngiOjc2Ni45NDUzMTI1LCJ5IjoxMDUuMTAxNTYyNX0seyJ4Ijo4MDAuNjA5Mzc1LCJ5IjoxMDUuMTAxNTYyNX1d" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M716.276,51.096L724.721,47.763C733.165,44.431,750.055,37.766,776.878,34.434C803.701,31.102,840.456,31.102,875.767,31.102C911.078,31.102,944.945,31.102,966.096,32.551C987.246,34.001,995.68,36.901,999.897,38.351L1004.113,39.801" id="my-svg-L_D_F_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_D_F_0" data-points="W3sieCI6NzE2LjI3NTU3NDI5MjAzMDEsInkiOjUxLjA5NTg4Njc5MjAzMDExNX0seyJ4Ijo3NjYuOTQ1MzEyNSwieSI6MzEuMTAxNTYyNX0seyJ4Ijo4NzcuMjEwOTM3NSwieSI6MzEuMTAxNTYyNX0seyJ4Ijo5NzguODEyNSwieSI6MzEuMTAxNTYyNX0seyJ4IjoxMDA3Ljg5NjExNDg2NDg2NDksInkiOjQxLjEwMTU2MjV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/><path d="M953.813,105.102L957.979,105.102C962.146,105.102,970.479,105.102,978.863,103.652C987.246,102.202,995.68,99.302,999.897,97.852L1004.113,96.402" id="my-svg-L_E_F_0" class="edge-thickness-normal edge-pattern-solid edge-thickness-normal edge-pattern-solid flowchart-link" style=";" data-edge="true" data-et="edge" data-id="L_E_F_0" data-points="W3sieCI6OTUzLjgxMjUsInkiOjEwNS4xMDE1NjI1fSx7IngiOjk3OC44MTI1LCJ5IjoxMDUuMTAxNTYyNX0seyJ4IjoxMDA3Ljg5NjExNDg2NDg2NDksInkiOjk1LjEwMTU2MjV9XQ==" data-look="classic" marker-end="url(#my-svg_flowchart-v2-pointEnd)"/></g><g class="edgeLabels"><g class="edgeLabel"><g class="label" data-id="L_A_B_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_B_C_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_C_D_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(766.9453125, 105.1015625)"><g class="label" data-id="L_D_E_0" transform="translate(-8.6640625, -12)"><foreignObject width="17.328125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>no</p></span></div></foreignObject></g></g><g class="edgeLabel" transform="translate(877.2109375, 31.1015625)"><g class="label" data-id="L_D_F_0" transform="translate(-11.546875, -12)"><foreignObject width="23.09375" height="24"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"><p>yes</p></span></div></foreignObject></g></g><g class="edgeLabel"><g class="label" data-id="L_E_F_0" transform="translate(0, 0)"><foreignObject width="0" height="0"><div xmlns="http://www.w3.org/1999/xhtml" class="labelBkg" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="edgeLabel"></span></div></foreignObject></g></g></g><g class="nodes"><g class="node default" id="my-svg-flowchart-A-0" data-look="classic" transform="translate(74.625, 68.1015625)"><rect class="basic label-container" style="" x="-66.625" y="-39" width="133.25" height="78"/><g class="label" style="" transform="translate(-36.625, -24)"><rect/><foreignObject width="73.25" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>Init V×V<br />matrix = 0</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-B-1" data-look="classic" transform="translate(275.5625, 68.1015625)"><rect class="basic label-container" style="" x="-84.3125" y="-39" width="168.625" height="78"/><g class="label" style="" transform="translate(-54.3125, -24)"><rect/><foreignObject width="108.625" height="48"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>addEdge(u,v,w,<br />directed)</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-C-3" data-look="classic" transform="translate(486.4765625, 68.1015625)"><rect class="basic label-container" style="" x="-76.6015625" y="-27" width="153.203125" height="54"/><g class="label" style="" transform="translate(-46.6015625, -12)"><rect/><foreignObject width="93.203125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>adj[u][v] = w</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-D-5" data-look="classic" transform="translate(673.1796875, 68.1015625)"><polygon points="60.1015625,0 120.203125,-60.1015625 60.1015625,-120.203125 0,-60.1015625" class="label-container" transform="translate(-59.6015625, 60.1015625)"/><g class="label" style="" transform="translate(-33.1015625, -12)"><rect/><foreignObject width="66.203125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>directed?</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-E-7" data-look="classic" transform="translate(877.2109375, 105.1015625)"><rect class="basic label-container" style="" x="-76.6015625" y="-27" width="153.203125" height="54"/><g class="label" style="" transform="translate(-46.6015625, -12)"><rect/><foreignObject width="93.203125" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>adj[v][u] = w</p></span></div></foreignObject></g></g><g class="node default" id="my-svg-flowchart-F-9" data-look="classic" transform="translate(1086.421875, 68.1015625)"><rect class="basic label-container" style="" x="-82.609375" y="-27" width="165.21875" height="54"/><g class="label" style="" transform="translate(-52.609375, -12)"><rect/><foreignObject width="105.21875" height="24"><div xmlns="http://www.w3.org/1999/xhtml" style="display: table-cell; white-space: nowrap; line-height: 1.5; max-width: 200px; text-align: center;"><span class="nodeLabel"><p>ready to query</p></span></div></foreignObject></g></g></g></g></g><defs><filter id="my-svg-drop-shadow" height="130%" width="130%"><feDropShadow dx="4" dy="4" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs><defs><filter id="my-svg-drop-shadow-small" height="150%" width="150%"><feDropShadow dx="2" dy="2" stdDeviation="0" flood-opacity="0.06" flood-color="#000000"/></filter></defs></svg>

---

## 矩陣示意圖

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" width="220" height="220"><g font-family="monospace" font-size="13" text-anchor="middle"><text x="52" y="24" fill="#475569">0</text><text x="88" y="24" fill="#475569">1</text><text x="124" y="24" fill="#475569">2</text><text x="160" y="24" fill="#475569">3</text><text x="196" y="24" fill="#475569">4</text><text x="18" y="56" fill="#475569">0</text><rect x="34" y="34" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="52" y="56" fill="#cbd5e1">0</text><rect x="70" y="34" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="88" y="56" fill="#1d4ed8" font-weight="bold">4</text><rect x="106" y="34" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="124" y="56" fill="#cbd5e1">0</text><rect x="142" y="34" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="160" y="56" fill="#cbd5e1">0</text><rect x="178" y="34" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="196" y="56" fill="#1d4ed8" font-weight="bold">1</text><text x="18" y="92" fill="#475569">1</text><rect x="34" y="70" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="52" y="92" fill="#1d4ed8" font-weight="bold">4</text><rect x="70" y="70" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="88" y="92" fill="#cbd5e1">0</text><rect x="106" y="70" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="124" y="92" fill="#1d4ed8" font-weight="bold">3</text><rect x="142" y="70" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="92" fill="#1d4ed8" font-weight="bold">2</text><rect x="178" y="70" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="196" y="92" fill="#1d4ed8" font-weight="bold">5</text><text x="18" y="128" fill="#475569">2</text><rect x="34" y="106" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="52" y="128" fill="#cbd5e1">0</text><rect x="70" y="106" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="88" y="128" fill="#1d4ed8" font-weight="bold">3</text><rect x="106" y="106" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="124" y="128" fill="#cbd5e1">0</text><rect x="142" y="106" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="128" fill="#1d4ed8" font-weight="bold">6</text><rect x="178" y="106" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="196" y="128" fill="#cbd5e1">0</text><text x="18" y="164" fill="#475569">3</text><rect x="34" y="142" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="52" y="164" fill="#cbd5e1">0</text><rect x="70" y="142" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="88" y="164" fill="#1d4ed8" font-weight="bold">2</text><rect x="106" y="142" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="124" y="164" fill="#1d4ed8" font-weight="bold">6</text><rect x="142" y="142" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="160" y="164" fill="#cbd5e1">0</text><rect x="178" y="142" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="196" y="164" fill="#1d4ed8" font-weight="bold">7</text><text x="18" y="200" fill="#475569">4</text><rect x="34" y="178" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="52" y="200" fill="#1d4ed8" font-weight="bold">1</text><rect x="70" y="178" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="88" y="200" fill="#1d4ed8" font-weight="bold">5</text><rect x="106" y="178" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="124" y="200" fill="#cbd5e1">0</text><rect x="142" y="178" width="36" height="36" fill="#dbeafe" stroke="#2563eb"/><text x="160" y="200" fill="#1d4ed8" font-weight="bold">7</text><rect x="178" y="178" width="36" height="36" fill="#f8fafc" stroke="#cbd5e1"/><text x="196" y="200" fill="#cbd5e1">0</text></g></svg>

> 5×5 矩陣中，藍色格為範例圖的邊(數字即權重)；其餘為 0(無邊)。矩陣沿對角線對稱，因為圖是無向的。

---

## 逐步範例

輸入：5 個頂點、無向圖，邊為 0-1、0-4、1-2、1-3、1-4、2-3、3-4(依序權重 4、1、3、2、5、6、7)。

1. 初始化 5×5 全 0 矩陣。
2. 加入邊 0-1(w=4):`adj[0][1] = adj[1][0] = 4`。
3. 依序加入其餘邊 0-4(1)、1-2(3)、1-3(2)、1-4(5)、2-3(6)、3-4(7)，每次同樣鏡射設值。
4. 完成後第 1 列(頂點 1)為 [4, 0, 3, 2, 5] — 第 0、2、3、4 欄非 0，degree(1) = 4。
5. `outDegree(1)` 掃描該列的非 0 個數，同樣得到 4，與矩陣觀察一致。

---

## 複雜度分析

| 項目 | 成本 |
| --- | --- |
| 空間 | $O(V^2)$ |
| 邊查詢 | $O(1)$ |
| 列舉鄰居 | $O(V)$ |
| 加入邊 | $O(1)$ |

---

## 程式碼

```cpp
#include <iostream>
using namespace std;

const int MAXN = 10;

class Graph {
    int n;
    int adj[MAXN][MAXN] = {};

public:
    Graph(int v) : n(v) {}

    // adj[u][v] = w always; for an undirected graph also mirror adj[v][u].
    void addEdge(int u, int v, int w, bool directed) {
        adj[u][v] = w;
        if (!directed)
            adj[v][u] = w;
    }

    // Out-degree: count of nonzero entries in row i.
    int outDegree(int i) const {
        int d = 0;
        for (int j = 0; j < n; j++)
            if (adj[i][j] != 0)
                d++;
        return d;
    }

    // In-degree: count of nonzero entries in column j.
    int inDegree(int j) const {
        int d = 0;
        for (int i = 0; i < n; i++)
            if (adj[i][j] != 0)
                d++;
        return d;
    }

    void print() const {
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++)
                cout << adj[i][j] << " ";
            cout << "\n";
        }
    }
};

int main() {
    Graph g(5);
    bool directed = false;
    g.addEdge(0, 1, 4, directed);
    g.addEdge(0, 4, 1, directed);
    g.addEdge(1, 2, 3, directed);
    g.addEdge(1, 3, 2, directed);
    g.addEdge(1, 4, 5, directed);
    g.addEdge(2, 3, 6, directed);
    g.addEdge(3, 4, 7, directed);

    g.print();
    for (int i = 0; i < 5; i++)
        cout << "deg(" << i << ") = " << g.outDegree(i) << "\n";
    return 0;
}
```
