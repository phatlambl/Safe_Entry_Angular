import { DeviceComponent } from './device/device.component';
import { UserComponent } from './user/user.component';
import { Routes } from '@angular/router';
import {TemperatureSettingComponent} from './temperature-setting/temperature-setting.component';


export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
	
			{
				path: 'setting',
				component: TemperatureSettingComponent,
				data: {
					title: '',
					urls: [
						{ title: 'Dashboard', url: 'admin/dashboard' },
						{ title: 'ngComponent' },
						{ title: 'Setting' }
					]
				}
			},	
			{
				path: 'setting',
				component: TemperatureSettingComponent,
				data: {
					title: '',
				}
			},
			{
				path: 'user',	
				component: UserComponent,
				data: {
					title: '',
				}
			},
			{
				path: 'device',
				component: DeviceComponent,
				data: {
					title: '',
				}
			}
		]
	}
];
