import { environment } from './../../environments/environment.prod';
import { Tokens } from './token/token';
import { tap, catchError, mapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of , Subject, BehaviorSubject} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  private readonly JWT_TOKEN='JWT_TOKEN';
  private loggedUser: any;
  public error:any;

 

  constructor(private HttpClient: HttpClient) { 
   
    
  }

  login(user:{ username: string, password: string}):Observable<boolean>{
    var subject = new Subject<boolean>();
   
    

     this.HttpClient.post<any>(environment.endpoint +'/rest/user/login', user).toPromise().then((data: any) => {          
    //  console.log("jwt " + data.jwttoken)
    //  console.log("status: " + data.statusCode)
    //  console.log("message: " + data.message)
      
      if(data.statusCode === 200){
        this.doLoginUser(user.username, data)
        subject.next(true);
      }else{
        this.error = data.message;
        subject.next(false);
      }
    });
    return subject.asObservable();                
  }

  //kiem tra thoi han token
  checkExpToken():Observable<boolean>{
    var subject = new Subject<boolean>();
    this.HttpClient.get(environment.endpoint + '/rest/device/list/log').subscribe((response) => {        
      subject.next(true)
    }, err => {
      
      if(err.status ==401){
      this.removeTokens();
      subject.next(false)
      }
      

    });
    return subject.asObservable();   
  }

  logout(){

    this.doLogoutUser();

  }
  private doLoginUser(username: string, tokens: Tokens){
    this.storeToken(tokens);
    localStorage.setItem("User", username)
    this.loggedUser= username;
  }

  isLoggedIn() {
    return this.getJwtToken();
  }

  
  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
  }

  public removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);   
  }

  private storeToken(Tokens: Tokens){
    localStorage.setItem(this.JWT_TOKEN, Tokens.jwttoken);
  }

  private storeJwtToken(jwt: string){
    localStorage.setItem(this.JWT_TOKEN,jwt);
  }
  public getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

}

