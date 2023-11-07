package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.service.CustomerService;
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

    private final CustomerService customerService;

    @Autowired
    public CustomerController(CustomerService customerService){
        this.customerService = customerService;
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

    @GetMapping("/roles")
    public RoleDto getCustomerRoleByEmail(@Param("email") String email){
        RoleDto role = customerService.getCustomerRole(email);
        return  role;
    }

    @GetMapping("/allroles")
    public Set<RoleDto> getRoles(){
        Set<RoleDto> roles = customerService.getAllRoles();
        return  roles;
    }

    @PostMapping("/add")
    public ResponseEntity<Customer> addNewUser(@RequestBody CustomerDto customerDto){
        Customer customer = customerService.addNewUser(customerDto);
        return  ResponseEntity.status(HttpStatus.OK).body(customer);
    }

    @PutMapping("/update")
    public ResponseEntity<Customer> updateUser(@RequestBody CustomerDto customerDto){
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
