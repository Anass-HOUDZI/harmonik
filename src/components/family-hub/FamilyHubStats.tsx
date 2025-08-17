
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { tools } from "@/data/toolsData";

export default function FamilyHubStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <Card className="text-center bg-gradient-to-br from-gradient-start/10 to-gradient-end/10 border-gradient-start/30">
        <CardContent className="px-6 py-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
            {tools.filter(t => t.status === 'available').length}
          </div>
          <div className="text-sm text-gradient-start mt-2">Outils disponibles</div>
        </CardContent>
      </Card>
      <Card className="text-center bg-gradient-to-br from-gradient-start/10 to-gradient-end/10 border-gradient-start/30">
        <CardContent className="px-6 py-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">100%</div>
          <div className="text-sm text-gradient-start mt-2">Gratuit</div>
        </CardContent>
      </Card>
      <Card className="text-center bg-gradient-to-br from-gradient-start/10 to-gradient-end/10 border-gradient-start/30">
        <CardContent className="px-6 py-6">
          <div className="text-2xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">0</div>
          <div className="text-sm text-gradient-start mt-2">Données transmises</div>
        </CardContent>
      </Card>
    </div>
  );
}
