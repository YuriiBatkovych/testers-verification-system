package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.consts.RolesConsts;
import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;


@Service
public class CustomerService {

    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }


    public CustomerDto getCustomerByEmail(String email){
        Customer customer = customerRepository.findByEmail(email);

        if(customer == null) {
            return null;
        }
        return CustomerDto.customerToDto(customer);
    }

    public Set<RoleDto> getCustomerRoles(String email){
        Customer customer = customerRepository.findByEmail(email);

        if(customer == null){
            return RolesConsts.standardRoles;
        }
        else{
            return mapCustomerRoles(customer.getRoles());
        }
    }

    private Set<RoleDto> mapCustomerRoles(Set<Role> roles) {
        return roles.stream()
                .map(RoleDto::roleToEnum)
                .collect(Collectors.toSet());
    }

}
