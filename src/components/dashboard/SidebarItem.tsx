import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarItemProps {
  href: string;
  icon?: LucideIcon;
  label: string;
  collapsed?: boolean;
}

export function SidebarItem({ href, icon: Icon, label, collapsed }: SidebarItemProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          "flex items-center px-2 py-2 text-sm font-medium rounded-md",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
          collapsed && "justify-center"
        )
      }
      title={collapsed ? label : undefined}
    >
      {Icon && <Icon className="h-5 w-5 flex-shrink-0" />}
      {!collapsed && <span className="ml-3">{label}</span>}
    </NavLink>
  );
}
