import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  Users,
  Package,
  Settings,
  ChevronDown,
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { SidebarItem } from './SidebarItem';

interface SidebarNavProps {
  collapsed?: boolean;
}

export function SidebarNav({ collapsed }: SidebarNavProps) {
  const { t } = useTranslation();
  const [openSections, setOpenSections] = React.useState<string[]>([]);

  const navigation = [
    {
      id: 'dashboard',
      label: t('common.dashboard'),
      icon: LayoutDashboard,
      href: '/dashboard'
    },
    {
      id: 'sales',
      label: t('navigation.sales'),
      icon: ShoppingBag,
      submenu: [
        { href: '/dashboard/sales', label: 'Visão Geral' },
        { href: '/dashboard/sales/products', label: 'Produtos' },
        { href: '/dashboard/sales/services', label: 'Serviços' },
        { href: '/dashboard/sales/quotes', label: 'Orçamentos' },
      ]
    },
    {
      id: 'financial',
      label: t('navigation.financial'),
      icon: Wallet,
      submenu: [
        { href: '/dashboard/financial', label: 'Visão Geral' },
        { href: '/dashboard/financial/income', label: 'Entradas' },
        { href: '/dashboard/financial/expenses', label: 'Saídas' },
      ]
    },
    {
      id: 'registers',
      label: t('navigation.registers'),
      icon: Users,
      submenu: [
        { href: '/dashboard/registers/clients', label: 'Clientes' },
        { href: '/dashboard/registers/suppliers', label: 'Fornecedores' },
        { href: '/dashboard/registers/services', label: 'Serviços' },
        { href: '/dashboard/registers/professionals', label: 'Profissionais' },
        { href: '/dashboard/registers/accounts', label: 'Contas' },
      ]
    },
    {
      id: 'controls',
      label: t('navigation.controls'),
      icon: Package,
      submenu: [
        { href: '/dashboard/controls/stock', label: 'Estoque' },
        { href: '/dashboard/controls/supplies', label: 'Insumos' },
      ]
    },
    {
      id: 'settings',
      label: t('navigation.settings'),
      icon: Settings,
      href: '/dashboard/settings'
    }
  ];

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      {navigation.map((item) => (
        <div key={item.id}>
          {item.submenu ? (
            <>
              <button
                onClick={() => toggleSection(item.id)}
                className={cn(
                  "w-full flex items-center px-2 py-2 text-sm font-medium rounded-md mb-1",
                  "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                <item.icon className="h-5 w-5 mr-2" />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      openSections.includes(item.id) && "transform rotate-180"
                    )} />
                  </>
                )}
              </button>
              {openSections.includes(item.id) && !collapsed && (
                <div className="ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <SidebarItem
                      key={subItem.href}
                      href={subItem.href}
                      label={subItem.label}
                      collapsed={collapsed}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <SidebarItem
              href={item.href!}
              icon={item.icon}
              label={item.label}
              collapsed={collapsed}
            />
          )}
        </div>
      ))}
    </nav>
  );
}
