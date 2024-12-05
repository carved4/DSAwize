export const insertionSort = {
  id: "insertion-sort",
  name: "Insertion Sort",
  category: "sorting" as const,
  description: "A simple sorting algorithm that builds the final sorted array one item at a time by repeatedly inserting a new element into the sorted portion of the array.",
  complexity: {
    time: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)"
    },
    space: "O(1)"
  },
  defaultCode: `function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0 && visualize.compare(j - 1, j) > 0) {
      visualize.swap(arr, j, j - 1);
      j--;
    }
  }
  
  return arr;
}`
}; 