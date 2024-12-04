import { bubbleSort } from './sorting/bubble-sort';
import { quickSort } from './sorting/quick-sort';
import { binarySearch } from './searching/binary-search';
import { dijkstra } from './graph/dijkstra';
import { aStar } from './grid/a-star';
import { longestCommonSubsequence } from './dynamic/longest-common-subsequence';
import { Algorithm } from '@/lib/types/algorithm';

export const algorithms: Algorithm[] = [
  // Sorting Algorithms
  bubbleSort,
  quickSort,

  // Searching Algorithms
  binarySearch,

  // Graph Algorithms
  dijkstra,

  // Grid Algorithms
  aStar,

  // Dynamic Programming
  longestCommonSubsequence
];