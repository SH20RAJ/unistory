import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MessageCircle, Video } from "lucide-react";

const StudyBuddies = () => {
  const buddies = [
    {
      id: 1,
      name: "Sarah Kim",
      subject: "Data Science",
      status: "online",
      studying: "Machine Learning",
      avatar: "SK"
    },
    {
      id: 2,
      name: "Alex Chen",
      subject: "Computer Science",
      status: "studying",
      studying: "Algorithms",
      avatar: "AC"
    },
    {
      id: 3,
      name: "Maya Rodriguez",
      subject: "Psychology",
      status: "offline",
      studying: "Research Methods",
      avatar: "MR"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'studying': return 'bg-orange-500';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'studying': return 'Studying';
      case 'offline': return 'Offline';
      default: return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5" />
          <span>Study Buddies</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {buddies.map((buddy) => (
          <div key={buddy.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-500 text-white text-sm">
                  {buddy.avatar}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(buddy.status)}`}></div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <div className="font-medium text-sm truncate">{buddy.name}</div>
                <Badge variant="outline" className="text-xs">
                  {buddy.subject}
                </Badge>
              </div>
              <div className="text-xs text-gray-500">
                {buddy.status === 'studying' ? `Studying ${buddy.studying}` : getStatusText(buddy.status)}
              </div>
            </div>

            <div className="flex space-x-1">
              <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                <MessageCircle className="w-3 h-3" />
              </Button>
              {buddy.status === 'online' && (
                <Button variant="ghost" size="sm" className="p-1 h-7 w-7">
                  <Video className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
        
        <div className="text-center pt-2 border-t">
          <Button variant="outline" size="sm" className="text-xs">
            Find More Study Buddies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudyBuddies;
