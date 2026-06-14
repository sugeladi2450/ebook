package com.example.bookstore.controller;

import com.example.bookstore.dto.response.AdminUserPageResponse;
import com.example.bookstore.dto.response.AdminUserResponse;
import com.example.bookstore.service.AdminUserService;
import jakarta.validation.constraints.NotNull;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Validated
@RestController
@RequestMapping("/api/v1/admin/users")
public class AdminUserController {
    private final AdminUserService adminUserService;

    public AdminUserController(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }

    @GetMapping
    public ResponseEntity<AdminUserPageResponse> getUsers(
            @RequestParam @NotNull Long adminId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(adminUserService.getUsers(adminId, page, size));
    }

    @PutMapping("/{userId}/disable")
    public ResponseEntity<AdminUserResponse> disableUser(
            @RequestParam @NotNull Long adminId,
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(adminUserService.disableUser(adminId, userId));
    }

    @PutMapping("/{userId}/enable")
    public ResponseEntity<AdminUserResponse> enableUser(
            @RequestParam @NotNull Long adminId,
            @PathVariable Long userId
    ) {
        return ResponseEntity.ok(adminUserService.enableUser(adminId, userId));
    }
}
