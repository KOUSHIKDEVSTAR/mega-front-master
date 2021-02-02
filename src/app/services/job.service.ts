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
export class JobService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private job;
  authState$ = new BehaviorSubject<boolean>(this.auth);
 
  loginMessage$ = new BehaviorSubject<string>(null);
  jobRole$ = new BehaviorSubject<string>(null);
  

  constructor(private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router) {

   
  }


  registerjob(formData: any): Observable<{ message: string }> {
    const {job_post_title, 
      job_post_content, 
      author,
      job_address,
     } = formData;
    
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/job/add-job`, {
      job_post_title,
      job_post_content,
      author,
      job_address,
      
     
    });
  }


}


// export interface ResponseModel {
//   title: string;
//   post_content: string;
//   job_price: string;
 
 
// }
