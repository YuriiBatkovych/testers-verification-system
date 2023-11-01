package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.entity.ProductCategory;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductDto {
    private Long id;
    private String categoryName;
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

    public static ProductDto productToDto(Product product){
        ProductDto productDto = new ProductDto();

        productDto.setId(product.getId());
        productDto.setCategoryName(product.getCategory().getCategoryName());
        productDto.setSku(product.getSku());
        productDto.setName(product.getName());
        productDto.setDescription(product.getDescription());
        productDto.setUnitPrice(product.getUnitPrice());
        productDto.setImageUrl(product.getImageUrl());
        productDto.setActive(product.isActive());
        productDto.setUnitsInStock(product.getUnitsInStock());

        return productDto;
    }

    @Override
    public String toString(){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("id=").append(id).append("\n");
        stringBuilder.append("categoryName=").append(categoryName).append("\n");
        stringBuilder.append("sku=").append(sku).append("\n");
        stringBuilder.append("imageUrl=").append(imageUrl).append("\n");
        stringBuilder.append("description=").append(description).append("\n");
        stringBuilder.append("unitsInStock=").append(unitsInStock).append("\n");
        stringBuilder.append("unitPrice=").append(unitPrice).append("\n");

        return stringBuilder.toString();
    }
}
