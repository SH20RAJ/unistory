"use client";

import { useState } from "react";
import Link from "next/link";
import { CircleCard } from "@/components/circles/CircleCard";

/**
 * CircleList Component
 * Displays a list of circles with optional filters
 */
export function CircleList({
  circles,
  category = "all",
  layout = "grid",
  limit = 6,
  showDescription = true
}) {
  const filteredCircles = circles.filter(circle => {
    if (category === "all") return true;
    return circle.category.toLowerCase() === category.toLowerCase();
  }).slice(0, limit);

  if (layout === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCircles.map(circle => (
          <Link href={`/circles/${circle.id}`} key={circle.id}>
            <CircleCard circle={circle} />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredCircles.map(circle => (
        <Link href={`/circles/${circle.id}`} key={circle.id}>
          <CircleCard circle={circle} compact={!showDescription} />
        </Link>
      ))}
    </div>
  );
}
