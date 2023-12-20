package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.consts.GeneralConsts;
import com.luv2code.ecommerce.dto.DiscountDto;
import com.luv2code.ecommerce.service.IDiscountService;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/discount")
@CrossOrigin("http://localhost:4200")
public class DiscountController {
    private final IDiscountService discountService;

    @Autowired
    public DiscountController(IDiscountService discountService) {
        this.discountService = discountService;
    }

    @GetMapping
    public ResponseEntity<DiscountDto> getDiscount(@Param("email") String email){
        try {
            DiscountDto discountDto = discountService.getDiscount(email);
            return ResponseEntity.status(HttpStatus.OK).body(discountDto);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DiscountDto());
        }
    }
}
