"use client";

import { create } from "zustand";
import { Algorithm } from "@/lib/types/algorithm";
import { useVisualizationStore } from "./visualization-store";

// Hardcoded list of algorithms if not found dynamically
const defaultAlgorithms: Algorithm[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    description: 'A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    defaultCode: `function bubbleSort(arr) {
      const n = arr.length;
      for (let i = 0; i < n-1; i++) {
        for (let j = 0; j < n-i-1; j++) {
          if (arr[j] > arr[j+1]) {
            [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
          }
        }
      }
      return arr;
    }`,
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    description: 'An efficient, stable sorting algorithm that uses a divide-and-conquer strategy to break down the array into smaller subarrays, sort them, and then merge them back together.',
    defaultCode: `function mergeSort(arr) {
      if (arr.length <= 1) return arr;
      
      const mid = Math.floor(arr.length / 2);
      const left = arr.slice(0, mid);
      const right = arr.slice(mid);
      
      return merge(mergeSort(left), mergeSort(right));
    }
    
    function merge(left, right) {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;
      
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
      
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }`
  },
  // Add more default algorithms here
];

interface AlgorithmStore {
  selectedAlgorithm: Algorithm | null;
  code: string;
  availableAlgorithms: Algorithm[];
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
  setCode: (code: string) => void;
  initializeVisualization: () => void;
  runVisualizationForAllAlgorithms: () => void;
}

export const useAlgorithmStore = create<AlgorithmStore>((set, get) => ({
  selectedAlgorithm: null,
  code: "",
  availableAlgorithms: defaultAlgorithms,

  setSelectedAlgorithm: (algorithm) =>
    set({ 
      selectedAlgorithm: algorithm, 
      code: algorithm.defaultCode 
    }),

  setCode: (code) => set({ code }),

  initializeVisualization: () => {
    const visualizationStore = useVisualizationStore.getState();
    const { selectedAlgorithm } = get();
    
    if (selectedAlgorithm) {
      visualizationStore.resetVisualization();
      visualizationStore.setAlgorithmCode(selectedAlgorithm.defaultCode);
    }
  },

  runVisualizationForAllAlgorithms: () => {
    const visualizationStore = useVisualizationStore.getState();
    const { availableAlgorithms } = get();

    // Reset visualization before starting
    visualizationStore.resetVisualization();

    // Run visualization for each algorithm
    availableAlgorithms.forEach(algorithm => {
      // Set the current algorithm code
      visualizationStore.setAlgorithmCode(algorithm.defaultCode);
      
      // Run visualization with a default input
      visualizationStore.runVisualization([5, 2, 9, 1, 7, 6, 3]);
    });
  }
}));