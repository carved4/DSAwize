"use client";

import { useEffect, useState } from "react";
import { Problem } from "@/lib/types/problem";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { problems } from "@/lib/problems";
import { useToast } from "@/hooks/use-toast";

interface ProblemPageProps {
  params: {
    problemId: string;
  };
}

export default function ProblemPage({ params }: ProblemPageProps) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const problemId = parseInt(params.problemId);
    const foundProblem = problems.find(p => p.id === problemId);
    if (foundProblem) {
      setProblem(foundProblem);
      setCode(foundProblem.starterCode || "");
    }
  }, [params.problemId]);

  const runCode = async () => {
    if (!problem?.testCases) return;
    
    setIsRunning(true);
    try {
      const result = await evaluateCode(code, problem.testCases);
      setOutput(result);
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "All test cases passed.",
          variant: "default",
        });
      } else {
        toast({
          title: "Test cases failed",
          description: "Some test cases did not pass. Check the output for details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      setOutput({ error: "Failed to run code" });
      toast({
        title: "Error",
        description: "Failed to run code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  if (!problem) {
    return (
      <div className="container mx-auto p-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold">Problem not found</h2>
          <p className="text-muted-foreground">
            The problem you're looking for doesn't exist.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm">
                {problem.difficulty}
              </Badge>
              <Badge variant="secondary" className="text-sm">
                {problem.category}
              </Badge>
            </div>
          </div>

          <Card className="p-4">
            <p className="text-muted-foreground">
              {problem.description}
            </p>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-2">Example Test Cases:</h3>
            <div className="space-y-2">
              {problem.testCases?.map((testCase, index) => (
                <div key={index} className="text-sm">
                  <p>Input: {JSON.stringify(testCase.input)}</p>
                  <p>Expected Output: {JSON.stringify(testCase.output)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Code Editor */}
        <div className="space-y-4">
          <div className="h-[600px] relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: "on",
              }}
            />
          </div>
          <div className="flex justify-between items-center">
            <Button
              onClick={runCode}
              disabled={isRunning}
            >
              {isRunning ? "Running..." : "Run Code"}
            </Button>
          </div>
          {output && (
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Output:</h3>
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(output, null, 2)}
              </pre>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

async function evaluateCode(code: string, testCases: Array<{ input: any; output: any }>) {
  try {
    const fn = new Function(`return ${code}`)();
    
    const results = testCases.map((testCase, index) => {
      try {
        const result = fn(...(Array.isArray(testCase.input) ? testCase.input : [testCase.input]));
        const passed = JSON.stringify(result) === JSON.stringify(testCase.output);
        return {
          testCase: index + 1,
          input: testCase.input,
          expectedOutput: testCase.output,
          actualOutput: result,
          passed,
        };
      } catch (error) {
        return {
          testCase: index + 1,
          input: testCase.input,
          expectedOutput: testCase.output,
          error: error instanceof Error ? error.message : "An error occurred",
          passed: false,
        };
      }
    });

    return {
      success: results.every(r => r.passed),
      results,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to compile code",
    };
  }
} 