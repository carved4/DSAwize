import { Problem } from "@/lib/types/problem";

export const categories = [
  { id: 'array', name: 'Array' },
  { id: 'string', name: 'String' },
  { id: 'linked-list', name: 'Linked List' },
  { id: 'tree', name: 'Tree' },
  { id: 'graph', name: 'Graph' },
  { id: 'dynamic-programming', name: 'Dynamic Programming' },
  { id: 'sorting-searching', name: 'Sorting and Searching' },
  { id: 'hashing', name: 'Hashing' },
  { id: 'recursion-backtracking', name: 'Recursion and Backtracking' },
];

export const problems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers in the array such that they add up to target.",
    difficulty: "Easy",
    category: "array",
    starterCode: `function twoSum(nums, target) {
      // Given an array of integers nums and a target integer
      // Return indices of the two numbers that add up to target
      // You may assume each input has exactly one solution
      // You may not use the same element twice
      
      // Write your solution here
    }`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], output: [0, 1] },
      { input: [[3, 2, 4], 6], output: [1, 2] }
    ]
  },
  {
    id: 2,
    title: "Best Time to Buy and Sell Stock",
    description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Find the maximum profit you can achieve by buying and selling once.",
    difficulty: "Easy",
    category: "array",
    starterCode: `function maxProfit(prices) {
      // Given array prices where prices[i] is the price on day i
      // Return the maximum profit you can achieve
      // You must buy before you sell
      // If no profit possible, return 0
      
      // Write your solution here
    }`,
    testCases: [
      { input: [7, 1, 5, 3, 6, 4], output: 5 },
      { input: [7, 6, 4, 3, 1], output: 0 }
    ]
  },
  {
    id: 3,
    title: "Product of Array Except Self",
    description: "Given an array nums, return an array output such that output[i] is equal to the product of all elements of nums except nums[i].",
    difficulty: "Medium",
    category: "array",
    starterCode: `function productExceptSelf(nums) {
      // Return array where output[i] is product of all elements except nums[i]
      // Must solve without using division operation
      // Must solve in O(n) time
      
      // Write your solution here
    }`,
    testCases: [
      { input: [1, 2, 3, 4], output: [24, 12, 8, 6] },
      { input: [-1, 1, 0, -3, 3], output: [0, 0, 9, 0, 0] }
    ]
  },
  {
    id: 4,
    title: "Reverse String",
    description: "Write a function that reverses a string. The input string is given as an array of characters.",
    difficulty: "Easy",
    category: "string",
    starterCode: `function reverseString(s) {
      // Reverse the string in-place
      // Do not create a new array
      // s is an array of characters
      
      // Write your solution here
    }`,
    testCases: [
      { input: ["h","e","l","l","o"], output: ["o","l","l","e","h"] },
      { input: ["H","a","n","n","a","h"], output: ["h","a","n","n","a","H"] }
    ]
  },
  {
    id: 5,
    title: "Longest Substring Without Repeating Characters",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    category: "string",
    starterCode: `function lengthOfLongestSubstring(s) {
      // Find length of longest substring without repeating characters
      // A substring is a contiguous sequence of characters
      // Return the length of the longest such substring
      
      // Write your solution here
    }`,
    testCases: [
      { input: "abcabcbb", output: 3 },
      { input: "bbbbb", output: 1 },
      { input: "pwwkew", output: 3 }
    ]
  },
  {
    id: 6,
    title: "Valid Anagram",
    description: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    difficulty: "Easy",
    category: "string",
    starterCode: `function isAnagram(s, t) {
      // Given two strings s and t
      // Return true if t is an anagram of s, false otherwise
      // An anagram is a word formed by rearranging letters of another word
      
      // Write your solution here
    }`,
    testCases: [
      { input: ["anagram", "nagaram"], output: true },
      { input: ["rat", "car"], output: false }
    ]
  },
  {
    id: 7,
    title: "Reverse Linked List",
    description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    difficulty: "Easy",
    category: "linked-list",
    starterCode: `function reverseList(head) {
      // Given the head of a singly linked list
      // Return the reversed list
      // Must modify the list in-place
      
      // Write your solution here
    }`,
    testCases: [
      { input: [1,2,3,4,5], output: [5,4,3,2,1] },
      { input: [1,2], output: [2,1] }
    ]
  },
  {
    id: 8,
    title: "Merge Two Sorted Lists",
    description: "Merge two sorted linked lists and return it as a sorted list.",
    difficulty: "Easy",
    category: "linked-list",
    starterCode: `function mergeTwoLists(l1, l2) {
      // Given two sorted linked lists l1 and l2
      // Return a merged list in sorted order
      // The new list should be made by splicing together the nodes of the first two lists
      
      // Write your solution here
    }`,
    testCases: [
      { input: [[1,2,4], [1,3,4]], output: [1,1,2,3,4,4] },
      { input: [[], []], output: [] }
    ]
  },
  {
    id: 9,
    title: "Linked List Cycle",
    description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    difficulty: "Medium",
    category: "linked-list",
    starterCode: `function hasCycle(head) {
      // Given a linked list, determine if it has a cycle
      // Return true if there is a cycle, false otherwise
      // Note: A cycle occurs when a node's next points to a previous node
      
      // Write your solution here
    }`,
    testCases: [
      { input: [3,2,0,-4], output: true },
      { input: [1,2], output: false }
    ]
  },
  {
    id: 10,
    title: "Binary Tree Inorder Traversal",
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    difficulty: "Medium",
    category: "tree",
    starterCode: `function inorderTraversal(root) {
      // Given the root of a binary tree
      // Return the inorder traversal of its nodes' values
      // Inorder: left subtree -> root -> right subtree
      
      // Write your solution here
    }`,
    testCases: [
      { input: [1,null,2,3], output: [1,3,2] },
      { input: [], output: [] }
    ]
  },
  {
    id: 11,
    title: "Maximum Depth of Binary Tree",
    description: "Given the root of a binary tree, return its maximum depth (the number of nodes along the longest path from root to leaf).",
    difficulty: "Easy",
    category: "tree",
    starterCode: `function maxDepth(root) {
      // Given the root of a binary tree
      // Return the maximum depth (number of nodes along longest path from root to leaf)
      // Empty tree has depth of 0
      
      // Write your solution here
    }`,
    testCases: [
      { input: [3,9,20,null,null,15,7], output: 3 },
      { input: [1,null,2], output: 2 }
    ]
  },
  {
    id: 12,
    title: "Serialize and Deserialize Binary Tree",
    description: "Design an algorithm to serialize and deserialize a binary tree.",
    difficulty: "Hard",
    category: "tree",
    starterCode: `function serialize(root) {
      // Convert a binary tree to a string representation
      // The string should contain enough information to rebuild the tree
      
      // Write your solution here
    }

    function deserialize(data) {
      // Convert the string representation back to a binary tree
      // Should perfectly reconstruct the original tree
      
      // Write your solution here
    }`,
    testCases: [
      { input: [1,2,3,null,null,4,5], output: [1,2,3,null,null,4,5] },
      { input: [], output: [] }
    ]
  },
  {
    id: 13,
    title: "Number of Islands",
    description: "Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    difficulty: "Medium",
    category: "graph",
    starterCode: `function numIslands(grid) {
      // Given a 2D grid of '1's (land) and '0's (water)
      // Return the number of islands (connected groups of '1's)
      // Connected means adjacent horizontally or vertically
      
      // Write your solution here
    }`,
    testCases: [
      { 
        input: [
          ["1","1","1","1","0"],
          ["1","1","0","1","0"],
          ["1","1","0","0","0"],
          ["0","0","0","0","0"]
        ],
        output: 1
      },
      {
        input: [
          ["1","1","0","0","0"],
          ["1","1","0","0","0"],
          ["0","0","1","0","0"],
          ["0","0","0","1","1"]
        ],
        output: 3
      }
    ]
  },
  {
    id: 14,
    title: "Course Schedule",
    description: "Given the total number of courses numCourses and a list of prerequisites, determine if you can finish all courses.",
    difficulty: "Medium",
    category: "graph",
    starterCode: `function canFinish(numCourses, prerequisites) {
      // Given number of courses and prerequisites array
      // prerequisites[i] = [ai, bi] means you must take bi before ai
      // Return true if you can finish all courses, false otherwise
      // Must detect if there's a cycle in the prerequisites
      
      // Write your solution here
    }`,
    testCases: [
      { input: [2, [[1,0]]], output: true },
      { input: [2, [[1,0],[0,1]]], output: false }
    ]
  },
  {
    id: 15,
    title: "Clone Graph",
    description: "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    difficulty: "Medium",
    category: "graph",
    starterCode: `function cloneGraph(node) {
      // Given a reference to a node in a connected undirected graph
      // Return a deep copy (clone) of the graph
      // Each node contains a value and array of its neighbors
      
      // Write your solution here
    }`,
    testCases: [
      { input: [[2,4],[1,3],[2,4],[1,3]], output: [[2,4],[1,3],[2,4],[1,3]] },
      { input: [[]], output: [[]] }
    ]
  },
  {
    id: 16,
    title: "Climbing Stairs",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    difficulty: "Easy",
    category: "dynamic-programming",
    starterCode: `function climbStairs(n) {
      // Given n steps to reach the top
      // Each time you can climb 1 or 2 steps
      // Return number of distinct ways to climb to the top
      
      // Write your solution here
    }`,
    testCases: [
      { input: 2, output: 2 },
      { input: 3, output: 3 }
    ]
  },
  {
    id: 17,
    title: "Longest Increasing Subsequence",
    description: "Given an array of integers nums, return the length of the longest strictly increasing subsequence.",
    difficulty: "Medium",
    category: "dynamic-programming",
    starterCode: `function lengthOfLIS(nums) {
      // Given an array of integers nums
      // Return length of longest strictly increasing subsequence
      // A subsequence is a sequence that can be derived by removing elements
      // Elements must be strictly increasing (no equal values)
      
      // Write your solution here
    }`,
    testCases: [
      { input: [10,9,2,5,3,7,101,18], output: 4 },
      { input: [0,1,0,3,2,3], output: 4 }
    ]
  },
  {
    id: 18,
    title: "Word Break",
    description: "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    difficulty: "Medium",
    category: "dynamic-programming",
    starterCode: `function wordBreak(s, wordDict) {
      // Given a string s and a dictionary of strings wordDict
      // Return true if s can be segmented into dictionary words
      // You may reuse dictionary words multiple times
      
      // Write your solution here
    }`,
    testCases: [
      { input: ["leetcode", ["leet","code"]], output: true },
      { input: ["applepenapple", ["apple","pen"]], output: true }
    ]
  },
  {
    id: 19,
    title: "Merge Intervals",
    description: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    difficulty: "Medium",
    category: "sorting-searching",
    starterCode: `function merge(intervals) {
      // Given array of intervals where intervals[i] = [starti, endi]
      // Merge all overlapping intervals
      // Return array of non-overlapping intervals
      
      // Write your solution here
    }`,
    testCases: [
      { input: [[1,3],[2,6],[8,10],[15,18]], output: [[1,6],[8,10],[15,18]] },
      { input: [[1,4],[4,5]], output: [[1,5]] }
    ]
  },
  {
    id: 20,
    title: "Search in Rotated Sorted Array",
    description: "Given a rotated sorted array nums and a target value, return the index of target if it's in nums, or -1 if it isn't.",
    difficulty: "Medium",
    category: "sorting-searching",
    starterCode: `function search(nums, target) {
      // Given rotated sorted array nums and target value
      // Array was sorted in ascending order before being rotated
      // Return index of target if found, -1 if not found
      // Must achieve O(log n) runtime complexity
      
      // Write your solution here
    }`,
    testCases: [
      { input: [[4,5,6,7,0,1,2], 0], output: 4 },
      { input: [[4,5,6,7,0,1,2], 3], output: -1 }
    ]
  },
  {
    id: 21,
    title: "Find Minimum in Rotated Sorted Array",
    description: "Given a sorted array that is rotated at some pivot point, find the minimum element.",
    difficulty: "Medium",
    category: "sorting-searching",
    starterCode: `function findMin(nums) {
      // Given array sorted in ascending order and rotated at some pivot
      // Find and return the minimum element
      // Must achieve O(log n) runtime complexity
      
      // Write your solution here
    }`,
    testCases: [
      { input: [3,4,5,1,2], output: 1 },
      { input: [4,5,6,7,0,1,2], output: 0 }
    ]
  },
  {
    id: 22,
    title: "Contains Duplicate",
    description: "Given an integer array nums, return true if any value appears at least twice in the array.",
    difficulty: "Easy",
    category: "hashing",
    starterCode: `function containsDuplicate(nums) {
      // Given an integer array nums
      // Return true if any value appears at least twice
      // Return false if every element is distinct
      
      // Write your solution here
    }`,
    testCases: [
      { input: [1,2,3,1], output: true },
      { input: [1,2,3,4], output: false }
    ]
  },
  {
    id: 23,
    title: "Group Anagrams",
    description: "Given an array of strings strs, group the anagrams together.",
    difficulty: "Medium",
    category: "hashing",
    starterCode: `function groupAnagrams(strs) {
      // Given an array of strings strs
      // Group all anagrams together and return the groups
      // An anagram is a word formed by rearranging letters of another
      
      // Write your solution here
    }`,
    testCases: [
      { input: ["eat","tea","tan","ate","nat","bat"], output: [["bat"],["nat","tan"],["ate","eat","tea"]] },
      { input: [""], output: [[""]] }
    ]
  },
  {
    id: 24,
    title: "Top K Frequent Elements",
    description: "Given an integer array nums and an integer k, return the k most frequent elements.",
    difficulty: "Medium",
    category: "hashing",
    starterCode: `function topKFrequent(nums, k) {
      // Given integer array nums and integer k
      // Return the k most frequent elements
      // Return answer in any order
      
      // Write your solution here
    }`,
    testCases: [
      { input: [[1,1,1,2,2,3], 2], output: [1,2] },
      { input: [[1], 1], output: [1] }
    ]
  },
  {
    id: 25,
    title: "Permutations",
    description: "Given an array nums of distinct integers, return all possible permutations.",
    difficulty: "Medium",
    category: "recursion-backtracking",
    starterCode: `function permute(nums) {
      // Given array nums of distinct integers
      // Return all possible permutations
      // Can return the answer in any order
      
      // Write your solution here
    }`,
    testCases: [
      { input: [1,2,3], output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] },
      { input: [0,1], output: [[0,1],[1,0]] }
    ]
  },
  {
    id: 26,
    title: "Combination Sum",
    description: "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target.",
    difficulty: "Medium",
    category: "recursion-backtracking",
    starterCode: `function combinationSum(candidates, target) {
      // Given array of distinct integers candidates and target integer
      // Return list of all unique combinations that sum to target
      // Can use same number from candidates unlimited times
      // All numbers are positive integers
      
      // Write your solution here
    }`,
    testCases: [
      { input: [[2,3,6,7], 7], output: [[2,2,3],[7]] },
      { input: [[2,3,5], 8], output: [[2,2,2,2],[2,3,3],[3,5]] }
    ]
  },
  {
    id: 27,
    title: "N-Queens",
    description: "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.",
    difficulty: "Hard",
    category: "recursion-backtracking",
    starterCode: `function solveNQueens(n) {
      // Given integer n, return all distinct solutions to n-queens puzzle
      // Each solution contains distinct board configurations
      // Board is n x n where 'Q' represents queen, '.' represents empty
      // No two queens can share same row, column, or diagonal
      
      // Write your solution here
    }`,
    testCases: [
      { input: 4, output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]] },
      { input: 1, output: [["Q"]] }
    ]
  }
]; 