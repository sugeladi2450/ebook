package com.example.bookstore.service.impl;

import com.example.bookstore.dto.LoginRequest;
import com.example.bookstore.dto.RegisterUserRequest;
import com.example.bookstore.dto.UserResponse;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.DuplicateUsernameException;
import com.example.bookstore.exception.InvalidCredentialsException;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.PasswordService;
import com.example.bookstore.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordService passwordService;

    public UserServiceImpl(UserRepository userRepository, PasswordService passwordService) {
        this.userRepository = userRepository;
        this.passwordService = passwordService;
    }

    @Override
    @Transactional
    public UserResponse register(RegisterUserRequest request) {
        String username = request.username().trim();
        if (userRepository.existsByUsername(username)) {
            throw new DuplicateUsernameException(username);
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordService.encode(request.password()));
        user.setNickname(StringUtils.hasText(request.nickname()) ? request.nickname().trim() : username);
        user.setBalance(request.balance() == null ? 0L : request.balance());

        return UserResponse.from(userRepository.save(user));
    }

    @Override
    public UserResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username().trim())
                .filter(candidate -> passwordService.matches(request.password(), candidate.getPassword()))
                .orElseThrow(InvalidCredentialsException::new);
        return UserResponse.from(user);
    }
}
