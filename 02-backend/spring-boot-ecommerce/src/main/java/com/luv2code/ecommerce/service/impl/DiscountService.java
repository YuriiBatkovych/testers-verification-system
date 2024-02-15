package com.luv2code.ecommerce.service.impl;

import com.luv2code.ecommerce.dao.CustomerRepository;
import com.luv2code.ecommerce.dto.DiscountDto;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.logging.BugLogger;
import com.luv2code.ecommerce.service.IDiscountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class DiscountService implements IDiscountService {

    @Value("${bug.50.discount.orders.number}")
    private int ORDERS_FOR_50_DISCOUNT;

    @Value("${bug.30.discount.orders.number}")
    private int ORDERS_FOR_30_DISCOUNT;

    @Value("${bug.initial.discount.orders.number}")
    private int ORDERS_FOR_INITIAL_DISCOUNT;

    @Value("${default.50.discount.orders.number}")
    private int DEFAULT_ORDERS_FOR_50_DISCOUNT;

    @Value("${default.30.discount.orders.number}")
    private int DEFAULT_ORDERS_FOR_30_DISCOUNT;

    @Value("${default.initial.discount.orders.number}")
    private int DEFAULT_ORDERS_FOR_INITIAL_DISCOUNT;
    private final CustomerRepository customerRepository;
    private final BugLogger bugLogger = new BugLogger();

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
            bugLogger.info("OrdersForInitialDiscount");
            return 10;
        }
        else if(numberOfNextOrder % ORDERS_FOR_50_DISCOUNT == 0){
            bugLogger.info("OrdersFor50Discount");
            return 50;
        }
        else if(numberOfNextOrder % ORDERS_FOR_30_DISCOUNT == 0){
            bugLogger.info("OrdersFor30Discount");
            return 30;
        }
        else{
            logZeroDiscount(numberOfOrders);
            return 0;
        }
    }

    private void logZeroDiscount(int numberOfOrders){
        int numberOfNextOrder = numberOfOrders+1;

        if(numberOfOrders == DEFAULT_ORDERS_FOR_INITIAL_DISCOUNT)
            bugLogger.info("OrdersForInitialDiscount");
        else if(numberOfNextOrder == DEFAULT_ORDERS_FOR_30_DISCOUNT)
            bugLogger.info("OrdersFor30Discount");
        else if(numberOfNextOrder == DEFAULT_ORDERS_FOR_50_DISCOUNT)
            bugLogger.info("OrdersFor50Discount");
    }
}
