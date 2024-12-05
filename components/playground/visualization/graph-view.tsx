"use client";

import { useTheme } from 'next-themes';
import { VisualizationStep } from '@/lib/stores/visualization-store';
import { cn } from '@/lib/utils';

interface Node {
  x: number;
  y: number;
}

interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface GraphViewProps {
  currentStepData: VisualizationStep | null;
}

export function GraphView({ currentStepData }: GraphViewProps) {
  const { theme } = useTheme();

  const nodes: Record<string, Node> = {
    'A': { x: 150, y: 150 },
    'B': { x: 300, y: 75 },
    'C': { x: 300, y: 225 },
    'D': { x: 450, y: 150 },
    'E': { x: 600, y: 150 }
  };

  const edges: Edge[] = [
    { from: 'A', to: 'B', weight: 4 },
    { from: 'A', to: 'C', weight: 2 },
    { from: 'B', to: 'D', weight: 3 },
    { from: 'C', to: 'D', weight: 1 },
    { from: 'D', to: 'E', weight: 5 }
  ];

  const getNodeColor = (node: string) => {
    if (!currentStepData) return theme === 'dark' ? '#3b82f6' : '#2563eb';

    const path = currentStepData.details?.path || [];
    const currentNode = currentStepData.details?.values?.[0];
    
    if (node === currentNode) {
      return theme === 'dark' ? '#f59e0b' : '#d97706'; // Orange for current node
    }
    
    if (path.includes(node)) {
      return theme === 'dark' ? '#22c55e' : '#16a34a'; // Green for shortest path
    }

    return theme === 'dark' ? '#3b82f6' : '#2563eb'; // Default blue
  };

  const getEdgeColor = (from: string, to: string) => {
    if (!currentStepData?.details?.path) return '#6b7280';

    const path = currentStepData.details.path;
    const isInPath = path.some((node, i) => 
      i < path.length - 1 && 
      ((path[i] === from && path[i + 1] === to) || 
       (path[i] === to && path[i + 1] === from))
    );

    return isInPath ? '#22c55e' : '#6b7280';
  };

  const getNodeAnimation = (node: string) => {
    if (!currentStepData?.details?.values) return "";

    const currentNode = currentStepData.details.values[0];
    const path = currentStepData.details.path || [];

    if (node === currentNode) {
      return "animate-pulse";
    }
    
    if (path.includes(node)) {
      return "animate-bounce";
    }

    return "";
  };

  const getEdgeAnimation = (from: string, to: string) => {
    if (!currentStepData?.details?.path) return "";

    const path = currentStepData.details.path;
    const isInPath = path.some((node, i) => 
      i < path.length - 1 && 
      ((path[i] === from && path[i + 1] === to) || 
       (path[i] === to && path[i + 1] === from))
    );

    return isInPath ? "animate-pulse" : "";
  };

  return (
    <div className="w-full h-full relative">
      <svg className="w-full h-full" viewBox="0 0 750 300">
        {/* Draw edges */}
        {edges.map(({ from, to, weight }) => (
          <g key={`${from}-${to}`}>
            <line
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke={getEdgeColor(from, to)}
              strokeWidth={2}
              className={cn(
                "transition-all duration-300",
                getEdgeAnimation(from, to)
              )}
            />
            <text
              x={(nodes[from].x + nodes[to].x) / 2}
              y={(nodes[from].y + nodes[to].y) / 2 - 10}
              textAnchor="middle"
              className="text-xs fill-muted-foreground"
            >
              {weight}
            </text>
          </g>
        ))}
        
        {/* Draw nodes */}
        {Object.entries(nodes).map(([id, { x, y }]) => (
          <g key={id}>
            <circle
              cx={x}
              cy={y}
              r={25}
              fill={getNodeColor(id)}
              className={cn(
                "transition-all duration-300",
                getNodeAnimation(id)
              )}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className={cn(
                "text-sm font-semibold fill-white transition-all duration-300",
                getNodeAnimation(id)
              )}
            >
              {id}
            </text>
            {currentStepData?.details?.distance !== undefined && 
             currentStepData.details.values?.[0] === id && (
              <text
                x={x}
                y={y + 40}
                textAnchor="middle"
                className={cn(
                  "text-xs fill-muted-foreground",
                  "animate-fade-in"
                )}
              >
                Distance: {currentStepData.details.distance}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
} 