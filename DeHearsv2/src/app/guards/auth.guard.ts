import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NgToastService } from 'ng-angular-popup';

// export const AuthGuard: CanMatchFn = (route, state) => {

//   if (inject(AuthService).isLoggedIn) {
//     return true;
//   } else {
//     inject(Router).navigate(['/login']);
//     return false;
//   }
// };

export const AuthGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  const toast = inject(NgToastService);

  if (authService.isLoggedIn) {
    return true;
  } 
  toast.error({detail: "ERROR", summary: "Please Login First!", duration: 5000});
  return router.parseUrl('/login');
};
