import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FoodService } from '@app/services/food.service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-food-view',
  templateUrl: './food-view.component.html',
  styleUrls: ['./food-view.component.scss']
})
export class FoodViewComponent implements OnInit {
  userRole:any;
  userID:any;
  myData:any;
  BASE_URL: any = environment.BASE_URL;
  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.uesrRoleFun();
    this.viewData();
  }
  viewData(){
    let serverData = this.route.snapshot.paramMap.get('id');
   
     let bodydata = { food_post_id: serverData}; 
    
    this.foodService.fatchData(bodydata).subscribe((response: any) => {
      
      this.myData = response.data[0];
      console.log(this.myData);
      
    });
    

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
    this.router.navigate(['/vendor-food-edit/', id]);
  }

uesrRoleFun(){
  let userRoleData =localStorage.getItem('userRole');
    let userIDData =localStorage.getItem('userID');
    this.userRole =userRoleData;
    this.userID =userIDData;
  
}














}
