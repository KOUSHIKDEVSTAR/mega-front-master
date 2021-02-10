import {Injectable} from '@angular/core';
import {AuthService, GoogleLoginProvider} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AccomodationmodelServer, ServerResponse} from '../models/accomodation.model';
@Injectable({
  providedIn: 'root'
})
export class JobService {
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


  registerjob(formData: any): Observable<{ message: string }> {
    const {job_post_title, 
      job_post_content, 
      author,
      job_address,
      job_type,
      job_level,
      closes_date
     } = formData;
    
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/add-job`, {
      job_post_title,
      job_post_content,
      author,
      job_address,
      job_type,
      job_level,
      closes_date
      
     
    });
  }
 /* This is to fetch all products from the backend server */
 getAllJobs() : Observable<ServerResponse> {
  return this.http.get<ServerResponse>(this.SERVER_URL + '/job/all-job-view');
}
getAllProducts(formData: any): Observable<{ message: string }> {
  const {userID, 
  } = formData;
// return this.http.get<ServerResponse>(this.SERVER_URL + '/accomodation/all-accomodation');
return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/all-job`, {
  userID
});
}
/*Search Data*/

getAllJobsFilter(formData: any): Observable<{ message: string }> {
  const {searchData, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/dataSearch`, {
    searchData
  });
}
/*Fatch Data*/

fatchData(formData: any): Observable<{ message: string }> {
  const {job_post_id, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/dataView`, {
    job_post_id
  });
}
/**Edit Data */
editData(formData: any): Observable<{ message: string }> {
  const {
    job_post_id,
    job_post_title, 
    job_post_content, 
    job_address,
    
    
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/dataEdit`, {
    job_post_id,
    job_post_title,
    job_post_content,
    job_address,
   
    
   
  });
}
/*Dalete Data*/

deleteData(formData: any): Observable<{ message: string }> {
  const {job_post_id, 
    } = formData;
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/dataDelete`, {
    job_post_id
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
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/apply-job`, {
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
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/all-job-user-view`, {
      userID
    });
}

/**Image Data */
imageData(formData: any,job,id): Observable<{ message: string }> {
 
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/images/uploadProductImage/${job}/${id}`, formData);
}

/**Image Data */
documentData(formData: any,profileID,id): Observable<{ message: string }> {
 
  
  return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/documents/uploadProductImage/${profileID}/${id}`, formData);
}



}

