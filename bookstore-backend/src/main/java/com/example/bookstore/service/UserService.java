package com.example.bookstore.service;

import com.example.bookstore.dto.request.ChangePasswordRequest;
import com.example.bookstore.dto.request.LoginRequest;
import com.example.bookstore.dto.request.RegisterUserRequest;
import com.example.bookstore.dto.request.UpdateUserProfileRequest;
import com.example.bookstore.dto.response.UserResponse;

public interface UserService {
    UserResponse register(RegisterUserRequest request);

    UserResponse login(LoginRequest request);

    UserResponse updateProfile(Long userId, UpdateUserProfileRequest request);

    void changePassword(Long userId, ChangePasswordRequest request);
}
