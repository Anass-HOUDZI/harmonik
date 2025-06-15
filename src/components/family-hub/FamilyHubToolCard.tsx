
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tool } from "@/data/toolsData";

function getStatusColor(status: string) {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-700';
    case 'beta': return 'bg-yellow-100 text-yellow-700';
    case 'coming-soon': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
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
      className={`
        group relative cursor-pointer
        rounded-2xl shadow-md border-0 bg-gradient-to-br from-white via-blue-50/60 to-pink-50
        hover:shadow-xl
        transition-all duration-200 ease-out
        hover:scale-[1.045]
        hover:z-20
        overflow-hidden
        p-0
      `}
      onClick={() => tool.status === 'available' && navigate(tool.route)}
      tabIndex={0}
      aria-label={tool.name}
    >
      <CardHeader className="pb-2 px-5 pt-5 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="rounded-xl bg-white shadow w-14 h-14 flex items-center justify-center border border-blue-100 transition-transform group-hover:scale-110">
              <IconComponent className="w-9 h-9 text-blue-500/90" />
            </div>
            <div>
              <CardTitle className="text-base md:text-lg text-blue-900 font-semibold">{tool.name}</CardTitle>
              <Badge className={`mt-1 ${getStatusColor(tool.status)} text-xs px-2 py-0.5 select-none transition-colors`}>{getStatusText(tool.status)}</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-5 px-5 pt-2">
        <CardDescription className="text-gray-600 leading-relaxed min-h-[44px] text-sm">{tool.description}</CardDescription>
        <div className="mt-3 flex justify-between items-center">
          <Badge variant="outline" className="text-xs rounded-md border-blue-200 px-2 py-0.5">{tool.category}</Badge>
          {tool.status === 'available' && (
            <Button
              size="sm"
              className={`
                bg-gradient-to-r from-blue-600 via-fuchsia-500 to-violet-500
                hover:from-blue-700 hover:to-pink-500 
                shadow-sm font-semibold
                px-4 py-1.5
                rounded-lg
                transition
                text-white
                focus-visible:ring-2 focus-visible:ring-blue-400
                text-xs md:text-sm
              `}
              tabIndex={-1}
            >
              Ouvrir
            </Button>
          )}
        </div>
      </CardContent>
      {/* Decorative overlay animation */}
      <span className="pointer-events-none absolute left-0 top-0 w-full h-2 bg-gradient-to-r from-blue-400/30 via-purple-200/0 to-pink-400/40 group-hover:h-3 transition-all duration-300"></span>
    </Card>
  );
}

