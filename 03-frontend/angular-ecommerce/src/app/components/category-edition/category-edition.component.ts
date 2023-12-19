import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { CategoryService } from 'src/app/services/category.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  categoryFormGroup: FormGroup = new FormGroup({});

  addMode: boolean = false;
  deleteMode: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.listProductCategories();
    this.figureOutMode();
    this.createFormGroup();
  }

  figureOutMode(){
    this.addMode = this.router.url.includes('/add');
    this.deleteMode = this.router.url.includes('/delete');
  }

  createFormGroup(){
    let newCategoryNameValidators : ValidatorFn[] = this.getNewCategoryNameValidators();
    let currentCategoryValidators : ValidatorFn[] = this.getCurrentCategoryValidators();

    this.categoryFormGroup = this.formBuilder.group({
      category: this.formBuilder.group({
        currentName: new FormControl('', currentCategoryValidators),
        newCategoryName: new FormControl('', newCategoryNameValidators)
      })
    });
  }

  getCurrentCategoryValidators() : ValidatorFn[] {
    if(!this.addMode){
      return [Validators.required]
    }
    else{
      return [];
    }
  }

  getNewCategoryNameValidators() : ValidatorFn[] {
    if(!this.deleteMode && environment.bugCategoryNameRequired){
      return [Validators.required, 
              Validators.minLength(2), 
              Luv2ShopValidators.notOnlyWhiteSpace]
    }
    else{
      return [];
    }
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

  getCategoryFormFormGroup() : CategoryForm{
    let categoryForm = new CategoryForm();
    categoryForm = this.categoryFormGroup.controls['category'].value;
    return categoryForm;
  }

  getCurrentCategoryIdFromGroup(categoryForm : CategoryForm) : number {
    const category: ProductCategory = JSON.parse(JSON.stringify(categoryForm.currentName));
    return category.id;
  }

  addCategory(){
    let categoryForm = this.getCategoryFormFormGroup();

    this.categoryService.addNewCategory(categoryForm.newCategoryName).subscribe({
      next: response => {
        this.handleSuccess("Category added");
      },
      error: err =>{
        this.handleError(err);
      }
    });
  }

  updateCategory(){
    let categoryForm = this.getCategoryFormFormGroup();
    let currentCategoryId = this.getCurrentCategoryIdFromGroup(categoryForm);
  
    this.categoryService.updateCategory(currentCategoryId, categoryForm.newCategoryName).subscribe({
      next: response => {
        this.handleSuccess("Category updated");
      },
      error: err =>{
        this.handleError(err);
      }
    });
  }

  deleteCategory() {
    let categoryForm = this.getCategoryFormFormGroup();
    let currentCategoryId = this.getCurrentCategoryIdFromGroup(categoryForm);

    this.categoryService.deleteCategory(currentCategoryId).subscribe({
      next: response => {
        this.handleSuccess("Category deleted");
      },
      error: err =>{
        this.handleError(err);
      }
    });
  }


  onSubmit(){
    console.log("Handling the customer data of updated category");
    if(this.categoryFormGroup.invalid){
      this.categoryFormGroup.markAllAsTouched();
      return;
    }
    
    if(this.addMode){
      this.addCategory();
    }
    else if(this.deleteMode){
      this.deleteCategory();
    }
    else{
      this.updateCategory();
    }
  }

  getSubmitButtonText(): string {
      if(this.addMode){
          return "Add";
      }
      else if(this.deleteMode){
          return "Delete";
      }
      else{
          return "Edit";
      }
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
    window.location.reload();
  }

}


class CategoryForm{
  currentName: string = "";
  newCategoryName: string = "";
}