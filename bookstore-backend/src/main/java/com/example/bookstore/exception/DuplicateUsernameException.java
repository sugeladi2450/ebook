package com.example.bookstore.exception;

public class DuplicateUsernameException extends RuntimeException {
    public DuplicateUsernameException(String username) {
        super("账号已存在：" + username);
    }
}
