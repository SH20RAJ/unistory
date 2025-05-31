import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Flame, Target, TrendingUp } from "lucide-react";

const StudyStreak = () => {
  const currentStreak = 7;
  const longestStreak = 23;
  const weeklyGoal = 5;
  const weeklyProgress = 4;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span>Study Streak</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-orange-500 mb-1">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-500">Days in a row</div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm">Weekly Goal</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {weeklyProgress}/{weeklyGoal} days
            </Badge>
          </div>
          <Progress value={(weeklyProgress / weeklyGoal) * 100} className="w-full" />
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-center">
            <div className="text-sm font-medium">{longestStreak}</div>
            <div className="text-xs text-gray-500">Best Streak</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-green-600">+2</div>
            <div className="text-xs text-gray-500">This Week</div>
          </div>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
        </div>

        <div className="text-xs text-center text-gray-500 pt-2">
          Keep it up! You're doing great 🎯
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyStreak;
