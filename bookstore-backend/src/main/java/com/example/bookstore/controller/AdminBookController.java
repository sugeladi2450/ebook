package com.example.bookstore.controller;

import com.example.bookstore.dto.request.AdminBookRequest;
import com.example.bookstore.dto.response.BookResponse;
import com.example.bookstore.service.AdminBookService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/admin/books")
public class AdminBookController {
    private final AdminBookService adminBookService;

    public AdminBookController(AdminBookService adminBookService) {
        this.adminBookService = adminBookService;
    }

    @GetMapping
    public ResponseEntity<List<BookResponse>> getBooks(
            @RequestParam @NotNull Long adminId,
            @RequestParam(required = false) String keyword
    ) {
        return ResponseEntity.ok(adminBookService.getBooks(adminId, keyword));
    }

    @PostMapping
    public ResponseEntity<BookResponse> createBook(
            @RequestParam @NotNull Long adminId,
            @Valid @RequestBody AdminBookRequest request
    ) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminBookService.createBook(adminId, request));
    }

    @PutMapping("/{bookId}")
    public ResponseEntity<BookResponse> updateBook(
            @RequestParam @NotNull Long adminId,
            @PathVariable Long bookId,
            @Valid @RequestBody AdminBookRequest request
    ) {
        return ResponseEntity.ok(adminBookService.updateBook(adminId, bookId, request));
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> deleteBook(
            @RequestParam @NotNull Long adminId,
            @PathVariable Long bookId
    ) {
        adminBookService.deleteBook(adminId, bookId);
        return ResponseEntity.noContent().build();
    }
}
