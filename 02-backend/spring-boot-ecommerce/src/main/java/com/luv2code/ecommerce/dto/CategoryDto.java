package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.ProductCategory;
import lombok.Data;

@Data
public class CategoryDto {
    private Long id;
    private String categoryName;

    public static ProductCategory productCategoryFromDto(CategoryDto categoryDto){
        ProductCategory productCategory = new ProductCategory();
        productCategory.setCategoryName(categoryDto.getCategoryName());

        return productCategory;
    }

    @Override
    public String toString(){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("id=").append(id).append("\n");
        stringBuilder.append("categoryName=").append(categoryName).append("\n");
        return stringBuilder.toString();
    }
}
