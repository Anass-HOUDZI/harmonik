import React, { useState } from 'react';
import Hero from "@/components/Hero";
import FamilyHubSearchFilters from "@/components/family-hub/FamilyHubSearchFilters";
import FamilyHubStats from "@/components/family-hub/FamilyHubStats";
import FamilyHubToolCard from "@/components/family-hub/FamilyHubToolCard";
import { tools } from "@/data/toolsData";
import ProgressBar from "@/components/family-hub/ProgressBar";
import { FamilySidebar } from "@/components/family-hub/FamilySidebar";
import { Toaster } from "@/components/ui/toaster";

const categories = ['Tous', 'Organisation', 'Finances', 'Éducation', 'Santé', 'Équilibre', 'Développement', 'Loisirs', 'Pratique'];

export default function FamilyHub() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Tous');

  // Filtre les outils comme avant
  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Progression visu
  const availableCount = tools.filter(t => t.status === "available").length;
  const totalCount = tools.length;

  return (
    <div className="min-h-screen bg-white flex">
      {/* Barre latérale navigation */}
      <FamilySidebar
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      <div className="flex-1">
        {/* Hero toujours fixe et bien espacé */}
        <Hero />
        <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-6">
          {/* Barre progression */}
          <ProgressBar available={availableCount} total={totalCount} />
          {/* Search and Filters */}
          <FamilyHubSearchFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          <FamilyHubStats />

          {/* Tools Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mt-3">
            {filteredTools.map((tool) => (
              <FamilyHubToolCard tool={tool} key={tool.id} />
            ))}
          </div>

          {filteredTools.length === 0 && (
            <div className="text-center py-10 animate-fade-in">
              <div className="text-gray-400 text-lg mb-2">Aucun outil trouvé</div>
              <p className="text-gray-500">Essayez d'autres critères ou filtrez par catégorie&nbsp;!</p>
            </div>
          )}

          <section className="mt-10 md:mt-16 bg-white/80 rounded-3xl p-5 md:p-8 shadow border border-blue-100 mx-0">
            <h2 className="text-2xl font-bold text-center text-blue-900 mb-7">
              Pourquoi choisir Suite Famille ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                  desc: "Interface moderne, intuitive, adaptée à tous les âges et accessible sur tous appareils."
                },
              ].map(f => (
                <div className="text-center animate-fade-in" key={f.title}>
                  <div className="rounded-full bg-gradient-to-tr from-blue-200 via-pink-100 to-purple-100 shadow p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center text-3xl">
                    <span>{f.icon}</span>
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">{f.title}</h3>
                  <p className="text-gray-600 text-sm">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Toaster />
      </div>
    </div>
  );
}
