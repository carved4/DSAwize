"use client";

import { Button } from "@/components/ui/button";
import { useAlgorithmStore } from "@/lib/stores/algorithm-store";

export function LanguageSelector() {
  const { language, setLanguage } = useAlgorithmStore();

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant={language === 'javascript' ? 'default' : 'outline'}
        onClick={() => setLanguage('javascript')}
        size="sm"
      >
        JavaScript
      </Button>
      <Button
        variant={language === 'python' ? 'default' : 'outline'}
        onClick={() => setLanguage('python')}
        size="sm"
      >
        Python
      </Button>
    </div>
  );
} 