export const mergeSort = {
  id: "merge-sort",
  name: "Merge Sort",
  category: "sorting" as const,
  description: "A divide-and-conquer sorting algorithm that recursively divides the array into smaller subarrays, sorts them, and then merges them back together.",
  complexity: {
    time: "O(n log n)",
    space: "O(n)"
  },
  defaultCode: `function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) return arr;

  const mid = Math.floor((start + end) / 2);
  mergeSort(arr, start, mid);
  mergeSort(arr, mid + 1, end);
  merge(arr, start, mid, end);
  
  return arr;
}

function merge(arr, start, mid, end) {
  const left = arr.slice(start, mid + 1);
  const right = arr.slice(mid + 1, end + 1);
  
  let i = 0, j = 0, k = start;
  
  while (i < left.length && j < right.length) {
    // Compare elements from left and right arrays
    if (left[i] <= right[j]) {
      // Visualize comparison and update
      visualize.compare(k, start + i);
      arr[k] = left[i];
      i++;
    } else {
      visualize.compare(k, mid + 1 + j);
      arr[k] = right[j];
      j++;
    }
    k++;
  }
  
  // Copy remaining elements
  while (i < left.length) {
    arr[k] = left[i];
    i++;
    k++;
  }
  
  while (j < right.length) {
    arr[k] = right[j];
    j++;
    k++;
  }
}`
}; 