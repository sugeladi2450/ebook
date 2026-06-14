package com.example.bookstore.service;

import com.example.bookstore.dto.request.AdminBookRequest;
import com.example.bookstore.dto.response.BookResponse;

import java.util.List;

public interface AdminBookService {
    List<BookResponse> getBooks(Long adminId, String keyword);

    BookResponse createBook(Long adminId, AdminBookRequest request);

    BookResponse updateBook(Long adminId, Long bookId, AdminBookRequest request);

    void deleteBook(Long adminId, Long bookId);
}
