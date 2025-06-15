
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { MapPin } from "lucide-react";

export default function TreasureHunt() {
  return (
    <ToolTemplate
      title="Générateur Chasse aux Trésors"
      description="Créez des jeux d'exploration personnalisés par lieu. 🗺️ Génération par lieu, adaptation énigmes, mode intérieur/extérieur."
      icon={<MapPin />}
      features={["Chasses aux trésors basiques", "Énigmes par âge", "Mode intérieur/extérieur", "Templates occasions"]}
      comingSoonFeatures={["Génération chasses aux trésors par lieu", "Adaptation énigmes selon âge participants", "Mode intérieur/extérieur/mixte", "Intégration objets/lieux familiers", "Templates occasions spéciales", "Mode collaborative création famille"]}
    />
  );
}
