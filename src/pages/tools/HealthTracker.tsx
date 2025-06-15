
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HealthTracker() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-3">
            <span className="p-2 bg-purple-100 rounded-lg">
              <Heart className="h-7 w-7 text-purple-600" />
            </span>
            <div>
              <CardTitle className="text-2xl">Carnet de Santé Numérique</CardTitle>
              <CardDescription>
                Centralisez toutes les informations médicales de la famille et facilitez le suivi santé au quotidien. <br />
                <span className="text-purple-600 font-semibold">🐾 100% privé, aucune donnée transmise.</span>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-gray-700">
            <ul className="list-disc ml-5 mb-2 text-base">
              <li>Ajouter/suivre les membres & profils médicaux</li>
              <li>Historique vaccins, consultations, traitements</li>
              <li>Gestion rappels vaccins & visites</li>
              <li>Documents (ordonnances, bilans)</li>
            </ul>
            <span className="block text-sm text-gray-400">Fonctionnalités à venir : suivi traitements & urgences, export PDF.</span>
            <Button className="mt-6" variant="secondary" onClick={() => navigate("/")}>
              Retour à la Suite
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
