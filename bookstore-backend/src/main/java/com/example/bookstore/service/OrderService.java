package com.example.bookstore.service;

import com.example.bookstore.dto.CheckoutRequest;
import com.example.bookstore.dto.DirectCheckoutRequest;
import com.example.bookstore.dto.OrderResponse;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    List<OrderResponse> getOrders(Long userId, LocalDate startDate, LocalDate endDate, String bookName);

    List<OrderResponse> getAdminOrders(Long adminId, LocalDate startDate, LocalDate endDate, String bookName);

    OrderResponse checkout(CheckoutRequest request);

    OrderResponse directCheckout(DirectCheckoutRequest request);
}
