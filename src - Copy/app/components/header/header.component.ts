import {Component, OnInit} from '@angular/core';
import {CartModelServer} from '../../models/cart.model';
import {CartService} from '../../services/cart.service';
import {UserService} from '../../services/user.service';
import {AuthService, SocialUser} from 'angularx-social-login';
import {ResponseModel} from '../../services/user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: number;
  authState: boolean;
  myUser: any;
  userRole: any;
  constructor(public cartService: CartService,
              public userService: UserService
  ) {
  }
  
  ngOnInit(): void {

    this.userService.userData$
    
      .subscribe((data: ResponseModel | SocialUser) => {
        this.myUser = data;
      });
    
    let email = localStorage.getItem('email')
    this.userRole = localStorage.getItem('userRole')
    console.log('heade',this.userRole);
    
    if(email){        
       
      this.userService.UserDataFatch(email);
    }
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);

    this.cartService.cartData$.subscribe(data => this.cartData = data);

    this.userService.authState$.subscribe(authState => this.authState = authState);
  }

  


  getRole(){
    return localStorage.getItem('userRole');
  }

}
