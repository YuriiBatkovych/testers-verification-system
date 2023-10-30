package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.ProductDto;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/product")
public class ProductController {

    ProductService productService;

    @Autowired
    ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping("/add")
    public Product addNewProduct(@RequestBody ProductDto productDto){
        Product product = productService.addProduct(productDto);
        System.out.println(product);
        return product;
    }

    @PutMapping("/update")
    public ResponseEntity<Product> updateCategory(@RequestBody ProductDto productDto){
        Product product = productService.updateProduct(productDto);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteById(@Param("id") Long id){
        try{
            productService.deleteProduct(id);
            return ResponseEntity.status(HttpStatus.OK).body("deleted");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
