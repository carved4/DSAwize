"use client";

import { VisualizationState } from '@/lib/types/algorithm';

interface ArrayBarsProps {
  array: number[];
  comparisons: number[][];
  swaps: number[][];
}

export function ArrayBars({ array, comparisons, swaps }: ArrayBarsProps) {
  const maxValue = Math.max(...array);

  return (
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
  );
}