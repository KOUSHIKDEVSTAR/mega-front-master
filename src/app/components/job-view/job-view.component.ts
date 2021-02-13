import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { JobService } from '@app/services/job.service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss']
})
export class JobViewComponent implements OnInit {

  userRole:any;
  userID:any;
  myData:any;
  checkData:any;
  BASE_URL: any = environment.BASE_URL;
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.uesrRoleFun();
    this.viewData();
    if(this.userRole == '555'){
      this.oncheck();
    }
    
  }

  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
   
     let bodydata = { job_post_id: serverData}; 
    
    this.jobService.fatchData(bodydata).subscribe((response: any) => {
      
      this.myData = response.data[0];
      // console.log(this.myData);
      
    });
    

    }
    oncheck(){
      let serverData = this.route.snapshot.paramMap.get('id');
     let bodydata = { job_post_id: serverData , author:this.userID }; 
    
     this.jobService.checkJobApply(bodydata).subscribe((response: any) => {
       
       this.checkData = response.data;
       
       if(response.data != ''){
        // console.log(this.checkData);
        this.checkData = true;
        console.log('if',this.checkData);
        
       }else{
         this.checkData = false;
         console.log('else',this.checkData);
         
       }
     });
      
    }
  onclickApply(id){
    
   
    Swal.fire({
      title: 'Are you sure Apply Job?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Apply it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let bodydata = {job_post_id: id};
       
        // console.log(bodydata);
        this.router.navigate(['/jobs-apply/', id]);      
      }
    })
    
  }
  onclickEdit(id){
    this.router.navigate(['/vendor-job-edit/', id]);
  }

uesrRoleFun(){
  let userRoleData =localStorage.getItem('userRole');
    let userIDData =localStorage.getItem('userID');
    this.userRole =userRoleData;
    this.userID =userIDData;
  
}













}
