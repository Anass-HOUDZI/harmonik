
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Wallet } from "lucide-react";

export default function PocketMoney() {
  const features = [
    "Gestion basique argent de poche",
    "Comptes virtuels simples",
    "Système de tâches de base",
    "Suivi des dépenses"
  ];

  const comingSoonFeatures = [
    "Comptes virtuels par enfant",
    "Système tâches = rémunération",
    "Objectifs épargne avec visualisation",
    "Transactions virtuelles sécurisées",
    "Apprentissage budget avec jeux",
    "Rapports pour les parents"
  ];

  return (
    <ToolTemplate
      title="Gestionnaire Argent de Poche"
      description="Éduquez les enfants à la gestion financière avec comptes virtuels. 💳 Système tâches-récompenses, objectifs épargne, apprentissage ludique."
      icon={<Wallet />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-purple-50 via-pink-50 to-red-50"
      iconBgColor="bg-purple-100"
      iconTextColor="text-purple-600"
    />
  );
}
