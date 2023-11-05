import {Component} from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent  {
  showPassword: boolean = false;
  username: string = '';
  password: string = '';
  loading: boolean = false;
  message: string | undefined;

  constructor() {
  }

  onSignIn(): void {
    if (this.username == '' || this.password == '') {

      return;
    }
  }

  keyDownFunction(event : any ) {
    if ( event.keyCode === 13) {
      this.onSignIn();
    }
  }

}
