import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {ResponseModel, UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {AuthService, SocialUser} from 'angularx-social-login';
import { AccomodationService } from '@app/services/accomodation.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accomodation-add',
  templateUrl: './accomodation-add.component.html',
  styleUrls: ['./accomodation-add.component.scss']
})
export class AccomodationAddComponent implements OnInit {
  myUser: any;
  accomodationForm: FormGroup;
  registrationMessage: string;
  errorMessage: string;
  constructor(private fb: FormBuilder,
    private checkEmailService: CheckEmailService,
    private userService: UserService,
    private toastr: ToastrService,
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
  furnished:['',[Validators.required]],
  dwelling_type:['',[Validators.required]],
  available:['',[Validators.required]],
  inspections_date:['',[Validators.required]],
  inspections_time:['',[Validators.required]],
  productImagesMulti:['',[Validators.required]],
});
}
get formControls() {
  return this.accomodationForm.controls;
}

  ngOnInit(): void {
    this.accomodationForm.patchValue({
     
      accomodation_type: ' ',
      furnished: ' ',
      
    })

    this.userService.userData$
    
      .subscribe((data: any) => {
        
        
        this.myUser = data;
        
        
      });
      let email= localStorage.getItem('email');
      let userID= localStorage.getItem('userID');
     
      if(email){        
       
        this.userService.UserDataFatch(email);
      }
      this.accomodationForm.patchValue({
        author:userID
      })
  }
  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files;
      // console.log('FILE UP  :', file);
      
      this.accomodationForm.get('productImagesMulti').setValue(file);
    }
  }
  registerAccomodation() {

    if (this.accomodationForm.invalid) {
      // console.log('In val form ');
      this.registrationMessage = 'Some Missing';
      return;
    }

    console.log('Val Form',this.accomodationForm.value);

    let bodydata = {...this.accomodationForm.value, author: this.myUser.user.id};   

    // @ts-ignore
    this.accomodationService.registeraccomodation(bodydata).subscribe((response: any) => {
      this.registrationMessage = response.message;

      if(response.message != ''){

        var fd = new FormData();
        let lastId = response.lastId;
        console.log('FILE DATA :', Array.from(this.accomodationForm.value.productImagesMulti));
        let fileArr = Array.from(this.accomodationForm.value.productImagesMulti);

        fileArr.forEach((file: any, index)=>{
          let imgId = uuidv4();
          fd.append(`productImagesMulti`, file, `${imgId}.jpg`);

          if(index+1 == this.accomodationForm.value.productImagesMulti.length){
            this.accomodationService.imageData(fd,'vendor-add',lastId ).subscribe((response: any) => {
              this.registrationMessage = response.message;
              this.toastr.success('Successful', response.message);
              // this.router.navigate(['/profile']);
              this.accomodationForm.reset();   
            });
          }
        });
        // fd.append(`productImagesMulti`, this.accomodationForm.value.productImagesMulti, `${imgId}.jpg`);
        
      }

    });

    

    
  }
  }


