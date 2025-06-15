
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { AlertTriangle } from "lucide-react";

export default function ChildcareCosts() {
  const features = [
    "Calculateur de base frais de garde",
    "Comparaison modes de garde simples",
    "Estimation coûts mensuels",
    "Interface de saisie manuelle"
  ];

  const comingSoonFeatures = [
    "Comparaison tous modes de garde (crèche, nounou, famille)",
    "Intégration aides CAF automatique",
    "Calcul coût réel avec déductions fiscales",
    "Simulation selon les horaires de travail",
    "Impact sur le budget familial global",
    "Recommandations personnalisées"
  ];

  return (
    <ToolTemplate
      title="Calculateur Frais de Garde"
      description="Choisissez le mode de garde le plus économique avec aides CAF. ⚖️ Comparaison complète, aides automatiques, optimisation."
      icon={<AlertTriangle />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-orange-50 via-red-50 to-pink-50"
      iconBgColor="bg-orange-100"
      iconTextColor="text-orange-600"
    />
  );
}
