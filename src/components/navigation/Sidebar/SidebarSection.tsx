import React from 'react';
    import { LucideIcon, ChevronDown } from 'lucide-react';
    import { cn } from '../../../lib/utils';
    import { SidebarItem } from './SidebarItem';

    interface SidebarSectionProps {
      icon: LucideIcon;
      label: string;
      items: Array<{
        href: string;
        label: string;
        icon?: LucideIcon;
      }>;
      collapsed?: boolean;
    }

    export function SidebarSection({ icon: Icon, label, items, collapsed }: SidebarSectionProps) {
      const [isOpen, setIsOpen] = React.useState(false);

      return (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              'w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md',
              'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700',
              collapsed && "justify-center"
            )}
            title={collapsed ? label : undefined}
          >
            <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="flex-1 text-left">{label}</span>}
            {!collapsed && <ChevronDown
              className={cn(
                'h-5 w-5 transition-transform',
                isOpen && 'transform rotate-180'
              )}
            />}
          </button>
          
          {isOpen && !collapsed && (
            <div className="mt-1 space-y-1 pl-10">
              {items.map((item) => (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon || (() => null)}
                  label={item.label}
                  collapsed={collapsed}
                />
              ))}
            </div>
          )}
        </div>
      );
    }
