import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StudentComponent} from "./student/student.component";
import {StudentFormComponent} from "./student-form/student-form.component";

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
  },
  {
    path: 'form',
    component: StudentFormComponent,
  },
  {
    path: 'form/:id',
    component: StudentFormComponent,
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
export class StudentModules {
}
