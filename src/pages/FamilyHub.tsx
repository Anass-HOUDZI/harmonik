import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, Calculator, Utensils, Heart, Clock, BookOpen, Users, Home, Gamepad2, ShoppingCart, Baby, Stethoscope, PiggyBank, TrendingUp, DollarSign, AlertTriangle, Plane, Wallet, GraduationCap, Brain, Library, HelpCircle, Activity, Dumbbell, Apple, Scale, Droplets, ChefHat, UserCheck, Briefcase, Target, Smile, Trophy, Coffee, MessageCircle, FolderOpen, Sun, CloudRain, PartyPopper, Puzzle, MapPin, Ruler, Tag, UtensilsCrossed, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FamilyHubSearchFilters from "@/components/family-hub/FamilyHubSearchFilters";
import FamilyHubStats from "@/components/family-hub/FamilyHubStats";
import FamilyHubToolCard from "@/components/family-hub/FamilyHubToolCard";
import { tools } from "@/data/toolsData";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  route: string;
  priority: number;
  status: 'available' | 'coming-soon' | 'beta';
}

const categories = ['Tous', 'Organisation', 'Finances', 'Éducation', 'Santé', 'Équilibre', 'Développement', 'Loisirs', 'Pratique'];

export default function FamilyHub() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('Tous');

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tous' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🏠 Suite Famille
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              60 outils gratuits pour simplifier la vie de famille.
              Organisez, planifiez et profitez ensemble en toute simplicité.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <FamilyHubSearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        {/* Stats */}
        <FamilyHubStats />

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <FamilyHubToolCard tool={tool} key={tool.id} />
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">Aucun outil trouvé</div>
            <p className="text-gray-500">Essayez de modifier vos critères de recherche</p>
          </div>
        )}

        {/* Features Section */}
        <section className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Pourquoi choisir Suite Famille ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Confidentialité Totale</h3>
              <p className="text-gray-600 text-sm">
                Vos données restent sur votre appareil. Aucune transmission, aucun serveur externe.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">100% Gratuit</h3>
              <p className="text-gray-600 text-sm">
                Tous les outils sont gratuits, sans pub, sans abonnement, sans version premium.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pensé Famille</h3>
              <p className="text-gray-600 text-sm">
                Interface adaptée à tous les âges, du plus petit au plus grand de la famille.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
