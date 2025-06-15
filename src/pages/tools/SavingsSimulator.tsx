
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { TrendingUp } from "lucide-react";
import ToolNavHome from "@/components/ToolNavHome";

export default function SavingsSimulator() {
  const features = [
    "Calculateur d'épargne de base",
    "Définition d'objectifs simples",
    "Suivi de progression manuelle",
    "Visualisation basique"
  ];

  const comingSoonFeatures = [
    "Analyse automatique des dépenses superflues",
    "Simulations scenarios d'économie",
    "Calculateur objectifs épargne (vacances, projets)",
    "Défis épargne gamifiés",
    "Tracker progression mensuelle",
    "Conseils personnalisés par profil familial"
  ];

  return (
    <div>
      {/* CTA Accueil mis en valeur avec icône et dégradé */}
      <ToolNavHome
        icon={<TrendingUp className="h-7 w-7 text-yellow-500" />}
        gradient="from-yellow-100 via-green-100 to-blue-100"
        iconBgColor="bg-yellow-400"
      />
      <ToolTemplate
        title="Simulateur Économies Famille"
        description="Maximisez votre capacité d'épargne avec des défis gamifiés. 📈 Analyse automatique, simulations, conseils personnalisés."
        icon={<TrendingUp />}
        features={features}
        comingSoonFeatures={comingSoonFeatures}
        bgColor="from-yellow-50 via-green-50 to-blue-50"
        iconBgColor="bg-yellow-100"
        iconTextColor="text-yellow-600"
      />
    </div>
  );
}
