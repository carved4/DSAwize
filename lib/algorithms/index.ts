export interface Algorithm {
  id: string;
  name: string;
  category: "sorting" | "searching" | "graph";
  defaultCode: string;
  description: string;
}

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    category: "sorting",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    defaultCode: `function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  
  return arr;
}`,
  },
  {
    id: "binary-search",
    name: "Binary Search",
    category: "searching",
    description: "An efficient algorithm for finding an item from a sorted list of items.",
    defaultCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}`,
  },
];