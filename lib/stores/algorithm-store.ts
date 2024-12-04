"use client";

import { create } from "zustand";
import { Algorithm } from "@/lib/types/algorithm";
import { algorithms } from "@/lib/algorithms";

interface AlgorithmStore {
  selectedAlgorithm: Algorithm | null;
  code: string;
  availableAlgorithms: Algorithm[];
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
  setCode: (code: string) => void;
  initializeVisualization: () => void;
}

export const useAlgorithmStore = create<AlgorithmStore>((set) => ({
  selectedAlgorithm: null,
  code: "",
  availableAlgorithms: algorithms,

  setSelectedAlgorithm: (algorithm) =>
    set({ 
      selectedAlgorithm: algorithm, 
      code: algorithm.defaultCode 
    }),

  setCode: (code) => set({ code }),

  initializeVisualization: () => {
    console.log("Initializing visualization for selected algorithm");
  }
}));