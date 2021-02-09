import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { JobService } from '@app/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss']
})
export class JobViewComponent implements OnInit {
  myData:any;
  constructor(
    private jobService: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.viewData();
  }

  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
   
     let bodydata = { job_post_id: serverData}; 
    console.log(bodydata);
    this.jobService.fatchData(bodydata).subscribe((response: any) => {
      
      this.myData = response.data[0];
      console.log(this.myData);
      
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
       
        console.log(bodydata);
        this.router.navigate(['/jobs-apply/', id]);      
      }
    })
    
  }
















}
