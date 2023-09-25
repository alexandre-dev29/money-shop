import { NavItem } from 'types';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: 'Shop Manage',
  description: 'This is an application to manage all your shops',
  mainNav: [
    {
      title: 'Home',
      href: '/',
      needsAdminRights: false,
    },
    {
      title: 'Transactions',
      href: '/transactions',
      needsAdminRights: false,
    },
    {
      title: 'Accounts',
      href: '/accounts',
      needsAdminRights: true,
    },
  ] as NavItem[],
};
