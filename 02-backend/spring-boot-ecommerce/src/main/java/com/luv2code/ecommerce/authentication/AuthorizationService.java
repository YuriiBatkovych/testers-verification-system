package com.luv2code.ecommerce.authentication;

import com.luv2code.ecommerce.config.MyAppContext;
import com.luv2code.ecommerce.consts.ContextProperties;
import com.luv2code.ecommerce.consts.RolesConsts;
import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthorizationService {

    private final CustomerRepository customerRepository;

    private final MyAppContext myAppContext;

    @Autowired
    public AuthorizationService(CustomerRepository customerRepository, MyAppContext myAppContext) {
        this.customerRepository = customerRepository;
        this.myAppContext = myAppContext;
    }

    public void authorizeAsStaff() throws AuthorisationException {
        String userEmail = (String) myAppContext.getProperty(ContextProperties.USER_EMAIL);
        String role = getUserRoleName(userEmail);

        if(!RolesConsts.STAFF.equals(role) && !RolesConsts.ADMIN.equals(role)){
            throw new AuthorisationException("User "+userEmail+" is not authorized for STAFF only actions");
        }
    }

    public void authorizeAsAdmin() throws AuthorisationException {
        String userEmail = (String) myAppContext.getProperty(ContextProperties.USER_EMAIL);
        String role = getUserRoleName(userEmail);

        if(!RolesConsts.ADMIN.equals(role)){
            throw new AuthorisationException("User "+userEmail+" is not authorized for ADMIN only actions");
        }
    }

    private String getUserRoleName(String userEmail){
        Customer customer = customerRepository.findByEmail(userEmail);

        if(customer == null){
            return RolesConsts.USER;
        }
        else {
            return customer.getRole().getName();
        }
    }

}
