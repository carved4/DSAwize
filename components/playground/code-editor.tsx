"use client";

import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function CodeEditor() {
  const { 
    selectedAlgorithm, 
    code, 
    setCode 
  } = useAlgorithmStore();

  if (!selectedAlgorithm) {
    return (
      <div className="text-muted-foreground text-center py-4">
        Select an algorithm to view its code
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label>Code Implementation</Label>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="min-h-[200px] font-mono text-sm"
        placeholder="Edit the algorithm implementation here"
      />
    </div>
  );
}