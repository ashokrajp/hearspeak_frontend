import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  image_name: string | null | undefined;
  constructor(private router: Router, private authService: AuthService) {

    console.log("-------hello chat here");

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const token = localStorage.getItem('token');
    this.image_name = localStorage.getItem('image_name');

    if (!token) {
      // If no token is present, do nothing and allow the navigation
      return true;
    }
    
    if (!this.image_name) {
      // If no image_name is present, clear local storage and navigate to home
      console.log("No image name found, clearing local storage and redirecting to home");
      localStorage.clear();
      this.router.navigate(['/home']);
      return false; // Block navigation
    }

    return this.authService.validateToken({ token }).pipe(
      map((data) => {
        if (data.code === 1) {
          // Token is valid
          return true;
        } else {
          // Token is invalid, clear local storage and navigate to home
          console.log("Token is invalid, clearing local storage and redirecting to home");
          localStorage.clear();
          this.router.navigate(['/home']);
          return false; // Block navigation
        }
      }),
      catchError((error) => {
        // In case of an error, clear local storage and navigate to home
        console.log("Error validating token, clearing local storage and redirecting to home", error);
        localStorage.clear();
        this.router.navigate(['/home']);
        return of(false); // Block navigation
      })
    );
  }
}
