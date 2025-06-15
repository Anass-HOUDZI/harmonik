
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { UserCheck } from "lucide-react";

export default function MedicalScheduler() {
  return (
    <ToolTemplate
      title="Planificateur Examens Médicaux"
      description="Programmez les suivis préventifs avec rappels personnalisés. 👨‍⚕️ Calendrier examens, rappels automatiques, gestion RDV famille."
      icon={<UserCheck />}
      features={["Planificateur examens basique", "Rappels simples", "Calendrier médical", "Contacts praticiens"]}
      comingSoonFeatures={["Calendrier examens par âge/sexe", "Rappels personnalisés automatiques", "Intégration avec carnet de santé", "Préparation examens (documents, questions)", "Suivi résultats et analyses", "Gestion RDV famille coordonnés"]}
      bgColor="from-purple-50 via-pink-50 to-red-50"
      iconBgColor="bg-purple-100"
      iconTextColor="text-purple-600"
    />
  );
}
