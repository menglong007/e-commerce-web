import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ScoreComponent} from "./score/score.component";
import {ScoreFormComponent} from "./score-form/score-form.component";

const routes: Routes = [
  {
    path: '',
    component: ScoreComponent,
  },
  {
    path: 'form',
    component: ScoreFormComponent,
  },
  {
    path: 'form/:id',
    component: ScoreFormComponent,
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
export class ScoreModules {
}
