
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Briefcase } from "lucide-react";

export default function FlexibleSchedule() {
  return (
    <ToolTemplate
      title="Planificateur Horaires Flexibles"
      description="Optimisez le télétravail avec synchronisation agenda pro/perso. 💼 Planning flexible, optimisation contraintes, suggestions créneaux."
      icon={<Briefcase />}
      features={["Planning horaires simple", "Suivi télétravail", "Organisation basique", "Synchronisation agenda"]}
      comingSoonFeatures={["Planning flexible bureau/domicile", "Optimisation selon contraintes famille", "Calcul temps transport économisé", "Synchronisation agenda pro/perso", "Suggestions créneaux productifs", "Mode urgence enfant malade"]}
      bgColor="from-indigo-50 via-blue-50 to-purple-50"
      iconBgColor="bg-indigo-100"
      iconTextColor="text-indigo-600"
    />
  );
}
