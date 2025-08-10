import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ModernCard } from "@/components/ui/modern/ModernCard";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { PageContainer } from "@/components/ui/page-container";
import { cn } from "@/lib/utils";

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

interface FeatureCardProps {
  features: string[];
  title: string;
  bgGradient: string;
  textColor: string;
  dotColor: string;
}

const FeatureCard = memo(function FeatureCard({ 
  features, 
  title, 
  bgGradient, 
  textColor,
  dotColor
}: FeatureCardProps) {
  const isAvailable = title.includes('disponibles');
  
  return (
    <ModernCard variant="glass" className={cn("p-6 h-full", bgGradient)}>
      <CardHeader className="px-0 py-0 pb-4">
        <CardTitle className={cn("text-xl font-bold font-space", textColor)}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-0 pb-0">
        {features.map((feature, index) => (
          <div
            key={`${title}-${index}`}
            className={cn(
              "flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm",
              "transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:bg-white/90",
              "border border-white/50"
            )}
          >
            <div 
              className={cn(
                "w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 shadow-sm",
                dotColor
              )}
              aria-hidden="true"
            />
            <span className={cn(
              "text-sm leading-relaxed font-medium",
              isAvailable ? 'text-green-800' : 'text-blue-800'
            )}>
              {feature}
            </span>
          </div>
        ))}
      </CardContent>
    </ModernCard>
  );
});

export default memo(function ToolTemplate({
  title,
  description,
  icon,
  features,
  comingSoonFeatures,
  bgColor = "bg-white",
  iconBgColor = "bg-blue-100",
  iconTextColor = "text-blue-600",
  children
}: ToolTemplateProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
        {/* Header avec bouton retour orange */}
        <div className="w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
          <PageContainer maxWidth="full" padding="md">
            <div className="flex flex-col md:flex-row items-center gap-6 py-6">
              <div 
                className={cn(
                  "rounded-3xl shadow-xl bg-gradient-to-br from-white to-gray-50",
                  "flex items-center justify-center border border-white/50 backdrop-blur-sm",
                  "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                  iconBgColor,
                  iconTextColor
                )} 
                style={{ minWidth: 80, minHeight: 80 }}
                role="img"
                aria-label={`Icône ${title}`}
              >
                <div className="h-12 w-12 flex items-center justify-center">
                  {icon}
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-3">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 font-space leading-tight">
                  <span className="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
                    {title}
                  </span>
                </h1>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
                  {description}
                </p>
              </div>

              <button 
                onClick={handleBackClick}
                className={cn(
                  "px-6 py-3 rounded-full font-bold text-white text-lg transition-all duration-300",
                  "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600",
                  "hover:scale-105 hover:shadow-xl shadow-lg",
                  "flex items-center gap-2 min-w-[140px] justify-center"
                )}
                aria-label="Retour à l'accueil"
              >
                ← Accueil
              </button>
            </div>
          </PageContainer>
        </div>

        {/* Contenu principal pleine largeur */}
        <PageContainer maxWidth="full" padding="md">
          <div className="py-8">
            {children && (
              <div className="mb-8">
                <ModernCard variant="glass" className="p-6 md:p-8">
                  {children}
                </ModernCard>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FeatureCard
                features={features}
                title="✅ Fonctionnalités disponibles"
                bgGradient="bg-gradient-to-br from-green-50/90 to-emerald-50/70"
                textColor="text-green-800"
                dotColor="bg-gradient-to-r from-green-400 to-emerald-400"
              />
              
              <FeatureCard
                features={comingSoonFeatures}
                title="🚀 Fonctionnalités à venir"
                bgGradient="bg-gradient-to-br from-blue-50/90 to-indigo-50/70"
                textColor="text-blue-800"
                dotColor="bg-gradient-to-r from-blue-400 to-indigo-400"
              />
            </div>
          </div>
        </PageContainer>
      </div>
    </ErrorBoundary>
  );
});
