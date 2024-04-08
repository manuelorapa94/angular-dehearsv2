import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { AuthService } from './guards/auth.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideHttpClient(withInterceptors([ErrorInterceptor])),
    AuthService,
  ],
};
