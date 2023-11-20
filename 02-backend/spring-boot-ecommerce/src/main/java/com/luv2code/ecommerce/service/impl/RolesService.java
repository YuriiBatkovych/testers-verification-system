package com.luv2code.ecommerce.service.impl;
;
import com.luv2code.ecommerce.consts.RolesConsts;
import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dao.CustomerRolesRepository;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Role;
import com.luv2code.ecommerce.service.IRolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RolesService implements IRolesService {

    private final CustomerRepository customerRepository;
    private final CustomerRolesRepository rolesRepository;

    @Autowired
    public RolesService(CustomerRepository customerRepository,
                           CustomerRolesRepository rolesRepository){
        this.customerRepository = customerRepository;
        this.rolesRepository = rolesRepository;
    }

    public RoleDto getCustomerRole(String email){
        Customer customer = customerRepository.findByEmail(email);

        if(customer == null){
            return RolesConsts.standardRoles;
        }
        else{
            return RoleDto.roleToDto(customer.getRole());
        }
    }

    public Set<RoleDto> getAllRoles(){
        List<Role> roles = rolesRepository.findAll();
        return roles.stream()
                .map(RoleDto::roleToDto).collect(Collectors.toSet());
    }

}
