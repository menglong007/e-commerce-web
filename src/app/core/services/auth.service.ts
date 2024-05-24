import {Injectable} from '@angular/core';

const emailKey: string = 'email';
const tokenKey: string = 'token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public get token(): string | null {
    return localStorage.getItem(tokenKey);
  }

  public set token(value: string | null) {
    if (value == null) {
      localStorage.removeItem(tokenKey);
    } else {
      localStorage.setItem(tokenKey, value);
    }
  }


  public get email(): string | null {
    return localStorage.getItem(emailKey);
  }

  public set email(value: string | null) {
    if (value == null) {
      localStorage.removeItem(emailKey);
    } else {
      localStorage.setItem(emailKey, value);
    }
  }

  public signOut(): void {
    this.token = null;
    this.email = null;
  }
}

