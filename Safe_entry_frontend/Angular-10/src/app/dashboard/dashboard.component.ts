import { Title } from '@angular/platform-browser';
import { Component, AfterViewInit } from '@angular/core';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit {
  subtitle: string;
  constructor(private titleService:Title) {   
    this.titleService.setTitle("Some title");
  }







  ngAfterViewInit() { }
}
