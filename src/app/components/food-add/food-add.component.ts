import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {ResponseModel, UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {AuthService, SocialUser} from 'angularx-social-login';
import { FoodService } from '@app/services/food.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food-add',
  templateUrl: './food-add.component.html',
  styleUrls: ['./food-add.component.scss']
})
export class FoodAddComponent implements OnInit {
  myUser: any;
  foodForm: FormGroup;
  registrationMessage: string;
  errorMessage: any;
  constructor(
    private fb: FormBuilder,
    private checkEmailService: CheckEmailService,
    private userService: UserService,
    private foodService: FoodService,
    private toastr: ToastrService,
    private router:Router
  ) {

    this.foodForm = fb.group({
      author: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      food_contract: ['', [Validators.required]],
      restaurants_name:['',[Validators.required]],
      closes_date:['',[Validators.required]],
      discount:['',[Validators.required]],
      discount_code:['',[Validators.required]],
      productImages:['',[Validators.required]],
      
    });

   }

  ngOnInit(): void {
    let userID= localStorage.getItem('userID');
    this.foodForm.patchValue({
     
      author: userID      
    })
  }

  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('FILE UP  :', file);
      
      this.foodForm.get('productImages').setValue(file);
    }
  }


  registerfood() {

    if (this.foodForm.invalid) {
      // console.log('In val form ');
      this.errorMessage = 'Some Miss';
      return;
    }

    console.log('Val Form',this.foodForm.value);
    

    // // @ts-ignore
    this.foodService.registerfood({...this.foodForm.value}).subscribe((response: any) => {
      this.registrationMessage = response.message;
      
      if(response.message != ''){
        var fd = new FormData();
        let imgId = uuidv4();
        fd.append(`productImages`, this.foodForm.value.productImages, `${imgId}.jpg`);
        this.foodService.imageData(fd,'food',response.lastId).subscribe((response: any) => {
          // this.registrationMessage = response.message;
          this.toastr.success('Successful', this.registrationMessage);
          this.router.navigate(['/vendor-profile']);  
          // this.jobForm.reset(); 
        });
        
      }

    });

    

    
  }
























}
