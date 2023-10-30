package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.CategoryDto;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/category")
public class CategoryController {

    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<ProductCategory> addNewCategory(@RequestBody CategoryDto categoryDto){
        ProductCategory productCategory = categoryService.addCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.OK).body(productCategory);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateCategory(@RequestParam("id") Long id,
                                                 @RequestParam(name = "updatedName") String name){
        categoryService.updateCategory(id, name);
        return ResponseEntity.status(HttpStatus.OK).body("updated");
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
