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

        {/* Bloc de statistiques */}
        <div className="w-full max-w-4xl mx-auto mt-8 sm:mt-12 px-2 sm:px-4">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-white/20 text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent mb-2">
                39+
              </div>
              <div className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                Outils Gratuits
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-white/20 text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent mb-2">
                10 000+
              </div>
              <div className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                Familles Aidées
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-white/20 text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent mb-2">
                100%
              </div>
              <div className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                Satisfaction
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg border border-white/20 text-center">
              <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#fe8c00] to-[#f83600] bg-clip-text text-transparent mb-2">
                24h/7j
              </div>
              <div className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 font-medium">
                Support Disponible
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-transparent to-red-50/30 pointer-events-none"></div>
    </section>
  );
}