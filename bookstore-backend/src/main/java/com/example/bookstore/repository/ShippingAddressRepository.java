package com.example.bookstore.repository;

import com.example.bookstore.entity.ShippingAddress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShippingAddressRepository extends JpaRepository<ShippingAddress, Long> {
    List<ShippingAddress> findAllByUserIdOrderByDefaultAddressDescIdAsc(Long userId);

    long countByUserId(Long userId);
}
