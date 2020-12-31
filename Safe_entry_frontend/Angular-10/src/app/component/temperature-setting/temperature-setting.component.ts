import { TemperatureSettingServiceService } from "./temperature-setting-service.sevice";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { environment } from "./../../../environments/environment.prod";
import { ToastrService } from "ngx-toastr";
import { Title } from "@angular/platform-browser";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, reduce } from "rxjs/operators";
declare var $: any, moment: any;
@Component({
  selector: "app-temperature-setting",
  templateUrl: "./temperature-setting.component.html",
  styleUrls: ["./temperature-setting.component.css"],
})
export class TemperatureSettingComponent implements OnInit {
  emails: String[] = [];
  result: String | undefined;
  temperature: any;
  pageIndex: any;
  count = 0;
  public data: Object = [];
  message: any;

  //pagination
  pageSize: any;
  currentPage: any;
  totalItems: any;
  sortBy: any = "";
  order: any;
  items = [];

  //update
  emailId: number;
  email: String;
  alert: boolean = true;
  report: boolean = false;
  time: String;
  timezone: String;
  frequency: String;
  dayOfWeek: String;
  
  item: any;
 
  timezones: any;


  getShowDayOfWeek() {
    if (this.frequency == "weekly") {
      return true;
    } else {
      return false;
    }
  }
  

  //delete
  confirmDelete: String = "Are you sure delete ";
  idDelete: any;
  nameDelete: any = "";

  emailSettingDto: any = {};

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private titleService: Title
  ) {}


  ngOnInit(): void {
    this.currentPage = 0;
    this.pageSize = 15;
    const url =
      "/rest/temperature/config/list?page" +
      this.currentPage +
      "&pageSize=" +
      this.pageSize;
    this.http.get(environment.endpoint + url).subscribe((data) => {
      this.convertData(data);
    });
    this.titleService.setTitle("Safe Entry");
    this.timezones = moment.tz.names();
   
    
  }

  postData() {
    const url = "/rest/temperature/config";
    const url_list = "/rest/temperature/config/list";
    this.http
      .post(environment.endpoint + url, {
        emails: this.emails,
        temperature: this.temperature,
      })
      .toPromise()
      .then((data: any) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message);
          this.http.get(environment.endpoint + url_list).subscribe((data) => {
            this.convertData(data);
          });
        } else {
          this.toastr.error(data.message);
        }
      });
  }
  getListSetting() {
    let url =
      "/rest/temperature/config/list?page=" +
      (this.currentPage - 1) +
      "&pageSize=" +
      this.pageSize;
    return this.http.get(environment.endpoint + url).subscribe((response) => {
      this.convertData(response);
    });
  }

  handlePageChange(event: number) {
    this.currentPage = event;
    this.getListSetting();
    // console.log("current: " + this.currentPage)
  }
 
  EditRow(item: any ) {
    this.emailId= item.id;
    this.email= item.email;
    this.alert = item.alert;
    this.report = item.report;
    this.time = item.time;
    this.timezone =  item.timezone;
    this.frequency =  item.frequency;
    this.dayOfWeek =  item.dayOfWeek;    

    console.log(this.report);
    
  }

  update() {
    const update = "/rest/temperature/update";

    this.emailSettingDto.id = this.emailId;
    this.emailSettingDto.email = this.email;
    this.emailSettingDto.alert = this.alert;
    this.emailSettingDto.report = this.report;    
    this.emailSettingDto.time = this.time;
    this.emailSettingDto.timezone = this.timezone;
    this.emailSettingDto.frequency = this.frequency;
    this.emailSettingDto.dayOfWeek = this.dayOfWeek;

    console.log("time" + this.time);
    

    this.http
      .put(environment.endpoint + update, this.emailSettingDto)
      .toPromise()
      .then((data: any) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message);
          this.getListSetting();
          // this.refresh();
        } else {
          this.toastr.error(data.message);
        }
      });
  }

  //update status alert or report
  updateStatusAlert(item: any){
    const update = "/rest/temperature/update";


    this.emailSettingDto.id = item.id;
    this.emailSettingDto.email = item.email;
    if(item.alert === true){
      this.emailSettingDto.alert = false;
    }else{
      this.emailSettingDto.alert = true;
    }    
    this.emailSettingDto.report = item.report ;  
    this.emailSettingDto.time = item.time;
    this.emailSettingDto.timezone = item.timezone;
    this.emailSettingDto.frequency = item.frequency;
    this.emailSettingDto.dayOfWeek = item.dayOfWeek;

    console.log("show:  " + item.id);   

    this.http
      .put(environment.endpoint + update, this.emailSettingDto)
      .toPromise()
      .then((data: any) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message);
          this.getListSetting();
          // this.refresh();
        } else {
          this.toastr.error(data.message);
        }
      });
  }
  //update status report
  updateStatusReport(item: any){
    const update = "/rest/temperature/update";

    this.emailSettingDto.id = item.id;
    this.emailSettingDto.email = item.email;
    if(item.report === true){
      this.emailSettingDto.report = false;
    }else{
      this.emailSettingDto.report = true;
    }    
    this.emailSettingDto.alert = item.alert ;  
    this.emailSettingDto.time = item.time;
    this.emailSettingDto.timezone = item.timezone;
    this.emailSettingDto.frequency = item.frequency;
    this.emailSettingDto.dayOfWeek = item.dayOfWeek;

    console.log("show:  " + this.emailSettingDto.report);
    

    this.http
      .put(environment.endpoint + update, this.emailSettingDto)
      .toPromise()
      .then((data: any) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message);
          this.getListSetting();
          // this.refresh();
        } else {
          this.toastr.error(data.message);
        }
      });
  }

  // validate delete
  onDelete(id: number, name: any) {
    this.idDelete = id;
    this.nameDelete = name;
    console.log("on: " + id);
  }

  delete() {
    const API_Delete = "/rest/temperature/delete/";
    console.log(this.idDelete);

    this.http
      .delete(environment.endpoint + API_Delete + this.idDelete)
      .toPromise()
      .then((data: any) => {
        if (data.statusCode === 200) {
          this.toastr.success(data.message);
          this.getListSetting();
          // this.refresh();
        } else {
          this.toastr.error(data.message);
        }
      });
    this.idDelete = -1;
  }
  convertData(response: any) {
    let myArray: any = [];
    this.totalItems = response.totalItems;
    this.currentPage = response.currentPage + 1;
    this.pageSize = response.pageSize;

    response.data.forEach((data: any) => {
      let temp = {} as listConfig;
      temp.id = data.id;
      temp.email = data.email;
      temp.temperature = data.temperature;
      temp.alert=data.alert;
      temp.report=data.report;
      temp.time= data.time;
      temp.timezone=data.timezone;
      temp.frequency = data.frequency;
      temp.dayOfWeek = data.dayOfweek;
      myArray.push(temp);
    });
    this.data = myArray;
  }
}
export interface listConfig {
  id: number;
  email: string;
  temperature: any;
  alert: boolean;
  report: boolean;
  time: String;
  timezone: String;
  frequency: String;
  dayOfWeek: String;
}

