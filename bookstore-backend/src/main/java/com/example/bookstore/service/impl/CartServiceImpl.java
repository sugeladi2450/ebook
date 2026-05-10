package com.example.bookstore.service.impl;

import com.example.bookstore.dto.AddCartItemRequest;
import com.example.bookstore.dto.CartItemResponse;
import com.example.bookstore.entity.Book;
import com.example.bookstore.entity.CartItem;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.BookRepository;
import com.example.bookstore.repository.CartItemRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.CartService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public CartServiceImpl(CartItemRepository cartItemRepository,
                           UserRepository userRepository,
                           BookRepository bookRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<CartItemResponse> getCartItems(Long userId) {
        ensureUser(userId);
        return cartItemRepository.findAllByUserIdOrderByIdAsc(userId)
                .stream()
                .map(CartItemResponse::from)
                .toList();
    }

    @Override
    @Transactional
    public CartItemResponse addCartItem(AddCartItemRequest request) {
        User user = ensureUser(request.userId());
        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new ResourceNotFoundException("Book", request.bookId()));
        int number = request.number() == null ? 1 : request.number();

        CartItem item = cartItemRepository.findByUserIdAndBookId(user.getId(), book.getId())
                .orElseGet(() -> {
                    CartItem newItem = new CartItem();
                    newItem.setUser(user);
                    newItem.setBook(book);
                    newItem.setNumber(0);
                    return newItem;
                });
        item.setNumber(item.getNumber() + number);
        return CartItemResponse.from(cartItemRepository.save(item));
    }

    @Override
    @Transactional
    public void removeCartItem(Long userId, Long cartItemId) {
        ensureUser(userId);
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new ResourceNotFoundException("CartItem", cartItemId));
        if (!item.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("CartItem", cartItemId);
        }
        cartItemRepository.delete(item);
    }

    private User ensureUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
    }
}
