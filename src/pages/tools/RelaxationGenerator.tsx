
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Coffee } from "lucide-react";

export default function RelaxationGenerator() {
  return (
    <ToolTemplate
      title="Générateur Activités Détente"
      description="Proposez des moments de relaxation avec méditation guidée. ☕ Base activités relaxation, séances guidées, mode urgence détente."
      icon={<Coffee />}
      features={["Activités détente basiques", "Séances courtes", "Conseils relaxation", "Mode famille"]}
      comingSoonFeatures={["Base activités relaxation tous âges", "Personnalisation selon stress/fatigue", "Séances guidées méditation famille", "Exercices respiration parents/enfants", "Mode urgence détente rapide", "Suivi impact sur bien-être"]}
    />
  );
}
