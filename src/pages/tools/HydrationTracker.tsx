
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Droplets } from "lucide-react";

export default function HydrationTracker() {
  return (
    <ToolTemplate
      title="Tracker Hydratation"
      description="Encouragez une hydratation optimale avec rappels intelligents. 💧 Objectifs personnalisés, rappels adaptatifs, gamification."
      icon={<Droplets />}
      features={["Suivi consommation eau", "Objectifs basiques", "Rappels simples", "Statistiques"]}
      comingSoonFeatures={["Objectifs personnalisés par âge/poids", "Saisie rapide consommation", "Rappels intelligents adaptatifs", "Gamification avec récompenses", "Statistiques famille", "Mode vacances/sport intensif"]}
      bgColor="from-cyan-50 via-blue-50 to-indigo-50"
      iconBgColor="bg-cyan-100"
      iconTextColor="text-cyan-600"
    />
  );
}
