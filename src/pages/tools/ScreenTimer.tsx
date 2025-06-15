
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Timer } from "lucide-react";

export default function ScreenTimer() {
  return (
    <ToolTemplate
      title="Timer Activités Enfants"
      description="Gérez équitablement temps d'écran avec rotation automatique. ⏱️ Timers multiples, alertes progressives, rotation automatique."
      icon={<Timer />}
      features={["Timer activités basique", "Gestion temps d'écran", "Alertes simples", "Rotation enfants"]}
      comingSoonFeatures={["Timers multiples personnalisés par enfant", "Alertes progressives fin de temps", "Rotation automatique activités/enfants", "Mode temps partagé équitable", "Statistiques utilisation temps", "Récompenses respect des limites"]}
    />
  );
}
