import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VendorService } from '@app/services/vendor.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-vendor-profile-edit',
  templateUrl: './vendor-profile-edit.component.html',
  styleUrls: ['./vendor-profile-edit.component.scss']
})
export class VendorProfileEditComponent implements OnInit {
  myData: any;
  vendorForm: FormGroup;
  registrationMessage: string;
  constructor(
    private fb: FormBuilder,
    
    private vendorService: VendorService,
    private route: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService
  ) {
    this.vendorForm = fb.group({
      id:[''],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email:['',[Validators.required]],
      company_name: ['', [Validators.required]],
      company_address: ['', [Validators.required]],
      company_about:['',[Validators.required]],
      productImages:[''],
      
    });
   }

  ngOnInit(): void {
    this.viewData();
  }

  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
   
     let bodydata = { id: serverData};   

    //@ts-ignore
    this.vendorService.fatchData(bodydata).subscribe((response: any) => {
      // this.registrationMessage = response.message;
      this.myData = response.data[0];
      // console.log('VIEW  ',this.myData);
     this.vendorForm.patchValue({
        id: this.myData.id,
        fname: this.myData.fname,
        lname: this.myData.lname,
        email: this.myData.email,

        company_name: this.myData.company_name,
        company_address: this.myData.company_address,
        company_about: this.myData.company_about,
        
      }) 
    });  
    
  }
  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log('FILE UP  :', file);
      
      this.vendorForm.get('productImages').setValue(file);
    }
  }
  editData() {

    if (this.vendorForm.invalid) {
      // console.log('In val form ');
      return;
    }
    // console.log('Val Form',this.vendorForm.value);

    this.vendorService.editData({...this.vendorForm.value}).subscribe((response: any) => {
      // this.registrationMessage = response.message;
      if(response.message != ''){
        var fd = new FormData();
        let imgId = uuidv4();
        fd.append(`productImages`, this.vendorForm.value.productImages, `${imgId}.jpg`);
        this.vendorService.imageData(fd,'vendor',this.myData.id).subscribe((response: any) => {
          this.registrationMessage = response.message;
          this.toastr.success('Successful', response.message);
          this.router.navigate(['/vendor-profile']);   
        });
      }
    });

  }











}
