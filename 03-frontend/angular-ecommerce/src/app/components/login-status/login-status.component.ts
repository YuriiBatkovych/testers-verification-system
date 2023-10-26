import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  userName: string = "";

  storage: Storage = sessionStorage;

  constructor(@Inject(DOCUMENT) public document: Document, public auth: AuthService){}

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (result) => {
        if(result != undefined){
          this.userName = result.name as string;
          const userEmail = result.email as string;
          
          this.storage.setItem('userEmail', JSON.stringify(userEmail));
        }
      }
    )
  }

  login(){
    this.auth.loginWithRedirect();
  }

  logout(){
    this.auth.logout({ logoutParams: { returnTo: document.location.origin } });
    this.storage.setItem('userEmail', JSON.stringify(""));
  }
  

}
