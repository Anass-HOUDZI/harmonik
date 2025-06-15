
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { CloudRain } from "lucide-react";

export default function IndoorActivities() {
  return (
    <ToolTemplate
      title="Planificateur Activités Intérieur"
      description="Occupez intelligemment les jours de pluie avec 1000+ activités. 🌧️ Programme journée complète, activités éducatives, mode autonomie."
      icon={<CloudRain />}
      features={["Activités intérieur basiques", "Programmes par âge", "Activités éducatives", "Matériel maison"]}
      comingSoonFeatures={["1000+ activités classées âge/matériel/durée", "Génération programme journée complète", "Activités éducatives ludiques", "Mode autonomie enfants", "Intégration matériel disponible maison", "Création activités personnalisées"]}
    />
  );
}
