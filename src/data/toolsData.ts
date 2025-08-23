import { Calendar, Utensils, Users, ShoppingCart, Baby, Stethoscope, Calculator, PiggyBank, TrendingUp, DollarSign, AlertTriangle, Plane, Wallet, GraduationCap, BookOpen, Brain, Library, HelpCircle, Heart, Clock, Dumbbell, Scale, Droplets, ChefHat, UserCheck, Briefcase, Target, Smile, Trophy, Coffee, MessageCircle, FolderOpen, Gamepad2, Sun, CloudRain, PartyPopper, Puzzle, MapPin, Ruler, Tag, UtensilsCrossed, Timer, Activity, Home, Apple, Search, FileText, Braces, Code } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  route: string;
  priority: number;
  status: 'available' | 'coming-soon' | 'beta';
}

export const tools: Tool[] = [
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
    status: 'available'
  },
  {
    id: 'childcare-planner',
    name: 'Planificateur Garde Enfants',
    description: 'Organisez les modes de garde avec calcul des coûts et gestion urgences.',
    category: 'Organisation',
    icon: Baby,
    route: '/tools/childcare',
    priority: 2,
    status: 'available'
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
    id: 'childcare-costs',
    name: 'Calculateur Frais Garde',
    description: 'Choisissez le mode de garde le plus économique avec aides CAF.',
    category: 'Finances',
    icon: AlertTriangle,
    route: '/tools/childcare-costs',
    priority: 2,
    status: 'available'
  },
  {
    id: 'vacation-savings',
    name: 'Planificateur Épargne Vacances',
    description: 'Budgétisez vos vacances avec plan d\'épargne progressif.',
    category: 'Finances',
    icon: Plane,
    route: '/tools/vacation-savings',
    priority: 2,
    status: 'available'
  },
  {
    id: 'pocket-money',
    name: 'Gestionnaire Argent Poche',
    description: 'Éduquez les enfants à la gestion financière avec comptes virtuels.',
    category: 'Finances',
    icon: Wallet,
    route: '/tools/pocket-money',
    priority: 2,
    status: 'available'
  },
  {
    id: 'school-costs',
    name: 'Calculateur Coût Rentrée',
    description: 'Anticipez et budgétisez la rentrée scolaire avec comparateur prix.',
    category: 'Finances',
    icon: GraduationCap,
    route: '/tools/school-costs',
    priority: 2,
    status: 'available'
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
    status: 'available'
  },
  {
    id: 'school-progress',
    name: 'Tracker Progrès Scolaires',
    description: 'Visualisez l\'évolution des résultats avec graphiques et conseils.',
    category: 'Éducation',
    icon: TrendingUp,
    route: '/tools/school-progress',
    priority: 2,
    status: 'available'
  },
  {
    id: 'educational-resources',
    name: 'Bibliothèque Ressources',
    description: 'Centralisez les supports éducatifs avec recherche intelligente.',
    category: 'Éducation',
    icon: Library,
    route: '/tools/educational-resources',
    priority: 2,
    status: 'available'
  },
  {
    id: 'family-quiz',
    name: 'Générateur Quiz Familiaux',
    description: 'Créez des jeux éducatifs avec 5000+ questions par thème.',
    category: 'Éducation',
    icon: HelpCircle,
    route: '/tools/family-quiz',
    priority: 2,
    status: 'available'
  },
  {
    id: 'reading-tracker',
    name: 'Tracker Lecture Enfants',
    description: 'Encouragez la lecture avec défis gamifiés et recommandations.',
    category: 'Éducation',
    icon: BookOpen,
    route: '/tools/reading-tracker',
    priority: 2,
    status: 'available'
  },
  {
    id: 'cultural-calendar',
    name: 'Calendrier Sorties Éducatives',
    description: 'Découvrez l\'offre culturelle locale avec filtres et réservations.',
    category: 'Éducation',
    icon: Calendar,
    route: '/tools/cultural-calendar',
    priority: 2,
    status: 'available'
  },
  {
    id: 'homework-assistant',
    name: 'Assistant Aide Devoirs',
    description: 'Guidez méthodologiquement avec techniques et ressources.',
    category: 'Éducation',
    icon: HelpCircle,
    route: '/tools/homework-assistant',
    priority: 2,
    status: 'available'
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
    status: 'available'
  },
  {
    id: 'fitness-planner',
    name: 'Planificateur Activité Physique',
    description: 'Encouragez le sport en famille avec défis et suivi progression.',
    category: 'Santé',
    icon: Dumbbell,
    route: '/tools/fitness-planner',
    priority: 2,
    status: 'available'
  },
  {
    id: 'allergy-manager',
    name: 'Gestionnaire Allergies',
    description: 'Sécurisez l\'alimentation avec scanner codes-barres et alertes.',
    category: 'Santé',
    icon: AlertTriangle,
    route: '/tools/allergy-manager',
    priority: 2,
    status: 'available'
  },
  {
    id: 'bmi-calculator',
    name: 'Calculateur IMC Famille',
    description: 'Surveillez l\'évolution morphologique avec courbes de croissance.',
    category: 'Santé',
    icon: Scale,
    route: '/tools/bmi-calculator',
    priority: 2,
    status: 'available'
  },
  {
    id: 'hydration-tracker',
    name: 'Tracker Hydratation',
    description: 'Encouragez une hydratation optimale avec rappels intelligents.',
    category: 'Santé',
    icon: Droplets,
    route: '/tools/hydration-tracker',
    priority: 2,
    status: 'available'
  },
  {
    id: 'nutrition-generator',
    name: 'Générateur Menu Équilibré',
    description: 'Composez des repas nutritionnellement optimisés automatiquement.',
    category: 'Santé',
    icon: ChefHat,
    route: '/tools/nutrition-generator',
    priority: 2,
    status: 'available'
  },
  {
    id: 'medical-scheduler',
    name: 'Planificateur Examens Médicaux',
    description: 'Programmez les suivis préventifs avec rappels personnalisés.',
    category: 'Santé',
    icon: UserCheck,
    route: '/tools/medical-scheduler',
    priority: 2,
    status: 'available'
  },

  // Équilibre
  {
    id: 'flexible-schedule',
    name: 'Planificateur Horaires Flexibles',
    description: 'Optimisez le télétravail avec synchronisation agenda pro/perso.',
    category: 'Équilibre',
    icon: Briefcase,
    route: '/tools/flexible-schedule',
    priority: 2,
    status: 'available'
  },
  {
    id: 'productivity-tracker',
    name: 'Tracker Productivité Parent',
    description: 'Maximisez l\'efficacité avec gestion des interruptions familiales.',
    category: 'Équilibre',
    icon: TrendingUp,
    route: '/tools/productivity-tracker',
    priority: 2,
    status: 'available'
  },
  {
    id: 'family-meetings',
    name: 'Organisateur Réunions Famille',
    description: 'Programmez les échanges familiaux avec ordre du jour collaboratif.',
    category: 'Équilibre',
    icon: Users,
    route: '/tools/family-meetings',
    priority: 2,
    status: 'available'
  },
  {
    id: 'transport-calculator',
    name: 'Calculateur Temps Transport',
    description: 'Optimisez les déplacements avec covoiturage et alternatives écolo.',
    category: 'Équilibre',
    icon: MapPin,
    route: '/tools/transport-calculator',
    priority: 2,
    status: 'available'
  },
  {
    id: 'strategic-leave',
    name: 'Planificateur Congés Stratégiques',
    description: 'Maximisez le temps famille avec optimisation vacances scolaires.',
    category: 'Équilibre',
    icon: Calendar,
    route: '/tools/strategic-leave',
    priority: 2,
    status: 'available'
  },
  {
    id: 'energy-tracker',
    name: 'Tracker Énergie Parentale',
    description: 'Identifiez vos pics de forme avec prévention burn-out.',
    category: 'Équilibre',
    icon: Activity,
    route: '/tools/energy-tracker',
    priority: 2,
    status: 'available'
  },
  {
    id: 'telework-manager',
    name: 'Gestionnaire Interruptions Télétravail',
    description: 'Organisez les pauses familiales avec activités autonomes enfants.',
    category: 'Équilibre',
    icon: Home,
    route: '/tools/telework-manager',
    priority: 2,
    status: 'available'
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
    status: 'available'
  },
  {
    id: 'gratitude-journal',
    name: 'Journal Gratitude Familial',
    description: 'Cultivez la positivité avec partage de moments positifs.',
    category: 'Développement',
    icon: Smile,
    route: '/tools/gratitude-journal',
    priority: 2,
    status: 'available'
  },
  {
    id: 'family-challenges',
    name: 'Générateur Défis Famille',
    description: 'Créez du lien avec 500+ challenges par catégorie.',
    category: 'Développement',
    icon: Trophy,
    route: '/tools/family-challenges',
    priority: 2,
    status: 'available'
  },
  {
    id: 'couple-time',
    name: 'Planificateur Temps Couple',
    description: 'Préservez votre relation avec planning moments exclusifs.',
    category: 'Développement',
    icon: Heart,
    route: '/tools/couple-time',
    priority: 2,
    status: 'available'
  },
  {
    id: 'habits-tracker',
    name: 'Tracker Habitudes Positives',
    description: 'Développez de bonnes routines avec suivi streak et récompenses.',
    category: 'Développement',
    icon: Target,
    route: '/tools/habits-tracker',
    priority: 2,
    status: 'available'
  },
  {
    id: 'relaxation-generator',
    name: 'Générateur Activités Détente',
    description: 'Proposez des moments de relaxation avec méditation guidée.',
    category: 'Développement',
    icon: Coffee,
    route: '/tools/relaxation-generator',
    priority: 2,
    status: 'available'
  },
  {
    id: 'communication-assistant',
    name: 'Assistant Communication Famille',
    description: 'Améliorez les échanges avec techniques de communication positive.',
    category: 'Développement',
    icon: MessageCircle,
    route: '/tools/communication-assistant',
    priority: 2,
    status: 'available'
  },
  {
    id: 'family-projects',
    name: 'Planificateur Projets Familiaux',
    description: 'Organisez vos grands objectifs avec méthodologie adaptée.',
    category: 'Développement',
    icon: FolderOpen,
    route: '/tools/family-projects',
    priority: 2,
    status: 'available'
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
    status: 'available'
  },
  {
    id: 'indoor-activities',
    name: 'Planificateur Activités Intérieur',
    description: 'Occupez intelligemment les jours de pluie avec 1000+ activités.',
    category: 'Loisirs',
    icon: CloudRain,
    route: '/tools/indoor-activities',
    priority: 2,
    status: 'available'
  },
  {
    id: 'birthday-organizer',
    name: 'Organisateur Anniversaires',
    description: 'Planifiez des fêtes mémorables avec templates et check-lists.',
    category: 'Loisirs',
    icon: PartyPopper,
    route: '/tools/birthday-organizer',
    priority: 2,
    status: 'available'
  },
  {
    id: 'family-games',
    name: 'Générateur Jeux Familiaux',
    description: 'Créez des animations sur-mesure avec 500+ jeux.',
    category: 'Loisirs',
    icon: Puzzle,
    route: '/tools/family-games',
    priority: 2,
    status: 'available'
  },
  {
    id: 'budget-vacations',
    name: 'Planificateur Vacances Économiques',
    description: 'Organisez des séjours abordables avec comparateur destinations.',
    category: 'Loisirs',
    icon: Plane,
    route: '/tools/budget-vacations',
    priority: 2,
    status: 'available'
  },
  {
    id: 'creative-tracker',
    name: 'Tracker Activités Créatives',
    description: 'Suivez la créativité familiale avec défis mensuels.',
    category: 'Loisirs',
    icon: Trophy,
    route: '/tools/creative-tracker',
    priority: 2,
    status: 'available'
  },
  {
    id: 'treasure-hunt',
    name: 'Générateur Chasse Trésors',
    description: 'Créez des jeux d\'exploration personnalisés par lieu.',
    category: 'Loisirs',
    icon: MapPin,
    route: '/tools/treasure-hunt',
    priority: 2,
    status: 'available'
  },
  {
    id: 'picnic-organizer',
    name: 'Organisateur Pique-niques',
    description: 'Planifiez parfaitement vos sorties nature avec météo intégrée.',
    category: 'Loisirs',
    icon: Apple,
    route: '/tools/picnic-organizer',
    priority: 2,
    status: 'available'
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
    status: 'available'
  },
  {
    id: 'label-generator',
    name: 'Générateur Étiquettes',
    description: 'Organisez jouets et vêtements avec étiquettes personnalisées.',
    category: 'Pratique',
    icon: Tag,
    route: '/tools/label-generator',
    priority: 2,
    status: 'available'
  },
  {
    id: 'portion-calculator',
    name: 'Calculateur Portions',
    description: 'Adaptez les quantités aux repas famille avec anti-gaspillage.',
    category: 'Pratique',
    icon: UtensilsCrossed,
    route: '/tools/portion-calculator',
    priority: 2,
    status: 'available'
  },
  {
    id: 'screen-timer',
    name: 'Timer Activités Enfants',
    description: 'Gérez équitablement temps d\'écran avec rotation automatique.',
    category: 'Pratique',
    icon: Timer,
    route: '/tools/screen-timer',
    priority: 2,
    status: 'available'
  },
  {
    id: 'meta-generator',
    name: 'Générateur Meta Descriptions',
    description: 'Créez ou optimisez vos meta descriptions hors-ligne.',
    category: 'Pratique',
    icon: FileText,
    route: '/tools/meta-generator',
    priority: 2,
    status: 'available'
  },
  {
    id: 'keyword-density',
    name: 'Analyseur Densité Mots-clés',
    description: 'Analysez la densité de mots-clés de vos textes en local.',
    category: 'Pratique',
    icon: Search,
    route: '/tools/keyword-density',
    priority: 2,
    status: 'available'
  },
  {
    id: 'readability-checker',
    name: 'Vérificateur de Lisibilité',
    description: 'Vérifiez la lisibilité de vos contenus hors-ligne.',
    category: 'Pratique',
    icon: BookOpen,
    route: '/tools/readability-checker',
    priority: 2,
    status: 'available'
  },
  {
    id: 'structured-data-gen',
    name: 'Générateur Données Structurées',
    description: 'Générez du JSON-LD pour vos pages web, 100% offline.',
    category: 'Pratique',
    icon: Code,
    route: '/tools/structured-data-gen',
    priority: 2,
    status: 'available'
  },
  {
    id: 'html-structure-analyzer',
    name: 'Analyseur Structure HTML',
    description: 'Analysez la structure HTML de vos documents en local.',
    category: 'Pratique',
    icon: Braces,
    route: '/tools/html-structure-analyzer',
    priority: 2,
    status: 'available'
  }
];
