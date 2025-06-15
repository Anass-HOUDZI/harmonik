
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TimeManager() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center gap-3">
            <span className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="h-7 w-7 text-yellow-600" />
            </span>
            <div>
              <CardTitle className="text-2xl">Gestionnaire Temps Parental</CardTitle>
              <CardDescription>
                Optimisez la répartition du temps entre le travail, la famille et le temps personnel.<br />
                <span className="text-yellow-700 font-semibold">👨‍👩‍👧‍👦 Equilibre, analyse, et coaching bienveillant.</span>
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0 text-gray-700">
            <ul className="list-disc ml-5 mb-2 text-base">
              <li>Analyse automatique de la répartition du temps</li>
              <li>Visualisation graphique des plages horaires (pro/perso/famille)</li>
              <li>Suggestions d’optimisation & alertes surcharges</li>
              <li>Planification hebdo/quotidienne</li>
              <li>Rituels de bien-être, planification pauses, batch tasks</li>
            </ul>
            <span className="block text-sm text-gray-400">Fonctionnalités à venir : intégration calendrier, IA coach, export rapport PDF...</span>
          </CardContent>
          <CardFooter>
            <Button variant="secondary" onClick={() => navigate("/")}>
              Retour à la Suite
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
