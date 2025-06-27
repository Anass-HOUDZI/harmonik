
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Coffee } from "lucide-react";

export default function RelaxationGenerator() {
  const features = [
    "Activités détente par âge et contexte",
    "Séances relaxation courtes (5-15 min)",
    "Conseils respiration et méditation simple",
    "Mode famille avec activités communes"
  ];

  const comingSoonFeatures = [
    "Base complète activités relaxation tous âges",
    "Personnalisation selon niveau stress/fatigue détecté",
    "Séances méditation guidée adaptées contexte familial",
    "Exercices respiration parents/enfants synchronisés",
    "Mode urgence détente pour situations critiques",
    "Suivi impact bien-être avec recommandations évolutives"
  ];

  return (
    <ToolTemplate
      title="Générateur Activités Détente"
      description="Créez des moments de relaxation avec méditation guidée et exercices famille. ☕ Personnalisé, guidé, anti-stress."
      icon={<Coffee />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-purple-50 via-pink-50 to-rose-50"
      iconBgColor="bg-purple-100"
      iconTextColor="text-purple-600"
    />
  );
}
