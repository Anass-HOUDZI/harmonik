
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Users } from "lucide-react";

export default function FamilyMeetings() {
  return (
    <ToolTemplate
      title="Organisateur Réunions Famille"
      description="Programmez les échanges familiaux avec ordre du jour collaboratif. 👥 Planning réunions, ordre du jour, suivi décisions."
      icon={<Users />}
      features={["Planification réunions basique", "Ordre du jour simple", "Gestion participants", "Prise de notes"]}
      comingSoonFeatures={["Planning réunions famille régulières", "Ordre du jour collaboratif", "Suivi décisions et engagements", "Templates réunions par situation", "Mode participation enfants adapté", "Historique et évolution famille"]}
      bgColor="from-teal-50 via-green-50 to-blue-50"
      iconBgColor="bg-teal-100"
      iconTextColor="text-teal-600"
    />
  );
}
