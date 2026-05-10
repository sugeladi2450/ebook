package com.example.bookstore.service;

import com.example.bookstore.dto.AddCartItemRequest;
import com.example.bookstore.dto.CartItemResponse;

import java.util.List;

public interface CartService {
    List<CartItemResponse> getCartItems(Long userId);

    CartItemResponse addCartItem(AddCartItemRequest request);

    void removeCartItem(Long userId, Long cartItemId);
}
