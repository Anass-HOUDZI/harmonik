
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { UtensilsCrossed } from "lucide-react";

export default function PortionCalculator() {
  return (
    <ToolTemplate
      title="Calculateur Portions Alimentaires"
      description="Adaptez les quantités aux repas famille avec anti-gaspillage. 🍽️ Calcul portions par âge, adaptation recettes, mode économie."
      icon={<UtensilsCrossed />}
      features={["Calcul portions basique", "Adaptation nombre convives", "Gestion restes", "Base portions"]}
      comingSoonFeatures={["Calcul portions selon âge/appétit", "Adaptation recettes nombre convives", "Gestion restes et batch cooking", "Base portions recommandées par âge", "Mode économie anti-gaspillage", "Intégration planning repas"]}
    />
  );
}
