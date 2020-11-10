import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DeviceLogServiceService {

  readonly api:any ={
    getListDeviceLogs: "/rest/device/list"
  }

  constructor(private http:HttpClient) { 
  }  
  
  getListDeviceLogs(): Observable<any> {
    let Observable = this.http.get(this.api.getListDeviceLogs) 
      return Observable;
  }


  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

}
