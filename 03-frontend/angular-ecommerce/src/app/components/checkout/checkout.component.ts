import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Country } from 'src/app/common/country';
import { State } from 'src/app/common/state';
import { Luv2ShopFormService } from 'src/app/services/luv2-shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  checkoutFormGroup: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
              private luv2ShopFormService: Luv2ShopFormService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),

      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),

      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOfCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });

    const startMonth: number = new Date().getMonth() + 1;

    this.luv2ShopFormService.getCreditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

    this.luv2ShopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    )

    this.luv2ShopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    )
  }

  onSubmit(){
    console.log("Handling the customer data");
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  copyShippingAddressToBillingAddress(event: Event){

    const target = event.target as HTMLInputElement;
    if(target.checked){
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

      this.billingAddressStates = this.shippingAddressStates;
    }
    else{
      this.checkoutFormGroup.controls['billingAddress'].reset();

      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears(){
    const credirCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(credirCardFormGroup?.value.expirationYear);
  
    let startMonth: number;

    if(currentYear === selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    else{
      startMonth = 1;
    }

    this.luv2ShopFormService.getCreditCardMonth(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }

  getStates(formGroupName: string){

    const formGroup = this.checkoutFormGroup.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    this.luv2ShopFormService.getStates(countryCode).subscribe(
      data => {
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
        }
        else{
          this.billingAddressStates = data;
        }

        formGroup?.get('state')?.setValue(data[0]);
      }
    );

  }


}