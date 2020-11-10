import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TemperatureSettingServiceService {

  readonly api: any = {
    postTemperatureSetting: '/rest/device/list'
  };

  constructor(private http: HttpClient) {
  }

  postTemperatureSetting(): Observable<any> {
    // tslint:disable-next-line:no-shadowed-variable
    const Observable = this.http.get(this.api.postTemperatureSetting);
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
