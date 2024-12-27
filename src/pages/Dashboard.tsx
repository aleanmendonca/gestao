import React from 'react';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">{t('common.dashboard')}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Bem-vindo ao seu painel de gestão.
        </p>
      </div>
    </div>
  );
}
