"use client";

import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { useVisualization } from "@/lib/hooks/useVisualization";
import { ArrayBars } from "./visualization/array-bars";

export function Visualization() {
  const { selectedAlgorithm } = useAlgorithmStore();
  const { visualizationState } = useVisualization();

  if (!selectedAlgorithm || !visualizationState) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select an algorithm to visualize
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">
        {selectedAlgorithm.name} Visualization
      </h2>
      <ArrayBars 
        array={visualizationState.array}
        comparisons={visualizationState.comparisons}
        swaps={visualizationState.swaps}
      />
    </div>
  );
}