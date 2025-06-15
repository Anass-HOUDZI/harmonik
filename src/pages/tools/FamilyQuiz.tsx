
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { HelpCircle } from "lucide-react";

export default function FamilyQuiz() {
  return (
    <ToolTemplate
      title="Générateur Quiz Familiaux"
      description="Créez des jeux éducatifs avec 5000+ questions par thème. 🎯 Modes multiples, scores motivants, création personnalisée."
      icon={<HelpCircle />}
      features={["Quiz de base", "Questions simples", "Scores basiques", "Mode famille"]}
      comingSoonFeatures={["Générateur questions par thème/niveau", "Modes de jeu multiples (famille, individuel)", "Scores et classements motivants", "Base de 5000+ questions variées", "Création quiz personnalisés", "Mode révision scolaire"]}
      bgColor="from-teal-50 via-blue-50 to-purple-50"
      iconBgColor="bg-teal-100"
      iconTextColor="text-teal-600"
    />
  );
}
