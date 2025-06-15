
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { DollarSign } from "lucide-react";

export default function PriceComparator() {
  const features = [
    "Interface de recherche produits",
    "Comparaison manuelle de prix",
    "Liste de souhaits basique",
    "Surveillance prix simple"
  ];

  const comingSoonFeatures = [
    "Comparaison multi-sites en temps réel",
    "Alerte baisse de prix produits surveillés",
    "Historique prix et prédictions",
    "Codes promo automatiquement appliqués",
    "Comparaison incluant livraison/retour",
    "Liste de souhaits partagée famille"
  ];

  return (
    <ToolTemplate
      title="Comparateur Prix en Ligne"
      description="Trouvez les meilleures offres avec alertes et codes promo automatiques. 🛍️ Comparaison temps réel, historique prix, alertes."
      icon={<DollarSign />}
      features={features}
      comingSoonFeatures={comingSoonFeatures}
      bgColor="from-blue-50 via-green-50 to-yellow-50"
      iconBgColor="bg-blue-100"
      iconTextColor="text-blue-600"
    />
  );
}
