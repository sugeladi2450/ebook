package com.example.bookstore.repository;

import com.example.bookstore.entity.Order;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByUserIdOrderByCreatedAtDesc(Long userId);

    @EntityGraph(attributePaths = {"user", "items", "items.book"})
    @Query("""
            select o from Order o
            where o.user.id = :userId
              and (:startAt is null or o.createdAt >= :startAt)
              and (:endBefore is null or o.createdAt < :endBefore)
              and (:bookName is null or exists (
                  select i.id from OrderItem i
                  where i.order = o and lower(i.book.title) like lower(concat('%', :bookName, '%'))
              ))
            order by o.createdAt desc
            """)
    List<Order> searchUserOrders(@Param("userId") Long userId,
                                 @Param("startAt") LocalDateTime startAt,
                                 @Param("endBefore") LocalDateTime endBefore,
                                 @Param("bookName") String bookName);

    @EntityGraph(attributePaths = {"user", "items", "items.book"})
    @Query("""
            select o from Order o
            where (:startAt is null or o.createdAt >= :startAt)
              and (:endBefore is null or o.createdAt < :endBefore)
              and (:bookName is null or exists (
                  select i.id from OrderItem i
                  where i.order = o and lower(i.book.title) like lower(concat('%', :bookName, '%'))
              ))
            order by o.createdAt desc
            """)
    List<Order> searchAllOrders(@Param("startAt") LocalDateTime startAt,
                                @Param("endBefore") LocalDateTime endBefore,
                                @Param("bookName") String bookName);
}
