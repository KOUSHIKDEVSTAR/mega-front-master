import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { FoodService } from '@app/services/food.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-food-vendor-list',
  templateUrl: './food-vendor-list.component.html',
  styleUrls: ['./food-vendor-list.component.scss']
})
export class FoodVendorListComponent implements OnInit {
  products: any;
  displayedColumns: string[] = ['position',  'title', 'restaurants_name', 'discount','discount_code','created_at','closes_date','action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;  
  BASE_URL: any = environment.BASE_URL;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
    let userID= localStorage.getItem('userID');
    let bodydata = { userID: userID}; 
    this.foodService.getAllProducts(bodydata).subscribe((prods: any) => {
      this.products = prods.data;
     
      let data = prods.data.map((item, index)=> {
        return {
          position: index+1, 
          title:item.title, 
          restaurants_name: item.restaurants_name, 
          discount: item.discount, 
          discount_code:item.discount_code,
          created_at:item.created_at, 
          closes_date: item.closes_date,
          food_post_id :item.food_post_id  
        }
      })
      // console.log('All DATA   ', this.dataSource);
      // this.dataSource = this.products;
      this.dataSource = new MatTableDataSource<any>(data);
      this.cdr.detectChanges();
      // console.log('All DATA   ', this.dataSource);
      // this.dataSource = this.products; 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.cdr.detectChanges(); 
      
    }, error => {
      console.log(error);      
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onclickEdit(id){
    
    this.router.navigate(['/vendor-food-edit/', id]);
   
  }
  onclickDelete(id){
    
   
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        let bodydata = {food_post_id: id};
       
        
        //// api call for delete
        this.foodService.deleteData(bodydata).subscribe((response: any) => {
          // this.registrationMessage = response.message;
          
          if(response.code === 200){
  
            let filterdata = this.products.filter((item, index) => {
              if(item.food_post_id != id){
                return item;
              }
            });
  
            if(filterdata && filterdata.length > 0){
             
              this.dataSource = filterdata.map((item, index)=> {
                return {
                  position: index+1, 
                  title:item.title, 
                  restaurants_name: item.restaurants_name, 
                  discount: item.discount, 
                  discount_code:item.discount_code,
                  created_at:item.created_at, 
                  closes_date: item.closes_date,
                  food_post_id :item.food_post_id   
                }
              });
  
              this.products = filterdata;
            }
  
           
  
            
          }
    
        });
        //********* */
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
       
      }
    })
    
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


















}
