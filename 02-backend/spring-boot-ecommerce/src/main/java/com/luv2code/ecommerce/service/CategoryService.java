package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dao.ProductCategoryRepository;
import com.luv2code.ecommerce.dto.CategoryDto;
import com.luv2code.ecommerce.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    private final ProductCategoryRepository categoryRepository;

    @Autowired
    CategoryService(ProductCategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public ProductCategory addCategory(CategoryDto categoryDto){
        ProductCategory productCategory = CategoryDto.productCategoryFromDto(categoryDto);
        System.out.println(productCategory.getCategoryName());
        return categoryRepository.save(productCategory);
    }

    public void deleteCategory(Long id){
        categoryRepository.deleteById(id);
    }

    public ProductCategory updateCategory(CategoryDto categoryDto){
        ProductCategory productCategory = categoryRepository.getReferenceById(categoryDto.getId());
        productCategory.setCategoryName(categoryDto.getCategoryName());
        return categoryRepository.save(productCategory);
    }

}
