import { CheckCircle, XCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface TestResult {
  testNumber?: number;
  input?: any[];
  expectedOutput?: any;
  actualOutput?: any;
  error?: string;
  passed: boolean;
}

interface TestResultsProps {
  results: TestResult[];
}

export function TestResults({ results }: TestResultsProps) {
  const allPassed = results.every((result) => result.passed);
  const totalTests = results.length;
  const passedTests = results.filter((result) => result.passed).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Test Results</h3>
        <span className="text-sm">
          Passed: {passedTests}/{totalTests}
        </span>
      </div>

      <div className="space-y-2">
        {results.map((result, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                {result.testNumber && (
                  <p className="font-medium">Test Case {result.testNumber}</p>
                )}
                {result.input && (
                  <p className="text-sm text-muted-foreground">
                    Input: {JSON.stringify(result.input)}
                  </p>
                )}
                {result.expectedOutput && (
                  <p className="text-sm text-muted-foreground">
                    Expected: {JSON.stringify(result.expectedOutput)}
                  </p>
                )}
                {result.actualOutput && (
                  <p className="text-sm text-muted-foreground">
                    Output: {JSON.stringify(result.actualOutput)}
                  </p>
                )}
                {result.error && (
                  <p className="text-sm text-red-500">{result.error}</p>
                )}
              </div>
              {result.passed ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 