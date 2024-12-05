import { Problem } from '@/lib/types/problem';

// Array Problems
const arrayProblems: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "array",
    description: "Find two numbers in an array that add up to a target sum.",
    starterCode: `function twoSum(nums: number[], target: number): number[] {
  // Your code here
}`,
    testCases: [
      { input: [[2, 7, 11, 15], 9], output: [0, 1] },
      { input: [[3, 2, 4], 6], output: [1, 2] }
    ]
  },
  {
    id: 2,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "array",
    description: "Find the contiguous subarray with the largest sum.",
    starterCode: `function maxSubArray(nums: number[]): number {
  // Your code here
}`,
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], output: 6 },
      { input: [[1]], output: 1 }
    ]
  }
];

// String Problems
const stringProblems: Problem[] = [
  {
    id: 3,
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "string",
    description: "Determine if a string is a palindrome, considering only alphanumeric characters.",
    starterCode: `function isPalindrome(s: string): boolean {
  // Your code here
}`,
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], output: true },
      { input: ["race a car"], output: false }
    ]
  },
  {
    id: 4,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "string",
    description: "Find the length of the longest substring without repeating characters.",
    starterCode: `function lengthOfLongestSubstring(s: string): number {
  // Your code here
}`,
    testCases: [
      { input: ["abcabcbb"], output: 3 },
      { input: ["bbbbb"], output: 1 }
    ]
  }
];

// Dynamic Programming Problems
const dpProblems: Problem[] = [
  {
    id: 5,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "dynamic-programming",
    description: "Count the number of ways to climb n stairs, taking 1 or 2 steps at a time.",
    starterCode: `function climbStairs(n: number): number {
  // Your code here
}`,
    testCases: [
      { input: [2], output: 2 },
      { input: [3], output: 3 }
    ]
  },
  {
    id: 6,
    title: "Coin Change",
    difficulty: "Medium",
    category: "dynamic-programming",
    description: "Find the fewest number of coins needed to make up a given amount.",
    starterCode: `function coinChange(coins: number[], amount: number): number {
  // Your code here
}`,
    testCases: [
      { input: [[1,2,5], 11], output: 3 },
      { input: [[2], 3], output: -1 }
    ]
  }
];

// Tree Problems
const treeProblems: Problem[] = [
  {
    id: 7,
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "tree",
    description: "Find the maximum depth (height) of a binary tree.",
    starterCode: `function maxDepth(root: TreeNode | null): number {
  // Your code here
}`,
    testCases: [
      { input: [[3,9,20,null,null,15,7]], output: 3 },
      { input: [[1,null,2]], output: 2 }
    ]
  },
  {
    id: 8,
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "tree",
    description: "Determine if a binary tree is a valid binary search tree (BST).",
    starterCode: `function isValidBST(root: TreeNode | null): boolean {
  // Your code here
}`,
    testCases: [
      { input: [[2,1,3]], output: true },
      { input: [[5,1,4,null,null,3,6]], output: false }
    ]
  }
];

export const problems = [
  ...arrayProblems,
  ...stringProblems,
  ...dpProblems,
  ...treeProblems
];

export const categories = [
  { id: 'array', name: 'Array Problems' },
  { id: 'string', name: 'String Problems' },
  { id: 'dynamic-programming', name: 'Dynamic Programming' },
  { id: 'tree', name: 'Tree Problems' }
]; 