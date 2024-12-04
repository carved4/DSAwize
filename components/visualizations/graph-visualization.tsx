"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { VisualizationState } from '@/lib/types/algorithm';

interface GraphNode {
  id: string;
  x?: number;
  y?: number;
  fx?: number;
  fy?: number;
}

interface GraphLink {
  source: string;
  target: string;
  weight?: number;
}

interface GraphVisualizationProps {
  state: Pick<VisualizationState, 'nodes' | 'links' | 'visited' | 'current' | 'path'>;
}

export function GraphVisualization({ state }: GraphVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !state.nodes || state.nodes.length === 0) return;

    const width = svgRef.current.clientWidth || 600;
    const height = svgRef.current.clientHeight || 400;

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Create forces for graph layout
    const simulation = d3.forceSimulation<GraphNode>(state.nodes)
      .force("link", d3.forceLink(state.links || []).id((d: any) => d.id))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // Create links
    const links = svg.append("g")
      .selectAll("line")
      .data(state.links || [])
      .enter()
      .append("line")
      .attr("stroke", "#999")
      .attr("stroke-width", d => d.weight ? Math.log(d.weight) : 2)
      .attr("stroke-opacity", 0.6);

    // Create nodes
    const nodes = svg.append("g")
      .selectAll("circle")
      .data(state.nodes)
      .enter()
      .append("circle")
      .attr("r", 10)
      .attr("fill", (d) => {
        if (d.id === state.current) return "#ff0000";
        if (state.visited?.includes(d.id)) return "#00ff00";
        if (state.path?.includes(d.id)) return "#0000ff";
        return "#999";
      })
      .call(d3.drag<SVGCircleElement, GraphNode>()
        .on("start", (event: d3.D3DragEvent<SVGCircleElement, GraphNode, unknown>, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event: d3.D3DragEvent<SVGCircleElement, GraphNode, unknown>, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event: d3.D3DragEvent<SVGCircleElement, GraphNode, unknown>, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = undefined;
          d.fy = undefined;
        }));

    // Add node labels
    const labels = svg.append("g")
      .selectAll("text")
      .data(state.nodes)
      .enter()
      .append("text")
      .text((d) => d.id)
      .attr("font-size", "12px")
      .attr("dx", 12)
      .attr("dy", 4);

    // Add weight labels if they exist
    svg.append("g")
      .selectAll("text")
      .data(state.links || [])
      .enter()
      .append("text")
      .text((d) => d.weight !== undefined ? d.weight.toString() : "")
      .attr("font-size", "10px")
      .attr("text-anchor", "middle");

    // Update positions on simulation tick
    simulation.on("tick", () => {
      links
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      nodes
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      labels
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

  }, [state]);

  return (
    <svg
      ref={svgRef}
      className="w-full h-full"
    />
  );
}
