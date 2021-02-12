import { Component, OnInit,ViewChild } from '@angular/core';
import {environment} from '../../../environments/environment';
import { AccomodationService } from '@app/services/accomodation.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-accomodation-view',
  templateUrl: './accomodation-view.component.html',
  styleUrls: ['./accomodation-view.component.scss']
})
export class AccomodationViewComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;
  myData: any;
  userRole:any;
  userID:any;
  BASE_URL: any = environment.BASE_URL;
//   imageObject: Array<object> = [{
//     image: '',
//     thumbImage: '',
//     alt: 'alt of image',
//     // title: 'title of image'
// }, {
//     image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//     thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//     title: 'Image title', //Optional: You can use this key if want to show image with title
//     alt: 'Image alt' //Optional: You can use this key if want to show image with alt
// }
// ];
images = [
  {path: ''},
  
];
  constructor(
    private accomodationService: AccomodationService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.viewData();
    this.uesrRoleFun();
  }

  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
    let bodydata = { accomodation_id: serverData};
    this.accomodationService.fatchaccomodation(bodydata).subscribe((response: any) => {
      this.myData=response.data[0];
      let allImages = JSON.parse(this.myData.accomodation_post_images);
      
      
      this.images = allImages.map((item,index)=>{
        return {
          path: this.BASE_URL+'/'+item,
         
        }
      });
      
      
      
    });

  }

  uesrRoleFun(){
    let userRoleData =localStorage.getItem('userRole');
    let userIDData =localStorage.getItem('userID');
    this.userRole =userRoleData;
    this.userID =userIDData;
    // console.log('USER ROLE',this.userRole);
    
  }
  prevImageClick() {
    this.slider.prev();
}

nextImageClick() {
    this.slider.next();
}

onclickApply(id){
    
   
  Swal.fire({
    title: 'Are you sure Apply Job?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Apply it!'
  }).then((result) => {
    if (result.isConfirmed) {
      let bodydata = {job_post_id: id};
     
      console.log(bodydata);
      // this.router.navigate(['/jobs-apply/', id]);      
    }
  })
  
}
onclickEdit(id){
  // console.log(id);
  this.router.navigate(['/vendor-accomodation-edit/', id]);
}




}
