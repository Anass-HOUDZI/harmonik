
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center my-8 py-8 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-gray-200">
      <div className="text-center space-y-4">
        <div className="text-gray-600 text-base">
          Copyright © 2025 - Tous droits réservés
        </div>
        <div className="flex items-center justify-center">
          <span className="text-gray-500 mr-2">Créé par</span>
          <a
            href="https://www.linkedin.com/in/anasshoudzi/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
            </svg>
            Anass Houdzi
          </a>
        </div>
      </div>
    </footer>
  );
}
