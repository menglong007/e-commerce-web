import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {MatDialogModule} from "@angular/material/dialog";
import {AttendanceModules} from "./attendance/attendance.modules";
import {PieComponent} from "./dashboard/pie-chart/pie.component";
import {BarChartComponent} from "./dashboard/bar-chart/bar-chart.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren : () => import('./dashboard/dashboard.modules').then((m) => m.DashboardModule),
  },
  {
    path: 'staff',
    loadChildren : () => import('./staff/staff.modules').then((m) => m.StaffModules),
  },
  {
    path: 'leave',
    loadChildren : () => import('./leave/leave.modules').then((m) => m.LeaveModules),
  },
  {
    path: 'salary',
    loadChildren : () => import('./salary/salary.modules').then((m) => m.SalaryModules),
  },
  {
    path: 'attendance',
    loadChildren : () => import('./attendance/attendance.modules').then((m) => m.AttendanceModules),
  },
  {
    path: 'subject',
    loadChildren : () => import('./subject/subject.modules').then((m) => m.SubjectModules),
  },
  {
    path: 'student',
    loadChildren : () => import('./student/student.modules').then((m) => m.StudentModules),
  },
  {
    path: 'student-attendance',
    loadChildren : () => import('./student-attendance/student-attendance.modules').then((m) => m.StudentAttendanceModules),
  },
];

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    PieComponent,
    BarChartComponent,
  ]
})
export class PagesModule {}
