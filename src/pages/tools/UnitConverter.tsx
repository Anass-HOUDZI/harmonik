
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Ruler } from "lucide-react";

export default function UnitConverter() {
  return (
    <ToolTemplate
      title="Convertisseur Unités de Mesure"
      description="Facilitez cuisine et bricolage avec conversions instantanées. 📏 Conversions culinaires, adaptation portions, mode vocal."
      icon={<Ruler />}
      features={["Conversions de base", "Unités culinaires", "Unités métriques", "Historique conversions"]}
      comingSoonFeatures={["Conversions culinaires instantanées", "Adaptation portions selon nombre convives", "Conversions bricolage/jardinage", "Mode vocal pour mains occupées", "Historique conversions fréquentes", "Templates recettes avec conversions auto"]}
    />
  );
}
