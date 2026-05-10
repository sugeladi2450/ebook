package com.example.bookstore.service;

import com.example.bookstore.dto.ChangePasswordRequest;
import com.example.bookstore.dto.LoginRequest;
import com.example.bookstore.dto.RegisterUserRequest;
import com.example.bookstore.dto.UpdateUserProfileRequest;
import com.example.bookstore.dto.UserResponse;

public interface UserService {
    UserResponse register(RegisterUserRequest request);

    UserResponse login(LoginRequest request);

    UserResponse updateProfile(Long userId, UpdateUserProfileRequest request);

    void changePassword(Long userId, ChangePasswordRequest request);
}
