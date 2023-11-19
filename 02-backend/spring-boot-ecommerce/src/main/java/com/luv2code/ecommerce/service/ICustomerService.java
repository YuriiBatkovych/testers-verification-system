package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.exceptions.AuthorisationException;

import java.util.List;
import java.util.Set;

public interface ICustomerService {
    Customer addNewUser(CustomerDto customerDto) throws AuthorisationException;
    Customer updateUser(CustomerDto customerDto) throws AuthorisationException;
    CustomerDto getCustomerByEmail(String email);
    CustomerDto getCustomerById(Long id);
    List<CustomerDto> getCustomers();
    RoleDto getCustomerRole(String email);
    void deleteByEmail(String email) throws AuthorisationException;
    void deleteById(Long id) throws AuthorisationException;
    Set<RoleDto> getAllRoles();
}
