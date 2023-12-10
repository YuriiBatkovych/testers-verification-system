import { Component, OnInit } from '@angular/core';
import constants from 'src/app/config/constants';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  discountPercentage: number = 0;

  storage: Storage = sessionStorage;

  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.discountPercentage = this.discountService.getDiscount();
  }



}
