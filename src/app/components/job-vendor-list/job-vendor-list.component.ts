import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { JobService } from '@app/services/job.service';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-job-vendor-list',
  templateUrl: './job-vendor-list.component.html',
  styleUrls: ['./job-vendor-list.component.scss']
})
export class JobVendorListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['position', 'title', 'address', 'job_type','post_short_content','created_at','status','action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private jobService: JobService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let userID= localStorage.getItem('userID');
    let bodydata = { userID: userID}; 
    this.jobService.getAllProducts(bodydata).subscribe((prods: any) => {
      // this.products = prods.products;
     
      this.dataSource = prods.data.map((item, index)=> {
        return {position: index+1, 
          title:item.job_post_title, 
          post_short_content: item.job_post_content, 
          job_type: item.job_category_title, 
          address:item.job_address,
          created_at:item.created_at, 
          status: (item.status == 1) ? 'Active' : 'Inactive',
          job_id:item.job_post_id 
        }
      })
      // console.log('All DATA   ', this.dataSource);
      // this.dataSource = this.products;

      
      
    }, error => {
      console.log(error);      
    });   

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onclickEdit(id){
    
    this.router.navigate(['/vendor-job-edit/', id]);
   
  }

}
