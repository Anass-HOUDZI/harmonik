import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, Plus, Star, CheckCircle, Clock, Trophy, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ChoreCard from "@/components/ChoreCard";

interface Chore {
  id: string;
  name: string;
  description: string;
  points: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  frequency: 'quotidien' | 'hebdomadaire' | 'mensuel';
  assignedTo: string;
  status: 'pending' | 'completed' | 'overdue';
  dueDate: string;
  completedAt?: string;
  category: string;
}

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  totalPoints: number;
  level: number;
  avatar: string;
}

interface ChoreTemplate {
  name: string;
  description: string;
  points: number;
  difficulty: 'facile' | 'moyen' | 'difficile';
  category: string;
  minAge: number;
}

const choreTemplates: ChoreTemplate[] = [
  { name: "Faire son lit", description: "Ranger et faire son lit proprement", points: 5, difficulty: "facile", category: "Chambre", minAge: 5 },
  { name: "Sortir les poubelles", description: "Vider et sortir les poubelles", points: 10, difficulty: "facile", category: "Ménage", minAge: 8 },
  { name: "Passer l'aspirateur", description: "Aspirer le salon et les chambres", points: 15, difficulty: "moyen", category: "Ménage", minAge: 10 },
  { name: "Faire la vaisselle", description: "Laver et ranger la vaisselle", points: 20, difficulty: "moyen", category: "Cuisine", minAge: 12 },
  { name: "Nettoyer la salle de bain", description: "Nettoyer lavabo, baignoire et WC", points: 25, difficulty: "difficile", category: "Ménage", minAge: 14 },
  { name: "Ranger sa chambre", description: "Ranger vêtements, jouets et bureau", points: 10, difficulty: "facile", category: "Chambre", minAge: 6 },
  { name: "Arroser les plantes", description: "Arroser toutes les plantes de la maison", points: 8, difficulty: "facile", category: "Jardinage", minAge: 7 },
  { name: "Préparer le petit déjeuner", description: "Préparer le petit déjeuner pour la famille", points: 20, difficulty: "moyen", category: "Cuisine", minAge: 12 }
];

export default function ChoresManager() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [chores, setChores] = useState<Chore[]>([]);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showAddChore, setShowAddChore] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newChoreName, setNewChoreName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberAge, setNewMemberAge] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<ChoreTemplate | null>(null);
  const [showCustomChoreForm, setShowCustomChoreForm] = useState(false);

  // État pour la corvée personnalisée
  const [customChore, setCustomChore] = useState({
    name: "",
    description: "",
    points: 10,
    difficulty: 'facile' as 'facile' | 'moyen' | 'difficile',
    category: "",
    assignedTo: "",
  });

  // Charger les données depuis localStorage
  useEffect(() => {
    const savedChores = localStorage.getItem('family-chores');
    const savedMembers = localStorage.getItem('family-members');
    
    if (savedChores) {
      setChores(JSON.parse(savedChores));
    }
    
    if (savedMembers) {
      setFamilyMembers(JSON.parse(savedMembers));
    } else {
      // Membres par défaut pour la démo
      const defaultMembers: FamilyMember[] = [
        { id: '1', name: 'Papa', age: 35, totalPoints: 150, level: 3, avatar: '👨' },
        { id: '2', name: 'Maman', age: 33, totalPoints: 180, level: 4, avatar: '👩' },
        { id: '3', name: 'Emma', age: 12, totalPoints: 95, level: 2, avatar: '👧' },
        { id: '4', name: 'Lucas', age: 8, totalPoints: 45, level: 1, avatar: '👦' }
      ];
      setFamilyMembers(defaultMembers);
      localStorage.setItem('family-members', JSON.stringify(defaultMembers));
    }
  }, []);

  // Sauvegarder les corvées
  useEffect(() => {
    localStorage.setItem('family-chores', JSON.stringify(chores));
  }, [chores]);

  // Sauvegarder les membres
  useEffect(() => {
    localStorage.setItem('family-members', JSON.stringify(familyMembers));
  }, [familyMembers]);

  const addChoreFromTemplate = (template: ChoreTemplate, assignedTo: string) => {
    const newChore: Chore = {
      id: Date.now().toString(),
      name: template.name,
      description: template.description,
      points: template.points,
      difficulty: template.difficulty,
      frequency: 'hebdomadaire',
      assignedTo,
      status: 'pending',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      category: template.category
    };
    
    setChores([...chores, newChore]);
    toast({
      title: "Corvée ajoutée !",
      description: `${template.name} assignée à ${familyMembers.find(m => m.id === assignedTo)?.name}`,
    });
    setShowAddChore(false);
    setSelectedTemplate(null);
  };

  const completeChore = (choreId: string) => {
    setChores(chores.map(chore => {
      if (chore.id === choreId) {
        const updatedChore = {
          ...chore,
          status: 'completed' as const,
          completedAt: new Date().toISOString()
        };
        
        // Ajouter des points au membre
        setFamilyMembers(members =>
          members.map(member => {
            if (member.id === chore.assignedTo) {
              const newPoints = member.totalPoints + chore.points;
              const newLevel = Math.floor(newPoints / 50) + 1;
              return { ...member, totalPoints: newPoints, level: newLevel };
            }
            return member;
          })
        );
        
        toast({
          title: "Corvée terminée ! 🎉",
          description: `+${chore.points} points pour ${familyMembers.find(m => m.id === chore.assignedTo)?.name}`,
        });
        
        return updatedChore;
      }
      return chore;
    }));
  };

  const addFamilyMember = () => {
    if (newMemberName && newMemberAge) {
      const newMember: FamilyMember = {
        id: Date.now().toString(),
        name: newMemberName,
        age: parseInt(newMemberAge),
        totalPoints: 0,
        level: 1,
        avatar: parseInt(newMemberAge) < 18 ? (parseInt(newMemberAge) < 12 ? '👶' : '👧') : '👤'
      };
      
      setFamilyMembers([...familyMembers, newMember]);
      setNewMemberName('');
      setNewMemberAge('');
      setShowAddMember(false);
      
      toast({
        title: "Membre ajouté !",
        description: `${newMember.name} rejoint l'équipe corvées`,
      });
    }
  };

  const deleteChore = (id: string) => {
    setChores(chores.filter(c => c.id !== id));
    toast({ title: "Corvée supprimée", description: "La corvée a été retirée." });
  };

  const rotateChores = () => {
    const pendingChores = chores.filter(c => c.status === 'pending');
    const members = familyMembers.filter(m => m.age >= 6); // Enfants de 6 ans et plus
    
    if (pendingChores.length === 0 || members.length === 0) return;
    
    const rotatedChores = pendingChores.map((chore, index) => ({
      ...chore,
      assignedTo: members[index % members.length].id
    }));
    
    setChores(chores.map(chore => {
      const rotatedChore = rotatedChores.find(rc => rc.id === chore.id);
      return rotatedChore || chore;
    }));
    
    toast({
      title: "Rotation effectuée !",
      description: "Les corvées ont été redistribuées équitablement",
    });
  };

  const getAvailableTemplates = (memberId: string) => {
    const member = familyMembers.find(m => m.id === memberId);
    if (!member) return [];
    return choreTemplates.filter(template => member.age >= template.minAge);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'facile': return 'bg-green-100 text-green-800';
      case 'moyen': return 'bg-yellow-100 text-yellow-800';
      case 'difficile': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-200 rounded-lg">
              <Users className="h-8 w-8 text-green-700" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestionnaire de Corvées</h1>
              <p className="text-gray-600">Organisez les tâches familiales avec motivation</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => navigate("/")}>
            ← Retour
          </Button>
        </div>

        {/* Stats familiales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {familyMembers.map((member) => (
            <Card key={member.id} className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl mb-2">{member.avatar}</div>
                <div className="font-semibold">{member.name}</div>
                <div className="text-sm text-gray-600">Niveau {member.level}</div>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-bold text-yellow-600">{member.totalPoints}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button onClick={() => setShowAddChore(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter une corvée
          </Button>
          <Button onClick={() => setShowAddMember(true)} variant="outline">
            <Users className="h-4 w-4 mr-2" />
            Ajouter un membre
          </Button>
          <Button onClick={rotateChores} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Rotation automatique
          </Button>
        </div>

        {/* Liste des corvées */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {chores.map((chore) => {
            const assignedMember = familyMembers.find(m => m.id === chore.assignedTo);
            return (
              <ChoreCard
                key={chore.id}
                chore={chore}
                member={assignedMember}
                onComplete={completeChore}
                onDelete={deleteChore}
                getDifficultyColor={getDifficultyColor}
                getStatusColor={getStatusColor}
              />
            );
          })}
        </div>

        {/* Modal Ajouter corvée */}
        {showAddChore && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <CardTitle>Ajouter une corvée</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 mb-2">
                  <Button 
                    className={showCustomChoreForm ? "flex-1 font-bold bg-blue-100 text-blue-900" : "flex-1"}
                    variant="outline" 
                    onClick={() => setShowCustomChoreForm(!showCustomChoreForm)}>
                    Corvée personnalisée
                  </Button>
                  <Button 
                    className={!showCustomChoreForm ? "flex-1 font-bold bg-blue-100 text-blue-900" : "flex-1"}
                    variant="outline"
                    onClick={() => setShowCustomChoreForm(false)}>
                    Choisir un modèle
                  </Button>
                </div>
                
                {!showCustomChoreForm && (
                  <div>
                    <Label>Choisir un modèle de corvée</Label>
                    <div className="grid gap-2 mt-2">
                      {choreTemplates.map((template, index) => (
                        <Button
                          key={index}
                          variant={selectedTemplate === template ? "default" : "outline"}
                          onClick={() => setSelectedTemplate(template)}
                          className="justify-start text-left h-auto p-3"
                        >
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-xs text-gray-600">{template.description}</div>
                            <div className="flex gap-2 mt-1">
                              <Badge className={getDifficultyColor(template.difficulty)} variant="secondary">
                                {template.difficulty}
                              </Badge>
                              <Badge variant="outline">{template.points} pts</Badge>
                              <Badge variant="outline">Âge min: {template.minAge}</Badge>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formulaire corvée personnalisée */}
                {showCustomChoreForm && (
                  <form
                    className="space-y-3"
                    onSubmit={e => {
                      e.preventDefault();
                      if (
                        !customChore.name ||
                        !customChore.assignedTo ||
                        !customChore.points
                      ) {
                        toast({ title: "Complète tous les champs importants." });
                        return;
                      }
                      const newChore = {
                        ...customChore,
                        id: Date.now().toString(),
                        frequency: "hebdomadaire",
                        status: "pending",
                        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
                      };
                      setChores([...chores, newChore]);
                      setShowAddChore(false);
                      setCustomChore({
                        name: "",
                        description: "",
                        points: 10,
                        difficulty: 'facile',
                        category: "",
                        assignedTo: "",
                      });
                      toast({
                        title: "Corvée personnalisée ajoutée !",
                        description: `${newChore.name} assignée à ${familyMembers.find(m => m.id === newChore.assignedTo)?.name}`,
                      });
                    }}
                  >
                    <div>
                      <Label htmlFor="customName">Nom *</Label>
                      <Input
                        id="customName"
                        value={customChore.name}
                        onChange={e => setCustomChore({ ...customChore, name: e.target.value })}
                        placeholder="Ex : Laver la voiture"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="customDesc">Description</Label>
                      <Input
                        id="customDesc"
                        value={customChore.description}
                        onChange={e => setCustomChore({ ...customChore, description: e.target.value })}
                        placeholder="Détaille la tâche"
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Label htmlFor="customPoints">Points *</Label>
                        <Input
                          id="customPoints"
                          type="number"
                          value={customChore.points}
                          min={1}
                          max={50}
                          onChange={e => setCustomChore({ ...customChore, points: Number(e.target.value) })}
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor="customCat">Catégorie</Label>
                        <Input
                          id="customCat"
                          value={customChore.category}
                          onChange={e => setCustomChore({ ...customChore, category: e.target.value })}
                          placeholder="Ex : Jardinage"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="customDiff">Difficulté</Label>
                      <select
                        id="customDiff"
                        className="border rounded px-2 py-1 w-full"
                        value={customChore.difficulty}
                        onChange={e =>
                          setCustomChore({
                            ...customChore,
                            difficulty: e.target.value as 'facile' | 'moyen' | 'difficile',
                          })
                        }
                      >
                        <option value="facile">Facile</option>
                        <option value="moyen">Moyen</option>
                        <option value="difficile">Difficile</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="customAssignee">Assigner à *</Label>
                      <select
                        id="customAssignee"
                        className="border rounded px-2 py-1 w-full"
                        value={customChore.assignedTo}
                        required
                        onChange={e => setCustomChore({ ...customChore, assignedTo: e.target.value })}
                      >
                        <option value="">Sélectionne un membre</option>
                        {familyMembers.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.avatar} {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">Ajouter</Button>
                  </form>
                )}

                {/* Sélection du membre après template */}
                {!showCustomChoreForm && selectedTemplate && (
                  <div>
                    <Label>Assigner à</Label>
                    <div className="grid gap-2 mt-2">
                      {familyMembers
                        .filter(member => member.age >= selectedTemplate.minAge)
                        .map((member) => (
                        <Button
                          key={member.id}
                          onClick={() => addChoreFromTemplate(selectedTemplate, member.id)}
                          className="justify-start"
                          variant="outline"
                        >
                          <span className="mr-2">{member.avatar}</span>
                          {member.name} (Niveau {member.level})
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => setShowAddChore(false)} variant="outline" className="flex-1">
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Modal Ajouter membre */}
        {showAddMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Ajouter un membre</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="memberName">Nom</Label>
                  <Input
                    id="memberName"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="Nom du membre"
                  />
                </div>
                <div>
                  <Label htmlFor="memberAge">Âge</Label>
                  <Input
                    id="memberAge"
                    type="number"
                    value={newMemberAge}
                    onChange={(e) => setNewMemberAge(e.target.value)}
                    placeholder="Âge"
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addFamilyMember} className="flex-1">
                    Ajouter
                  </Button>
                  <Button onClick={() => setShowAddMember(false)} variant="outline" className="flex-1">
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tableau de bord des récompenses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Tableau des récompenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {familyMembers
                .sort((a, b) => b.totalPoints - a.totalPoints)
                .map((member, index) => (
                <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                    <span className="text-xl">{member.avatar}</span>
                    <div>
                      <div className="font-medium">{member.name}</div>
                      <div className="text-sm text-gray-600">Niveau {member.level}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="font-bold text-yellow-600">{member.totalPoints}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
