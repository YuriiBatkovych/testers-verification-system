package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.Address;
import com.luv2code.ecommerce.entity.Customer;
import com.luv2code.ecommerce.entity.Order;
import com.luv2code.ecommerce.entity.OrderItem;
import lombok.Data;


import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Data
public class OrderDto {
    private Long id;
    private String orderTrackingNumber;
    private int totalQuantity;
    private BigDecimal totalPrice;
    private String status;
    private Date dateCreated;
    private Date lastUpdated;

    private Set<OrderItemDto> orderItems;
    private CustomerDto customer;
    private AddressDto shippingAddress;
    private AddressDto billingAddress;

    public static OrderDto orderToDto(Order order){
        OrderDto orderDto = new OrderDto();

        orderDto.setId(order.getId());
        orderDto.setOrderTrackingNumber(order.getOrderTrackingNumber());
        orderDto.setTotalQuantity(order.getTotalQuantity());
        orderDto.setTotalPrice(order.getTotalPrice());
        orderDto.setStatus(order.getStatus());
        orderDto.setDateCreated(order.getDateCreated());
        orderDto.setLastUpdated(order.getLastUpdated());

        Set<OrderItemDto> orderItemDtoSet = order.getOrderItems()
                .stream().map(OrderItemDto::orderItemToDto)
                .collect(Collectors.toSet());

        orderDto.setOrderItems(orderItemDtoSet);

        CustomerDto customerDto = CustomerDto.customerToDto(order.getCustomer());
        orderDto.setCustomer(customerDto);

        AddressDto shippingAddressDto = AddressDto.addressToDto(order.getShippingAddress());
        orderDto.setShippingAddress(shippingAddressDto);

        AddressDto billingAddressDto = AddressDto.addressToDto(order.getBillingAddress());
        orderDto.setBillingAddress(billingAddressDto);

        return orderDto;
    }

    public static Order dtoToOrder(OrderDto orderDto){
        Order order = new Order();

        order.setId(orderDto.getId());
        order.setOrderTrackingNumber(orderDto.getOrderTrackingNumber());
        order.setTotalQuantity(orderDto.getTotalQuantity());
        order.setTotalPrice(orderDto.getTotalPrice());
        order.setStatus(orderDto.getStatus());

        Set<OrderItem> orderItemSet = orderDto.getOrderItems()
                .stream().map(OrderItemDto::dtoToOrderItem)
                .collect(Collectors.toSet());

        order.setOrderItems(orderItemSet);

        Customer customer = CustomerDto.customerFromDto(orderDto.getCustomer());
        order.setCustomer(customer);

        Address shippingAddress = AddressDto.dtoToAddress(orderDto.getShippingAddress());
        order.setShippingAddress(shippingAddress);

        Address billingAddress = AddressDto.dtoToAddress(orderDto.getBillingAddress());
        order.setBillingAddress(billingAddress);

        return order;
    }
}
