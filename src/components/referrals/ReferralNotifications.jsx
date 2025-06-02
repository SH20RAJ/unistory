"use client";
import { useState, useEffect } from 'react';
import { CheckCircle, Gift, UserPlus, Trophy } from 'lucide-react';

export function useReferralNotifications() {
    const [notifications, setNotifications] = useState([]);

    const addNotification = (notification) => {
        const id = Date.now().toString();
        const newNotification = { ...notification, id };

        setNotifications(prev => [...prev, newNotification]);

        // Auto remove after 5 seconds
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    };

    const removeNotification = (id) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    return {
        notifications,
        addNotification,
        removeNotification
    };
}

export function ReferralNotification({ notification, onClose }) {
    const getIcon = (type) => {
        switch (type) {
            case 'referral_successful':
                return <UserPlus className="w-5 h-5 text-green-600" />;
            case 'reward_earned':
                return <Gift className="w-5 h-5 text-blue-600" />;
            case 'milestone_reached':
                return <Trophy className="w-5 h-5 text-yellow-600" />;
            default:
                return <CheckCircle className="w-5 h-5 text-green-600" />;
        }
    };

    const getTitle = (type) => {
        switch (type) {
            case 'referral_successful':
                return '🎉 Referral Successful!';
            case 'reward_earned':
                return '🎁 Reward Earned!';
            case 'milestone_reached':
                return '🏆 Milestone Reached!';
            default:
                return '✅ Success!';
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm animate-in slide-in-from-right-4">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {getTitle(notification.type)}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {notification.message}
                    </p>
                    {notification.reward && (
                        <div className="mt-2 text-xs font-medium text-blue-600 dark:text-blue-400">
                            +{notification.reward} points earned!
                        </div>
                    )}
                </div>
                <button
                    onClick={() => onClose(notification.id)}
                    className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                    <span className="sr-only">Close</span>
                    ×
                </button>
            </div>
        </div>
    );
}

export function ReferralNotifications() {
    const { notifications, removeNotification } = useReferralNotifications();

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
                <ReferralNotification
                    key={notification.id}
                    notification={notification}
                    onClose={removeNotification}
                />
            ))}
        </div>
    );
}
