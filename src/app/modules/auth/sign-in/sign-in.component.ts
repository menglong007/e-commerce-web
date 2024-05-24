import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../../core/services/auth.service";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  standalone: true
})
export class SignInComponent{
  showPassword: boolean = false;
  form : FormGroup = new FormGroup({
    email : new FormControl<string | null>({
      value: null , disabled : false
    }, [Validators.required]),
    password : new  FormControl<string | null>({
      value: null , disabled: false
      }, [Validators.required])
  })


  constructor( private router: Router,
               private snackBar: MatSnackBar,
               private _http:HttpClient,
               private _authService:AuthService) {
  }


  onSignIn(): void {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const ref = this.snackBar.open('Loading...!');
    const body = this.form.value;
    this._http.post<any>('http://127.0.0.1:8000/api/login', body)
      .subscribe({
        complete: () => {
          ref.dismiss();
        },
        next: (res: any) => {
          if (res) {
            this._authService.token = res.data.access_token;
            this._authService.email = res.data.name;
            this.router.navigate(['/modules/pages/dashboard']).finally();
            this.snackBar.open(res.message , '',{
              duration: 3000,
            });
          }
        },
        error: (err: any) => {
          console.error('Error occurred:', err);
          this.snackBar.open('An error occurred while logging in. Please try again.', '', {
            duration: 5000,
          });
        }
      });
  }

  keyDownFunction(event : any ) {
    if ( event.keyCode === 13) {
      this.onSignIn();
    }
  }

}
