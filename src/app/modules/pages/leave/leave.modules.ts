import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LeaveComponent} from "./leave/leave.component";
import {LeaveFormComponent} from "./leave-form/leave-form.component";

const routes: Routes = [
  {
    path: '',
    component: LeaveComponent,
  },
  {
    path: 'form',
    component: LeaveFormComponent,
  },
  {
    path: 'form/:id',
    component: LeaveFormComponent,
  },
];

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

  ]
})
export class LeaveModules {
}
