package com.luv2code.ecommerce.service.impl.bugfacades;

import com.luv2code.ecommerce.consts.RolesConsts;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.service.IRolesService;
import com.luv2code.ecommerce.service.impl.RolesService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class RolesServiceFacade implements IRolesService {

    @Value("${bug.role.for.admin}")
    private String roleForAdmin;

    @Value("${bug.role.for.staff}")
    private String roleForStaff;

    @Value("${bug.role.for.user}")
    private String roleForUser;
    private final RolesService rolesService;

    public RolesServiceFacade(RolesService rolesService){
        this.rolesService = rolesService;
    }

    @Override
    public RoleDto getCustomerRole(String email) {
        RoleDto customerRole = rolesService.getCustomerRole(email);

        Optional<RoleDto> buggedCustomerRole;

        if(RolesConsts.ADMIN.equals(customerRole.getName())){
            buggedCustomerRole = getRoleByName(roleForAdmin);
        }
        else if(RolesConsts.STAFF.equals(customerRole.getName())) {
            buggedCustomerRole = getRoleByName(roleForStaff);
        }
        else{
            buggedCustomerRole = getRoleByName(roleForUser);
        }

        return buggedCustomerRole.orElse(customerRole);
    }

    private Optional<RoleDto> getRoleByName(String name){
        return  rolesService.getAllRoles()
                .stream().filter(role -> role.getName().equals(name)).findFirst();
    }

    @Override
    public Set<RoleDto> getAllRoles() {
        return rolesService.getAllRoles();
    }
}
