import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

const Gender = [
  {
    id: 'Male',
    name : 'Male'
  },
  {
    id: 'Female',
    name : 'Female'
  },

]

@Component({
  selector: 'app-salary-form',
  templateUrl: './student-attendance-form.component.html',
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
    MatSnackBarModule
  ],
  standalone: true,
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
})
export class StudentAttendanceFormComponent implements OnInit {
  title: string = 'Add Student Attendance';

  form = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required]),
    gender: new FormControl<string | null>(null, [Validators.required]),
    absent: new FormControl<number | null>(null, [Validators.required]),
    present: new FormControl<number | null>(null, [Validators.required]),
    status: new FormControl<boolean | null>(true, [Validators.required]),
  });
  Gender =Gender;

  constructor(
    private http: HttpClient,
    private _activatedRoute : ActivatedRoute,
    private router : Router,
    private snackBar: MatSnackBar
  ) {}

  id : string | null = null;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.id = params.id;
          this.title = 'Edit Student Attendance Form';
          this.loadData(params.id);
        }
      }
    });
  }

  private loadData(id : string) {
    const ref = this.snackBar.open('Loading...!');
      this.http.get(`http://127.0.0.1:8000/api/studentAttendance/${id}`).subscribe({
        complete:()=>{
          ref.dismiss();
        },
        next: (value: any) => {
          this.form.patchValue(value.data);
        },
      });

  }


  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.id) {
      this.onInsert();
    } else {
      this.onUpdate();
    }
  }

  onInsert() {
    const body = this.form.getRawValue();
    this.http.post('http://127.0.0.1:8000/api/studentAttendance', body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/student-attendance']).finally();
      },
    });
  }

  onUpdate() {
    const body = this.form.getRawValue();
    this.http.put(`http://127.0.0.1:8000/api/studentAttendance/edit/${this.id}`, body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/student-attendance']).finally();
      },
    });
  }
}
