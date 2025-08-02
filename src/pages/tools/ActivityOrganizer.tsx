import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { activitiesData, Activity } from "@/data/activitiesData";
import SuggestionActivityCard from "@/components/SuggestionActivityCard";
import { useState } from "react";
import { Sun, CloudRain, Filter, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Mocks local météo (à relier à OpenWeatherMap plus tard)
const WEATHER_CHOICES = [
  { value: "soleil", label: "Soleil", icon: <Sun className="h-5 w-5 text-yellow-400" /> },
  { value: "pluie", label: "Pluie", icon: <CloudRain className="h-5 w-5 text-blue-500" /> },
  { value: "any", label: "Toute météo", icon: <Sun className="h-5 w-5" /> }
];

export default function ActivityOrganizer() {
  // UI States
  const [selectedWeather, setSelectedWeather] = useState<"soleil" | "pluie" | "any">("any");
  const [selectedType, setSelectedType] = useState<"intérieur" | "extérieur" | "all">("all");
  const [selectedBudget, setSelectedBudget] = useState<"gratuit" | "petit-budget" | "payant" | "all">("all");
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const filteredActivities = activitiesData.filter((act) => {
    const matchWeather =
      selectedWeather === "any" || act.weather === "any" || act.weather === selectedWeather;
    const matchType = selectedType === "all" || act.type === selectedType;
    const matchBudget = selectedBudget === "all" || act.budget === selectedBudget;
    return matchWeather && matchType && matchBudget;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-100 flex items-center justify-center px-2 py-6">
      <Card className="w-full max-w-3xl mx-auto shadow-xl animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-4">
            <span className="p-3 bg-purple-200 rounded-lg">
              <Gamepad2 className="h-9 w-9 text-purple-700" />
            </span>
            <div>
              <CardTitle>Organisateur de Sorties</CardTitle>
              <CardDescription>
                Inspirez-vous et planifiez, en fonction de la météo, du budget, ou de l'ambiance du week-end !
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filtres météo/type/budget */}
          <div className="flex flex-col md:flex-row gap-2 mb-6">
            <div className="flex gap-2 items-center">
              <Filter className="h-5 w-5" />
              <span className="font-medium mr-2">Météo :</span>
              {WEATHER_CHOICES.map((choice) => (
                <Button key={choice.value}
                  onClick={() => setSelectedWeather(choice.value as any)}
                  variant={selectedWeather === choice.value ? "default" : "outline"}
                  className={selectedWeather === choice.value ? "bg-yellow-200 text-yellow-800" : ""}
                  size="sm"
                >
                  {choice.icon} {choice.label}
                </Button>
              ))}
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-medium mr-1">Type :</span>
              {["all", "extérieur", "intérieur"].map((t) => (
                <Button key={t}
                  onClick={() => setSelectedType(t as any)}
                  variant={selectedType === t ? "default" : "outline"}
                  className={selectedType === t ? "bg-blue-200 text-blue-800" : ""}
                  size="sm"
                >
                  {t === "all" ? "Tous" : t}
                </Button>
              ))}
            </div>
            <div className="flex gap-1 items-center">
              <span className="font-medium mr-1">Budget :</span>
              {["all", "gratuit", "petit-budget", "payant"].map((b) => (
                <Button key={b}
                  onClick={() => setSelectedBudget(b as any)}
                  variant={selectedBudget === b ? "default" : "outline"}
                  className={selectedBudget === b ? "bg-green-200 text-green-800" : ""}
                  size="sm"
                >
                  {b === "all" ? "Tous" : b}
                </Button>
              ))}
            </div>
          </div>
          {/* Liste d'activités suggestions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <SuggestionActivityCard
                  key={activity.id}
                  activity={activity}
                  onClick={() => setSelectedActivity(activity)}
                />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500 py-12">
                Aucune sortie correspondant à vos critères.
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="secondary" onClick={() => window.history.back()}>
            ← Retour à Harmonik
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog détail activité */}
      <Dialog open={!!selectedActivity} onOpenChange={() => setSelectedActivity(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedActivity?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedActivity?.description}
            </DialogDescription>
          </DialogHeader>
          {selectedActivity && (
            <div>
              <img
                src={selectedActivity.thumbnail}
                alt={selectedActivity.title}
                className="w-full rounded-lg mb-3 max-h-48 object-cover"
              />
              <div className="flex gap-2 flex-wrap mb-2">
                <Badge>{selectedActivity.type}</Badge>
                <Badge>{selectedActivity.recommendedAges}</Badge>
                <Badge>{selectedActivity.budget}</Badge>
                <Badge>{selectedActivity.weather}</Badge>
                <Badge>{selectedActivity.location}</Badge>
                <Badge>Durée : {selectedActivity.duration}</Badge>
              </div>
              {/* boutons actions */}
              <div className="flex gap-2 mt-2">
                <Button variant="outline" onClick={() => setSelectedActivity(null)}>
                  <X className="w-4 h-4" /> Fermer
                </Button>
                <Button>Prévoir cette sortie</Button>
                <Button variant="secondary">Marquer comme réalisée</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
