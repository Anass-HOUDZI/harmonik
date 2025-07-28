import React, { useState } from 'react';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Home, 
  DollarSign, 
  GraduationCap, 
  Heart, 
  Scale, 
  Target, 
  Gamepad2, 
  Wrench,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';

const categoriesData = [
  {
    id: 'organisation',
    name: 'Organisation',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    count: 6,
    description: 'Planification, calendrier familial, gestion des tâches et organisation du quotidien.',
    tools: [
      { name: 'Calendrier Familial', route: '/tools/calendar', description: 'Synchronisez les activités de toute la famille' },
      { name: 'Planificateur Repas', route: '/tools/meals', description: 'Planifiez des menus équilibrés pour la semaine' },
      { name: 'Gestionnaire Corvées', route: '/tools/chores', description: 'Répartissez équitablement les tâches ménagères' },
      { name: 'Liste de Courses', route: '/tools/shopping', description: 'Optimisez vos achats avec des listes intelligentes' },
      { name: 'Planificateur Garde', route: '/tools/childcare', description: 'Organisez les modes de garde des enfants' },
      { name: 'RDV Médicaux', route: '/tools/medical-appointments', description: 'Centralisez le suivi médical familial' }
    ]
  },
  {
    id: 'finances',
    name: 'Finances',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    count: 8,
    description: 'Budget familial, économies, coûts enfants et gestion financière.',
    tools: [
      { name: 'Budget Familial', route: '/tools/budget', description: 'Gérez vos finances familiales efficacement' },
      { name: 'Frais Enfants', route: '/tools/kids-expenses', description: 'Suivez les dépenses liées aux enfants' },
      { name: 'Simulateur Économies', route: '/tools/savings', description: 'Planifiez vos économies futures' },
      { name: 'Comparateur Prix', route: '/tools/price-compare', description: 'Trouvez les meilleures offres' },
      { name: 'Coûts Garde', route: '/tools/childcare-costs', description: 'Calculez les frais de garde optimaux' },
      { name: 'Épargne Vacances', route: '/tools/vacation-savings', description: 'Budgétisez vos congés familiaux' },
      { name: 'Argent de Poche', route: '/tools/pocket-money', description: 'Gérez l\'argent de poche des enfants' },
      { name: 'Frais Scolaires', route: '/tools/school-costs', description: 'Estimez le budget rentrée scolaire' }
    ]
  },
  {
    id: 'education',
    name: 'Éducation',
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    count: 8,
    description: 'Suivi scolaire, aide aux devoirs, activités éducatives et ressources pédagogiques.',
    tools: [
      { name: 'Planning Devoirs', route: '/tools/homework', description: 'Organisez le travail scolaire efficacement' },
      { name: 'Suivi Scolaire', route: '/tools/school-progress', description: 'Visualisez l\'évolution des résultats' },
      { name: 'Activités Éducatives', route: '/tools/educational-activities', description: 'Créez des exercices adaptés à chaque âge' },
      { name: 'Ressources Pédagogiques', route: '/tools/educational-resources', description: 'Bibliothèque de ressources classées' },
      { name: 'Quiz Familiaux', route: '/tools/family-quiz', description: 'Créez des jeux éducatifs amusants' },
      { name: 'Suivi Lecture', route: '/tools/reading-tracker', description: 'Encouragez la lecture chez les enfants' },
      { name: 'Calendrier Culturel', route: '/tools/cultural-calendar', description: 'Répertoriez musées, expositions...' },
      { name: 'Assistant Devoirs', route: '/tools/homework-assistant', description: 'Guide méthodologique pour les devoirs' }
    ]
  },
  {
    id: 'sante',
    name: 'Santé',
    icon: Heart,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-50',
    count: 8,
    description: 'Carnet de santé, suivi sommeil, nutrition et bien-être familial.',
    tools: [
      { name: 'Carnet de Santé', route: '/tools/health', description: 'Centralisez les informations médicales' },
      { name: 'Suivi Sommeil', route: '/tools/sleep-tracker', description: 'Analysez la qualité du repos familial' },
      { name: 'Planificateur Fitness', route: '/tools/fitness-planner', description: 'Organisez les activités physiques' },
      { name: 'Gestion Allergies', route: '/tools/allergy-manager', description: 'Adaptez l\'alimentation aux contraintes' },
      { name: 'Calculateur IMC', route: '/tools/bmi-calculator', description: 'Suivez l\'évolution morphologique' },
      { name: 'Tracker Hydratation', route: '/tools/hydration-tracker', description: 'Encouragez une bonne hydratation' },
      { name: 'Menu Équilibré', route: '/tools/nutrition-generator', description: 'Proposez des repas sains adaptés' },
      { name: 'Planning Examens', route: '/tools/medical-scheduler', description: 'Programmez les check-ups médicaux' }
    ]
  },
  {
    id: 'equilibre',
    name: 'Équilibre',
    icon: Scale,
    color: 'from-yellow-500 to-yellow-600',
    bgColor: 'bg-yellow-50',
    count: 8,
    description: 'Équilibre vie pro/perso, gestion du temps et télétravail avec enfants.',
    tools: [
      { name: 'Gestion du Temps', route: '/tools/time', description: 'Optimisez votre planning quotidien' },
      { name: 'Horaires Flexibles', route: '/tools/flexible-schedule', description: 'Adaptez votre planning aux contraintes' },
      { name: 'Tracker Productivité', route: '/tools/productivity-tracker', description: 'Améliorez votre efficacité parentale' },
      { name: 'Réunions Famille', route: '/tools/family-meetings', description: 'Programmez les échanges importants' },
      { name: 'Calcul Transports', route: '/tools/transport-calculator', description: 'Optimisez vos trajets quotidiens' },
      { name: 'Congés Stratégiques', route: '/tools/strategic-leave', description: 'Maximisez le temps en famille' },
      { name: 'Tracker Énergie', route: '/tools/energy-tracker', description: 'Identifiez vos pics de forme' },
      { name: 'Télétravail Enfants', route: '/tools/telework-manager', description: 'Conciliez travail à domicile et famille' }
    ]
  },
  {
    id: 'developpement',
    name: 'Développement',
    icon: Target,
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'bg-indigo-50',
    count: 8,
    description: 'Objectifs familiaux, développement personnel et communication bienveillante.',
    tools: [
      { name: 'Objectifs Famille', route: '/tools/family-goals', description: 'Définissez et suivez vos projets communs' },
      { name: 'Journal Gratitude', route: '/tools/gratitude-journal', description: 'Cultivez la reconnaissance quotidienne' },
      { name: 'Défis Famille', route: '/tools/family-challenges', description: 'Relevez des challenges amusants ensemble' },
      { name: 'Temps Couple', route: '/tools/couple-time', description: 'Préservez votre relation de couple' },
      { name: 'Tracker Habitudes', route: '/tools/habits-tracker', description: 'Développez de bonnes routines' },
      { name: 'Générateur Détente', route: '/tools/relaxation-generator', description: 'Proposez des moments de relaxation' },
      { name: 'Communication Famille', route: '/tools/communication-assistant', description: 'Améliorez les échanges familiaux' },
      { name: 'Projets Familiaux', route: '/tools/family-projects', description: 'Organisez vos grands objectifs' }
    ]
  },
  {
    id: 'loisirs',
    name: 'Loisirs',
    icon: Gamepad2,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-50',
    count: 8,
    description: 'Activités familiales, jeux, sorties et moments de détente ensemble.',
    tools: [
      { name: 'Activités Météo', route: '/tools/weather-activities', description: 'Proposez selon les conditions météo' },
      { name: 'Activités Intérieur', route: '/tools/indoor-activities', description: 'Occupez les jours de pluie' },
      { name: 'Organisation Anniversaires', route: '/tools/birthday-organizer', description: 'Planifiez des fêtes mémorables' },
      { name: 'Jeux Familiaux', route: '/tools/family-games', description: 'Créez des animations maison' },
      { name: 'Vacances Économiques', route: '/tools/budget-vacations', description: 'Trouvez des destinations abordables' },
      { name: 'Activités Créatives', route: '/tools/creative-tracker', description: 'Suivez les projets artistiques' },
      { name: 'Chasse aux Trésors', route: '/tools/treasure-hunt', description: 'Créez des jeux d\'exploration' },
      { name: 'Pique-niques', route: '/tools/picnic-organizer', description: 'Planifiez vos sorties nature' }
    ]
  },
  {
    id: 'pratiques',
    name: 'Outils Pratiques',
    icon: Wrench,
    color: 'from-gray-500 to-gray-600',
    bgColor: 'bg-gray-50',
    count: 4,
    description: 'Convertisseurs, calculateurs et utilitaires pour le quotidien familial.',
    tools: [
      { name: 'Convertisseur Unités', route: '/tools/unit-converter', description: 'Convertissez mesures pour cuisine et bricolage' },
      { name: 'Générateur Étiquettes', route: '/tools/label-generator', description: 'Organisez jouets, vêtements, affaires...' },
      { name: 'Calculateur Portions', route: '/tools/portion-calculator', description: 'Adaptez les quantités aux repas famille' },
      { name: 'Timer Activités', route: '/tools/screen-timer', description: 'Gérez le temps d\'écran et de jeux' }
    ]
  }
];

export default function Categories() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = categoriesData.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.tools.some(tool => 
      tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <PageContainer>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Nos Catégories d'Outils
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez nos 47 outils gratuits organisés en 8 catégories pour répondre à tous vos besoins familiaux.
            </p>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher une catégorie ou un outil..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-primary"
              />
            </div>
          </div>

          {/* Grille des catégories */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCategories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;

              return (
                <Card 
                  key={category.id}
                  className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer ${
                    isSelected ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                >
                  <CardHeader className={`${category.bgColor} rounded-t-lg`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl text-gray-900">{category.name}</CardTitle>
                          <Badge variant="secondary" className="mt-1">
                            {category.count} outils
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-3">
                      {category.description}
                    </p>
                  </CardHeader>

                  {(isSelected || searchTerm) && (
                    <CardContent className="pt-6">
                      <div className="space-y-3">
                        {category.tools
                          .filter(tool => !searchTerm || 
                            tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.description.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((tool) => (
                            <Link
                              key={tool.route}
                              to={tool.route}
                              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <h4 className="font-semibold text-gray-900 text-sm">
                                {tool.name}
                              </h4>
                              <p className="text-gray-600 text-xs mt-1">
                                {tool.description}
                              </p>
                            </Link>
                          ))
                        }
                      </div>
                    </CardContent>
                  )}
                </Card>
              );
            })}
          </div>

          {filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Aucune catégorie ou outil trouvé pour "{searchTerm}"
              </p>
            </div>
          )}

          {/* Statistiques */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary">47</div>
                  <div className="text-gray-600">Outils gratuits</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">8</div>
                  <div className="text-gray-600">Catégories</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-gray-600">Gratuit</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-gray-600">Disponible</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}