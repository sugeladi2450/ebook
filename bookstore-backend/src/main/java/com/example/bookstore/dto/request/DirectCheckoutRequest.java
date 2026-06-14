package com.example.bookstore.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record DirectCheckoutRequest(
        @NotNull(message = "userId is required")
        Long userId,

        @NotNull(message = "shippingAddressId is required")
        Long shippingAddressId,

        @NotNull(message = "bookId is required")
        Long bookId,

        @Min(value = 1, message = "number must be greater than 0")
        Integer number
) {
}
