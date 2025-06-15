
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Plane } from "lucide-react";

export default function BudgetVacations() {
  return (
    <ToolTemplate
      title="Planificateur Vacances Économiques"
      description="Organisez des séjours abordables avec comparateur destinations. ✈️ Comparateur destinations, hébergements économiques, planning optimisé."
      icon={<Plane />}
      features={["Planification vacances", "Comparateur basique", "Calcul coûts", "Suggestions économiques"]}
      comingSoonFeatures={["Comparateur destinations par budget", "Suggestions hébergements famille économiques", "Activités gratuites/peu chères par région", "Calcul coût total transport inclus", "Mode camping/gîtes/échanges maisons", "Planning optimisé sur place"]}
    />
  );
}
