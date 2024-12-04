export const linearSearch = {
  id: "linear-search",
  name: "Linear Search",
  category: "searching" as const,
  description: "A simple search algorithm that checks each element in sequence until a match is found.",
  defaultCode: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    __recordComparison(i);
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
  pythonCode: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  timeComplexity: "O(n)",
  spaceComplexity: "O(1)"
};
