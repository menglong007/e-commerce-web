import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {SalaryComponent} from "./salary/salary.component";
import {SalaryFormComponent} from "./salary-form/salary-form.component";

const routes: Routes = [
  {
    path: '',
    component: SalaryComponent,
  },
  {
    path: 'form',
    component: SalaryFormComponent,
  },
  {
    path: 'form/:id',
    component: SalaryFormComponent,
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
export class SalaryModules {
}
