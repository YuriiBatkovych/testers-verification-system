package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.CategoryDto;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.exceptions.AuthorisationException;

public interface ICategoryService {
    ProductCategory addCategory(CategoryDto categoryDto) throws AuthorisationException;
    void deleteCategory(Long id) throws AuthorisationException;
    ProductCategory updateCategory(CategoryDto categoryDto) throws AuthorisationException;
}
