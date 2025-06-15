
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { GraduationCap } from "lucide-react";

export default function SchoolCosts() {
  const features = [
    "Calculateur coût rentrée de base",
    "Liste fournitures personnalisable",
    "Estimation budget par niveau",
    "Suivi des achats"
  ];

  const comingSoonFeatures = [
    "Base de données prix fournitures par niveau",
    "Liste automatique selon classe/établissement",
    "Comparateur prix magasins",
    "Planification achats échelonnés",
    "Suivi budget vs dépenses réelles",
    "Conseils économies et récupération"
  ];

  return (
    <ToolTemplate
      title="Calculateur Coût de la Rentrée"
      description="Anticipez et budgétisez la rentrée scolaire avec comparateur prix. 🎓 Base prix complète, planification achats, conseils économies."
      icon={<GraduationCap />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-indigo-50 via-blue-50 to-purple-50"
      iconBgColor="bg-indigo-100"
      iconTextColor="text-indigo-600"
    />
  );
}
