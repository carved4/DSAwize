export const selectionSort = {
  id: "selection-sort",
  name: "Selection Sort",
  category: "sorting" as const,
  description: "A simple sorting algorithm that repeatedly finds the minimum element from the unsorted portion and places it at the beginning.",
  complexity: {
    time: "O(n²)",
    space: "O(1)"
  },
  defaultCode: `function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    
    for (let j = i + 1; j < n; j++) {
      if (visualize.compare(j, minIdx) < 0) {
        minIdx = j;
      }
    }
    
    if (minIdx !== i) {
      visualize.swap(arr, i, minIdx);
    }
  }
  
  return arr;
}`
}; 