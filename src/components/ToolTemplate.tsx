
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ToolTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  comingSoonFeatures: string[];
  bgColor?: string;
  iconBgColor?: string;
  iconTextColor?: string;
  children?: React.ReactNode;
}

export default function ToolTemplate({
  title,
  description,
  icon,
  features,
  comingSoonFeatures,
  bgColor = "from-blue-50 via-purple-50 to-pink-50",
  iconBgColor = "bg-blue-100",
  iconTextColor = "text-blue-600",
  children
}: ToolTemplateProps) {
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} px-4 py-10`}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader className="flex flex-row items-center gap-3">
            <span className={`p-2 ${iconBgColor} rounded-lg`}>
              <div className={`h-7 w-7 ${iconTextColor}`}>
                {icon}
              </div>
            </span>
            <div className="flex-1">
              <CardTitle className="text-2xl">{title}</CardTitle>
              <CardDescription>
                {description}
              </CardDescription>
            </div>
            <Button variant="outline" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </CardHeader>
        </Card>

        {children && (
          <div className="mb-6">
            {children}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Fonctionnalités actuelles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">✅ Fonctionnalités disponibles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-green-800">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fonctionnalités à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">🚀 Fonctionnalités à venir</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {comingSoonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-blue-800">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message d'encouragement */}
        <Card className="mt-6 bg-purple-50 border-purple-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              🎯 Outil en développement actif
            </h3>
            <p className="text-purple-700">
              Cet outil fait partie de la Suite Famille 100% gratuite. 
              Nous ajoutons régulièrement de nouvelles fonctionnalités basées sur vos retours !
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
