package com.example.bookstore.exception;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException() {
        super("账号或密码错误");
    }
}
