import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {ResponseModel, UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {AuthService, SocialUser} from 'angularx-social-login';
import { JobService } from '@app/services/job.service';

@Component({
  selector: 'app-job-add',
  templateUrl: './job-add.component.html',
  styleUrls: ['./job-add.component.scss']
})
export class JobAddComponent implements OnInit {
  myUser: any;
  jobForm: FormGroup;
  registrationMessage: string;
  constructor(private fb: FormBuilder,
    private checkEmailService: CheckEmailService,
    private userService: UserService,
    private jobService: JobService) {

this.jobForm = fb.group({
  author: [''],
  job_post_title: ['', [Validators.required]],
  job_post_content: ['', [Validators.required]],
  job_address:['',[Validators.required]],
  
});
}
get formControls() {
  return this.jobForm.controls;
}

  ngOnInit(): void {
    this.userService.userData$
    
      .subscribe((data: ResponseModel | SocialUser) => {
        
        
        this.myUser = data;
      });
      let email= localStorage.getItem('email');
      let userRole= localStorage.getItem('userRole');
     
      if(email){        
       
        this.userService.UserDataFatch(email);
      }
  }
  registerJob() {

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
