import useSWR from 'swr';
import { fetcher } from '@/lib/swr';

// Hook for fetching conversations
export function useConversations(userId, type = null, limit = 50) {
    const url = userId
        ? `/api/messages/conversations?userId=${userId}&limit=${limit}${type ? `&type=${type}` : ''}`
        : null;

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        refreshInterval: 30000, // Refresh every 30 seconds for real-time feel
        revalidateOnFocus: true,
        dedupingInterval: 5000,
    });

    return {
        conversations: data?.data?.conversations || [],
        total: data?.data?.total || 0,
        isLoading,
        error,
        mutate,
    };
}

// Hook for fetching messages in a conversation
export function useMessages(conversationId, userId, limit = 50, offset = 0) {
    const url = conversationId && userId
        ? `/api/messages?conversationId=${conversationId}&userId=${userId}&limit=${limit}&offset=${offset}`
        : null;

    const { data, error, isLoading, mutate } = useSWR(url, fetcher, {
        refreshInterval: 5000, // Refresh every 5 seconds for real-time messages
        revalidateOnFocus: true,
        dedupingInterval: 2000,
    });

    return {
        messages: data?.data?.messages || [],
        conversation: data?.data?.conversation || null,
        total: data?.data?.total || 0,
        hasMore: data?.data?.hasMore || false,
        isLoading,
        error,
        mutate,
    };
}

// Hook for sending messages
export function useSendMessage() {
    const sendMessage = async (messageData) => {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(messageData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to send message');
        }

        return response.json();
    };

    return { sendMessage };
}

// Hook for creating conversations
export function useCreateConversation() {
    const createConversation = async (conversationData) => {
        const response = await fetch('/api/messages/conversations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(conversationData),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create conversation');
        }

        return response.json();
    };

    return { createConversation };
}

// Hook for marking messages as read
export function useMarkAsRead() {
    const markAsRead = async (conversationId, userId) => {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'markAsRead',
                conversationId,
                senderId: userId,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to mark messages as read');
        }

        return response.json();
    };

    return { markAsRead };
}

// Hook for editing/deleting messages
export function useMessageActions() {
    const editMessage = async (messageId, userId, content) => {
        const response = await fetch(`/api/messages/${messageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'edit',
                userId,
                content,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to edit message');
        }

        return response.json();
    };

    const deleteMessage = async (messageId, userId) => {
        const response = await fetch(`/api/messages/${messageId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'delete',
                userId,
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete message');
        }

        return response.json();
    };

    return { editMessage, deleteMessage };
}
