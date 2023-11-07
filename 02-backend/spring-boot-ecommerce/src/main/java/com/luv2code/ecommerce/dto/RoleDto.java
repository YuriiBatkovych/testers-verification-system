package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.Role;
import lombok.Data;

import java.util.Set;
import java.util.stream.Collectors;

@Data
public class RoleDto {
    private Long id;
    private String name;

    public RoleDto(){}

    public RoleDto(Long id, String name){
        this.id = id;
        this.name = name;
    }

    public static Role roleDtoToRole(RoleDto roleDtos){
        return new Role(roleDtos.getId(), roleDtos.getName());
    }

    public static RoleDto roleToDto(Role role){
        return new RoleDto(role.getId(), role.getName());
    }
}
