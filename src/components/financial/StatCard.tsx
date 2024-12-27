import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
}

export function StatCard({ title, value, icon: Icon, description }: StatCardProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <Icon className="h-6 w-6 text-blue-400" />
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}
