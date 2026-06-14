package com.example.bookstore.service;

import com.example.bookstore.dto.request.ShippingAddressRequest;
import com.example.bookstore.dto.response.ShippingAddressResponse;

import java.util.List;

public interface ShippingAddressService {
    List<ShippingAddressResponse> getAddresses(Long userId);

    ShippingAddressResponse createAddress(Long userId, ShippingAddressRequest request);

    ShippingAddressResponse updateAddress(Long userId, Long addressId, ShippingAddressRequest request);

    void deleteAddress(Long userId, Long addressId);
}
