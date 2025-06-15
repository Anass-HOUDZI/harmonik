
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Brain } from "lucide-react";

export default function EducationalActivities() {
  const features = [
    "Générateur d'activités de base",
    "Filtres par âge et matière",
    "Collection d'activités prédéfinies",
    "Création d'activités personnalisées"
  ];

  const comingSoonFeatures = [
    "Générateur exercices par âge/matière",
    "Personnalisation selon niveau scolaire",
    "Activités ludiques et interactives",
    "Suivi progression individuelle",
    "Base de 1000+ activités pré-conçues",
    "Mode création parentale simple"
  ];

  return (
    <ToolTemplate
      title="Générateur Activités Éducatives"
      description="Créez des contenus pédagogiques adaptés par âge et matière. 🧠 1000+ activités, personnalisation niveau, suivi progression."
      icon={<Brain />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-green-50 via-blue-50 to-purple-50"
      iconBgColor="bg-green-100"
      iconTextColor="text-green-600"
    />
  );
}
