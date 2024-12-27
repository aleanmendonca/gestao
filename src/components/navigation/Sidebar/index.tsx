import React from 'react';
import { SidebarHeader } from './SidebarHeader';
import { SidebarNav } from './SidebarNav';

export function Sidebar() {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 pt-5 pb-4">
          <SidebarHeader />
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
