package com.example.bookstore.service;

public interface PasswordCipherService {
    String getPublicKey();

    String decrypt(String encryptedText);
}
