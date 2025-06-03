"use client";

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReferralDashboard } from '@/components/referrals/ReferralDashboard';
import { ReferralRewards } from '@/components/referrals/ReferralRewards';
import { ReferralNotifications } from '@/components/referrals/ReferralNotificationsList';
import { ReferralAnalytics } from '@/components/referrals/ReferralAnalytics';

export default function ReferralsPage() {
  // Mock data for frontend-only implementation
  const [referralData, setReferralData] = React.useState({
    referralCode: {
      id: 'code_123',
      code: 'SHARE2024',
      usageCount: 8,
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
    referrals: [
      {
        id: 'ref_1',
        refereeId: 'user_456',
        refereeName: 'Alex Johnson',
        refereeEmail: 'alex.johnson@university.edu',
        status: 'completed',
        pointsEarned: 100,
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ref_2',
        refereeId: 'user_789',
        refereeName: 'Sarah Chen',
        refereeEmail: 'sarah.chen@college.edu',
        status: 'completed',
        pointsEarned: 100,
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ref_3',
        refereeId: 'user_101',
        refereeName: 'Mike Wilson',
        refereeEmail: 'mike.wilson@university.edu',
        status: 'completed',
        pointsEarned: 100,
        createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ref_4',
        refereeId: 'user_202',
        refereeName: 'Emma Davis',
        refereeEmail: 'emma.davis@college.edu',
        status: 'completed',
        pointsEarned: 100,
        createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ref_5',
        refereeId: 'user_303',
        refereeName: 'James Rodriguez',
        refereeEmail: 'james.r@university.edu',
        status: 'completed',
        pointsEarned: 100,
        createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ref_6',
        refereeId: 'user_404',
        refereeName: 'Lisa Park',
        refereeEmail: 'lisa.park@college.edu',
        status: 'completed',
        pointsEarned: 100,
        createdAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ref_7',
        refereeId: 'user_505',
        refereeName: 'David Kim',
        refereeEmail: 'david.kim@university.edu',
        status: 'pending',
        pointsEarned: 0,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 'ref_8',
        refereeId: 'user_606',
        refereeName: 'Sophie Thompson',
        refereeEmail: 'sophie.t@college.edu',
        status: 'pending',
        pointsEarned: 0,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ],
    stats: {
      referralsSent: 8,
      successfulReferrals: 6,
      referralPointsEarned: 750, // 600 from referrals + 150 milestone bonus
    }
  });

  const [loading, setLoading] = React.useState(false); // No loading for mock data

  // Mock pending rewards
  const [pendingRewards] = React.useState([
    {
      id: 'reward_1',
      description: 'First Referral Milestone',
      value: 150,
      type: 'milestone',
      unlockedAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString(),
    }
  ]);

  // Mock notifications
  const [notifications, setNotifications] = React.useState([
    {
      id: 'notif_1',
      type: 'referral_success',
      title: 'Referral Successful!',
      message: 'Sophie Thompson has successfully joined using your referral code.',
      read: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      actionData: {
        refereeName: 'Sophie Thompson',
        points: 100
      }
    },
    {
      id: 'notif_2',
      type: 'referral_pending',
      title: 'New Referral Started',
      message: 'David Kim has started the signup process with your referral code.',
      read: false,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      actionData: {
        refereeName: 'David Kim'
      }
    },
    {
      id: 'notif_3',
      type: 'milestone_reached',
      title: 'Milestone Achieved!',
      message: 'Congratulations! You\'ve reached the "Social Butterfly" milestone.',
      read: true,
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      actionData: {
        points: 500
      }
    },
    {
      id: 'notif_4',
      type: 'referral_success',
      title: 'Referral Successful!',
      message: 'Lisa Park has successfully joined using your referral code.',
      read: true,
      createdAt: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
      actionData: {
        refereeName: 'Lisa Park',
        points: 100
      }
    },
    {
      id: 'notif_5',
      type: 'reward_earned',
      title: 'Bonus Reward Earned!',
      message: 'You\'ve earned a special bonus for reaching 5 successful referrals.',
      read: true,
      createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
      actionData: {
        points: 250
      }
    }
  ]);

  // Mock user ID - in real app this would come from auth context
  const userId = 'user_123';

  const handleGenerateCode = async () => {
    // Mock code generation - in real app this would call API
    const newCode = 'USER' + Math.random().toString(36).substr(2, 4).toUpperCase();
    setReferralData(prev => ({
      ...prev,
      referralCode: {
        id: 'code_' + Date.now(),
        code: newCode,
        usageCount: 0,
        createdAt: new Date().toISOString(),
      }
    }));
  };

  const handleShareCode = (platform) => {
    const shareUrl = `https://unistory.app/signup?ref=${referralData.referralCode?.code}`;
    const shareText = `Join me on Unistory, the ultimate college social platform! Use my referral code ${referralData.referralCode?.code} and we both get bonus points! 🎉`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`);
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(shareUrl);
    }
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId
          ? { ...notif, read: true }
          : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDismissNotification = (notificationId) => {
    setNotifications(prev =>
      prev.filter(notif => notif.id !== notificationId)
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="notifications">
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <ReferralDashboard
            referralCode={referralData.referralCode}
            referrals={referralData.referrals}
            stats={referralData.stats}
            onGenerateCode={handleGenerateCode}
            onShareCode={handleShareCode}
          />
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <ReferralRewards
            currentReferrals={referralData.stats.successfulReferrals}
            totalPointsEarned={referralData.stats.referralPointsEarned}
            achievements={[]}
            pendingRewards={pendingRewards}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <ReferralAnalytics
            referrals={referralData.referrals}
            stats={referralData.stats}
          />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <ReferralNotifications
            notifications={notifications}
            onMarkAsRead={handleMarkAsRead}
            onMarkAllAsRead={handleMarkAllAsRead}
            onDismiss={handleDismissNotification}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
