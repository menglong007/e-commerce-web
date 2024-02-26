import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModulesComponent} from './modules.component';
import {RouterModule, Routes} from "@angular/router";
import {LayoutModule} from "./layout/layout.module";
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {
    path: '',
    component: ModulesComponent,
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then((m) => m.PagesModule),
      },
    ]
  },

];

@NgModule({
  declarations: [
    ModulesComponent,
    PagesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutModule,
  ]
})
export class ModulesModule {
}
