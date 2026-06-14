package com.example.bookstore.service;

import com.example.bookstore.dto.response.BookSalesStatResponse;
import com.example.bookstore.dto.response.UserConsumptionStatResponse;
import com.example.bookstore.dto.response.UserPurchaseStatsResponse;

import java.time.LocalDate;
import java.util.List;

public interface StatisticsService {
    List<BookSalesStatResponse> getBookSalesRanking(Long adminId, LocalDate startDate, LocalDate endDate);

    List<UserConsumptionStatResponse> getUserConsumptionRanking(Long adminId, LocalDate startDate, LocalDate endDate);

    UserPurchaseStatsResponse getUserPurchaseStats(Long userId, LocalDate startDate, LocalDate endDate);
}

