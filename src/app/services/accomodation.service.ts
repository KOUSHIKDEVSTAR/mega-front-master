import {Injectable} from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
// import {AccomodationmodelServer, ServerResponse} from '../models/accomodation.model';

@Injectable({
  providedIn: 'root'
})
export class AccomodationService {
  auth = true;
  private SERVER_URL = environment.SERVER_URL;
  private accomodation;
  authState$ = new BehaviorSubject<boolean>(this.auth);
 
  loginMessage$ = new BehaviorSubject<string>(null);
  accomodationRole$ = new BehaviorSubject<string>(null);
  
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
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
      floor_area,
      furnished,
      dwelling_type,
      available,
      inspections_date,
      inspections_time,
    } = formData;
    
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
      furnished,
      dwelling_type,
      available,
      inspections_date,
      inspections_time,
     
    });
  }
 /* This is to fetch all products from the backend server */
 getAllProducts(formData: any): Observable<{ message: string }> {
    const {userID, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/accomodation/all-accomodation`, {
    userID
  });
}

getAllAccomodation(numberOfResults= 10) : Observable<any> {
  return this.http.get<any>(this.SERVER_URL + '/accomodation/all-accomodation-view', {
    params: {
      limit: numberOfResults.toString()
    }
  });
}
/*Search Data*/

getAllFilter(formData: any): Observable<{ message: string }> {
  const {searchData, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/accomodation/dataSearch`, {
    searchData
  });
}
/*Fatch Data*/

fatchaccomodation(formData: any): Observable<{ message: string }> {
  const {accomodation_id, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/accomodation/accomodationView`, {
    accomodation_id
  });
}
/**Edit Data */
editaccomodation(formData: any): Observable<{ message: string }> {
  const {
    accomodation_id,
    title, 
    post_content, 
    accomodation_price,
    post_short_content,
    address,
    accomodation_type,
    bedroom,
    bathroom,
    parking_area,
    floor_area,
    furnished,
    dwelling_type,
    available
    
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/accomodation/accomodationEdit`, {
    accomodation_id,
    title,
    post_content,
    accomodation_price,
    post_short_content,
    address,
    accomodation_type,
    bedroom,
    bathroom,
    parking_area,
    floor_area,
    furnished,
    dwelling_type,
    available
    
   
  });
}

/*Delete Data*/

deleteaccomodation(formData: any): Observable<{ message: string }> {
  const {accomodation_id, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/accomodation/accomodationdelete`, {
    accomodation_id
  });
}

/**Image Data */
imageData(formData: any,vendor,id): Observable<{ message: string }> {
 
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/images-multi/uploadProductImage/${vendor}/${id}`, formData);
}


}

