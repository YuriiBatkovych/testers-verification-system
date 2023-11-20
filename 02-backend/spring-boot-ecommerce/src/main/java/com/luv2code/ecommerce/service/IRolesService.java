package com.luv2code.ecommerce.service;

import com.luv2code.ecommerce.dto.RoleDto;

import java.util.Set;

public interface IRolesService {
    RoleDto getCustomerRole(String email);
    Set<RoleDto> getAllRoles();
}
