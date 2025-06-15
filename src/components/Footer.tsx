
import React from "react";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center items-center py-5 mt-12 bg-gradient-to-br from-white/90 to-blue-50 border-t border-gray-100 text-center text-gray-500 text-sm">
      <span>
        Copyright © 2025&nbsp;
        <a
          href="https://www.linkedin.com/in/anasshoudzi/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-medium"
        >
          Anass Houdzi
        </a>
        &nbsp;– Tous droits réservés.
      </span>
    </footer>
  );
}
