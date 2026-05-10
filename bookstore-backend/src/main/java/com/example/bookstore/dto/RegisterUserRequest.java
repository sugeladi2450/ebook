package com.example.bookstore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterUserRequest(
        @NotBlank(message = "用户名不能为空")
        @Size(max = 64, message = "用户名不能超过 64 个字符")
        String username,

        @NotBlank(message = "密码不能为空")
        @Size(min = 6, max = 128, message = "密码长度必须在 6 到 128 个字符之间")
        String password,

        @Size(max = 255, message = "昵称不能超过 255 个字符")
        String nickname,

        Long balance
) {
}
