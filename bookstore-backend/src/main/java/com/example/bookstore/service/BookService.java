package com.example.bookstore.service;

import com.example.bookstore.dto.response.BookResponse;

import java.util.List;

public interface BookService {
    List<BookResponse> getAllBooks();

    BookResponse getBookById(Long id);
}
