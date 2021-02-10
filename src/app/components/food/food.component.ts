import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FoodService } from '@app/services/food.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  products: any;
  foodPost:any;
  BASE_URL: any = environment.BASE_URL;
  searchTerm: any = ''; 

  constructor(
    private foodService: FoodService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.foodService.getAllfood().subscribe((prods: any) => {
      this.foodPost = prods.data;     
    });

  }

  ngAfterViewInit() {
   
  }
  onclickEdit(id){
    
    this.router.navigate(['/vendor-job-edit/', id]);
   
  }

  
selectProduct(id: number) {
    this.router.navigate(['/food-view/', id]).then();
  }


  onChangeSearchTerm(val){
    let callApi = true;
    // setTimeout(() => {
      console.log(val);
    // }, 1500);
    if(val && val.length > 0 && callApi){
      callApi = false;
      let bodydata = { searchData: val}; 
      this.foodService.getAllfoodFilter(bodydata).subscribe((prods: any) => {
        
        if(prods.code==200){
          this.foodPost = prods.data;
          callApi = false;
        }    
      });
    }  

  }











}
