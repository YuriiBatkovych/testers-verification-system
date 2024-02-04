package com.luv2code.ecommerce.service.impl.bugfacades;

import com.luv2code.ecommerce.dto.Purchase;
import com.luv2code.ecommerce.dto.PurchaseResponse;
import com.luv2code.ecommerce.logging.BugLogger;
import com.luv2code.ecommerce.service.ICheckoutService;
import com.luv2code.ecommerce.service.impl.CheckoutService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class CheckoutServiceFacade implements ICheckoutService {

    @Value("${bug.save.new.purchase}")
    private boolean saveNewPurchase;

    private final BugLogger bugLogger = new BugLogger();
    private final CheckoutService checkoutService;

    CheckoutServiceFacade(CheckoutService checkoutService){
        this.checkoutService = checkoutService;
    }

    @Override
    public PurchaseResponse placeOrder(Purchase purchase) {
        if(saveNewPurchase){
            return checkoutService.placeOrder(purchase);
        }
        else{
            bugLogger.info("NotSavedNewPurchase");
            return mockPurchase();
        }
    }

    private PurchaseResponse mockPurchase(){
        return new PurchaseResponse(checkoutService.generateOrderTrackingNumber());
    }
}
