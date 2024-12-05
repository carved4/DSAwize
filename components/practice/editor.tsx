"use client";

import { Editor as MonacoEditor } from "@monaco-editor/react";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export function Editor({ value, onChange, language = "javascript" }: EditorProps) {
  return (
    <MonacoEditor
      height="100%"
      defaultLanguage={language}
      value={value}
      onChange={(value) => onChange(value || "")}
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
  );
} 