import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
// import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
// import { OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  // userFullName: string = "";

  // constructor(private oktaAuthService: OktaAuthStateService,
  //   @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService){}

  ngOnInit(): void {
    // this.oktaAuthService.authState$.subscribe(
    //   (result) => {
    //     this.isAuthenticated = result.isAuthenticated!;
    //     this.getUserDetails();
    //   }
    // )
  }

  login(){
    this.auth.loginWithRedirect();
  }

  logout(){
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
  }
  

}
