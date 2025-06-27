
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/ui/page-container";
import { PageHeader } from "@/components/ui/page-header";
import { Section } from "@/components/ui/section";
import { ResponsiveGrid } from "@/components/ui/responsive-grid";
import PWAStatus from "@/components/PWAStatus";
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

function FeatureCard({ features, title, bgColor, borderColor, textColor }: FeatureCardProps) {
  return (
    <Card className={cn("rounded-2xl border-0 shadow p-0", bgColor)}>
      <CardHeader className="px-5 py-4">
        <CardTitle className={cn("text-lg", textColor)}>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pb-5 px-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-3 bg-white rounded-xl shadow-sm transition transform hover:scale-[1.025] active:scale-95 hover:bg-opacity-60",
              borderColor
            )}
          >
            <span className={cn("w-2 h-2 rounded-full mt-2 flex-shrink-0", 
              title.includes('disponibles') ? 'bg-green-500' : 'bg-blue-400'
            )}></span>
            <span className={cn("text-sm", 
              title.includes('disponibles') ? 'text-green-900' : 'text-blue-950'
            )}>
              {feature}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
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
    <div className="min-h-screen flex flex-col">
      <div className={cn("bg-gradient-to-br flex-grow", bgColor)}>
        <PageContainer maxWidth="4xl">
          <div className="pt-8 md:pt-10 pb-8">
            <Section variant="card" className="mb-7 shadow-lg bg-white/95">
              <div className="relative">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")} 
                  className="rounded-lg absolute top-0 right-0 md:static p-2 md:p-2 md:px-3 order-3"
                >
                  <ArrowLeft className="w-4 h-4 md:mr-2" />
                  <span className="hidden md:inline">Accueil</span>
                </Button>
                
                <div className="flex flex-col md:flex-row items-center gap-4 pr-16 md:pr-0">
                  <div className={cn(
                    "rounded-2xl shadow bg-gradient-to-br from-white flex items-center justify-center order-1",
                    iconBgColor,
                    iconTextColor
                  )} 
                  style={{ minWidth: 84, minHeight: 84 }}>
                    <div className="h-12 w-12 md:h-14 md:w-14 flex items-center justify-center">
                      {icon}
                    </div>
                  </div>
                  
                  <div className="flex-1 text-center md:text-left order-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-blue-900 mt-2 md:mt-0">
                      {title}
                    </h1>
                    <p className="text-base md:text-lg font-medium text-gray-700 mt-2">
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

            <ResponsiveGrid cols={{ default: 1, lg: 2 }} gap="md">
              <FeatureCard
                features={features}
                title="✅ Fonctionnalités disponibles"
                bgColor="bg-green-50/90"
                borderColor="border-green-100"
                textColor="text-green-800"
              />
              
              <FeatureCard
                features={comingSoonFeatures}
                title="🚀 Fonctionnalités à venir"
                bgColor="bg-blue-50/70"
                borderColor="border-blue-100"
                textColor="text-blue-800"
              />
            </ResponsiveGrid>
          </div>
        </PageContainer>
      </div>

      <PWAStatus />
    </div>
  );
}
