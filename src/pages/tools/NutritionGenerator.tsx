
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { ChefHat } from "lucide-react";

export default function NutritionGenerator() {
  return (
    <ToolTemplate
      title="Générateur Menu Équilibré"
      description="Composez des repas nutritionnellement optimisés automatiquement. 👨‍🍳 Équilibrage macro/micro, adaptation besoins, conseils diététiques."
      icon={<ChefHat />}
      features={["Générateur menus simple", "Équilibrage basique", "Recettes saines", "Calculs nutritionnels"]}
      comingSoonFeatures={["Équilibrage automatique macro/micronutriments", "Adaptation besoins par âge/activité", "Intégration contraintes alimentaires", "Base nutritionnelle complète", "Variété automatique des menus", "Conseils diététiques personnalisés"]}
      bgColor="from-green-50 via-lime-50 to-yellow-50"
      iconBgColor="bg-green-100"
      iconTextColor="text-green-600"
    />
  );
}
