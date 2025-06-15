
import React, { useState } from 'react';
import Hero from "@/components/Hero";
import FamilyHubSearchFilters from "@/components/family-hub/FamilyHubSearchFilters";
import FamilyHubStats from "@/components/family-hub/FamilyHubStats";
import FamilyHubToolCard from "@/components/family-hub/FamilyHubToolCard";
import PWAStatus from "@/components/PWAStatus";
import { tools } from "@/data/toolsData";

// Liste des catégories (français, peut personnaliser ici pour + lisible)
const categories = ['Tous', 'Organisation', 'Finances', 'Éducation', 'Santé', 'Équilibre', 'Développement', 'Loisirs', 'Pratique'];

export default function FamilyHub() {
  // On n'a plus besoin de searchTerm
  // const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Tous');

  const filteredTools = tools.filter(tool => {
    // On retire le filtre search, ne garde que la catégorie
    const matchesCategory = selectedCategory === 'Tous' || tool.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nouveau Hero amélioré */}
      <Hero />

      <main className="max-w-7xl mx-auto w-full px-2 xs:px-4 sm:px-6 lg:px-8 py-6 flex flex-col items-center flex-grow">
        {/* Filtres de catégorie centrés et valorisés */}
        <FamilyHubSearchFilters
          // plus de searchTerm ni setSearchTerm
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <div className="w-full md:w-[85%] mx-auto">
          <FamilyHubStats />

          {/* Grille d'outils mieux espacée, bien centrée */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-3">
            {filteredTools.map((tool) => (
              <FamilyHubToolCard tool={tool} key={tool.id} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-10 animate-fade-in">
              <div className="text-gray-400 text-lg mb-2">Aucun outil trouvé</div>
              <p className="text-gray-500">Essayez une autre catégorie&nbsp;!</p>
            </div>
          )}

          {/* Section valeurs, retouchée pour meilleure intégration */}
          <section className="mt-12 md:mt-20 bg-white/90 rounded-3xl p-5 md:p-8 shadow border border-blue-100 mx-0 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-7 font-playfair">
              Pourquoi choisir <span className="inline-block px-2 py-0.5 rounded-xl bg-gradient-to-tr from-blue-100 via-pink-100 to-purple-100 ml-1">Suite Famille</span> ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
              {[
                {
                  icon: "🔒",
                  title: "Confidentialité Totale",
                  desc: "Toutes vos données restent sur votre appareil. Zéro trace, zéro cloud, zéro pub."
                },
                {
                  icon: "💝",
                  title: "100% Gratuit",
                  desc: "Aucun abonnement, ni option payante cachée. Accès complet, sans restriction."
                },
                {
                  icon: "👨‍👩‍👧‍👦",
                  title: "Pensé Famille",
                  desc: "Interface ludique, intuitive, adaptée à tous les âges et accessible sur tous appareils."
                },
              ].map(f => (
                <div className="text-center animate-fade-in transition-transform duration-200 hover:scale-105 active:scale-95" key={f.title}>
                  <div className="rounded-full bg-gradient-to-tr from-blue-200 via-pink-100 to-purple-100 shadow p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
                    <span>{f.icon}</span>
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* PWA Status en bas de page */}
      <PWAStatus />
    </div>
  );
}
