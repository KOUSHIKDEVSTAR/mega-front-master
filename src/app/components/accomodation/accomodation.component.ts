import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
// import {AccomodationmodelServer} from '../../models/accomodation.model';
import {environment} from '../../../environments/environment';
import { AccomodationService } from '@app/services/accomodation.service';


@Component({
  selector: 'app-accomodation',
  templateUrl: './accomodation.component.html',
  styleUrls: ['./accomodation.component.scss']
})
export class AccomodationComponent implements OnInit {
  searchTerm: any = ''; 
  BASE_URL: any = environment.BASE_URL;
  accomodation: any
  constructor(
    
              private router: Router,
              private accomodationService:AccomodationService

  ) { }

  ngOnInit(): void {
   
    this.accomodationService.getAllAccomodation().subscribe((prods: any) => {
      this.accomodation = prods.data;
      this.accomodation.forEach((item: any, index)=>{
        item.accomodation_post_images = JSON.parse(item.accomodation_post_images);
      });
      // console.log('ACC',this.accomodation);
      
    });
  }
  selectProduct(id: number) {
    this.router.navigate(['/accomodations-view/', id]).then();
  }



  onChangeSearchTerm(val){
    let callApi = true;
    // setTimeout(() => {
      console.log(val);
    // }, 1500);
    if(val && val.length > 0 && callApi){
      callApi = false;
      let bodydata = { searchData: val}; 
      this.accomodationService.getAllFilter(bodydata).subscribe((prods: any) => {
        
        if(prods.code==200){
          this.accomodation = prods.data;
          this.accomodation.forEach((item: any, index)=>{
            item.accomodation_post_images = JSON.parse(item.accomodation_post_images);
          });
          callApi = false;
        }    
      });
    }  

  }

  

}
