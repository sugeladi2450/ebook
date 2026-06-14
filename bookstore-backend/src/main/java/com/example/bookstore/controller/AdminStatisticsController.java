package com.example.bookstore.controller;

import com.example.bookstore.dto.response.BookSalesStatResponse;
import com.example.bookstore.dto.response.UserConsumptionStatResponse;
import com.example.bookstore.service.StatisticsService;
import jakarta.validation.constraints.NotNull;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/admin/statistics")
public class AdminStatisticsController {
    private final StatisticsService statisticsService;

    public AdminStatisticsController(StatisticsService statisticsService) {
        this.statisticsService = statisticsService;
    }

    @GetMapping("/books")
    public ResponseEntity<List<BookSalesStatResponse>> getBookSalesRanking(
            @RequestParam @NotNull Long adminId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return ResponseEntity.ok(statisticsService.getBookSalesRanking(adminId, startDate, endDate));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserConsumptionStatResponse>> getUserConsumptionRanking(
            @RequestParam @NotNull Long adminId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate
    ) {
        return ResponseEntity.ok(statisticsService.getUserConsumptionRanking(adminId, startDate, endDate));
    }
}

