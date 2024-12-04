"use client";

import { Button } from "@/components/ui/button";
import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  StepForward 
} from "lucide-react";

export function Controls() {
  const { 
    selectedAlgorithm, 
    isPlaying, 
    setIsPlaying, 
    stepForward, 
    reset,
    visualizationState 
  } = useAlgorithmStore();

  if (!selectedAlgorithm) {
    return null;
  }

  const handlePlay = () => {
    if (!visualizationState) {
      reset();
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStepForward = () => {
    if (!visualizationState) {
      reset();
    }
    stepForward();
  };

  const handleReset = () => {
    reset();
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