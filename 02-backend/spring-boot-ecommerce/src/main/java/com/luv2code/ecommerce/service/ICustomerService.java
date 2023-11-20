package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.exceptions.AuthorisationException;

import java.util.List;

public interface ICustomerService {
    Customer addNewUser(CustomerDto customerDto) throws AuthorisationException;
    Customer updateUser(CustomerDto customerDto) throws AuthorisationException;
    CustomerDto registerUser(CustomerDto customerDto);
    CustomerDto getCustomerByEmail(String email);
    CustomerDto getCustomerById(Long id);
    List<CustomerDto> getCustomers();
    void deleteByEmail(String email) throws AuthorisationException;
    void deleteById(Long id) throws AuthorisationException;
}
