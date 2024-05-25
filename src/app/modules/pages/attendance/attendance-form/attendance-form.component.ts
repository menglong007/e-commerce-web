import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgxMatTimepickerModule} from "ngx-mat-timepicker";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-salary-form',
  templateUrl: './attendance-form.component.html',
  imports: [
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSelectModule,
    NgForOf,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    NgxMatTimepickerModule,
    MatSnackBarModule,
    NgClass
  ],
  standalone: true,
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    DatePipe
  ],
})
export class AttendanceFormComponent implements OnInit {
  title: string = 'Add Attendance';

  form = new FormGroup({
    staffId: new FormControl<string | null>('', [Validators.required]),
    startTime: new FormControl<string | null>(null, [Validators.required]),
    endTime: new FormControl<string | null>(null, [Validators.required]),
    subjectId: new FormControl<string | null>('', [Validators.required]),
    status: new FormControl<boolean | null>(true, [Validators.required]),
  });
  Staff: any;
  StaffName: any;
  SubjectName:any;

  constructor(
    private http: HttpClient,
    private _activatedRoute : ActivatedRoute,
    private router : Router,
    private snackBar : MatSnackBar
  ) {}

  id : string | null = null;
  Subject : any;

  ngOnInit(): void {
    this.loadStaff();
    this.loadSubject();
    this._activatedRoute.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.id = params.id;
          this.title = 'Edit Attendance Form';
          this.loadData(params.id);
        }
      }
    });
  }

  private loadData(id : string) {
    const ref = this.snackBar.open('Loading...!');
      this.http.get(`http://127.0.0.1:8000/api/attendance/${id}`).subscribe({
        complete:()=>{
          ref.dismiss();
        },
        next: (value: any) => {
          this.form.patchValue(value.data);
          this.SubjectName = value.data.subjectName;
          this.StaffName = value.data.staffName;
        },
      });

  }

  private loadStaff() {
    this.http.get('http://127.0.0.1:8000/api/staff').subscribe({
      next: (value: any) => {
        this.Staff = value.data;
      },
    });
  }

  private loadSubject() {
    this.http.get('http://127.0.0.1:8000/api/subject').subscribe({
      next: (value: any) => {
        this.Subject = value.subject;
      },
    });
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.id) {
      this.onUpdate();
    } else {
      this.onInsert();
    }
  }

  onInsert() {
    const body = this.form.getRawValue();
    this.http.post('http://127.0.0.1:8000/api/attendance', body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/attendance']).finally();
      },
    });
  }

  onUpdate() {
    const body = this.form.getRawValue();
    this.http.put(`http://127.0.0.1:8000/api/attendance/edit/${this.id}`, body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/attendance']).finally();
      },
    });
  }
}
