import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from "../services/auth.service";


@Injectable({ providedIn: 'root' })
export class UnAuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivateChild(): boolean {
    const auth = this.authService.authValue;
    if (auth) {
      this.router.navigate(['/modules']).finally();
      return false;
    } else {
      return true;
    }
  }
}
