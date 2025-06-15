
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { BookOpen } from "lucide-react";

export default function ReadingTracker() {
  return (
    <ToolTemplate
      title="Tracker Lecture Enfants"
      description="Encouragez la lecture avec défis gamifiés et recommandations. 📖 Journal complet, objectifs personnalisés, défis ludiques."
      icon={<BookOpen />}
      features={["Journal de lecture simple", "Liste de livres", "Suivi basique", "Évaluations"]}
      comingSoonFeatures={["Journal de lecture avec évaluations", "Objectifs lecture personnalisables", "Recommandations par âge/goûts", "Défis lecture gamifiés", "Partage en famille des découvertes", "Statistiques progression"]}
      bgColor="from-rose-50 via-pink-50 to-purple-50"
      iconBgColor="bg-rose-100"
      iconTextColor="text-rose-600"
    />
  );
}
