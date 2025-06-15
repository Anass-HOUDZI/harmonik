
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Scale } from "lucide-react";

export default function BMICalculator() {
  return (
    <ToolTemplate
      title="Calculateur IMC Famille"
      description="Surveillez l'évolution morphologique avec courbes de croissance. ⚖️ Calculs adaptés âge, courbes enfants, conseils nutrition."
      icon={<Scale />}
      features={["Calcul IMC basique", "Suivi poids/taille", "Graphiques simples", "Conseils généraux"]}
      comingSoonFeatures={["Calculs IMC adaptés enfants/adultes", "Courbes de croissance enfants", "Suivi évolution temporelle", "Alertes déviations significatives", "Conseils nutrition personnalisés", "Interface ludique pour enfants"]}
      bgColor="from-blue-50 via-teal-50 to-green-50"
      iconBgColor="bg-blue-100"
      iconTextColor="text-blue-600"
    />
  );
}
