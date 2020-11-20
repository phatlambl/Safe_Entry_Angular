import { AuthenService } from './authen.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public exp: boolean= true;


  constructor(private router: Router, private authenticationService: AuthenService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

     const currentUser = this.authenticationService.isLoggedIn();
    //  this.authenticationService.checkExpToken();
         
      
      
      
      if(currentUser ){
        //log in so return true. okokok      
        return true;
      }

      //not log in so redirect to login page
      this.router.navigate(['admin/login'], {queryParams: {returnUrl: state.url}});
      return false;
  }
  
}
