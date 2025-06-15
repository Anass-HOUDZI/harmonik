
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { AlertTriangle } from "lucide-react";

export default function AllergyManager() {
  return (
    <ToolTemplate
      title="Gestionnaire Allergies et Intolérances"
      description="Sécurisez l'alimentation avec scanner codes-barres et alertes. ⚠️ Profils détaillés, scanner aliments, mode urgence."
      icon={<AlertTriangle />}
      features={["Profils allergies basiques", "Liste aliments interdits", "Alertes simples", "Contacts urgence"]}
      comingSoonFeatures={["Profils allergiques détaillés par membre", "Scanner codes-barres aliments", "Alerte ingrédients dangereux", "Base recettes compatible allergies", "Liste courses sécurisée", "Mode urgence avec contacts"]}
      bgColor="from-red-50 via-pink-50 to-purple-50"
      iconBgColor="bg-red-100"
      iconTextColor="text-red-600"
    />
  );
}
