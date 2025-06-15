
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Puzzle } from "lucide-react";
import ToolNavHome from "@/components/ToolNavHome";

export default function FamilyGames() {
  return (
    <div>
      <ToolNavHome
        icon={<Puzzle className="h-7 w-7 text-blue-600" />}
        gradient="from-blue-100 via-teal-100 to-yellow-100"
        iconBgColor="bg-blue-400"
      />
      <ToolTemplate
        title="Générateur Jeux Familiaux"
        description="Créez des animations sur-mesure avec 500+ jeux. 🧩 Génération selon participants, adaptation règles, mode tournoi."
        icon={<Puzzle />}
        features={["Jeux familiaux basiques", "Adaptation âges", "Règles simplifiées", "Mode tournoi"]}
        comingSoonFeatures={["Génération jeux selon participants/lieu/matériel", "Base 500+ jeux traditionnels et modernes", "Adaptation règles selon âges mélangés", "Création variantes jeux existants", "Mode tournoi famille", "Historique jeux appréciés"]}
      />
    </div>
  );
}
