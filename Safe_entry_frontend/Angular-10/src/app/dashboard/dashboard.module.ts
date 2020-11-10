import { Approutes } from './../app-routing.module';
import { Title } from '@angular/platform-browser';
import { NgModule } from "@angular/core";
import {NgxPaginationModule} from 'ngx-pagination'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { ChartsModule } from "ng2-charts";
import { DashboardComponent } from "./dashboard.component";
import { SalesGraphComponent } from './dashboard-components/sales-graph/sales-graph.component';
import { VisitGraphComponent } from './dashboard-components/visit-graph/visit-graph.component';
import { WebsiteGraphComponent } from './dashboard-components/website-graph/website-graph.component';
import { CardsComponent } from './dashboard-components/cards/cards.component';
import { ContactsComponent } from './dashboard-components/contacts/contacts.component';
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
    NgxPaginationModule
  ], 
  exports:[ChartByUserComponent],
  declarations: [DashboardComponent, SalesGraphComponent, VisitGraphComponent, WebsiteGraphComponent, CardsComponent, ContactsComponent, DeviceLogsComponent, ChartByUserComponent],
})
export class DashboardModule {}
