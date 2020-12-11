import {TemperatureSettingServiceService} from './temperature-setting-service.sevice';
import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-temperature-setting',
  templateUrl: './temperature-setting.component.html',
  styleUrls: ['./temperature-setting.component.css']
})
export class TemperatureSettingComponent implements OnInit {

  emails: any;
  result: String | undefined;
  temperature: any;
  pageIndex: any;
  count = 0;
  public data: Object = [];
  message: any;
  

  constructor(private http: HttpClient, private toastr : ToastrService ) {
  }

  postData() {
    const url = '/rest/temperature/config';
    const url_list = '/rest/temperature/config/list';
    this.http.post(environment.endpoint + url, {emails: this.emails, temperature: this.temperature}).toPromise().then((data: any) => {          
      if (data.statusCode === 200) {
        this.toastr.success(data.message);
        this.http.get(environment.endpoint + url_list).subscribe((data) => {          
          this.convertData(data);
          
        });
      }else{
        this.toastr.error(data.message);
      }
    });
  }

  ngOnInit(): void {
    const url = '/rest/temperature/config/list';
    this.http.get(environment.endpoint + url).subscribe((data) => {
      this.convertData(data);
    }) ;
     
    
  }

  getPreviousPage() {
    const url = '/rest/temperature/config/list?page=';
    if (this.count >= 1) {
      this.count--;
    }
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      this.data = data.content;
    });
  }

  getNextPage() {
    const url = '/rest/temperature/config/list?page=';
    this.count++;
    this.http.get(environment.endpoint + url + (this.count)).toPromise().then((data: any) => {
      if (data.content.length === 0) {
        this.count--;
      }
      this.data = data.content;
    });
  }

  convertData(response: any){
    
    let myArray: any =[];      
   
  
      response.content.forEach((data: any)=>{ 
        
        let temp = {} as listConfig
        temp.email = data.email;
        temp.temperature = data.temperature;

        myArray.push(temp)
      })

      this.data = myArray;     
  }

}
export interface listConfig{
  email: string;
  temperature: any
}
