
import React from "react";
import { Heart, Baby, Calendar, ActivitySquare, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full flex justify-center items-center bg-gradient-to-br from-pink-50 via-blue-50 to-purple-100 py-14 md:py-20 px-4 mb-8 lg:mb-14 shadow-sm">
      <div className="max-w-3xl mx-auto w-full text-center animate-fade-in flex flex-col gap-2 items-center">
        {/* LOGO/ Hero Logo typographique */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center mb-3">
          <img 
            src="/harmonik-logo.png" 
            alt="Harmonik" 
            className="h-12 xs:h-14 md:h-20 w-auto object-contain"
          />
          <span className="flex gap-1 items-center sm:ml-1">
            <Heart className="text-pink-400 h-7 w-7 xs:h-8 xs:w-8 md:h-10 md:w-10 drop-shadow" fill="#fb80b8" />
            <Baby className="text-yellow-400 h-7 w-7 xs:h-8 xs:w-8 md:h-10 md:w-10 drop-shadow" fill="#FFD700" />
            <Calendar className="text-blue-500 h-7 w-7 xs:h-8 xs:w-8 md:h-10 md:w-10 drop-shadow" fill="#60a5fa" />
            <ActivitySquare className="text-green-400 h-7 w-7 xs:h-8 xs:w-8 md:h-10 md:w-10 drop-shadow" fill="#59e4a7" />
            <ShieldCheck className="text-purple-400 h-7 w-7 xs:h-8 xs:w-8 md:h-10 md:w-10 drop-shadow" fill="#c084fc" />
          </span>
        </div>
        <p className="text-lg xs:text-xl md:text-2xl font-semibold text-blue-800 mb-1 drop-shadow-sm">Outils gratuits, fun & puissants pour les familles modernes !</p>
        <p className="text-base xs:text-lg text-blue-700 opacity-90 font-medium">Organisez, planifiez, profitez ensemble.</p>
      </div>
    </section>
  );
}
