export const interpolationSearch = {
  id: "interpolation-search",
  name: "Interpolation Search",
  category: "searching" as const,
  description: "An improved variant of binary search for uniformly distributed sorted arrays.",
  defaultCode: `function interpolationSearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right && target >= arr[left] && target <= arr[right]) {
    if (left === right) {
      if (arr[left] === target) return left;
      return -1;
    }

    const pos = left + Math.floor(
      ((target - arr[left]) * (right - left)) / 
      (arr[right] - arr[left])
    );

    if (arr[pos] === target) {
      return pos;
    }

    if (arr[pos] < target) {
      left = pos + 1;
    } else {
      right = pos - 1;
    }
  }

  return -1;
}`,
  pythonCode: `def interpolation_search(arr, target):
    left = 0
    right = len(arr) - 1

    while left <= right and target >= arr[left] and target <= arr[right]:
        if left == right:
            if arr[left] == target:
                return left
            return -1

        pos = left + int(
            ((target - arr[left]) * (right - left)) / 
            (arr[right] - arr[left])
        )

        if arr[pos] == target:
            return pos

        if arr[pos] < target:
            left = pos + 1
        else:
            right = pos - 1

    return -1`,
  timeComplexity: "O(log(log n))",
  spaceComplexity: "O(1)"
};
