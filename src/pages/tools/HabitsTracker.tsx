
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Target } from "lucide-react";
import AppBreadcrumb from "@/components/AppBreadcrumb";

export default function HabitsTracker() {
  return (
    <div>
      <AppBreadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Développement", href: "/#developpement" },
          { label: "Tracker Habitudes", isCurrent: true }
        ]}
        homeTo="/"
        showHomeCTA={true}
      />
      <ToolTemplate
        title="Tracker Habitudes Positives"
        description="Développez de bonnes routines avec suivi streak et récompenses. ✅ Définition habitudes, suivi streak, mode entraide famille."
        icon={<Target />}
        features={["Suivi habitudes basique", "Streaks simples", "Rappels", "Récompenses"]}
        comingSoonFeatures={["Définition habitudes par membre", "Suivi streak (séries de réussite)", "Rappels adaptatifs et motivants", "Récompenses paliers atteints", "Mode entraide famille", "Analyse correlation habitudes/bien-être"]}
      />
    </div>
  );
}
