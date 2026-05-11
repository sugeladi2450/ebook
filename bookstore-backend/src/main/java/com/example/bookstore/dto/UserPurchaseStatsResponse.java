package com.example.bookstore.dto;

import java.util.List;

public record UserPurchaseStatsResponse(
        List<BookSalesStatResponse> books,
        Long totalBooks,
        Long totalAmount
) {
}

