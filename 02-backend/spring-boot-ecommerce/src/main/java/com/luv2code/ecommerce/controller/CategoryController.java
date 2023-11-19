package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.CategoryDto;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import com.luv2code.ecommerce.service.ICategoryService;
import com.luv2code.ecommerce.service.impl.bugfacades.CategoryServiceFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/category")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {
    private final ICategoryService categoryService;

    @Autowired
    public CategoryController(CategoryServiceFacade categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<ProductCategory> addNewCategory(@RequestBody CategoryDto categoryDto) throws AuthorisationException {
        ProductCategory productCategory = categoryService.addCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.OK).body(productCategory);
    }

    @PostMapping("/update")
    public ResponseEntity<ProductCategory> updateCategory(@RequestBody CategoryDto categoryDto) throws AuthorisationException {
        ProductCategory productCategory = categoryService.updateCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.OK).body(productCategory);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteById(@Param("id") Long id){
        try{
            categoryService.deleteCategory(id);
            return ResponseEntity.status(HttpStatus.OK).body("deleted");
        }
        catch (Exception e){
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
