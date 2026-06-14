package com.example.bookstore.service.impl;

import com.example.bookstore.dto.request.ChangePasswordRequest;
import com.example.bookstore.dto.request.LoginRequest;
import com.example.bookstore.dto.request.RegisterUserRequest;
import com.example.bookstore.dto.request.UpdateUserProfileRequest;
import com.example.bookstore.dto.response.UserResponse;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.AccountDisabledException;
import com.example.bookstore.exception.DuplicateContactException;
import com.example.bookstore.exception.DuplicateUsernameException;
import com.example.bookstore.exception.InvalidCredentialsException;
import com.example.bookstore.exception.PasswordChangeException;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.PasswordCipherService;
import com.example.bookstore.service.PasswordService;
import com.example.bookstore.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordService passwordService;
    private final PasswordCipherService passwordCipherService;

    public UserServiceImpl(
            UserRepository userRepository,
            PasswordService passwordService,
            PasswordCipherService passwordCipherService
    ) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
        this.passwordCipherService = passwordCipherService;
    }

    @Override
    @Transactional
    public UserResponse register(RegisterUserRequest request) {
        String username = request.username().trim();
        if (userRepository.existsByUsername(username)) {
            throw new DuplicateUsernameException(username);
        }
        if (!request.password().equals(request.confirmPassword())) {
            throw new PasswordChangeException("两次输入的密码不一致");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordService.encode(request.password()));
        user.setEmail(request.email().trim());
        user.setNickname(StringUtils.hasText(request.nickname()) ? request.nickname().trim() : username);
        user.setBalance(request.balance() == null ? 0L : request.balance());
        user.setRole("CUSTOMER");
        user.setStatus("ACTIVE");

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public UserResponse login(LoginRequest request) {
        String account = request.username().trim();
        User user = userRepository.findByUsernameOrEmailOrPhone(account, account, account)
                .orElseThrow(InvalidCredentialsException::new);
        if ("DISABLED".equals(user.getStatus())) {
            throw new AccountDisabledException();
        }
        if (!passwordService.matches(request.password(), user.getPassword())) {
            throw new InvalidCredentialsException();
        }
        return UserResponse.from(user);
    }

    @Override
    @Transactional
    public UserResponse updateProfile(Long userId, UpdateUserProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        String username = request.username().trim();
        if (userRepository.existsByUsernameAndIdNot(username, userId)) {
            throw new DuplicateUsernameException(username);
        }

        String phone = normalizeBlank(request.phone());
        String email = normalizeBlank(request.email());
        if (StringUtils.hasText(phone) && userRepository.existsByPhoneAndIdNot(phone, userId)) {
            throw new DuplicateContactException("手机号已被其他用户绑定");
        }
        if (StringUtils.hasText(email) && userRepository.existsByEmailAndIdNot(email, userId)) {
            throw new DuplicateContactException("邮箱已被其他用户绑定");
        }

        user.setUsername(username);
        user.setNickname(request.nickname().trim());
        user.setPhone(phone);
        user.setEmail(email);
        return UserResponse.from(userRepository.save(user));
    }

    @Override
    @Transactional
    public void changePassword(Long userId, ChangePasswordRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));

        String currentPassword = passwordCipherService.decrypt(request.encryptedCurrentPassword());
        String newPassword = passwordCipherService.decrypt(request.encryptedNewPassword());
        String confirmPassword = passwordCipherService.decrypt(request.encryptedConfirmPassword());

        if (!passwordService.matches(currentPassword, user.getPassword())) {
            throw new PasswordChangeException("原密码错误");
        }
        if (!newPassword.equals(confirmPassword)) {
            throw new PasswordChangeException("两次输入的新密码不一致");
        }
        if (newPassword.length() < 6 || newPassword.length() > 128) {
            throw new PasswordChangeException("新密码长度必须在 6 到 128 个字符之间");
        }
        if (newPassword.equals(currentPassword)) {
            throw new PasswordChangeException("新密码不能与原密码相同");
        }

        user.setPassword(passwordService.encode(newPassword));
        userRepository.save(user);
    }

    private String normalizeBlank(String value) {
        return StringUtils.hasText(value) ? value.trim() : null;
    }
}
