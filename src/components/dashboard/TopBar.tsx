import React from 'react';
import { ThemeToggle } from '../ThemeToggle';
import { LanguageToggle } from '../LanguageToggle';
import { useTranslation } from 'react-i18next';

export function TopBar() {
  const { t } = useTranslation();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold">{t('common.dashboard')}</h1>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
