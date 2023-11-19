package com.luv2code.ecommerce.service.impl.bugfacades;

import com.luv2code.ecommerce.dto.CategoryDto;
import com.luv2code.ecommerce.entity.ProductCategory;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import com.luv2code.ecommerce.service.ICategoryService;
import com.luv2code.ecommerce.service.impl.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceFacade implements ICategoryService {
    @Value("${bug.save.new.category}")
    private boolean saveNewCategory;

    @Value("${bug.save.edit.category}")
    private boolean updateCategory;

    @Value("${bug.delete.category}")
    private boolean deleteCategory;

    CategoryService categoryService;
    @Autowired
    CategoryServiceFacade(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    public ProductCategory addCategory(CategoryDto categoryDto) throws AuthorisationException {
        if(saveNewCategory){
            return categoryService.addCategory(categoryDto);
        }
        else{
            return mockCategory();
        }
    }

    public void deleteCategory(Long id) throws AuthorisationException {
       if(deleteCategory){
           categoryService.deleteCategory(id);
       }
    }

    public ProductCategory updateCategory(CategoryDto categoryDto) throws AuthorisationException {
        if(updateCategory){
            return categoryService.updateCategory(categoryDto);
        }
        else{
            return mockCategory();
        }
    }

    private ProductCategory mockCategory(){
        return new ProductCategory();
    }

}
