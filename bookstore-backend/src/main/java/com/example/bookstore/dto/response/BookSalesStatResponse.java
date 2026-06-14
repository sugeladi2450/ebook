package com.example.bookstore.dto.response;

public record BookSalesStatResponse(
        Long bookId,
        String title,
        String isbn,
        String cover,
        Long totalQuantity,
        Long totalAmount
) {
}

