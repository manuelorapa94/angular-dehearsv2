import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../guards/auth.service';
import { inject } from '@angular/core';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const myToken = authService.getToken();
  const requestToken = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
    },
    // headers: req.headers.set('Authorization', `Bearer ${myToken}`),
  });
  return next(requestToken);
};
