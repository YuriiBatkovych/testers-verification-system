package com.luv2code.ecommerce.service.impl.bugfacades;

import com.luv2code.ecommerce.dto.OrderDto;
import com.luv2code.ecommerce.service.IOrdersService;
import com.luv2code.ecommerce.service.impl.OrdersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrdersServiceFacade implements IOrdersService {

    @Value("${bug.truncate.orders.number}")
    private int truncatedOrdersNumber;

    private final OrdersService ordersService;

    @Autowired
    public OrdersServiceFacade(OrdersService ordersService) {
        this.ordersService = ordersService;
    }

    @Override
    public Page<OrderDto> getByUserEmail(String email, Pageable pageable) {
        Page<OrderDto> orders = ordersService.getByUserEmail(email, pageable);

        int maxSize = orders.getSize() - truncatedOrdersNumber;
        List<OrderDto> orderDtoList =  orders.stream().limit(maxSize).toList();

        return new PageImpl<>(orderDtoList);
    }
}
