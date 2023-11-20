import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CustomerService } from 'src/app/services/customer.service';

import constants from 'src/app/config/constants';
import { Customer } from 'src/app/common/customer';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  userName: string = "";

  storage: Storage = sessionStorage;

  constructor(@Inject(DOCUMENT) public document: Document, 
              public auth: AuthService,
              public customerService: CustomerService){}

  ngOnInit(): void {
    this.customerService.setDefaultRole();
    
    this.auth.user$.subscribe(
      (result) => {
        if(result != undefined){
          this.userName = result.name as string;
          const userEmail = result.email as string;

          let customer = new Customer();
          customer.email = userEmail;
          
          this.customerService.registerUser(customer).subscribe(
            data => {
              this.storage.setItem(constants.storageParams.USER_EMAIL, JSON.stringify(data.email));
              this.storage.setItem(constants.storageParams.USER_ROLES, JSON.stringify(data.role.name));
            }
          )
        }
      }
    )
  }

  login(){
    this.auth.loginWithRedirect();
  }

  logout(){
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
    this.customerService.setDefaultRole();
    this.customerService.setDefaultEmail();
  }
  

}
