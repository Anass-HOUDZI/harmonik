
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Plane } from "lucide-react";

export default function VacationSavings() {
  const features = [
    "Planificateur d'épargne de base",
    "Définition d'objectifs vacances",
    "Calcul mensuel simple",
    "Suivi de progression"
  ];

  const comingSoonFeatures = [
    "Calculateur budget vacances complet",
    "Plan d'épargne progressif personnalisé",
    "Comparateur destinations par budget",
    "Suivi objectif avec motivation",
    "Conseils réduction coûts voyage",
    "Intégration avec budget familial global"
  ];

  return (
    <ToolTemplate
      title="Planificateur Épargne Vacances"
      description="Budgétisez vos vacances avec plan d'épargne progressif. ✈️ Budget complet, comparateur destinations, conseils voyage."
      icon={<Plane />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-sky-50 via-blue-50 to-purple-50"
      iconBgColor="bg-sky-100"
      iconTextColor="text-sky-600"
    />
  );
}
