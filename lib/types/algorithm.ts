export type AlgorithmCategory = 'sorting' | 'searching' | 'graph' | 'grid' | 'tree' | 'dynamic';

export type TimeComplexity = {
  best?: string;
  average?: string;
  worst?: string;
} | string;

export interface Complexity {
  time: TimeComplexity;
  space?: string;
}

export interface Algorithm {
  id: string;
  name: string;
  description: string;
  defaultCode: string;
  pythonCode: string;
  timeComplexity: string;
  spaceComplexity: string;
  category: 'sorting' | 'searching' | 'graph';
}

export interface TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;
}

export interface VisualizationState {
  // Array-based algorithms
  array?: number[];
  currentStep?: number;
  comparisons?: number[][];
  swaps?: number[][];
  
  // Graph-based algorithms
  nodes?: { id: string; x?: number; y?: number; }[];
  links?: { source: string; target: string; weight?: number; }[];
  visited?: string[];
  current?: string;
  path?: string[];
  
  // Grid-based algorithms
  grid?: number[][];
  start?: [number, number];
  end?: [number, number];
  walls?: [number, number][];
  visitedCells?: [number, number][];
  currentCell?: [number, number];
  path2D?: [number, number][];
  
  // Tree-based algorithms
  tree?: TreeNode;
  visitedNodes?: number[];
  currentNode?: number;
}