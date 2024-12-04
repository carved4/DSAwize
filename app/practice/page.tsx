"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Timer } from "lucide-react";

export default function PracticePage() {
  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-3.5rem)]">
      <h1 className="text-3xl font-bold mb-6">Practice Problems</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {problems.map((problem) => (
          <Card key={problem.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {problem.description}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Brain className="h-4 w-4 mr-1" />
                  {problem.category}
                </span>
                <span className="flex items-center">
                  <Timer className="h-4 w-4 mr-1" />
                  {problem.timeEstimate}
                </span>
              </div>
              <Button variant="outline" size="sm">
                Solve
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

const problems = [
  {
    id: 1,
    title: "Two Sum",
    description: "Find two numbers in an array that add up to a target sum.",
    difficulty: "Easy",
    category: "Arrays",
    timeEstimate: "15 min",
  },
  {
    id: 2,
    title: "Valid Parentheses",
    description: "Check if a string of brackets is valid.",
    difficulty: "Medium",
    category: "Stacks",
    timeEstimate: "20 min",
  },
  {
    id: 3,
    title: "Merge K Sorted Lists",
    description: "Merge k sorted linked lists into one sorted list.",
    difficulty: "Hard",
    category: "Linked Lists",
    timeEstimate: "30 min",
  },
];

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
    case "hard":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
  }
}