"use client";

import { create } from "zustand";
import { VisualizationState } from "@/lib/types/algorithm";

interface VisualizationStore {
  visualizationState: VisualizationState | null;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  initializeVisualization: (array?: number[]) => void;
  stepForward: () => void;
  reset: () => void;
}

export const useVisualizationStore = create<VisualizationStore>((set, get) => ({
  visualizationState: null,
  isPlaying: false,

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
    if (!state.visualizationState) return;

    const { array, currentStep, comparisons, swaps } = state.visualizationState;

    if (currentStep < array.length - 1) {
      const newComparisons: number[] = [];
      const newSwaps: number[] = [];

      for (let j = 0; j < array.length - currentStep - 1; j++) {
        newComparisons.push(j);
        
        if (array[j] > array[j + 1]) {
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
  },

  reset: () => {
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
}));