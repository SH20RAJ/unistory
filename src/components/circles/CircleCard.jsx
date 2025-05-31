"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Lock,
  Globe,
  UserPlus,
  Check,
  Bell,
  BellOff
} from "lucide-react";

/**
 * CircleCard Component
 * Displays a card for a circle (group) with basic information
 */
export function CircleCard({ circle, compact = false }) {
  const [joined, setJoined] = useState(circle.isMember);
  const [requesting, setRequesting] = useState(false);
  const [muted, setMuted] = useState(circle.isMuted);

  const handleJoin = (e) => {
    e.preventDefault();

    if (circle.isPrivate) {
      setRequesting(true);
    } else {
      setJoined(true);
    }
  };

  const handleToggleMute = (e) => {
    e.preventDefault();
    setMuted(!muted);
  };

  return (
    <Card className="group h-full overflow-hidden transition-all hover:border-primary/50">
      {!compact && circle.coverImage && (
        <div className="relative h-32 overflow-hidden">
          <img
            src={circle.coverImage}
            alt={circle.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute bottom-0 left-0 p-3">
            <Badge variant={circle.isPrivate ? "secondary" : "outline"} className="bg-background/70 backdrop-blur-sm">
              {circle.isPrivate ? (
                <Lock className="mr-1 h-3 w-3" />
              ) : (
                <Globe className="mr-1 h-3 w-3" />
              )}
              {circle.isPrivate ? "Private" : "Public"}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader className={compact ? "p-3" : "pb-2"}>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{circle.name}</CardTitle>
          {compact && (
            <Badge variant={circle.isPrivate ? "secondary" : "outline"} className="ml-2">
              {circle.isPrivate ? <Lock className="mr-1 h-3 w-3" /> : <Globe className="mr-1 h-3 w-3" />}
            </Badge>
          )}
        </div>
        {circle.category && (
          <CardDescription className="flex items-center gap-1">
            <Badge variant="outline" className="text-xs font-normal">
              {circle.category}
            </Badge>
            <span className="text-xs">•</span>
            <span className="text-xs">{circle.college}</span>
          </CardDescription>
        )}
      </CardHeader>

      {!compact && (
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-2">
            {circle.description}
          </p>
        </CardContent>
      )}

      <CardFooter className={compact ? "p-3 pt-0" : ""}>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{circle.memberCount} members</span>
          </div>

          {joined ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleMute}
                className="h-8 px-2"
              >
                {muted ? (
                  <BellOff className="h-4 w-4" />
                ) : (
                  <Bell className="h-4 w-4" />
                )}
              </Button>
            </div>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={handleJoin}
              disabled={requesting}
            >
              {requesting ? (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Requested
                </>
              ) : (
                <>
                  <UserPlus className="mr-1 h-4 w-4" />
                  {circle.isPrivate ? "Request" : "Join"}
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
