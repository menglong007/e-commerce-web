import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivateChild(): boolean {
    const auth = this.authService.authValue;
    if (auth) {
      return true;
    } else {
      this.router.navigate(['/auth']).finally();
      return false;
    }
  }
}
