import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {FormComponent} from "./form.component/form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [

  // {path: '', redirectTo: 'user', pathMatch: 'full'},
  { path: 'user', component: UserComponent},
  // { path: '**', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    FormComponent,

  ],
  exports: [
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    SharedModule,

  ]
})
export class UserManagementModule {
}
