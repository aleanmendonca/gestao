import React from 'react';
import { NavLink } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  name: string;
}

export function SidebarLink({ href, icon: Icon, name }: SidebarLinkProps) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        cn(
          'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
          isActive
            ? 'bg-gray-100 dark:bg-gray-700 text-primary'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
        )
      }
    >
      <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
      {name}
    </NavLink>
  );
}
