"use client";

import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { useVisualizationStore } from "@/lib/stores/visualization-store";

export function Visualization() {
  const { 
    selectedAlgorithm, 
    runVisualizationForAllAlgorithms 
  } = useAlgorithmStore();

  const { 
    algorithmCode, 
    steps, 
    currentStep, 
    isRunning,
    nextStep,
    prevStep,
    resetVisualization,
    arrayStates
  } = useVisualizationStore();

  const renderStepDetails = () => {
    if (steps.length === 0) return <p>No visualization steps available</p>;
    
    const currentStepData = steps[currentStep];
    
    return (
      <div className="bg-gray-100 p-4 rounded-md">
        <h3 className="font-bold mb-2">Current Step: {currentStep + 1} / {steps.length}</h3>
        {currentStepData.type === 'comparison' && currentStepData.details && (
          <div>
            <p>Comparing: {currentStepData.details.a} and {currentStepData.details.b}</p>
            <p>Comparison Result: {currentStepData.details.result}</p>
          </div>
        )}
        {currentStepData.type === 'array-modification' && currentStepData.details && (
          <div>
            <p>Array Modified:</p>
            <p>Index: {currentStepData.details.index}</p>
            <p>Old Value: {currentStepData.details.oldValue}</p>
            <p>New Value: {currentStepData.details.newValue}</p>
          </div>
        )}
        {currentStepData.type === 'function-call' && currentStepData.details && (
          <div>
            <p>Function Called: {currentStepData.details.functionName}</p>
            <p>Arguments: {JSON.stringify(currentStepData.details.args)}</p>
          </div>
        )}
        {currentStepData.type === 'variable-change' && currentStepData.details && (
          <div>
            <p>Variable Changed: {currentStepData.details.variableName}</p>
            <p>Old Value: {JSON.stringify(currentStepData.details.oldValue)}</p>
            <p>New Value: {JSON.stringify(currentStepData.details.newValue)}</p>
          </div>
        )}
        {currentStepData.type === 'error' && (
          <div className="text-red-500">
            <p>Error: {currentStepData.details?.message}</p>
          </div>
        )}
      </div>
    );
  };

  // Use the current array state from arrayStates
  const currentArrayState = arrayStates[currentStep] || [];

  const BarGraph = ({ data }: { data: number[] }) => {
    const maxValue = Math.max(...data);
    
    return (
      <div className="flex items-center justify-center space-x-1 h-40 w-full">
        {data.map((value, index) => (
          <div 
            key={index} 
            className="bg-blue-500 transition-all duration-300" 
            style={{
              width: `${100 / data.length}%`,
              height: `${(value / maxValue) * 100}%`,
              minHeight: '10px'
            }}
            title={`Value: ${value}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">
        {selectedAlgorithm ? selectedAlgorithm.name : 'Algorithm Visualization'}
      </h2>

      <div className="flex space-x-2 mb-4">
        <Button 
          onClick={() => runVisualizationForAllAlgorithms()}
          disabled={!selectedAlgorithm}
        >
          Run All Algorithms
        </Button>
        <Button 
          onClick={() => resetVisualization()}
          disabled={!isRunning}
        >
          Reset
        </Button>
      </div>

      <div className="flex space-x-2 mb-4">
        <Button 
          onClick={() => prevStep()} 
          disabled={currentStep <= 0 || !isRunning}
        >
          Previous Step
        </Button>
        <Button 
          onClick={() => nextStep()} 
          disabled={currentStep >= steps.length - 1 || !isRunning}
        >
          Next Step
        </Button>
      </div>

      {/* Bar Graph Visualization */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Array Visualization</h3>
        <div className="border border-gray-200 rounded-md p-2">
          {currentArrayState.length > 0 ? (
            <>
              <BarGraph data={currentArrayState} />
              <p className="text-center mt-2 text-sm text-gray-600">
                Current Array: {currentArrayState.join(', ')}
              </p>
            </>
          ) : (
            <p>No array data available</p>
          )}
        </div>
      </div>

      {renderStepDetails()}

      <div className="mt-4">
        <h3 className="font-bold mb-2">Algorithm Code:</h3>
        <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">
          {algorithmCode || 'No algorithm selected'}
        </pre>
      </div>
    </div>
  );
}