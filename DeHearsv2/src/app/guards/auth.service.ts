import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  baseUrl: string = 'https://localhost:7060/api';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: Router) { }

  storeToken(tokenValue: string){
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', tokenValue);
    }
  }

  getToken(){
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn = false;
  redirectUrl: string | null = null;

  islogin(): Observable<boolean> {
    this.isLoggedIn = !!localStorage.getItem('token');
    return of(this.isLoggedIn);
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.clear();
    this.route.navigate(['/login'])
  }
}