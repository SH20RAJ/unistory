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
        case 'study': return <BookOpen className="w-4 h-4 text-green-500" />;
        case 'events': return <Calendar className="w-4 h-4 text-blue-500" />;
        default: return <Users className="w-4 h-4 text-gray-500" />;
      }
    }
    if (type === 'anonymous') return <Shield className="w-4 h-4 text-purple-500" />;
    return null;
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
        isSelected ? 'bg-blue-50 dark:bg-blue-900/20 border-r-2 border-r-blue-500' : ''
      }`}
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          {conversation.type === 'anonymous' ? (
            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-lg">
              {conversation.avatar}
            </div>
          ) : (
            <Avatar className="w-12 h-12">
              <AvatarFallback className="bg-blue-500 text-white">
                {conversation.avatar}
              </AvatarFallback>
            </Avatar>
          )}
          {conversation.online && conversation.type === 'direct' && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-sm truncate">{conversation.name}</h3>
              {getTypeIcon(conversation.type, conversation.category)}
              {conversation.verified && (
                <Badge variant="secondary" className="text-xs">Verified</Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">{conversation.timestamp}</span>
              {conversation.unread > 0 && (
                <Badge className="bg-blue-500 text-white text-xs">
                  {conversation.unread}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {conversation.lastMessage}
            </p>
            {conversation.memberCount && (
              <span className="text-xs text-gray-500 ml-2">
                {conversation.memberCount} members
              </span>
            )}
          </div>
          
          {conversation.major && (
            <p className="text-xs text-gray-500 mt-1">{conversation.major}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const MessageBubble = ({ message, isOwnMessage }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent': return <Check className="w-3 h-3" />;
      case 'delivered': return <CheckCheck className="w-3 h-3" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default: return <Circle className="w-3 h-3" />;
    }
  };

  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-1' : 'order-2'}`}>
        {!isOwnMessage && (
          <div className="flex items-center space-x-2 mb-1">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="bg-blue-500 text-white text-xs">
                {message.senderId}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs font-medium">{message.senderName}</span>
          </div>
        )}
        
        <div
          className={`px-4 py-2 rounded-lg ${
            isOwnMessage
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
          }`}
        >
          <p className="text-sm">{message.content}</p>
        </div>
        
        <div className={`flex items-center space-x-1 mt-1 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-gray-500">{message.timestamp}</span>
          {isOwnMessage && getStatusIcon(message.status)}
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
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <MainNavigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-[calc(100vh-200px)]">
          <div className="flex h-full">
            
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              
              {/* Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-xl font-bold">Messages</h1>
                  <Button size="icon" variant="ghost">
                    <UserPlus className="w-5 h-5" />
                  </Button>
                </div>
                
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Filter Tabs */}
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-4 m-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="direct">Direct</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                  <TabsTrigger value="anonymous">Secret</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="flex-1 overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <ConversationItem
                      key={conversation.id}
                      conversation={conversation}
                      isSelected={selectedConversation?.id === conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                    />
                  ))}
                </TabsContent>
                
                <TabsContent value="direct" className="flex-1 overflow-y-auto">
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
                </TabsContent>
                
                <TabsContent value="groups" className="flex-1 overflow-y-auto">
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
                </TabsContent>
                
                <TabsContent value="anonymous" className="flex-1 overflow-y-auto">
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
                </TabsContent>
              </Tabs>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              
              {/* Chat Header */}
              {selectedConversation && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {selectedConversation.type === 'anonymous' ? (
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                          {selectedConversation.avatar}
                        </div>
                      ) : (
                        <Avatar>
                          <AvatarFallback className="bg-blue-500 text-white">
                            {selectedConversation.avatar}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <h3 className="font-medium">{selectedConversation.name}</h3>
                        <p className="text-sm text-gray-500">
                          {selectedConversation.type === 'direct' && selectedConversation.online && 'Active now'}
                          {selectedConversation.type === 'group' && `${selectedConversation.memberCount} members`}
                          {selectedConversation.type === 'anonymous' && 'Anonymous chat'}
                          {selectedConversation.major && ` • ${selectedConversation.major}`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {selectedConversation.type === 'direct' && (
                        <>
                          <Button size="icon" variant="ghost">
                            <Phone className="w-5 h-5" />
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Video className="w-5 h-5" />
                          </Button>
                        </>
                      )}
                      <Button size="icon" variant="ghost">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                {selectedConversation ? (
                  <div className="space-y-4">
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
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                      <p>Choose a conversation from the sidebar to start messaging</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Message Input */}
              {selectedConversation && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <Textarea
                        placeholder={`Message ${selectedConversation.name}...`}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="min-h-[40px] max-h-32 resize-none"
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
                      className="h-10"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex items-center space-x-2 mt-3">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4 mr-1" />
                      Send Crush
                    </Button>
                    <Button variant="ghost" size="sm">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Study Together
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Calendar className="w-4 h-4 mr-1" />
                      Plan Event
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
