
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { PiggyBank } from "lucide-react";

export default function KidsExpenses() {
  const features = [
    "Suivi basique des dépenses enfants",
    "Catégorisation manuelle simple",
    "Calculs de totaux par période",
    "Vue d'ensemble des coûts"
  ];

  const comingSoonFeatures = [
    "Catégorisation automatique (santé, école, loisirs, vêtements)",
    "Comparaison coût par enfant et par âge",
    "Projection coûts futurs (scolarité, études)",
    "Identification des postes d'économie",
    "Graphiques évolution par période",
    "Conseils réduction dépenses"
  ];

  return (
    <ToolTemplate
      title="Tracker Dépenses Enfants"
      description="Quantifiez et optimisez les coûts liés aux enfants par catégorie. 💰 Analyse automatique, projections futures, conseils économies."
      icon={<PiggyBank />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-green-50 via-blue-50 to-purple-50"
      iconBgColor="bg-green-100"
      iconTextColor="text-green-600"
    />
  );
}
