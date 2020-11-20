import { AuthenService } from './authen.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
 
  constructor(private router: Router, private authenticationService: AuthenService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

      const currentUser = this.authenticationService.isLoggedIn();
      if(currentUser){
        this.router.navigate(['admin/dashboard']);
        return false;
      }     
      
      return true;
  }
  
}
