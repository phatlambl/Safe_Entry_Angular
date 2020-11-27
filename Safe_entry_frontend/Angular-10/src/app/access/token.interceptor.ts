import { Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {  
 
  constructor(public AuthenService: AuthenService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.AuthenService.getJwtToken()) {
      request = this.addToken(request, this.AuthenService.getJwtToken()); }
    return next.handle(request).pipe(catchError(err => {    
      // if(err.status === 401){
      //   alert("401")
        if(err.status != 200){
          this.AuthenService.removeTokens();
          this.router.navigate(['admin/login']);

        }
       

      console.log("loi");
      
      
      return Observable.throw(err)
    }));
  }

  private addToken(request:HttpRequest<any>, token: any){
    return request.clone({
      setHeaders:{
        'Authorization': `Bearer ${token}`
      }
    });
  }



}

