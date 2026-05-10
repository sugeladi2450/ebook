package com.example.bookstore.controller;

import com.example.bookstore.dto.AppDataResponse;
import com.example.bookstore.service.AppDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class AppDataController {
    private final AppDataService appDataService;

    public AppDataController(AppDataService appDataService) {
        this.appDataService = appDataService;
    }

    @GetMapping("/app-data")
    public ResponseEntity<AppDataResponse> getAppData() {
        return ResponseEntity.ok(appDataService.getAppData());
    }
}
