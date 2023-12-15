package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.OrderDto;
import com.luv2code.ecommerce.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IOrdersService {

    Page<OrderDto> getByUserEmail(String email, Pageable pageable);

}
