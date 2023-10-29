import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-staff-accessors',
  templateUrl: './staff-accessors.component.html',
  styleUrls: ['./staff-accessors.component.css']
})
export class StaffAccessorsComponent implements OnInit {

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
  }

  hasRightsForUserManagement() : boolean{
    return this.customerService.isADMIN();
  }

  hasRightsForProductManagement() : boolean{
    return this.customerService.isSTAFF();
  }

}
