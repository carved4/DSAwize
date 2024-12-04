"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GridVisualizationProps {
  state: {
    grid: number[][];
    start?: [number, number];
    end?: [number, number];
    walls?: [number, number][];
    visitedCells?: [number, number][];
    currentCell?: [number, number];
    path2D?: [number, number][];
  };
}

export function GridVisualization({ state }: GridVisualizationProps) {
  if (!state.grid) return null;

  const getCellClassName = (row: number, col: number) => {
    const isStart = state.start?.[0] === row && state.start?.[1] === col;
    const isEnd = state.end?.[0] === row && state.end?.[1] === col;
    const isWall = state.walls?.some(([r, c]) => r === row && c === col);
    const isVisited = state.visitedCells?.some(([r, c]) => r === row && c === col);
    const isCurrent = state.currentCell?.[0] === row && state.currentCell?.[1] === col;
    const isPath = state.path2D?.some(([r, c]) => r === row && c === col);

    return cn(
      "w-8 h-8 border border-border transition-colors duration-200",
      {
        "bg-green-500": isStart,
        "bg-red-500": isEnd,
        "bg-slate-800": isWall,
        "bg-blue-200": isVisited && !isPath && !isCurrent,
        "bg-yellow-400": isCurrent,
        "bg-purple-500": isPath && !isStart && !isEnd,
      }
    );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="grid gap-0.5 p-4 bg-background rounded-lg">
        {state.grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-0.5">
            {row.map((_, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getCellClassName(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500" /> Start
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500" /> End
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-slate-800" /> Wall
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200" /> Visited
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500" /> Path
        </div>
      </div>
    </div>
  );
}
