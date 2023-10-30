package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Role;
import lombok.Data;

import java.util.Set;

@Data
public class CustomerDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private Set<Role> roles;


    public static CustomerDto customerToDto(Customer customer){
        CustomerDto customerDto = new CustomerDto();

        customerDto.setId(customer.getId());
        customerDto.setFirstName(customer.getFirstName());
        customerDto.setLastName(customer.getLastName());
        customerDto.setEmail(customer.getEmail());
        customerDto.setRoles(customer.getRoles());

        return customerDto;
    }

    public static Customer customerFromDto(CustomerDto customerDto){
        Customer customer = new Customer();

        customer.setId(customerDto.getId());
        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setEmail(customerDto.getEmail());
        customer.setRoles(customerDto.getRoles());

        return customer;
    }
}
