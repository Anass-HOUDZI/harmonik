
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Dumbbell } from "lucide-react";

export default function FitnessPlanner() {
  return (
    <ToolTemplate
      title="Planificateur Activité Physique"
      description="Encouragez le sport en famille avec défis et suivi progression. 💪 Planning activités, défis motivants, conseils sécurité."
      icon={<Dumbbell />}
      features={["Planning exercices simple", "Suivi activités", "Exercices de base", "Progression basique"]}
      comingSoonFeatures={["Planning activités par membre et en commun", "Base d'exercices adaptés tous âges", "Suivi performance et progression", "Défis famille motivants", "Intégration météo pour activités extérieures", "Conseils sécurité par activité"]}
      bgColor="from-red-50 via-orange-50 to-yellow-50"
      iconBgColor="bg-red-100"
      iconTextColor="text-red-600"
    />
  );
}
