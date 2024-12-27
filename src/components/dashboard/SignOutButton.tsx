import React from 'react';
import { LogOut } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useClerk } from '@clerk/clerk-react';

interface SignOutButtonProps {
  collapsed?: boolean;
}

export function SignOutButton({ collapsed }: SignOutButtonProps) {
  const { signOut } = useClerk();

  return (
    <button
      onClick={() => signOut(() => {})}
      className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-md",
        "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700",
        collapsed && "justify-center"
      )}
      title={collapsed ? 'Sair' : undefined}
    >
      <LogOut className="h-5 w-5 flex-shrink-0" />
      {!collapsed && <span className="ml-3">Sair</span>}
    </button>
  );
}
