export interface MenuEntity {
  title: string;
  path: string;
  children?: Array<MenuEntity>;
}

export const mainMenu: MenuEntity[] = [
  { title: 'Agency', path: '/agency-manager' },
  {
    title: 'Leads',
    path: '/lead-manager',
    children: [{ title: 'Quotes', path: '/quote-manager' }],
  },
  { title: 'Builder', path: '/builder-manager' },
  { title: 'Presentation', path: '/presentation-manager' },
  {
    title: 'Settings',
    path: '/setting-manager',
    children: [
      { title: 'Products', path: '/product-manager' },
      { title: 'Users', path: '/user-manager' },
    ],
  },
];
