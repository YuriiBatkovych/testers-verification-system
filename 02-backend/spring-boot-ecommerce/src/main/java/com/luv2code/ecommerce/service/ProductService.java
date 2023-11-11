package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.consts.ContextProperties;
import com.luv2code.ecommerce.dao.ProductCategoryRepository;
import com.luv2code.ecommerce.dao.ProductRepository;
import com.luv2code.ecommerce.dto.ProductDto;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ProductService {

    ProductRepository productRepository;
    ProductCategoryRepository productCategoryRepository;

    @Autowired
    ProductService(ProductRepository productRepository,
                   ProductCategoryRepository productCategoryRepository){
        this.productRepository = productRepository;
        this.productCategoryRepository = productCategoryRepository;
    }

    public Product addProduct(ProductDto productDto){
        ProductCategory productCategory = productCategoryRepository.findByCategoryName(productDto.getCategoryName());
        Product product = ProductDto.productFromDto(productDto, productCategory);

        return productRepository.save(product);
    }

    public ProductDto getById(Long id){
        Product product = productRepository.getReferenceById(id);
        ProductDto productDto = ProductDto.productToDto(product);
        return productDto;
    }

    public Page<ProductDto> getByCategoryId(Long id, Pageable pageable){
        Page<Product> products = productRepository.findByCategoryId(id, pageable);
        return  products.map(ProductDto::productToDto);
    }

    public Page<ProductDto> getByNameContaining(String name, Pageable pageable){
        Page<Product> products = productRepository.findByNameContaining(name, pageable);
        return  products.map(ProductDto::productToDto);
    }

    public Product updateProduct(ProductDto productDto){
        ProductCategory newProductCategory = productCategoryRepository.findByCategoryName(productDto.getCategoryName());
        Product oldProduct = productRepository.getReferenceById(productDto.getId());

        oldProduct.setName(productDto.getName());
        oldProduct.setCategory(newProductCategory);
        oldProduct.setSku(productDto.getSku());
        oldProduct.setDescription(productDto.getDescription());
        oldProduct.setUnitPrice(productDto.getUnitPrice());
        oldProduct.setImageUrl(productDto.getImageUrl());
        oldProduct.setActive(productDto.isActive());
        oldProduct.setUnitsInStock(productDto.getUnitsInStock());

        return productRepository.save(oldProduct);
    }

    public void deleteProduct(Long id){
        productRepository.deleteById(id);
    }

}
