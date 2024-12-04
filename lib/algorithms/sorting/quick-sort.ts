export const quickSort = {
  id: "quick-sort",
  name: "Quick Sort",
  category: "sorting" as const,
  description: "A highly efficient, comparison-based sorting algorithm that uses a divide-and-conquer strategy with a pivot element.",
  complexity: {
    time: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)"
    },
    space: "O(log n)"
  },
  defaultCode: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    // Find the partition index
    const pi = partition(arr, low, high);
    
    // Recursively sort elements before and after partition
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`
};
