import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BarChart3, BookOpen, Clock, Award } from "lucide-react";

const PersonalStats = () => {
  const stats = {
    studyHours: 42,
    coursesCompleted: 3,
    assignmentsSubmitted: 28,
    averageGrade: 87,
    weeklyGoal: 50,
    monthlyRank: 15
  };

  const weeklyProgress = (stats.studyHours / stats.weeklyGoal) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Personal Stats</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-lg font-bold text-blue-600">{stats.studyHours}h</span>
            </div>
            <div className="text-xs text-gray-600">This Month</div>
          </div>
          
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <BookOpen className="w-4 h-4 text-green-600" />
              <span className="text-lg font-bold text-green-600">{stats.coursesCompleted}</span>
            </div>
            <div className="text-xs text-gray-600">Courses Done</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Weekly Goal Progress</span>
            <Badge variant="outline" className="text-xs">
              {stats.studyHours}/{stats.weeklyGoal}h
            </Badge>
          </div>
          <Progress value={weeklyProgress} className="w-full" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600">{stats.averageGrade}%</div>
            <div className="text-xs text-gray-500">Avg Grade</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Award className="w-4 h-4 text-orange-500" />
              <span className="text-lg font-bold text-orange-500">#{stats.monthlyRank}</span>
            </div>
            <div className="text-xs text-gray-500">Monthly Rank</div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm font-medium text-gray-700 mb-1">
            {stats.assignmentsSubmitted} assignments submitted this semester
          </div>
          <div className="text-xs text-gray-500">
            You're {weeklyProgress >= 100 ? 'ahead of' : 'on track with'} your weekly goal! 🎉
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalStats;
