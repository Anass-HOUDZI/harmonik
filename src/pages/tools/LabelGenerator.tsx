
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Tag } from "lucide-react";

export default function LabelGenerator() {
  return (
    <ToolTemplate
      title="Générateur Étiquettes Organisation"
      description="Organisez jouets et vêtements avec étiquettes personnalisées. 🏷️ Étiquettes par enfant, templates organisation, export PDF."
      icon={<Tag />}
      features={["Création étiquettes basiques", "Templates simple", "Personnalisation texte", "Export basique"]}
      comingSoonFeatures={["Création étiquettes personnalisées par enfant", "Templates organisation par pièce/usage", "Mode image + texte pour non-lecteurs", "Export PDF format planches étiquettes", "Système couleur par membre famille", "Base pictogrammes organisationnels"]}
    />
  );
}
