"use client";

import { useTheme } from "next-themes";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export function CodeEditor({ 
  value, 
  onChange, 
  language = "typescript" 
}: CodeEditorProps) {
  const { theme } = useTheme();

  return (
    <div className="h-[500px] border rounded-md overflow-hidden">
      <Editor
        value={value}
        onChange={(value) => onChange(value || "")}
        language={language}
        theme={theme === "dark" ? "vs-dark" : "light"}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
        }}
      />
    </div>
  );
} 