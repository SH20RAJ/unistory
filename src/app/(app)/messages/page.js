'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MainNavigation, BottomNavigation } from "@/components/layout/navigation";
import {
    MessageCircle,
    Send,
    Phone,
    Video,
    MoreHorizontal,
    Search,
    Star,
    Archive,
    Trash2,
    UserPlus,
    Users,
    Shield,
    Heart,
    BookOpen,
    Calendar,
    Clock,
    CheckCheck,
    Check,
    Circle
} from "lucide-react";

const mockConversations = [
    {
        id: 1,
        type: 'direct',
        name: 'Sarah Kim',
        lastMessage: 'Thanks for the study notes! Really helpful 📚',
        timestamp: '2 mins ago',
        unread: 2,
        online: true,
        avatar: 'SK',
        major: 'Data Science',
        verified: true
    },
    {
        id: 2,
        type: 'group',
        name: 'ML Study Group',
        lastMessage: 'Alex: Meeting tomorrow at 3 PM confirmed',
        timestamp: '15 mins ago',
        unread: 0,
        memberCount: 8,
        avatar: 'ML',
        category: 'study'
    },
    {
        id: 3,
        type: 'anonymous',
        name: 'Anonymous Admirer',
        lastMessage: 'I think you\'re really cute... 😊',
        timestamp: '1 hour ago',
        unread: 1,
        avatar: '💕',
        category: 'crush'
    },
    {
        id: 4,
        type: 'direct',
        name: 'Maya Rodriguez',
        lastMessage: 'See you at the mental health workshop!',
        timestamp: '3 hours ago',
        unread: 0,
        online: false,
        avatar: 'MR',
        major: 'Psychology',
        verified: true
    },
    {
        id: 5,
        type: 'group',
        name: 'Campus Events Team',
        lastMessage: 'Sarah: Event planning doc updated',
        timestamp: '1 day ago',
        unread: 5,
        memberCount: 12,
        avatar: 'CE',
        category: 'events'
    },
    {
        id: 6,
        type: 'direct',
        name: 'Jordan Lee',
        lastMessage: 'Great presentation today! 👏',
        timestamp: '2 days ago',
        unread: 0,
        online: true,
        avatar: 'JL',
        major: 'Engineering',
        verified: true
    }
];

const mockMessages = [
    {
        id: 1,
        senderId: 'SK',
        senderName: 'Sarah Kim',
        content: 'Hey! Did you understand the machine learning assignment?',
        timestamp: '10:30 AM',
        type: 'text',
        status: 'read'
    },
    {
        id: 2,
        senderId: 'me',
        senderName: 'Me',
        content: 'Yeah, mostly! The neural network part was tricky though',
        timestamp: '10:32 AM',
        type: 'text',
        status: 'read'
    },
    {
        id: 3,
        senderId: 'SK',
        senderName: 'Sarah Kim',
        content: 'Same here! Want to study together this evening?',
        timestamp: '10:33 AM',
        type: 'text',
        status: 'read'
    },
    {
        id: 4,
        senderId: 'me',
        senderName: 'Me',
        content: 'Absolutely! Library at 7 PM?',
        timestamp: '10:35 AM',
        type: 'text',
        status: 'read'
    },
    {
        id: 5,
        senderId: 'SK',
        senderName: 'Sarah Kim',
        content: 'Perfect! I\'ll bring my notes. Thanks for the study notes you shared earlier!',
        timestamp: '10:36 AM',
        type: 'text',
        status: 'delivered'
    },
    {
        id: 6,
        senderId: 'SK',
        senderName: 'Sarah Kim',
        content: 'Thanks for the study notes! Really helpful 📚',
        timestamp: 'Just now',
        type: 'text',
        status: 'sent'
    }
];

const ConversationItem = ({ conversation, isSelected, onClick }) => {
    const getTypeIcon = (type, category) => {
        if (type === 'group') {
            switch (category) {
                case 'study': return <BookOpen className="w-3.5 h-3.5 text-emerald-500" />;
                case 'events': return <Calendar className="w-3.5 h-3.5 text-blue-500" />;
                default: return <Users className="w-3.5 h-3.5 text-gray-500" />;
            }
        }
        if (type === 'anonymous') return <Shield className="w-3.5 h-3.5 text-purple-500" />;
        return null;
    };

    const getAvatarColors = (type, category) => {
        if (type === 'anonymous') return 'bg-gradient-to-br from-purple-500 to-pink-500';
        if (type === 'group') {
            switch (category) {
                case 'study': return 'bg-gradient-to-br from-emerald-500 to-green-500';
                case 'events': return 'bg-gradient-to-br from-blue-500 to-indigo-500';
                default: return 'bg-gradient-to-br from-gray-500 to-gray-600';
            }
        }
        return 'bg-gradient-to-br from-blue-500 to-purple-500';
    };

    return (
        <div
            onClick={onClick}
            className={`group relative p-3 cursor-pointer transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${isSelected
                ? 'bg-blue-50 dark:bg-blue-900/20 border-r-3 border-r-blue-500 shadow-sm'
                : 'border-b border-gray-100 dark:border-gray-800'
                }`}
        >
            <div className="flex items-start space-x-3">
                <div className="relative flex-shrink-0">
                    {conversation.type === 'anonymous' ? (
                        <div className={`w-12 h-12 ${getAvatarColors(conversation.type, conversation.category)} rounded-full flex items-center justify-center text-white text-lg shadow-md`}>
                            {conversation.avatar}
                        </div>
                    ) : (
                        <Avatar className="w-12 h-12 shadow-md ring-2 ring-white dark:ring-gray-800">
                            <AvatarFallback className={`${getAvatarColors(conversation.type, conversation.category)} text-white font-medium`}>
                                {conversation.avatar}
                            </AvatarFallback>
                        </Avatar>
                    )}
                    {conversation.online && conversation.type === 'direct' && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 rounded-full border-3 border-white dark:border-gray-800 shadow-sm"></div>
                    )}
                    {conversation.type === 'group' && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-700">
                            {getTypeIcon(conversation.type, conversation.category)}
                        </div>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                        <div className="flex items-center space-x-2 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate text-sm">
                                {conversation.name}
                            </h3>
                            {conversation.type === 'anonymous' && (
                                <Shield className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
                            )}
                            {conversation.verified && (
                                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {conversation.timestamp}
                            </span>
                            {conversation.unread > 0 && (
                                <div className="min-w-[20px] h-5 bg-blue-500 text-white text-xs font-medium rounded-full flex items-center justify-center px-1.5 shadow-sm">
                                    {conversation.unread > 99 ? '99+' : conversation.unread}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate pr-2 leading-relaxed">
                            {conversation.lastMessage}
                        </p>
                        {conversation.memberCount && (
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2 flex-shrink-0 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                                {conversation.memberCount}
                            </span>
                        )}
                    </div>

                    {conversation.major && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md inline-block">
                            {conversation.major}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const MessageBubble = ({ message, isOwnMessage }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'sent': return <Check className="w-3 h-3 text-gray-400" />;
            case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />;
            case 'read': return <CheckCheck className="w-3 h-3 text-blue-400" />;
            default: return <Circle className="w-3 h-3 text-gray-300" />;
        }
    };

    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-2 group`}>
            <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
                {!isOwnMessage && (
                    <div className="flex items-center space-x-2 mb-2 ml-1">
                        <Avatar className="w-6 h-6 ring-2 ring-white dark:ring-gray-800 shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xs font-medium">
                                {message.senderId}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{message.senderName}</span>
                    </div>
                )}

                <div className="relative">
                    <div
                        className={`px-3 py-2 rounded-2xl shadow-sm transition-all duration-200 ${isOwnMessage
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white ml-8'
                            : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 mr-8'
                            } ${isOwnMessage ? 'rounded-br-md' : 'rounded-bl-md'}`}
                    >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                    </div>

                    {/* Message tail */}
                    <div className={`absolute top-4 ${isOwnMessage ? '-right-1' : '-left-1'}`}>
                        <div className={`w-3 h-3 transform rotate-45 ${isOwnMessage
                            ? 'bg-blue-500 shadow-sm'
                            : 'bg-white dark:bg-gray-700 border-r border-b border-gray-200 dark:border-gray-600'
                            }`}></div>
                    </div>
                </div>

                <div className={`flex items-center space-x-1 mt-1.5 px-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">{message.timestamp}</span>
                    {isOwnMessage && (
                        <div className="flex items-center space-x-0.5">
                            {getStatusIcon(message.status)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default function Messages() {
    const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredConversations = mockConversations.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        // Here you would typically send the message to your backend
        console.log('Sending message:', newMessage);
        setNewMessage('');
    }; return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden h-[calc(100vh-140px)]">
                    <div className="flex h-full">
                        {/* Conversations Sidebar */}
                        <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-gray-700 flex flex-col bg-gray-50 dark:bg-gray-800/50">
                            {/* Header */}
                            <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                            {filteredConversations.length} conversations
                                        </p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                                        <UserPlus className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search conversations..."
                                        className="pl-10 bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 focus:bg-white dark:focus:bg-gray-600 transition-colors"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Filter Tabs */}
                            <Tabs defaultValue="all" className="flex-1 flex flex-col">
                                <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <TabsList className="grid w-full grid-cols-4 m-4 bg-gray-100 dark:bg-gray-700">
                                        <TabsTrigger value="all" className="text-xs font-medium">All</TabsTrigger>
                                        <TabsTrigger value="direct" className="text-xs font-medium">Direct</TabsTrigger>
                                        <TabsTrigger value="groups" className="text-xs font-medium">Groups</TabsTrigger>
                                        <TabsTrigger value="anonymous" className="text-xs font-medium">Secret</TabsTrigger>
                                    </TabsList>
                                </div>

                                <TabsContent value="all" className="flex-1 overflow-y-auto m-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredConversations.map((conversation) => (
                                            <ConversationItem
                                                key={conversation.id}
                                                conversation={conversation}
                                                isSelected={selectedConversation?.id === conversation.id}
                                                onClick={() => setSelectedConversation(conversation)}
                                            />
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="direct" className="flex-1 overflow-y-auto m-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredConversations
                                            .filter(conv => conv.type === 'direct')
                                            .map((conversation) => (
                                                <ConversationItem
                                                    key={conversation.id}
                                                    conversation={conversation}
                                                    isSelected={selectedConversation?.id === conversation.id}
                                                    onClick={() => setSelectedConversation(conversation)}
                                                />
                                            ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="groups" className="flex-1 overflow-y-auto m-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredConversations
                                            .filter(conv => conv.type === 'group')
                                            .map((conversation) => (
                                                <ConversationItem
                                                    key={conversation.id}
                                                    conversation={conversation}
                                                    isSelected={selectedConversation?.id === conversation.id}
                                                    onClick={() => setSelectedConversation(conversation)}
                                                />
                                            ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="anonymous" className="flex-1 overflow-y-auto m-0">
                                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                        {filteredConversations
                                            .filter(conv => conv.type === 'anonymous')
                                            .map((conversation) => (
                                                <ConversationItem
                                                    key={conversation.id}
                                                    conversation={conversation}
                                                    isSelected={selectedConversation?.id === conversation.id}
                                                    onClick={() => setSelectedConversation(conversation)}
                                                />
                                            ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Chat Area */}
                        <div className="hidden md:flex md:flex-1 flex-col bg-white dark:bg-gray-800">
                            {/* Chat Header */}
                            {selectedConversation && (
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            {selectedConversation.type === 'anonymous' ? (
                                                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-lg shadow-md">
                                                    {selectedConversation.avatar}
                                                </div>
                                            ) : (
                                                <Avatar className="w-12 h-12 shadow-md ring-2 ring-white dark:ring-gray-800">
                                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                                                        {selectedConversation.avatar}
                                                    </AvatarFallback>
                                                </Avatar>
                                            )}
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                                        {selectedConversation.name}
                                                    </h3>
                                                    {selectedConversation.verified && (
                                                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                                    {selectedConversation.type === 'direct' && selectedConversation.online && (
                                                        <>
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                                            <span>Active now</span>
                                                        </>
                                                    )}
                                                    {selectedConversation.type === 'group' && (
                                                        <>
                                                            <Users className="w-4 h-4" />
                                                            <span>{selectedConversation.memberCount} members</span>
                                                        </>
                                                    )}
                                                    {selectedConversation.type === 'anonymous' && (
                                                        <>
                                                            <Shield className="w-4 h-4" />
                                                            <span>Anonymous chat</span>
                                                        </>
                                                    )}
                                                    {selectedConversation.major && (
                                                        <>
                                                            <span>•</span>
                                                            <span>{selectedConversation.major}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            {selectedConversation.type === 'direct' && (
                                                <>
                                                    <Button size="icon" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                                                        <Phone className="w-5 h-5" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20">
                                                        <Video className="w-5 h-5" />
                                                    </Button>
                                                </>
                                            )}
                                            <Button size="icon" variant="ghost" className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Messages Area */}
                            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                                {selectedConversation ? (
                                    <div className="space-y-1">
                                        {mockMessages.map((message) => (
                                            <MessageBubble
                                                key={message.id}
                                                message={message}
                                                isOwnMessage={message.senderId === 'me'}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-500">
                                        <div className="text-center">
                                            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <MessageCircle className="w-10 h-10 text-blue-500" />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Select a conversation</h3>
                                            <p className="text-gray-500 dark:text-gray-400">Choose a conversation from the sidebar to start messaging</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Message Input */}
                            {selectedConversation && (
                                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <div className="flex items-end space-x-3">
                                        <div className="flex-1">
                                            <Textarea
                                                placeholder={`Message ${selectedConversation.name}...`}
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                className="min-h-[44px] max-h-32 resize-none border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 rounded-xl"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage();
                                                    }
                                                }}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim()}
                                            className="h-11 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-md transition-all duration-200 disabled:opacity-50"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {/* Quick Actions */}
                                    <div className="flex items-center space-x-2 mt-2 overflow-x-auto pb-1">
                                        <Button variant="ghost" size="sm" className="flex-shrink-0 hover:bg-pink-50 hover:text-pink-600 dark:hover:bg-pink-900/20 rounded-lg">
                                            <Heart className="w-4 h-4 mr-2" />
                                            Send Crush
                                        </Button>
                                        <Button variant="ghost" size="sm" className="flex-shrink-0 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 rounded-lg">
                                            <BookOpen className="w-4 h-4 mr-2" />
                                            Study Together
                                        </Button>
                                        <Button variant="ghost" size="sm" className="flex-shrink-0 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20 rounded-lg">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Plan Event
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Chat Overlay - Only show when conversation is selected on mobile */}
                        {selectedConversation && (
                            <div className="md:hidden absolute inset-0 bg-white dark:bg-gray-800 flex flex-col z-10">
                                {/* Mobile Chat Header */}
                                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
                                    <div className="flex items-center space-x-3">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => setSelectedConversation(null)}
                                            className="hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </Button>

                                        {selectedConversation.type === 'anonymous' ? (
                                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white">
                                                {selectedConversation.avatar}
                                            </div>
                                        ) : (
                                            <Avatar className="w-10 h-10 shadow-md">
                                                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-medium">
                                                    {selectedConversation.avatar}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                {selectedConversation.name}
                                            </h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                                {selectedConversation.type === 'direct' && selectedConversation.online && 'Active now'}
                                                {selectedConversation.type === 'group' && `${selectedConversation.memberCount} members`}
                                                {selectedConversation.type === 'anonymous' && 'Anonymous chat'}
                                            </p>
                                        </div>

                                        <div className="flex items-center space-x-1">
                                            {selectedConversation.type === 'direct' && (
                                                <>
                                                    <Button size="icon" variant="ghost" className="w-8 h-8">
                                                        <Phone className="w-4 h-4" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" className="w-8 h-8">
                                                        <Video className="w-4 h-4" />
                                                    </Button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Mobile Messages Area */}
                                <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
                                    <div className="space-y-1">
                                        {mockMessages.map((message) => (
                                            <MessageBubble
                                                key={message.id}
                                                message={message}
                                                isOwnMessage={message.senderId === 'me'}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Mobile Message Input */}
                                <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                                    <div className="flex items-end space-x-2">
                                        <div className="flex-1">
                                            <Textarea
                                                placeholder={`Message ${selectedConversation.name}...`}
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                className="min-h-[40px] max-h-28 resize-none text-sm rounded-lg"
                                                onKeyPress={(e) => {
                                                    if (e.key === 'Enter' && !e.shiftKey) {
                                                        e.preventDefault();
                                                        handleSendMessage();
                                                    }
                                                }}
                                            />
                                        </div>
                                        <Button
                                            onClick={handleSendMessage}
                                            disabled={!newMessage.trim()}
                                            className="h-10 px-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                                        >
                                            <Send className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <BottomNavigation />
        </div>
    );
}
