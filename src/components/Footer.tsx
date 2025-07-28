
import React from "react";
import { Link } from "react-router-dom";
import { Home, Mail, Phone, Users, Wrench } from "lucide-react";

const categories = [
  { name: 'Organisation', count: 6 },
  { name: 'Finances', count: 8 },
  { name: 'Éducation', count: 8 },
  { name: 'Santé', count: 8 },
  { name: 'Équilibre', count: 8 },
  { name: 'Développement', count: 8 },
  { name: 'Loisirs', count: 8 },
  { name: 'Outils Pratiques', count: 4 }
];

const popularTools = [
  { name: 'Calendrier Familial', route: '/tools/calendar' },
  { name: 'Planificateur Repas', route: '/tools/meals' },
  { name: 'Calculateur Budget', route: '/tools/budget' },
  { name: 'Carnet de Santé', route: '/tools/health' },
  { name: 'Gestionnaire Temps', route: '/tools/time' },
  { name: 'Planning Devoirs', route: '/tools/homework' }
];

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* À propos */}
          <div id="about" className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Home className="w-5 h-5 mr-2 text-primary" />
              <Link to="/about" className="hover:text-primary transition-colors">
                À propos
              </Link>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Suite complète de 47 outils gratuits pour simplifier et enrichir la vie des familles modernes. 
              100% gratuit, sécurisé et utilisable hors ligne.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">100% Gratuit</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Sécurisé</span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Hors ligne</span>
            </div>
          </div>

          {/* Catégories */}
          <div id="categories" className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="w-5 h-5 mr-2 text-primary" />
              Catégories
            </h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.name}>
                  <Link 
                    to="/categories"
                    className="text-gray-600 hover:text-primary text-sm transition-colors duration-200 flex items-center justify-between"
                  >
                    <span>{category.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full">
                      {category.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Outils populaires */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Wrench className="w-5 h-5 mr-2 text-primary" />
              Outils populaires
            </h3>
            <ul className="space-y-2">
              {popularTools.map((tool) => (
                <li key={tool.name}>
                  <Link 
                    to={tool.route}
                    className="text-gray-600 hover:text-primary text-sm transition-colors duration-200 block"
                  >
                    {tool.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div id="contact" className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-primary" />
              <Link to="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </h3>
            <div className="space-y-3">
              <p className="text-gray-600 text-sm">
                Besoin d'aide ou d'une nouvelle fonctionnalité ?
              </p>
              <div className="space-y-2">
                <a 
                  href="mailto:ahoudzipro@gmail.com"
                  className="flex items-center text-gray-600 hover:text-primary text-sm transition-colors duration-200"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  ahoudzipro@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur et crédit */}
        <div className="border-t border-gray-300 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-600 text-sm">
              Copyright © 2025 - Tous droits réservés
            </div>
            <div className="flex items-center">
              <span className="text-gray-500 mr-2 text-sm">Créé par</span>
              <a
                href="https://www.linkedin.com/in/anasshoudzi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gradient-start to-gradient-end text-white font-bold rounded-xl hover:from-gradient-start/90 hover:to-gradient-end/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
                </svg>
                Anass Houdzi
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
