package com.luv2code.ecommerce.dto;

import com.luv2code.ecommerce.entity.OrderItem;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class OrderItemDto {
    private Long id;
    private String imageUrl;
    private BigDecimal unitPrice;
    private int quantity;
    private Long productId;

    public static OrderItemDto orderItemToDto(OrderItem orderItem){
        OrderItemDto orderItemDto = new OrderItemDto();

        orderItemDto.setId(orderItem.getId());
        orderItemDto.setImageUrl(orderItem.getImageUrl());
        orderItemDto.setUnitPrice(orderItem.getUnitPrice());
        orderItemDto.setQuantity(orderItem.getQuantity());
        orderItemDto.setProductId(orderItem.getProductId());

        return orderItemDto;
    }

    public static OrderItem dtoToOrderItem(OrderItemDto orderItemDto){
        OrderItem orderItem = new OrderItem();

        orderItem.setId(orderItemDto.getId());
        orderItem.setImageUrl(orderItemDto.getImageUrl());
        orderItem.setUnitPrice(orderItemDto.getUnitPrice());
        orderItem.setQuantity(orderItemDto.getQuantity());
        orderItem.setProductId(orderItemDto.getProductId());

        return orderItem;
    }
}
