import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const auth = authService.token != null;

  if (state.url.startsWith('/auth')) {
    if (auth) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }

  if (!auth) {
    router.navigate(['/auth']);
    return false;
  }

  return true;
};

