
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { HelpCircle } from "lucide-react";

export default function HomeworkAssistant() {
  return (
    <ToolTemplate
      title="Assistant Aide aux Devoirs"
      description="Guidez méthodologiquement avec techniques et ressources. 🎯 Méthodes adaptées, techniques mémorisation, coaching parental."
      icon={<HelpCircle />}
      features={["Aide basique aux devoirs", "Conseils généraux", "Ressources simples", "Techniques de base"]}
      comingSoonFeatures={["Méthodes de travail par type d'exercice", "Techniques mémorisation adaptées", "Planning révisions optimisé", "Outils concentration et motivation", "Ressources par matière scolaire", "Mode coaching parental"]}
      bgColor="from-emerald-50 via-teal-50 to-blue-50"
      iconBgColor="bg-emerald-100"
      iconTextColor="text-emerald-600"
    />
  );
}
