import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  categoryFormGroup: FormGroup = new FormGroup({});

  addMode: boolean = false;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.listProductCategories();
    this.addMode = this.router.url.includes('/add');
    this.createFormGroup();
  }

  createFormGroup(){
    this.categoryFormGroup = this.formBuilder.group({
      category: this.formBuilder.group({
        currentName: new FormControl(''),
        newCategoryName: new FormControl('',
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhiteSpace])
      })
    });
  }

  get currentName(){ return this.categoryFormGroup.get('category.currentName'); }
  get newCategoryName(){ return this.categoryFormGroup.get('category.newCategoryName'); }

  listProductCategories() {
    this.categoryService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    )
  }

  addCategory(){
    let categoryForm = new CategoryForm();
    categoryForm = this.categoryFormGroup.controls['category'].value;

    this.categoryService.addNewCategory(categoryForm.newCategoryName).subscribe({
      next: response => {
        alert(`Category is added`);
        this.reset();
      },
      error: err =>{
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  updateCategory(){
    let categoryForm = new CategoryForm();
    categoryForm = this.categoryFormGroup.controls['category'].value;

    const category: ProductCategory = JSON.parse(JSON.stringify(categoryForm.currentName));
    let currentCategoryId = category.id;
  
    this.categoryService.updateCategory(currentCategoryId, categoryForm.newCategoryName).subscribe({
      next: response => {
        alert(`Category is updated`);
        this.reset();
      },
      error: err =>{
        alert(`There was an error: ${err.message}`);
      }
    });
  }

  onSubmit(){
    console.log("Handling the customer data of updated category");
    console.log(this.categoryFormGroup.controls['category'].value);
    if(this.categoryFormGroup.invalid){
      this.categoryFormGroup.markAllAsTouched();
      console.log("in invalid");
      return;
    }
    
    if(this.addMode){
      this.addCategory();
    }
    else{
      this.updateCategory();
    }
  }

  getSubmitButtonText(): string {
    if(this.addMode){
        return "Add";
    }
    else{
        return "Edit";
    }
}

  reset() {
    this.addMode = false;
    this.router.navigateByUrl("/products");
  }

}


class CategoryForm{
  currentName: string = "";
  newCategoryName: string = "";
}