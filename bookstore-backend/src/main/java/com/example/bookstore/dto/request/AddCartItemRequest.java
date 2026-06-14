package com.example.bookstore.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record AddCartItemRequest(
        @NotNull(message = "userId is required")
        Long userId,

        @NotNull(message = "bookId is required")
        Long bookId,

        @Min(value = 1, message = "number must be at least 1")
        Integer number
) {
}
