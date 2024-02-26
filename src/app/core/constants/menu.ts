import {MenuItem} from '../models/menu.model';

export class Menu {
  public static pages: MenuItem[] = [
    {
      group: 'Dashboard',
      items: [
        {
          icon: 'important_devices',
          label: 'Dashboard',
          route: '/modules/pages/dashboard'
        },

      ]
    },
    {
      group: 'Pages',
      items: [
        {
          icon: 'create_new_folder',
          label: 'Create Product',
          route: '/modules/pages/createProduct'
        },
        {
          icon: 'view_list ',
          label: 'Over View',
          route: '/modules/pages/overView'
        },

      ]
    },
  ];
}
