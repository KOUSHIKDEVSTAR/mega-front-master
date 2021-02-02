import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {ResponseModel, UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {AuthService, SocialUser} from 'angularx-social-login';
import { AccomodationService } from '@app/services/accomodation.service';


@Component({
  selector: 'app-accomodation-add',
  templateUrl: './accomodation-add.component.html',
  styleUrls: ['./accomodation-add.component.scss']
})
export class AccomodationAddComponent implements OnInit {
  myUser: any;
  accomodationForm: FormGroup;
  registrationMessage: string;
  constructor(private fb: FormBuilder,
    private checkEmailService: CheckEmailService,
    private userService: UserService,
    private accomodationService: AccomodationService) {

this.accomodationForm = fb.group({
  author: [''],
  title: ['', [Validators.required]],
  post_content: ['', [Validators.required]],
  accomodation_price: ['', [Validators.required]],
  post_short_content:['',[Validators.required]],
  address:['',[Validators.required]],
  accomodation_type:['',[Validators.required]],
  bedroom:['',[Validators.required]],
  bathroom:['',[Validators.required]],
  parking_area:['',[Validators.required]],
  floor_area:['',[Validators.required]],
});
}
get formControls() {
  return this.accomodationForm.controls;
}

  ngOnInit(): void {
    this.userService.userData$
    
      .subscribe((data: any) => {
        
        
        this.myUser = data;
        
        
      });
      let email= localStorage.getItem('email');
      let userRole= localStorage.getItem('userRole');
     
      if(email){        
       
        this.userService.UserDataFatch(email);
      }
  }

  registerAccomodation() {

    if (this.accomodationForm.invalid) {
      // console.log('In val form ');
      
      return;
    }

    // console.log('Val Form',this.accomodationForm.value);

    let bodydata = {...this.accomodationForm.value, author: this.myUser.user.id};   

    // @ts-ignore
    this.accomodationService.registeraccomodation(bodydata).subscribe((response: { message: string }) => {
      this.registrationMessage = response.message;
    });

    this.accomodationForm.reset();

    
  }
  }


