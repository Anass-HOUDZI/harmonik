
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { MapPin } from "lucide-react";

export default function TransportCalculator() {
  return (
    <ToolTemplate
      title="Calculateur Temps Transport"
      description="Optimisez les déplacements avec covoiturage et alternatives écolo. 🚗 Calcul trajets multi-modal, covoiturage famille, alternatives écologiques."
      icon={<MapPin />}
      features={["Calcul temps trajet basique", "Estimation distances", "Comparaison modes transport", "Coûts transport"]}
      comingSoonFeatures={["Calcul temps trajets multi-modal", "Optimisation selon horaires famille", "Impact météo sur temps transport", "Coût comparatif modes transport", "Planification carpooling famille", "Suggestions alternatives écologiques"]}
      bgColor="from-emerald-50 via-teal-50 to-cyan-50"
      iconBgColor="bg-emerald-100"
      iconTextColor="text-emerald-600"
    />
  );
}
