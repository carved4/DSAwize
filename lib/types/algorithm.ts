export interface Algorithm {
  id: string;
  name: string;
  category: "sorting" | "searching" | "graph";
  defaultCode: string;
  description: string;
}

export interface VisualizationState {
  array: number[];
  currentStep: number;
  comparisons: number[][];
  swaps: number[][];
}