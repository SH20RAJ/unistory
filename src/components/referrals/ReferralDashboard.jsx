import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Users,
  Share2,
  Gift,
  TrendingUp,
  Copy,
  CheckCircle,
  Clock,
  Star,
  Trophy,
  Link as LinkIcon
} from 'lucide-react';

// Mock data for frontend demo
const mockReferralData = {
  code: 'UNISTORY2024',
  stats: {
    totalReferrals: 12,
    successfulReferrals: 8,
    pendingReferrals: 4,
    totalRewards: 240
  },
  referrals: [
    {
      id: '1',
      referredUser: 'Sarah M.',
      status: 'completed',
      joinedAt: '2024-12-01',
      reward: 30
    },
    {
      id: '2',
      referredUser: 'Alex K.',
      status: 'completed',
      joinedAt: '2024-11-28',
      reward: 30
    },
    {
      id: '3',
      referredUser: 'Mike R.',
      status: 'pending',
      joinedAt: '2024-12-02',
      reward: 0
    },
    {
      id: '4',
      referredUser: 'Emma L.',
      status: 'completed',
      joinedAt: '2024-11-25',
      reward: 30
    }
  ]
};

export function ReferralDashboard({
  referralCode = mockReferralData.code,
  referrals = mockReferralData.referrals,
  stats = mockReferralData.stats,
  onGenerateCode = () => console.log('Generate code'),
  onShareCode = () => console.log('Share code')
}) {
  const [copied, setCopied] = React.useState(false);
  const [shareLink, setShareLink] = React.useState('');

  React.useEffect(() => {
    if (referralCode) {
      setShareLink(`https://unistory.app/signup?ref=${referralCode}`);
    }
  }, [referralCode]);

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Copy,
      action: () => copyToClipboard(shareLink),
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      name: 'Share Code',
      icon: Share2,
      action: () => copyToClipboard(referralCode?.code || ''),
      color: 'bg-green-500 hover:bg-green-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Referral Program
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Invite friends and earn rewards together
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{stats.referralsSent || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Invited</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{stats.successfulReferrals || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Successful</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">
                  {stats.successfulReferrals && stats.referralsSent
                    ? Math.round((stats.successfulReferrals / stats.referralsSent) * 100)
                    : 0}%
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Gift className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stats.referralPointsEarned || 0}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Points Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Referral Code Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5" />
            <span>Your Referral Code</span>
          </CardTitle>
          <CardDescription>
            Share this code with friends to earn rewards when they join
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {referralCode ? (
            <>
              <div className="flex items-center space-x-2">
                <Input
                  value={referralCode.code}
                  readOnly
                  className="font-mono text-lg font-bold text-center"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(referralCode.code)}
                >
                  {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  value={shareLink}
                  readOnly
                  className="text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => copyToClipboard(shareLink)}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {shareOptions.map((option) => (
                  <Button
                    key={option.name}
                    variant="outline"
                    onClick={option.action}
                    className="flex items-center space-x-2"
                  >
                    <option.icon className="h-4 w-4" />
                    <span>{option.name}</span>
                  </Button>
                ))}
              </div>

              {copied && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Copied to clipboard!
                  </AlertDescription>
                </Alert>
              )}
            </>
          ) : (
            <div className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                You don't have a referral code yet
              </p>
              <Button onClick={onGenerateCode}>
                Generate My Referral Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Referral History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Referral History</span>
          </CardTitle>
          <CardDescription>
            Track your referral progress and rewards
          </CardDescription>
        </CardHeader>
        <CardContent>
          {referrals.length > 0 ? (
            <div className="space-y-4">
              {referrals.map((referral) => (
                <div
                  key={referral.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {referral.refereeName?.charAt(0) || '?'}
                    </div>
                    <div>
                      <p className="font-medium">
                        {referral.refereeName || 'Anonymous User'}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Joined {new Date(referral.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={referral.status === 'completed' ? 'success' : 'secondary'}
                    >
                      {referral.status === 'completed' ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </>
                      ) : (
                        <>
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </>
                      )}
                    </Badge>
                    {referral.status === 'completed' && (
                      <Badge variant="outline" className="text-green-600">
                        +100 pts
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No referrals yet. Start sharing your code to earn rewards!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How Referrals Work</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <Share2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">1. Share Your Code</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your unique referral code with friends
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">2. Friends Join</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                They sign up using your referral code
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">3. Earn Rewards</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Both you and your friend get bonus points
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
