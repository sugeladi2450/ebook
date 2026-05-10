package com.example.bookstore.dto;

import com.example.bookstore.entity.CartItem;

public record CartItemResponse(
        Long id,
        Long userId,
        BookResponse book,
        Integer number,
        Long subtotal
) {
    public static CartItemResponse from(CartItem item) {
        int number = item.getNumber() == null ? 1 : item.getNumber();
        int price = item.getBook().getPrice() == null ? 0 : item.getBook().getPrice();
        return new CartItemResponse(
                item.getId(),
                item.getUser().getId(),
                BookResponse.from(item.getBook()),
                number,
                (long) price * number
        );
    }
}
