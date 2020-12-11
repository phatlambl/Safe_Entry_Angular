import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  pageIndex: any;  
  addDevice: boolean=false;

    //update/add device
  deviceId: any;
  location: any='';
  floor: any='';
  room: any='';

   //delete
   confirmDelete: String="Are you sure delete device: ";
   idDelete: any="";
   

   //sort
   sortBy: any;
   order: any;
   test: boolean =true;

    //page Size
    selectedOption: any;
    options = [
      { name: "10", value: 10 },
      { name: "15", value: 15 },
      { name: "25", value: 25 },
      { name: "50", value: 50 },
      { name: "100", value: 100 }
    ]
  
  
    
    //pagination
    pageSize: any;
    currentPage: any;
    totalItems: any;

  constructor(private http: HttpClient, private toastr : ToastrService) { }
  public data: Object = [];
  ngOnInit(): void {

    this.selectedOption=10;
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
    if (this.sortBy === undefined) {
      this.sortBy = "id";
    }
    if (this.order === undefined) {
      this.order = "DESC";
    }
    

    const url = '/rest/device/list?page='  + (this.currentPage -1) + '&pageSize=' + this.pageSize +
     '&sortBy=' + this.sortBy +'&order=' + this.order;
    const Observable = this.http.get(environment.endpoint + url).subscribe((response) => {
           this.convertData(response)
    });    
    
  }
  selectSort(sort: any){   
    if(this.test){
      this.test = false
    }else{
      this.test = true;
    }      
    var orderBy
     console.log("click: " + sort )
     if (this.test){
      orderBy = "DESC"
     }else{
       orderBy ="ASC"
     }
     console.log("test oderBy: " + orderBy)
     this.sortBy = sort
     this.order = orderBy
     this.getPage() 
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
        temp.floor = data.floor;
        temp.room = data.room;

        myArray.push(temp)
      })

      this.data = myArray;     
  }


  postAddDevice(){
    const url = '/rest/device/add';
    this.http.post(environment.endpoint + url, {id: this.deviceId, location: this.location}).toPromise().then((data: any) => {     
     
      if(data.statusCode === 200){
        this.toastr.success(data.message)
        this.getPage()
      }else{
        this.toastr.error(data.message);  
      }    
      
    });  
    this.deviceId="";
    this.location="";
    this.floor="";
    this.room="";
  }

  EditRow(id: any){
    this.deviceId = id;
  }

  update(){
    const update = '/rest/device/update';
    this.http.put(environment.endpoint + update,{id: this.deviceId, location: this.location, 
       floor: this.floor, room: this.room}).toPromise().then((data:any) => {
            if(data.statusCode === 200){
              this.toastr.success(data.message);
              this.getPage();
              // this.refresh();
            }else{
              this.toastr.error(data.message);  
            }     
    });
    this.deviceId="";
    this.location="";
    this.floor="";
    this.room="";
  }

   // validate delete
   onDelete(id:any){ 
    this.idDelete = id;     
  }
  delete(){
    const API_Delete = '/rest/device/delete/';
    this.http.delete(environment.endpoint + API_Delete + this.idDelete).toPromise().then((data:any) => {
      if(data.statusCode === 200){
        this.toastr.success(data.message);
        this.getPage();
        // this.refresh();
      }else{
        this.toastr.error(data.message);  
      }     
    });
    this.idDelete = "";
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
  floor: any;
  room: any;
}
