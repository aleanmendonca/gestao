import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Logo } from './Logo';
import { SidebarNav } from './SidebarNav';
import { cn } from '../../lib/utils';
import { UserInfo } from './UserInfo';
import { SignOutButton } from './SignOutButton';

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div className={cn(
      "flex flex-col border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        <Logo collapsed={collapsed} />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <ChevronLeft className={cn(
            "h-5 w-5 transition-transform",
            collapsed && "transform rotate-180"
          )} />
        </button>
      </div>
      <div className="flex flex-col flex-1">
        <SidebarNav collapsed={collapsed} />
        <div className="flex flex-col">
          <UserInfo collapsed={collapsed} />
          <SignOutButton collapsed={collapsed} />
        </div>
      </div>
    </div>
  );
}
