import React from 'react';
import { User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function UserMenu() {
  const { t } = useTranslation();

  return (
    <button className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg p-2">
      <User className="h-5 w-5" />
      <span className="text-sm font-medium">Admin User</span>
    </button>
  );
}
