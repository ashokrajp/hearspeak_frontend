import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './app/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  image_name: string | null | undefined;
  token: any

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this. token = localStorage.getItem('token');
    this.image_name = localStorage.getItem('image_name');
 
    if (this.image_name === null || this.image_name === undefined) {
      console.log("No image name found, clearing local storage and redirecting to home");
      localStorage.clear();
      this.router.navigate(['/home']);
      return false; 
    } else if (!this.token){
        
      return true;
    }
      if (this.token) {
        this.authService.validateToken({ token :this.token }).subscribe((data: any) => {
          console.log("---------------data",data.code);
          
         if (data.code == '1') {
           return true;
         } else {
           console.log("Token is invalid, clearing local storage and redirecting to home");
           localStorage.clear();
           this.router.navigate(['/home']);
           return false; 
         }
       })
        
      }
     
      
    return true;
  }
}
