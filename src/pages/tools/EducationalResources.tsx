
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Library } from "lucide-react";

export default function EducationalResources() {
  return (
    <ToolTemplate
      title="Bibliothèque Ressources Pédagogiques"
      description="Centralisez les supports éducatifs avec recherche intelligente. 📚 Classification complète, moteur recherche, mode hors-ligne."
      icon={<Library />}
      features={["Interface de base", "Classification simple", "Recherche basique", "Favoris"]}
      comingSoonFeatures={["Classification par âge/matière/difficulté", "Moteur recherche intelligent", "Favoris et listes personnalisées", "Évaluations et commentaires", "Suggestions basées sur l'usage", "Mode hors-ligne complet"]}
      bgColor="from-amber-50 via-orange-50 to-red-50"
      iconBgColor="bg-amber-100"
      iconTextColor="text-amber-600"
    />
  );
}
