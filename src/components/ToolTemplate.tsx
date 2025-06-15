
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
    // Toujours sans min-h-screen
    <div className={`bg-gradient-to-br ${bgColor} px-2 pt-8 md:pt-10 pb-0`}>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-7 rounded-2xl shadow-lg border-0 bg-white/95">
          <CardHeader className="flex flex-col md:flex-row items-center gap-4 py-6 px-4 md:px-8 relative">
            <Button variant="outline" onClick={() => navigate("/")} className="rounded-lg absolute top-4 right-4 md:static md:order-3 p-2 md:p-2 md:px-3">
              <ArrowLeft className="w-4 h-4 md:mr-2" />
              <span className="hidden md:inline">Accueil</span>
            </Button>
            <span className={`rounded-2xl shadow bg-gradient-to-br from-white ${iconBgColor} ${iconTextColor} flex items-center justify-center md:order-1`} style={{ minWidth: 84, minHeight: 84 }}>
              <div className={`h-12 w-12 md:h-14 md:w-14 flex items-center justify-center`}>
                {icon}
              </div>
            </span>
            <div className="flex-1 text-center md:text-left md:order-2">
              <CardTitle className="text-2xl md:text-3xl font-bold text-blue-900 mt-2 md:mt-0">{title}</CardTitle>
              <CardDescription className="text-base md:text-lg font-medium text-gray-700 mt-2">{description}</CardDescription>
            </div>
          </CardHeader>
        </Card>

        {children && (
          <div className="mb-6">{children}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Fonctionnalités actuelles */}
          <Card className="rounded-2xl bg-green-50/90 border-0 shadow p-0">
            <CardHeader className="px-5 py-4">
              <CardTitle className="text-lg text-green-800">✅ Fonctionnalités disponibles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-5 px-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-green-100 shadow-sm transition transform hover:scale-[1.025] hover:bg-green-100/40"
                >
                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-green-900 text-sm">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Fonctionnalités à venir */}
          <Card className="rounded-2xl bg-blue-50/70 border-0 shadow p-0">
            <CardHeader className="px-5 py-4">
              <CardTitle className="text-lg text-blue-800">🚀 Fonctionnalités à venir</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-5 px-5">
              {comingSoonFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-white rounded-xl border border-blue-100 shadow-sm transition hover:scale-[1.025] hover:bg-blue-100/40"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-blue-950 text-sm">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Plus aucune marge ou padding après la dernière card */}
      </div>
    </div>
  );
}
