
// Mock local d'activités, à enrichir côté client.
// Ce fichier peut ensuite être relié à la géolocalisation/météo réelles.

export type ActivityType = "intérieur" | "extérieur";
export type ActivityBudget = "gratuit" | "petit-budget" | "payant";

export interface Activity {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  type: ActivityType;
  recommendedAges: string; // "tout âge", "3-6", "6-12", etc.
  weather: "soleil" | "pluie" | "any";
  budget: ActivityBudget;
  location: string; // "domicile", "parc", "ville", etc.
  duration: string; // ex: "1h", "demi-journée"
}

// Images variées Unsplash libres de droit
export const activitiesData: Activity[] = [
  {
    id: "1",
    title: "Chasse aux trésors au parc",
    description: "Préparez une chasse aux trésors dans un parc urbain ou forêt voisine. Parfait pour petits et grands, avec indices personnalisés !",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80",
    type: "extérieur",
    recommendedAges: "6-12",
    weather: "soleil",
    budget: "gratuit",
    location: "parc",
    duration: "2h"
  },
  {
    id: "2",
    title: "Après-midi jeux de société",
    description: "Rassemblez la famille autour de vos jeux de société préférés. Parfait par temps de pluie !",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    type: "intérieur",
    recommendedAges: "tout âge",
    weather: "pluie",
    budget: "gratuit",
    location: "domicile",
    duration: "3h"
  },
  {
    id: "3",
    title: "Balade nature et photo",
    description: "Munis d’un appareil photo ou smartphone, partez explorer la nature et capturez ensemble des souvenirs.",
    thumbnail: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80",
    type: "extérieur",
    recommendedAges: "tout âge",
    weather: "soleil",
    budget: "gratuit",
    location: "forêt",
    duration: "1h30"
  },
  {
    id: "4",
    title: "Atelier cuisine en famille",
    description: "Cuisinez ensemble une recette simple et gourmande, à adapter selon les âges des enfants. Fous rires garantis !",
    thumbnail: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&q=80",
    type: "intérieur",
    recommendedAges: "3-12",
    weather: "any",
    budget: "petit-budget",
    location: "domicile",
    duration: "2h"
  },
  {
    id: "5",
    title: "Visite gratuite d’un musée local",
    description: "Découvrez un musée ou une exposition gratuite près de chez vous. Adapté pour éveiller la curiosité !",
    thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
    type: "intérieur",
    recommendedAges: "6-16",
    weather: "pluie",
    budget: "gratuit",
    location: "ville",
    duration: "2h"
  }
];
