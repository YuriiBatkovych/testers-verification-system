package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.ProductDto;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductService {

    Product addProduct(ProductDto productDto) throws AuthorisationException;
    Product updateProduct(ProductDto productDto) throws AuthorisationException;
    void deleteProduct(Long id);
    ProductDto getById(Long id);
    Page<ProductDto> getByCategoryId(Long id, Pageable pageable);
    Page<ProductDto> getByNameContaining(String name, Pageable pageable);

}
