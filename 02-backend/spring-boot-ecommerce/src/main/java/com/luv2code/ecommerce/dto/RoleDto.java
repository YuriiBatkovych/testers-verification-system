package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.Role;

public enum RoleDto {
    USER,
    STAFF,
    ADMIN;

    public static RoleDto roleToEnum(Role role){
        return RoleDto.valueOf(role.getName());
    }
}
