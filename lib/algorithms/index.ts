import { Algorithm } from "@/lib/types/algorithm";

export const algorithms: Algorithm[] = [
  {
    id: "bubble-sort",
    name: "Bubble Sort",
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    defaultCode: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      __recordComparison(j, j + 1);
      if (arr[j] > arr[j + 1]) {
        __recordSwap(j, j + 1);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
    pythonCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
  },
  {
    id: "quick-sort",
    name: "Quick Sort",
    description: "An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements.",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)",
    defaultCode: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    __recordPartition(low, high, arr[pivotIndex]);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    __recordComparison(j, high);
    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        __recordSwap(i, j);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }
  
  if (i + 1 !== high) {
    __recordSwap(i + 1, high);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  }
  return i + 1;
}`,
    pythonCode: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
        
    def partition(low, high):
        pivot = arr[high]
        i = low - 1
        
        for j in range(low, high):
            if arr[j] <= pivot:
                i += 1
                arr[i], arr[j] = arr[j], arr[i]
                
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        return i + 1
    
    if low < high:
        pi = partition(low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr`,
  },
  {
    id: "merge-sort",
    name: "Merge Sort",
    description: "A divide-and-conquer algorithm that divides the input array into two halves, recursively sorts them, and then merges the sorted halves.",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)",
    defaultCode: `function mergeSort(arr, start = 0, end = arr.length - 1) {
  if (end - start <= 0) return arr;
  
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
  
  __recordMerge(start, end, [...arr]);
  
  while (i < left.length && j < right.length) {
    __recordComparison(start + i, mid + 1 + j);
    if (left[i] <= right[j]) {
      arr[k] = left[i];
      i++;
    } else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }
  
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
}`,
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
        
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
            
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  },
  {
    id: "insertion-sort",
    name: "Insertion Sort",
    description: "Builds the final sorted array one item at a time, by repeatedly inserting a new element into the sorted portion of the array.",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    defaultCode: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0) {
      __recordComparison(j, j + 1);
      if (arr[j] > key) {
        __recordSwap(j, j + 1);
        arr[j + 1] = arr[j];
        j--;
      } else {
        break;
      }
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
    pythonCode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  },
  {
    id: "binary-search",
    name: "Binary Search",
    description: "An efficient search algorithm that finds the position of a target value within a sorted array.",
    category: "searching",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    defaultCode: `function binarySearch(arr, target) {
      let left = 0;
      let right = arr.length - 1;
      
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        __recordSearch(mid, target);
        if (arr[mid] === target) {
          __recordSearch(mid, target, true);
          return mid;
        }
        
        __recordComparison(mid, target);
        if (arr[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      
      return -1;
    }`,
    pythonCode: `def binary_search(arr, target):
      left, right = 0, len(arr) - 1
      
      while left <= right:
          mid = (left + right) // 2
          
          if arr[mid] == target:
              return mid
          elif arr[mid] < target:
              left = mid + 1
          else:
              right = mid - 1
              
      return -1`
  },
  {
    id: "dijkstra",
    name: "Dijkstra's Algorithm",
    description: "Finds the shortest paths between nodes in a graph with non-negative edge weights.",
    category: "graph",
    timeComplexity: "O((V + E) log V)",
    spaceComplexity: "O(V)",
    defaultCode: `function dijkstra(graph, start) {
      const distances = {};
      const visited = new Set();
      const previous = {};
      
      // Initialize distances
      for (let vertex in graph) {
        distances[vertex] = Infinity;
      }
      distances[start] = 0;
      __recordPathUpdate(start, 0, [start]);
      
      while (visited.size < Object.keys(graph).length) {
        const current = getMinVertex(distances, visited);
        visited.add(current);
        
        for (let neighbor in graph[current]) {
          if (!visited.has(neighbor)) {
            const distance = distances[current] + graph[current][neighbor];
            if (distance < distances[neighbor]) {
              distances[neighbor] = distance;
              previous[neighbor] = current;
              const path = getPath(previous, neighbor);
              __recordPathUpdate(neighbor, distance, path);
            }
          }
        }
      }
      
      return { distances, previous };
    }

    function getPath(previous, vertex) {
      const path = [];
      let current = vertex;
      while (current) {
        path.unshift(current);
        current = previous[current];
      }
      return path;
    }

    function getMinVertex(distances, visited) {
      let minDistance = Infinity;
      let minVertex = null;
      
      for (let vertex in distances) {
        if (!visited.has(vertex) && distances[vertex] < minDistance) {
          minDistance = distances[vertex];
          minVertex = vertex;
        }
      }
      
      return minVertex;
    }`,
    pythonCode: `def dijkstra(graph, start):
        distances = {vertex: float('infinity') for vertex in graph}
        distances[start] = 0
        visited = set()
        previous = {}
        
        while len(visited) < len(graph):
            # Find unvisited vertex with minimum distance
            current = min(
                (v for v in graph if v not in visited),
                key=lambda v: distances[v]
            )
            visited.add(current)
            
            # Update distances to neighbors
            for neighbor, weight in graph[current].items():
                if neighbor not in visited:
                    distance = distances[current] + weight
                    if distance < distances[neighbor]:
                        distances[neighbor] = distance
                        previous[neighbor] = current
        
        return distances, previous`
  },
  {
    id: "selection-sort",
    name: "Selection Sort",
    description: "Repeatedly finds the minimum element from the unsorted portion and places it at the beginning.",
    category: "sorting",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)",
    defaultCode: `function selectionSort(arr) {
      const n = arr.length;
      
      for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        // Compare with remaining elements
        for (let j = i + 1; j < n; j++) {
          __recordComparison(j, minIdx);
          if (arr[j] < arr[minIdx]) {
            minIdx = j;
          }
        }
        
        // Swap if needed
        if (minIdx !== i) {
          __recordSwap(i, minIdx);
          const temp = arr[i];
          arr[i] = arr[minIdx];
          arr[minIdx] = temp;
        }
      }
      
      return arr;
    }`,
    pythonCode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        if min_idx != i:
            arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
  },
  {
    id: "heap-sort",
    name: "Heap Sort",
    description: "Builds a max-heap and repeatedly extracts the maximum element to sort the array.",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    defaultCode: `function heapSort(arr) {
      const n = arr.length;
      
      // Build max heap
      for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
      }
      
      // Extract elements from heap one by one
      for (let i = n - 1; i > 0; i--) {
        __recordComparison(0, i);
        __recordSwap(0, i);
        const temp = arr[0];
        arr[0] = arr[i];
        arr[i] = temp;
        
        heapify(arr, i, 0);
      }
      return arr;
    }

    function heapify(arr, n, i) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      
      if (left < n) {
        __recordComparison(i, left);
        if (arr[left] > arr[largest]) {
          largest = left;
        }
      }
      
      if (right < n) {
        __recordComparison(i, right);
        if (arr[right] > arr[largest]) {
          largest = right;
        }
      }
      
      if (largest !== i) {
        __recordSwap(i, largest);
        const temp = arr[i];
        arr[i] = arr[largest];
        arr[largest] = temp;
        
        heapify(arr, n, largest);
      }
    }`,
    pythonCode: `def heap_sort(arr):
    def heapify(n, i):
        largest = i
        left = 2 * i + 1
        right = 2 * i + 2
        
        if left < n and arr[left] > arr[largest]:
            largest = left
        if right < n and arr[right] > arr[largest]:
            largest = right
            
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)
    
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(n, i)
        
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)
    return arr`,
  },
  {
    id: "shell-sort",
    name: "Shell Sort",
    description: "An optimization of insertion sort that allows the exchange of items that are far apart.",
    category: "sorting",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)",
    defaultCode: `function shellSort(arr) {
      let n = arr.length;
      
      for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
        __recordGapChange(gap);
        
        for (let i = gap; i < n; i++) {
          let temp = arr[i];
          let j = i;
          
          while (j >= gap) {
            __recordComparison(j, j - gap);
            if (arr[j - gap] > temp) {
              __recordSwap(j, j - gap);
              arr[j] = arr[j - gap];
              j -= gap;
            } else {
              break;
            }
          }
          arr[j] = temp;
        }
      }
      return arr;
    }`,
    pythonCode: `def shell_sort(arr):
    n = len(arr)
    gap = n // 2
    
    while gap > 0:
        for i in range(gap, n):
            temp = arr[i]
            j = i
            while j >= gap and arr[j - gap] > temp:
                arr[j] = arr[j - gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr`,
  },
  {
    id: "counting-sort",
    name: "Counting Sort",
    description: "A non-comparative integer sorting algorithm that sorts elements by counting occurrences of each unique element.",
    category: "sorting",
    timeComplexity: "O(n + k)",
    spaceComplexity: "O(k)",
    defaultCode: `function countingSort(arr) {
      const n = arr.length;
      const max = Math.max(...arr);
      const min = Math.min(...arr);
      const range = max - min + 1;
      const count = new Array(range).fill(0);
      const output = new Array(n);
      
      // Count occurrences
      for (let i = 0; i < n; i++) {
        __recordComparison(i, arr[i]);
        count[arr[i] - min]++;
      }
      
      // Calculate cumulative count
      for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
      }
      
      // Build output array
      for (let i = n - 1; i >= 0; i--) {
        const outputIndex = count[arr[i] - min] - 1;
        __recordSwap(i, outputIndex);
        output[outputIndex] = arr[i];
        count[arr[i] - min]--;
      }
      
      // Copy back to original array
      for (let i = 0; i < n; i++) {
        __recordSwap(i, i);
        const temp = arr[i];
        arr[i] = output[i];
      }
      
      return arr;
    }`,
    pythonCode: `def counting_sort(arr):
    if not arr:
        return arr
        
    max_val = max(arr)
    min_val = min(arr)
    range_val = max_val - min_val + 1
    
    count = [0] * range_val
    output = [0] * len(arr)
    
    for num in arr:
        count[num - min_val] += 1
    
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i] - min_val] - 1] = arr[i]
        count[arr[i] - min_val] -= 1
    
    for i in range(len(arr)):
        arr[i] = output[i]
    return arr`,
  }
];