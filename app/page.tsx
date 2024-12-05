"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Introduction Section */}
      <header className="text-center space-y-4">
        <h1 className="text-5xl font-bold">Welcome to Algorithm Visualizer</h1>
        <p className="text-lg text-muted-foreground">
          Discover, learn, and practice algorithms through interactive visualizations.
        </p>
      </header>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/playground">
          <Card className="p-6 space-y-4 cursor-pointer hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold">Interactive Visualizations</h2>
            <p className="text-sm text-muted-foreground">
              Step through algorithms and see them in action with our interactive visualizations.
            </p>
          </Card>
        </Link>
        <Link href="/practice">
          <Card className="p-6 space-y-4 cursor-pointer hover:shadow-lg transition-shadow text-center">
            <h2 className="text-2xl font-semibold">Practice Coding</h2>
            <p className="text-sm text-muted-foreground">
              Solve algorithm problems and improve your coding skills.
            </p>
          </Card>
        </Link>
      </section>

      {/* Call to Action */}
      <section className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Get Started</h2>
        <div className="flex justify-center gap-4">
          <Link href="/playground">
            <Button size="lg" className="gap-2">
              Try Playground
            </Button>
          </Link>
          <Link href="/practice">
            <Button size="lg" variant="outline" className="gap-2">
              Practice Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-muted-foreground">
        © 2023 Algorithm Visualizer. All rights reserved.
      </footer>
    </div>
  );
}