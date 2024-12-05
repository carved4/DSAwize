"use client";

import { useEffect, useRef } from "react";
import { useVisualizationStore } from "@/lib/stores/visualization-store";
import { ArrayBars } from "./visualization/array-bars";
import { GraphView } from "./visualization/graph-view";
import { Button } from "@/components/ui/button";
import { Play, Pause, SkipBack, SkipForward, RotateCcw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function Visualization() {
  const {
    currentArray,
    steps,
    currentStep,
    currentStepData,
    isPlaying,
    speed,
    algorithmType,
    nextStep,
    prevStep,
    resetVisualization,
    setIsPlaying,
    setSpeed
  } = useVisualizationStore();

  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isPlaying) {
      timeoutRef.current = setTimeout(() => {
        nextStep();
      }, 1000 / speed);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying, currentStep, speed, nextStep]);

  const renderVisualization = () => {
    if (algorithmType === "dijkstra") {
      return <GraphView currentStepData={currentStepData} />;
    }

    return (
      <ArrayBars
        array={currentArray}
        currentStep={currentStep}
        currentStepData={currentStepData}
      />
    );
  };

  if (!currentArray || currentArray.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Select an algorithm to begin visualization
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4 p-4">
      <div className="flex-1 relative">
        {renderVisualization()}
      </div>

      <div className="flex flex-col gap-4">
        {/* Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={resetVisualization}
              disabled={currentStep === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={prevStep}
              disabled={currentStep === 0 || isPlaying}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentStep === steps.length - 1}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextStep}
              disabled={currentStep === steps.length - 1 || isPlaying}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-4 min-w-[200px]">
            <span className="text-sm">Speed:</span>
            <Slider
              value={[speed]}
              min={1}
              max={10}
              step={1}
              onValueChange={([value]) => setSpeed(value)}
              disabled={isPlaying}
            />
          </div>
        </div>

        {/* Step Information */}
        <div className="h-20 flex items-center justify-center">
          {currentStepData && (
            <div className="text-sm text-muted-foreground">
              <div className="font-medium">Step {currentStep + 1} of {steps.length}</div>
              {algorithmType === "dijkstra" ? (
                <div>
                  {currentStepData.details?.distance !== undefined && (
                    <span>
                      Distance to {currentStepData.details.values?.[0]}: {currentStepData.details.distance}
                    </span>
                  )}
                </div>
              ) : (
                <div>
                  {currentStepData.type === 'comparison' && (
                    <span>Comparing elements at indices [{currentStepData.indices.join(", ")}]</span>
                  )}
                  {currentStepData.type === 'swap' && (
                    <span>Swapping elements at indices [{currentStepData.indices.join(", ")}]</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}