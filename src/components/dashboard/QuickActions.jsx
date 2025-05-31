import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Users, BookOpen, MessageSquare } from "lucide-react";

const QuickActions = () => {
  const actions = [
    {
      icon: <Plus className="w-4 h-4" />,
      label: "Create Post",
      href: "/create",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: "New Event",
      href: "/events/create",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Find Study Group",
      href: "/study",
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      icon: <BookOpen className="w-4 h-4" />,
      label: "Study Resources",
      href: "/resources",
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      label: "Anonymous Post",
      href: "/confessions",
      color: "bg-gray-500 hover:bg-gray-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Quick Actions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            className={`w-full justify-start text-white ${action.color}`}
            size="sm"
            asChild
          >
            <a href={action.href}>
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </a>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuickActions;
