
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Clock } from "lucide-react";

export default function SleepTracker() {
  return (
    <ToolTemplate
      title="Tracker Sommeil Famille"
      description="Optimisez la qualité du sommeil avec analyse et conseils. 😴 Analyse complète, conseils personnalisés, défis amélioration."
      icon={<Clock />}
      features={["Suivi heures sommeil", "Journal simple", "Calculs basiques", "Conseils généraux"]}
      comingSoonFeatures={["Saisie heures coucher/lever par membre", "Analyse qualité sommeil avec questionnaire", "Graphiques évolution et corrélations", "Conseils personnalisés par profil", "Défis amélioration du sommeil", "Mode berceuses et relaxation"]}
      bgColor="from-slate-50 via-gray-50 to-blue-50"
      iconBgColor="bg-slate-100"
      iconTextColor="text-slate-600"
    />
  );
}
