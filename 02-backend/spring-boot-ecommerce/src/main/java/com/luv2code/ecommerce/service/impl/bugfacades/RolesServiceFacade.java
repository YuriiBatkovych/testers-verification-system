package com.luv2code.ecommerce.service.impl.bugfacades;

import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.service.IRolesService;
import com.luv2code.ecommerce.service.impl.RolesService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class RolesServiceFacade implements IRolesService {

    @Value("${bug.truncate.roles.number}")
    private int truncatedRolesNumber;

    private final RolesService rolesService;

    public RolesServiceFacade(RolesService rolesService){
        this.rolesService = rolesService;
    }

    @Override
    public Set<RoleDto> getAllRoles() {
        Set<RoleDto> roles = rolesService.getAllRoles();
        int maxSize = roles.size() - truncatedRolesNumber;
        if(maxSize<0) maxSize = 0;

        return roles.stream().limit(maxSize).collect(Collectors.toSet());
    }
}
