package com.example.bookstore.dto.response;

import com.example.bookstore.entity.OrderItem;

public record OrderItemResponse(
        Long id,
        BookResponse book,
        Integer number,
        Integer price,
        Long subtotal
) {
    public static OrderItemResponse from(OrderItem item) {
        int number = item.getNumber() == null ? 1 : item.getNumber();
        int price = item.getPrice() == null ? 0 : item.getPrice();
        return new OrderItemResponse(
                item.getId(),
                BookResponse.from(item.getBook()),
                number,
                price,
                (long) price * number
        );
    }
}
