import React from 'react';
import { Construction } from 'lucide-react';

interface UnderConstructionProps {
  pageName: string;
}

export function UnderConstruction({ pageName }: UnderConstructionProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
      <Construction className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-semibold mb-2">Página em Construção</h2>
      <p className="text-gray-400">{pageName} estará disponível em breve!</p>
    </div>
  );
}
