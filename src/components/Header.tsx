import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const categories = [
  'Tous',
  'Organisation',
  'Finances', 
  'Éducation',
  'Santé',
  'Équilibre',
  'Développement',
  'Loisirs',
  'Outils Pratiques'
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo - optimisé mobile */}
          <Link to="/" className="flex items-center touch-active">
            <img 
              src="/lovable-uploads/8cf4d205-9fcb-4a56-addb-83651efd3a50.png" 
              alt="Harmonik" 
              className="h-6 sm:h-8 w-auto object-contain"
            />
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg touch-active">
              À propos
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors py-2 px-3 rounded-lg touch-active">
              Contact
            </Link>
          </nav>

          {/* Menu mobile - zone tactile agrandie */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-touch touch-active p-3"
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Menu mobile déroulant - optimisé tactile */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-background animate-fade-in">
            <div className="py-3 space-y-1">
              <Link 
                to="/about" 
                className="block mobile-touch text-sm font-medium hover:bg-accent rounded-lg transition-colors touch-active"
                onClick={() => setIsMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="block mobile-touch text-sm font-medium hover:bg-accent rounded-lg transition-colors touch-active"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}