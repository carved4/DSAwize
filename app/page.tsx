"use client";

import { ArrowRight, Brain, Code2, Trophy } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4 text-primary">
        <Icon className="h-12 w-12" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
            Master Algorithms Visually
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Interactive visualizations and hands-on practice to help you understand complex algorithms and data structures.
          </p>
          <Link
            href="/playground"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Start Learning
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={Brain}
            title="Interactive Learning"
            description="Watch algorithms come to life with step-by-step visualizations and real-time code execution."
          />
          <FeatureCard
            icon={Code2}
            title="Practice Engine"
            description="Solve curated problems with our built-in code editor and instant visual feedback."
          />
          <FeatureCard
            icon={Trophy}
            title="Compete & Improve"
            description="Challenge yourself with timed competitions and track your progress over time."
          />
        </div>

        {/* Preview Section */}
        <div className="rounded-xl overflow-hidden shadow-2xl bg-card">
          <div className="aspect-video bg-muted animate-pulse" />
        </div>
      </div>
    </main>
  );
}