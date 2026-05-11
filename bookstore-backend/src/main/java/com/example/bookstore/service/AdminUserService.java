package com.example.bookstore.service;

import com.example.bookstore.dto.AdminUserPageResponse;
import com.example.bookstore.dto.AdminUserResponse;

public interface AdminUserService {
    AdminUserPageResponse getUsers(Long adminId, int page, int size);

    AdminUserResponse disableUser(Long adminId, Long userId);

    AdminUserResponse enableUser(Long adminId, Long userId);
}
