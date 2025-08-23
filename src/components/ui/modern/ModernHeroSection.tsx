import React from 'react';
import { Heart, Baby, Calendar, ActivitySquare, ShieldCheck } from 'lucide-react';

import { cn } from '@/lib/utils';

interface ModernHeroSectionProps {
  className?: string;
}

export function ModernHeroSection({
  className
}: ModernHeroSectionProps) {

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

      </div>
    </section>
  );
}