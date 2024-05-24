import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {authGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivateChild: [authGuard],
    loadChildren: () => import('./modules/auth/auth-routing.module').then((m) => m.AuthRoutingModule),
  },
  {
    path: 'modules',
    canActivateChild: [authGuard],
    loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
