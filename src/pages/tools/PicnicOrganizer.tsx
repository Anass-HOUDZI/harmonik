
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Apple } from "lucide-react";

export default function PicnicOrganizer() {
  return (
    <ToolTemplate
      title="Organisateur Pique-niques"
      description="Planifiez parfaitement vos sorties nature avec météo intégrée. 🍎 Sélection spots, check-list matériel, mode zéro déchet."
      icon={<Apple />}
      features={["Planification pique-niques", "Check-list matériel", "Suggestions spots", "Météo intégrée"]}
      comingSoonFeatures={["Sélection spots pique-nique par critères", "Check-list matériel/nourriture personnalisée", "Intégration météo et affluence", "Suggestions menus transport facile", "Activités nature sur place", "Mode zéro déchet écologique"]}
    />
  );
}
