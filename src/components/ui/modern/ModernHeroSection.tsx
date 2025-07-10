
import React from 'react';
import { Heart, Baby, Calendar, ActivitySquare, ShieldCheck } from 'lucide-react';
import { StatsCounter } from './StatsCounter';
import { SearchBar } from './SearchBar';
import { cn } from '@/lib/utils';

interface ModernHeroSectionProps {
  onSearch?: (value: string) => void;
  className?: string;
}

export function ModernHeroSection({ onSearch, className }: ModernHeroSectionProps) {
  const stats = [
    { value: 50, label: "Outils Gratuits", suffix: "+" },
    { value: 10000, label: "Familles Aidées", suffix: "+" },
    { value: 100, label: "Satisfaction", suffix: "%" },
    { value: 24, label: "Support Disponible", suffix: "h/7j" }
  ];

  return (
    <section className={cn(
      "relative w-full min-h-[70vh] flex flex-col justify-center items-center overflow-hidden",
      "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 bg-pattern",
      className
    )}>
      {/* Background decoratif */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-pink-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-8">
        {/* Logo et titre principal */}
        <div className="space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl xs:text-5xl md:text-7xl font-bold font-space tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse-glow">
                Suite Famille
              </span>
            </h1>
            <div className="flex gap-1 items-center">
              <Heart className="text-pink-500 h-8 w-8 md:h-12 md:w-12 animate-float" fill="currentColor" />
              <Baby className="text-yellow-500 h-8 w-8 md:h-12 md:w-12 animate-float" fill="currentColor" style={{ animationDelay: '0.5s' }} />
              <Calendar className="text-blue-500 h-8 w-8 md:h-12 md:w-12 animate-float" fill="currentColor" style={{ animationDelay: '1s' }} />
              <ActivitySquare className="text-green-500 h-8 w-8 md:h-12 md:w-12 animate-float" fill="currentColor" style={{ animationDelay: '1.5s' }} />
              <ShieldCheck className="text-purple-500 h-8 w-8 md:h-12 md:w-12 animate-float" fill="currentColor" style={{ animationDelay: '2s' }} />
            </div>
          </div>

          <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 max-w-4xl mx-auto leading-relaxed">
            <span className="bg-gradient-to-r from-blue-700 to-purple-700 bg-clip-text text-transparent">
              Outils gratuits, intuitifs & puissants
            </span>
            <br />
            <span className="text-gray-600">pour les familles modernes</span>
          </p>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Organisez, planifiez, éduquez et profitez ensemble avec notre suite complète d'outils familiaux.
          </p>
        </div>

        {/* Barre de recherche glassmorphism */}
        <div className="max-w-2xl mx-auto animate-scale-in" style={{ animationDelay: '0.3s' }}>
          <SearchBar 
            placeholder="Rechercher un outil familial..."
            onSearch={onSearch}
            className="w-full"
          />
        </div>

        {/* Statistiques dynamiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          {stats.map((stat, index) => (
            <StatsCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              delay={index * 200}
              className="p-4 glass-card hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>

        {/* Features badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          {['🔒 100% Privé', '💝 Totalement Gratuit', '📱 Multi-plateforme', '⚡ Hors Ligne'].map((feature, index) => (
            <div 
              key={feature}
              className="glass-card px-4 py-2 text-sm font-medium text-gray-700 hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${1.2 + index * 0.1}s` }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
