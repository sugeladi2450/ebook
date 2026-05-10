package com.example.bookstore.service;

import com.example.bookstore.dto.CheckoutRequest;
import com.example.bookstore.dto.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getOrders(Long userId);

    OrderResponse checkout(CheckoutRequest request);
}
