import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'pie-chart-outline',
    link: '/pages/dashboard',
    home: true,
  },

  {
    title: 'Game',
    icon: 'tv-outline',
    children: [
      {
        title: 'Add Game',
        icon: 'plus-circle-outline',
        link: '/pages/game/add_game/0',
      },
      {
        title: 'Game Report',
        icon: 'file-text-outline',
        link: '/pages/game/report',
      }
    ],
  },
  {
    title: 'User',
    icon: 'person-outline',
    children: [
      {
        title: 'Add User',
        icon: 'plus-circle-outline',
        link: '/pages/user/add_user/0',
      },
      {
        title: 'User Report',
        icon: 'file-text-outline',
        link: '/pages/user/report',
      }
    ],
  },

  {
    title: 'Category',
    icon: 'flash-outline',
    children: [
      {
        title: 'Add Category',
        icon: 'plus-circle-outline',
        link: '/pages/category/add_category/0',
      },
      {
        title: 'Category Report',
        icon: 'file-text-outline',
        link: '/pages/category/report',
      }
    ],
  },
];
