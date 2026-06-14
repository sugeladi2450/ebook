package com.example.bookstore.dto.response;

import com.example.bookstore.entity.User;

public record UserResponse(
        Long id,
        String username,
        String nickname,
        String email,
        String phone,
        Long balance,
        String role,
        String status
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getEmail(),
                user.getPhone(),
                user.getBalance(),
                user.getRole(),
                user.getStatus()
        );
    }
}
