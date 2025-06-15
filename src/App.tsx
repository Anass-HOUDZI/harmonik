
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FamilyHub from "./pages/FamilyHub";
import FamilyCalendar from "./pages/tools/FamilyCalendar";
import BudgetCalculator from "./pages/tools/BudgetCalculator";
import MealPlanner from "./pages/tools/MealPlanner";
import HealthTracker from "./pages/tools/HealthTracker";
import TimeManager from "./pages/tools/TimeManager";
import HomeworkPlanner from "./pages/tools/HomeworkPlanner";
import ChoresManager from "./pages/tools/ChoresManager";
import ActivityOrganizer from "./pages/tools/ActivityOrganizer";
import ComingSoonPage from "./pages/tools/ComingSoonPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FamilyHub />} />
          <Route path="/tools/calendar" element={<FamilyCalendar />} />
          <Route path="/tools/budget" element={<BudgetCalculator />} />
          <Route path="/tools/meals" element={<MealPlanner />} />
          <Route path="/tools/health" element={<HealthTracker />} />
          <Route path="/tools/time" element={<TimeManager />} />
          <Route path="/tools/homework" element={<HomeworkPlanner />} />
          <Route path="/tools/chores" element={<ChoresManager />} />
          <Route path="/tools/activities" element={<ActivityOrganizer />} />
          
          {/* Organisation */}
          <Route path="/tools/shopping" element={<ComingSoonPage toolName="Gestionnaire Listes Courses" />} />
          <Route path="/tools/childcare" element={<ComingSoonPage toolName="Planificateur Garde Enfants" />} />
          <Route path="/tools/medical-appointments" element={<ComingSoonPage toolName="Tracker Rendez-vous Médicaux" />} />
          
          {/* Finances */}
          <Route path="/tools/kids-expenses" element={<ComingSoonPage toolName="Tracker Dépenses Enfants" />} />
          <Route path="/tools/savings" element={<ComingSoonPage toolName="Simulateur Économies" />} />
          <Route path="/tools/price-compare" element={<ComingSoonPage toolName="Comparateur Prix" />} />
          <Route path="/tools/childcare-costs" element={<ComingSoonPage toolName="Calculateur Frais Garde" />} />
          <Route path="/tools/vacation-savings" element={<ComingSoonPage toolName="Planificateur Épargne Vacances" />} />
          <Route path="/tools/pocket-money" element={<ComingSoonPage toolName="Gestionnaire Argent Poche" />} />
          <Route path="/tools/school-costs" element={<ComingSoonPage toolName="Calculateur Coût Rentrée" />} />
          
          {/* Éducation */}
          <Route path="/tools/educational-activities" element={<ComingSoonPage toolName="Générateur Activités Éducatives" />} />
          <Route path="/tools/school-progress" element={<ComingSoonPage toolName="Tracker Progrès Scolaires" />} />
          <Route path="/tools/educational-resources" element={<ComingSoonPage toolName="Bibliothèque Ressources" />} />
          <Route path="/tools/family-quiz" element={<ComingSoonPage toolName="Générateur Quiz Familiaux" />} />
          <Route path="/tools/reading-tracker" element={<ComingSoonPage toolName="Tracker Lecture Enfants" />} />
          <Route path="/tools/cultural-calendar" element={<ComingSoonPage toolName="Calendrier Sorties Éducatives" />} />
          <Route path="/tools/homework-assistant" element={<ComingSoonPage toolName="Assistant Aide Devoirs" />} />
          
          {/* Santé */}
          <Route path="/tools/sleep-tracker" element={<ComingSoonPage toolName="Tracker Sommeil Famille" />} />
          <Route path="/tools/fitness-planner" element={<ComingSoonPage toolName="Planificateur Activité Physique" />} />
          <Route path="/tools/allergy-manager" element={<ComingSoonPage toolName="Gestionnaire Allergies" />} />
          <Route path="/tools/bmi-calculator" element={<ComingSoonPage toolName="Calculateur IMC Famille" />} />
          <Route path="/tools/hydration-tracker" element={<ComingSoonPage toolName="Tracker Hydratation" />} />
          <Route path="/tools/nutrition-generator" element={<ComingSoonPage toolName="Générateur Menu Équilibré" />} />
          <Route path="/tools/medical-scheduler" element={<ComingSoonPage toolName="Planificateur Examens Médicaux" />} />
          
          {/* Équilibre */}
          <Route path="/tools/flexible-schedule" element={<ComingSoonPage toolName="Planificateur Horaires Flexibles" />} />
          <Route path="/tools/productivity-tracker" element={<ComingSoonPage toolName="Tracker Productivité Parent" />} />
          <Route path="/tools/family-meetings" element={<ComingSoonPage toolName="Organisateur Réunions Famille" />} />
          <Route path="/tools/transport-calculator" element={<ComingSoonPage toolName="Calculateur Temps Transport" />} />
          <Route path="/tools/strategic-leave" element={<ComingSoonPage toolName="Planificateur Congés Stratégiques" />} />
          <Route path="/tools/energy-tracker" element={<ComingSoonPage toolName="Tracker Énergie Parentale" />} />
          <Route path="/tools/telework-manager" element={<ComingSoonPage toolName="Gestionnaire Interruptions Télétravail" />} />
          
          {/* Développement */}
          <Route path="/tools/family-goals" element={<ComingSoonPage toolName="Tracker Objectifs Familiaux" />} />
          <Route path="/tools/gratitude-journal" element={<ComingSoonPage toolName="Journal Gratitude Familial" />} />
          <Route path="/tools/family-challenges" element={<ComingSoonPage toolName="Générateur Défis Famille" />} />
          <Route path="/tools/couple-time" element={<ComingSoonPage toolName="Planificateur Temps Couple" />} />
          <Route path="/tools/habits-tracker" element={<ComingSoonPage toolName="Tracker Habitudes Positives" />} />
          <Route path="/tools/relaxation-generator" element={<ComingSoonPage toolName="Générateur Activités Détente" />} />
          <Route path="/tools/communication-assistant" element={<ComingSoonPage toolName="Assistant Communication Famille" />} />
          <Route path="/tools/family-projects" element={<ComingSoonPage toolName="Planificateur Projets Familiaux" />} />
          
          {/* Loisirs */}
          <Route path="/tools/weather-activities" element={<ComingSoonPage toolName="Générateur Sortie Météo" />} />
          <Route path="/tools/indoor-activities" element={<ComingSoonPage toolName="Planificateur Activités Intérieur" />} />
          <Route path="/tools/birthday-organizer" element={<ComingSoonPage toolName="Organisateur Anniversaires" />} />
          <Route path="/tools/family-games" element={<ComingSoonPage toolName="Générateur Jeux Familiaux" />} />
          <Route path="/tools/budget-vacations" element={<ComingSoonPage toolName="Planificateur Vacances Économiques" />} />
          <Route path="/tools/creative-tracker" element={<ComingSoonPage toolName="Tracker Activités Créatives" />} />
          <Route path="/tools/treasure-hunt" element={<ComingSoonPage toolName="Générateur Chasse Trésors" />} />
          <Route path="/tools/picnic-organizer" element={<ComingSoonPage toolName="Organisateur Pique-niques" />} />
          
          {/* Outils Pratiques */}
          <Route path="/tools/unit-converter" element={<ComingSoonPage toolName="Convertisseur Unités" />} />
          <Route path="/tools/label-generator" element={<ComingSoonPage toolName="Générateur Étiquettes" />} />
          <Route path="/tools/portion-calculator" element={<ComingSoonPage toolName="Calculateur Portions" />} />
          <Route path="/tools/screen-timer" element={<ComingSoonPage toolName="Timer Activités Enfants" />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* Toasters require being inside React context and BrowserRouter */}
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
