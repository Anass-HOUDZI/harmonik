
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ComingSoonPageProps {
  toolName: string;
}

export default function ComingSoonPage({ toolName }: ComingSoonPageProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <Card className="max-w-2xl w-full mx-auto shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <Clock className="h-10 w-10 text-blue-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-gray-900">
            {toolName}
          </CardTitle>
          <CardDescription className="text-lg">
            Cet outil est actuellement en développement
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">🚧 En construction</h3>
            <p className="text-yellow-700">
              Nous travaillons activement sur cet outil pour vous offrir la meilleure expérience possible. 
              Il sera bientôt disponible dans Harmonik !
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Ce qui vous attend :</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-green-50 p-4 rounded-lg">
                <span className="text-green-600 font-medium">✓ 100% Gratuit</span>
                <p className="text-green-700">Aucun coût, aucune publicité</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <span className="text-blue-600 font-medium">✓ Données Privées</span>
                <p className="text-blue-700">Vos informations restent sur votre appareil</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="text-purple-600 font-medium">✓ Interface Intuitive</span>
                <p className="text-purple-700">Adaptée à toute la famille</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <span className="text-orange-600 font-medium">✓ Hors Ligne</span>
                <p className="text-orange-700">Fonctionne sans connexion internet</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              💡 <strong>Conseil :</strong> En attendant, découvrez les autres outils déjà disponibles 
              dans Harmonik ! Chacun d'eux est conçu pour simplifier votre quotidien familial.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la Harmonik
            </Button>
            <Button 
              variant="outline"
              onClick={() => navigate(0)}
            >
              Actualiser la page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
