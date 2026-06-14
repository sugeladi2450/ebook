package com.example.bookstore.service.impl;

import com.example.bookstore.exception.PasswordChangeException;
import com.example.bookstore.service.PasswordCipherService;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.OAEPParameterSpec;
import javax.crypto.spec.PSource;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.spec.MGF1ParameterSpec;
import java.util.Base64;

@Service
public class RsaPasswordCipherService implements PasswordCipherService {
    private static final String ALGORITHM = "RSA";
    private static final String TRANSFORMATION = "RSA/ECB/OAEPWithSHA-256AndMGF1Padding";
    private static final OAEPParameterSpec OAEP_SHA256_SPEC = new OAEPParameterSpec(
            "SHA-256",
            "MGF1",
            MGF1ParameterSpec.SHA256,
            PSource.PSpecified.DEFAULT
    );

    private final KeyPair keyPair;

    public RsaPasswordCipherService() {
        this.keyPair = generateKeyPair();
    }

    @Override
    public String getPublicKey() {
        return Base64.getEncoder().encodeToString(keyPair.getPublic().getEncoded());
    }

    // 接收用户输入的明文密码，使用 RSA 公钥加密后返回给前端
    @Override
    public String decrypt(String encryptedText) {
        try {
            Cipher cipher = Cipher.getInstance(TRANSFORMATION);
            cipher.init(Cipher.DECRYPT_MODE, keyPair.getPrivate(), OAEP_SHA256_SPEC);
            byte[] encryptedBytes = Base64.getDecoder().decode(encryptedText);
            byte[] plainBytes = cipher.doFinal(encryptedBytes);
            return new String(plainBytes, StandardCharsets.UTF_8);
        } catch (GeneralSecurityException | IllegalArgumentException exception) {
            throw new PasswordChangeException("密码参数错误，请重新输入");
        }
    }

    // 生成 RSA 密钥对的底层方法。被构造器调用，保证整个服务生命周期内密钥对不变。
    private KeyPair generateKeyPair() {
        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance(ALGORITHM);
            generator.initialize(2048);
            return generator.generateKeyPair();
        } catch (GeneralSecurityException exception) {
            throw new IllegalStateException("Unable to initialize password cipher", exception);
        }
    }
}
