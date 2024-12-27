import React from 'react';
import { cn } from '../../lib/utils';
import { useUserStore } from '../../store/user';
import { useClerk } from '@clerk/clerk-react';

interface UserInfoProps {
  collapsed?: boolean;
}

export function UserInfo({ collapsed }: UserInfoProps) {
  const { name, email, photo } = useUserStore();
  const { user } = useClerk();

  return (
    <div className={cn(
      "p-4 flex items-center border-t border-gray-200 dark:border-gray-700",
      collapsed ? "justify-center" : "justify-start"
    )}>
      <img
        src={photo || user?.imageUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"}
        alt="User"
        className={cn(
          "h-10 w-10 rounded-full object-cover",
          collapsed ? "" : "mr-3"
        )}
      />
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {user?.firstName || name}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {user?.emailAddresses[0]?.emailAddress || email}
          </span>
        </div>
      )}
    </div>
  );
}
