export interface NavigationItem {
  href: string;
  label: string;
  icon?: React.ComponentType;
}

export interface NavigationSection {
  label: string;
  icon: React.ComponentType;
  items: NavigationItem[];
}
