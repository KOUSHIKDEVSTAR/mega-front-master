import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { JobService } from '@app/services/job.service';
import {ResponseModel, UserService} from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.scss']
})
export class ApplyJobComponent implements OnInit {
  applyJobForm: FormGroup;
  registrationMessage: string;
  errorMessage: string;
  myData: any; 
  jobData: any; 
  ext :any;
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private jobService: JobService,
    private toastr: ToastrService,
  ) { 
    this.applyJobForm = fb.group({
      job_id : ['',[Validators.required]],
      first_name: ['',[Validators.required]],
      last_name: ['',[Validators.required]],
      user_email: ['',[Validators.required]],
      cover_letter:['',[Validators.required]],
      productdoc:['',[Validators.required]],
      user_id:['',[Validators.required]],
      
    });
  }

  ngOnInit(): void {
    this.viewData();
  }
  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
    
      this.ext = file.name.split('.')[1];
      
      
      
      this.applyJobForm.get('productdoc').setValue(file);
    }
  }

  viewData(){
    let userID = localStorage.getItem('userID');
    let serverData = this.route.snapshot.paramMap.get('id');

    let bodydatajob = { job_post_id: serverData};
    let bodydata = { id: userID};
    this.jobService.fatchData(bodydatajob).subscribe((response: any) => {
      this.jobData = response.data[0];  
    })
    this.userService.fatchData(bodydata).subscribe((response: any) => {
      // console.log(response);
      this.myData = response.data[0];
      this.applyJobForm.patchValue({
        job_id: serverData,
        first_name: this.myData.fname,
        last_name: this.myData.lname,
        user_email: this.myData.email,
        user_id: this.myData.id,
      
      })
    });
    
    
  }

  applyJob() {

    if (this.applyJobForm.invalid) {
      // console.log('In val form ',this.applyJobForm);
      this.errorMessage = 'Some field Missing' ;
      
      return;
    }

    // console.log('Val Form',this.applyJobForm.value);

    let bodydata = {...this.applyJobForm.value};   

    // // @ts-ignore
    this.jobService.applyjob(bodydata).subscribe((response: any) => {
      // console.log(response.applyJobid);
      
      // this.registrationMessage = response.message;
      if(response.message != ''){
        var fd = new FormData();
        let imgId = uuidv4();
        fd.append(`productdoc`, this.applyJobForm.value.productdoc, `${imgId}.${this.ext}`);
        this.jobService.documentData(fd,'userCV',response.applyJobid).subscribe((response: any) => {
          this.registrationMessage = response.message;
          this.toastr.success('Successful', response.message);
          
        });
      }

    });

    

    
  }




}
