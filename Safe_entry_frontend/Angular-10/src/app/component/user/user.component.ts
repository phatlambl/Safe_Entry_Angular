import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  pageIndex: any;
  count = 0;
  uploadForm: FormGroup;

  import: boolean=false;
  messageImport: boolean= false;


  //add User
  addUser: boolean=false;
  UUID: any;
  nameUser: any;
 
  
  
  //filter
  name: any;
  userId: any;
  email: any;

   //pagination
   pageSize: any;
   currentPage: any;
   totalItems: any;
   formData = new FormData();


     //page Size
  selectedOption: any;
  options = [
    { name: "10", value: 10 },
    { name: "25", value: 25 },
    { name: "50", value: 50 },
    { name: "100", value: 100 }
  ]

  constructor(private http: HttpClient,  private formBuilder: FormBuilder,) { 
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  

  public data: Object = [];
  ngOnInit(): void {
    

    this.currentPage = 0;
    this.pageSize = 15;
    const url = '/rest/user/list?page='  + (this.currentPage) + '&pageSize=' + this.pageSize;
    this.data = this.http.get(environment.endpoint + url).toPromise().then((data: any) => {
      console.log('user list: ', data);
      this.convertData(data)
    });
    // const Observable = this.http.get(this.api.getListDeviceLogs, options);
  }


  onSubmit(){
    // formData.append('myFile', this.uploadForm.get('profile')?.value);
    this.http.post<any>(environment.endpoint + '/rest/user/import', this.formData).toPromise().then((data: any) => {     
     
      alert(data.message)      
    
  });
  this.getPage()
  }


  showHideImport(){
    if(this.import){
      this.import=false
    }else{
      this.import=true
    }
    
  }

  onDelete(id:any){
    console.log(id)
    this.http.delete(environment.endpoint + '/')
  }

  message(){
    if(this.messageImport){
      this.messageImport=false
    }else{
      this.messageImport=true
    }

  }

  convertData(response: any){
    
    let myArray: any =[];      
    this.totalItems = response.totalItems
    this.currentPage = response.currentPage + 1
    this.pageSize = response.pageSize
  
      response.listUser.forEach((data: any)=>{ 
        
        let temp = {} as tempUser
        temp.id = data.id;
        temp.name = data.name;
        temp.email = data.email;

        myArray.push(temp)
      })

      this.data = myArray;     
  }


  getPage(){
    const url = '/rest/user/list?page='  + (this.currentPage - 1) + '&pageSize=' + this.pageSize; 
    const Observable = this.http.get(environment.endpoint + url).subscribe((response) => {
      // console.log(response);
      this.convertData(response)
      // console.log(this.totalItems)
    });
  
  }

  getPageSize(){
    this.pageSize = this.selectedOption;
    this.getPage();
  }



  handlePageChange(event: number){
    this.currentPage= event;    
    this.getPage();
    // console.log("current: " + this.currentPage)
  }


  onChange($event: any): void {
    console.log($event.target.files[0]);
    // var formData = new FormData();
    this.formData.append('myFile', $event.target.files[0], 'profile');
  }
  showHideAddUser(){
    if(this.addUser){
      this.addUser=false
    }else{
      this.addUser=true
    }

  }

  postAddUser(){
    const url = '/rest/user/add';
    this.http.post(environment.endpoint + url, {id: this.UUID, name: this.nameUser}).toPromise().then((data: any) => {     
     
        alert(data.message)      
      
    });
    this.getPage()
  }




}
export interface tempUser{
  id:any;
  name: any;
  email: any;

}