
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

// Association routes outils -> catégories conviviales
// Si besoin, on peut ajuster selon le data réel
const toolToCategory: Record<string, { label: string, route: string }> = {
  // Éducation
  "educational-activities": { label: "Éducation", route: "/" },
  "school-progress": { label: "Éducation", route: "/" },
  "educational-resources": { label: "Éducation", route: "/" },
  "family-quiz": { label: "Éducation", route: "/" },
  "reading-tracker": { label: "Éducation", route: "/" },
  "cultural-calendar": { label: "Éducation", route: "/" },
  "homework-assistant": { label: "Éducation", route: "/" },
  // Santé
  "sleep-tracker": { label: "Santé", route: "/" },
  "fitness-planner": { label: "Santé", route: "/" },
  "allergy-manager": { label: "Santé", route: "/" },
  "bmi-calculator": { label: "Santé", route: "/" },
  "hydration-tracker": { label: "Santé", route: "/" },
  "nutrition-generator": { label: "Santé", route: "/" },
  "medical-scheduler": { label: "Santé", route: "/" },
  // Finances
  "budget": { label: "Finances", route: "/" },
  "kids-expenses": { label: "Finances", route: "/" },
  "savings": { label: "Finances", route: "/" },
  "price-compare": { label: "Finances", route: "/" },
  "childcare-costs": { label: "Finances", route: "/" },
  "vacation-savings": { label: "Finances", route: "/" },
  "pocket-money": { label: "Finances", route: "/" },
  "school-costs": { label: "Finances", route: "/" },
  // Organisation
  "calendar": { label: "Organisation", route: "/" },
  "meals": { label: "Organisation", route: "/" },
  "time": { label: "Organisation", route: "/" },
  "homework": { label: "Organisation", route: "/" },
  "chores": { label: "Organisation", route: "/" },
  "activities": { label: "Organisation", route: "/" },
  "shopping": { label: "Organisation", route: "/" },
  "childcare": { label: "Organisation", route: "/" },
  "medical-appointments": { label: "Organisation", route: "/" },
  // Loisirs, Dév., etc. ... à compléter selon usage réel
};

function getBackInfo(pathname: string) {
  // /tools/tool-slug
  const match = pathname.match(/\/tools\/([\w-]+)/);
  if (match) {
    const slug = match[1];
    if (toolToCategory[slug]) {
      return toolToCategory[slug];
    }
  }
  // Fallback accueil
  return { label: "Accueil", route: "/" };
}

export default function ToolNavBack() {
  const navigate = useNavigate();
  const location = useLocation();
  const backInfo = getBackInfo(location.pathname);

  return (
    <div className="w-full mb-4 flex">
      <button
        onClick={() => navigate(backInfo.route)}
        className="flex items-center gap-2 font-semibold text-blue-700 hover:text-white px-4 py-2 rounded-full bg-blue-100 hover:bg-blue-600 transition shadow-sm"
        aria-label={`Retour à ${backInfo.label}`}
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Retour à {backInfo.label}</span>
      </button>
    </div>
  );
}
