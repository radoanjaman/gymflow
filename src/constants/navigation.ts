import { BookOpen, Compass } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: typeof Compass;
  exact?: boolean;
}

/**
 * Public pages available from the mobile navigation.
 */
export const MOBILE_NAV_ITEMS: NavItem[] = [
  {
    label: 'Discover',
    href: '/discover',
    icon: Compass,
  },
  {
    label: 'Exercises',
    href: '/exercises',
    icon: BookOpen,
  },
];

/**
 * Public pages available from the desktop sidebar.
 */
export const DESKTOP_NAV_ITEMS: NavItem[] = [
  {
    label: 'Discover',
    href: '/discover',
    icon: Compass,
  },
  {
    label: 'Exercise Library',
    href: '/exercises',
    icon: BookOpen,
  },
];
