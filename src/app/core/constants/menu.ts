import {MenuItem} from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [{
      group: 'User Management',
      items: [
        {
          icon: 'person',
          label: 'User',
          route: '/modules/userManagement/user'
        },
      ]
    },
  ];
}
