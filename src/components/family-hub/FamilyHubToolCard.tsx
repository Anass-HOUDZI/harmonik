
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tool } from "@/data/toolsData";
import { toast } from "@/components/ui/use-toast";

// Modernize color palette for icons
const ICON_BG: Record<string, string> = {
  Organisation: "bg-gradient-to-br from-blue-300/70 via-blue-100/80 to-blue-50",
  Finances: "bg-gradient-to-br from-emerald-200 via-emerald-50 to-blue-50",
  "Éducation": "bg-gradient-to-br from-violet-300 via-pink-100 to-pink-50",
  Santé: "bg-gradient-to-br from-pink-200 via-orange-50 to-white",
  Équilibre: "bg-gradient-to-br from-orange-100 via-pink-50 to-white",
  Développement: "bg-gradient-to-br from-fuchsia-100 via-purple-100 to-purple-50",
  Loisirs: "bg-gradient-to-br from-lime-200 via-yellow-50 to-white",
  Pratique: "bg-gradient-to-br from-gray-100 via-stone-50 to-white",
  default: "bg-gradient-to-br from-blue-100 via-blue-50 to-white"
};

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
  // Couleur de fond icône par catégorie
  const iconBg = ICON_BG[tool.category] || ICON_BG.default;

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tool.status === "available") {
      toast({
        title: "Outil ouvert",
        description: `Vous ouvrez "${tool.name}"`,
        variant: "default"
      });
      navigate(tool.route);
    }
  };

  return (
    <Card
      className={`
        group relative cursor-pointer
        rounded-2xl shadow-lg border-0 bg-white
        hover:shadow-2xl
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
      {/* Icône + Titre + Badge */}
      <CardHeader className="pb-2 px-5 pt-5 flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className={`rounded-xl ${iconBg} shadow-md w-14 h-14 flex items-center justify-center border border-blue-100 transition-transform group-hover:scale-110`}>
              <IconComponent className="w-9 h-9" />
            </div>
            <div>
              <CardTitle className="text-base md:text-lg text-blue-900 font-semibold">{tool.name}</CardTitle>
              <Badge className={`mt-1 ${getStatusColor(tool.status)} text-xs px-2 py-0.5 select-none transition-colors shadow-sm`}>
                {getStatusText(tool.status)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      {/* Description + Catégorie + bouton */}
      <CardContent className="pb-5 px-5 pt-2">
        <CardDescription className="text-gray-600 leading-relaxed min-h-[44px] text-sm">{tool.description}</CardDescription>
        <div className="mt-3 flex justify-between items-center">
          <Badge variant="outline" className="text-xs rounded-md border-blue-200 px-2 py-0.5 bg-blue-50 text-blue-700">
            {tool.category}
          </Badge>
          {tool.status === 'available' && (
            <Button
              size="sm"
              className={`
                bg-blue-600 hover:bg-blue-700 
                shadow-sm font-semibold
                px-4 py-1.5
                rounded-lg
                transition
                text-white
                focus-visible:ring-2 focus-visible:ring-blue-400
                text-xs md:text-sm
              `}
              tabIndex={-1}
              onClick={handleOpen}
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
