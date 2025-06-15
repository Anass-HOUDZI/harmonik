
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Heart } from "lucide-react";

export default function CoupleTime() {
  return (
    <ToolTemplate
      title="Planificateur Temps Couple"
      description="Préservez votre relation avec planning moments exclusifs. ❤️ Planification moments couple, suggestions activités, gestion garde."
      icon={<Heart />}
      features={["Planification temps couple", "Suggestions activités", "Gestion garde enfants", "Suivi qualité temps"]}
      comingSoonFeatures={["Planification moments couple exclusifs", "Suggestions activités adaptées", "Intégration contraintes garde enfants", "Suivi qualité temps passé", "Rappels bienveillants automatiques", "Mode organisation baby-sitting"]}
      bgColor="from-rose-50 via-pink-50 to-red-50"
      iconBgColor="bg-rose-100"
      iconTextColor="text-rose-600"
    />
  );
}
