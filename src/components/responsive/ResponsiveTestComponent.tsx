import React from 'react';
import { useViewport, useTouchDevice, useOrientation } from '@/hooks/useViewport';
import { TouchOptimizedButton, TouchOptimizedCard } from '@/components/ui/touch-optimized';
import { ResponsiveGrid } from '@/components/ui/responsive-grid';
import { Badge } from '@/components/ui/badge';

export function ResponsiveTestComponent() {
  const { width, height, isMobile, isTablet, isDesktop, isSmallScreen } = useViewport();
  const isTouchDevice = useTouchDevice();
  const orientation = useOrientation();

  return (
    <div className="p-4 space-y-6">
      {/* Informations de debug responsive */}
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-bold mb-2">Debug Responsive</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Largeur: {width}px</div>
          <div>Hauteur: {height}px</div>
          <div>Mobile: {isMobile ? '✅' : '❌'}</div>
          <div>Tablette: {isTablet ? '✅' : '❌'}</div>
          <div>Desktop: {isDesktop ? '✅' : '❌'}</div>
          <div>Petit écran: {isSmallScreen ? '✅' : '❌'}</div>
          <div>Tactile: {isTouchDevice ? '✅' : '❌'}</div>
          <div>Orientation: {orientation}</div>
        </div>
      </div>

      {/* Test des breakpoints */}
      <div className="space-y-2">
        <h3 className="font-bold">Test des breakpoints Tailwind</h3>
        <div className="space-y-1">
          <div className="bg-red-200 p-2 block xs:hidden">Visible uniquement &lt; 375px</div>
          <div className="bg-blue-200 p-2 hidden xs:block sm:hidden">Visible 375px - 480px (xs)</div>
          <div className="bg-green-200 p-2 hidden sm:block md:hidden">Visible 480px - 768px (sm)</div>
          <div className="bg-yellow-200 p-2 hidden md:block lg:hidden">Visible 768px - 1024px (md)</div>
          <div className="bg-purple-200 p-2 hidden lg:block xl:hidden">Visible 1024px - 1280px (lg)</div>
          <div className="bg-pink-200 p-2 hidden xl:block 2xl:hidden">Visible 1280px - 1536px (xl)</div>
          <div className="bg-gray-200 p-2 hidden 2xl:block">Visible &gt; 1536px (2xl)</div>
        </div>
      </div>

      {/* Test des boutons optimisés tactile */}
      <div className="space-y-4">
        <h3 className="font-bold">Boutons optimisés tactile</h3>
        <div className="flex flex-wrap gap-3">
          <TouchOptimizedButton variant="primary" size="sm">Petit</TouchOptimizedButton>
          <TouchOptimizedButton variant="primary" size="md">Moyen</TouchOptimizedButton>
          <TouchOptimizedButton variant="primary" size="lg">Grand</TouchOptimizedButton>
          <TouchOptimizedButton variant="outline">Contour</TouchOptimizedButton>
          <TouchOptimizedButton variant="ghost">Fantôme</TouchOptimizedButton>
        </div>
      </div>

      {/* Test du responsive grid */}
      <div className="space-y-4">
        <h3 className="font-bold">Grille responsive</h3>
        <ResponsiveGrid 
          cols={{ 
            default: 1, 
            xs: 1, 
            sm: 2, 
            md: 3, 
            lg: 4, 
            xl: 5,
            '2xl': 6
          }}
          gap="md"
        >
          {Array.from({ length: 12 }).map((_, i) => (
            <TouchOptimizedCard key={i} interactive>
              <div className="p-4 text-center">
                <Badge variant="secondary">Card {i + 1}</Badge>
                <p className="text-sm mt-2">Contenu responsive</p>
              </div>
            </TouchOptimizedCard>
          ))}
        </ResponsiveGrid>
      </div>

      {/* Tests des espacements responsive */}
      <div className="space-y-4">
        <h3 className="font-bold">Espacements responsive</h3>
        <div className="bg-blue-50 p-2 sm:p-4 md:p-6 lg:p-8">
          <div className="bg-white p-3 sm:p-4 md:p-5 lg:p-6 rounded">
            <p className="text-xs sm:text-sm md:text-base lg:text-lg">
              Texte avec taille responsive et padding adaptatif
            </p>
          </div>
        </div>
      </div>

      {/* Test des zones tactiles */}
      {isTouchDevice && (
        <div className="space-y-4">
          <h3 className="font-bold">Zones tactiles améliorées</h3>
          <div className="grid grid-cols-3 gap-2">
            <button className="mobile-touch bg-blue-500 text-white rounded">Zone 44px+</button>
            <button className="mobile-touch bg-green-500 text-white rounded">Touch OK</button>
            <button className="mobile-touch bg-purple-500 text-white rounded">Accessible</button>
          </div>
        </div>
      )}
    </div>
  );
}