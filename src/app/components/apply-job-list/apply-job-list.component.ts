import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef  } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import { AccomodationService } from '@app/services/accomodation.service';
import { JobService } from '@app/services/job.service';
import {ResponseModel, UserService} from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-apply-job-list',
  templateUrl: './apply-job-list.component.html',
  styleUrls: ['./apply-job-list.component.scss']
})
export class ApplyJobListComponent implements OnInit {
  products: any;
  displayedColumns: string[] = ['position', 'title', 'created_at'];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort; 

  constructor(
    private jobService: JobService,
    private router: Router,
    private cdr: ChangeDetectorRef,
   

  ) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
    let userID= localStorage.getItem('userID');
    let bodydata = { userID: userID}; 
    this.jobService.getApplyJobsUser(bodydata).subscribe((prods: any) => {
      this.products = prods.data;
      // console.log('All DATA   ', this.dataSource);
      let data = prods.data.map((item, index)=> {
        return {
          position: index+1, 
          title:item.job_post_title, 
          post_short_content: item.job_post_content, 
          job_type: item.job_category_title, 
          address:item.job_address,
          created_at:item.created_at, 
          status: (item.status == 1) ? 'Active' : 'Inactive',
          job_id:item.job_post_id 
        }
      })
      
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
    
    this.router.navigate(['/vendor-job-edit/', id]);
   
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
        this.router.navigate(['/jobs-apply/', id]);      
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
