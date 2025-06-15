
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Stethoscope } from "lucide-react";

export default function MedicalAppointments() {
  const features = [
    "Interface de base pour suivi médical",
    "Saisie manuelle des rendez-vous",
    "Liste des praticiens",
    "Rappels simples"
  ];

  const comingSoonFeatures = [
    "Carnet de santé numérique par membre",
    "Rappels automatiques vaccins/contrôles",
    "Base de données praticiens avec spécialités",
    "Historique consultations avec notes", 
    "Gestion ordonnances et renouvellements",
    "Export pour médecins/assurance"
  ];

  return (
    <ToolTemplate
      title="Tracker Rendez-vous Médicaux"
      description="Centralisez le suivi santé avec rappels vaccins et gestion praticiens. 🏥 Carnet numérique, rappels automatiques, export médical."
      icon={<Stethoscope />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-red-50 via-pink-50 to-purple-50"
      iconBgColor="bg-red-100"
      iconTextColor="text-red-600"
    />
  );
}
