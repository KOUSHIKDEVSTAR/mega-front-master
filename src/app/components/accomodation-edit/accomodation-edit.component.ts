import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AccomodationService } from '@app/services/accomodation.service';

@Component({
  selector: 'app-accomodation-edit',
  templateUrl: './accomodation-edit.component.html',
  styleUrls: ['./accomodation-edit.component.scss']
})
export class AccomodationEditComponent implements OnInit {

  myData: any;
  accomodationForm: FormGroup;
  registrationMessage: string;
  constructor(
    private fb: FormBuilder,
    private accomodationService: AccomodationService,
    private route: ActivatedRoute,

  ) { 
    this.accomodationForm = fb.group({
      accomodation_id : ['', [Validators.required]],
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
    this.viewData();
    
  }
  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
   
     let bodydata = { accomodation_id: serverData};   

    //@ts-ignore
    this.accomodationService.fatchaccomodation(bodydata).subscribe((response: any) => {
      // this.registrationMessage = response.message;
      this.myData = response.data[0];
      // console.log('VIEW  ',this.myData);
      this.accomodationForm.patchValue({
        accomodation_id: this.myData.accomodation_id,
        title: this.myData.title,
        post_content: this.myData.post_content,
        accomodation_price: this.myData.accomodation_price,
        accomodation_type: this.myData.accomodation_type,
        bedroom: this.myData.bedroom,
        bathroom: this.myData.bathroom,
        parking_area: this.myData.parking_area,
        floor_area: this.myData.floor_area,
        address: this.myData.address,
        post_short_content: this.myData.post_short_content,
      })
     

      
    });  
    
  }
  
  editAccomodation() {

    if (this.accomodationForm.invalid) {
      // console.log('In val form ');
      
      return;
    }

    // console.log('Val Form',this.accomodationForm.value);

    let bodydata = {...this.accomodationForm.value, accomodation_id: this.myData.accomodation_id};   

    // // @ts-ignore
    this.accomodationService.editaccomodation(bodydata).subscribe((response: { message: string }) => {
      this.registrationMessage = response.message;

    });

    

    
  }

}
