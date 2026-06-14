package com.example.bookstore.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UpdateUserProfileRequest(
        @NotBlank(message = "账号不能为空")
        @Size(max = 64, message = "账号不能超过 64 个字符")
        String username,

        @NotBlank(message = "昵称不能为空")
        @Size(max = 255, message = "昵称不能超过 255 个字符")
        String nickname,

        @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
        String phone,

        @Email(message = "邮箱格式不正确")
        @Size(max = 255, message = "邮箱不能超过 255 个字符")
        String email
) {
}
