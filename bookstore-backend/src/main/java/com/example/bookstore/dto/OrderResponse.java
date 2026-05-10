package com.example.bookstore.dto;

import com.example.bookstore.entity.Order;

import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        Long id,
        Long userId,
        LocalDateTime createdAt,
        Long amount,
        String status,
        String statusText,
        List<OrderItemResponse> items
) {
    public static OrderResponse from(Order order) {
        return new OrderResponse(
                order.getId(),
                order.getUser().getId(),
                order.getCreatedAt(),
                order.getAmount(),
                order.getStatus(),
                "done".equals(order.getStatus()) ? "已完成" : "待支付",
                order.getItems().stream().map(OrderItemResponse::from).toList()
        );
    }
}
