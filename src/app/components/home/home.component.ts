import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ProductModelServer, ServerResponse} from '../../models/product.model';
import {CartService} from '../../services/cart.service';
import { AccomodationService } from '@app/services/accomodation.service';
import {AccomodationmodelServer} from '../../models/accomodation.model';
import { JobService } from '@app/services/job.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  BASE_URL: any = environment.BASE_URL;
  accomodation: AccomodationmodelServer[] = [];
  products: ProductModelServer[] = [];
  jobsPost:any;


  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private accomodationService:AccomodationService,
              private jobService:JobService
              ) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods: ServerResponse) => {
      this.products = prods.products;
    });
    this.accomodationService.getAllAccomodation().subscribe((prods: any) => {
      this.accomodation = prods.data;
      this.accomodation.forEach((item: any, index)=>{
        item.accomodation_post_images = JSON.parse(item.accomodation_post_images);
      });
      // console.log('ACC',this.accomodation);
      this.jobService.getAllJobs().subscribe((prods: any) => {
        this.jobsPost = prods.data;     
      });
    });
  }

  selectProduct(id: number) {
    this.router.navigate(['/product', id]).then();
  }

  AddToCart(id: number) {
    this.cartService.AddProductToCart(id);
  }
}
