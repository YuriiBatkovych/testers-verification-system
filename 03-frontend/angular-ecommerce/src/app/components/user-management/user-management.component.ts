import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/common/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  users: Customer[] = [];

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.handleAllCustomers();
  }

  handleAllCustomers(){
    this.customerService.getAllUsers().subscribe(
      data => this.users = data
    );
  }

}
