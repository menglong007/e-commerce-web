import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";

const routes: Routes = [

  // {path: '', redirectTo: 'user', pathMatch: 'full'},
  { path: 'user', component: UserComponent},
  // { path: '**', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class UserManagementModule {
}
