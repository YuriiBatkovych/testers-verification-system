package com.luv2code.ecommerce.service.impl;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.DiscountDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.service.IDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DiscountService implements IDiscountService {

    private final int ORDERS_FOR_50_DISCOUNT = 10;
    private final int ORDERS_FOR_30_DISCOUNT = 5;
    private final int ORDERS_FOR_INITIAL_DISCOUNT = 0;
    private final CustomerRepository customerRepository;

    @Autowired
    public DiscountService(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    public DiscountDto getDiscount(String userEmail) {
        Customer customer = customerRepository.findByEmail(userEmail);

        DiscountDto result = new DiscountDto();
        result.setCustomerId(customer.getId());

        int numberOfOrders = customer.getOrders().size();
        result.setPercentage(getDiscountPercentage(numberOfOrders));

        return result;
    }

    private int getDiscountPercentage(int numberOfOrders){
        int numberOfNextOrder = numberOfOrders+1;

        if(numberOfOrders == ORDERS_FOR_INITIAL_DISCOUNT){
            return 10;
        }
        else if(numberOfNextOrder % ORDERS_FOR_50_DISCOUNT == 0){
            return 50;
        }
        else if(numberOfNextOrder % ORDERS_FOR_30_DISCOUNT == 0){
            return 30;
        }
        else{
            return 0;
        }
    }
}
