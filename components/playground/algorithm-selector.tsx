"use client";

import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  // Group algorithms by category
  const algorithmsByCategory = availableAlgorithms.reduce((acc, algo) => {
    if (!acc[algo.category]) {
      acc[algo.category] = [];
    }
    acc[algo.category].push(algo);
    return acc;
  }, {} as Record<string, typeof availableAlgorithms>);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Algorithm Selection</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(algorithmsByCategory).map(([category, algorithms]) => (
          <div key={category} className="space-y-2">
            <h3 className="text-sm font-medium capitalize text-muted-foreground">
              {category} Algorithms
            </h3>
            <Select 
              value={selectedAlgorithm?.id || ''} 
              onValueChange={handleAlgorithmChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Choose a ${category} algorithm`} />
              </SelectTrigger>
              <SelectContent>
                {algorithms.map((algorithm) => (
                  <SelectItem key={algorithm.id} value={algorithm.id}>
                    {algorithm.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}