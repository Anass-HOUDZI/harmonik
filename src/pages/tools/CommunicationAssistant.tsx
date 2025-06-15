
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { MessageCircle } from "lucide-react";

export default function CommunicationAssistant() {
  return (
    <ToolTemplate
      title="Assistant Communication Famille"
      description="Améliorez les échanges avec techniques de communication positive. 💬 Techniques positives, gestion conflits, exercices écoute."
      icon={<MessageCircle />}
      features={["Conseils communication", "Techniques de base", "Gestion conflits", "Exercices famille"]}
      comingSoonFeatures={["Techniques communication positive", "Gestion conflits constructive", "Guide communication par âge enfant", "Exercices écoute active famille", "Suivi qualité échanges", "Conseils personnalisés situations tendues"]}
    />
  );
}
