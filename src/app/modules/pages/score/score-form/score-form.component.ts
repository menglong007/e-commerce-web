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

const Class = [
  {
    id: 'A',
    name: 'A',
  },
  {
    id: 'B',
    name: 'B',
  },
  {
    id: 'C',
    name: 'C',
  },
  {
    id: 'D',
    name: 'D',
  },
  {
    id: 'E',
    name: 'E',
  },
  {
    id: 'F',
    name: 'F',
  },

]

@Component({
  selector: 'app-salary-form',
  templateUrl: './score-form.component.html',
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
export class ScoreFormComponent implements OnInit {
  title: string = 'Add Subject Score';

  form = new FormGroup({
    name: new FormControl<string | null>('', [Validators.required]),
    class: new FormControl<string | null>('', [Validators.required]),
    math: new FormControl<number | null>(null, [Validators.required]),
    khmer: new FormControl<number | null>(null, [Validators.required]),
    english: new FormControl<number | null>(null, [Validators.required]),
    history: new FormControl<number | null>(null, [Validators.required]),
    physics: new FormControl<number | null>(null, [Validators.required]),
    biology: new FormControl<number | null>(null, [Validators.required]),
    chemistry: new FormControl<number | null>(null, [Validators.required]),
    result: new FormControl<number | null>(null),
  });
  Staff: any;
  math: number | null = null;
  khmer: number | null = null;
  english: number | null = null;
  history: number | null = null;
  physics: number | null = null;
  biology: number | null = null;
  chemistry: number | null = null;
  result: number | null = null;

  onResult() {
  }

  constructor(
    private http: HttpClient,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  id: string | null = null;
  Class =Class;

  ngOnInit(): void {
    this._activatedRoute.params.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.id = params.id;
          this.title = 'Edit Score Form';
          this.loadData(params.id);
        }
      }
    });
  }

  loadData(id: string) {
    const ref = this.snackBar.open('Loading...!');
    this.http.get(`http://127.0.0.1:8000/api/score/${id}`).subscribe({
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
    if (this.id) {
      this.onUpdate();
    } else {
      this.onInsert();
    }
  }

  onInsert() {
    const body = this.form.getRawValue();
    this.http.post('http://127.0.0.1:8000/api/score', body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/score']).finally();
      },
    });
  }

  onUpdate() {
    const body = this.form.getRawValue();
    this.http.put(`http://127.0.0.1:8000/api/score/edit/${this.id}`, body).subscribe({
      next: () => {
        this.router.navigate(['/modules/pages/score']).finally();
      },
    });
  }
}
