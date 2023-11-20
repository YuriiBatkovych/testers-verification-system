package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import com.luv2code.ecommerce.service.ICustomerService;
import com.luv2code.ecommerce.service.IRolesService;
import com.luv2code.ecommerce.service.impl.bugfacades.CustomerServiceFacade;
import com.luv2code.ecommerce.service.impl.bugfacades.RolesServiceFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("api/customer")
@CrossOrigin("http://localhost:4200")
public class CustomerController {

    private final ICustomerService customerService;
    private final IRolesService rolesService;

    @Autowired
    public CustomerController(CustomerServiceFacade customerService, RolesServiceFacade rolesService){
        this.customerService = customerService;
        this.rolesService = rolesService;
    }

    @GetMapping
    public CustomerDto getCustomerByEmail(@Param("email") String email){
        CustomerDto customerResponse = customerService.getCustomerByEmail(email);
        return  customerResponse;
    }

    @GetMapping("/search")
    public CustomerDto getCustomerById(@Param("id") Long id){
        CustomerDto customerResponse = customerService.getCustomerById(id);
        return  customerResponse;
    }

    @GetMapping("/all")
    public List<CustomerDto> getCustomers(){
        return customerService.getCustomers();
    }

    @GetMapping("/allroles")
    public Set<RoleDto> getRoles(){
        Set<RoleDto> roles = rolesService.getAllRoles();
        return  roles;
    }

    @PostMapping("/add")
    public ResponseEntity<Customer> addNewUser(@RequestBody CustomerDto customerDto) throws AuthorisationException {
        Customer customer = customerService.addNewUser(customerDto);
        return  ResponseEntity.status(HttpStatus.OK).body(customer);
    }

    @PostMapping("/register")
    public ResponseEntity<CustomerDto> registerUser(@RequestBody CustomerDto customerDto){
        CustomerDto customer = customerService.registerUser(customerDto);
        return ResponseEntity.status(HttpStatus.OK).body(customer);
    }

    @PutMapping("/update")
    public ResponseEntity<Customer> updateUser(@RequestBody CustomerDto customerDto) throws AuthorisationException {
        Customer customer = customerService.updateUser(customerDto);
        return  ResponseEntity.status(HttpStatus.OK).body(customer);
    }

    @DeleteMapping("/byEmail")
    public ResponseEntity<String> deleteUser(@Param("email") String email){
        try{
            customerService.deleteByEmail(email);
            return ResponseEntity.status(HttpStatus.OK).body("deleted");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(@Param("id") Long id){
        try{
            customerService.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body("deleted");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
