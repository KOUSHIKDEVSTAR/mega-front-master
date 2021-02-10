import {Component, OnInit} from '@angular/core';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CheckEmailService} from '../../validators/check-email.service';
import {ResponseModel, UserService} from '../../services/user.service';
import {map} from 'rxjs/operators';
import {AuthService, SocialUser} from 'angularx-social-login';
import { FoodService } from '@app/services/food.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss']
})
export class FoodEditComponent implements OnInit {
  myData: any;
  foodForm: FormGroup;
  registrationMessage: string;
  errorMessage: any;
  constructor(
    private fb: FormBuilder,
    private checkEmailService: CheckEmailService,
    private userService: UserService,
    private foodService: FoodService,
    private toastr: ToastrService,
    private router:Router,
    private route: ActivatedRoute,
  ) { 
    this.foodForm = fb.group({
      food_post_id: [''],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      food_contract: ['', [Validators.required]],
      restaurants_name:['',[Validators.required]],
      closes_date:['',[Validators.required]],
      discount:['',[Validators.required]],
      discount_code:['',[Validators.required]],
      // productImages:['',[Validators.required]],
      
    });
  }
  get formControls() {
    return this.foodForm.controls;
  }
  ngOnInit(): void {
    this.viewData();
  }

  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
   
     let bodydata = { food_post_id : serverData};   
    
    
    //@ts-ignore
    this.foodService.fatchData(bodydata).subscribe((response: any) => {
          
          
      this.myData = response.data[0];
      // console.log('VIEW  ',this.myData);
     this.foodForm.patchValue({
        food_post_id : this.myData.food_post_id ,
        title: this.myData.title,
        description: this.myData.description,
        food_contract: this.myData.food_contract,
        restaurants_name:this.myData.restaurants_name,
        discount:this.myData.discount,
        closes_date:this.myData.closes_date,
        discount_code:this.myData.discount_code,
      
        
      })

      
    });  
    
  }

  editData() {

    if (this.foodForm.invalid) {
      // console.log('In val form ');
      this.errorMessage = 'Some Missing';
      return;
    }

    console.log('Val Form',this.foodForm.value);
    

    // @ts-ignore
    this.foodService.editData({...this.foodForm.value}).subscribe((response: any) => {
      this.registrationMessage = response.message;
    });

    // this.jobForm.reset();


    
  }













}
