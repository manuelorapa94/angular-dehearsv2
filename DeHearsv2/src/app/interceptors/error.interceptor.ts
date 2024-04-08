import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../guards/auth.service';
import { inject } from '@angular/core';

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(error);
    })
  );
};
