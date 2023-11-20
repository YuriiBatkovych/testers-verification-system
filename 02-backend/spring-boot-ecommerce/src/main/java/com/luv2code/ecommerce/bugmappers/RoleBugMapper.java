package com.luv2code.ecommerce.bugmappers;

import com.luv2code.ecommerce.consts.RolesConsts;
import com.luv2code.ecommerce.dto.RoleDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.Set;

@Component
public class RoleBugMapper {
    @Value("${bug.role.for.admin}")
    private String roleForAdmin;

    @Value("${bug.role.for.staff}")
    private String roleForStaff;

    @Value("${bug.role.for.user}")
    private String roleForUser;

    public RoleDto getBugCustomerRole(RoleDto customerRole, Set<RoleDto> roles) {
        Optional<RoleDto> buggedCustomerRole;

        if(RolesConsts.ADMIN.equals(customerRole.getName())){
            buggedCustomerRole = getRoleByName(roleForAdmin, roles);
        }
        else if(RolesConsts.STAFF.equals(customerRole.getName())) {
            buggedCustomerRole = getRoleByName(roleForStaff, roles);
        }
        else{
            buggedCustomerRole = getRoleByName(roleForUser, roles);
        }

        return buggedCustomerRole.orElse(customerRole);
    }


    private Optional<RoleDto> getRoleByName(String name, Set<RoleDto> roles){
        return  roles
                .stream().filter(role -> role.getName().equals(name)).findFirst();
    }
}
