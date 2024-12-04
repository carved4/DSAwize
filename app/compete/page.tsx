"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trophy, Users, Clock, Calendar } from "lucide-react";

export default function CompetePage() {
  return (
    <div className="container mx-auto p-4 min-h-[calc(100vh-3.5rem)]">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Competitions</h1>
        <Button>
          <Trophy className="mr-2 h-4 w-4" />
          Create Competition
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Weekly Challenge</h2>
            <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full text-sm">
              Active
            </span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Solve three algorithmic problems in 2 hours. Compete with others and improve your skills!
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              124 Participants
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              2 Hours
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Ends in 2 days
            </div>
            <div className="flex items-center text-sm font-medium text-primary">
              <Trophy className="h-4 w-4 mr-2" />
              500 Points
            </div>
          </div>

          <Button className="w-full">Join Competition</Button>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Graph Theory Sprint</h2>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 rounded-full text-sm">
              Coming Soon
            </span>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Test your graph algorithm knowledge with five challenging problems.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2" />
              0 Participants
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-2" />
              3 Hours
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              Starts in 5 days
            </div>
            <div className="flex items-center text-sm font-medium text-primary">
              <Trophy className="h-4 w-4 mr-2" />
              750 Points
            </div>
          </div>

          <Button variant="outline" className="w-full">
            Get Notified
          </Button>
        </Card>
      </div>
    </div>
  );
}