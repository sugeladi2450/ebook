package com.example.bookstore.repository;

import com.example.bookstore.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findAllByUserIdOrderByIdAsc(Long userId);

    List<CartItem> findAllByUserIdAndIdInOrderByIdAsc(Long userId, List<Long> ids);

    Optional<CartItem> findByUserIdAndBookId(Long userId, Long bookId);

    void deleteAllByUserId(Long userId);
}
