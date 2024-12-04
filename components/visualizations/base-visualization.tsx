"use client";

import React from 'react';
import { useVisualization } from '@/lib/hooks/useVisualization';
import { useAlgorithmStore } from '@/lib/stores/algorithm-store';
import { ArrayVisualization } from './array-visualization';
import { GraphVisualization } from './graph-visualization';
import { GridVisualization } from './grid-visualization';
import { TreeVisualization } from './tree-visualization';
import { AlgorithmInfo } from '../algorithm-info';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VisualizationState } from '@/lib/types/algorithm';
import { 
  ArrayVisualizationState, 
  GraphVisualizationState, 
  GridVisualizationState, 
  TreeVisualizationState 
} from '@/lib/types/visualization';

const getVisualizationComponent = (
  category: string, 
  state: VisualizationState
) => {
  switch (category) {
    case 'sorting':
    case 'searching':
    case 'dynamic':
      return (
        <ArrayVisualization
          state={{
            array: state.array ?? [],
            currentStep: state.currentStep ?? 0,
            comparisons: state.comparisons ?? [],
            swaps: state.swaps ?? []
          } as ArrayVisualizationState}
        />
      );
    case 'graph':
      return (
        <GraphVisualization
          state={{
            nodes: state.nodes ?? [],
            links: state.links ?? [],
            visited: state.visited ?? [],
            current: state.current,
            path: state.path ?? []
          } as GraphVisualizationState}
        />
      );
    case 'grid':
      return (
        <GridVisualization
          state={{
            grid: state.grid ?? [],
            start: state.start,
            end: state.end,
            walls: state.walls ?? [],
            visitedCells: state.visitedCells ?? [],
            currentCell: state.currentCell,
            path2D: state.path2D ?? []
          } as GridVisualizationState}
        />
      );
    case 'tree':
      return (
        <TreeVisualization
          state={{
            tree: state.tree,
            visitedNodes: state.visitedNodes ?? [],
            currentNode: state.currentNode
          } as TreeVisualizationState}
        />
      );
    default:
      return null;
  }
};

export function BaseVisualization() {
  const { visualizationState } = useVisualization();
  const { selectedAlgorithm } = useAlgorithmStore();

  if (!visualizationState || !selectedAlgorithm) {
    return null;
  }

  return (
    <Card className="w-full h-[500px] flex flex-col">
      <CardHeader className="border-b p-4">
        <CardTitle className="text-lg font-semibold">
          {selectedAlgorithm.name} Visualization
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <div className="w-full h-full flex flex-col">
          <div className="flex-grow relative">
            {getVisualizationComponent(selectedAlgorithm.category, visualizationState)}
          </div>
          <div className="mt-4">
            <AlgorithmInfo algorithm={selectedAlgorithm} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
