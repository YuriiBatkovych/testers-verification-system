import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductEdition } from 'src/app/common/product-edition';
import { ProductForForm } from 'src/app/common/product-for-form';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Luv2ShopValidators } from 'src/app/validators/luv2-shop-validators';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.css']
})
export class ProductEditionComponent implements OnInit {

  product!: ProductEdition;
  productCategories: ProductCategory[] = [];

  addMode: boolean = false;
  
  productFormGroup: FormGroup = new FormGroup({});

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router) { }

  ngOnInit(): void {
    this.listProductCategories();

    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    });
  }

  get name(){ return this.productFormGroup.get('product.name'); }
  get category(){ return this.productFormGroup.get('product.categoryName'); }
  get sku(){ return this.productFormGroup.get('product.sku'); }
  get description(){ return this.productFormGroup.get('product.description'); }
  get unitPrice(){ return this.productFormGroup.get('product.unitPrice'); }
  get imageUrl(){ return this.productFormGroup.get('product.imageUrl'); }
  get active(){ return this.productFormGroup.get('product.active'); }
  get unitsInStock(){ return this.productFormGroup.get('product.unitsInStock'); }


  handleProductDetails() {

    this.addMode = !this.route.snapshot.paramMap.has('id');

    if(this.addMode){
      this.createEmptyProduct();
      this.createFormGroup();
    }
    else{
      this.handleExistingProductDetails();
    }
  }

  createEmptyProduct() {
    this.product = new ProductEdition(0, "", "", "", "", 0, "", false, 0);
  }

  handleExistingProductDetails(){
    const productId: number = +this.route.snapshot.paramMap.get('id')!;

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
        this.createFormGroup();
      }
    );
  }

  listProductCategories() {
    this.categoryService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    )
  }

  createFormGroup(){
    this.productFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        name: new FormControl(this.product.name, 
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                  Luv2ShopValidators.notOnlyWhiteSpace]),
        categoryName: new FormControl('',
                                  [Validators.required]),
        sku: new FormControl(this.product.sku, 
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhiteSpace]),
        description: new FormControl(this.product.description, 
                                    [Validators.required, 
                                     Validators.minLength(2), 
                                    Luv2ShopValidators.notOnlyWhiteSpace]),
        unitPrice: new FormControl(this.product.unitPrice, 
                                  [Validators.required]),
        imageUrl: new FormControl(this.product.imageUrl,
                                  [Validators.required, 
                                   Validators.minLength(2), 
                                   Luv2ShopValidators.notOnlyWhiteSpace]),
        active: new FormControl(this.product.active),
        unitsInStock: new FormControl(this.product.unitsInStock,
                                      [Validators.required])
      })
    });
  }

  onSubmit(){
    console.log("Handling the customer data of updated product");

    if(this.productFormGroup.invalid){
      this.productFormGroup.markAllAsTouched();
      return;
    }
    
    if(this.addMode){
      this.addProduct();
    }
    else{
      this.editProduct();
    }
  }

  getProductFromForm(): ProductForForm{
    let formProduct = new ProductForForm();
    formProduct = this.productFormGroup.controls['product'].value;

    const category: ProductCategory = JSON.parse(JSON.stringify(formProduct.categoryName));
    formProduct.categoryName = category.categoryName;

    return formProduct;
  }

  addProduct(){
    const addProduct = this.getProductFromForm();

    this.productService.addProduct(addProduct).subscribe({
      next: response => {
        alert(`Product is added`);
        this.reset();
      },
      error: err =>{
        alert(`There was an error: ${err.message}`);
      }
    }
  );
  }

  editProduct(){
    let editedProduct = this.getProductFromForm();
    editedProduct.id = this.product.id;
    
    this.productService.updateProduct(editedProduct).subscribe({
        next: response => {
          alert(`Product is updated`);
          this.reset();
        },
        error: err =>{
          alert(`There was an error: ${err.message}`);
        }
      }
    );
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

