"use client";

import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

export function AlgorithmSelector() {
  const { 
    availableAlgorithms, 
    selectedAlgorithm, 
    setSelectedAlgorithm,
    initializeVisualization 
  } = useAlgorithmStore();

  const handleAlgorithmChange = (algorithmId: string) => {
    const algorithm = availableAlgorithms.find(algo => algo.id === algorithmId);
    if (algorithm) {
      setSelectedAlgorithm(algorithm);
      initializeVisualization();
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-muted-foreground">
        Select Algorithm
      </label>
      <Select 
        value={selectedAlgorithm?.id || ''} 
        onValueChange={handleAlgorithmChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Choose an algorithm" />
        </SelectTrigger>
        <SelectContent>
          {availableAlgorithms.map((algorithm) => (
            <SelectItem key={algorithm.id} value={algorithm.id}>
              {algorithm.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedAlgorithm && (
        <p className="text-sm text-muted-foreground mt-2">
          {selectedAlgorithm.description}
        </p>
      )}
    </div>
  );
}