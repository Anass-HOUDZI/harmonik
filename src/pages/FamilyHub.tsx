
import React, { useState } from 'react';
import Hero from "@/components/Hero";
import FamilyHubSearchFilters from "@/components/family-hub/FamilyHubSearchFilters";
import FamilyHubStats from "@/components/family-hub/FamilyHubStats";
import FamilyHubToolCard from "@/components/family-hub/FamilyHubToolCard";
import PWAStatus from "@/components/PWAStatus";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { FeatureHighlight } from "@/components/common/FeatureHighlight";
import { EmptyState } from "@/components/common/EmptyState";
import { Search } from "lucide-react";
import { tools } from "@/data/toolsData";

const categories = ['Tous', 'Organisation', 'Finances', 'Éducation', 'Santé', 'Équilibre', 'Développement', 'Loisirs', 'Pratique'];

const features = [
  {
    icon: "🔒",
    title: "Confidentialité Totale",
    description: "Toutes vos données restent sur votre appareil. Zéro trace, zéro cloud, zéro pub."
  },
  {
    icon: "💝",
    title: "100% Gratuit",
    description: "Aucun abonnement, ni option payante cachée. Accès complet, sans restriction."
  },
  {
    icon: "👨‍👩‍👧‍👦",
    title: "Pensé Famille",
    description: "Interface ludique, intuitive, adaptée à tous les âges et accessible sur tous appareils."
  }
];

export default function FamilyHub() {
  const [selectedCategory, setSelectedCategory] = useState('Tous');

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === 'Tous' || tool.category === selectedCategory;
    return matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Hero />

      <main className="flex-grow">
        <PageContainer className="py-6 flex flex-col items-center">
          <FamilyHubSearchFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />

          <div className="w-full md:w-[85%] mx-auto">
            <Section variant="transparent">
              <FamilyHubStats />
            </Section>

            <Section variant="transparent" spacing="sm">
              {filteredTools.length > 0 ? (
                <ResponsiveGrid 
                  cols={{ default: 1, sm: 2, lg: 3, xl: 4 }}
                  gap="lg"
                >
                  {filteredTools.map((tool) => (
                    <FamilyHubToolCard tool={tool} key={tool.id} />
                  ))}
                </ResponsiveGrid>
              ) : (
                <EmptyState
                  title="Aucun outil trouvé"
                  description="Essayez une autre catégorie !"
                  icon={<Search className="h-12 w-12" />}
                />
              )}
            </Section>

            <Section 
              variant="card"
              className="mt-12 md:mt-20 bg-white/90 border-blue-100"
              spacing="lg"
            >
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center text-blue-900 mb-7 font-playfair">
                  Pourquoi choisir{' '}
                  <span className="inline-block px-2 py-0.5 rounded-xl bg-gradient-to-tr from-blue-100 via-pink-100 to-purple-100 ml-1">
                    Suite Famille
                  </span>{' '}
                  ?
                </h2>
                <ResponsiveGrid 
                  cols={{ default: 1, md: 3 }}
                  gap="lg"
                  className="max-w-4xl"
                >
                  {features.map((feature) => (
                    <FeatureHighlight
                      key={feature.title}
                      icon={feature.icon}
                      title={feature.title}
                      description={feature.description}
                    />
                  ))}
                </ResponsiveGrid>
              </div>
            </Section>
          </div>
        </PageContainer>
      </main>

      <PWAStatus />
    </div>
  );
}
