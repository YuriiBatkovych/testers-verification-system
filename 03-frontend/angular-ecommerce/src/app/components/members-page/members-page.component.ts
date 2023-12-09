import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/services/discount.service';

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.css']
})
export class MembersPageComponent implements OnInit {

  discountPercentage: number = 0;

  constructor(public discountService: DiscountService) { }

  ngOnInit(): void {
    this.discountService.getDiscount().subscribe(
      data => {
        this.discountPercentage = data.percentage;
        console.log(data);
      }
    )
  }



}
