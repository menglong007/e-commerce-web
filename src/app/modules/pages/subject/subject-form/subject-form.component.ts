import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

interface LeaveModel {
  id: string;
  staffName: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: boolean;
}

@Component({
  selector: 'app-salary-form',
  templateUrl: './subject-form.component.html',
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
export class SubjectFormComponent implements OnInit {
  title: string = 'Add Subject';

  form = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required]),
    status: new FormControl<boolean | null>(true, [Validators.required]),
  });
  Staff: any;

  constructor(
    private http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  id: string | null = null;

  ngOnInit(): void {
    this.loadStaff();
    this._activatedRoute.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.id = params.id;
          this.title = 'Edit Subject Form';
          this.loadData(params.id);
        }
      }
    });
  }

  loadData(id: string) {
    const ref = this.snackBar.open('Loading...!');
    this.http.get(`http://127.0.0.1:8000/api/subject/${id}`).subscribe({
      complete:()=>{
        ref.dismiss();
      },
      next: (value: any) => {
        this.form.patchValue(value.subject);
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
    this.http.post('http://127.0.0.1:8000/api/subject', body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/subject']).finally();
      },
    });
  }

  onUpdate() {
    const body = this.form.getRawValue();
    this.http.put(`http://127.0.0.1:8000/api/subject/edit/${this.id}`, body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/subject']).finally();
      },
    });
  }
}
