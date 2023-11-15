import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent{
  showPassword: boolean = false;
  form : FormGroup = new FormGroup({
    username : new FormControl<string | null>({
      value: null , disabled : false
    }, [Validators.required]),
    password : new  FormControl<string | null>({
      value: null , disabled: false
      }, [Validators.required])
  })


  constructor( private router: Router) {
  }


  onSignIn(): void {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.router.navigate(['./modules/userManagement/user'])
  }


  keyDownFunction(event : any ) {
    if ( event.keyCode === 13) {
      this.onSignIn();
    }
  }

}
