import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-vendor-profile',
  templateUrl: './vendor-profile.component.html',
  styleUrls: ['./vendor-profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  myUser: any;
  constructor(private authService: AuthService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.userData$
    
      .subscribe((data: any) => {
        
        
        this.myUser = data;
       
        
        // localStorage.setItem('userID', this.myUser.id);
      });
      let email= localStorage.getItem('email');
      let userRole= localStorage.getItem('userRole');
     
      if(email){        
       
        this.userService.UserDataFatch(email);
      }
  }
  logout() {
    this.userService.logout();
  }

}
