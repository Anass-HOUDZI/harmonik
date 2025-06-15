
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Home } from "lucide-react";

export default function TeleworkManager() {
  return (
    <ToolTemplate
      title="Gestionnaire Interruptions Télétravail"
      description="Organisez les pauses familiales avec activités autonomes enfants. 🏠 Planning pauses, activités autonomes, système signalisation."
      icon={<Home />}
      features={["Gestion interruptions basique", "Planning pauses", "Activités enfants", "Signalisation disponibilité"]}
      comingSoonFeatures={["Planning pauses enfants structurées", "Activités courtes autonomes enfants", "Système signalisation \"ne pas déranger\"", "Gestion urgences enfants", "Optimisation espace travail/jeu", "Communication famille/travail"]}
      bgColor="from-slate-50 via-gray-50 to-zinc-50"
      iconBgColor="bg-slate-100"
      iconTextColor="text-slate-600"
    />
  );
}
