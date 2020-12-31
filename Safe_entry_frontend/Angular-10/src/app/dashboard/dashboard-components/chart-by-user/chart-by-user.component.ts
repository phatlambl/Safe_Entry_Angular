import { Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Chart } from "chart.js";
import { map, reduce } from "rxjs/operators";
import { environment } from "./../../../../environments/environment.prod";
import { Title } from "@angular/platform-browser";
declare var $: any, moment: any;

@Component({
  selector: "app-chart-by-user",
  templateUrl: "./chart-by-user.component.html",
  styleUrls: ["./chart-by-user.component.css"],
})
export class ChartByUserComponent implements OnInit {
  chart: any = [];
  userId: any;
  name: any;
  public subParam: Subscription = new Subscription();
  from: any;
  to: any;
  fromTimestamp: any;
  toTimestamp: any;
  d: any;
  public data: Object = [];

  //show time select
  TimeSelect: boolean = true;
  TimeFilter: any = {};

  /*function */

  constructor(
    private http: HttpClient,
    private activatedRouted: ActivatedRoute,
    private titleService: Title
  ) {
    let TimeFilter = {} as SafeEntryTime;
  }

  private listDeviceLogByUser = new Subscription();

  // funtion select option
  selectedOption: any;
  printedOption: any;

  options = [
    { name: "1 week", value: 7 },
    { name: "1 month", value: 30 },
    { name: "6 month", value: 180 },
  ];
  getTime() {
    this.from = null;
    this.to = null;
    this.TimeSelect = true;
    this.printedOption = this.selectedOption;

    if (this.selectedOption === "1 week") {
      this.getTimestampXDayAgo(7);
    }
    if (this.selectedOption === "1 month") {
      this.getTimestampXDayAgo(30);
    }
    if (this.selectedOption === "6 month") {
      this.getTimestampXDayAgo(180);
    }
    this.getChart();
  }

  showTimeSelect() {
    if (this.from == null || this.from == undefined) {
      this.TimeSelect = true;
      return;
    }
    if (this.to == null || this.from == undefined) {
      this.TimeSelect = true;
      return;
    } else {
      this.TimeSelect = false;
    }
  }

  //function get time x day from a current date
  getTimestampXDayAgo(x: any) {
    var units = {
      year: 24 * 60 * 60 * 1000 * 365,
      month: (24 * 60 * 60 * 1000 * 365) / 12,
      day: 24 * 60 * 60 * 1000,
      hour: 60 * 60 * 1000,
      minute: 60 * 1000,
      second: 1000,
    };
    var d = new Date();
    this.toTimestamp = d.getTime();
    d.setMilliseconds(d.getMilliseconds() - units.day * x);
    this.fromTimestamp = d.getTime();
  }

  setUpDaterange(id: any, callback: any, timeObj: any) {
    let start = moment().subtract(6, "days");
    let end = moment();
    function cb(id: any, start: any, end: any, callback: any) {   
      $("#" + id + " span").html(
        start.format("YYYY/MM/DD") + " - " + end.format("YYYY/MM/DD")
      );
      if (typeof callback == "function") {
        timeObj.fromTimestamp = new Date(start).getTime();
        timeObj.toTimestamp = new Date(end).getTime();
        callback();
      }
    }
    $("#" + id).daterangepicker(
      { 
        timePicker: true,
        alwaysShowCalendars: true,
        startDate: start,
        endDate: end,        
        ranges: {
          Today: [moment().startOf("day"), moment().endOf("day")],
          "Last 7 Days": [moment().subtract(6, "days").startOf("day"), moment().endOf("day")],
          "Last 30 Days": [moment().subtract(29, "days").startOf("day"), moment().endOf("day")],
          "This Month": [moment().startOf("month").startOf("day"), moment().endOf("month").endOf("day")],
          "Last Month": [
            moment().subtract(1, "month").startOf("month").startOf("day"),
            moment().subtract(1, "month").endOf("month").endOf("day"),
          ],
        },
      },
      function (start: any, end: any) {
        cb(id, start, end, callback);
        if (typeof timeObj != "undefined") {
          timeObj.fromTimestamp = new Date(start).getTime();
          timeObj.toTimestamp = new Date(end).getTime();
          console.log(timeObj);
        }
      }
    );
    cb(id, start, end, callback);
  }

  getDeviceLogsByUser() {
    if (this.from != null) {
      this.fromTimestamp = new Date(this.from).getTime();
    }
    if (this.to != null) {
      this.toTimestamp = new Date(this.to).getTime();
    }

    let getChart = "/rest/device/list/user";
    let filter = {
      userId: this.userId,
      name: this.name,
      fromTimestamp: this.TimeFilter.fromTimestamp,
      toTimestamp: this.TimeFilter.toTimestamp,
    };
    let params = new HttpParams({ fromObject: filter });
    console.log(this.userId);

    return this.http
      .get(environment.endpoint + getChart, { params })
      .pipe(map((result) => result));
  }

  //get chart
  getChart() {
    this.getDeviceLogsByUser().subscribe((data) => {
      let result: any = data;
      var i;
      let temperature = [];
      let alldate: any = [];
      for (i = 0; i < result.length; i++) {
        temperature.push(result[i].temperature);
        alldate.push(result[i].timestamp);
      }

      let date: any = [];
      var options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      alldate.forEach((data: number) => {
        let jsdate = new Date(data);
        date.push(jsdate.toLocaleString("en", options));
      });

      this.chart = new Chart("canvas", {
        
        type: "line",
        data: {
          labels: date,
          datasets: [
            {
              data: temperature,
              borderColor: "#3cba9f",
              fill: 'origin'
            },
          ],
        },
        options: {
          legend: {
            display: false,
          },
          scales: {
            xAxes: [
              {
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: "Time",
                },
              },
            ],
            yAxes: [
              {
                display: true,
              },
            ],
          },
        },
      });
    });
  }

  ngOnInit(): void {
    //auto 7 day when access
    this.selectedOption = "1 week";
    this.subParam = this.activatedRouted.queryParamMap.subscribe((params) => {
      this.userId = params.get("userId");
      this.name = params.get("name");
    });
    this.getTimestampXDayAgo(7);
    this.printedOption = "1 week";

    // alert("UserId" + this.userId)
    // alert("from" + this.fromTimestamp)
    // alert("to" + this.toTimestamp)

    this.titleService.setTitle("Safe Entry");
    this.setUpDaterange(
      "datetime",
      () => {
        this.getChart();
      },
      this.TimeFilter
    );
    console.log(this.TimeFilter);
  }
}
export interface SafeEntryTime {
  fromTimestamp: any;
  toTimestamp: any;
}
