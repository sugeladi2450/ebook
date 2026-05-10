package com.example.bookstore.service.impl;

import com.example.bookstore.dto.CheckoutRequest;
import com.example.bookstore.dto.OrderResponse;
import com.example.bookstore.entity.CartItem;
import com.example.bookstore.entity.Order;
import com.example.bookstore.entity.OrderItem;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.EmptyCartException;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.CartItemRepository;
import com.example.bookstore.repository.OrderRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;

    public OrderServiceImpl(OrderRepository orderRepository,
                            CartItemRepository cartItemRepository,
                            UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getOrders(Long userId) {
        ensureUser(userId);
        return orderRepository.findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(OrderResponse::from)
                .toList();
    }

    @Override
    @Transactional
    public OrderResponse checkout(CheckoutRequest request) {
        User user = ensureUser(request.userId());
        List<CartItem> cartItems = cartItemRepository.findAllByUserIdOrderByIdAsc(user.getId());
        if (cartItems.isEmpty()) {
            throw new EmptyCartException();
        }

        Order order = new Order();
        order.setUser(user);
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("done");

        long amount = 0L;
        for (CartItem cartItem : cartItems) {
            int number = cartItem.getNumber() == null ? 1 : cartItem.getNumber();
            int price = cartItem.getBook().getPrice() == null ? 0 : cartItem.getBook().getPrice();
            amount += (long) price * number;

            OrderItem orderItem = new OrderItem();
            orderItem.setBook(cartItem.getBook());
            orderItem.setNumber(number);
            orderItem.setPrice(price);
            order.addItem(orderItem);
        }
        order.setAmount(amount);

        Order savedOrder = orderRepository.save(order);
        cartItemRepository.deleteAllByUserId(user.getId());
        return OrderResponse.from(savedOrder);
    }

    private User ensureUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
    }
}
