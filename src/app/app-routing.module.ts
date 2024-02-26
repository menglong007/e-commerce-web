import { NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    // canActivateChild: [() => inject(UnAuthGuard).canActivateChild()],
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'modules',
    // canActivateChild: [() => inject(AuthGuard).canActivateChild()],
    loadChildren: () => import('./modules/modules.module').then((m) => m.ModulesModule),
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
