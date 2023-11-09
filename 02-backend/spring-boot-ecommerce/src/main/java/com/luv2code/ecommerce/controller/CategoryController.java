package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.CategoryDto;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.service.CategoryService;
import com.luv2code.ecommerce.service.CheckoutService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/category")
@CrossOrigin(origins = "http://localhost:4200")
public class CategoryController {

    private final Log log = LogFactory.getLog(CategoryController.class);
    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @PostMapping("/add")
    public ResponseEntity<ProductCategory> addNewCategory(@RequestBody CategoryDto categoryDto){
        logRequest(categoryDto);
        ProductCategory productCategory = categoryService.addCategory(categoryDto);
        return ResponseEntity.status(HttpStatus.OK).body(productCategory);
    }

    @PostMapping("/update")
    public ResponseEntity<ProductCategory> updateCategory(@RequestBody CategoryDto categoryDto){
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

    private void logRequest(CategoryDto categoryDto){
        StringBuilder message = new StringBuilder();
        message.append("Adding new category request started: ");
        message.append(categoryDto);

        log.info(message);
    }
}
