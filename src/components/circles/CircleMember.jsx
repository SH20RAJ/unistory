"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Users } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

/**
 * CircleMember Component
 * Displays a member in a circle with their information
 */
export function CircleMember({ member }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-1">
            <span className="font-medium text-sm">{member.name}</span>
            {member.isAdmin && (
              <Badge variant="secondary" className="h-5 px-1 text-xs">
                <Shield className="h-3 w-3 mr-1" /> Admin
              </Badge>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>{member.college}</span>
              <span>•</span>
              <span>
                Joined {formatDistanceToNow(new Date(member.joined), { addSuffix: false })} ago
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
