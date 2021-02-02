import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from 'angularx-social-login';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginMessage: string;
  userRole: number;
 
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.userService.authState$.subscribe(authState => {
      if (authState) {
        let userRole = localStorage.getItem('userRole')
        
        
        // this.router.navigateByUrl(this.route.snapshot.queryParams.returnUrl || '/profile');
        if (userRole == '777') {
              this.router.navigateByUrl('admin').then();
            }
            if (userRole == '555') {
             
              
              this.router.navigateByUrl('profile').then();
            }
            if (userRole == '666') {
             
              this.router.navigateByUrl('vendor-profile').then();
              
            }

            
            


      } else {
        this.router.navigateByUrl('/login');
      }
    });


  }


  signInWithGoogle() {
    this.userService.googleLogin();
  }

  login(form: NgForm) {
    const email = this.email;
    const password = this.password;

    if (form.invalid) {
      return;
    }

    form.reset();
    this.userService.loginUser(email, password);

    this.userService.loginMessage$.subscribe(msg => {
      this.loginMessage = msg;
      setTimeout(() => {
        this.loginMessage = '';
      }, 5000);
    });


  }
}
