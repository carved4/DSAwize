"use client";

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface ComplexityInfo {
  time?: {
    best?: string;
    average?: string;
    worst?: string;
  } | string;
  space?: string;
}

interface AlgorithmProps {
  algorithm: {
    name: string;
    description: string;
    category: string;
    complexity?: ComplexityInfo;
  };
}

export function AlgorithmInfo({ algorithm }: AlgorithmProps) {
  const renderComplexity = (complexity: ComplexityInfo) => {
    if (typeof complexity.time === 'string') {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Time</Badge>
            <span>{complexity.time}</span>
          </div>
          {complexity.space && (
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">Space</Badge>
              <span>{complexity.space}</span>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-2">
        {complexity.time?.best && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Best Case</Badge>
            <span>{complexity.time.best}</span>
          </div>
        )}
        {complexity.time?.average && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Average Case</Badge>
            <span>{complexity.time.average}</span>
          </div>
        )}
        {complexity.time?.worst && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Worst Case</Badge>
            <span>{complexity.time.worst}</span>
          </div>
        )}
        {complexity.space && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">Space</Badge>
            <span>{complexity.space}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="info">
        <AccordionTrigger>Algorithm Details</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="capitalize">
                {algorithm.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {algorithm.description}
            </p>
          </div>
          
          {algorithm.complexity && (
            <div>
              <h3 className="text-sm font-medium mb-2">Complexity</h3>
              {renderComplexity(algorithm.complexity)}
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
