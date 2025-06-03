import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Trophy,
  Star,
  Gift,
  Crown,
  Target,
  CheckCircle,
  Clock,
  Sparkles
} from 'lucide-react';

const REFERRAL_MILESTONES = [
  { count: 1, title: 'First Referral', icon: Target, points: 150, color: 'text-blue-500' },
  { count: 5, title: 'Social Butterfly', icon: Star, points: 500, color: 'text-purple-500' },
  { count: 10, title: 'Community Builder', icon: Trophy, points: 1000, color: 'text-yellow-500' },
  { count: 25, title: 'Referral Champion', icon: Crown, points: 2500, color: 'text-orange-500' },
  { count: 50, title: 'Campus Ambassador', icon: Sparkles, points: 5000, color: 'text-pink-500' },
];

export function ReferralRewards({
  currentReferrals = 0,
  totalPointsEarned = 0,
  achievements = [],
  pendingRewards = []
}) {
  const getNextMilestone = () => {
    return REFERRAL_MILESTONES.find(milestone => milestone.count > currentReferrals);
  };

  const getProgress = () => {
    const nextMilestone = getNextMilestone();
    if (!nextMilestone) return 100;

    const previousMilestone = REFERRAL_MILESTONES.find(
      (milestone, index) =>
        REFERRAL_MILESTONES[index + 1] === nextMilestone
    );

    const start = previousMilestone ? previousMilestone.count : 0;
    const end = nextMilestone.count;
    const current = currentReferrals;

    return Math.min(((current - start) / (end - start)) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Current Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span>Referral Progress</span>
          </CardTitle>
          <CardDescription>
            Your journey to becoming a Campus Ambassador
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Current Referrals</span>
            <span className="text-2xl font-bold">{currentReferrals}</span>
          </div>

          {getNextMilestone() && (
            <>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Next: {getNextMilestone().title}</span>
                  <span>{currentReferrals}/{getNextMilestone().count}</span>
                </div>
                <Progress value={getProgress()} className="h-2" />
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {/* <getNextMilestone().icon className={`h-6 w-6 ${getNextMilestone().color}`} /> */}
                  <span className="font-semibold">{getNextMilestone().title}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getNextMilestone().count - currentReferrals} more referrals to unlock {getNextMilestone().points} bonus points!
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Pending Rewards */}
      {pendingRewards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-green-500" />
              <span>Pending Rewards</span>
            </CardTitle>
            <CardDescription>
              Rewards waiting to be claimed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {pendingRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Gift className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">{reward.description}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {reward.value} points
                      </p>
                    </div>
                  </div>
                  <Button size="sm">
                    Claim
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-purple-500" />
            <span>Referral Milestones</span>
          </CardTitle>
          <CardDescription>
            Unlock special rewards as you refer more friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {REFERRAL_MILESTONES.map((milestone) => {
              const isCompleted = currentReferrals >= milestone.count;
              const isCurrent = !isCompleted && getNextMilestone()?.count === milestone.count;

              return (
                <div
                  key={milestone.count}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${isCompleted
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200'
                      : isCurrent
                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200'
                        : 'bg-gray-50 dark:bg-gray-900/20'
                    }`}
                >
                  <div className={`p-2 rounded-full ${isCompleted
                      ? 'bg-green-100 dark:bg-green-800'
                      : isCurrent
                        ? 'bg-blue-100 dark:bg-blue-800'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <milestone.icon className={`h-6 w-6 ${isCurrent ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold">{milestone.title}</h3>
                      {isCompleted && (
                        <Badge variant="success">Completed</Badge>
                      )}
                      {isCurrent && (
                        <Badge variant="outline">Current Goal</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Refer {milestone.count} friends • {milestone.points} bonus points
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold">{milestone.points}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Total Earned */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="h-8 w-8 text-yellow-500" />
              <span className="text-3xl font-bold">{totalPointsEarned}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Total Points Earned from Referrals
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ReferralRewards;
