export const bubbleSort = {
  id: "bubble-sort",
  name: "Bubble Sort",
  category: "sorting" as const,
  description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
  defaultCode: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (visualize.compare(j, j + 1) > 0) {
        visualize.swap(arr, j, j + 1);
      }
    }
  }
  
  return arr;
}`
};