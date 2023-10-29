package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.ProductCategory;
import lombok.Data;

@Data
public class CategoryDto {
    private String name;

    public static ProductCategory productCategoryFromDto(CategoryDto categoryDto){
        ProductCategory productCategory = new ProductCategory();

        productCategory.setCategoryName(categoryDto.name);

        return productCategory;
    }
}
