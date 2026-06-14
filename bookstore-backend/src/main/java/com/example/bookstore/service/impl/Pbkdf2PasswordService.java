package com.example.bookstore.service.impl;

import com.example.bookstore.service.PasswordService;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.security.GeneralSecurityException;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class Pbkdf2PasswordService implements PasswordService {
    private static final String PREFIX = "pbkdf2";
    private static final String ALGORITHM = "PBKDF2WithHmacSHA256";
    private static final int ITERATIONS = 120_000;
    private static final int SALT_BYTES = 16;
    private static final int HASH_BITS = 256;

    private final SecureRandom secureRandom = new SecureRandom();

    /**
     * 接收用户明文密码，生成随机盐，用 PBKDF2 加密，返回可直接存入数据库的密码字符串
     */
    @Override
    public String encode(String rawPassword) {
        byte[] salt = new byte[SALT_BYTES];
        secureRandom.nextBytes(salt);
        byte[] hash = hash(rawPassword.toCharArray(), salt, ITERATIONS);
        return String.join("$",
                PREFIX,
                String.valueOf(ITERATIONS),
                Base64.getEncoder().encodeToString(salt),
                Base64.getEncoder().encodeToString(hash));
    }

    // 接收用户输入的明文密码和数据库中存储的密码字符串，验证是否匹配
    @Override
    public boolean matches(String rawPassword, String storedPassword) {
        if (storedPassword == null || !storedPassword.startsWith(PREFIX + "$")) {
            return false;
        }

        String[] parts = storedPassword.split("\\$");
        if (parts.length != 4) {
            return false;
        }

        try {
            int iterations = Integer.parseInt(parts[1]);
            byte[] salt = Base64.getDecoder().decode(parts[2]);
            byte[] expectedHash = Base64.getDecoder().decode(parts[3]);
            byte[] actualHash = hash(rawPassword.toCharArray(), salt, iterations);
            return constantTimeEquals(expectedHash, actualHash);
        } catch (IllegalArgumentException exception) {
            return false;
        }
    }

    // 真正执行 PBKDF2 哈希计算的底层方法。被 encode 和 matches 共同调用，保证加密逻辑统一。
    private byte[] hash(char[] password, byte[] salt, int iterations) {
        try {
            PBEKeySpec spec = new PBEKeySpec(password, salt, iterations, HASH_BITS);
            return SecretKeyFactory.getInstance(ALGORITHM).generateSecret(spec).getEncoded();
        } catch (GeneralSecurityException exception) {
            throw new IllegalStateException("Unable to encode password", exception);
        }
    }

    /**
     * 防计时攻击的恒定时间比对方法。即使密码错误，也要保证对比过程耗时相同，避免泄露信息。
     */
    private boolean constantTimeEquals(byte[] expected, byte[] actual) {
        if (expected.length != actual.length) {
            return false;
        }

        int result = 0;
        for (int index = 0; index < expected.length; index++) {
            result |= expected[index] ^ actual[index];
        }
        return result == 0;
    }
}
