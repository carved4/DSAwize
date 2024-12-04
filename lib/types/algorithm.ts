export type AlgorithmCategory = 'sorting' | 'searching' | 'graph' | 'grid' | 'tree' | 'dynamic';

export interface Complexity {
  time: {
    best?: string;
    average?: string;
    worst?: string;
  } | string;
  space?: string;
}

export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  complexity?: Complexity;
  defaultCode: string;
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