import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailValidator, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ResponseModel, UserService} from '../../services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  myData: any;
  profileForm: FormGroup;
  registrationMessage: string;
  constructor(
    private fb: FormBuilder,
    
    private userService: UserService,
    private route: ActivatedRoute, 
    private router: Router,
    private toastr: ToastrService
  ) {
    this.profileForm = fb.group({
      id:[''],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email:['',[Validators.required]],
      gender:['',[Validators.required]],
      dob:['',[Validators.required]],
      field_of_study:['',[Validators.required]],
      university_name:['',[Validators.required]],
      student_id:['',[Validators.required]],
      student_exp_date:['',[Validators.required]],
      course_name:['',[Validators.required]],
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
    this.userService.fatchData(bodydata).subscribe((response: any) => {
      // this.registrationMessage = response.message;
      this.myData = response.data[0];
      // console.log('VIEW  ',this.myData);
     this.profileForm.patchValue({
        id: this.myData.id,
        fname: this.myData.fname,
        lname: this.myData.lname,
        email: this.myData.email,
        gender: this.myData.gender,
        dob: this.myData.dob,
        field_of_study: this.myData.field_of_study,
        university_name: this.myData.university_name,
        student_id: this.myData.student_id,
        student_exp_date: this.myData.student_exp_date,
        course_name: this.myData.course_name,
        
      }) 
    });  
    
  }

  onFileSelect(event) {
    
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log('FILE UP  :', file);
      
      this.profileForm.get('productImages').setValue(file);
    }
  }
  editData() {

    if (this.profileForm.invalid) {
      console.log('In val form ');
      return;
    }
    console.log('Val Form',this.profileForm.value);

    this.userService.editData({...this.profileForm.value}).subscribe((response: any) => {
      // this.registrationMessage = response.message;
      if(response.message != ''){
        var fd = new FormData();
        let imgId = uuidv4();
        fd.append(`productImages`, this.profileForm.value.productImages, `${imgId}.jpg`);
        this.userService.imageData(fd,'profife',this.myData.id).subscribe((response: any) => {
          this.registrationMessage = response.message;
          this.toastr.success('Successful', response.message);
          this.router.navigate(['/profile']);   
        });
      }
    });

  }










}
