
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { TrendingUp } from "lucide-react";

export default function ProductivityTracker() {
  return (
    <ToolTemplate
      title="Tracker Productivité Parent"
      description="Maximisez l'efficacité avec gestion des interruptions familiales. 📊 Mesure productivité, peak performance, techniques concentration."
      icon={<TrendingUp />}
      features={["Suivi productivité basique", "Mesure temps travail", "Techniques concentration", "Gestion interruptions"]}
      comingSoonFeatures={["Mesure productivité réelle vs planifiée", "Identification moments peak performance", "Techniques concentration avec enfants", "Gestion interruptions familiales", "Optimisation environnement travail", "Conseils efficacité personnalisés"]}
      bgColor="from-orange-50 via-yellow-50 to-green-50"
      iconBgColor="bg-orange-100"
      iconTextColor="text-orange-600"
    />
  );
}
