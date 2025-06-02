import { customAlphabet } from 'nanoid';

// Generate referral codes using custom alphabet (uppercase letters and numbers, excluding confusing characters)
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const nanoid = customAlphabet(alphabet, 8);

export function generateReferralCode(prefix = '') {
  const code = nanoid();
  return prefix ? `${prefix}${code}` : code;
}

export function validateReferralCode(code) {
  // Basic validation - code should be 8-12 characters, alphanumeric
  const pattern = /^[A-Z0-9]{6,12}$/;
  return pattern.test(code);
}

export function calculateReferralRewards(type = 'standard') {
  const rewards = {
    standard: {
      referrer: { points: 100, description: 'Referred a new member' },
      referee: { points: 50, description: 'Joined through referral' }
    },
    milestone: {
      referrer: { points: 500, description: 'Milestone referral bonus' },
      referee: { points: 100, description: 'Special welcome bonus' }
    },
    special: {
      referrer: { points: 200, description: 'Special event referral' },
      referee: { points: 75, description: 'Special event welcome' }
    }
  };

  return rewards[type] || rewards.standard;
}

export function getReferralAchievements() {
  return [
    {
      id: 'first_referral',
      name: 'First Referral',
      description: 'Successfully referred your first member',
      icon: '🎯',
      category: 'referral',
      type: 'milestone',
      requirement: { referrals: 1 },
      points: 150
    },
    {
      id: 'social_butterfly',
      name: 'Social Butterfly',
      description: 'Referred 5 new members',
      icon: '🦋',
      category: 'referral',
      type: 'milestone',
      requirement: { referrals: 5 },
      points: 500
    },
    {
      id: 'community_builder',
      name: 'Community Builder',
      description: 'Referred 10 new members',
      icon: '🏗️',
      category: 'referral',
      type: 'milestone',
      requirement: { referrals: 10 },
      points: 1000
    },
    {
      id: 'referral_champion',
      name: 'Referral Champion',
      description: 'Referred 25 new members',
      icon: '🏆',
      category: 'referral',
      type: 'milestone',
      requirement: { referrals: 25 },
      points: 2500
    },
    {
      id: 'ambassador',
      name: 'Campus Ambassador',
      description: 'Referred 50 new members',
      icon: '👑',
      category: 'referral',
      type: 'milestone',
      requirement: { referrals: 50 },
      points: 5000
    }
  ];
}

export function formatReferralLink(code, baseUrl = 'https://unistory.app') {
  return `${baseUrl}/signup?ref=${code}`;
}

export function getReferralStats(referrals = []) {
  const total = referrals.length;
  const completed = referrals.filter(r => r.status === 'completed').length;
  const pending = referrals.filter(r => r.status === 'pending').length;
  const conversionRate = total > 0 ? (completed / total * 100).toFixed(1) : 0;

  return {
    total,
    completed,
    pending,
    conversionRate: parseFloat(conversionRate)
  };
}
