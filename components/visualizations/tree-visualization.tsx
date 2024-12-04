"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { TreeVisualizationState, VisualizationComponentProps } from '@/lib/types/visualization';
import { TreeNode } from '@/lib/types/algorithm';

// Create a D3-compatible tree node interface
interface D3TreeNode {
  value: number;
  data: TreeNode;
  children?: D3TreeNode[];
}

export function TreeVisualization({ state, className = '' }: VisualizationComponentProps<TreeVisualizationState>) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || !state.tree) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Clear previous visualization
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    // Convert TreeNode to a D3-compatible structure
    const convertToD3HierarchyNode = (node: TreeNode): D3TreeNode => ({
      value: node.value,
      data: node,
      children: [
        ...(node.left ? [convertToD3HierarchyNode(node.left)] : []),
        ...(node.right ? [convertToD3HierarchyNode(node.right)] : [])
      ]
    });

    // Convert the tree to a D3-compatible format
    const d3CompatibleTree = convertToD3HierarchyNode(state.tree);

    // Use d3.hierarchy with the converted tree
    const root = d3.hierarchy<D3TreeNode>(d3CompatibleTree);

    // Create tree layout
    const treeLayout = d3.tree<D3TreeNode>()
      .size([width - margin.left - margin.right, height - margin.top - margin.bottom]);

    // Apply layout
    const treeData = treeLayout(root);

    // Create container group with margin transform
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create links
    g.selectAll("path")
      .data(treeData.links())
      .join("path")
      .attr("fill", "none")
      .attr("stroke", "rgb(156, 163, 175)") // gray-400
      .attr("stroke-width", 2)
      .attr("d", (link: any) => d3.linkVertical()
        .x((d: any) => d.x)
        .y((d: any) => d.y)(link));

    // Create nodes group
    const nodes = g.selectAll("g.node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    nodes.append("circle")
      .attr("r", 20)
      .attr("fill", d => {
        const value = (d.data as D3TreeNode).value;
        if (value === state.currentNode) return "rgb(239, 68, 68)"; // red-500
        if (state.visitedNodes?.includes(value)) return "rgb(34, 197, 94)"; // green-500
        return "rgb(255, 255, 255)"; // white
      })
      .attr("stroke", "rgb(17, 24, 39)") // gray-900
      .attr("stroke-width", 2);

    nodes.append("text")
      .attr("dy", "0.3em")
      .attr("text-anchor", "middle")
      .attr("font-size", "12px")
      .attr("fill", "rgb(17, 24, 39)") // gray-900
      .text(d => (d.data as D3TreeNode).value);

  }, [state]);

  return (
    <svg
      ref={svgRef}
      className={`w-full h-full ${className}`}
    />
  );
}
