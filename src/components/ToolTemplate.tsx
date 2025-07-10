
import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import { ModernCard } from "@/components/ui/modern/ModernCard";
import PWAStatus from "@/components/PWAStatus";
import { ErrorBoundary } from "@/components/common/ErrorBoundary";
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
  bgColor = "from-blue-50 via-purple-50 to-pink-50",
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
      <div className="min-h-screen flex flex-col bg-pattern">
        <div className={cn("bg-gradient-to-br flex-grow", bgColor)}>
          <PageContainer maxWidth="5xl">
            <div className="pt-8 md:pt-12 pb-12">
              <Section variant="transparent" className="mb-8">
                <ModernCard variant="glass" className="p-6 md:p-8 shadow-2xl">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div 
                      className={cn(
                        "rounded-3xl shadow-xl bg-gradient-to-br from-white to-gray-50",
                        "flex items-center justify-center border border-white/50 backdrop-blur-sm",
                        "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                        iconBgColor,
                        iconTextColor
                      )} 
                      style={{ minWidth: 100, minHeight: 100 }}
                      role="img"
                      aria-label={`Icône ${title}`}
                    >
                      <div className="h-16 w-16 flex items-center justify-center">
                        {icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left space-y-3">
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-space leading-tight">
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                          {title}
                        </span>
                      </h1>
                      <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-medium max-w-3xl">
                        {description}
                      </p>
                    </div>

                    <Button 
                      variant="outline" 
                      onClick={handleBackClick}
                      className={cn(
                        "rounded-xl px-4 py-2 font-semibold transition-all duration-300",
                        "hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white",
                        "border-2 border-blue-200 hover:border-transparent hover:scale-105 hover:shadow-lg"
                      )}
                      aria-label="Retour à l'accueil"
                    >
                      <ArrowLeft className="w-4 h-4 md:mr-2" />
                      <span className="hidden md:inline">Accueil</span>
                    </Button>
                  </div>
                </ModernCard>
              </Section>

              {children && (
                <Section variant="transparent" spacing="md">
                  <ModernCard variant="glass" className="p-6 md:p-8">
                    {children}
                  </ModernCard>
                </Section>
              )}

              <ResponsiveGrid 
                cols={{ default: 1, lg: 2 }} 
                gap="lg"
                className="max-w-none"
              >
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
              </ResponsiveGrid>
            </div>
          </PageContainer>
        </div>

        <PWAStatus />
      </div>
    </ErrorBoundary>
  );
});
