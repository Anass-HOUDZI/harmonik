
import React from "react";
import ToolTemplate from "@/components/ToolTemplate";
import { Trophy } from "lucide-react";
import ToolNavHome from "@/components/ToolNavHome";

export default function CreativeTracker() {
  return (
    <div>
      <ToolNavHome
        icon={<Trophy className="h-7 w-7 text-purple-500" />}
        gradient="from-purple-100 via-pink-100 to-blue-100"
        iconBgColor="bg-purple-400"
      />
      <ToolTemplate
        title="Tracker Activités Créatives"
        description="Suivez la créativité familiale avec défis mensuels. 🎨 Journal projets créatifs, base tutoriels DIY, défis créativité."
        icon={<Trophy />}
        features={["Journal projets créatifs", "Tutoriels DIY", "Gestion matériel", "Galerie réalisations"]}
        comingSoonFeatures={["Journal projets créatifs par membre", "Base tutoriels DIY famille", "Gestion matériel créatif disponible", "Défis créativité mensuels", "Galerie réalisations famille", "Suggestions selon saisons/occasions"]}
      />
    </div>
  );
}
