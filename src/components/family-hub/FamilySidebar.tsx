
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, BadgeCheck, BookText, HeartPulse, List, Settings } from "lucide-react";

const categories = [
  { label: "Tous", icon: Home },
  { label: "Organisation", icon: List },
  { label: "Finances", icon: BadgeCheck },
  { label: "Éducation", icon: BookText },
  { label: "Santé", icon: HeartPulse },
  { label: "Équilibre", icon: Settings },
  { label: "Développement", icon: BookText },
  { label: "Loisirs", icon: HeartPulse },
  { label: "Pratique", icon: List },
];

interface Props {
  selected: string;
  onSelect: (cat: string) => void;
}

export function FamilySidebar({ selected, onSelect }: Props) {
  const { isMobile } = useSidebar();
  return (
    <Sidebar className="bg-blue-50/80 border-none shadow-lg">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Catégories</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map(cat => (
                <SidebarMenuItem key={cat.label}>
                  <SidebarMenuButton
                    isActive={cat.label === selected}
                    onClick={() => onSelect(cat.label)}
                  >
                    <cat.icon className={`w-5 h-5 mr-2 
                      ${cat.label === selected ? "text-blue-700" : "text-blue-400"}`}
                    />
                    <span>{cat.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
