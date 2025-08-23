import React from 'react';
import { PageContainer } from '@/components/ui/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, Shield, Wifi, Users, Heart, Target, Zap, Globe } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <PageContainer>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              À propos de notre suite d'Harmonik
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre mission : simplifier et enrichir la vie des familles modernes avec des outils gratuits, sécurisés et accessibles.
            </p>
          </div>

          {/* Mission */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Target className="w-6 h-6 mr-2 text-primary" />
                Notre Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous croyons que chaque famille mérite d'avoir accès à des outils de qualité pour s'organiser, 
                grandir et s'épanouir ensemble. Notre suite de 39 outils gratuits est conçue pour répondre aux
                défis quotidiens des familles modernes, de la gestion du budget à l'éducation des enfants, 
                en passant par l'organisation du quotidien et le bien-être familial.
              </p>
            </CardContent>
          </Card>

          {/* Valeurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 mx-auto text-green-600 mb-2" />
                <CardTitle className="text-lg">100% Gratuit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Tous nos outils sont entièrement gratuits, sans frais cachés ni abonnements.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Shield className="w-12 h-12 mx-auto text-blue-600 mb-2" />
                <CardTitle className="text-lg">Sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Vos données restent privées et sécurisées, stockées localement sur votre appareil.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Wifi className="w-12 h-12 mx-auto text-purple-600 mb-2" />
                <CardTitle className="text-lg">Hors ligne</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Utilisez nos outils même sans connexion internet, parfait pour tous les moments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Globe className="w-12 h-12 mx-auto text-orange-600 mb-2" />
                <CardTitle className="text-lg">Multi-plateformes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">
                  Accessible sur ordinateur, tablette et smartphone pour toute la famille.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Catégories */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Users className="w-6 h-6 mr-2 text-primary" />
                Nos 8 Catégories d'Outils
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Home className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Organisation (4 outils)</h4>
                      <p className="text-gray-600">Calendrier familial, gestionnaire corvées, listes courses...</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Finances (5 outils)</h4>
                      <p className="text-gray-600">Budget familial, épargne, frais garde, argent poche...</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Target className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Éducation (8 outils)</h4>
                      <p className="text-gray-600">Suivi scolaire, aide aux devoirs, activités éducatives...</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-red-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Santé (8 outils)</h4>
                      <p className="text-gray-600">Carnet de santé, suivi sommeil, nutrition, fitness...</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-yellow-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Équilibre (7 outils)</h4>
                      <p className="text-gray-600">Gestion du temps, télétravail, productivité parentale...</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Développement (8 outils)</h4>
                      <p className="text-gray-600">Objectifs famille, gratitude, communication, projets...</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-pink-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Loisirs (8 outils)</h4>
                      <p className="text-gray-600">Activités famille, jeux, sorties, créativité...</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Zap className="w-5 h-5 text-gray-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Outils Pratiques (4 outils)</h4>
                      <p className="text-gray-600">Convertisseur, générateur étiquettes, calculateurs...</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vision */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl">
                <Heart className="w-6 h-6 mr-2 text-primary" />
                Notre Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous imaginons un monde où chaque famille, quelle que soit sa situation, dispose des outils 
                nécessaires pour s'épanouir. En rendant ces ressources gratuites et accessibles, nous contribuons 
                à créer des familles plus organisées, plus heureuses et plus connectées.
              </p>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}