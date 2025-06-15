
import React from "react";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbSeparator, BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AppBreadcrumbProps {
  items: {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    isCurrent?: boolean;
  }[];
  showHomeCTA?: boolean;
  homeTo?: string;
  className?: string;
}

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({
  items,
  showHomeCTA = true,
  homeTo = "/",
  className = "",
}) => {
  const navigate = useNavigate();
  return (
    <div className={`flex items-center gap-3 mb-6 mt-2 w-full max-w-5xl mx-auto px-2 sm:px-0 ${className}`}>
      {/* CTA retour home - bien visible */}
      {showHomeCTA && (
        <button
          onClick={() => navigate(homeTo)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg shadow bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400"
          aria-label="Retour à l'accueil"
        >
          <Home className="w-5 h-5" />
          <span className="hidden sm:inline">Accueil</span>
        </button>
      )}
      <div className="flex-1">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, idx) => (
              <React.Fragment key={item.label}>
                <BreadcrumbItem>
                  {item.isCurrent ? (
                    <BreadcrumbPage className="font-bold text-blue-900">{item.label}</BreadcrumbPage>
                  ) : item.href ? (
                    <BreadcrumbLink href={item.href} className="hover:text-blue-800 flex items-center gap-1 text-blue-700">
                      {item.icon}
                      {item.label}
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-blue-700 font-medium">{item.label}</span>
                  )}
                </BreadcrumbItem>
                {idx < items.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default AppBreadcrumb;
