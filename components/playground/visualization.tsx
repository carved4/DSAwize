"use client";

import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { useEffect } from "react";

export function Visualization() {
  const { 
    selectedAlgorithm, 
    visualizationState, 
    isPlaying,
    stepForward 
  } = useAlgorithmStore();

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying && visualizationState) {
      intervalId = setInterval(() => {
        stepForward();
      }, 500);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying, visualizationState, stepForward]);

  if (!selectedAlgorithm || !visualizationState) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        Select an algorithm to visualize
      </div>
    );
  }

  const { array, comparisons, swaps } = visualizationState;

  const maxValue = Math.max(...array);

  return (
    <div className="w-full h-full flex flex-col">
      <h2 className="text-lg font-semibold mb-4">
        {selectedAlgorithm.name} Visualization
      </h2>
      <div className="flex items-end space-x-2 h-full">
        {array.map((value, index) => {
          const isComparing = comparisons.length > 0 && 
            comparisons[comparisons.length - 1].includes(index);
          const isSwapping = swaps.length > 0 && 
            swaps[swaps.length - 1].includes(index);

          return (
            <div 
              key={index} 
              className="flex-1 transition-all duration-300"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: isSwapping 
                  ? 'red' 
                  : isComparing 
                  ? 'orange' 
                  : 'blue',
                minWidth: '20px'
              }}
            >
              <div className="text-xs text-center text-white">
                {value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}