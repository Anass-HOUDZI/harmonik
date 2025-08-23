import React from 'react';
import { cn } from '@/lib/utils';

interface ModernHeroSectionProps {
  className?: string;
}

export function ModernHeroSection({
  className
}: ModernHeroSectionProps) {

  return (
    <section className={cn(
      "relative w-full min-h-[45vh] sm:min-h-[50vh] lg:min-h-[55vh]", 
      "flex flex-col justify-center items-center overflow-hidden bg-white px-2 py-4 sm:px-4 sm:py-6 lg:py-8", 
      className
    )}>
      <div className="relative z-10 w-full max-w-7xl mx-auto text-center space-y-4 sm:space-y-6">
        {/* Titre principal - ultra responsive */}
        <div className="space-y-2 sm:space-y-3 animate-fade-in">
          <h1 
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent px-1"
            style={{
              backgroundImage: 'linear-gradient(to right, #fe8c00, #f83600)'
            }}
          >
            Fini le chaos familial 🪄
          </h1>
          <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed px-2 sm:px-4">
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