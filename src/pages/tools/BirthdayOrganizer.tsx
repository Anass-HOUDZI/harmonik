
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { PartyPopper } from "lucide-react";

export default function BirthdayOrganizer() {
  return (
    <ToolTemplate
      title="Organisateur Anniversaires Enfants"
      description="Planifiez des fêtes mémorables avec templates et check-lists. 🎉 Templates fêtes, gestion invités, calculateur budget."
      icon={<PartyPopper />}
      features={["Planification anniversaires", "Templates de base", "Gestion invités", "Check-lists"]}
      comingSoonFeatures={["Templates fêtes par âge et thème", "Planification timeline événement", "Gestion invités et confirmations", "Calculateur budget et courses", "Idées jeux et animations par âge", "Check-list complète organisation"]}
    />
  );
}
