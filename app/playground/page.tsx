"use client";

import { AlgorithmSelector } from "@/components/playground/algorithm-selector";
import { CodeEditor } from "@/components/playground/code-editor";
import { Visualization } from "@/components/playground/visualization";
import { Controls } from "@/components/playground/controls";
import { useAlgorithmStore } from "@/lib/stores/algorithm-store";

export default function PlaygroundPage() {
  const { selectedAlgorithm } = useAlgorithmStore();

  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-3.5rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
        <div className="space-y-4">
          <AlgorithmSelector />
          <CodeEditor />
          <Controls />
        </div>
        <div className="bg-card rounded-lg p-4 shadow-lg">
          <Visualization />
        </div>
      </div>
    </div>
  );
}