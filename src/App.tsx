import React, { Suspense, lazy, useEffect, memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PWAStatus from "@/components/PWAStatus";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";

// Lazy-load pages non critiques
const FamilyHub = lazy(() => import("./pages/FamilyHub"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Les outils "offline" doivent être lazy loadés
const KeywordDensity = lazy(() => import("./pages/tools/KeywordDensity"));
const MetaGenerator = lazy(() => import("./pages/tools/MetaGenerator"));
const ReadabilityChecker = lazy(() => import("./pages/tools/ReadabilityChecker"));
const StructuredDataGen = lazy(() => import("./pages/tools/StructuredDataGen"));
const HtmlStructureAnalyzer = lazy(() => import("./pages/tools/HtmlStructureAnalyzer"));

// Lazy-load all tool pages for better performance
const FamilyCalendar = lazy(() => import("./pages/tools/FamilyCalendar"));
const BudgetCalculator = lazy(() => import("./pages/tools/BudgetCalculator"));
const HealthTracker = lazy(() => import("./pages/tools/HealthTracker"));
const HomeworkPlanner = lazy(() => import("./pages/tools/HomeworkPlanner"));
const ChoresManager = lazy(() => import("./pages/tools/ChoresManager"));
// Lazy-load all remaining tool pages for optimal performance
const ActivityOrganizer = lazy(() => import("./pages/tools/ActivityOrganizer"));
const ShoppingList = lazy(() => import("./pages/tools/ShoppingList"));
const ChildcarePlanner = lazy(() => import("./pages/tools/ChildcarePlanner"));
const ChildcareCosts = lazy(() => import("./pages/tools/ChildcareCosts"));
const VacationSavings = lazy(() => import("./pages/tools/VacationSavings"));
const PocketMoney = lazy(() => import("./pages/tools/PocketMoney"));
const SchoolCosts = lazy(() => import("./pages/tools/SchoolCosts"));
const EducationalActivities = lazy(() => import("./pages/tools/EducationalActivities"));
const SchoolProgress = lazy(() => import("./pages/tools/SchoolProgress"));
const EducationalResources = lazy(() => import("./pages/tools/EducationalResources"));
const FamilyQuiz = lazy(() => import("./pages/tools/FamilyQuiz"));
const ReadingTracker = lazy(() => import("./pages/tools/ReadingTracker"));
const CulturalCalendar = lazy(() => import("./pages/tools/CulturalCalendar"));
const HomeworkAssistant = lazy(() => import("./pages/tools/HomeworkAssistant"));
const SleepTracker = lazy(() => import("./pages/tools/SleepTracker"));
const FitnessPlanner = lazy(() => import("./pages/tools/FitnessPlanner"));
const AllergyManager = lazy(() => import("./pages/tools/AllergyManager"));
const BMICalculator = lazy(() => import("./pages/tools/BMICalculator"));
const HydrationTracker = lazy(() => import("./pages/tools/HydrationTracker"));
const NutritionGenerator = lazy(() => import("./pages/tools/NutritionGenerator"));
const MedicalScheduler = lazy(() => import("./pages/tools/MedicalScheduler"));
const FlexibleSchedule = lazy(() => import("./pages/tools/FlexibleSchedule"));
const ProductivityTracker = lazy(() => import("./pages/tools/ProductivityTracker"));
const FamilyMeetings = lazy(() => import("./pages/tools/FamilyMeetings"));
const TransportCalculator = lazy(() => import("./pages/tools/TransportCalculator"));
const StrategicLeave = lazy(() => import("./pages/tools/StrategicLeave"));
const EnergyTracker = lazy(() => import("./pages/tools/EnergyTracker"));
const TeleworkManager = lazy(() => import("./pages/tools/TeleworkManager"));
const FamilyGoals = lazy(() => import("./pages/tools/FamilyGoals"));
const GratitudeJournal = lazy(() => import("./pages/tools/GratitudeJournal"));
const FamilyChallenges = lazy(() => import("./pages/tools/FamilyChallenges"));
const CoupleTime = lazy(() => import("./pages/tools/CoupleTime"));
const HabitsTracker = lazy(() => import("./pages/tools/HabitsTracker"));
const RelaxationGenerator = lazy(() => import("./pages/tools/RelaxationGenerator"));
const CommunicationAssistant = lazy(() => import("./pages/tools/CommunicationAssistant"));
const FamilyProjects = lazy(() => import("./pages/tools/FamilyProjects"));
const WeatherActivities = lazy(() => import("./pages/tools/WeatherActivities"));
const IndoorActivities = lazy(() => import("./pages/tools/IndoorActivities"));
const BirthdayOrganizer = lazy(() => import("./pages/tools/BirthdayOrganizer"));
const FamilyGames = lazy(() => import("./pages/tools/FamilyGames"));
const BudgetVacations = lazy(() => import("./pages/tools/BudgetVacations"));
const CreativeTracker = lazy(() => import("./pages/tools/CreativeTracker"));
const TreasureHunt = lazy(() => import("./pages/tools/TreasureHunt"));
const PicnicOrganizer = lazy(() => import("./pages/tools/PicnicOrganizer"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const LabelGenerator = lazy(() => import("./pages/tools/LabelGenerator"));
const PortionCalculator = lazy(() => import("./pages/tools/PortionCalculator"));
const ScreenTimer = lazy(() => import("./pages/tools/ScreenTimer"));

// Lazy-load additional pages
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));


const queryClient = new QueryClient();

const App = memo(() => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Header />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 border-4 border-orange-500/30 border-t-orange-500 rounded-full animate-spin mx-auto"></div>
                <p className="text-lg text-gray-600 font-medium">Chargement de l'outil...</p>
              </div>
            </div>
          }>
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
            
            <Route path="/tools/health" element={<HealthTracker />} />
            
            <Route path="/tools/homework" element={<HomeworkPlanner />} />
            <Route path="/tools/chores" element={<ChoresManager />} />
            <Route path="/tools/activities" element={<ActivityOrganizer />} />
            
            {/* Organisation */}
            <Route path="/tools/shopping" element={<ShoppingList />} />
            <Route path="/tools/childcare" element={<ChildcarePlanner />} />
            
            
            {/* Finances */}
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
  </ErrorBoundary>
));

export default App;
