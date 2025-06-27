
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
  children?: React.ReactNode;
  className?: string;
  gradient?: string;
}

export function PageHeader({
  title,
  description,
  icon,
  showBackButton = true,
  onBack,
  children,
  className,
  gradient = "from-blue-50 to-indigo-100"
}: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/');
    }
  };

  return (
    <div className={cn(`bg-gradient-to-br ${gradient} px-2 xs:px-4 py-4 md:py-6`, className)}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-4">
          <div className="flex items-center space-x-2 md:space-x-4">
            {showBackButton && (
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden xs:inline">Retour</span>
              </Button>
            )}
            <div className="flex items-center space-x-3">
              {icon && (
                <div className="rounded-2xl shadow bg-gradient-to-br from-white to-blue-100 text-blue-600 flex items-center justify-center p-3">
                  {icon}
                </div>
              )}
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-gray-900 flex items-center">
                  {title}
                </h1>
                {description && (
                  <p className="text-sm md:text-base text-gray-600 mt-1">
                    {description}
                  </p>
                )}
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
