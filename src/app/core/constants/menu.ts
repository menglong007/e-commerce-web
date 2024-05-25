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
      group: 'Staff',
      items: [
        {
          icon: 'group',
          label: 'Staff',
          route: '/modules/pages/staff'
        },
        {
          icon: 'person_remove',
          label: 'Leave',
          route: '/modules/pages/leave'
        },
        {
          icon: 'real_estate_agent',
          label: 'Salary',
          route: '/modules/pages/salary'
        },
        {
          icon: 'inventory',
          label: 'Attendance',
          route: '/modules/pages/attendance'
        },
        {
          icon: 'bookmark_manager',
          label: 'subject',
          route: '/modules/pages/subject'
        },
      ]
    },
    {
      group: 'Student',
      items: [
        {
          icon: 'diversity_3',
          label: 'Student',
          route: '/modules/pages/student'
        },
        {
          icon: 'inventory',
          label: 'student-attendance',
          route: '/modules/pages/student-attendance'
        },
        // {
        //   icon: 'inventory',
        //   label: 'score',
        //   route: '/modules/pages/score'
        // },

      ]
    },
  ];
}
