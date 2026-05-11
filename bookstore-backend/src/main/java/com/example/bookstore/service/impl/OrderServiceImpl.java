package com.example.bookstore.service.impl;

import com.example.bookstore.dto.CheckoutRequest;
import com.example.bookstore.dto.OrderResponse;
import com.example.bookstore.entity.CartItem;
import com.example.bookstore.entity.Order;
import com.example.bookstore.entity.OrderItem;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.EmptyCartException;
import com.example.bookstore.exception.ForbiddenOperationException;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.CartItemRepository;
import com.example.bookstore.repository.OrderRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.OrderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class OrderServiceImpl implements OrderService {
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String STATUS_DISABLED = "DISABLED";

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
    public List<OrderResponse> getOrders(Long userId, LocalDate startDate, LocalDate endDate, String bookName) {
        ensureUser(userId);
        return orderRepository.searchUserOrders(
                        userId,
                        toStartAt(startDate),
                        toEndBefore(endDate),
                        normalizeKeyword(bookName)
                )
                .stream()
                .map(OrderResponse::from)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAdminOrders(Long adminId, LocalDate startDate, LocalDate endDate, String bookName) {
        ensureAdmin(adminId);
        return orderRepository.searchAllOrders(
                        toStartAt(startDate),
                        toEndBefore(endDate),
                        normalizeKeyword(bookName)
                )
                .stream()
                .map(OrderResponse::from)
                .toList();
    }

    @Override
    @Transactional
    public OrderResponse checkout(CheckoutRequest request) {
        User user = ensureUser(request.userId());
        List<CartItem> cartItems = getCheckoutCartItems(user.getId(), request.cartItemIds());
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
            int currentStock = cartItem.getBook().getStock() == null ? 0 : cartItem.getBook().getStock();
            if (currentStock < number) {
                throw new ForbiddenOperationException("《" + cartItem.getBook().getTitle() + "》库存不足");
            }
            cartItem.getBook().setStock(currentStock - number);
            amount += (long) price * number;

            OrderItem orderItem = new OrderItem();
            orderItem.setBook(cartItem.getBook());
            orderItem.setNumber(number);
            orderItem.setPrice(price);
            order.addItem(orderItem);
        }
        order.setAmount(amount);

        Order savedOrder = orderRepository.save(order);
        cartItemRepository.deleteAll(cartItems);
        return OrderResponse.from(savedOrder);
    }

    private List<CartItem> getCheckoutCartItems(Long userId, List<Long> cartItemIds) {
        if (cartItemIds == null) {
            return cartItemRepository.findAllByUserIdOrderByIdAsc(userId);
        }
        if (cartItemIds.isEmpty()) {
            return List.of();
        }

        Set<Long> uniqueIds = new HashSet<>(cartItemIds);
        List<CartItem> cartItems = cartItemRepository.findAllByUserIdAndIdInOrderByIdAsc(userId, cartItemIds);
        if (cartItems.size() != uniqueIds.size()) {
            Long missingId = uniqueIds.stream()
                    .filter(id -> cartItems.stream().noneMatch(item -> item.getId().equals(id)))
                    .findFirst()
                    .orElse(null);
            throw new ResourceNotFoundException("CartItem", missingId);
        }
        return cartItems;
    }

    private User ensureUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
    }

    private void ensureAdmin(Long adminId) {
        User admin = ensureUser(adminId);
        if (!ROLE_ADMIN.equals(admin.getRole())) {
            throw new ForbiddenOperationException("只有管理员可以执行该操作");
        }
        if (STATUS_DISABLED.equals(admin.getStatus())) {
            throw new ForbiddenOperationException("管理员账号已被禁用");
        }
    }

    private LocalDateTime toStartAt(LocalDate startDate) {
        return startDate == null ? null : startDate.atStartOfDay();
    }

    private LocalDateTime toEndBefore(LocalDate endDate) {
        return endDate == null ? null : endDate.plusDays(1).atStartOfDay();
    }

    private String normalizeKeyword(String keyword) {
        return StringUtils.hasText(keyword) ? keyword.trim() : null;
    }
}
