package com.example.bookstore.service;

public interface PasswordService {
    String encode(String rawPassword);

    boolean matches(String rawPassword, String storedPassword);
}
