package com.example.bookstore.dto;

import com.example.bookstore.entity.Book;

public record BookResponse(
        Long id,
        String title,
        String author,
        String translator,
        String isbn,
        String tag,
        String publishLine,
        String listDesc,
        String intro,
        String intro2,
        String description,
        Integer price,
        String cover,
        Integer sales,
        Integer stock
) {
    public static BookResponse from(Book book) {
        return new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getTranslator(),
                book.getIsbn(),
                book.getTag(),
                book.getPublishLine(),
                book.getListDesc(),
                book.getIntro(),
                book.getIntro2(),
                book.getDescription(),
                book.getPrice(),
                book.getCover(),
                book.getSales(),
                book.getStock()
        );
    }
}
