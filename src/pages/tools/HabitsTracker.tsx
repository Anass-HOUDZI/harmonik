
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Target } from "lucide-react";

export default function HabitsTracker() {
  const features = [
    "Suivi habitudes quotidiennes basique",
    "Streaks de réussite simples",
    "Rappels personnalisables",
    "Système de récompenses"
  ];

  const comingSoonFeatures = [
    "Définition habitudes personnalisées par membre famille",
    "Suivi streak avancé avec statistiques détaillées",
    "Rappels adaptatifs selon comportement utilisateur",
    "Système récompenses multi-niveaux avec badges",
    "Mode entraide famille avec encouragements mutuels",
    "Analyse corrélation habitudes/bien-être avec graphiques"
  ];

  return (
    <ToolTemplate
      title="Tracker Habitudes Positives"
      description="Développez de bonnes routines familiales avec suivi motivant et gamification. 🎯 Streaks, récompenses, entraide famille."
      icon={<Target />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-emerald-50 via-teal-50 to-blue-50"
      iconBgColor="bg-emerald-100"
      iconTextColor="text-emerald-600"
    />  
  );
}
