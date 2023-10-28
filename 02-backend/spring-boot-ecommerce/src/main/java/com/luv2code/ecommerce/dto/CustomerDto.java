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
}
