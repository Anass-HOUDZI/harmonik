
import React from "react";
import { Activity } from "@/data/activitiesData";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { MapPin, Sun, CloudRain, Users } from "lucide-react";

type Props = {
  activity: Activity;
  onClick?: () => void;
};

export default function SuggestionActivityCard({ activity, onClick }: Props) {
  return (
    <Card
      className="overflow-hidden transition-shadow hover:shadow-lg hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      <img
        src={activity.thumbnail}
        alt={activity.title}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-2 mb-2 items-center">
          <Badge className="bg-blue-100 text-blue-700">{activity.type}</Badge>
          <Badge className="bg-purple-100 text-purple-700">{activity.recommendedAges}</Badge>
          <Badge className="bg-green-100 text-green-700">{activity.budget}</Badge>
        </div>
        <div className="font-bold text-base mb-1">{activity.title}</div>
        <div className="text-sm text-gray-600 line-clamp-2">{activity.description}</div>
      </CardContent>
      <CardFooter className="flex justify-between text-xs px-4 pb-2">
        <span className="flex items-center gap-1 text-gray-500">
          <MapPin className="h-4 w-4" /> {activity.location}
        </span>
        <span className="flex items-center gap-1 text-gray-500">
          {activity.weather === "soleil" ? (
            <Sun className="h-4 w-4 text-yellow-400" />
          ) : activity.weather === "pluie" ? (
            <CloudRain className="h-4 w-4 text-blue-400" />
          ) : (
            <Sun className="h-4 w-4 text-yellow-400" />
          )}
          {activity.weather === "any" ? "toute météo" : activity.weather}
        </span>
        <span className="flex items-center gap-1 text-gray-500">
          <Users className="h-4 w-4" />
          {activity.duration}
        </span>
      </CardFooter>
    </Card>
  );
}
