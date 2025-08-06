import React from 'react';
import { Heart, Baby, Calendar, ActivitySquare, ShieldCheck } from 'lucide-react';
import { StatsCounter } from './StatsCounter';
import { cn } from '@/lib/utils';
interface ModernHeroSectionProps {
  className?: string;
}
export function ModernHeroSection({
  className
}: ModernHeroSectionProps) {
  const stats = [{
    value: 45,
    label: "Outils Gratuits",
    suffix: "+"
  }, {
    value: 10000,
    label: "Familles Aidées",
    suffix: "+"
  }, {
    value: 100,
    label: "Satisfaction",
    suffix: "%"
  }, {
    value: 24,
    label: "Support Disponible",
    suffix: "h/7j"
  }];
  return <section className={cn("relative w-full min-h-[70vh] flex flex-col justify-center items-center overflow-hidden", "bg-white", className)}>
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-8">
        {/* Titre principal uniquement */}
        <div className="space-y-4 animate-fade-in">
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-center mb-8 bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, #fe8c00, #f83600)'
            }}
          >
            L'organisation sans prise de tête
          </h1>
        </div>


        {/* Statistiques dynamiques */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fade-in" style={{
        animationDelay: '0.6s'
      }}>
          {stats.map((stat, index) => <StatsCounter key={stat.label} value={stat.value} label={stat.label} suffix={stat.suffix} delay={index * 200} className="p-4 glass-card hover:scale-105 transition-transform duration-300" />)}
        </div>
      </div>
    </section>;
}