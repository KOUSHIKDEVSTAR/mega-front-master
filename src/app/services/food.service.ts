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
export class FoodService {
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


  registerfood(formData: any): Observable<{ message: string }> {
    const {author, 
      title, 
      description,
      food_contract,
      restaurants_name,
      discount,
      closes_date,
      discount_code,
     } = formData;
    
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/add-food`, {
      author,
      title,
      description,
      food_contract,
      restaurants_name,
      discount,
      closes_date,
      discount_code,
    });
  }
 /* This is to fetch all products from the backend server */
 getAllfoodHome() : Observable<any> {
  return this.http.get<any>(this.SERVER_URL + '/food/all-food-home');
}
 getAllfood() : Observable<any> {
  return this.http.get<any>(this.SERVER_URL + '/food/all-food-view');
}
getAllProducts(formData: any): Observable<{ message: string }> {
  const {userID, 
  } = formData;
// return this.http.get<ServerResponse>(this.SERVER_URL + '/accomodation/all-accomodation');
return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/all-food`, {
  userID
});
}
/*Search Data*/

getAllfoodFilter(formData: any): Observable<{ message: string }> {
  const {searchData, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/dataSearch`, {
    searchData
  });
}
/*Fatch Data*/

fatchData(formData: any): Observable<{ message: string }> {
  const {food_post_id , 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/dataView`, {
    food_post_id 
  });
}
/**Edit Data */
editData(formData: any): Observable<{ message: string }> {
  const {
    food_post_id,
    title, 
    description,
    food_contract,
    restaurants_name,
    discount,
    closes_date,
    discount_code,
    
    
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/dataEdit`, {
    food_post_id,
    title, 
    description,
    food_contract,
    restaurants_name,
    discount,
    closes_date,
    discount_code,
   
    
   
  });
}
/*Dalete Data*/

deleteData(formData: any): Observable<{ message: string }> {
  const {food_post_id, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/dataDelete`, {
    food_post_id
  });
}



/**Apply Jobs */
applyjob(formData: any): Observable<{ message: string }> {
  const {
    job_id, 
    first_name, 
    last_name,
    user_email,
    cover_letter,
    user_id,
   } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/apply-job`, {
    job_id,
    first_name,
    last_name,
    user_email,
    cover_letter,
    user_id,
    
   
  });
}
/* This is to fetch all products from the backend server */
getApplyJobsUser(formData: any) : Observable<{ message: string }> {
  const {userID, 
    } = formData;
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/food/all-job-user-view`, {
      userID
    });
}

/**Image Data */
imageData(formData: any,food,id): Observable<{ message: string }> {
 
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/images/uploadProductImage/${food}/${id}`, formData);
}





}

