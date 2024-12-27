import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  className?: string;
}

export function StatCard({ title, value, icon: Icon, description, className }: StatCardProps) {
  return (
    <div className={`rounded-xl p-6 text-white shadow-lg transform transition-all duration-200 hover:scale-105 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-white/10 rounded-lg">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-sm font-medium opacity-90">{title}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm opacity-75">{description}</p>
      </div>
    </div>
  );
}
