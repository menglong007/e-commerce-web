import {
  HttpErrorResponse,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, filter, switchMap, take, throwError} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private _authService: AuthService, private _snackBar: MatSnackBar) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this._authService.getToken();
    if (token != null) {
      authReq = this._addTokenHeader(req, token);
    }
    if (req.url.includes('/RefreshToken')) {
      const refreshToken = this._authService.getRefreshToken();
      authReq = this._addRefreshTokenHeader(req, refreshToken);
    }
    return next.handle(authReq)
      .pipe(
        catchError(
          error => {
            if (error instanceof HttpErrorResponse && !authReq.url.includes('/RefreshToken') && error.status === 401) {
              return this.handle401Error(authReq, next);
            }
            return throwError(error);
          })
      );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this._authService.refreshToken()
        .pipe(
          switchMap((res: any) => {
            this.isRefreshing = false;
            this._authService.setToken(res.token, res.refreshToken);
            this.refreshTokenSubject.next(res.refreshToken);
            return next.handle(request);
          }),
          catchError((err) => {
            this.isRefreshing = false;
            this._authService.logout();
            return throwError(err);
          })
        );
    }

    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap(
        (token) => next.handle(this._addTokenHeader(request, token))
      )
    );
  }

  private _addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone(
      {
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      }
    );
  }

  private _addRefreshTokenHeader(request: HttpRequest<any>, refreshToken: string) {
    return request.clone(
      {
        params: new HttpParams({fromObject: {refreshToken: refreshToken}})
      }
    );
  }
}
