package com.example.bookstore.dto.response;

public record UserConsumptionStatResponse(
        Long userId,
        String username,
        String nickname,
        String email,
        Long totalBooks,
        Long totalAmount
) {
}

