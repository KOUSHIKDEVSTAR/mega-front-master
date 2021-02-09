import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import { AccomodationService } from '@app/services/accomodation.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-accomodation-view',
  templateUrl: './accomodation-view.component.html',
  styleUrls: ['./accomodation-view.component.scss']
})
export class AccomodationViewComponent implements OnInit {
  myData: any;
  BASE_URL: any = environment.BASE_URL;
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
      // console.log(this.myData.accomodation_post_images);
      
      // this.myData.accomodation_post_images.forEach((item: any, index)=>{
      //   // item.accomodation_post_images = JSON.parse(item.accomodation_post_images);
      //   console.log('DATA', item);
      // });
      
      
    });

  }






}
