package com.example.bookstore.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ShippingAddressRequest(
        @NotBlank(message = "收货人姓名不能为空")
        @Size(max = 64, message = "收货人姓名不能超过 64 个字符")
        String receiver,

        @NotBlank(message = "手机号不能为空")
        @Pattern(regexp = "^1[3-9]\\d{9}$", message = "请输入正确的手机号")
        String phone,

        @NotBlank(message = "省份不能为空")
        String province,

        @NotBlank(message = "城市不能为空")
        String city,

        @NotBlank(message = "区县不能为空")
        String district,

        @NotBlank(message = "详细地址不能为空")
        @Size(max = 255, message = "详细地址不能超过 255 个字符")
        String detail,

        Boolean defaultAddress
) {
}
