package com.example.bookstore.dto.response;

import java.util.List;

public record UserPurchaseStatsResponse(
        List<BookSalesStatResponse> books,
        Long totalBooks,
        Long totalAmount
) {
}

