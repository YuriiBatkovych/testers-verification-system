import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/common/customer';
import { Role } from 'src/app/common/role';
import { CustomerService } from 'src/app/services/customer.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-user-edition',
  templateUrl: './user-edition.component.html',
  styleUrls: ['./user-edition.component.css']
})

export class UserEditionComponent implements OnInit {
  // userFormGroup: FormGroup = new FormGroup({});
  rolesList: Role[] = [];
  user!: Customer;

  firstName =  new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]);
  lastName =  new FormControl('', [Validators.required, Validators.minLength(2), Luv2ShopValidators.notOnlyWhiteSpace]);
  email = new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  role = new FormControl();

  addMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private customerService: CustomerService,
              private router: Router) { }

  ngOnInit(): void {
    this.addMode = this.router.url.includes('/add');

    if(this.addMode){
      this.createEmptyUser();
    }
    else{
      this.handleUserDetails();
    }
  }

  createEmptyUser(){
    this.user = new Customer();
    this.handleRolesList();
  }

  handleRolesList(){
    this.customerService.getAllRolesList().subscribe(
      data => {
        this.rolesList = data;
        this.addFormsValues();
      }
    );
  }

  handleUserDetails(){
    const userId: number = +this.route.snapshot.paramMap.get('id')!;

    this.customerService.getUserById(userId).subscribe(
      data => {
                this.user = data;
                this.handleRolesList();
              }
    );
  }

  addFormsValues(){
    this.firstName.setValue(this.user.firstName);
    this.lastName.setValue(this.user.lastName);
    this.email.setValue(this.user.email);
    this.role.setValue(this.user.role);

    if(!this.addMode){
      this.email.disable();
    }
  }

  formInvalid(){
    return this.firstName.invalid || this.lastName.invalid || this.email.invalid || this.role.invalid;
  }
  

  onSubmit(){
    if(this.formInvalid()){
      this.firstName.markAsTouched();
      this.lastName.markAsTouched();
      this.email.markAsTouched();
      this.role.markAsTouched();
      return;
    }

    if(this.addMode){
      this.addUser();
    }
    else{
      this.updateUser();
    }
  }

  addUser(){
    let customer: Customer = this.getCustomerFromForms();

    this.customerService.addUser(customer).subscribe({
      next: response => {
        this.handleSuccess("User added");
      },
      error: err =>{
        this.handleError(err);
      }
    });
  }

  updateUser(){
    let customer: Customer = this.getCustomerFromForms();

    this.customerService.updateUser(customer).subscribe({
      next: response => {
        this.handleSuccess("User updated");
      },
      error: err =>{
        this.handleError(err);
      }
    });
  }

  getCustomerFromForms(): Customer{
    let customer = new Customer();

    customer.id = this.user.id;
    customer.firstName = this.firstName.value!;
    customer.lastName = this.lastName.value!;
    customer.email = this.email.value!;
    customer.role = this.role.value;

    return customer;
  }

  handleSuccess(message: string){
    alert(message);
    this.reset();
  }

  handleError(err : Error){
    alert(`There was an error: ${err.message}`);
  }

  reset() {
    this.addMode = false;
    this.router.navigateByUrl("/users");
  }

  getSubmitButtonText(): string {
    if(this.addMode){
      return "Add";
    }
    else{
      return "Edit";
    }
  }
    

}
