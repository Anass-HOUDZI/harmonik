
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Calendar } from "lucide-react";

export default function StrategicLeave() {
  return (
    <ToolTemplate
      title="Planificateur Congés Stratégiques"
      description="Maximisez le temps famille avec optimisation vacances scolaires. 📅 Optimisation congés, calcul jours optimaux, coordination couple."
      icon={<Calendar />}
      features={["Planificateur congés basique", "Calcul jours optimaux", "Vue calendrier scolaire", "Coordination famille"]}
      comingSoonFeatures={["Optimisation congés/vacances scolaires", "Calcul jours optimaux à poser", "Coordination congés couple", "Suggestions périodes famille", "Intégration calendrier scolaire", "Mode garde alternée"]}
      bgColor="from-violet-50 via-purple-50 to-pink-50"
      iconBgColor="bg-violet-100"
      iconTextColor="text-violet-600"
    />
  );
}
