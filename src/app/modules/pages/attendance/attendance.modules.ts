import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AttendanceComponent} from "./attendance/attendance.component";
import {AttendanceFormComponent} from "./attendance-form/attendance-form.component";

const routes: Routes = [
  {
    path: '',
    component: AttendanceComponent,
  },
  {
    path: 'form',
    component: AttendanceFormComponent,
  },
  {
    path: 'form/:id',
    component: AttendanceFormComponent,
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
export class AttendanceModules {
}
