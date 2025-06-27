
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Ruler } from "lucide-react";

export default function UnitConverter() {
  const features = [
    "Conversions de base métrique/impérial",
    "Unités culinaires fréquentes",
    "Conversions volume/poids/température",
    "Historique des conversions récentes"
  ];

  const comingSoonFeatures = [
    "Conversions culinaires instantanées avec suggestions",
    "Adaptation automatique portions selon nombre convives",
    "Conversions spécialisées bricolage et jardinage",
    "Mode vocal pour utilisation mains occupées",
    "Favoris conversions fréquentes personnalisables",
    "Templates recettes avec conversions automatiques intégrées"
  ];

  return (
    <ToolTemplate
      title="Convertisseur Unités de Mesure"
      description="Facilitez cuisine et bricolage avec conversions instantanées et mode vocal. 📏 Culinaire, bricolage, mode mains-libres."
      icon={<Ruler />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-orange-50 via-amber-50 to-yellow-50"
      iconBgColor="bg-orange-100"
      iconTextColor="text-orange-600"
    />
  );
}
