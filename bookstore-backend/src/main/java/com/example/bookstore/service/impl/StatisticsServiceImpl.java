package com.example.bookstore.service.impl;

import com.example.bookstore.dto.BookSalesStatResponse;
import com.example.bookstore.dto.UserConsumptionStatResponse;
import com.example.bookstore.dto.UserPurchaseStatsResponse;
import com.example.bookstore.entity.Book;
import com.example.bookstore.entity.Order;
import com.example.bookstore.entity.OrderItem;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.ForbiddenOperationException;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.OrderRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.StatisticsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String STATUS_DISABLED = "DISABLED";

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public StatisticsServiceImpl(OrderRepository orderRepository, UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookSalesStatResponse> getBookSalesRanking(Long adminId, LocalDate startDate, LocalDate endDate) {
        ensureAdmin(adminId);
        return buildBookSalesStats(loadAllOrders(startDate, endDate));
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserConsumptionStatResponse> getUserConsumptionRanking(Long adminId, LocalDate startDate, LocalDate endDate) {
        ensureAdmin(adminId);
        Map<Long, UserConsumptionAccumulator> stats = new LinkedHashMap<>();
        for (Order order : loadAllOrders(startDate, endDate)) {
            User user = order.getUser();
            UserConsumptionAccumulator accumulator = stats.computeIfAbsent(
                    user.getId(),
                    id -> new UserConsumptionAccumulator(user)
            );
            for (OrderItem item : order.getItems()) {
                accumulator.add(item);
            }
        }
        return stats.values().stream()
                .map(UserConsumptionAccumulator::toResponse)
                .sorted(Comparator.comparing(UserConsumptionStatResponse::totalAmount).reversed()
                        .thenComparing(UserConsumptionStatResponse::totalBooks, Comparator.reverseOrder())
                        .thenComparing(UserConsumptionStatResponse::userId))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public UserPurchaseStatsResponse getUserPurchaseStats(Long userId, LocalDate startDate, LocalDate endDate) {
        ensureUser(userId);
        List<BookSalesStatResponse> books = buildBookSalesStats(orderRepository.searchUserOrders(
                userId,
                toStartAt(startDate),
                toEndBefore(endDate),
                null
        ));
        long totalBooks = books.stream().mapToLong(BookSalesStatResponse::totalQuantity).sum();
        long totalAmount = books.stream().mapToLong(BookSalesStatResponse::totalAmount).sum();
        return new UserPurchaseStatsResponse(books, totalBooks, totalAmount);
    }

    private List<Order> loadAllOrders(LocalDate startDate, LocalDate endDate) {
        return orderRepository.searchAllOrders(toStartAt(startDate), toEndBefore(endDate), null);
    }

    private List<BookSalesStatResponse> buildBookSalesStats(List<Order> orders) {
        Map<Long, BookSalesAccumulator> stats = new LinkedHashMap<>();
        for (Order order : orders) {
            for (OrderItem item : order.getItems()) {
                Book book = item.getBook();
                BookSalesAccumulator accumulator = stats.computeIfAbsent(
                        book.getId(),
                        id -> new BookSalesAccumulator(book)
                );
                accumulator.add(item);
            }
        }
        return stats.values().stream()
                .map(BookSalesAccumulator::toResponse)
                .sorted(Comparator.comparing(BookSalesStatResponse::totalQuantity).reversed()
                        .thenComparing(BookSalesStatResponse::totalAmount, Comparator.reverseOrder())
                        .thenComparing(BookSalesStatResponse::bookId))
                .toList();
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

    private static long itemQuantity(OrderItem item) {
        return item.getNumber() == null ? 1L : item.getNumber();
    }

    private static long itemAmount(OrderItem item) {
        long number = itemQuantity(item);
        long price = item.getPrice() == null ? 0L : item.getPrice();
        return number * price;
    }

    private static class BookSalesAccumulator {
        private final Book book;
        private long totalQuantity;
        private long totalAmount;

        private BookSalesAccumulator(Book book) {
            this.book = book;
        }

        private void add(OrderItem item) {
            totalQuantity += itemQuantity(item);
            totalAmount += itemAmount(item);
        }

        private BookSalesStatResponse toResponse() {
            return new BookSalesStatResponse(
                    book.getId(),
                    book.getTitle(),
                    book.getIsbn(),
                    book.getCover(),
                    totalQuantity,
                    totalAmount
            );
        }
    }

    private static class UserConsumptionAccumulator {
        private final User user;
        private long totalBooks;
        private long totalAmount;

        private UserConsumptionAccumulator(User user) {
            this.user = user;
        }

        private void add(OrderItem item) {
            totalBooks += itemQuantity(item);
            totalAmount += itemAmount(item);
        }

        private UserConsumptionStatResponse toResponse() {
            return new UserConsumptionStatResponse(
                    user.getId(),
                    user.getUsername(),
                    user.getNickname(),
                    user.getEmail(),
                    totalBooks,
                    totalAmount
            );
        }
    }
}

