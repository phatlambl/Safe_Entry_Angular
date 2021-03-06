import { TabModule } from 'angular-tabs-component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DeviceComponent } from './device/device.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ComponentsRoutes } from './component.routing';
import  {UserComponent}from './user/user.component';
import { TemperatureSettingComponent } from './temperature-setting/temperature-setting.component';
import { NgxTagsInputModule } from 'ngx-tags-input';
import { UiSwitchModule } from 'ngx-toggle-switch';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ComponentsRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    TabModule,
    NgxTagsInputModule,
    UiSwitchModule
  ],
  declarations: [ 
    TemperatureSettingComponent,
    UserComponent,
    DeviceComponent

  ]
})
export class ComponentsModule {}
