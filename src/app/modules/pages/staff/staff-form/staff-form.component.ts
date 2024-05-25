import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatSelectModule} from "@angular/material/select";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSnackBar} from "@angular/material/snack-bar";

interface StaffModel
{
  id : string,
  name : string,
  phone : number,
  email: string,
  subjectId: string,
  status : boolean
}


@Component({
  selector: 'app-salary-form',
  templateUrl: './staff-form.component.html',
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
    NgIf,
    NgClass,
  ],
  standalone: true
})
export class StaffFormComponent implements OnInit{

  title : string = 'Add Staff';

  form = new FormGroup({
    name : new FormControl<string| null>('',[Validators.required]),
    phone : new FormControl<number| null>(null,[Validators.required]),
    email : new FormControl<string| null>('',[Validators.required]),
    subjectId : new FormControl<string| null>('',[Validators.required]),
    status : new FormControl<boolean| null>(true,[Validators.required]),

  })
  Subject : any;
  SubjectName: any;

  constructor(private http:HttpClient,
              private ref : MatDialogRef<StaffFormComponent>,
              @Inject(MAT_DIALOG_DATA) protected data: StaffModel | null) {
  }

  ngOnInit(){
    if (this.data != null) {
      this.title = 'Edit Staff';
      this.http.get(`http://127.0.0.1:8000/api/staff/${this.data}`).subscribe({
        next : (value:any) => {
          this.form.patchValue({
            name: value.data.name,
            phone: value.data.phone,
            email: value.data.email,
            subjectId: value.data.subjectId,
            status: value.data.status,
          });
          this.SubjectName = value.data.subject_name

        }
      })
    }
    this.loadSubject();
  }

  private loadSubject(){
      this.http.get('http://127.0.0.1:8000/api/subject').subscribe({
        next: (value: any) => {
          this.Subject = value.subject
        }
      })
  }


  onSubmit(){
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    if (this.data == null) {
      this.onInsert();
    } else {
      this.onUpdate();
    }
  }

  onInsert(){
    const body = this.form.getRawValue();
    this.http.post('http://127.0.0.1:8000/api/staff',body).subscribe({
      next :()=>{
        this.ref.close()
      }
    })
  }

  onUpdate(){
    const body = this.form.getRawValue();
    this.http.put(`http://127.0.0.1:8000/api/staff/edit/${this.data}`,body).subscribe({
      next :()=>{
        this.ref.close()
      }
    })
  }

}
