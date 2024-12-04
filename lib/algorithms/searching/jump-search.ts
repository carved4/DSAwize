export const jumpSearch = {
  id: "jump-search",
  name: "Jump Search",
  category: "searching" as const,
  description: "A searching algorithm that jumps ahead by fixed steps to find the target element.",
  complexity: {
    time: "O(√n)",
    space: "O(1)"
  },
  timeComplexity: "O(√n)",
  spaceComplexity: "O(1)",
  defaultCode: `function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    step += Math.floor(Math.sqrt(n));
    if (prev >= n) {
      return -1;
    }
  }
  
  while (arr[prev] < target) {
    prev++;
    if (prev === Math.min(step, n)) {
      return -1;
    }
  }
  
  if (arr[prev] === target) {
    return prev;
  }
  
  return -1;
}`,
  pythonCode: `def jump_search(arr, target):
    n = len(arr)
    step = int(n ** 0.5)
    
    prev = 0
    while arr[min(step, n) - 1] < target:
        prev = step
        step += int(n ** 0.5)
        if prev >= n:
            return -1
    
    while arr[prev] < target:
        prev += 1
        if prev == min(step, n):
            return -1
    
    if arr[prev] == target:
        return prev
    
    return -1`
};
