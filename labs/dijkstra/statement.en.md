# dijkstra — Single-Source Shortest Path

Given an **undirected weighted graph** with `n` nodes (numbered `0` to `n-1`) and `m` edges (edge weights are non-negative), together with a source node `s`, compute the length of the shortest path (sum of edge weights) from `s` to every node. If a node is unreachable from `s`, output `-1`.

## Input
- Line 1: two integers `n m` (number of nodes, number of edges)
- The next `m` lines: each contains three integers `u v w`, representing an undirected edge of weight `w` between node `u` and node `v` (`0 <= w`)
- Last line: one integer `s` (the source node)

## Output
- One line containing `n` space-separated integers: the shortest distance from `s` to each of the nodes `0` through `n-1`; output `-1` if a node is unreachable.

## Example
Input:
```
5 6
0 1 4
0 2 1
2 1 2
1 3 1
2 3 5
3 4 3
0
```
Output:
```
0 3 1 4 7
```
