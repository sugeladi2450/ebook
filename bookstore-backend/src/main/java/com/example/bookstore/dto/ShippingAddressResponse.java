package com.example.bookstore.dto;

import com.example.bookstore.entity.ShippingAddress;

public record ShippingAddressResponse(
        Long id,
        Long userId,
        String receiver,
        String name,
        String phone,
        String province,
        String city,
        String district,
        String detail,
        Boolean defaultAddress,
        String tag
) {
    public static ShippingAddressResponse from(ShippingAddress address) {
        boolean isDefault = Boolean.TRUE.equals(address.getDefaultAddress());
        return new ShippingAddressResponse(
                address.getId(),
                address.getUser().getId(),
                address.getReceiver(),
                address.getReceiver(),
                address.getPhone(),
                address.getProvince(),
                address.getCity(),
                address.getDistrict(),
                address.getDetail(),
                isDefault,
                isDefault ? "默认" : null
        );
    }
}
