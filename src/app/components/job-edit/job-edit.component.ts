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
  errorMessage: string;
  constructor(
    private fb: FormBuilder,
    
    private jobService: JobService,
    private route: ActivatedRoute,
  ) { 
    this.jobForm = fb.group({
      job_post_id:[''],
      job_post_title: ['', [Validators.required]],
      job_post_content: ['', [Validators.required]],
      job_address:['',[Validators.required]],
      job_type:['',[Validators.required]],
      job_level:['',[Validators.required]],
      closes_date:['',[Validators.required]],
      salary_details:['',[Validators.required]],
      job_category:['',[Validators.required]],
      salary:['',[Validators.required]],
      
      // productImages:[''],
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
     this.jobForm.patchValue({
        job_post_id: this.myData.job_post_id,
        job_post_title: this.myData.job_post_title,
        job_post_content: this.myData.job_post_content,
        job_address: this.myData.job_address,

        job_type:this.myData.job_type,
      job_level:this.myData.job_level,
      closes_date:this.myData.closes_date,
      salary_details:this.myData.salary_details,
      job_category:this.myData.job_category,
      salary:this.myData.salary,
        
      })

      
    });  
    
  }
  editData() {

    if (this.jobForm.invalid) {
      // console.log('In val form ');
      this.errorMessage = 'Some Missing';
      return;
    }

    // console.log('Val Form',this.jobForm.value);
    

    // @ts-ignore
    this.jobService.editData({...this.jobForm.value}).subscribe((response: any) => {
      this.registrationMessage = response.message;
    });

    // this.jobForm.reset();


    
  }

}
