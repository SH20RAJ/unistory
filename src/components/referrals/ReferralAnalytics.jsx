import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Users,
  Target,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export function ReferralAnalytics({
  referrals = [],
  stats = {},
  timeRange = '30d'
}) {
  // Generate mock analytics data
  const generateTimeSeriesData = () => {
    const data = [];
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);

      // Mock data based on existing referrals
      const dateStr = date.toISOString().split('T')[0];
      const dayReferrals = referrals.filter(ref => {
        const refDate = new Date(ref.createdAt).toISOString().split('T')[0];
        return refDate === dateStr;
      }).length;

      data.push({
        date: dateStr,
        referrals: dayReferrals,
        successful: referrals.filter(ref => {
          const refDate = new Date(ref.createdAt).toISOString().split('T')[0];
          return refDate === dateStr && ref.status === 'completed';
        }).length
      });
    }

    return data;
  };

  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, index) => ({
      month,
      referrals: Math.floor(Math.random() * 10) + (index === 5 ? stats.referralsSent || 8 : 0),
      successful: Math.floor(Math.random() * 8) + (index === 5 ? stats.successfulReferrals || 6 : 0)
    }));
  };

  const timeSeriesData = generateTimeSeriesData();
  const monthlyData = generateMonthlyData();

  const conversionRate = stats.referralsSent > 0
    ? ((stats.successfulReferrals / stats.referralsSent) * 100).toFixed(1)
    : 0;

  const avgPointsPerReferral = stats.successfulReferrals > 0
    ? Math.round(stats.referralPointsEarned / stats.successfulReferrals)
    : 0;

  const getTopPerformingDays = () => {
    const dayCount = {};
    referrals.forEach(ref => {
      const day = new Date(ref.createdAt).toLocaleDateString('en-US', { weekday: 'long' });
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    return Object.entries(dayCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([day, count]) => ({ day, count }));
  };

  const topDays = getTopPerformingDays();

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              {stats.successfulReferrals} of {stats.referralsSent} referrals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Points/Referral</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPointsPerReferral}</div>
            <p className="text-xs text-muted-foreground">
              Points earned per successful referral
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {referrals.filter(r => r.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Pending sign-ups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.referralsSent || 0}</div>
            <p className="text-xs text-muted-foreground">
              Total referrals sent
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Daily Activity (Last 30 Days)</span>
            </CardTitle>
            <CardDescription>
              Track your referral activity over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) => new Date(value).getDate().toString()}
                  />
                  <YAxis />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                  />
                  <Line
                    type="monotone"
                    dataKey="referrals"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Total Referrals"
                  />
                  <Line
                    type="monotone"
                    dataKey="successful"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Successful"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Monthly Overview</span>
            </CardTitle>
            <CardDescription>
              Referral performance by month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="referrals" fill="#3b82f6" name="Total Referrals" />
                  <Bar dataKey="successful" fill="#10b981" name="Successful" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Days */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Best Days to Share</span>
            </CardTitle>
            <CardDescription>
              Days when your referrals are most successful
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDays.length > 0 ? (
                topDays.map((day, index) => (
                  <div key={day.day} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20">
                        <span className="text-sm font-medium text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <span className="font-medium">{day.day}</span>
                    </div>
                    <Badge variant="secondary">
                      {day.count} referral{day.count !== 1 ? 's' : ''}
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-4">
                  More data needed for insights
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Performance</CardTitle>
            <CardDescription>
              Your referral activity in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">New Referrals</span>
                <span className="text-2xl font-bold">
                  {referrals.filter(r => {
                    const daysSince = (Date.now() - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
                    return daysSince <= 7;
                  }).length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Successful This Week</span>
                <span className="text-2xl font-bold text-green-600">
                  {referrals.filter(r => {
                    const daysSince = (Date.now() - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
                    return daysSince <= 7 && r.status === 'completed';
                  }).length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Points Earned</span>
                <span className="text-2xl font-bold text-purple-600">
                  {referrals.filter(r => {
                    const daysSince = (Date.now() - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
                    return daysSince <= 7 && r.status === 'completed';
                  }).length * 100}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ReferralAnalytics;
