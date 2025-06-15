
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tool } from "@/data/toolsData";

function getStatusColor(status: string) {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-800';
    case 'beta': return 'bg-yellow-100 text-yellow-800';
    case 'coming-soon': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusText(status: string) {
  switch (status) {
    case 'available': return 'Disponible';
    case 'beta': return 'Beta';
    case 'coming-soon': return 'Bientôt';
    default: return 'Inconnu';
  }
}

export default function FamilyHubToolCard({ tool }: { tool: Tool }) {
  const navigate = useNavigate();
  const IconComponent = tool.icon;

  return (
    <Card 
      className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-blue-300"
      onClick={() => tool.status === 'available' && navigate(tool.route)}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <IconComponent className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{tool.name}</CardTitle>
              <Badge className={`mt-1 ${getStatusColor(tool.status)}`}>
                {getStatusText(tool.status)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 leading-relaxed">
          {tool.description}
        </CardDescription>
        <div className="mt-4 flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            {tool.category}
          </Badge>
          {tool.status === 'available' && (
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Ouvrir
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
