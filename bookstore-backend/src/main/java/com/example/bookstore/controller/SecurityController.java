package com.example.bookstore.controller;

import com.example.bookstore.dto.PasswordPublicKeyResponse;
import com.example.bookstore.service.PasswordCipherService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/security")
public class SecurityController {
    private final PasswordCipherService passwordCipherService;

    public SecurityController(PasswordCipherService passwordCipherService) {
        this.passwordCipherService = passwordCipherService;
    }

    @GetMapping("/password-public-key")
    public PasswordPublicKeyResponse getPasswordPublicKey() {
        return new PasswordPublicKeyResponse(passwordCipherService.getPublicKey());
    }
}
