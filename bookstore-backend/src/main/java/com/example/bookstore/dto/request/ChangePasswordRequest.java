package com.example.bookstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ChangePasswordRequest(
        @NotBlank(message = "原密码不能为空")
        @Size(max = 512, message = "原密码参数错误")
        String encryptedCurrentPassword,

        @NotBlank(message = "新密码不能为空")
        @Size(max = 512, message = "新密码参数错误")
        String encryptedNewPassword,

        @NotBlank(message = "确认新密码不能为空")
        @Size(max = 512, message = "确认新密码参数错误")
        String encryptedConfirmPassword
) {
}
