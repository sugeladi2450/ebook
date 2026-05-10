package com.example.bookstore.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import jakarta.validation.ConstraintViolationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidation(MethodArgumentNotValidException exception) {
        Map<String, String> fields = new LinkedHashMap<>();
        for (FieldError error : exception.getBindingResult().getFieldErrors()) {
            fields.put(error.getField(), error.getDefaultMessage());
        }
        return ResponseEntity.badRequest().body(errorBody("参数错误", fields));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, Object>> handleConstraintViolation(ConstraintViolationException exception) {
        return ResponseEntity.badRequest().body(errorBody(exception.getMessage(), null));
    }

    @ExceptionHandler(DuplicateUsernameException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateUsername(DuplicateUsernameException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorBody(exception.getMessage(), null));
    }

    @ExceptionHandler(DuplicateContactException.class)
    public ResponseEntity<Map<String, Object>> handleDuplicateContact(DuplicateContactException exception) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorBody(exception.getMessage(), null));
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, Object>> handleInvalidCredentials(InvalidCredentialsException exception) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorBody(exception.getMessage(), null));
    }

    @ExceptionHandler(EmptyCartException.class)
    public ResponseEntity<Map<String, Object>> handleEmptyCart(EmptyCartException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody(exception.getMessage(), null));
    }

    @ExceptionHandler(PasswordChangeException.class)
    public ResponseEntity<Map<String, Object>> handlePasswordChange(PasswordChangeException exception) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorBody(exception.getMessage(), null));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleResourceNotFound(ResourceNotFoundException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorBody(exception.getMessage(), null));
    }

    private Map<String, Object> errorBody(String message, Object details) {
        Map<String, Object> body = new LinkedHashMap<>();
        body.put("message", message);
        if (details != null) {
            body.put("details", details);
        }
        return body;
    }
}
