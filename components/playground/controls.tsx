"use client";

import { Button } from "@/components/ui/button";
import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { useVisualizationStore } from "@/lib/stores/visualization-store";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";

export function Controls() {
  const { selectedAlgorithm } = useAlgorithmStore();
  const { 
    isPlaying, 
    setIsPlaying, 
    nextStep, 
    resetVisualization,
    steps 
  } = useVisualizationStore();

  if (!selectedAlgorithm) {
    return null;
  }

  const handlePlay = () => {
    if (steps.length === 0) {
      const array = [5, 3, 8, 4, 2, 7, 1, 6]; // Initial test array
      resetVisualization();
      useVisualizationStore.getState().generateSteps(
        array,
        selectedAlgorithm?.id || '',
        selectedAlgorithm?.defaultCode || ''
      );
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (steps.length === 0) {
      const array = [5, 3, 8, 4, 2, 7, 1, 6]; // Initial test array
      resetVisualization();
      useVisualizationStore.getState().generateSteps(
        array,
        selectedAlgorithm?.id || '',
        selectedAlgorithm?.defaultCode || ''
      );
    }
    nextStep();
  };

  const handleReset = () => {
    resetVisualization();
  };

  return (
    <div className="flex space-x-2">
      {isPlaying ? (
        <Button 
          variant="outline" 
          onClick={handlePause}
        >
          <Pause className="mr-2 h-4 w-4" /> Pause
        </Button>
      ) : (
        <Button 
          variant="outline" 
          onClick={handlePlay}
        >
          <Play className="mr-2 h-4 w-4" /> Play
        </Button>
      )}
      
      <Button 
        variant="outline" 
        onClick={handleStepForward}
        disabled={isPlaying}
      >
        <StepForward className="mr-2 h-4 w-4" /> Step
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleReset}
      >
        <RotateCcw className="mr-2 h-4 w-4" /> Reset
      </Button>
    </div>
  );
}