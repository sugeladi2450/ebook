package com.example.bookstore.repository;

import com.example.bookstore.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);

    boolean existsByUsernameAndIdNot(String username, Long id);

    boolean existsByEmailAndIdNot(String email, Long id);

    boolean existsByPhoneAndIdNot(String phone, Long id);

    Optional<User> findByUsername(String username);

    Optional<User> findByUsernameOrEmailOrPhone(String username, String email, String phone);
}
