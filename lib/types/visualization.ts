import { TreeNode } from './algorithm';

export interface ArrayVisualizationState {
  array: number[];
  currentStep: number;
  comparisons: number[][];
  swaps: number[][];
}

export interface GraphVisualizationState {
  nodes: { id: string; x: number; y: number; }[];
  links: { source: string; target: string; weight?: number; }[];
  visited: string[];
  current: string | null;
  path: string[];
}

export interface GridVisualizationState {
  grid: number[][];
  start?: [number, number];
  end?: [number, number];
  walls: [number, number][];
  visitedCells: [number, number][];
  currentCell?: [number, number];
  path2D: [number, number][];
}

export interface TreeVisualizationState {
  tree?: TreeNode;
  visitedNodes: number[];
  currentNode?: number;
}

export type VisualizationComponentProps<T> = {
  state: T;
  className?: string;
}
