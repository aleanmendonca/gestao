import React from 'react';
import { Languages } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguageStore } from '../store/language';

export function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    const newLang = language === 'pt-BR' ? 'en-US' : 'pt-BR';
    setLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800',
        className
      )}
    >
      <Languages className="h-5 w-5" />
    </button>
  );
}
