
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Calendar } from "lucide-react";

export default function CulturalCalendar() {
  return (
    <ToolTemplate
      title="Calendrier Sorties Éducatives"
      description="Découvrez l'offre culturelle locale avec filtres et réservations. 🎭 Agenda événements, filtres avancés, avis famille."
      icon={<Calendar />}
      features={["Calendrier basique", "Liste événements", "Filtres simples", "Favoris"]}
      comingSoonFeatures={["Agenda événements culturels par région", "Filtres âge/thème/gratuit/payant", "Réservations et rappels", "Avis et notes sorties famille", "Suggestions basées sur les intérêts", "Mode découverte aléatoire"]}
      bgColor="from-violet-50 via-purple-50 to-pink-50"
      iconBgColor="bg-violet-100"
      iconTextColor="text-violet-600"
    />
  );
}
