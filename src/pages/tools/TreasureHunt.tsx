
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { MapPin } from "lucide-react";

export default function TreasureHunt() {
  const features = [
    "Chasses aux trésors prédéfinies par lieu",
    "Énigmes adaptées par tranche d'âge",
    "Modes intérieur, extérieur et mixte",
    "Templates pour occasions spéciales"
  ];

  const comingSoonFeatures = [
    "Génération automatique chasses selon lieu spécifique",
    "Adaptation énigmes selon âge et nombre participants",
    "Mode géolocalisation pour chasses extérieures avancées",
    "Intégration objets/lieux familiers du domicile",
    "Templates occasions (anniversaires, fêtes, vacances)",
    "Mode création collaborative avec toute la famille"
  ];

  return (
    <ToolTemplate
      title="Générateur Chasse aux Trésors"
      description="Créez des aventures personnalisées avec énigmes géolocalisées. 🗺️ Auto-génération, géolocalisation, collaboration famille."
      icon={<MapPin />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-green-50 via-emerald-50 to-teal-50"
      iconBgColor="bg-green-100"
      iconTextColor="text-green-600"
    />
  );
}
