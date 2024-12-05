"use client";

import { Editor } from "@monaco-editor/react";
import { useAlgorithmStore } from "@/lib/stores/algorithm-store";
import { Button } from "@/components/ui/button";
import { Code2, FileJson } from "lucide-react";

export function CodeEditor() {
  const { code, setCode, language, setLanguage, selectedAlgorithm } = useAlgorithmStore();

  if (!selectedAlgorithm) {
    return (
      <div className="text-muted-foreground text-center py-4">
        Select an algorithm to view its code
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Code Implementation</h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={language === 'javascript' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('javascript')}
            className="space-x-2"
          >
            <FileJson className="h-4 w-4" />
            <span>JavaScript</span>
          </Button>
          <Button
            variant={language === 'python' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setLanguage('python')}
            className="space-x-2"
          >
            <Code2 className="h-4 w-4" />
            <span>Python</span>
          </Button>
        </div>
      </div>
      <div className="flex-1 border rounded-md overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language === 'javascript' ? 'javascript' : 'python'}
          language={language === 'javascript' ? 'javascript' : 'python'}
          value={code}
          onChange={(value) => setCode(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
          }}
        />
      </div>
    </div>
  );
}