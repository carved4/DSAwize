"use client";

import React, { useEffect, useRef } from 'react';
import { useVisualizationStore } from '@/lib/stores/visualization-store';
import { GraphVisualizationState, VisualizationComponentProps } from '@/lib/types/visualization';

export function GraphVisualization({ state, className = '' }: VisualizationComponentProps<GraphVisualizationState>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { currentStepData, graphState, setGraphState } = useVisualizationStore();
  
  // Center the graph in the viewport with padding
  useEffect(() => {
    if (!svgRef.current || !graphState.nodes.length) return;
    
    const svg = svgRef.current;
    const bbox = svg.getBoundingClientRect();
    const padding = 50; // Add padding
    const centerX = bbox.width / 2;
    const centerY = bbox.height / 2;

    // Scale down the positions to fit within the viewport
    const scale = 0.8; // Reduce to 80% of original size
    const adjustedNodes = graphState.nodes.map(node => ({
      ...node,
      x: centerX + (node.x - 300) * scale,
      y: centerY + (node.y - 150) * scale
    }));

    setGraphState({
      ...graphState,
      nodes: adjustedNodes
    });
  }, []);

  return (
    <div className={`graph-visualization ${className}`}>
      <svg ref={svgRef} className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        {/* Draw edges */}
        {graphState.links?.map((link) => (
          <line
            key={`${link.source}-${link.target}`}
            x1={graphState.nodes.find(n => n.id === link.source)?.x || 0}
            y1={graphState.nodes.find(n => n.id === link.source)?.y || 0}
            x2={graphState.nodes.find(n => n.id === link.target)?.x || 0}
            y2={graphState.nodes.find(n => n.id === link.target)?.y || 0}
            stroke={graphState.path?.includes(link.source) && graphState.path?.includes(link.target) 
              ? '#22c55e' // green-500 for path
              : '#6b7280' // gray-500 for normal
            }
            strokeWidth={3}
            className="transition-colors duration-500"
          />
        ))}

        {/* Draw nodes */}
        {graphState.nodes.map((node) => (
          <g key={node.id} className="transition-transform duration-500">
            <circle
              cx={node.x}
              cy={node.y}
              r={25}
              fill={
                node.id === graphState.current
                  ? '#ef4444' // red-500 for current
                  : graphState.visited?.includes(node.id)
                  ? '#22c55e' // green-500 for visited
                  : graphState.path?.includes(node.id)
                  ? '#3b82f6' // blue-500 for path
                  : '#6b7280' // gray-500 for unvisited
              }
              className="transition-colors duration-500 hover:opacity-80"
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={14}
              fontWeight="bold"
              className="pointer-events-none select-none"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
