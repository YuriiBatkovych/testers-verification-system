package com.luv2code.ecommerce.service.impl;

import com.luv2code.ecommerce.dao.OrderRepository;
import com.luv2code.ecommerce.dto.OrderDto;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.service.IOrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OrdersService implements IOrdersService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrdersService(OrderRepository orderRepository){
        this.orderRepository = orderRepository;
    }

    @Override
    public Page<OrderDto> getByUserEmail(String email, Pageable pageable) {
        Page<Order> orders =orderRepository.findByCustomerEmail(email, pageable);
        return orders.map(OrderDto::orderToDto);
    }
}
