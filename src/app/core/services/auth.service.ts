import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {Auth} from "../models/auth.model";

const _auth: string = "3610a00bb0ad8a1297f7980edbd457a0";
@Injectable({ providedIn: 'root' })
export class AuthService {
  private authSubject: BehaviorSubject<Auth | null>;
  public auth: Observable<Auth | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    const authJson = localStorage.getItem(_auth);
    const auth = authJson == null ? null : JSON.parse(authJson)
    this.authSubject = new BehaviorSubject<Auth | null>(auth);
    this.auth = this.authSubject.asObservable();
  }

  public get authValue() {
    return this.authSubject.value;
  }

  login(username: string, password: string) {
    // return this.http.post<Auth>(`${environment.auth}/AnonymousAdmin/Auth`, { username, password })
    //   .pipe(
    //     map((res) => {
    //       if (res) {
    //         this.authSubject.next(res);
    //         localStorage.setItem(_auth, JSON.stringify(res));
    //         return null;
    //       }
    //       return res;
    //     })
    //   );
  }

  logout() {
    this.authSubject.next(null);
    localStorage.removeItem(_auth);
    this.router.navigate(['/auth']).finally();
  }

  // refreshToken() {
  //   return this.http.post<any>(`${environment.auth}/Admin/RefreshToken`, {})
  //     .pipe(map((user) => {
  //       this.authSubject.next(user);
  //       return user;
  //     }));
  // }

  public getToken(): string | null {
    return this.authValue?.token ?? null;
  }

  public getRefreshToken(): string {
    return this.authValue?.refreshToken || '';
  }

  public setToken(token: string, refreshToken: string): void {
    const newAuth: Auth = {
      username: this.authValue?.username ?? "",
      token: token,
      refreshToken: refreshToken
    };
    this.authSubject.next(newAuth);
    localStorage.setItem(_auth, JSON.stringify(newAuth));
  }

  // public getRefreshToken(): string | null {
  //   return this.authValue?.refreshToken ?? null;
  // }
}
