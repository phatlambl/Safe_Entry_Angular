import { AuthenService } from './../../access/authen.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';

//declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent {
  @Output()
  toggleSidebar = new EventEmitter<void>();

  public showSearch = false;

  constructor(private router: Router, private AuthenService: AuthenService) {}

  logout(){
    this.AuthenService.logout();
    this.router.navigate(['admin/login']);
  }
}
