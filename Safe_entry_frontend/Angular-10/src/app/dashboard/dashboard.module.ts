import { Approutes } from './../app-routing.module';
import { NgModule } from "@angular/core";
import {NgxPaginationModule} from 'ngx-pagination'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { DashboardComponent } from "./dashboard.component";
import { DeviceLogsComponent } from './dashboard-components/device-logs/device-logs.component';
import { ChartByUserComponent } from './dashboard-components/chart-by-user/chart-by-user.component';

// import { ProjectOfMonthComponent } from './dashboard-components/Overview/project-of-month.component';

const routes: Routes = [
  {
    path: "",
    children: [
      {
				path: '',
				component: DashboardComponent,
				data: {
          title: "",
          urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
        }        
      },
      {
        path:"chart-by-user",
        component: ChartByUserComponent, 
        data: {
          title: "",
          urls: [{ title: "Chart", url: "/dashboard" }, { title: "Chart" }],
        }          
      }
    ]    
  } 
];

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    ChartsModule,    
    NgbModule,
    NgxPaginationModule, 
  ], 
  exports:[ChartByUserComponent],
  declarations: [DashboardComponent, DeviceLogsComponent, ChartByUserComponent],
})
export class DashboardModule {}
