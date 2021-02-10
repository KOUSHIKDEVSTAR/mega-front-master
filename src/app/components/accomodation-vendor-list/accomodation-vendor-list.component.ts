import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { AccomodationService } from '@app/services/accomodation.service';
// import {AccomodationmodelServer, ServerResponse} from '../../models/accomodation.model';
import Swal from 'sweetalert2';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }


@Component({
  selector: 'app-accomodation-vendor-list',
  templateUrl: './accomodation-vendor-list.component.html',
  styleUrls: ['./accomodation-vendor-list.component.scss']
})
export class AccomodationVendorListComponent implements OnInit {

  products: any;

  displayedColumns: string[] = ['position', 'title', 'address', 'price','post_short_content','accomodation_type_title','status','action'];
  dataSource = new MatTableDataSource<any>([]);
  
  // dataSource: MatTableDataSource<[]>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;  

  constructor(
    private accomodationService: AccomodationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    
   }

  ngOnInit(): void {
    this.cdr.detectChanges();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.cdr.detectChanges();


    let userID= localStorage.getItem('userID');
    let bodydata = { userID: userID}; 

    this.accomodationService.getAllProducts(bodydata).subscribe((prods: any) => {
      this.products = prods.data;
     
      let data = prods.data.map((item, index)=> {
        return {position: index+1, 
          title:item.title, 
          address: item.address, 
          price: item.accomodation_price, 
          post_short_content:item.post_short_content,
          accomodation_type_title:item.accomodation_type_title, 
          status: (item.status == 1) ? 'Active' : 'Inactive',
          accom_id:item.accomodation_id
        }
      })

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
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }



onclickDelete(id){
  // console.log(id);

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
      let bodydata = {accomodation_id: id};
     
      
      // api call for delete
      this.accomodationService.deleteaccomodation(bodydata).subscribe((response: any) => {
        // this.registrationMessage = response.message;
        
        if(response.code === 200){

          let filterdata = this.products.filter((item, index) => {
            if(item.accomodation_id != id){
              return item;
            }
          });

          if(filterdata && filterdata.length > 0){
              
            this.dataSource = filterdata.map((item, index)=> {
              return {position: index+1, 
                title:item.title, 
                address: item.address, 
                price: item.accomodation_price, 
                post_short_content:item.post_short_content,
                accomodation_type_title:item.accomodation_type_title, 
                status: (item.status == 1) ? 'Active' : 'Inactive',
                accom_id:item.accomodation_id
              }
            });

            this.products = filterdata;
          }

         

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
  
      });
      //********* */
     
    }
  })
  
}
// onclickView(id){
//   console.log(id);
//   this.router.navigate(['/vendor-accomodation-edit/', id]);
  
// }


  onclickEdit(id){  
    console.log(id);
      
    this.router.navigate(['/vendor-accomodation-edit/', id]);   
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
