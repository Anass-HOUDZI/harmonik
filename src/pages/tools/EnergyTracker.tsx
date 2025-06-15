
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Activity } from "lucide-react";

export default function EnergyTracker() {
  return (
    <ToolTemplate
      title="Tracker Énergie Parentale"
      description="Identifiez vos pics de forme avec prévention burn-out. ⚡ Suivi énergie quotidien, corrélations, prévention burn-out."
      icon={<Activity />}
      features={["Suivi énergie basique", "Journal humeur", "Identification patterns", "Conseils récupération"]}
      comingSoonFeatures={["Suivi niveau énergie quotidien", "Corrélation sommeil/activité/énergie", "Identification patterns personnels", "Planification tâches selon énergie", "Suggestions récupération ciblées", "Mode prévention burn-out parental"]}
      bgColor="from-amber-50 via-orange-50 to-red-50"
      iconBgColor="bg-amber-100"
      iconTextColor="text-amber-600"
    />
  );
}
