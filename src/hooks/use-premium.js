"use client";

import { useState, useEffect, createContext, useContext } from 'react';

const PremiumContext = createContext();

export const PremiumProvider = ({ children }) => {
    const [isPremium, setIsPremium] = useState(false);
    const [userCredits, setUserCredits] = useState(1847);
    const [premiumApps, setPremiumApps] = useState(new Set());
    const [trialAppsUsed, setTrialAppsUsed] = useState(new Set());
    const [subscriptionType, setSubscriptionType] = useState(null); // 'monthly', 'annual', null
    const [subscriptionEndDate, setSubscriptionEndDate] = useState(null);

    // Premium requirements
    const PREMIUM_CREDIT_THRESHOLD = 2500;
    const TRIAL_LIMIT_PER_APP = 3; // 3 uses per app for free users
    const TRIAL_TIME_LIMIT = 300; // 5 minutes per trial session

    // Check if user has premium access
    const checkPremiumAccess = (appName) => {
        // If user has paid subscription
        if (subscriptionType && subscriptionEndDate && new Date() < subscriptionEndDate) {
            return true;
        }
        
        // If user has enough social credits
        if (userCredits >= PREMIUM_CREDIT_THRESHOLD) {
            return true;
        }
        
        // If app is specifically unlocked
        if (premiumApps.has(appName)) {
            return true;
        }
        
        return false;
    };

    // Check if user can use trial for an app
    const canUseTrial = (appName) => {
        const trialCount = trialAppsUsed.get(appName) || 0;
        return trialCount < TRIAL_LIMIT_PER_APP;
    };

    // Use trial for an app
    const useTrial = (appName) => {
        const currentCount = trialAppsUsed.get(appName) || 0;
        const newTrialUsed = new Map(trialAppsUsed);
        newTrialUsed.set(appName, currentCount + 1);
        setTrialAppsUsed(newTrialUsed);
        
        // Store in localStorage
        localStorage.setItem('unistory_trial_apps', JSON.stringify(Array.from(newTrialUsed.entries())));
    };

    // Unlock specific app with credits
    const unlockAppWithCredits = (appName, creditCost = 500) => {
        if (userCredits >= creditCost) {
            setUserCredits(prev => prev - creditCost);
            setPremiumApps(prev => new Set([...prev, appName]));
            
            // Store in localStorage
            localStorage.setItem('unistory_premium_apps', JSON.stringify(Array.from(premiumApps)));
            localStorage.setItem('unistory_user_credits', userCredits - creditCost);
            
            return true;
        }
        return false;
    };

    // Add credits (from activities, referrals, etc.)
    const addCredits = (amount, reason = '') => {
        setUserCredits(prev => {
            const newCredits = prev + amount;
            localStorage.setItem('unistory_user_credits', newCredits);
            
            // Show notification or trigger celebration
            if (reason) {
                console.log(`+${amount} credits: ${reason}`);
            }
            
            return newCredits;
        });
    };

    // Upgrade to premium subscription
    const upgradeToPremium = (type = 'monthly') => {
        setSubscriptionType(type);
        const endDate = new Date();
        if (type === 'annual') {
            endDate.setFullYear(endDate.getFullYear() + 1);
        } else {
            endDate.setMonth(endDate.getMonth() + 1);
        }
        setSubscriptionEndDate(endDate);
        setIsPremium(true);
        
        // Store in localStorage
        localStorage.setItem('unistory_subscription', JSON.stringify({
            type,
            endDate: endDate.toISOString()
        }));
    };

    // Load data from localStorage on mount
    useEffect(() => {
        // Load credits
        const storedCredits = localStorage.getItem('unistory_user_credits');
        if (storedCredits) {
            setUserCredits(parseInt(storedCredits));
        }

        // Load premium apps
        const storedPremiumApps = localStorage.getItem('unistory_premium_apps');
        if (storedPremiumApps) {
            setPremiumApps(new Set(JSON.parse(storedPremiumApps)));
        }

        // Load trial usage
        const storedTrialApps = localStorage.getItem('unistory_trial_apps');
        if (storedTrialApps) {
            setTrialAppsUsed(new Map(JSON.parse(storedTrialApps)));
        }

        // Load subscription
        const storedSubscription = localStorage.getItem('unistory_subscription');
        if (storedSubscription) {
            const sub = JSON.parse(storedSubscription);
            const endDate = new Date(sub.endDate);
            if (new Date() < endDate) {
                setSubscriptionType(sub.type);
                setSubscriptionEndDate(endDate);
                setIsPremium(true);
            }
        }
    }, []);

    // Credit earning activities
    const creditActivities = {
        // Social activities
        POST_LIKE: { amount: 10, description: 'Someone liked your post' },
        POST_COMMENT: { amount: 15, description: 'Someone commented on your post' },
        POST_SHARE: { amount: 25, description: 'Someone shared your post' },
        MAKE_CONNECTION: { amount: 50, description: 'Made a new connection' },
        JOIN_STUDY_GROUP: { amount: 100, description: 'Joined a study group' },
        CREATE_EVENT: { amount: 150, description: 'Created a campus event' },
        
        // Referral system
        REFERRAL_SIGNUP: { amount: 200, description: 'Friend signed up with your referral' },
        REFERRAL_PREMIUM: { amount: 500, description: 'Referred friend upgraded to premium' },
        
        // Engagement activities
        DAILY_LOGIN: { amount: 25, description: 'Daily login bonus' },
        STREAK_WEEK: { amount: 100, description: '7-day activity streak' },
        STREAK_MONTH: { amount: 500, description: '30-day activity streak' },
        
        // Content creation
        QUALITY_POST: { amount: 75, description: 'High-quality post (algorithm determined)' },
        VIRAL_CONTENT: { amount: 300, description: 'Your content went viral!' },
        
        // Academic engagement
        STUDY_SESSION: { amount: 50, description: 'Completed study session' },
        HELP_CLASSMATE: { amount: 75, description: 'Helped a classmate' },
        ACADEMIC_ACHIEVEMENT: { amount: 200, description: 'Academic milestone reached' }
    };

    const value = {
        isPremium,
        userCredits,
        subscriptionType,
        subscriptionEndDate,
        checkPremiumAccess,
        canUseTrial,
        useTrial,
        unlockAppWithCredits,
        addCredits,
        upgradeToPremium,
        creditActivities,
        PREMIUM_CREDIT_THRESHOLD,
        TRIAL_LIMIT_PER_APP,
        TRIAL_TIME_LIMIT,
        trialAppsUsed
    };

    return (
        <PremiumContext.Provider value={value}>
            {children}
        </PremiumContext.Provider>
    );
};

export const usePremium = () => {
    const context = useContext(PremiumContext);
    if (!context) {
        throw new Error('usePremium must be used within a PremiumProvider');
    }
    return context;
};

// Hook for individual app access
export const useAppAccess = (appName) => {
    const { 
        checkPremiumAccess, 
        canUseTrial, 
        useTrial, 
        unlockAppWithCredits,
        trialAppsUsed,
        TRIAL_LIMIT_PER_APP 
    } = usePremium();

    const hasAccess = checkPremiumAccess(appName);
    const canTrial = canUseTrial(appName);
    const trialsLeft = TRIAL_LIMIT_PER_APP - (trialAppsUsed.get(appName) || 0);

    return {
        hasAccess,
        canTrial,
        trialsLeft,
        useTrial: () => useTrial(appName),
        unlockApp: (creditCost) => unlockAppWithCredits(appName, creditCost)
    };
};
