
import React from "react";
import { useNavigate } from "react-router-dom";

// Props: title, icon, gradient (string tailwind), icon color
interface ToolNavHomeProps {
  icon: React.ReactNode;
  gradient?: string; // tailwind gradient classes
  iconBgColor?: string;
  children?: React.ReactNode;
}

export default function ToolNavHome({
  icon,
  gradient = "from-blue-100 via-teal-100 to-green-100",
  iconBgColor = "bg-blue-600",
  children,
}: ToolNavHomeProps) {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full flex justify-center mb-6 mt-2`}
    >
      <button
        tabIndex={0}
        type="button"
        aria-label="Retour à l'accueil"
        className={`
          flex items-center gap-3 px-5 py-3 rounded-full shadow-lg font-semibold text-lg
          bg-gradient-to-tr ${gradient}
          transition hover:scale-105 ring-2 ring-offset-2 ring-${iconBgColor.replace("bg-", "")}/80
          focus:outline-none focus:ring-2 focus:ring-blue-500
          animate-fade-in
        `}
        onClick={() => navigate("/")}
      >
        <span
          className={`
            ${iconBgColor} rounded-full p-2 flex items-center justify-center
          `}
        >
          {icon}
        </span>
        <span className="text-blue-900 font-bold drop-shadow-sm tracking-wide">Accueil</span>
        {children}
      </button>
    </div>
  );
}

