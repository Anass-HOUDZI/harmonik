
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Baby } from "lucide-react";

export default function ChildcarePlanner() {
  const features = [
    "Interface de base pour planification",
    "Saisie manuelle des modes de garde",
    "Calcul simple des coûts",
    "Gestion des contacts d'urgence"
  ];

  const comingSoonFeatures = [
    "Planning visuel multi-enfants/multi-modes de garde",
    "Calcul automatique des coûts par solution",
    "Gestion des urgences avec contacts prioritaires", 
    "Intégration avec le calendrier familial",
    "Suivi des heures de garde et facturation",
    "Base de données baby-sitters/nounous avec évaluations"
  ];

  return (
    <ToolTemplate
      title="Planificateur Garde Enfants"
      description="Optimisez l'organisation des modes de garde avec calcul des coûts et gestion urgences. 👶 Planning visuel, contacts urgence, facturation automatique."
      icon={<Baby />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-pink-50 via-purple-50 to-blue-50"
      iconBgColor="bg-pink-100"
      iconTextColor="text-pink-600"
    />
  );
}
