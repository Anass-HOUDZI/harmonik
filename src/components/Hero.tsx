
import React from "react";

export default function Hero() {
  return (
    <section className="w-full flex justify-center items-center bg-blue-100 py-16 md:py-24 px-4 mb-10">
      <div className="max-w-3xl mx-auto text-center animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-900 tracking-tight drop-shadow mb-6 flex flex-col items-center gap-2">
          <span className="inline-block rounded-2xl bg-blue-200 px-7 py-3 shadow-inner text-blue-700 text-3xl mb-2">Suite Famille</span>
          <span className="text-4xl md:text-5xl mt-2">🏠</span>
        </h1>
        <p className="text-xl md:text-2xl font-medium text-blue-800 mb-2">Tous les outils essentiels pour la vie de famille, gratuits, modernes, sans pub.</p>
        <p className="text-lg text-blue-700 opacity-90">Planifiez, organisez et profitez de chaque moment en famille.</p>
      </div>
    </section>
  );
}
