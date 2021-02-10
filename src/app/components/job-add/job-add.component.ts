import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {ResponseModel, UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {AuthService, SocialUser} from 'angularx-social-login';
import { JobService } from '@app/services/job.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {
  myUser: any;
  jobForm: FormGroup;
  registrationMessage: string;
  errorMessage: any;
  constructor(
    private fb: FormBuilder,
    private checkEmailService: CheckEmailService,
    private userService: UserService,
    private jobService: JobService,
    private toastr: ToastrService,
    private router:Router
    ) {

this.jobForm = fb.group({
  author: [''],
  job_post_title: ['', [Validators.required]],
  job_post_content: ['', [Validators.required]],
  job_address:['',[Validators.required]],

  job_type:['',[Validators.required]],
  job_level:['',[Validators.required]],
  closes_date:['',[Validators.required]],
  salary_details:['',[Validators.required]],
  job_category:['',[Validators.required]],
  salary:['',[Validators.required]],
  
  productImages:[''],
  
});
}
get formControls() {
  return this.jobForm.controls;
}

  ngOnInit(): void {
    this.jobForm.patchValue({
     
      job_type: ' ',
      job_level: ' ',
      job_category: ' ',
      
    })
    this.userService.userData$
    
      .subscribe((data: ResponseModel | SocialUser) => {
        
        
        this.myUser = data;
      });
      let email= localStorage.getItem('email');
      let userID= localStorage.getItem('userID');
     
      if(email){        
       
        this.userService.UserDataFatch(email);
      }
      this.jobForm.patchValue({
        author:userID
      })
  }
  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log('FILE UP  :', file);
      
      this.jobForm.get('productImages').setValue(file);
    }
  }
  registerJob() {

    if (this.jobForm.invalid) {
      // console.log('In val form ');
      this.errorMessage = 'Some Miss';
      return;
    }

    // console.log('Val Form',this.jobForm.value);
    

    // @ts-ignore
    this.jobService.registerjob({...this.jobForm.value}).subscribe((response: any) => {
      this.registrationMessage = response.message;
      
      if(response.message != ''){
        var fd = new FormData();
        let imgId = uuidv4();
        fd.append(`productImages`, this.jobForm.value.productImages, `${imgId}.jpg`);
        this.jobService.imageData(fd,'job',response.lastId).subscribe((response: any) => {
          // this.registrationMessage = response.message;
          this.toastr.success('Successful', this.registrationMessage);
          this.router.navigate(['/vendor-profile']);  
          // this.jobForm.reset(); 
        });
        
      }
    });

    

    
  }
}
