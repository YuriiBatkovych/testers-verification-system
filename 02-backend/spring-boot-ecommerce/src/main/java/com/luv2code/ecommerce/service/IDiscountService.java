package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.DiscountDto;

public interface IDiscountService {
    DiscountDto getDiscount(String userEmail);
}
