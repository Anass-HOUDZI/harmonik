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

  return (
    <section className={cn(
      "relative w-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]", 
      "flex flex-col justify-center items-center overflow-hidden bg-white px-4 py-8 sm:py-12", 
      className
    )}>
      <div className="relative z-10 max-w-7xl mx-auto text-center space-y-6 sm:space-y-8">
        {/* Titre principal - responsive */}
        <div className="space-y-3 sm:space-y-4 animate-fade-in">
          <h1 
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(to right, #fe8c00, #f83600)'
            }}
          >
            Fini le chaos familial 🪄
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
            Vous savez ce moment où vous réalisez que vous passez plus de temps à chercher 
            le planning des enfants qu'à profiter d'eux ?
            <br className="hidden sm:block" /> 
            <span className="block sm:inline"> Nous aussi. C'est pourquoi on a créé </span>
            <strong> la première suite d'outils vraiment pensée pour les familles modernes</strong>.
          </p>
        </div>

        {/* Statistiques dynamiques - responsive grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12 animate-fade-in max-w-4xl mx-auto" style={{
          animationDelay: '0.6s'
        }}>
          {stats.map((stat, index) => (
            <StatsCounter 
              key={stat.label} 
              value={stat.value} 
              label={stat.label} 
              suffix={stat.suffix} 
              delay={index * 200} 
              className="p-3 sm:p-4 md:p-6 glass-card hover:scale-105 transition-transform duration-300 touch-active min-h-[80px] sm:min-h-[100px]" 
            />
          ))}
        </div>
      </div>
    </section>
  );
}