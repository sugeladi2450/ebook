package com.example.bookstore.dto.response;

import com.example.bookstore.entity.User;

public record AdminUserResponse(
        Long id,
        String username,
        String nickname,
        String email,
        String phone,
        Long balance,
        String role,
        String status
) {
    public static AdminUserResponse from(User user) {
        return new AdminUserResponse(
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
