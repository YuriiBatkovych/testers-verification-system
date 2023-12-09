package com.luv2code.ecommerce.dto;

import lombok.Data;

@Data
public class DiscountDto {
    Long customerId;
    Integer percentage;
}
