import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from '@app/app-routing.module';
import {AppComponent} from '@app/app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from '@app/components/header/header.component';
import {FooterComponent} from '@app/components/footer/footer.component';
import {CartComponent} from '@app/components/cart/cart.component';
import {CheckoutComponent} from '@app/components/checkout/checkout.component';
import {HomeComponent} from '@app/components/home/home.component';
import {ProductComponent} from '@app/components/product/product.component';
import {ThankyouComponent} from '@app/components/thankyou/thankyou.component';
import {HttpClientModule} from '@angular/common/http';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ToastrModule} from 'ngx-toastr';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from '@app/components/login/login.component';
import {ProfileComponent} from '@app/components/profile/profile.component';
import {AuthServiceConfig, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {RegisterComponent} from '@app/components/register/register.component';
import {HomeLayoutComponent} from '@app/components/home-layout/home-layout.component';
import { AdminComponent } from './components/admin/admin.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { VendorProfileComponent } from './components/vendor-profile/vendor-profile.component';
import { VendorLoginComponent } from './components/vendor-login/vendor-login.component';
import { AccomodationAddComponent } from './components/accomodation-add/accomodation-add.component';
import { AccomodationVendorListComponent } from './components/accomodation-vendor-list/accomodation-vendor-list.component';
import { AccomodationEditComponent } from './components/accomodation-edit/accomodation-edit.component';
import { JobAddComponent } from './components/job-add/job-add.component';
import { JobVendorListComponent } from './components/job-vendor-list/job-vendor-list.component';
import { JobEditComponent } from './components/job-edit/job-edit.component';
import { AccomodationComponent } from './components/accomodation/accomodation.component';
import { FoodAddComponent } from './components/food-add/food-add.component';
import { FoodEditComponent } from './components/food-edit/food-edit.component';
import { FoodVendorListComponent } from './components/food-vendor-list/food-vendor-list.component';
import { FoodComponent } from './components/food/food.component';


const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('799705726167-vn6184fsovmps0kpbg5c7jabv15r3ias.apps.googleusercontent.com')
  }

]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    HomeComponent,
    ProductComponent,
    ThankyouComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    HomeLayoutComponent,
    AdminComponent,
    JobsComponent,
    VendorProfileComponent,
    VendorLoginComponent,
    AccomodationAddComponent,
    AccomodationVendorListComponent,
    AccomodationEditComponent,
    JobAddComponent,
    JobVendorListComponent,
    JobEditComponent,
    AccomodationComponent,
    FoodAddComponent,
    FoodEditComponent,
    FoodVendorListComponent,
    FoodComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
