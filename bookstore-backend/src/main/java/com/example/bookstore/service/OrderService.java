package com.example.bookstore.service;

import com.example.bookstore.dto.request.CheckoutRequest;
import com.example.bookstore.dto.request.DirectCheckoutRequest;
import com.example.bookstore.dto.response.OrderResponse;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {
    List<OrderResponse> getOrders(Long userId, LocalDate startDate, LocalDate endDate, String bookName);

    List<OrderResponse> getAdminOrders(Long adminId, LocalDate startDate, LocalDate endDate, String bookName);

    OrderResponse checkout(CheckoutRequest request);

    OrderResponse directCheckout(DirectCheckoutRequest request);
}
