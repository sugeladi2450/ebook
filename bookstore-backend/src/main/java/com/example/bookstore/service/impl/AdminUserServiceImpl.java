package com.example.bookstore.service.impl;

import com.example.bookstore.dto.AdminUserPageResponse;
import com.example.bookstore.dto.AdminUserResponse;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.ForbiddenOperationException;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.AdminUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminUserServiceImpl implements AdminUserService {
    private static final String ROLE_ADMIN = "ADMIN";
    private static final String ROLE_CUSTOMER = "CUSTOMER";
    private static final String STATUS_ACTIVE = "ACTIVE";
    private static final String STATUS_DISABLED = "DISABLED";

    private final UserRepository userRepository;

    public AdminUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public AdminUserPageResponse getUsers(Long adminId, int page, int size) {
        ensureAdmin(adminId);
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), 100));
        Page<User> users = userRepository.findAllByOrderByIdAsc(pageable);
        return new AdminUserPageResponse(
                users.getContent().stream().map(AdminUserResponse::from).toList(),
                users.getNumber(),
                users.getSize(),
                users.getTotalElements(),
                users.getTotalPages()
        );
    }

    @Override
    @Transactional
    public AdminUserResponse disableUser(Long adminId, Long userId) {
        ensureAdmin(adminId);
        User user = ensureCustomer(userId);
        user.setStatus(STATUS_DISABLED);
        return AdminUserResponse.from(userRepository.save(user));
    }

    @Override
    @Transactional
    public AdminUserResponse enableUser(Long adminId, Long userId) {
        ensureAdmin(adminId);
        User user = ensureCustomer(userId);
        user.setStatus(STATUS_ACTIVE);
        return AdminUserResponse.from(userRepository.save(user));
    }

    private void ensureAdmin(Long adminId) {
        User admin = userRepository.findById(adminId)
                .orElseThrow(() -> new ResourceNotFoundException("User", adminId));
        if (!ROLE_ADMIN.equals(admin.getRole())) {
            throw new ForbiddenOperationException("只有管理员可以执行该操作");
        }
        if (STATUS_DISABLED.equals(admin.getStatus())) {
            throw new ForbiddenOperationException("管理员账号已被禁用");
        }
    }

    private User ensureCustomer(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
        if (!ROLE_CUSTOMER.equals(user.getRole())) {
            throw new ForbiddenOperationException("只能禁用或解禁普通顾客");
        }
        return user;
    }
}
