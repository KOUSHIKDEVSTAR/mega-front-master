import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { JobService } from '@app/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  private SERVER_URL = environment.SERVER_URL;
  products: any;
  jobsPost:any;
  BASE_URL: any = environment.BASE_URL;
 

  constructor(
    private jobService: JobService,
    
    private router: Router,
   
   
  ) { 

  

  }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe((prods: any) => {
      this.jobsPost = prods.data;     
    });
    
  }

   ngAfterViewInit() {
   
  }
  onclickEdit(id){
    
    this.router.navigate(['/vendor-job-edit/', id]);
   
  }

  
selectProduct(id: number) {
    this.router.navigate(['/jobs-view/', id]).then();
  }


  onChangeSearchTerm(val){
    let callApi = true;
    // setTimeout(() => {
      console.log(val);
    // }, 1500);
    if(val && val.length > 0 && callApi){
      callApi = false;
      let bodydata = { searchData: val}; 
      this.jobService.getAllJobsFilter(bodydata).subscribe((prods: any) => {
        
        if(prods.code==200){
          this.jobsPost = prods.data;
          callApi = false;
        }    
      });
    }  

  }




}
