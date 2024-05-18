import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SubjectComponent} from "./subject/subject.component";
import {SubjectFormComponent} from "./subject-form/subject-form.component";

const routes: Routes = [
  {
    path: '',
    component: SubjectComponent,
  },
  {
    path: 'form',
    component: SubjectFormComponent,
  },
  {
    path: 'form/:id',
    component: SubjectFormComponent,
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
export class SubjectModules {
}
