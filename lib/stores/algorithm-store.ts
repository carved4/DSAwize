"use client";

import { create } from "zustand";
import { Algorithm } from "@/lib/types/algorithm";
import { algorithms } from "@/lib/algorithms";
import { useVisualizationStore } from "./visualization-store";

interface AlgorithmStore {
  selectedAlgorithm: Algorithm | null;
  code: string;
  language: 'javascript' | 'python';
  availableAlgorithms: Algorithm[];
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
  setCode: (code: string) => void;
  setLanguage: (language: 'javascript' | 'python') => void;
  initializeVisualization: () => void;
  runVisualizationForAllAlgorithms: () => void;
}

export const useAlgorithmStore = create<AlgorithmStore>((set, get) => ({
  selectedAlgorithm: null,
  code: "",
  language: 'javascript',
  availableAlgorithms: algorithms,

  setLanguage: (language) => {
    const { selectedAlgorithm } = get();
    set({ 
      language,
      code: language === 'javascript' 
        ? selectedAlgorithm?.defaultCode || ''
        : selectedAlgorithm?.pythonCode || ''
    });
  },

  setSelectedAlgorithm: (algorithm) => {
    const { language } = get();
    set({ 
      selectedAlgorithm: algorithm,
      code: language === 'javascript' ? algorithm.defaultCode : algorithm.pythonCode
    });
    
    // Initialize visualization when algorithm is selected
    const visualizationStore = useVisualizationStore.getState();
    visualizationStore.setArray([5, 3, 8, 4, 2, 7, 1, 6]);
    visualizationStore.setAlgorithmCode(algorithm.defaultCode);
    visualizationStore.setAlgorithmType(algorithm.id);
    visualizationStore.generateSteps(
      [5, 3, 8, 4, 2, 7, 1, 6],
      algorithm.id,
      algorithm.defaultCode
    );
  },

  setCode: (code) => {
    set({ code });
    // Update visualization store when code changes
    const visualizationStore = useVisualizationStore.getState();
    visualizationStore.setAlgorithmCode(code);
  },

  initializeVisualization: () => {
    const { selectedAlgorithm } = get();
    if (selectedAlgorithm) {
      const visualizationStore = useVisualizationStore.getState();
      visualizationStore.resetVisualization();
      visualizationStore.setAlgorithmCode(selectedAlgorithm.defaultCode);
    }
  },

  runVisualizationForAllAlgorithms: () => {
    const { availableAlgorithms } = get();
    const visualizationStore = useVisualizationStore.getState();
    
    availableAlgorithms.forEach(algorithm => {
      visualizationStore.setAlgorithmCode(algorithm.defaultCode);
      visualizationStore.runVisualization();
    });
  }
}));