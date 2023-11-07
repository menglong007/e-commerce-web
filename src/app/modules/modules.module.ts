import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModulesComponent} from './modules.component';
import {RouterModule, Routes} from "@angular/router";
import {LayoutModule} from "./layout/layout.module";

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: 'userManagement',
        loadChildren: () => import('./user-management/user-management.module').then((m) => m.UserManagementModule),
      },
      // {path: '', redirectTo: 'userManagement', pathMatch: 'full'},
    ],
  },
];

@NgModule({
  declarations: [
    ModulesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
  ]
})
export class ModulesModule {
}
