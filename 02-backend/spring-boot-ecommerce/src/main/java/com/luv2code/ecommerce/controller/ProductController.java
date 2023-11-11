package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.ProductDto;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import com.luv2code.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("api/products")
@CrossOrigin("http://localhost:4200")
public class ProductController {

    ProductService productService;

    @Autowired
    ProductController(ProductService productService){
        this.productService = productService;
    }

    @PostMapping("/add")
    public Product addNewProduct(@RequestBody ProductDto productDto) throws AuthorisationException {
        Product product = productService.addProduct(productDto);
        System.out.println(product);
        return product;
    }

    @PutMapping("/update")
    public ResponseEntity<Product> updateProduct(@RequestBody ProductDto productDto) throws AuthorisationException {
        System.out.println(productDto);
        Product product = productService.updateProduct(productDto);
        return ResponseEntity.status(HttpStatus.OK).body(product);
    }

    @GetMapping
    public  ResponseEntity<ProductDto> getById(@Param("id") Long id){
        ProductDto productDto = productService.getById(id);
        return ResponseEntity.ok(productDto);
    }

    @GetMapping("/category")
    public ResponseEntity<Page<ProductDto>> getByCategoryId(@Param("id") Long id, Pageable pageable){
        Page<ProductDto> products = productService.getByCategoryId(id, pageable);
        return ResponseEntity.ok(products);
    }

    @GetMapping("/key")
    public ResponseEntity<Page<ProductDto>> getByKeyWord(@Param("name") String name, Pageable pageable){
        Page<ProductDto> products = productService.getByNameContaining(name, pageable);
        return ResponseEntity.ok(products);
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
