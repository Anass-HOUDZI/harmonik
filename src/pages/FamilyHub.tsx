
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Calculator, Utensils, Heart, Clock, BookOpen, Users, Home, Gamepad2, ShoppingCart, Baby, Stethoscope, PiggyBank, TrendingUp, DollarSign, AlertTriangle, Plane, Wallet, GraduationCap, Brain, Library, HelpCircle, Activity, Dumbbell, Apple, Scale, Droplets, ChefHat, UserCheck, Briefcase, Target, Smile, Trophy, Coffee, MessageCircle, FolderOpen, Sun, CloudRain, PartyPopper, Puzzle, MapPin, Ruler, Tag, UtensilsCrossed, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  route: string;
  priority: number;
  status: 'available' | 'coming-soon' | 'beta';
}

const tools: Tool[] = [
  // Organisation
  {
    id: 'family-calendar',
    name: 'Calendrier Familial',
    description: 'Organisez tous les événements familiaux en un seul endroit avec codes couleur par membre.',
    category: 'Organisation',
    icon: Calendar,
    route: '/tools/calendar',
    priority: 1,
    status: 'available'
  },
  {
    id: 'meal-planner',
    name: 'Planificateur Repas',
    description: 'Planifiez des repas équilibrés et générez automatiquement vos listes de courses.',
    category: 'Organisation',
    icon: Utensils,
    route: '/tools/meals',
    priority: 1,
    status: 'available'
  },
  {
    id: 'chores-manager',
    name: 'Gestionnaire Corvées',
    description: 'Répartissez équitablement les tâches ménagères avec gamification.',
    category: 'Organisation',
    icon: Users,
    route: '/tools/chores',
    priority: 1,
    status: 'available'
  },
  {
    id: 'shopping-list',
    name: 'Gestionnaire Listes Courses',
    description: 'Optimisez vos achats avec des listes multiples et calcul de budget.',
    category: 'Organisation',
    icon: ShoppingCart,
    route: '/tools/shopping',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'childcare-planner',
    name: 'Planificateur Garde Enfants',
    description: 'Organisez les modes de garde avec calcul des coûts et gestion urgences.',
    category: 'Organisation',
    icon: Baby,
    route: '/tools/childcare',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'medical-appointments',
    name: 'Tracker Rendez-vous Médicaux',
    description: 'Centralisez le suivi santé avec rappels vaccins et gestion praticiens.',
    category: 'Organisation',
    icon: Stethoscope,
    route: '/tools/medical-appointments',
    priority: 2,
    status: 'coming-soon'
  },

  // Finances
  {
    id: 'budget-calculator',
    name: 'Calculateur Budget',
    description: 'Gérez efficacement les finances familiales avec des graphiques intuitifs.',
    category: 'Finances',
    icon: Calculator,
    route: '/tools/budget',
    priority: 1,
    status: 'available'
  },
  {
    id: 'kids-expenses',
    name: 'Tracker Dépenses Enfants',
    description: 'Quantifiez et optimisez les coûts liés aux enfants par catégorie.',
    category: 'Finances',
    icon: PiggyBank,
    route: '/tools/kids-expenses',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'savings-simulator',
    name: 'Simulateur Économies',
    description: 'Maximisez votre capacité d\'épargne avec des défis gamifiés.',
    category: 'Finances',
    icon: TrendingUp,
    route: '/tools/savings',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'price-comparator',
    name: 'Comparateur Prix',
    description: 'Trouvez les meilleures offres avec alertes et codes promo automatiques.',
    category: 'Finances',
    icon: DollarSign,
    route: '/tools/price-compare',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'childcare-costs',
    name: 'Calculateur Frais Garde',
    description: 'Choisissez le mode de garde le plus économique avec aides CAF.',
    category: 'Finances',
    icon: AlertTriangle,
    route: '/tools/childcare-costs',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'vacation-savings',
    name: 'Planificateur Épargne Vacances',
    description: 'Budgétisez vos vacances avec plan d\'épargne progressif.',
    category: 'Finances',
    icon: Plane,
    route: '/tools/vacation-savings',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'pocket-money',
    name: 'Gestionnaire Argent Poche',
    description: 'Éduquez les enfants à la gestion financière avec comptes virtuels.',
    category: 'Finances',
    icon: Wallet,
    route: '/tools/pocket-money',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'school-costs',
    name: 'Calculateur Coût Rentrée',
    description: 'Anticipez et budgétisez la rentrée scolaire avec comparateur prix.',
    category: 'Finances',
    icon: GraduationCap,
    route: '/tools/school-costs',
    priority: 2,
    status: 'coming-soon'
  },

  // Éducation
  {
    id: 'homework-planner',
    name: 'Planning Devoirs',
    description: 'Organisez le travail scolaire des enfants sans stress.',
    category: 'Éducation',
    icon: BookOpen,
    route: '/tools/homework',
    priority: 1,
    status: 'available'
  },
  {
    id: 'educational-activities',
    name: 'Générateur Activités Éducatives',
    description: 'Créez des contenus pédagogiques adaptés par âge et matière.',
    category: 'Éducation',
    icon: Brain,
    route: '/tools/educational-activities',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'school-progress',
    name: 'Tracker Progrès Scolaires',
    description: 'Visualisez l\'évolution des résultats avec graphiques et conseils.',
    category: 'Éducation',
    icon: TrendingUp,
    route: '/tools/school-progress',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'educational-resources',
    name: 'Bibliothèque Ressources',
    description: 'Centralisez les supports éducatifs avec recherche intelligente.',
    category: 'Éducation',
    icon: Library,
    route: '/tools/educational-resources',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'family-quiz',
    name: 'Générateur Quiz Familiaux',
    description: 'Créez des jeux éducatifs avec 5000+ questions par thème.',
    category: 'Éducation',
    icon: HelpCircle,
    route: '/tools/family-quiz',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'reading-tracker',
    name: 'Tracker Lecture Enfants',
    description: 'Encouragez la lecture avec défis gamifiés et recommandations.',
    category: 'Éducation',
    icon: BookOpen,
    route: '/tools/reading-tracker',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'cultural-calendar',
    name: 'Calendrier Sorties Éducatives',
    description: 'Découvrez l\'offre culturelle locale avec filtres et réservations.',
    category: 'Éducation',
    icon: Calendar,
    route: '/tools/cultural-calendar',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'homework-assistant',
    name: 'Assistant Aide Devoirs',
    description: 'Guidez méthodologiquement avec techniques et ressources.',
    category: 'Éducation',
    icon: HelpCircle,
    route: '/tools/homework-assistant',
    priority: 2,
    status: 'coming-soon'
  },

  // Santé
  {
    id: 'health-tracker',
    name: 'Carnet de Santé',
    description: 'Centralisez les informations médicales de toute la famille en sécurité.',
    category: 'Santé',
    icon: Heart,
    route: '/tools/health',
    priority: 1,
    status: 'available'
  },
  {
    id: 'sleep-tracker',
    name: 'Tracker Sommeil Famille',
    description: 'Optimisez la qualité du sommeil avec analyse et conseils.',
    category: 'Santé',
    icon: Clock,
    route: '/tools/sleep-tracker',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'fitness-planner',
    name: 'Planificateur Activité Physique',
    description: 'Encouragez le sport en famille avec défis et suivi progression.',
    category: 'Santé',
    icon: Dumbbell,
    route: '/tools/fitness-planner',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'allergy-manager',
    name: 'Gestionnaire Allergies',
    description: 'Sécurisez l\'alimentation avec scanner codes-barres et alertes.',
    category: 'Santé',
    icon: AlertTriangle,
    route: '/tools/allergy-manager',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'bmi-calculator',
    name: 'Calculateur IMC Famille',
    description: 'Surveillez l\'évolution morphologique avec courbes de croissance.',
    category: 'Santé',
    icon: Scale,
    route: '/tools/bmi-calculator',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'hydration-tracker',
    name: 'Tracker Hydratation',
    description: 'Encouragez une hydratation optimale avec rappels intelligents.',
    category: 'Santé',
    icon: Droplets,
    route: '/tools/hydration-tracker',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'nutrition-generator',
    name: 'Générateur Menu Équilibré',
    description: 'Composez des repas nutritionnellement optimisés automatiquement.',
    category: 'Santé',
    icon: ChefHat,
    route: '/tools/nutrition-generator',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'medical-scheduler',
    name: 'Planificateur Examens Médicaux',
    description: 'Programmez les suivis préventifs avec rappels personnalisés.',
    category: 'Santé',
    icon: UserCheck,
    route: '/tools/medical-scheduler',
    priority: 2,
    status: 'coming-soon'
  },

  // Équilibre
  {
    id: 'time-manager',
    name: 'Gestionnaire Temps',
    description: 'Optimisez l\'équilibre entre vie professionnelle et familiale.',
    category: 'Équilibre',
    icon: Clock,
    route: '/tools/time',
    priority: 1,
    status: 'available'
  },
  {
    id: 'flexible-schedule',
    name: 'Planificateur Horaires Flexibles',
    description: 'Optimisez le télétravail avec synchronisation agenda pro/perso.',
    category: 'Équilibre',
    icon: Briefcase,
    route: '/tools/flexible-schedule',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'productivity-tracker',
    name: 'Tracker Productivité Parent',
    description: 'Maximisez l\'efficacité avec gestion des interruptions familiales.',
    category: 'Équilibre',
    icon: TrendingUp,
    route: '/tools/productivity-tracker',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'family-meetings',
    name: 'Organisateur Réunions Famille',
    description: 'Programmez les échanges familiaux avec ordre du jour collaboratif.',
    category: 'Équilibre',
    icon: Users,
    route: '/tools/family-meetings',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'transport-calculator',
    name: 'Calculateur Temps Transport',
    description: 'Optimisez les déplacements avec covoiturage et alternatives écolo.',
    category: 'Équilibre',
    icon: MapPin,
    route: '/tools/transport-calculator',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'strategic-leave',
    name: 'Planificateur Congés Stratégiques',
    description: 'Maximisez le temps famille avec optimisation vacances scolaires.',
    category: 'Équilibre',
    icon: Calendar,
    route: '/tools/strategic-leave',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'energy-tracker',
    name: 'Tracker Énergie Parentale',
    description: 'Identifiez vos pics de forme avec prévention burn-out.',
    category: 'Équilibre',
    icon: Activity,
    route: '/tools/energy-tracker',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'telework-manager',
    name: 'Gestionnaire Interruptions Télétravail',
    description: 'Organisez les pauses familiales avec activités autonomes enfants.',
    category: 'Équilibre',
    icon: Home,
    route: '/tools/telework-manager',
    priority: 2,
    status: 'coming-soon'
  },

  // Développement
  {
    id: 'family-goals',
    name: 'Tracker Objectifs Familiaux',
    description: 'Suivez et atteignez vos projets avec décomposition étapes.',
    category: 'Développement',
    icon: Target,
    route: '/tools/family-goals',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'gratitude-journal',
    name: 'Journal Gratitude Familial',
    description: 'Cultivez la positivité avec partage de moments positifs.',
    category: 'Développement',
    icon: Smile,
    route: '/tools/gratitude-journal',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'family-challenges',
    name: 'Générateur Défis Famille',
    description: 'Créez du lien avec 500+ challenges par catégorie.',
    category: 'Développement',
    icon: Trophy,
    route: '/tools/family-challenges',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'couple-time',
    name: 'Planificateur Temps Couple',
    description: 'Préservez votre relation avec planning moments exclusifs.',
    category: 'Développement',
    icon: Heart,
    route: '/tools/couple-time',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'habits-tracker',
    name: 'Tracker Habitudes Positives',
    description: 'Développez de bonnes routines avec suivi streak et récompenses.',
    category: 'Développement',
    icon: Target,
    route: '/tools/habits-tracker',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'relaxation-generator',
    name: 'Générateur Activités Détente',
    description: 'Proposez des moments de relaxation avec méditation guidée.',
    category: 'Développement',
    icon: Coffee,
    route: '/tools/relaxation-generator',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'communication-assistant',
    name: 'Assistant Communication Famille',
    description: 'Améliorez les échanges avec techniques de communication positive.',
    category: 'Développement',
    icon: MessageCircle,
    route: '/tools/communication-assistant',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'family-projects',
    name: 'Planificateur Projets Familiaux',
    description: 'Organisez vos grands objectifs avec méthodologie adaptée.',
    category: 'Développement',
    icon: FolderOpen,
    route: '/tools/family-projects',
    priority: 2,
    status: 'coming-soon'
  },

  // Loisirs
  {
    id: 'activity-organizer',
    name: 'Organisateur Sorties',
    description: 'Découvrez et planifiez des activités familiales adaptées.',
    category: 'Loisirs',
    icon: Gamepad2,
    route: '/tools/activities',
    priority: 1,
    status: 'available'
  },
  {
    id: 'weather-activities',
    name: 'Générateur Sortie Météo',
    description: 'Proposez des activités selon les conditions climatiques.',
    category: 'Loisirs',
    icon: Sun,
    route: '/tools/weather-activities',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'indoor-activities',
    name: 'Planificateur Activités Intérieur',
    description: 'Occupez intelligemment les jours de pluie avec 1000+ activités.',
    category: 'Loisirs',
    icon: CloudRain,
    route: '/tools/indoor-activities',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'birthday-organizer',
    name: 'Organisateur Anniversaires',
    description: 'Planifiez des fêtes mémorables avec templates et check-lists.',
    category: 'Loisirs',
    icon: PartyPopper,
    route: '/tools/birthday-organizer',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'family-games',
    name: 'Générateur Jeux Familiaux',
    description: 'Créez des animations sur-mesure avec 500+ jeux.',
    category: 'Loisirs',
    icon: Puzzle,
    route: '/tools/family-games',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'budget-vacations',
    name: 'Planificateur Vacances Économiques',
    description: 'Organisez des séjours abordables avec comparateur destinations.',
    category: 'Loisirs',
    icon: Plane,
    route: '/tools/budget-vacations',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'creative-tracker',
    name: 'Tracker Activités Créatives',
    description: 'Suivez la créativité familiale avec défis mensuels.',
    category: 'Loisirs',
    icon: Trophy,
    route: '/tools/creative-tracker',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'treasure-hunt',
    name: 'Générateur Chasse Trésors',
    description: 'Créez des jeux d\'exploration personnalisés par lieu.',
    category: 'Loisirs',
    icon: MapPin,
    route: '/tools/treasure-hunt',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'picnic-organizer',
    name: 'Organisateur Pique-niques',
    description: 'Planifiez parfaitement vos sorties nature avec météo intégrée.',
    category: 'Loisirs',
    icon: Apple,
    route: '/tools/picnic-organizer',
    priority: 2,
    status: 'coming-soon'
  },

  // Outils Pratiques
  {
    id: 'unit-converter',
    name: 'Convertisseur Unités',
    description: 'Facilitez cuisine et bricolage avec conversions instantanées.',
    category: 'Pratique',
    icon: Ruler,
    route: '/tools/unit-converter',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'label-generator',
    name: 'Générateur Étiquettes',
    description: 'Organisez jouets et vêtements avec étiquettes personnalisées.',
    category: 'Pratique',
    icon: Tag,
    route: '/tools/label-generator',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'portion-calculator',
    name: 'Calculateur Portions',
    description: 'Adaptez les quantités aux repas famille avec anti-gaspillage.',
    category: 'Pratique',
    icon: UtensilsCrossed,
    route: '/tools/portion-calculator',
    priority: 2,
    status: 'coming-soon'
  },
  {
    id: 'screen-timer',
    name: 'Timer Activités Enfants',
    description: 'Gérez équitablement temps d\'écran avec rotation automatique.',
    category: 'Pratique',
    icon: Timer,
    route: '/tools/screen-timer',
    priority: 2,
    status: 'coming-soon'
  }
];

const categories = ['Tous', 'Organisation', 'Finances', 'Éducation', 'Santé', 'Équilibre', 'Développement', 'Loisirs', 'Pratique'];

export default function FamilyHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const navigate = useNavigate();

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'coming-soon': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'beta': return 'Beta';
      case 'coming-soon': return 'Bientôt';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🏠 Suite Famille
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              60 outils gratuits pour simplifier la vie de famille.
              Organisez, planifiez et profitez ensemble en toute simplicité.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Rechercher un outil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border-2 border-blue-200 focus:border-blue-400 rounded-lg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'border-blue-200 text-blue-700 hover:bg-blue-50'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center bg-green-50 border-green-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-700">
                {tools.filter(t => t.status === 'available').length}
              </div>
              <div className="text-sm text-green-600">Outils disponibles</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-yellow-50 border-yellow-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-700">
                {tools.filter(t => t.status === 'beta').length}
              </div>
              <div className="text-sm text-yellow-600">En beta</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-700">100%</div>
              <div className="text-sm text-blue-600">Gratuit</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-700">0</div>
              <div className="text-sm text-purple-600">Données transmises</div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            return (
              <Card 
                key={tool.id} 
                className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer border-2 hover:border-blue-300"
                onClick={() => tool.status === 'available' && navigate(tool.route)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge className={`mt-1 ${getStatusColor(tool.status)}`}>
                          {getStatusText(tool.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {tool.description}
                  </CardDescription>
                  <div className="mt-4 flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      {tool.category}
                    </Badge>
                    {tool.status === 'available' && (
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Ouvrir
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Aucun outil trouvé</div>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Pourquoi choisir Suite Famille ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Confidentialité Totale</h3>
              <p className="text-gray-600 text-sm">
                Vos données restent sur votre appareil. Aucune transmission, aucun serveur externe.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Gratuit</h3>
              <p className="text-gray-600 text-sm">
                Tous les outils sont gratuits, sans pub, sans abonnement, sans version premium.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pensé Famille</h3>
              <p className="text-gray-600 text-sm">
                Interface adaptée à tous les âges, du plus petit au plus grand de la famille.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
