package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.OrderDto;;
import com.luv2code.ecommerce.service.IOrdersService;
import com.luv2code.ecommerce.service.impl.bugfacades.OrdersServiceFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/orders")
@CrossOrigin("http://localhost:4200")
public class OrdersController {

    private final IOrdersService ordersService;

    @Autowired
    public OrdersController(OrdersServiceFacade ordersService){
        this.ordersService = ordersService;
    }

    @GetMapping
    ResponseEntity<Page<OrderDto>> getByUserEmail(@Param("email") String email, Pageable pageable){
        try {
            Page<OrderDto> orders = ordersService.getByUserEmail(email, pageable);
            return ResponseEntity.status(HttpStatus.OK).body(orders);
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
