"use client";

import React from 'react';
import { ArrayVisualizationState, VisualizationComponentProps } from '@/lib/types/visualization';

export function ArrayVisualization({ state, className = '' }: VisualizationComponentProps<ArrayVisualizationState>) {
  if (!state.array) return null;

  const maxValue = Math.max(...state.array);
  
  return (
    <div className={`array-visualization ${className}`}>
      <div className="flex items-end space-x-2 h-full">
        {state.array.map((value, index) => {
          const isComparing = state.comparisons?.length > 0 && 
            state.comparisons[state.comparisons.length - 1]?.includes(index);
          const isSwapping = state.swaps?.length > 0 && 
            state.swaps[state.swaps.length - 1]?.includes(index);

          return (
            <div 
              key={`${index}-${value}`}
              className="flex-1 transition-all duration-300"
              style={{
                height: `${(value / maxValue) * 100}%`,
                backgroundColor: isSwapping 
                  ? 'rgb(239, 68, 68)' // red-500
                  : isComparing 
                  ? 'rgb(249, 115, 22)' // orange-500
                  : 'rgb(59, 130, 246)', // blue-500
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
