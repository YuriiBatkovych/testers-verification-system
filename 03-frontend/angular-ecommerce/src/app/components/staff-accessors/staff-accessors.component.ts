import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { LogsService } from 'src/app/services/logs.service';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-accessors',
  templateUrl: './staff-accessors.component.html',
  styleUrls: ['./staff-accessors.component.css']
})
export class StaffAccessorsComponent implements OnInit {

  addCategoryRoute: string = environment.bugAddCategoryRoute;
  editCategoryRoute: string = environment.bugEditCategoryRoute;
  deleteCategoryRoute: string = environment.bugDeleteCategoryRoute;

  constructor(private customerService: CustomerService,
              private router: Router,
              private logsService: LogsService) {}

  ngOnInit(): void {
  }

  goToEditCategory(){
    if(!this.editCategoryRoute.includes('edit')){
      this.logsService.logMessage("[EditCategoryRouteBug]");
    }

    this.router.navigate([this.editCategoryRoute]);
  }

  goToAddCategory(){
    if(!this.addCategoryRoute.includes('add')){
      this.logsService.logMessage("[AddCategoryRouteBug]");
    }

    this.router.navigate([this.addCategoryRoute]);
  }

  goToDeleteCategory(){
    if(!this.deleteCategoryRoute.includes('delete')){
      this.logsService.logMessage("[DeleteCategoryRouteBug]");
    }

    this.router.navigate([this.deleteCategoryRoute]);
  }

  hasRightsForUserManagement() : boolean{
    return this.customerService.isADMIN();
  }

  hasRightsForProductManagement() : boolean{
    return this.customerService.isSTAFF();
  }

}
