package com.luv2code.ecommerce.controller;

import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.service.ICheckoutService;
import com.luv2code.ecommerce.service.impl.bugfacades.CheckoutServiceFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/checkout")
public class CheckoutController {
    private final ICheckoutService checkoutService;
    @Autowired
    public CheckoutController(CheckoutServiceFacade checkoutService){
        this.checkoutService = checkoutService;
    }

    @PostMapping("/purchase")
    public PurchaseResponse placeOrder(@RequestBody Purchase purchase){
        PurchaseResponse purchaseResponse = checkoutService.placeOrder(purchase);
        return  purchaseResponse;
    }

}
