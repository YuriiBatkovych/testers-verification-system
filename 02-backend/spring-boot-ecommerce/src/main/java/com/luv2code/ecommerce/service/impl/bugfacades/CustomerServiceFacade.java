package com.luv2code.ecommerce.service.impl.bugfacades;

import com.luv2code.ecommerce.bugmappers.RoleBugMapper;
import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import com.luv2code.ecommerce.service.ICustomerService;
import com.luv2code.ecommerce.service.impl.CustomerService;
import com.luv2code.ecommerce.service.impl.RolesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class CustomerServiceFacade implements ICustomerService {

    @Value("${bug.save.new.user}")
    private boolean saveNewUser;

    @Value("${bug.save.edit.user}")
    private boolean updateUser;

    @Value("${bug.delete.user}")
    private boolean deleteUser;
    private final CustomerService customerService;
    private final RolesService rolesService;
    private final RoleBugMapper roleBugMapper;
    @Autowired
    CustomerServiceFacade(CustomerService customerService, RolesService rolesService,
                          RoleBugMapper roleBugMapper){
        this.customerService = customerService;
        this.rolesService = rolesService;
        this.roleBugMapper = roleBugMapper;
    }

    @Override
    public Customer addNewUser(CustomerDto customerDto) throws AuthorisationException {
        if(saveNewUser){
            return customerService.addNewUser(customerDto);
        }
        else{
            return mockCustomer();
        }
    }

    @Override
    public Customer updateUser(CustomerDto customerDto) throws AuthorisationException {
        if(updateUser){
            return customerService.updateUser(customerDto);
        }
        else{
            return mockCustomer();
        }
    }

    @Override
    public CustomerDto registerUser(CustomerDto customerDto){
        CustomerDto customer = customerService.registerUser(customerDto);

        Set<RoleDto> allRoles = rolesService.getAllRoles();
        customer.setRole(roleBugMapper.getBugCustomerRole(customer.getRole(), allRoles));

        return customer;
    }

    @Override
    public CustomerDto getCustomerByEmail(String email) {
        return customerService.getCustomerByEmail(email);
    }

    @Override
    public CustomerDto getCustomerById(Long id) {
        return customerService.getCustomerById(id);
    }

    @Override
    public List<CustomerDto> getCustomers() {
        return customerService.getCustomers();
    }

    @Override
    public void deleteByEmail(String email) throws AuthorisationException {
        if(deleteUser){
            customerService.deleteByEmail(email);
        }
    }

    @Override
    public void deleteById(Long id) throws AuthorisationException {
        if(deleteUser){
            customerService.deleteById(id);
        }
    }

    private Customer mockCustomer(){
        return new Customer();
    }
}
