
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Smile } from "lucide-react";

export default function GratitudeJournal() {
  return (
    <ToolTemplate
      title="Journal de Gratitude Familial"
      description="Cultivez la positivité avec partage de moments positifs. 😊 Saisie quotidienne, partage famille, évolution émotionnelle."
      icon={<Smile />}
      features={["Journal gratitude simple", "Saisie quotidienne", "Partage famille", "Lecture souvenirs"]}
      comingSoonFeatures={["Saisie quotidienne gratitudes par membre", "Partage moments positifs famille", "Visualisation évolution émotionnelle", "Rappels bienveillants personnalisés", "Mode lecture aléatoire souvenirs", "Export livre gratitude annuel"]}
      bgColor="from-yellow-50 via-amber-50 to-orange-50"
      iconBgColor="bg-yellow-100"
      iconTextColor="text-yellow-600"
    />
  );
}
