
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Trophy } from "lucide-react";

export default function FamilyChallenges() {
  return (
    <ToolTemplate
      title="Générateur Défis Famille"
      description="Créez du lien avec 500+ challenges par catégorie. 🏆 Base défis variés, génération personnalisée, système points."
      icon={<Trophy />}
      features={["Défis famille basiques", "Système points simple", "Challenges prédéfinis", "Suivi réalisations"]}
      comingSoonFeatures={["Base de 500+ défis par catégorie", "Génération défis personnalisés", "Système points et récompenses", "Défis coopératifs vs compétitifs", "Création défis familiaux personnalisés", "Suivi réalisations et souvenirs"]}
      bgColor="from-purple-50 via-pink-50 to-red-50"
      iconBgColor="bg-purple-100"
      iconTextColor="text-purple-600"
    />
  );
}
