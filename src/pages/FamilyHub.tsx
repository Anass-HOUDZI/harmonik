
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Calculator, Utensils, Heart, Clock, BookOpen, Users, Home, Gamepad2 } from 'lucide-react';
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
    id: 'health-tracker',
    name: 'Carnet de Santé',
    description: 'Centralisez les informations médicales de toute la famille en sécurité.',
    category: 'Santé',
    icon: Heart,
    route: '/tools/health',
    priority: 1,
    status: 'coming-soon'
  },
  {
    id: 'time-manager',
    name: 'Gestionnaire Temps',
    description: 'Optimisez l\'équilibre entre vie professionnelle et familiale.',
    category: 'Équilibre',
    icon: Clock,
    route: '/tools/time',
    priority: 1,
    status: 'coming-soon'
  },
  {
    id: 'homework-planner',
    name: 'Planning Devoirs',
    description: 'Organisez le travail scolaire des enfants sans stress.',
    category: 'Éducation',
    icon: BookOpen,
    route: '/tools/homework',
    priority: 1,
    status: 'coming-soon'
  },
  {
    id: 'chores-manager',
    name: 'Gestionnaire Corvées',
    description: 'Répartissez équitablement les tâches ménagères avec gamification.',
    category: 'Organisation',
    icon: Users,
    route: '/tools/chores',
    priority: 1,
    status: 'coming-soon'
  },
  {
    id: 'activity-organizer',
    name: 'Organisateur Sorties',
    description: 'Découvrez et planifiez des activités familiales adaptées.',
    category: 'Loisirs',
    icon: Gamepad2,
    route: '/tools/activities',
    priority: 1,
    status: 'coming-soon'
  }
];

const categories = ['Tous', 'Organisation', 'Finances', 'Santé', 'Éducation', 'Équilibre', 'Loisirs'];

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
              50 outils gratuits pour simplifier la vie de famille.
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
