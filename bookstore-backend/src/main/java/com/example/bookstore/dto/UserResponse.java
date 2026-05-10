package com.example.bookstore.dto;

import com.example.bookstore.entity.User;

public record UserResponse(
        Long id,
        String username,
        String nickname,
        Long balance
) {
    public static UserResponse from(User user) {
        return new UserResponse(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getBalance()
        );
    }
}
