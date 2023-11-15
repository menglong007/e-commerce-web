import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./user.component";
import {FormComponent} from "./form.component/form.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {SharedModule} from "../shared/shared.module";
import {ColumnEditableComponent} from "./column-editable/column-editable.component";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatMenuModule} from "@angular/material/menu";
import {CdkDrag, CdkDragHandle, CdkDragPlaceholder, CdkDragPreview, CdkDropList} from "@angular/cdk/drag-drop";
import {DragDropModule} from '@angular/cdk/drag-drop';

const routes: Routes = [

  // {path: '', redirectTo: 'user', pathMatch: 'full'},
  { path: 'user', component: UserComponent},
  // { path: '**', redirectTo: 'user', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    FormComponent,
    UserComponent,
    ColumnEditableComponent,
  ],
  exports: [
    ColumnEditableComponent
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
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    FormsModule,
    CdkDropList,
    CdkDrag,
    CdkDragPlaceholder,
    CdkDragPreview,
    CdkDragHandle,
    DragDropModule
  ]
})
export class UserManagementModule {
}
