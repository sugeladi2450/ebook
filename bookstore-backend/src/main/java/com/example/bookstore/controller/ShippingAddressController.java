package com.example.bookstore.controller;

import com.example.bookstore.dto.request.ShippingAddressRequest;
import com.example.bookstore.dto.response.ShippingAddressResponse;
import com.example.bookstore.service.ShippingAddressService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/{userId}/addresses")
public class ShippingAddressController {
    private final ShippingAddressService addressService;

    public ShippingAddressController(ShippingAddressService addressService) {
        this.addressService = addressService;
    }

    @GetMapping
    public ResponseEntity<List<ShippingAddressResponse>> getAddresses(@PathVariable Long userId) {
        return ResponseEntity.ok(addressService.getAddresses(userId));
    }

    @PostMapping
    public ResponseEntity<ShippingAddressResponse> createAddress(
            @PathVariable Long userId,
            @Valid @RequestBody ShippingAddressRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(addressService.createAddress(userId, request));
    }

    @PutMapping("/{addressId}")
    public ResponseEntity<ShippingAddressResponse> updateAddress(
            @PathVariable Long userId,
            @PathVariable Long addressId,
            @Valid @RequestBody ShippingAddressRequest request) {
        return ResponseEntity.ok(addressService.updateAddress(userId, addressId, request));
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(@PathVariable Long userId, @PathVariable Long addressId) {
        addressService.deleteAddress(userId, addressId);
        return ResponseEntity.noContent().build();
    }
}
