"use client";

import { useEffect } from 'react';
import { GraphVisualization } from '@/components/visualizations/graph-visualization';
import { useVisualizationStore } from '@/lib/stores/visualization-store';

export function GraphView() {
  const { setGraphState, generateGraphSteps, runVisualization, graphState, currentStep, steps } = useVisualizationStore();

  useEffect(() => {
    const initialNodes = [
      { id: 'A', x: 150, y: 150 },
      { id: 'B', x: 300, y: 75 },
      { id: 'C', x: 300, y: 225 },
      { id: 'D', x: 450, y: 150 },
      { id: 'E', x: 600, y: 150 }
    ];

    const initialLinks = [
      { source: 'A', target: 'B', weight: 4 },
      { source: 'A', target: 'C', weight: 2 },
      { source: 'B', target: 'D', weight: 3 },
      { source: 'C', target: 'D', weight: 1 },
      { source: 'D', target: 'E', weight: 5 }
    ];

    setGraphState({
      nodes: initialNodes,
      links: initialLinks,
      visited: [],
      current: null,
      path: []
    });

    generateGraphSteps(initialNodes, initialLinks, 'dijkstra', `
      __recordVisit('A');
      __recordPathUpdate('A', 0, ['A']);
      __recordVisit('B');
      __recordPathUpdate('B', 4, ['A', 'B']);
      __recordVisit('C');
      __recordPathUpdate('C', 2, ['A', 'C']);
      __recordVisit('D');
      __recordPathUpdate('D', 3, ['A', 'C', 'D']);
      __recordVisit('E');
      __recordPathUpdate('E', 8, ['A', 'C', 'D', 'E']);
    `);

    setTimeout(runVisualization, 1000);
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="text-sm text-muted-foreground text-center py-2">
        Step {currentStep + 1} of {steps.length}
      </div>
      <div className="flex-1">
        <GraphVisualization state={graphState} className="w-full h-full" />
      </div>
    </div>
  );
} 