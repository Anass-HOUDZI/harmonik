
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Sun } from "lucide-react";

export default function WeatherActivities() {
  return (
    <ToolTemplate
      title="Générateur Sortie Météo"
      description="Proposez des activités selon les conditions climatiques. ☀️ Suggestions automatiques météo, prévisions 7 jours, mode découverte."
      icon={<Sun />}
      features={["Suggestions activités météo", "Activités intérieur/extérieur", "Prévisions basiques", "Historique sorties"]}
      comingSoonFeatures={["Suggestions automatiques selon météo temps réel", "Base activités intérieur/extérieur par météo", "Prévisions 7 jours pour planification", "Filtres âge/budget/durée/distance", "Mode découverte activités inédites", "Historique sorties avec évaluations"]}
    />
  );
}
