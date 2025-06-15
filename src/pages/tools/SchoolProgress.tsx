
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { TrendingUp } from "lucide-react";

export default function SchoolProgress() {
  const features = [
    "Suivi des notes de base",
    "Graphiques de progression simples",
    "Vue par matière",
    "Calcul de moyennes"
  ];

  const comingSoonFeatures = [
    "Saisie notes par matière/trimestre",
    "Graphiques évolution temporelle",
    "Alertes difficultés par matière",
    "Objectifs personnalisés par enfant",
    "Corrélation notes/activités",
    "Conseils amélioration ciblés"
  ];

  return (
    <ToolTemplate
      title="Tracker Progrès Scolaires"
      description="Visualisez l'évolution des résultats avec graphiques et conseils. 📊 Analyse complète, alertes difficultés, conseils personnalisés."
      icon={<TrendingUp />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-blue-50 via-indigo-50 to-purple-50"
      iconBgColor="bg-blue-100"
      iconTextColor="text-blue-600"
    />
  );
}
