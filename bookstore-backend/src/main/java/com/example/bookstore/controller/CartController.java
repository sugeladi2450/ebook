package com.example.bookstore.controller;

import com.example.bookstore.dto.request.AddCartItemRequest;
import com.example.bookstore.dto.response.CartItemResponse;
import com.example.bookstore.service.CartService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Validated
@RestController
@RequestMapping("/api/v1/cart")
public class CartController {
    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public ResponseEntity<List<CartItemResponse>> getCartItems(@RequestParam @NotNull Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }

    @PostMapping("/items")
    public ResponseEntity<CartItemResponse> addCartItem(@Valid @RequestBody AddCartItemRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cartService.addCartItem(request));
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long id, @RequestParam @NotNull Long userId) {
        cartService.removeCartItem(userId, id);
        return ResponseEntity.noContent().build();
    }
}
