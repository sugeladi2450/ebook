package com.example.bookstore.exception;

public class AccountDisabledException extends RuntimeException {
    public AccountDisabledException() {
        super("您的账号已经被禁用");
    }
}
