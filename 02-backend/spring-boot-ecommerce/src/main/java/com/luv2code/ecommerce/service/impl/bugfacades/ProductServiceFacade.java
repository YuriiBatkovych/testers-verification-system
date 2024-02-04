package com.luv2code.ecommerce.service.impl.bugfacades;

import com.luv2code.ecommerce.dto.ProductDto;
import com.luv2code.ecommerce.entity.Product;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import com.luv2code.ecommerce.logging.BugLogger;
import com.luv2code.ecommerce.service.IProductService;
import com.luv2code.ecommerce.service.impl.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceFacade implements IProductService {

    @Value("${bug.save.new.product}")
    private boolean saveNewProduct;

    @Value("${bug.save.edit.product}")
    private boolean updateProduct;

    @Value("${bug.delete.product}")
    private boolean deleteProduct;
    private final BugLogger bugLogger = new BugLogger();
    private final ProductService productService;
    @Autowired
    ProductServiceFacade(ProductService productService){
        this.productService = productService;
    }

    @Override
    public Product addProduct(ProductDto productDto) throws AuthorisationException {
        if(saveNewProduct){
            return productService.addProduct(productDto);
        }
        else {
            bugLogger.info("NotSavedNewProduct");
            return mockProduct();
        }
    }

    @Override
    public Product updateProduct(ProductDto productDto) throws AuthorisationException {
        if(updateProduct){
            return productService.updateProduct(productDto);
        }
        else {
            bugLogger.info("NotUpdatedNewProduct");
            return mockProduct();
        }
    }

    @Override
    public void deleteProduct(Long id) {
        if(deleteProduct){
            productService.deleteProduct(id);
        }
        else{
            bugLogger.info("NotDeletedNewProduct");
        }
    }

    @Override
    public ProductDto getById(Long id) {
        return productService.getById(id);
    }

    @Override
    public Page<ProductDto> getByCategoryId(Long id, Pageable pageable) {
        return productService.getByCategoryId(id, pageable);
    }

    @Override
    public Page<ProductDto> getByNameContaining(String name, Pageable pageable) {
        return productService.getByNameContaining(name, pageable);
    }

    private Product mockProduct(){
        return new Product();
    }
}
