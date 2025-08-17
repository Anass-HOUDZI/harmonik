
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ModernCard } from '@/components/ui/modern/ModernCard';
import { Tool } from '@/data/toolsData';
import { cn } from '@/lib/utils';

function getStatusColor(status: string) {
  switch (status) {
    case 'available': return 'bg-green-100 text-green-700 border-green-200';
    case 'beta': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'coming-soon': return 'bg-gray-100 text-gray-700 border-gray-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
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

function getCategoryGradient(category: string) {
  const gradients = {
    'Organisation': 'from-blue-500/10 to-cyan-500/10',
    'Finances': 'from-green-500/10 to-emerald-500/10',
    'Éducation': 'from-purple-500/10 to-violet-500/10',
    'Santé': 'from-red-500/10 to-pink-500/10',
    'Équilibre': 'from-orange-500/10 to-yellow-500/10',
    'Développement': 'from-indigo-500/10 to-blue-500/10',
    'Loisirs': 'from-pink-500/10 to-rose-500/10',
    'Pratique': 'from-gray-500/10 to-slate-500/10',
  };
  return gradients[category as keyof typeof gradients] || 'from-gray-500/10 to-slate-500/10';
}

export default function ModernToolCard({ tool }: { tool: Tool }) {
  const navigate = useNavigate();
  const IconComponent = tool.icon;
  const isAvailable = tool.status === 'available';

  const handleClick = () => {
    if (isAvailable) {
      // Scroll en haut avant la navigation
      window.scrollTo(0, 0);
      navigate(tool.route);
    }
  };

  return (
    <ModernCard
      variant="glass"
      hover={isAvailable}
      shine={isAvailable}
      onClick={handleClick}
      className={cn(
        "group relative p-4 sm:p-5 md:p-6 h-full cursor-pointer transition-all duration-300 touch-active",
        `bg-gradient-to-br ${getCategoryGradient(tool.category)}`,
        isAvailable && "hover:shadow-xl hover:shadow-blue-500/10",
        !isAvailable && "opacity-75 cursor-not-allowed"
      )}
    >
      {/* Effet de brillance */}
      {isAvailable && (
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      )}

      {/* Header avec icône et statut */}
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div 
          className={cn(
            "rounded-xl p-2.5 sm:p-3 shadow-lg transition-all duration-300 group-hover:scale-110",
            "bg-gradient-to-br from-white to-gray-50 border border-white/50"
          )}
        >
          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
        </div>
        
        <Badge 
          className={cn(
            "font-medium transition-all duration-300 group-hover:scale-105 text-xs",
            getStatusColor(tool.status)
          )}
        >
          {getStatusText(tool.status)}
        </Badge>
      </div>

      {/* Contenu compact */}
      <div className="space-y-2 sm:space-y-3 flex-1">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-blue-900 transition-colors duration-300 line-clamp-2 leading-tight">
          {tool.name}
        </h3>
        
        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3 sm:mb-4">
          {tool.description}
        </p>
        
        <div className="flex items-center justify-between pt-1 sm:pt-2">
          <Badge 
            variant="outline" 
            className="text-xs border-blue-200 text-blue-700 bg-blue-50/50 px-2 py-1"
          >
            {tool.category}
          </Badge>
          
          {isAvailable && (
            <Button
              size="sm"
              className={cn(
                "bg-gradient-to-r from-gradient-start to-gradient-end hover:from-gradient-start/90 hover:to-gradient-end/90",
                "shadow-lg hover:shadow-xl transition-all duration-300 touch-active",
                "text-white font-semibold px-3 sm:px-4 py-1 text-xs group-hover:scale-105 min-h-[32px]"
              )}
              tabIndex={-1}
            >
              Ouvrir
            </Button>
          )}
        </div>
      </div>

      {/* Indicateur de disponibilité */}
      <div className={cn(
        "absolute top-0 left-0 w-full h-1 rounded-t-2xl transition-all duration-300",
        isAvailable ? "bg-gradient-to-r from-green-400 to-emerald-400" : "bg-gray-300"
      )} />
    </ModernCard>
  );
}
