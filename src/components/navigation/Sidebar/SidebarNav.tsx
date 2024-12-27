import React from 'react';
    import { useTranslation } from 'react-i18next';
    import { 
      LayoutDashboard, 
      Users,
      Settings,
      Wallet,
      UserPlus,
      Building2,
      Briefcase,
      UserCog,
      CreditCard,
      ShoppingBag,
      FileText,
      Package,
      Boxes,
      BarChart2,
      ListChecks
    } from 'lucide-react';
    import { SidebarItem } from './SidebarItem';
    import { SidebarSection } from './SidebarSection';

    interface NavItem {
      id: string;
      label: string;
      icon: React.ComponentType;
      href?: string;
      submenu?: {
        href: string;
        label: string;
        icon?: React.ComponentType;
      }[];
    }

    export function SidebarNav() {
      const { t } = useTranslation();

      const navigation: NavItem[] = [
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
            { href: '/dashboard/sales', label: 'Visão Geral', icon: BarChart2 },
            { href: '/dashboard/sales/products', label: 'Produtos', icon: Package },
            { href: '/dashboard/sales/services', label: 'Serviços', icon: Briefcase },
            { href: '/dashboard/sales/quotes', label: 'Orçamentos', icon: FileText },
          ]
        },
        {
          id: 'financial',
          label: t('navigation.financial'),
          icon: Wallet,
          submenu: [
            { href: '/dashboard/financial', label: 'Visão Geral', icon: BarChart2 },
            { href: '/dashboard/financial/income', label: 'Entradas', icon: ShoppingBag },
            { href: '/dashboard/financial/expenses', label: 'Saídas', icon: CreditCard },
          ]
        },
        {
          id: 'registers',
          label: t('navigation.registers'),
          icon: Users,
          submenu: [
            { href: '/dashboard/registers/clients', label: 'Clientes', icon: UserPlus },
            { href: '/dashboard/registers/suppliers', label: 'Fornecedores', icon: Building2 },
            { href: '/dashboard/registers/services', label: 'Serviços', icon: Briefcase },
            { href: '/dashboard/registers/professionals', label: 'Profissionais', icon: UserCog },
            { href: '/dashboard/registers/accounts', label: 'Contas', icon: CreditCard },
          ]
        },
        {
          id: 'controls',
          label: t('navigation.controls'),
          icon: Package,
          submenu: [
            { href: '/dashboard/controls/stock', label: 'Estoque', icon: Package },
            { href: '/dashboard/controls/supplies', label: 'Insumos', icon: Boxes },
          ]
        },
        {
          id: 'plans',
          label: 'Planos',
          icon: ListChecks,
          href: '/dashboard/plans'
        },
        {
          id: 'settings',
          label: t('navigation.settings'),
          icon: Settings,
          submenu: [
            { href: '/dashboard/settings', label: 'Geral', icon: Settings },
          ]
        }
      ];

      return (
        <nav className="mt-8 flex-1 space-y-1 px-2">
          {navigation.map((item) => {
            if (item.submenu) {
              return (
                <SidebarSection
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  items={item.submenu}
                />
              );
            } else {
              return (
                <SidebarItem
                  key={item.id}
                  href={item.href!}
                  icon={item.icon}
                  label={item.label}
                />
              );
            }
          })}
        </nav>
      );
    }
