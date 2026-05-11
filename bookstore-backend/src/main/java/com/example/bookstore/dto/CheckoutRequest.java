package com.example.bookstore.dto;

import jakarta.validation.constraints.NotNull;

import java.util.List;

public record CheckoutRequest(
        @NotNull(message = "userId is required")
        Long userId,

        @NotNull(message = "shippingAddressId is required")
        Long shippingAddressId,

        List<Long> cartItemIds
) {
}
