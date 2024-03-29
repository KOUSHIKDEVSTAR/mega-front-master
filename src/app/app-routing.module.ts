import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './components/product/product.component';
import {CartComponent} from './components/cart/cart.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {ThankyouComponent} from './components/thankyou/thankyou.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';
import {ProfileGuard} from './guard/profile.guard';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {HomeLayoutComponent} from './components/home-layout/home-layout.component';
import {AdminComponent} from '@app/components/admin/admin.component';
import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { VendorLoginComponent } from './components/vendor-login/vendor-login.component';
import { AccomodationAddComponent } from './components/accomodation-add/accomodation-add.component';
import { AccomodationVendorListComponent } from './components/accomodation-vendor-list/accomodation-vendor-list.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AccomodationEditComponent } from './components/accomodation-edit/accomodation-edit.component';
import { JobAddComponent } from './components/job-add/job-add.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { JobVendorListComponent } from './components/job-vendor-list/job-vendor-list.component';
import { VendorGuard } from './guard/vendor.guard';
import { AccomodationComponent } from './components/accomodation/accomodation.component';
import { FoodVendorListComponent } from './components/food-vendor-list/food-vendor-list.component';
import { FoodAddComponent } from './components/food-add/food-add.component';
import { FoodEditComponent } from './components/food-edit/food-edit.component';
import { FoodComponent } from './components/food/food.component';
import { VendorProfileEditComponent } from './components/vendor-profile-edit/vendor-profile-edit.component';
import { VendorRegisterComponent } from './components/vendor-register/vendor-register.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ApplyJobComponent } from './components/apply-job/apply-job.component';
import { ApplyJobListComponent } from './components/apply-job-list/apply-job-list.component';
import { AccomodationViewComponent } from './components/accomodation-view/accomodation-view.component';
import { JobViewComponent } from './components/job-view/job-view.component';
import { FoodViewComponent } from './components/food-view/food-view.component';
import { ApplyedJobListComponent } from './components/applyed-job-list/applyed-job-list.component';







const routes: Routes = [
  // Define routes for the landing / home page, create a separate component for the layout of home page
  // put only header, footer and router-outlet there
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '', 
        component: HomeComponent
      },
      {
        path: 'product/:id', component: ProductComponent
      },
      {
        path: 'cart', component: CartComponent
      },
      {
        path: 'checkout', component: CheckoutComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'jobs', component: JobsComponent
      },
      {
        path: 'jobs-view/:id', component: JobViewComponent
      },
      {
        path: 'jobs-apply/:id', component: ApplyJobComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'jobs-apply-list', component: ApplyJobListComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'accomodations', component: AccomodationComponent
      },
      {
        path: 'accomodations-view/:id', component: AccomodationViewComponent
      },
      {
        path: 'food', component: FoodComponent 
      },
      {
        path: 'food-view/:id', component: FoodViewComponent 
      },
      {
        path: 'thankyou', component: ThankyouComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'profile-edit/:id', component: ProfileEditComponent, canActivate: [ProfileGuard]
      },
      {
        path: 'vendor-login', component: VendorLoginComponent
      },
      {
        path: 'vendor-register', component: VendorRegisterComponent
      },
      {
        path: 'vendor-profile', component: VendorProfileComponent, canActivate: [VendorGuard]
      },
      {
        path: 'vendor-profile-edit/:id', component: VendorProfileEditComponent, canActivate: [VendorGuard]
      },
      {
        path: 'vendor-job-list', component: JobVendorListComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-applyed-job-list', component: ApplyedJobListComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-job-add', component: JobAddComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-job-edit/:id', component: JobEditComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-accomodationAdd', component: AccomodationAddComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-accomodation-edit/:id', component: AccomodationEditComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-accomodation-list', component: AccomodationVendorListComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-food-list', component: FoodVendorListComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-food-add', component: FoodAddComponent , canActivate: [VendorGuard]
      },
      {
        path: 'vendor-food-edit/:id', component: FoodEditComponent , canActivate: [VendorGuard]
      },
      
      
     
    ]
  },
  {
    path: 'admin', component: AdminComponent
  },
  // Wildcard Route if no route is found == 404 NOTFOUND page
  {
    path: '**', pathMatch: 'full', redirectTo: ''
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, scrollPositionRestoration: 'enabled' }),
    // MatPaginator,
    // MatTableDataSource
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

// Angular 10 Scroll to top on Route Change
// scrollPositionRestoration: 'enabled'
