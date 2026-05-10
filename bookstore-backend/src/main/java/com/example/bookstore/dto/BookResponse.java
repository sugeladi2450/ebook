package com.example.bookstore.dto;

import com.example.bookstore.entity.Book;

public record BookResponse(
        Long id,
        String title,
        String author,
        String description,
        Integer price,
        String cover,
        Integer sales
) {
    public static BookResponse from(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getDescription(),
                book.getPrice(),
                book.getCover(),
                book.getSales()
        );
    }
}
