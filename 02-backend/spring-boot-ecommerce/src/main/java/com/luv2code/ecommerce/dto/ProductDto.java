package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long id;
    private Long categoryId;
    private String sku;
    private String name;
    private String description;
    private BigDecimal unitPrice;
    private String imageUrl;
    private boolean active;
    private int unitsInStock;


    public static Product productFromDto(ProductDto productDto, ProductCategory productCategory){
        Product product = new Product();

        product.setId(productDto.getId());
        product.setCategory(productCategory);
        product.setSku(productDto.getSku());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setUnitPrice(productDto.getUnitPrice());
        product.setImageUrl(productDto.getImageUrl());
        product.setActive(productDto.isActive());
        product.setUnitsInStock(productDto.getUnitsInStock());

        return product;
    }
}
