"use client";

import Link from "next/link";
import { Problem } from "@/lib/types/problem";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const difficultyColor = {
    Easy: "bg-green-500/10 text-green-500 hover:bg-green-500/20",
    Medium: "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
    Hard: "bg-red-500/10 text-red-500 hover:bg-red-500/20",
  }[problem.difficulty];

  return (
    <Link href={`/practice/${problem.id}`}>
      <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{problem.title}</h3>
            <Badge variant="outline" className={difficultyColor}>
              {problem.difficulty}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {problem.description}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{problem.category}</Badge>
          </div>
        </div>
      </Card>
    </Link>
  );
}