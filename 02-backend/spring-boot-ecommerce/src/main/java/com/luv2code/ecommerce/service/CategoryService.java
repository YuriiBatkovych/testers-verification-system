package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.authentication.AuthorizationService;
import com.luv2code.ecommerce.dao.ProductCategoryRepository;
import com.luv2code.ecommerce.dto.CategoryDto;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Value("${bug.save.new.category}")
    private boolean saveNewCategory;

    private final ProductCategoryRepository categoryRepository;
    private final AuthorizationService authorizationService;

    @Autowired
    CategoryService(ProductCategoryRepository categoryRepository, AuthorizationService authorizationService){
        this.categoryRepository = categoryRepository;
        this.authorizationService = authorizationService;
    }

    public ProductCategory addCategory(CategoryDto categoryDto) throws AuthorisationException {
        if(saveNewCategory) {
            authorizationService.authorizeAsStaff();
            ProductCategory productCategory = CategoryDto.productCategoryFromDto(categoryDto);
            return categoryRepository.save(productCategory);
        }
        else{
            return mockCategory();
        }
    }

    public void deleteCategory(Long id) throws AuthorisationException {
        authorizationService.authorizeAsStaff();
        categoryRepository.deleteById(id);
    }

    public ProductCategory updateCategory(CategoryDto categoryDto) throws AuthorisationException {
        authorizationService.authorizeAsStaff();
        ProductCategory productCategory = categoryRepository.getReferenceById(categoryDto.getId());
        productCategory.setCategoryName(categoryDto.getCategoryName());
        return categoryRepository.save(productCategory);
    }

    private ProductCategory mockCategory(){
        return new ProductCategory();
    }

}
