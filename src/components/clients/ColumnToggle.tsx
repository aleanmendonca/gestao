import React from 'react';
import { Button } from '../ui/Button';
import { Settings } from 'lucide-react';

interface ColumnToggleProps {
  columns: string[];
  onChange: (columns: string[]) => void;
}

export function ColumnToggle({ columns, onChange }: ColumnToggleProps) {
  return (
    <div className="relative">
      <Button variant="outline" className="space-x-2">
        <Settings className="h-4 w-4" />
        <span>Colunas</span>
      </Button>
    </div>
  );
}
