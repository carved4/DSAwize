"use client";

import { useEffect } from 'react';
import { useVisualizationStore } from '@/lib/stores/visualization-store';

export function useVisualization() {
  const { 
    visualizationState,
    isPlaying,
    stepForward
  } = useVisualizationStore();

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

  return { visualizationState };
}