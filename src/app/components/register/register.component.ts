import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [EmailValidator]
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  // tslint:disable-next-line:max-line-length
  private emailPattern = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
  comparePassword: boolean;
  registrationMessage: any;

  constructor(private fb: FormBuilder,
              private checkEmailService: CheckEmailService,
              private userService: UserService,
              private toastr: ToastrService
              ) {

    this.registrationForm = fb.group({
      fname: ['', [Validators.required, Validators.minLength(4)]],
      lname: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)],
        [this.checkEmailService.emailValidate()]
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]],
      gender:['',[Validators.required]],
      dob: ['',[Validators.required]],
      field_of_study: ['',[Validators.required]],
      university_name: ['',[Validators.required]],
      student_id: ['',[Validators.required]],
      student_exp_date: ['',[Validators.required]],
      course_name: ['',[Validators.required]],
      address: ['',[Validators.required]],
      state: ['',[Validators.required]],
      suburb: ['',[Validators.required]],
      postcode: ['',[Validators.required]],
      phone: ['',[Validators.required]],

      student_origin_country: ['',[Validators.required]],
      student_visa_type: ['',[Validators.required]],
      student_city_live: ['',[Validators.required]],
      productImages:['']
    });
  }

  get formControls() {
    return this.registrationForm.controls;
  }


  ngOnInit(): void {
    this.registrationForm.valueChanges
      .pipe(map((controls) => {
        return this.formControls.confirmPassword.value === this.formControls.password.value;
      }))
      .subscribe(passwordState => {
        console.log(passwordState);
        this.comparePassword = passwordState;
      });
      let roleUser = 555;
      this.registrationForm.patchValue({
        role:roleUser
      })
  }
  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log('FILE UP  :', file);
      
      this.registrationForm.get('productImages').setValue(file);
    }
  }
  registerUser() {

    if (this.registrationForm.invalid) {
      return;
    }
    console.log('Data :  ',this.registrationForm.value);
    
    
    this.userService.registerUser({...this.registrationForm.value}).subscribe((response: any) => {
      this.registrationMessage = response.message;
      if(response.message != ''){
        var fd = new FormData();
        let imgId = uuidv4();
        fd.append(`productImages`, this.registrationForm.value.productImages, `${imgId}.jpg`);
        this.userService.imageDataregstu(fd,'profileID',response.id).subscribe((response: any) => {
          this.registrationMessage = response.message;
          this.toastr.success('Successful', response.message);
          
        });
        this.registrationForm.reset();
      }
    });

   
  }
}
