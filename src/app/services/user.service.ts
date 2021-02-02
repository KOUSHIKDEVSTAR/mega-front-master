import {Injectable} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth = false;
  private SERVER_URL = environment.SERVER_URL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userData$ = new BehaviorSubject<SocialUser | ResponseModel | object>(null);
  loginMessage$ = new BehaviorSubject<string>(null);
  userRole$ = new BehaviorSubject<string>(null);
  

  constructor(private authService: AuthService,
              private httpClient: HttpClient,
              private router: Router) {

    authService.authState.subscribe((user: SocialUser) => {
      if (user != null) {
        this.httpClient.get(`${this.SERVER_URL}/users/validate/${user.email}`).subscribe((res: { status: boolean, user: object }) => {
          //  No user exists in database with Social Login
          if (!res.status) {
            // Send data to backend to register the user in database so that the user can place orders against his user id
            this.registerUser({
              email: user.email,
              fname: user.firstName,
              lname: user.lastName,
              password: '123456'
            }, user.photoUrl, 'social').subscribe(response => {
              if (response.message === 'Registration successful') {
                this.auth = true;
                
                this.authState$.next(this.auth);
                this.userData$.next(user);
              }
            });

          } else {
            this.auth = true;
            // @ts-ignore
           
            this.userData$.next(res.user);

            // This code will check and redirect the user to the admin route, assuming it to be http://localhost:4200/admin
            // Change the url to match the route in your code
           
          }
        });

      }
    });
  }

  //  Login User with Email and Password
  loginUser(email: string, password: string) {
      
      
    this.httpClient.post<ResponseModel>(`${this.SERVER_URL}/auth/login`, {email, password})
      // .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: ResponseModel) => {
        if (typeof (data) === 'string') {
         
          
          this.loginMessage$.next(data);
        } else {
          
          if(data){     
            localStorage.setItem('email', data.email);
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.role);   
            this.auth = data.auth;
            this.userRole$.next(data.role);
            this.auth = true;
            this.authState$.next(this.auth);
            this.userData$.next(data);
            console.log('After login    ',data);
            
            let role = data.role;
            

          }
        }
      }, error =>{
        // console.log('gjgjgjg hbbh', error); 
        if(error && error.error){
          console.log(error.error);
          this.loginMessage$.next(error.error);
        }       
      });

  }
  
  //  User Data User with Email
  UserDataFatch(email: string) {
    
    
    this.httpClient.get<ResponseModel>(`${this.SERVER_URL}/users/email/${email}`)
      // .pipe(catchError((err: HttpErrorResponse) => of(err.error.message)))
      .subscribe((data: any) => {
        localStorage.setItem('userID', data.user.id);
        
            this.userData$.next(data);

            
      }, error =>{
        if(error && error.error){
          console.log(error.error);
        }       
      });
  }

//  Google Authentication
  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userID');
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
    
    this.router.navigateByUrl('/login').then();
  }

  registerUser(formData: any, photoUrl?: string, typeOfUser?: string): Observable<{ message: string }> {
    const {fname, lname, email, password, role} = formData;
    
    return this.httpClient.post<{ message: string }>(`${this.SERVER_URL}/auth/register`, {
      email,
      lname,
      fname,
      typeOfUser,
      password,
      role,
      photoUrl: photoUrl || null
    });
  }


}


export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
  type: string;
  role: string;
}
