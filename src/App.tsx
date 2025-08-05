
import React, { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PWAStatus from "@/components/PWAStatus";

// Hook pour scroll automatique en haut
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Lazy-load pages non critiques
const FamilyHub = lazy(() => import("./pages/FamilyHub"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Les outils "offline" doivent être lazy loadés
const KeywordDensity = lazy(() => import("./pages/tools/KeywordDensity"));
const MetaGenerator = lazy(() => import("./pages/tools/MetaGenerator"));
const ReadabilityChecker = lazy(() => import("./pages/tools/ReadabilityChecker"));
const StructuredDataGen = lazy(() => import("./pages/tools/StructuredDataGen"));
const HtmlStructureAnalyzer = lazy(() => import("./pages/tools/HtmlStructureAnalyzer"));

// Les autres pages gardent leur import classique/auto ou lazy as needed
import FamilyCalendar from "./pages/tools/FamilyCalendar";
import BudgetCalculator from "./pages/tools/BudgetCalculator";
import MealPlanner from "./pages/tools/MealPlanner";
import HealthTracker from "./pages/tools/HealthTracker";
import TimeManager from "./pages/tools/TimeManager";
import HomeworkPlanner from "./pages/tools/HomeworkPlanner";
import ChoresManager from "./pages/tools/ChoresManager";
import ActivityOrganizer from "./pages/tools/ActivityOrganizer";
import ShoppingList from "./pages/tools/ShoppingList";
import ChildcarePlanner from "./pages/tools/ChildcarePlanner";
import MedicalAppointments from "./pages/tools/MedicalAppointments";
import KidsExpenses from "./pages/tools/KidsExpenses";
import SavingsSimulator from "./pages/tools/SavingsSimulator";
import PriceComparator from "./pages/tools/PriceComparator";
import ChildcareCosts from "./pages/tools/ChildcareCosts";
import VacationSavings from "./pages/tools/VacationSavings";
import PocketMoney from "./pages/tools/PocketMoney";
import SchoolCosts from "./pages/tools/SchoolCosts";
import EducationalActivities from "./pages/tools/EducationalActivities";
import SchoolProgress from "./pages/tools/SchoolProgress";
import EducationalResources from "./pages/tools/EducationalResources";
import FamilyQuiz from "./pages/tools/FamilyQuiz";
import ReadingTracker from "./pages/tools/ReadingTracker";
import CulturalCalendar from "./pages/tools/CulturalCalendar";
import HomeworkAssistant from "./pages/tools/HomeworkAssistant";
import SleepTracker from "./pages/tools/SleepTracker";
import FitnessPlanner from "./pages/tools/FitnessPlanner";
import AllergyManager from "./pages/tools/AllergyManager";
import BMICalculator from "./pages/tools/BMICalculator";
import HydrationTracker from "./pages/tools/HydrationTracker";
import NutritionGenerator from "./pages/tools/NutritionGenerator";
import MedicalScheduler from "./pages/tools/MedicalScheduler";
import FlexibleSchedule from "./pages/tools/FlexibleSchedule";
import ProductivityTracker from "./pages/tools/ProductivityTracker";
import FamilyMeetings from "./pages/tools/FamilyMeetings";
import TransportCalculator from "./pages/tools/TransportCalculator";
import StrategicLeave from "./pages/tools/StrategicLeave";
import EnergyTracker from "./pages/tools/EnergyTracker";
import TeleworkManager from "./pages/tools/TeleworkManager";
import FamilyGoals from "./pages/tools/FamilyGoals";
import GratitudeJournal from "./pages/tools/GratitudeJournal";
import FamilyChallenges from "./pages/tools/FamilyChallenges";
import CoupleTime from "./pages/tools/CoupleTime";
import HabitsTracker from "./pages/tools/HabitsTracker";
import RelaxationGenerator from "./pages/tools/RelaxationGenerator";
import CommunicationAssistant from "./pages/tools/CommunicationAssistant";
import FamilyProjects from "./pages/tools/FamilyProjects";
import WeatherActivities from "./pages/tools/WeatherActivities";
import IndoorActivities from "./pages/tools/IndoorActivities";
import BirthdayOrganizer from "./pages/tools/BirthdayOrganizer";
import FamilyGames from "./pages/tools/FamilyGames";
import BudgetVacations from "./pages/tools/BudgetVacations";
import CreativeTracker from "./pages/tools/CreativeTracker";
import TreasureHunt from "./pages/tools/TreasureHunt";
import PicnicOrganizer from "./pages/tools/PicnicOrganizer";
import UnitConverter from "./pages/tools/UnitConverter";
import LabelGenerator from "./pages/tools/LabelGenerator";
import PortionCalculator from "./pages/tools/PortionCalculator";
import ScreenTimer from "./pages/tools/ScreenTimer";

// Import des nouvelles pages
import About from "./pages/About";
import Contact from "./pages/Contact";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Suspense fallback={<div className="text-center mt-10 text-lg text-gray-400">Chargement…</div>}>
          <Routes>
            <Route path="/" element={<FamilyHub />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Outils OFFLINE */}
            <Route path="/tools/keyword-density" element={<KeywordDensity />} />
            <Route path="/tools/meta-generator" element={<MetaGenerator />} />
            <Route path="/tools/readability-checker" element={<ReadabilityChecker />} />
            <Route path="/tools/structured-data-gen" element={<StructuredDataGen />} />
            <Route path="/tools/html-structure-analyzer" element={<HtmlStructureAnalyzer />} />

            <Route path="/tools/calendar" element={<FamilyCalendar />} />
            <Route path="/tools/budget" element={<BudgetCalculator />} />
            <Route path="/tools/meals" element={<MealPlanner />} />
            <Route path="/tools/health" element={<HealthTracker />} />
            <Route path="/tools/time" element={<TimeManager />} />
            <Route path="/tools/homework" element={<HomeworkPlanner />} />
            <Route path="/tools/chores" element={<ChoresManager />} />
            <Route path="/tools/activities" element={<ActivityOrganizer />} />
            
            {/* Organisation */}
            <Route path="/tools/shopping" element={<ShoppingList />} />
            <Route path="/tools/childcare" element={<ChildcarePlanner />} />
            <Route path="/tools/medical-appointments" element={<MedicalAppointments />} />
            
            {/* Finances */}
            <Route path="/tools/kids-expenses" element={<KidsExpenses />} />
            <Route path="/tools/savings" element={<SavingsSimulator />} />
            <Route path="/tools/price-compare" element={<PriceComparator />} />
            <Route path="/tools/childcare-costs" element={<ChildcareCosts />} />
            <Route path="/tools/vacation-savings" element={<VacationSavings />} />
            <Route path="/tools/pocket-money" element={<PocketMoney />} />
            <Route path="/tools/school-costs" element={<SchoolCosts />} />
            
            {/* Éducation */}
            <Route path="/tools/educational-activities" element={<EducationalActivities />} />
            <Route path="/tools/school-progress" element={<SchoolProgress />} />
            <Route path="/tools/educational-resources" element={<EducationalResources />} />
            <Route path="/tools/family-quiz" element={<FamilyQuiz />} />
            <Route path="/tools/reading-tracker" element={<ReadingTracker />} />
            <Route path="/tools/cultural-calendar" element={<CulturalCalendar />} />
            <Route path="/tools/homework-assistant" element={<HomeworkAssistant />} />
            
            {/* Santé */}
            <Route path="/tools/sleep-tracker" element={<SleepTracker />} />
            <Route path="/tools/fitness-planner" element={<FitnessPlanner />} />
            <Route path="/tools/allergy-manager" element={<AllergyManager />} />
            <Route path="/tools/bmi-calculator" element={<BMICalculator />} />
            <Route path="/tools/hydration-tracker" element={<HydrationTracker />} />
            <Route path="/tools/nutrition-generator" element={<NutritionGenerator />} />
            <Route path="/tools/medical-scheduler" element={<MedicalScheduler />} />
            
            {/* Équilibre */}
            <Route path="/tools/flexible-schedule" element={<FlexibleSchedule />} />
            <Route path="/tools/productivity-tracker" element={<ProductivityTracker />} />
            <Route path="/tools/family-meetings" element={<FamilyMeetings />} />
            <Route path="/tools/transport-calculator" element={<TransportCalculator />} />
            <Route path="/tools/strategic-leave" element={<StrategicLeave />} />
            <Route path="/tools/energy-tracker" element={<EnergyTracker />} />
            <Route path="/tools/telework-manager" element={<TeleworkManager />} />
            
            {/* Développement */}
            <Route path="/tools/family-goals" element={<FamilyGoals />} />
            <Route path="/tools/gratitude-journal" element={<GratitudeJournal />} />
            <Route path="/tools/family-challenges" element={<FamilyChallenges />} />
            <Route path="/tools/couple-time" element={<CoupleTime />} />
            <Route path="/tools/habits-tracker" element={<HabitsTracker />} />
            <Route path="/tools/relaxation-generator" element={<RelaxationGenerator />} />
            <Route path="/tools/communication-assistant" element={<CommunicationAssistant />} />
            <Route path="/tools/family-projects" element={<FamilyProjects />} />
            
            {/* Loisirs */}
            <Route path="/tools/weather-activities" element={<WeatherActivities />} />
            <Route path="/tools/indoor-activities" element={<IndoorActivities />} />
            <Route path="/tools/birthday-organizer" element={<BirthdayOrganizer />} />
            <Route path="/tools/family-games" element={<FamilyGames />} />
            <Route path="/tools/budget-vacations" element={<BudgetVacations />} />
            <Route path="/tools/creative-tracker" element={<CreativeTracker />} />
            <Route path="/tools/treasure-hunt" element={<TreasureHunt />} />
            <Route path="/tools/picnic-organizer" element={<PicnicOrganizer />} />
            
            {/* Outils Pratiques */}
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/label-generator" element={<LabelGenerator />} />
            <Route path="/tools/portion-calculator" element={<PortionCalculator />} />
            <Route path="/tools/screen-timer" element={<ScreenTimer />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <PWAStatus />
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
