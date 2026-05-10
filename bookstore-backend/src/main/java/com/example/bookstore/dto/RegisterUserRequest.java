package com.example.bookstore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterUserRequest(
        @NotBlank(message = "username is required")
        @Size(max = 64, message = "username must be no longer than 64 characters")
        String username,

        @NotBlank(message = "password is required")
        @Size(min = 6, max = 128, message = "password length must be between 6 and 128")
        String password,

        @Size(max = 255, message = "nickname must be no longer than 255 characters")
        String nickname,

        Long balance
) {
}
