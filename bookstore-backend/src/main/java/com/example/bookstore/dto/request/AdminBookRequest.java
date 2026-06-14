package com.example.bookstore.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminBookRequest(
        @NotBlank(message = "书名不能为空")
        @Size(max = 255, message = "书名不能超过 255 个字符")
        String title,

        @NotBlank(message = "作者不能为空")
        @Size(max = 255, message = "作者不能超过 255 个字符")
        String author,

        @Size(max = 512, message = "封面地址不能超过 512 个字符")
        String cover,

        @Size(max = 64, message = "ISBN 不能超过 64 个字符")
        String isbn,

        @Min(value = 0, message = "库存量不能小于 0")
        Integer stock,

        @Min(value = 0, message = "价格不能小于 0")
        Integer price,

        @Size(max = 64, message = "分类不能超过 64 个字符")
        String tag
) {
}
