import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      // If no token is present, do nothing and allow the navigation
      return true;
    }

    return this.authService.validateToken({ token }).pipe(
      map((data) => {
        if (data.code === 1) {
          return true;
        } else {
          localStorage.clear();
          this.router.navigate(['/auth/login'], { replaceUrl: true });
          return false;
        }
      }),
      catchError((error) => {
     console.log("-----------helo i am data eroor");
     
        return of(true);
      })
    );
  }
}
