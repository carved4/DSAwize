"use client";

import React from 'react';
import { ProblemList } from "@/components/practice/problem-list";
import { categories, problems } from "@/lib/problems";

export default function PracticePage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Practice Problems</h1>
      <ProblemList categories={categories} problems={problems} />
    </div>
  );
}