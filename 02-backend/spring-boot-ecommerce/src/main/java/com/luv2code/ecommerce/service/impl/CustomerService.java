package com.luv2code.ecommerce.service.impl;

import com.luv2code.ecommerce.authentication.AuthorizationService;
import com.luv2code.ecommerce.consts.RolesConsts;
import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.CustomerDto;
import com.luv2code.ecommerce.dto.RoleDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.exceptions.AuthorisationException;
import com.luv2code.ecommerce.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class CustomerService implements ICustomerService {

    private final CustomerRepository customerRepository;
    private final AuthorizationService authorizationService;

    @Autowired
    public CustomerService(CustomerRepository customerRepository,
                           AuthorizationService authorizationService){
        this.customerRepository = customerRepository;
        this.authorizationService = authorizationService;
    }

    @Override
    public CustomerDto registerUser(CustomerDto customerDto){
        Customer customerFromDB = customerRepository.findByEmail(customerDto.getEmail());

        if(customerFromDB == null){
            customerDto.setRole(RolesConsts.standardRoles);
            Customer customer = CustomerDto.customerFromDto(customerDto);
            return CustomerDto.customerToDto(customerRepository.save(customer));
        }
        else{
            return CustomerDto.customerToDto(customerFromDB);
        }
    }

    public Customer addNewUser(CustomerDto customerDto) throws AuthorisationException {
        authorizationService.authorizeAsAdmin();
        Customer customer = CustomerDto.customerFromDto(customerDto);
        return customerRepository.save(customer);
    }

    public Customer updateUser(CustomerDto customerDto) throws AuthorisationException {
        authorizationService.authorizeAsAdmin();
        Customer customer = customerRepository.getReferenceById(customerDto.getId());

        customer.setFirstName(customerDto.getFirstName());
        customer.setLastName(customerDto.getLastName());
        customer.setEmail(customerDto.getEmail());
        customer.setRole(RoleDto.roleDtoToRole(customerDto.getRole()));

        return customerRepository.save(customer);
    }

    public CustomerDto getCustomerByEmail(String email){
        Customer customer = customerRepository.findByEmail(email);

        if(customer == null) {
            return null;
        }
        return CustomerDto.customerToDto(customer);
    }

    public CustomerDto getCustomerById(Long id){
        Customer customer = customerRepository.getReferenceById(id);
        return CustomerDto.customerToDto(customer);
    }

    public List<CustomerDto> getCustomers(){
        return customerRepository.findAll()
                .stream().map(CustomerDto::customerToDto)
                .toList();
    }

    public void deleteByEmail(String email) throws AuthorisationException {
        authorizationService.authorizeAsAdmin();
        Customer customer = customerRepository.findByEmail(email);
        if(customer != null){
            deleteById(customer.getId());
        }
    }


    public void deleteById(Long id) throws AuthorisationException {
        authorizationService.authorizeAsAdmin();
        customerRepository.deleteById(id);
    }

}
