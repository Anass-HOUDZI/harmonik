
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { ArrowLeft, Plus, Trash2, ShoppingCart, Clock, Users, ChefHat, Star, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { PageContainer } from '@/components/ui/page-container';

interface Recipe {
  id: string;
  name: string;
  description: string;
  preparationTime: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  servings: number;
  category: string;
  ingredients: Ingredient[];
  instructions: string[];
  tags: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
}

interface MealPlan {
  id: string;
  date: string;
  mealType: 'petit-dejeuner' | 'dejeuner' | 'diner' | 'collation';
  recipe: Recipe;
  servings: number;
}

interface FamilyProfile {
  adults: number;
  children: number;
  dietaryRestrictions: string[];
  preferences: string[];
  budget: number;
}

export default function MealPlanner() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [familyProfile, setFamilyProfile] = useState<FamilyProfile>({
    adults: 2,
    children: 2,
    dietaryRestrictions: [],
    preferences: [],
    budget: 300
  });
  const [selectedWeek, setSelectedWeek] = useState<Date[]>([]);
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    loadSampleData();
    generateWeekDates();
  }, []);

  const loadSampleData = () => {
    const sampleRecipes: Recipe[] = [
      {
        id: '1',
        name: 'Pâtes Carbonara',
        description: 'Délicieuses pâtes crémeuses aux lardons',
        preparationTime: 20,
        difficulty: 'facile',
        servings: 4,
        category: 'Italien',
        ingredients: [
          { id: '1', name: 'Pâtes', quantity: 400, unit: 'g', category: 'Féculents' },
          { id: '2', name: 'Lardons', quantity: 200, unit: 'g', category: 'Viande' },
          { id: '3', name: 'Œufs', quantity: 3, unit: 'pièces', category: 'Produits laitiers' },
          { id: '4', name: 'Parmesan', quantity: 100, unit: 'g', category: 'Produits laitiers' }
        ],
        instructions: [
          'Faire cuire les pâtes dans l\'eau bouillante salée',
          'Faire revenir les lardons dans une poêle',
          'Battre les œufs avec le parmesan',
          'Mélanger les pâtes chaudes avec les lardons et les œufs'
        ],
        tags: ['rapide', 'familial'],
        nutrition: { calories: 520, protein: 25, carbs: 60, fat: 18 }
      },
      {
        id: '2',
        name: 'Salade César',
        description: 'Salade fraîche au poulet et croûtons',
        preparationTime: 15,
        difficulty: 'facile',
        servings: 4,
        category: 'Salade',
        ingredients: [
          { id: '5', name: 'Salade romaine', quantity: 2, unit: 'têtes', category: 'Légumes' },
          { id: '6', name: 'Poulet grillé', quantity: 300, unit: 'g', category: 'Viande' },
          { id: '7', name: 'Croûtons', quantity: 100, unit: 'g', category: 'Féculents' },
          { id: '8', name: 'Parmesan', quantity: 50, unit: 'g', category: 'Produits laitiers' }
        ],
        instructions: [
          'Laver et couper la salade',
          'Couper le poulet en lamelles',
          'Préparer la sauce César',
          'Mélanger tous les ingrédients'
        ],
        tags: ['léger', 'santé'],
        nutrition: { calories: 350, protein: 30, carbs: 15, fat: 20 }
      },
      {
        id: '3',
        name: 'Ratatouille',
        description: 'Plat traditionnel de légumes provençaux',
        preparationTime: 45,
        difficulty: 'moyen',
        servings: 6,
        category: 'Végétarien',
        ingredients: [
          { id: '9', name: 'Aubergines', quantity: 2, unit: 'pièces', category: 'Légumes' },
          { id: '10', name: 'Courgettes', quantity: 3, unit: 'pièces', category: 'Légumes' },
          { id: '11', name: 'Tomates', quantity: 4, unit: 'pièces', category: 'Légumes' },
          { id: '12', name: 'Poivrons', quantity: 2, unit: 'pièces', category: 'Légumes' }
        ],
        instructions: [
          'Couper tous les légumes en cubes',
          'Faire revenir chaque légume séparément',
          'Mélanger et laisser mijoter 30 minutes',
          'Assaisonner avec les herbes de Provence'
        ],
        tags: ['végétarien', 'santé', 'traditionnel'],
        nutrition: { calories: 180, protein: 5, carbs: 25, fat: 8 }
      }
    ];

    setRecipes(sampleRecipes);

    // Charger les données depuis localStorage
    const savedMealPlans = localStorage.getItem('mealPlans');
    if (savedMealPlans) {
      setMealPlans(JSON.parse(savedMealPlans));
    }

    const savedProfile = localStorage.getItem('familyProfile');
    if (savedProfile) {
      setFamilyProfile(JSON.parse(savedProfile));
    }
  };

  const generateWeekDates = () => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay() + 1);
    
    const week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      week.push(date);
    }
    setSelectedWeek(week);
  };

  const saveMealPlans = (plans: MealPlan[]) => {
    setMealPlans(plans);
    localStorage.setItem('mealPlans', JSON.stringify(plans));
  };

  const addMealToPlan = (recipe: Recipe, date: Date, mealType: string) => {
    const totalPeople = familyProfile.adults + familyProfile.children;
    const adjustedServings = Math.ceil((totalPeople / recipe.servings) * recipe.servings);

    const newMeal: MealPlan = {
      id: Date.now().toString(),
      date: date.toISOString().split('T')[0],
      mealType: mealType as any,
      recipe: recipe,
      servings: adjustedServings
    };

    const updatedPlans = [...mealPlans, newMeal];
    saveMealPlans(updatedPlans);
    setIsAddingMeal(false);
    toast.success(`${recipe.name} ajouté au planning`);
  };

  const removeMealFromPlan = (mealId: string) => {
    const updatedPlans = mealPlans.filter(meal => meal.id !== mealId);
    saveMealPlans(updatedPlans);
    toast.success('Repas supprimé du planning');
  };

  const generateShoppingList = () => {
    const ingredients = new Map<string, { quantity: number; unit: string; category: string }>();

    mealPlans.forEach(meal => {
      const multiplier = meal.servings / meal.recipe.servings;
      meal.recipe.ingredients.forEach(ingredient => {
        const key = ingredient.name;
        const existing = ingredients.get(key);
        if (existing) {
          existing.quantity += ingredient.quantity * multiplier;
        } else {
          ingredients.set(key, {
            quantity: ingredient.quantity * multiplier,
            unit: ingredient.unit,
            category: ingredient.category
          });
        }
      });
    });

    return Array.from(ingredients.entries()).map(([name, data]) => ({
      name,
      ...data
    }));
  };

  const generateAutomaticWeekPlan = () => {
    const mealTypes = ['petit-dejeuner', 'dejeuner', 'diner'];
    const newPlans: MealPlan[] = [];

    selectedWeek.forEach(date => {
      mealTypes.forEach(mealType => {
        const availableRecipes = recipes.filter(recipe => 
          !familyProfile.dietaryRestrictions.some(restriction => 
            recipe.tags.includes(restriction)
          )
        );

        if (availableRecipes.length > 0) {
          const randomRecipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
          const totalPeople = familyProfile.adults + familyProfile.children;
          
          newPlans.push({
            id: `${date.toISOString().split('T')[0]}-${mealType}`,
            date: date.toISOString().split('T')[0],
            mealType: mealType as any,
            recipe: randomRecipe,
            servings: Math.ceil(totalPeople / randomRecipe.servings) * randomRecipe.servings
          });
        }
      });
    });

    const updatedPlans = [...mealPlans.filter(meal => 
      !selectedWeek.some(date => meal.date === date.toISOString().split('T')[0])
    ), ...newPlans];
    
    saveMealPlans(updatedPlans);
    toast.success('Planning automatique généré pour la semaine');
  };

  const getMealTypeLabel = (mealType: string) => {
    const labels = {
      'petit-dejeuner': 'Petit-déjeuner',
      'dejeuner': 'Déjeuner',
      'diner': 'Dîner',
      'collation': 'Collation'
    };
    return labels[mealType] || mealType;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'facile': 'bg-green-100 text-green-800',
      'moyen': 'bg-yellow-100 text-yellow-800',
      'difficile': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || recipe.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(recipes.map(recipe => recipe.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <PageContainer maxWidth="full" padding="md">
        <header className="bg-white shadow-sm border-b border-orange-100">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => navigate('/')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  ← Accueil
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                    <ChefHat className="h-6 w-6 text-orange-600" />
                    <span>Planificateur de Repas</span>
                  </h1>
                  <p className="text-gray-600">Organisez vos repas familiaux en toute simplicité</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button onClick={generateAutomaticWeekPlan} className="bg-orange-600 hover:bg-orange-700">
                  <Star className="h-4 w-4 mr-2" />
                  Génération automatique
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Liste de courses
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Liste de courses</DialogTitle>
                      <DialogDescription>
                        Basée sur votre planning de repas
                      </DialogDescription>
                    </DialogHeader>
                    <div className="max-h-96 overflow-y-auto space-y-4">
                      {Object.entries(
                        generateShoppingList().reduce((acc, item) => {
                          if (!acc[item.category]) acc[item.category] = [];
                          acc[item.category].push(item);
                          return acc;
                        }, {} as Record<string, any[]>)
                      ).map(([category, items]) => (
                        <div key={category}>
                          <h4 className="font-semibold text-lg mb-2">{category}</h4>
                          <div className="space-y-1">
                            {items.map((item, index) => (
                              <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                                <span>{item.name}</span>
                                <span className="text-sm text-gray-600">
                                  {Math.round(item.quantity * 10) / 10} {item.unit}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </header>

        <main className="py-8">
        <Tabs defaultValue="planning" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="recipes">Recettes</TabsTrigger>
            <TabsTrigger value="profile">Profil Famille</TabsTrigger>
          </TabsList>

          <TabsContent value="planning" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Planning de la semaine</CardTitle>
                <CardDescription>
                  Planifiez vos repas pour les 7 prochains jours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                  {selectedWeek.map((date) => {
                    const dayMeals = mealPlans.filter(meal => 
                      meal.date === date.toISOString().split('T')[0]
                    );

                    return (
                      <div key={date.toISOString()} className="border rounded-lg p-4">
                        <h3 className="font-semibold text-center mb-3">
                          {date.toLocaleDateString('fr-FR', { 
                            weekday: 'short', 
                            day: 'numeric',
                            month: 'short'
                          })}
                        </h3>
                        
                        <div className="space-y-2">
                          {['petit-dejeuner', 'dejeuner', 'diner'].map(mealType => {
                            const meal = dayMeals.find(m => m.mealType === mealType);
                            
                            return (
                              <div key={mealType} className="min-h-16 border-2 border-dashed border-gray-200 rounded p-2">
                                <div className="text-xs font-medium text-gray-500 mb-1">
                                  {getMealTypeLabel(mealType)}
                                </div>
                                {meal ? (
                                  <div className="relative group">
                                    <div className="text-sm font-medium">{meal.recipe.name}</div>
                                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                                      <Clock className="h-3 w-3" />
                                      <span>{meal.recipe.preparationTime}min</span>
                                      <Users className="h-3 w-3 ml-1" />
                                      <span>{meal.servings}</span>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                                      onClick={() => removeMealFromPlan(meal.id)}
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="w-full h-8 text-xs"
                                    onClick={() => {
                                      setSelectedDate(date);
                                      setSelectedMealType(mealType);
                                      setIsAddingMeal(true);
                                    }}
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Ajouter
                                  </Button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recipes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Bibliothèque de recettes</CardTitle>
                <CardDescription>
                  Découvrez et gérez vos recettes familiales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 mb-6">
                  <div className="flex-1">
                    <Input
                      placeholder="Rechercher une recette..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Toutes</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRecipes.map((recipe) => (
                    <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{recipe.name}</CardTitle>
                          <Badge className={getDifficultyColor(recipe.difficulty)}>
                            {recipe.difficulty}
                          </Badge>
                        </div>
                        <CardDescription>{recipe.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>{recipe.preparationTime} min</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>{recipe.servings} pers.</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {recipe.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>Calories: {recipe.nutrition.calories}</div>
                            <div>Protéines: {recipe.nutrition.protein}g</div>
                          </div>

                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="w-full">
                                Voir la recette
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{recipe.name}</DialogTitle>
                                <DialogDescription>{recipe.description}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 text-sm">
                                  <div className="text-center">
                                    <Clock className="h-4 w-4 mx-auto mb-1" />
                                    <div>{recipe.preparationTime} min</div>
                                  </div>
                                  <div className="text-center">
                                    <Users className="h-4 w-4 mx-auto mb-1" />
                                    <div>{recipe.servings} personnes</div>
                                  </div>
                                  <div className="text-center">
                                    <ChefHat className="h-4 w-4 mx-auto mb-1" />
                                    <div>{recipe.difficulty}</div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Ingrédients</h4>
                                  <div className="space-y-1">
                                    {recipe.ingredients.map(ingredient => (
                                      <div key={ingredient.id} className="flex justify-between">
                                        <span>{ingredient.name}</span>
                                        <span className="text-gray-500">
                                          {ingredient.quantity} {ingredient.unit}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-2">Instructions</h4>
                                  <ol className="list-decimal list-inside space-y-2">
                                    {recipe.instructions.map((instruction, index) => (
                                      <li key={index} className="text-sm">
                                        {instruction}
                                      </li>
                                    ))}
                                  </ol>
                                </div>

                                {isAddingMeal && (
                                  <Button
                                    className="w-full"
                                    onClick={() => addMealToPlan(recipe, selectedDate, selectedMealType)}
                                  >
                                    Ajouter au planning
                                  </Button>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profil Famille</CardTitle>
                <CardDescription>
                  Configurez les préférences de votre famille
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="adults">Nombre d'adultes</Label>
                    <Input
                      id="adults"
                      type="number"
                      value={familyProfile.adults}
                      onChange={(e) => setFamilyProfile(prev => ({
                        ...prev,
                        adults: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="children">Nombre d'enfants</Label>
                    <Input
                      id="children"
                      type="number"
                      value={familyProfile.children}
                      onChange={(e) => setFamilyProfile(prev => ({
                        ...prev,
                        children: parseInt(e.target.value) || 0
                      }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="budget">Budget mensuel (€)</Label>
                  <Input
                    id="budget"
                    type="number"
                    value={familyProfile.budget}
                    onChange={(e) => setFamilyProfile(prev => ({
                      ...prev,
                      budget: parseInt(e.target.value) || 0
                    }))}
                  />
                </div>

                <Button
                  onClick={() => {
                    localStorage.setItem('familyProfile', JSON.stringify(familyProfile));
                    toast.success('Profil famille sauvegardé');
                  }}
                  className="w-full"
                >
                  Sauvegarder le profil
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </main>

        {isAddingMeal && (
          <Dialog open={isAddingMeal} onOpenChange={setIsAddingMeal}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Ajouter un repas - {getMealTypeLabel(selectedMealType)}
                </DialogTitle>
                <DialogDescription>
                  {selectedDate.toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredRecipes.map((recipe) => (
                  <Card 
                    key={recipe.id} 
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => addMealToPlan(recipe, selectedDate, selectedMealType)}
                  >
                    <CardHeader>
                      <CardTitle className="text-base">{recipe.name}</CardTitle>
                      <CardDescription className="text-sm">{recipe.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{recipe.preparationTime}min</span>
                        </div>
                        <Badge className={getDifficultyColor(recipe.difficulty)}>
                          {recipe.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </PageContainer>
    </div>
  );
}
