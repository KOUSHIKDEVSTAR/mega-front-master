import {Component, OnInit} from '@angular/core';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel, UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  myUser: any;


  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userService.userData$
    
      .subscribe((data: ResponseModel | SocialUser) => {
        
        
        this.myUser = data;
      });
      let email= localStorage.getItem('email');
      let userRole= localStorage.getItem('userRole');
     
      if(email){        
       
        this.userService.UserDataFatch(email);
      }
      
  }
  onclickEdit(id){    
    // console.log(id);
    
    this.router.navigate(['/profile-edit//', id]);   
  }

  logout() {
    this.userService.logout();
  }
}
