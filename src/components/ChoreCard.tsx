
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, CheckCircle, Trash } from "lucide-react";

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
  avatar: string;
}

interface ChoreCardProps {
  chore: Chore;
  member?: FamilyMember;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  getDifficultyColor: (difficulty: string) => string;
  getStatusColor: (status: string) => string;
}

const ChoreCard: React.FC<ChoreCardProps> = ({
  chore,
  member,
  onComplete,
  onDelete,
  getDifficultyColor,
  getStatusColor,
}) => (
  <Card key={chore.id} className="hover:shadow-md transition-shadow animate-fade-in">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{chore.name}</CardTitle>
        <Badge className={getDifficultyColor(chore.difficulty)}>
          {chore.difficulty}
        </Badge>
      </div>
      <p className="text-sm text-gray-600">{chore.description}</p>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Assignée à:</span>
          <div className="flex items-center gap-1">
            <span>{member?.avatar}</span>
            <span className="font-medium">{member?.name}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Points:</span>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="font-bold">{chore.points}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Statut:</span>
          <Badge className={getStatusColor(chore.status)}>
            {chore.status === 'completed' ? 'Terminée' : 
              chore.status === 'pending' ? 'En attente' : 'En retard'}
          </Badge>
        </div>
        <div className="flex gap-2 mt-3">
          {chore.status === 'pending' && (
            <Button 
              onClick={() => onComplete(chore.id)}
              className="w-full bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Marquer comme terminée
            </Button>
          )}
          <Button 
            onClick={() => onDelete(chore.id)} 
            size="sm" 
            variant="destructive" 
            className="w-full"
          >
            <Trash className="h-4 w-4 mr-2" />
            Supprimer
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ChoreCard;
