
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { FolderOpen } from "lucide-react";

export default function FamilyProjects() {
  const features = [
    "Gestion projets familiaux structurée",
    "Planning collaboratif avec délais",
    "Suivi budget et responsabilités",
    "Collaboration adaptée à tous les âges"
  ];

  const comingSoonFeatures = [
    "Méthodologie gestion projet adaptée dynamiques familiales",
    "Planification collaborative avec participation enfants selon âge",
    "Suivi temps réel budget/délais/responsabilités individuelles",
    "Templates projets types (déménagement, vacances, rénovation)",
    "Mode implication progressive enfants selon complexité",
    "Célébration réussites collectives avec portfolio souvenirs"
  ];

  return (
    <ToolTemplate
      title="Planificateur Projets Familiaux"
      description="Organisez vos grands objectifs avec méthodologie et collaboration adaptées. 📁 Méthodologie famille, collaboration, templates."
      icon={<FolderOpen />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-blue-50 via-indigo-50 to-purple-50"
      iconBgColor="bg-blue-100"
      iconTextColor="text-blue-600"
    />
  );
}
