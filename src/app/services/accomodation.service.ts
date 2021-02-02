import {Injectable} from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private accomodation;
  authState$ = new BehaviorSubject<boolean>(this.auth);
 
  loginMessage$ = new BehaviorSubject<string>(null);
  accomodationRole$ = new BehaviorSubject<string>(null);
  

  constructor(private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router) {

   
  }


  registeraccomodation(formData: any): Observable<{ message: string }> {
    const {title, 
      post_content, 
      accomodation_price,
      author,
      post_short_content,
      address,
      accomodation_type,
      bedroom,
      bathroom,
      parking_area,
      floor_area,} = formData;
    
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/accomodation/add-accomodation`, {
      title,
      post_content,
      accomodation_price,
      author,
      post_short_content,
      address,
      accomodation_type,
      bedroom,
      bathroom,
      parking_area,
      floor_area,
     
    });
  }


}


// export interface ResponseModel {
//   title: string;
//   post_content: string;
//   accomodation_price: string;
 
 
// }
