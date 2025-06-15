
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Target } from "lucide-react";

export default function FamilyGoals() {
  return (
    <ToolTemplate
      title="Tracker Objectifs Familiaux"
      description="Suivez et atteignez vos projets avec décomposition étapes. 🎯 Objectifs SMART, suivi progression, célébration étapes."
      icon={<Target />}
      features={["Définition objectifs basique", "Suivi progression", "Décomposition étapes", "Celebration réussites"]}
      comingSoonFeatures={["Définition objectifs SMART famille", "Décomposition étapes et responsabilités", "Suivi progression visuel motivant", "Célération étapes franchies", "Ajustement objectifs en cours", "Historique réalisations famille"]}
      bgColor="from-blue-50 via-indigo-50 to-purple-50"
      iconBgColor="bg-blue-100"
      iconTextColor="text-blue-600"
    />
  );
}
