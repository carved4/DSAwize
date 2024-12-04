import { create } from "zustand";
import { Algorithm, algorithms } from "@/lib/algorithms";

interface AlgorithmState {
  selectedAlgorithm: Algorithm | null;
  code: string;
  isPlaying: boolean;
  visualizationState: {
    array: number[];
    currentStep: number;
    comparisons: number[][];
    swaps: number[][];
  } | null;
  availableAlgorithms: Algorithm[];
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
  setCode: (code: string) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  initializeVisualization: (array?: number[]) => void;
  stepForward: () => void;
  reset: () => void;
}

export const useAlgorithmStore = create<AlgorithmState>((set, get) => ({
  selectedAlgorithm: null,
  code: "",
  isPlaying: false,
  visualizationState: null,
  availableAlgorithms: algorithms,

  setSelectedAlgorithm: (algorithm) =>
    set({ 
      selectedAlgorithm: algorithm, 
      code: algorithm.defaultCode 
    }),

  setCode: (code) => set({ code }),

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  initializeVisualization: (array) => {
    const randomArray = array || Array.from(
      { length: 10 }, 
      () => Math.floor(Math.random() * 100)
    );

    set({
      visualizationState: {
        array: [...randomArray],
        currentStep: 0,
        comparisons: [],
        swaps: []
      }
    });
  },

  stepForward: () => {
    const state = get();
    if (!state.visualizationState || !state.selectedAlgorithm) return;

    const { array, currentStep, comparisons, swaps } = state.visualizationState;

    // Bubble Sort visualization logic
    if (state.selectedAlgorithm.id === 'bubble-sort') {
      if (currentStep < array.length - 1) {
        const newComparisons: number[] = [];
        const newSwaps: number[] = [];

        for (let j = 0; j < array.length - currentStep - 1; j++) {
          newComparisons.push(j);
          
          if (array[j] > array[j + 1]) {
            // Swap
            [array[j], array[j + 1]] = [array[j + 1], array[j]];
            newSwaps.push(j);
          }
        }

        set({
          visualizationState: {
            array: [...array],
            currentStep: currentStep + 1,
            comparisons: [...comparisons, newComparisons],
            swaps: [...swaps, newSwaps]
          }
        });
      }
    }
  },

  reset: () => {
    const state = get();
    if (state.selectedAlgorithm) {
      const randomArray = Array.from(
        { length: 10 }, 
        () => Math.floor(Math.random() * 100)
      );

      set({
        visualizationState: {
          array: randomArray,
          currentStep: 0,
          comparisons: [],
          swaps: []
        },
        isPlaying: false
      });
    }
  }
}));