import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: Customer[] = [];

  constructor(private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    this.handleAllCustomers();
  }

  handleAllCustomers(){
    this.customerService.getAllUsers().subscribe(
      data => this.users = data
    );
  }

  deleteUser(userId: number){
    console.log("In user delete");
    this.customerService.deleteUser(userId).subscribe({
      next: response => {
        this.handleSuccess("User deleted");
      },
      error: err =>{
        this.handleError(err);
      }
    });
  }

  reloadPage(){
    window.location.reload();
  }


  handleSuccess(message: string){
    alert(message);
    this.reset();
  }

  handleError(err : Error){
    alert(`There was an error: ${err.message}`);
  }


  reset() {
    window.location.reload();
    this.router.navigateByUrl("/users");
  }

}
