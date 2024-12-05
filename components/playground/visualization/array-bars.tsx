"use client";

import { useTheme } from 'next-themes';
import { VisualizationStep } from '@/lib/stores/visualization-store';
import { useVisualizationStore } from '@/lib/stores/visualization-store';
import { cn } from '@/lib/utils';

interface ArrayBarsProps {
  array: number[];
  currentStep: number;
  currentStepData: VisualizationStep | null;
}

export function ArrayBars({ array, currentStep, currentStepData }: ArrayBarsProps) {
  const { theme } = useTheme();
  const { currentArray } = useVisualizationStore();
  
  if (!currentArray || currentArray.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        No data to display
      </div>
    );
  }

  const maxValue = Math.max(...currentArray);

  const getBarColor = (index: number) => {
    if (!currentStepData) return theme === 'dark' ? '#3b82f6' : '#2563eb';

    const { type, indices } = currentStepData;

    switch (type) {
      case 'comparison':
        return indices.includes(index)
          ? (theme === 'dark' ? '#f59e0b' : '#d97706') // Orange for comparisons
          : (theme === 'dark' ? '#3b82f6' : '#2563eb');
      case 'swap':
        return indices.includes(index)
          ? (theme === 'dark' ? '#ef4444' : '#dc2626') // Red for swaps
          : (theme === 'dark' ? '#3b82f6' : '#2563eb');
      case 'search':
        return indices.includes(index)
          ? currentStepData.details?.found
            ? (theme === 'dark' ? '#22c55e' : '#16a34a') // Green for found
            : (theme === 'dark' ? '#f59e0b' : '#d97706') // Orange for searching
          : (theme === 'dark' ? '#3b82f6' : '#2563eb');
      case 'path-update':
        return currentStepData.details?.path?.includes(index.toString())
          ? (theme === 'dark' ? '#a855f7' : '#9333ea') // Purple for path
          : (theme === 'dark' ? '#3b82f6' : '#2563eb');
      default:
        return theme === 'dark' ? '#3b82f6' : '#2563eb';
    }
  };

  const getBarEffects = (index: number) => {
    if (!currentStepData) return "";
    const { type, indices } = currentStepData;

    switch (type) {
      case 'search':
        return indices.includes(index)
          ? currentStepData.details?.found
            ? "scale-y-110 shadow-lg animate-pulse"
            : "scale-y-105"
          : "";
      case 'path-update':
        return currentStepData.details?.path?.includes(index.toString())
          ? "scale-y-110 shadow-lg animate-pulse"
          : "";
      default:
        return indices.includes(index) ? "scale-y-110" : "";
    }
  };

  return (
    <div className="flex items-end justify-center h-full gap-1 p-4">
      {currentArray.map((value, index) => (
        <div
          key={`${index}-${value}`}
          className={cn(
            "relative flex-1 min-w-[2px] max-w-[50px] rounded-t-sm",
            "transform transition-all duration-300 ease-in-out",
            getBarEffects(index)
          )}
          style={{
            height: `${(value / maxValue) * 100}%`,
            backgroundColor: getBarColor(index),
          }}
        >
          <span 
            className={cn(
              "absolute bottom-[-24px] left-1/2 transform -translate-x-1/2",
              "px-2 py-1 rounded text-xs transition-all duration-300",
              currentStepData?.indices.includes(index) 
                ? "font-bold scale-110 bg-secondary text-secondary-foreground" 
                : "text-muted-foreground"
            )}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}