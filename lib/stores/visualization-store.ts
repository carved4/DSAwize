import { create } from "zustand";
import { GraphVisualizationState } from '@/lib/types/visualization';

export type VisualizationStepType = 
  | "comparison" 
  | "swap" 
  | "partition" 
  | "merge" 
  | "visit" 
  | "error"
  | "heapify"      // For heap sort
  | "gap-change"   // For shell sort
  | "count"        // For counting sort
  | "select"       // For selection sort
  | "search"       // Add for binary search
  | "path-update";  // Add for Dijkstra's

export interface VisualizationStep {
  type: VisualizationStepType;
  indices: number[];
  details?: {
    values?: (number | string)[];
    startIdx?: number;
    endIdx?: number;
    pivotIdx?: number;
    leftArray?: number[];
    rightArray?: number[];
    mergedArray?: number[];
    gap?: number;        // For shell sort
    heapSize?: number;   // For heap sort
    counts?: number[];   // For counting sort
    minIndex?: number;   // For selection sort
    target?: number;     // Add for binary search
    found?: boolean;     // Add for binary search
    distance?: number;   // Add for Dijkstra's
    path?: string[];    // Add for Dijkstra's
  };
}

interface VisualizationState {
  array: number[];
  steps: VisualizationStep[];
  currentStep: number;
  currentStepData: VisualizationStep | null;
  isPlaying: boolean;
  speed: number;
  algorithmType: string;
  algorithmCode: string;
  currentArray: number[];
  visualizationType: 'array' | 'graph' | 'grid';
  currentIndex: number;
  comparingIndex: number;
  sortedIndices: number[];
  
  // Actions
  setArray: (array: number[]) => void;
  setSteps: (steps: VisualizationStep[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetVisualization: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: number) => void;
  setAlgorithmType: (type: string) => void;
  setAlgorithmCode: (code: string) => void;
  generateSteps: (array: number[], type: string, code: string) => void;
  runVisualization: () => void;
}

interface VisualizationStore extends VisualizationState {
  graphState: GraphVisualizationState;
  setGraphState: (state: GraphVisualizationState) => void;
  generateGraphSteps: (nodes: any[], links: any[], type: string, code: string) => void;
}

export const useVisualizationStore = create<VisualizationStore>((set, get) => ({
  array: [],
  steps: [],
  currentStep: 0,
  currentStepData: null,
  isPlaying: false,
  speed: 1,
  algorithmType: "",
  algorithmCode: "",
  currentArray: [],
  visualizationType: 'array',
  currentIndex: -1,
  comparingIndex: -1,
  sortedIndices: [],

  setArray: (array) => set({ array, currentArray: [...array] }),
  setSteps: (steps) => set({ steps }),
  
  nextStep: () => {
    const { currentStep, steps, array } = get();
    if (currentStep < steps.length - 1) {
      const nextStep = steps[currentStep + 1];
      const newArray = [...get().currentArray];

      // Update array based on step type
      switch (nextStep.type) {
        case 'swap':
          const [i, j] = nextStep.indices;
          const temp = newArray[i];
          newArray[i] = newArray[j];
          newArray[j] = temp;
          break;
        case 'comparison':
          // Just highlight the comparison, don't modify array
          break;
        case 'gap-change':
          // Just highlight the gap change, array updates through swaps
          break;
        case 'count':
          // Just highlight the counting, array updates through swaps
          break;
      }

      set({
        currentStep: currentStep + 1,
        currentStepData: nextStep,
        currentArray: newArray,
        isPlaying: currentStep + 1 === steps.length - 1 ? false : get().isPlaying
      });
    } else {
      set({ isPlaying: false });
    }
  },

  prevStep: () => {
    const { currentStep, steps, array } = get();
    if (currentStep > 0) {
      const prevStep = steps[currentStep - 1];
      const newArray = [...get().currentArray];

      // Reverse the previous operation
      if (prevStep.type === 'swap') {
        const [i, j] = prevStep.indices;
        const temp = newArray[i];
        newArray[i] = newArray[j];
        newArray[j] = temp;
      }

      set({
        currentStep: currentStep - 1,
        currentStepData: prevStep,
        currentArray: newArray
      });
    }
  },

  resetVisualization: () => {
    const { array, graphState } = get();
    set({
      currentStep: 0,
      currentStepData: null,
      isPlaying: false,
      currentArray: [...array],
      graphState: {
        ...graphState,
        visited: [],
        current: null,
        path: []
      }
    });
  },

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),
  setAlgorithmType: (type) => set({ algorithmType: type }),
  setAlgorithmCode: (code) => set({ algorithmCode: code }),

  generateSteps: (array, type, code) => {
    set({ array: [...array] });
    const steps: VisualizationStep[] = [];
    const workingArray = [...array];

    try {
      // Wrap the algorithm code with our recording functions
      const wrappedCode = `
        function __recordComparison(i, j) {
          __steps.push({
            type: 'comparison',
            indices: [i, j],
            details: { values: [arr[i], arr[j]] }
          });
        }

        function __recordSwap(i, j) {
          __steps.push({
            type: 'swap',
            indices: [i, j],
            details: { values: [arr[i], arr[j]] }
          });
        }

        function __recordPartition(low, high, pivot) {
          __steps.push({
            type: 'partition',
            indices: [low, high],
            details: { 
              values: [arr[low], arr[high], pivot],
              pivotIdx: high,
              leftArray: arr.slice(low, high + 1)
            }
          });
        }

        function __recordMerge(start, end, array) {
          __steps.push({
            type: 'merge',
            indices: [start, end],
            details: {
              startIdx: start,
              endIdx: end,
              mergedArray: array
            }
          });
        }

        function __recordHeapify(root, heapSize) {
          __steps.push({
            type: 'heapify',
            indices: [root, root * 2 + 1, root * 2 + 2].filter(i => i < heapSize),
            details: { 
              values: [arr[root]],
              heapSize
            }
          });
        }

        function __recordGapChange(gap) {
          __steps.push({
            type: 'gap-change',
            indices: [],
            details: { 
              values: [gap],
              gap
            }
          });
        }

        function __recordCount(index, count) {
          __steps.push({
            type: 'count',
            indices: [index],
            details: { 
              values: [count],
              counts: [...count]
            }
          });
        }

        function __recordSelect(currentIndex, minIndex) {
          __steps.push({
            type: 'select',
            indices: [currentIndex, minIndex],
            details: { 
              values: [arr[currentIndex], arr[minIndex]],
              minIndex
            }
          });
        }

        function __recordSearch(index, target, found = false) {
          __steps.push({
            type: 'search',
            indices: [index],
            details: { 
              values: [arr[index]],
              target,
              found
            }
          });
        }

        function __recordPathUpdate(vertex, distance, path) {
          __steps.push({
            type: 'path-update',
            indices: [],
            details: {
              values: [vertex],
              distance,
              path
            }
          });
        }

        ${code}

        // Execute the appropriate function based on algorithm type
        if (typeof bubbleSort === 'function') bubbleSort(arr);
        else if (typeof quickSort === 'function') quickSort(arr);
        else if (typeof mergeSort === 'function') mergeSort(arr);
        else if (typeof insertionSort === 'function') insertionSort(arr);
        else if (typeof selectionSort === 'function') selectionSort(arr);
        else if (typeof heapSort === 'function') heapSort(arr);
        else if (typeof shellSort === 'function') shellSort(arr);
        else if (typeof countingSort === 'function') countingSort(arr);
        else if (typeof binarySearch === 'function') binarySearch(arr, arr[0]);
      `;

      // Execute the wrapped code
      const fn = new Function('arr', '__steps', wrappedCode);
      const recordedSteps: VisualizationStep[] = [];
      fn(workingArray, recordedSteps);

      set({ 
        steps: recordedSteps,
        currentStep: 0,
        currentStepData: recordedSteps[0] || null,
        isPlaying: false 
      });
    } catch (error) {
      console.error('Error executing algorithm:', error);
      steps.push({
        type: 'error',
        indices: [],
        details: { values: [(error as Error).message] }
      });
      set({ 
        steps,
        currentStep: 0,
        currentStepData: steps[0] || null,
        isPlaying: false 
      });
    }
  },

  runVisualization: () => {
    const { steps } = get();
    if (!steps?.length) return;

    get().resetVisualization();

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep >= steps.length) {
        clearInterval(interval);
        return;
      }

      const step = steps[currentStep];
      const graphState = { ...get().graphState };
      
      if (step.type === 'visit') {
        const nodeId = step.details?.values?.[0] as string;
        set({
          currentStep,
          currentStepData: step,
          graphState: {
            ...graphState,
            visited: [...graphState.visited, nodeId],
            current: nodeId
          }
        });
      } else if (step.type === 'path-update') {
        set({
          currentStep,
          currentStepData: step,
          graphState: {
            ...graphState,
            current: step.details?.values?.[0] as string,
            path: step.details?.path || []
          }
        });
      }

      currentStep++;
    }, 1000);
  },

  graphState: {
    nodes: [],
    links: [],
    visited: [],
    current: null,
    path: []
  },

  setGraphState: (state) => set({ graphState: state }),

  generateGraphSteps: (nodes, links, type, code) => {
    const steps: VisualizationStep[] = [];
    
    try {
      // Wrap the algorithm code with graph visualization hooks
      const wrappedCode = `
        function __recordVisit(nodeId) {
          __steps.push({
            type: 'visit',
            indices: [],
            details: {
              values: [nodeId],
              visited: [...visited],
              current: nodeId
            }
          });
        }

        function __recordPathUpdate(nodeId, distance, path) {
          __steps.push({
            type: 'path-update',
            indices: [],
            details: {
              values: [nodeId],
              distance,
              path: [...path]
            }
          });
        }

        const visited = new Set();
        ${code}
      `;

      const fn = new Function('nodes', 'links', '__steps', wrappedCode);
      const recordedSteps: VisualizationStep[] = [];
      fn(nodes, links, recordedSteps);

      set({
        steps: recordedSteps,
        currentStep: 0,
        currentStepData: recordedSteps[0] || null,
        graphState: {
          nodes,
          links,
          visited: [],
          current: null,
          path: []
        }
      });
    } catch (error) {
      console.error('Error executing graph algorithm:', error);
      steps.push({
        type: 'error',
        indices: [],
        details: { values: [(error as Error).message] }
      });
    }
  }
}));