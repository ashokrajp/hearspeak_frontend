import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  image_name: string | null | undefined;
  token: any

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.token = localStorage.getItem('token');
    this.image_name = localStorage.getItem('image_name');

    if (this.image_name === null || this.image_name === undefined) {
      localStorage.clear();
      this.router.navigate(['/home']);
      return false;
    } else if (!this.token) {
      return true;
    }
    if (this.token) {
      this.authService.validateToken({ token: this.token }).subscribe((data: any) => {
        if (data.code == '1') {
          return true;
        } else {
          localStorage.clear();
          this.router.navigate(['/home']);
          return false;
        }
      })

    }

    return true;
  }
}
