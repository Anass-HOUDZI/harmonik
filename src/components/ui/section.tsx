
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'card' | 'transparent';
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'mb-4',
  md: 'mb-6 md:mb-8',
  lg: 'mb-8 md:mb-12'
};

export function Section({ 
  title, 
  description, 
  children, 
  className,
  variant = 'default',
  spacing = 'md'
}: SectionProps) {
  const sectionContent = (
    <>
      {(title || description) && (
        <div className="mb-4 md:mb-6">
          {title && (
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-gray-600 text-sm md:text-base">
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </>
  );

  if (variant === 'card') {
    return (
      <Card className={cn('rounded-2xl shadow-lg border-0 bg-white/95', spacingClasses[spacing], className)}>
        <CardContent className="p-4 md:p-6">
          {sectionContent}
        </CardContent>
      </Card>
    );
  }

  if (variant === 'transparent') {
    return (
      <div className={cn(spacingClasses[spacing], className)}>
        {sectionContent}
      </div>
    );
  }

  return (
    <section className={cn(spacingClasses[spacing], className)}>
      {sectionContent}
    </section>
  );
}
