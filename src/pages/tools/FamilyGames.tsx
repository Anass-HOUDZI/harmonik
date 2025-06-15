
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Puzzle } from "lucide-react";

export default function FamilyGames() {
  return (
    <ToolTemplate
      title="Générateur Jeux Familiaux"
      description="Créez des animations sur-mesure avec 500+ jeux. 🧩 Génération selon participants, adaptation règles, mode tournoi."
      icon={<Puzzle />}
      features={["Jeux familiaux basiques", "Adaptation âges", "Règles simplifiées", "Mode tournoi"]}
      comingSoonFeatures={["Génération jeux selon participants/lieu/matériel", "Base 500+ jeux traditionnels et modernes", "Adaptation règles selon âges mélangés", "Création variantes jeux existants", "Mode tournoi famille", "Historique jeux appréciés"]}
    />
  );
}
