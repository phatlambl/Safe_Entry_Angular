import { NgxPaginationModule } from "ngx-pagination";
import { environment } from "./../../../../environments/environment.prod";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { filter } from "rxjs/operators";
import { Data } from "@angular/router";
import { DeviceLogServiceService } from "./device-log-service.service";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { saveAs } from "file-saver";

@Component({
  selector: "app-device-logs",
  templateUrl: "./device-logs.component.html",
  styleUrls: ["./device-logs.component.css"],
})
export class DeviceLogsComponent implements OnInit {
  // public dsDeviceLogs:DeviceLogsComponent = new DeviceLogsComponent();
  count = 0;
  public data: Object = [];
  private deviceLogs = new Subscription();

  //export data

  //filter
  filter: boolean = false;
  name: any = "";
  deviceId: any = "";
  from: any;
  to: any;
  fromTimestamp: any;
  toTimestamp: any;

  //sort
  sortBy: any;
  order: any;
  test: boolean = true;

  //page Size
  selectedOption: any;
  options = [
    { name: "10", value: 10 },
    { name: "15", value: 15 },
    { name: "25", value: 25 },
    { name: "50", value: 50 },
    { name: "100", value: 100 },
  ];

  //pagination
  pageSize: any;
  currentPage: any;
  totalItems: any;

  constructor(
    private svDeviceLogs: DeviceLogServiceService,
    private http: HttpClient,
    modalService: NgbModal
  ) {
    this.name;
  }

  ngOnInit(): void {
    this.currentPage = 0;
    this.pageSize = 15;

    this.selectedOption=15;

    this.name = "";
    this.deviceId = "";
    const url =
      "/rest/device/list/log?page=" +
      this.currentPage +
      "&pageSize=" +
      this.pageSize;

    const Observable = this.http
      .get(environment.endpoint + url)
      .subscribe((response) => {
        this.convertData(response);
      });
  }
  downloadCsv() {
    if (this.from === undefined) {
      this.from = 0;
    }
    if (this.to === undefined) {
      this.to = new Date();
    }
    if (this.sortBy === undefined) {
      this.sortBy = "timestamp";
    }
    if (this.order === undefined) {
      this.order = "DESC";
    }

    this.fromTimestamp = new Date(this.from).getTime();
    this.toTimestamp = new Date(this.to).getTime();

    const csv_link =
      environment.endpoint +
      "/rest/device/log/download?" +
      "name=" +
      this.name +
      "&deviceId=" +
      this.deviceId +
      "&fromTimestamp=" +
      this.fromTimestamp +
      "&toTimestamp=" +
      this.toTimestamp +
      "&sortBy=" +
      this.sortBy +
      "&order=" +
      this.order;

    saveAs(csv_link);
  }

  showHideFilter() {
    if (this.filter) {
      this.filter = false;
    } else {
      this.filter = true;
    }
  }

  getPage() {
    if(this.name === null){
      this.name="";
    }
    if(this.deviceId === null){
      this.deviceId="";
    }
    if(this.to === null){
      this.to = new Date();
    }
    if (this.from === undefined) {
      this.from = 0;
    }
    if (this.to === undefined) {
      this.to = new Date();
    }
    if (this.sortBy === undefined) {
      this.sortBy = "timestamp";
    }
    if (this.order === undefined) {
      this.order = "DESC";
    }

    this.fromTimestamp = new Date(this.from).getTime();
    this.toTimestamp = new Date(this.to).getTime();
  
    const url =
      "/rest/device/list/log?page=" +
      (this.currentPage - 1) +
      "&pageSize=" +
      this.pageSize +
      "&name=" +
      this.name +
      "&deviceId=" +
      this.deviceId +
      "&fromTimestamp=" +
      this.fromTimestamp +
      "&toTimestamp=" +
      this.toTimestamp +
      "&sortBy=" +
      this.sortBy +
      "&order=" +
      this.order;

    this.http.get(environment.endpoint + url).subscribe((response) => {
      // console.log(response);

      this.convertData(response);
      // console.log(this.totalItems)
    });
  }

  clear(){
 
    console.log("name: " + this.name);
    

  }
  handlePageChange(event: number) {
    this.currentPage = event;
    this.getPage();
    // console.log("current: " + this.currentPage)
  }

  convertData(response: any) {
    let myArray: any = [];
    this.totalItems = response.totalItems;
    this.currentPage = response.currentPage + 1;
    this.pageSize = response.pageSize;

    response.data.forEach((data: any) => {
      let temp = {} as temp;
      temp.userId = data.userId;
      temp.name = data.name;
      temp.cardType = data.cardType;
      temp.temperature = data.temperature.toFixed(1);
      // temp.temperature = Math.round(data.temperature * 10) / 10;
      temp.ttCode = data.ttCode;
      temp.deviceId = data.deviceId;
      temp.location = data.location;
      let jsdate = new Date(data.timestamp);
      temp.date = jsdate.toLocaleDateString();
      temp.time = jsdate.toLocaleTimeString();

      myArray.push(temp);
    });

    this.data = myArray;
  }

  getPageSize() {
    this.pageSize = this.selectedOption;
    this.getPage();
  }

  selectSort(sort: any) {
    if (this.test) {
      this.test = false;
    } else {
      this.test = true;
    }

    var orderBy;
    console.log("click: " + sort);
    if (this.test) {
      orderBy = "DESC";
    } else {
      orderBy = "ASC";
    }
    console.log("test oderBy: " + orderBy);

    this.sortBy = sort;
    this.order = orderBy;
    this.getPage();
  }

  getSortIconASC(sort: any) {
    if (sort == name) {
    }
  }
  getSortIconDESC(sort: any) {}

  // getFilter(){

  //   if(this.from === undefined){
  //     this.from = 0;
  //   }
  //   if(this.to === undefined){
  //     this.to = new Date()
  //   }

  //   this.fromTimestamp = new Date(this.from).getTime();
  //   this.toTimestamp = new Date(this.to).getTime();

  //   const url = '/rest/device/list/log?page=' + (this.currentPage -1) + '&pageSize=' + this.pageSize
  //   + '&name=' + this.name + '&fromTimestamp=' +  this.fromTimestamp + '&toTimestamp=' + this.toTimestamp;

  //   const Observable = this.http.get(environment.endpoint + url).subscribe((response) => {

  //     this.convertData(response)

  //    });
  //   }
}

export interface temp {
  userId: any;
  name: any;
  cardType: any;
  temperature: any;
  ttCode: any;
  deviceId: any;
  location: any;
  date: any;
  time: any;
}
