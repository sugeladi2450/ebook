package com.example.bookstore.service;

import com.example.bookstore.dto.response.AdminUserPageResponse;
import com.example.bookstore.dto.response.AdminUserResponse;

public interface AdminUserService {
    AdminUserPageResponse getUsers(Long adminId, int page, int size);

    AdminUserResponse disableUser(Long adminId, Long userId);

    AdminUserResponse enableUser(Long adminId, Long userId);
}
