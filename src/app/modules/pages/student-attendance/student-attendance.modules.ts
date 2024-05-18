import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StudentAttendanceComponent} from "./student-attendance/student-attendance.component";
import {StudentAttendanceFormComponent} from "./student-attendance-form/student-attendance-form.component";

const routes: Routes = [
  {
    path: '',
    component: StudentAttendanceComponent,
  },
  {
    path: 'form',
    component: StudentAttendanceFormComponent,
  },
  {
    path: 'form/:id',
    component: StudentAttendanceFormComponent,
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
export class StudentAttendanceModules {
}
