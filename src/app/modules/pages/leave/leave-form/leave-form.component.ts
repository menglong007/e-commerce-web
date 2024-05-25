import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import {DatePipe, NgClass, NgForOf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";


@Component({
  selector: 'app-salary-form',
  templateUrl: './leave-form.component.html',
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
export class LeaveFormComponent implements OnInit {
    title: string = 'Add Leave';

    form = new FormGroup({
      staffId: new FormControl<string | null>('', [Validators.required]),
      startDate: new FormControl<string | null>(null, [Validators.required]),
      endDate: new FormControl<string | null>(null, [Validators.required]),
      reason: new FormControl<string | null>('', [Validators.required]),
      status: new FormControl<boolean | null>(true, [Validators.required]),
    });
    Staff: any;
    StaffName:any;

    constructor(
      private http: HttpClient,
      private _activatedRoute : ActivatedRoute,
      private router : Router,
      private datePipe: DatePipe,
      private snackBar: MatSnackBar,
    ) {}

    id : string | null = null;

    ngOnInit(): void {
      this.loadStaff();
      this._activatedRoute.params.subscribe({
        next: (params: any) => {
          if (params.id) {
            this.id = params.id;
            this.title = 'Edit Leave Form';
            this.loadData(params.id);
          }
        }
      });
    }

      loadData(id : string) {
        const ref = this.snackBar.open('Loading...!');
        this.http.get(`http://127.0.0.1:8000/api/leave/${id}`).subscribe({
          complete:()=>{
            ref.dismiss();
          },
          next: (value: any) => {
            this.form.patchValue(value.data);
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
      body.startDate = this.datePipe.transform(body.startDate, 'yyyy-MM-dd');
      body.endDate = this.datePipe.transform(body.endDate, 'yyyy-MM-dd');
      this.http.post('http://127.0.0.1:8000/api/leave', body).subscribe({
        next: () => {
          this.router.navigate(['/modules/pages/leave']).finally();
        },
      });
    }

    onUpdate() {
      const body = this.form.getRawValue();
      body.startDate = this.datePipe.transform(body.startDate, 'yyyy-MM-dd');
      body.endDate = this.datePipe.transform(body.endDate, 'yyyy-MM-dd');
      this.http.put(`http://127.0.0.1:8000/api/leave/edit/${this.id}`, body).subscribe({
        next: () => {
          this.router.navigate(['/modules/pages/leave']).finally();
        },
      });
    }
}
