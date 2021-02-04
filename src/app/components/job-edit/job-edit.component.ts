import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';

import { JobService } from '@app/services/job.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  myData: any;
  jobForm: FormGroup;
  registrationMessage: string;
  constructor(
    private fb: FormBuilder,
    
    private jobService: JobService,
    private route: ActivatedRoute,
  ) { 
    this.jobForm = fb.group({
      
      job_post_title: ['', [Validators.required]],
      job_post_content: ['', [Validators.required]],
      job_address:['',[Validators.required]],
      
    });

  }

  ngOnInit(): void {
    this.viewData();
  }
  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
   
     let bodydata = { job_post_id: serverData};   

    //@ts-ignore
    this.jobService.fatchData(bodydata).subscribe((response: any) => {
      // this.registrationMessage = response.message;
      this.myData = response.data[0];
      // console.log('VIEW  ',this.myData);
     

      
    });  
    
  }
  editData() {

    if (this.jobForm.invalid) {
      // console.log('In val form ');
      
      return;
    }

    console.log('Val Form',this.jobForm.value);
    

    // @ts-ignore
    // this.jobService.registerjob({...this.jobForm.value}).subscribe((response: { message: string }) => {
    //   this.registrationMessage = response.message;
    // });

    // this.jobForm.reset();


    
  }

}
