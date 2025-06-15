
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { FolderOpen } from "lucide-react";

export default function FamilyProjects() {
  return (
    <ToolTemplate
      title="Planificateur Projets Familiaux"
      description="Organisez vos grands objectifs avec méthodologie adaptée. 📁 Gestion projet famille, planning collaboratif, templates projets."
      icon={<FolderOpen />}
      features={["Gestion projets basique", "Planning simple", "Suivi budget/délais", "Collaboration famille"]}
      comingSoonFeatures={["Méthodologie gestion projet adaptée famille", "Planification collaborative avec enfants", "Suivi budget/délais/responsabilités", "Templates projets types (déménagement, vacances)", "Mode implication enfants selon âge", "Célération réussites collectives"]}
    />
  );
}
