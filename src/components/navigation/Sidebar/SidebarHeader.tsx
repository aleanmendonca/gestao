import React from 'react';
import { Cloud } from 'lucide-react';

export function SidebarHeader() {
  return (
    <div className="flex items-center flex-shrink-0 px-4">
      <div className="flex items-center">
        <Cloud className="h-8 w-8 text-blue-500" />
        <span className="ml-2 text-xl font-bold">Gestão Cloud</span>
      </div>
    </div>
  );
}
