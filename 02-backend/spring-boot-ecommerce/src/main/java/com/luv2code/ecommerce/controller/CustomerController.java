package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("api/customer")
public class CustomerController {

    private CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService){
        this.customerService = customerService;
    }

    @GetMapping
    public CustomerDto getCustomerByEmail(@Param("email") String email){
        CustomerDto customerResponse = customerService.getCustomerByEmail(email);
        return  customerResponse;
    }

    @GetMapping("/roles")
    public Set<RoleDto> getCustomerRolesByEmail(@Param("email") String email){
        Set<RoleDto> roles = customerService.getCustomerRoles(email);
        return  roles;
    }

}
