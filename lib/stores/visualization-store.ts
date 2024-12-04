import { create } from 'zustand';

export interface VisualizationStep {
  type: 'comparison' | 'array-modification' | 'function-call' | 'variable-change' | 'error';
  description?: string;
  details?: any;
}

export interface VisualizationState {
  algorithmCode: string;
  isRunning: boolean;
  currentStep: number;
  steps: VisualizationStep[];
  arrayStates: number[][];
  
  setAlgorithmCode: (code: string) => void;
  runVisualization: (input?: number[]) => void;
  resetVisualization: () => void;
  nextStep: () => void;
  prevStep: () => void;
  setIsRunning: (isRunning: boolean) => void;
}

export const useVisualizationStore = create<VisualizationState>((set, get) => ({
  algorithmCode: '',
  isRunning: false,
  currentStep: 0,
  steps: [],
  arrayStates: [],

  setAlgorithmCode: (code: string) => {
    set({ 
      algorithmCode: code, 
      steps: [], 
      currentStep: 0,
      isRunning: false,
      arrayStates: []
    });
  },

  runVisualization: (input: number[] = [5, 2, 9, 1, 7, 6, 3]) => {
    const { algorithmCode } = get();
    
    console.log('Running visualization with algorithm code:', algorithmCode);
    
    // Check if algorithm code is empty
    if (!algorithmCode) {
      console.error('No algorithm code provided');
      set({
        steps: [{ 
          type: 'error', 
          description: 'No algorithm code provided',
          details: { message: 'Please select an algorithm or write code first' }
        }],
        isRunning: false,
        arrayStates: []
      });
      return;
    }
    
    // Store the original sort method outside the try block
    const originalSort = Array.prototype.sort;
    
    try {
      // Create a comprehensive step tracking mechanism
      const steps: VisualizationStep[] = [];
      
      // Track the current state of the array
      const arrayStates: number[][] = [input.slice()];
      
      // Create a proxy-based tracer for detailed step tracking
      const createTracer = () => {
        return {
          trackComparison: (a: any, b: any, result: number) => {
            console.log(`Comparison: ${a} vs ${b}, result: ${result}`);
            steps.push({
              type: 'comparison',
              description: `Comparing ${a} and ${b}`,
              details: { a, b, result }
            });
          },
          trackArrayModification: (array: any[], index: number, oldValue: any, newValue: any) => {
            console.log(`Array modification: index ${index}, old: ${oldValue}, new: ${newValue}`);
            steps.push({
              type: 'array-modification',
              description: `Modified array at index ${index}`,
              details: { index, oldValue, newValue }
            });
            // Create a copy of the current array state
            arrayStates.push(array.slice());
          },
          trackFunctionCall: (functionName: string, args: any[]) => {
            console.log(`Function call: ${functionName}, args: ${JSON.stringify(args)}`);
            steps.push({
              type: 'function-call',
              description: `Called ${functionName}`,
              details: { functionName, args }
            });
          },
          trackVariableChange: (variableName: string, oldValue: any, newValue: any) => {
            console.log(`Variable change: ${variableName}, old: ${oldValue}, new: ${newValue}`);
            steps.push({
              type: 'variable-change',
              description: `${variableName} changed`,
              details: { variableName, oldValue, newValue }
            });
          }
        };
      };

      // Create a sandbox for executing the code with tracing
      const tracer = createTracer();
      console.log('Input for visualization:', input);

      // Modify the global object to include tracing
      (globalThis as any).trace = tracer;

      // Wrap swap function for sorting algorithms
      (globalThis as any).swap = function(arr: any[], i: number, j: number) {
        tracer.trackFunctionCall('swap', [i, j]);
        tracer.trackArrayModification(arr, i, arr[i], arr[j]);
        tracer.trackArrayModification(arr, j, arr[j], arr[i]);
        [arr[i], arr[j]] = [arr[j], arr[i]];
      };

      // Modify Array.prototype to capture steps
      Array.prototype.sort = function(this: any[], compareFn?: (a: any, b: any) => number) {
        return originalSort.call(this, (a: any, b: any) => {
          const result = compareFn ? compareFn(a, b) : (a < b ? -1 : a > b ? 1 : 0);
          tracer.trackComparison(a, b, result);
          return result;
        });
      };

      // Execute the algorithm
      const executeAlgorithm = new Function('input', `
        console.log('Executing algorithm with input:', input);
        const result = ${algorithmCode};
        return result || input;  // Return result or original input if no return
      `);
      const result = executeAlgorithm(input);
      console.log('Algorithm result:', result);

      // Ensure we have at least one step and array state
      if (steps.length === 0) {
        steps.push({
          type: 'function-call',
          description: 'Algorithm executed',
          details: { result }
        });
      }

      // Add final array state if not already present
      if (arrayStates[arrayStates.length - 1].toString() !== result.toString()) {
        arrayStates.push(result);
      }

      // Update store with captured steps and array states
      set(state => ({
        steps: steps,
        isRunning: true,
        currentStep: 0,
        arrayStates: arrayStates
      }));

    } catch (error) {
      console.error('Visualization error:', error);
      set({ 
        isRunning: false,
        steps: [{ 
          type: 'error', 
          description: 'Visualization failed',
          details: { 
            message: error instanceof Error ? error.message : String(error),
            stack: error instanceof Error ? error.stack : 'No stack trace'
          }
        }],
        arrayStates: []
      });
    } finally {
      // Clean up global modifications
      delete (globalThis as any).trace;
      delete (globalThis as any).swap;
      Array.prototype.sort = originalSort;
    }
  },

  resetVisualization: () => {
    set({
      isRunning: false,
      currentStep: 0,
      steps: [],
      arrayStates: []
    });
  },

  nextStep: () => {
    set(state => ({
      currentStep: Math.min(state.currentStep + 1, state.steps.length - 1)
    }));
  },

  prevStep: () => {
    set(state => ({
      currentStep: Math.max(state.currentStep - 1, 0)
    }));
  },

  setIsRunning: (isRunning: boolean) => {
    set({ isRunning });
  }
}));