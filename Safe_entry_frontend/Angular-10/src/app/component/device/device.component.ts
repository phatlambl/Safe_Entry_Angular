import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  pageIndex: any;  
  addDevice: boolean=false;

  deviceId: any;
  location: any;


    //page Size
    selectedOption: any;
    options = [
      { name: "10", value: 10 },
      { name: "25", value: 25 },
      { name: "50", value: 50 },
      { name: "100", value: 100 }
    ]
  
  
    
    //pagination
    pageSize: any;
    currentPage: any;
    totalItems: any;

  constructor(private http: HttpClient) { }
  public data: Object = [];
  ngOnInit(): void {
    const url = '/rest/device/list';
    const Observable = this.http.get(environment.endpoint + url).subscribe((response) => {      
      this.convertData(response)
    });
    // const Observable = this.http.get(this.api.getListDeviceLogs, options);
  }

  
  handlePageChange(event: number){
    this.currentPage= event;    
    this.getPage();
    // console.log("current: " + this.currentPage)
  }

  

  getPage(){  

    const url = '/rest/device/list?page='  + (this.currentPage -1) + '&pageSize=' + this.pageSize;
    const Observable = this.http.get(environment.endpoint + url).subscribe((response) => {
      // console.log(response);
      this.convertData(response)
      // console.log(this.totalItems)
    });    
    
  }

  getPageSize(){
    this.pageSize = this.selectedOption;
    this.getPage();
  }

  convertData(response: any){
    
    let myArray: any =[];      
    this.totalItems = response.totalItems
    this.currentPage = response.currentPage + 1
    this.pageSize = response.pageSize
  
      response.listDevice.forEach((data: any)=>{ 
        
        let temp = {} as tempDevice
        temp.id = data.id;
        temp.location = data.location;

        myArray.push(temp)
      })

      this.data = myArray;     
  }


  postAddDevice(){
    const url = '/rest/device/add';
    this.http.post(environment.endpoint + url, {id: this.deviceId, location: this.location}).toPromise().then((data: any) => {     
     
        alert(data.message)      
      
    });
    this.getPage()

  }
  showHideAddDevice(){
    if(this.addDevice){
      this.addDevice=false
    }else{
      this.addDevice=true
    }

  }

}
export interface tempDevice{
  id: any;
  location: any;
}
