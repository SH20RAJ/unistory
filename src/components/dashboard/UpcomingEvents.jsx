import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";

const UpcomingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Mental Health Workshop",
      date: "Today, 3:00 PM",
      location: "Student Center",
      attendees: 23,
      type: "wellness"
    },
    {
      id: 2,
      title: "CS Study Group",
      date: "Tomorrow, 6:00 PM",
      location: "Library Room 204",
      attendees: 8,
      type: "study"
    },
    {
      id: 3,
      title: "Campus Career Fair",
      date: "Friday, 10:00 AM",
      location: "Main Hall",
      attendees: 156,
      type: "career"
    }
  ];

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'wellness': return 'bg-green-100 text-green-800';
      case 'study': return 'bg-blue-100 text-blue-800';
      case 'career': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5" />
          <span>Upcoming Events</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {events.map((event) => (
          <div key={event.id} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-sm">{event.title}</h4>
              <Badge className={`text-xs ${getEventTypeColor(event.type)}`}>
                {event.type}
              </Badge>
            </div>
            <div className="space-y-1 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-3 h-3" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
          </div>
        ))}
        <div className="text-center pt-2">
          <a href="/events" className="text-sm text-blue-600 hover:text-blue-800">
            View all events →
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
