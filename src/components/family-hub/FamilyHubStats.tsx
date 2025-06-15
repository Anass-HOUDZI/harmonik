
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { tools } from "@/data/toolsData";

export default function FamilyHubStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card className="text-center bg-green-50 border-green-200">
        <CardContent className="p-4">
          <div className="text-2xl font-bold text-green-700">
            {tools.filter(t => t.status === 'available').length}
          </div>
          <div className="text-sm text-green-600">Outils disponibles</div>
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
  );
}
