export const exponentialSearch = {
  id: "exponential-search",
  name: "Exponential Search",
  category: "searching" as const,
  description: "A searching algorithm that works on sorted arrays by jumping through the array exponentially and then performing a binary search.",
  defaultCode: `function exponentialSearch(arr, target) {
  if (arr[0] === target) {
    return 0;
  }

  let i = 1;
  while (i < arr.length && arr[i] <= target) {
    i *= 2;
  }

  return binarySearch(arr, target, i / 2, Math.min(i, arr.length - 1));
}

function binarySearch(arr, target, left, right) {
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
  pythonCode: `def exponential_search(arr, target):
    if arr[0] == target:
        return 0

    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2

    return binary_search(arr, target, i // 2, min(i, len(arr) - 1))

def binary_search(arr, target, left, right):
    while left <= right:
        mid = (left + right) // 2

        if arr[mid] == target:
            return mid

        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1

    return -1`,
  timeComplexity: "O(log n)",
  spaceComplexity: "O(1)"
};
