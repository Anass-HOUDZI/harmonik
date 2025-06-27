
import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/ui/page-container";
import { Section } from "@/components/ui/section";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
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
  bgColor: string;
  borderColor: string;
  textColor: string;
}

const FeatureCard = memo(function FeatureCard({ 
  features, 
  title, 
  bgColor, 
  borderColor, 
  textColor 
}: FeatureCardProps) {
  const isAvailable = title.includes('disponibles');
  
  return (
    <Card className={cn("rounded-2xl border-0 shadow-sm hover:shadow-md transition-shadow", bgColor)}>
      <CardHeader className="px-5 py-4">
        <CardTitle className={cn("text-lg font-semibold", textColor)}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-5 px-5">
        {features.map((feature, index) => (
          <div
            key={`${title}-${index}`}
            className={cn(
              "flex items-start gap-3 p-3 bg-white/80 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-95",
              borderColor
            )}
          >
            <span 
              className={cn(
                "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                isAvailable ? 'bg-green-500' : 'bg-blue-400'
              )}
              aria-hidden="true"
            />
            <span className={cn(
              "text-sm leading-relaxed",
              isAvailable ? 'text-green-900' : 'text-blue-950'
            )}>
              {feature}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
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
      <div className="min-h-screen flex flex-col">
        <div className={cn("bg-gradient-to-br flex-grow", bgColor)}>
          <PageContainer maxWidth="4xl">
            <div className="pt-6 md:pt-8 pb-8">
              <Section variant="card" className="mb-6 shadow-lg bg-white/95 backdrop-blur-sm">
                <div className="relative">
                  <Button 
                    variant="outline" 
                    onClick={handleBackClick}
                    className="rounded-lg absolute top-0 right-0 md:static p-2 md:p-2 md:px-3 order-3 hover:bg-gray-50 transition-colors"
                    aria-label="Retour à l'accueil"
                  >
                    <ArrowLeft className="w-4 h-4 md:mr-2" />
                    <span className="hidden md:inline">Accueil</span>
                  </Button>
                  
                  <div className="flex flex-col md:flex-row items-center gap-4 pr-16 md:pr-0">
                    <div 
                      className={cn(
                        "rounded-2xl shadow-md bg-gradient-to-br from-white flex items-center justify-center order-1 transition-shadow hover:shadow-lg",
                        iconBgColor,
                        iconTextColor
                      )} 
                      style={{ minWidth: 84, minHeight: 84 }}
                      role="img"
                      aria-label={`Icône ${title}`}
                    >
                      <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center">
                        {icon}
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left order-2">
                      <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mt-2 md:mt-0 leading-tight">
                        {title}
                      </h1>
                      <p className="text-base md:text-lg font-medium text-gray-700 mt-2 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              {children && (
                <Section variant="transparent" spacing="md">
                  {children}
                </Section>
              )}

              <ResponsiveGrid 
                cols={{ default: 1, lg: 2 }} 
                gap="md"
                className="max-w-none"
              >
                <FeatureCard
                  features={features}
                  title="✅ Fonctionnalités disponibles"
                  bgColor="bg-green-50/90 backdrop-blur-sm"
                  borderColor="border-green-100"
                  textColor="text-green-800"
                />
                
                <FeatureCard
                  features={comingSoonFeatures}
                  title="🚀 Fonctionnalités à venir"
                  bgColor="bg-blue-50/70 backdrop-blur-sm"
                  borderColor="border-blue-100"
                  textColor="text-blue-800"
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
