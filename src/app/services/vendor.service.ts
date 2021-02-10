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
export class VendorService {
  auth = true;
  private SERVER_URL = environment.SERVER_URL;
  private job;
  authState$ = new BehaviorSubject<boolean>(this.auth);
 
  loginMessage$ = new BehaviorSubject<string>(null);
  jobRole$ = new BehaviorSubject<string>(null);
  

  constructor(
    private http: HttpClient,
    private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router) {

   
  }


  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
    const {fname, lname, email, password, role,company_name,company_address,company_about} = formData;
    
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/auth/register-vendor`, {
      email,
      lname,
      fname,
      typeOfUser,
      password,
      role,
      company_name,
      company_address,
      company_about
    });
  }
 /* This is to fetch all products from the backend server */

getAllProducts(formData: any): Observable<{ message: string }> {
  const {userID, 
  } = formData;

return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/vendor/all-job`, {
  userID
});
}
/*Fatch Data*/

fatchData(formData: any): Observable<{ message: string }> {
  const {id, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/vendor/dataView`, {
    id
  });
}
/**Edit Data */
editData(formData: any): Observable<{ message: string }> {
  const {
    id,
    fname, 
    lname, 
    email,
    company_name, 
    company_address, 
    company_about,
    
    
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/vendor/dataEdit`, {
    id,
    fname,
    lname,
    email,
    company_name,
    company_address,
    company_about,
   
    
   
  });
}

/**Image Data */
imageData(formData: any,vendor,id): Observable<{ message: string }> {
 
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/images/uploadProductImage/${vendor}/${id}`, formData);
}
/*Dalete Data*/

deleteData(formData: any): Observable<{ message: string }> {
  const {job_post_id, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/dataDelete`, {
    job_post_id
  });
}
















}

