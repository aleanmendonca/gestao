import React from 'react';
import { Cloud } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LogoProps {
  collapsed?: boolean;
}

export function Logo({ collapsed }: LogoProps) {
  return (
    <div className="flex items-center">
      <Cloud className="h-8 w-8 text-primary" />
      <span className={cn(
        "ml-2 text-xl font-bold transition-opacity duration-300",
        collapsed ? "opacity-0 w-0" : "opacity-100"
      )}>
        Gestão Cloud
      </span>
    </div>
  );
}
