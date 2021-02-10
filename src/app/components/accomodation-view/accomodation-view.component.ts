import { Component, OnInit,ViewChild } from '@angular/core';
import {environment} from '../../../environments/environment';
import { AccomodationService } from '@app/services/accomodation.service';
import {ActivatedRoute, Router} from '@angular/router';
import { NgImageSliderComponent } from 'ng-image-slider';
@Component({
  selector: 'app-accomodation-view',
  templateUrl: './accomodation-view.component.html',
  styleUrls: ['./accomodation-view.component.scss']
})
export class AccomodationViewComponent implements OnInit {
  @ViewChild('nav') slider: NgImageSliderComponent;
  myData: any;
  BASE_URL: any = environment.BASE_URL;
  imageObject: Array<object> = [{
    image: 'assets/img/slider/1.jpg',
    thumbImage: 'assets/img/slider/1_min.jpeg',
    alt: 'alt of image',
    // title: 'title of image'
}, {
    image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
    title: 'Image title', //Optional: You can use this key if want to show image with title
    alt: 'Image alt' //Optional: You can use this key if want to show image with alt
}
];

  constructor(
    private accomodationService: AccomodationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.viewData();
  }

  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
    let bodydata = { accomodation_id: serverData};
    this.accomodationService.fatchaccomodation(bodydata).subscribe((response: any) => {
      this.myData=response.data[0];
      let allImages = JSON.parse(this.myData.accomodation_post_images);
      console.log(this.myData.accomodation_post_images);
      this.imageObject = allImages.map((item,index)=>{
        return {
          image: this.BASE_URL+'/'+item,
          thumbImage: this.BASE_URL+'/'+item,
          alt: 'alt of image',
          // title: 'title of image'
        }
      });
      console.log('ARRAY IMG :', this.imageObject);
      
      // this.myData.accomodation_post_images.forEach((item: any, index)=>{
      //   // item.accomodation_post_images = JSON.parse(item.accomodation_post_images);
      //   console.log('DATA', item);
      // });
      
      
    });

  }


  prevImageClick() {
    this.slider.prev();
}

nextImageClick() {
    this.slider.next();
}



}
