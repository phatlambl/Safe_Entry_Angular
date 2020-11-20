import { LoginGuard } from './access/login.guard';
import { AuthGuard } from './access/auth.guard';
import { AccessComponent } from './access/access.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { FullComponent } from './layouts/full/full.component';

export const Approutes: Routes = [
 
  
  {
    path: 'admin',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
      }
    ]
  }
  ,  
   {
    path: 'admin/login',
    canActivate: [LoginGuard],
    component: AccessComponent

  },
  { path: '**', redirectTo: 'admin' }
];
