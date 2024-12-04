export const binarySearch = {
  id: "binary-search",
  name: "Binary Search",
  category: "searching" as const,
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
}`
};