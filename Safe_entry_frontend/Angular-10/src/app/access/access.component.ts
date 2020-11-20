import { AuthenService } from './authen.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.css']
})
export class AccessComponent implements OnInit {

  loginForm: FormGroup;
  profileForm: FormGroup;
  // profileForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });

  error ='';
  submitted = false;


  constructor(private authService: AuthenService, private formBuilder: FormBuilder, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    
  }


  get f() { return this.profileForm.controls; }

  login() {
    // console.log("user: " + this.f.username.value)
    // console.log("password: " + this.f.password.value)
    this.submitted = true

    if (this.loginForm.invalid) {
      return;
    }
    this.authService.login(
      {
        username: this.f.username.value,
        password: this.f.password.value
      }
    )    
    .subscribe(success => {
      // console.log("true hay false: " + success)      
      if (success) {
        this.router.navigate(['/dashboard']);
      }else{
        this.error = this.authService.error
      }

    });
  }



}
