import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { environment } from './../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



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
  csv_link: String = environment.endpoint + "/rest/user/download";


  //add User
  addUser: boolean=false;
  UUID: any="";
  nameUser: any="";
  emailUser: any="";
 
  
  //delete
  confirmDelete: String="Are you sure delete ";
  idDelete: any="";
  nameDelete: any="";

  //filter
  name: any='';
  userId: any='';
  email: any='';

  //sort
  sortBy: any;
  order: any;
  test: boolean =true;

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


  

  public data: any;

  constructor(private http: HttpClient,  private formBuilder: FormBuilder,
     modalService: NgbModal, private toastr : ToastrService ) { 
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  

 
  ngOnInit(): void {
    

    this.currentPage = 0;
    this.pageSize = 15;
    const url = '/rest/user/list?page='  + (this.currentPage) + '&pageSize=' + this.pageSize;
    this.http.get(environment.endpoint + url).subscribe((response) => {           
      this.convertData(response)
     
    });   
  }


 
  onSubmit(){
    // formData.append('myFile', this.uploadForm.get('profile')?.value);
    this.http.post<any>(environment.endpoint + '/rest/user/import', this.formData).toPromise().then((data: any) => {     
     
      if(data.statusCode === 200){
        this.toastr.success(data.message)
        this.getPage()
      }else{
        this.toastr.error(data.message);  
      }
      this.formData.delete('myFile');
      
    
  });
  
  }


  showHideImport(){
    if(this.import){
      this.import=false
    }else{
      this.import=true
    }
    
  }

  postAddUser(){
    const url = '/rest/user/add';
    this.http.post(environment.endpoint + url, {id: this.UUID, name: this.nameUser}).toPromise().then((data: any) => {     
     
      if(data.statusCode === 200){
        this.toastr.success(data.message);
        this.getPage();
      }else{
        this.toastr.error(data.message);  
      }      
    });
    
  }
  EditRow(id: any){
    this.UUID = id;
  }
  update(){
    const update = '/rest/user/update';
    this.http.put(environment.endpoint + update,{id: this.UUID, name: this.nameUser, email: this.emailUser}).toPromise().then((data:any) => {
      if(data.statusCode === 200){
        this.toastr.success(data.message);
        this.getPage();
        // this.refresh();
      }else{
        this.toastr.error(data.message);  
      }     
    });
    this.UUID="";
    this.nameUser="";
    this.emailUser="";
  }

  // validate delete
  onDelete(id:any, name:any){ 
    this.idDelete = id;
    this.nameDelete = name    
  }
  delete(){
    const API_Delete = '/rest/user/delete/';
    this.http.delete(environment.endpoint + API_Delete + this.idDelete).toPromise().then((data:any) => {
      if(data.statusCode === 200){
        this.toastr.success(data.message);
        this.getPage();
        // this.refresh();
      }else{
        this.toastr.error(data.message);  
      }     
    });
    this.idDelete = "";
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

        const url = '/rest/user/list?page='  + (this.currentPage - 1) + '&pageSize=' + this.pageSize
        + '&name=' + this.name +'&userId=' + this.userId + '&email=' + this.email + 
        '&sortBy=' + this.sortBy + '&order=' + this.order ; 
    const Observable = this.http.get(environment.endpoint + url).subscribe((response) => {
        this.convertData(response)      
    });
  
  }
  selectSort(sort: any){   
    if(this.test){
      this.test = false
    }else{
      this.test = true;
    }
      
    var orderBy
     console.log("click: " + sort )
     if (this.test){
      orderBy = "DESC"
     }else{
       orderBy ="ASC"
     }
     console.log("test oderBy: " + orderBy)

     this.sortBy = sort
     this.order = orderBy
     this.getPage()   

  }

  getPageSize(){
    this.pageSize = this.selectedOption;
    this.getPage();
  }

  refresh(){
    const refresh = '/rest/user/list?page='  + 0 + '&pageSize=' + this.pageSize; 
    const Observable = this.http.get(environment.endpoint + refresh).subscribe((response) => {      
      this.convertData(response)   
    });
  }


  handlePageChange(event: number){
    this.currentPage= event;    
    this.getPage();
    // console.log("current: " + this.currentPage)
  }


  onChange($event: any): void {
    // console.log($event.target.files[0]);
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


}
export interface tempUser{
  id:any;
  name: any;
  email: any;

}