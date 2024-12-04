export const longestCommonSubsequence = {
  id: "lcs",
  name: "Longest Common Subsequence",
  category: "dynamic" as const,
  description: "Finds the longest subsequence present in both strings in the same relative order. A classic example of dynamic programming.",
  complexity: {
    time: "O(mn)",
    space: "O(mn)"
  },
  defaultCode: `function lcs(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));
  
  // Build LCS matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Reconstruct the subsequence
  let i = m, j = n;
  const subsequence = [];
  
  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      subsequence.unshift(str1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      i--;
    } else {
      j--;
    }
  }
  
  return {
    length: dp[m][n],
    subsequence: subsequence.join(''),
    matrix: dp
  };
}`
};
