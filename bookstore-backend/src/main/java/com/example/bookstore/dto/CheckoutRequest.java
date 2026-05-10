package com.example.bookstore.dto;

import jakarta.validation.constraints.NotNull;

public record CheckoutRequest(
        @NotNull(message = "userId is required")
        Long userId
) {
}
