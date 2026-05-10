package com.example.bookstore.service.impl;

import com.example.bookstore.dto.ShippingAddressRequest;
import com.example.bookstore.dto.ShippingAddressResponse;
import com.example.bookstore.entity.ShippingAddress;
import com.example.bookstore.entity.User;
import com.example.bookstore.exception.ResourceNotFoundException;
import com.example.bookstore.repository.ShippingAddressRepository;
import com.example.bookstore.repository.UserRepository;
import com.example.bookstore.service.ShippingAddressService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShippingAddressServiceImpl implements ShippingAddressService {
    private final ShippingAddressRepository addressRepository;
    private final UserRepository userRepository;

    public ShippingAddressServiceImpl(ShippingAddressRepository addressRepository,
                                      UserRepository userRepository) {
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ShippingAddressResponse> getAddresses(Long userId) {
        ensureUser(userId);
        return addressRepository.findAllByUserIdOrderByDefaultAddressDescIdAsc(userId)
                .stream()
                .map(ShippingAddressResponse::from)
                .toList();
    }

    @Override
    @Transactional
    public ShippingAddressResponse createAddress(Long userId, ShippingAddressRequest request) {
        User user = ensureUser(userId);
        boolean shouldBeDefault = Boolean.TRUE.equals(request.defaultAddress())
                || addressRepository.countByUserId(userId) == 0;

        if (shouldBeDefault) {
            clearDefaultAddress(userId);
        }

        ShippingAddress address = new ShippingAddress();
        address.setUser(user);
        applyRequest(address, request);
        address.setDefaultAddress(shouldBeDefault);
        return ShippingAddressResponse.from(addressRepository.save(address));
    }

    @Override
    @Transactional
    public ShippingAddressResponse updateAddress(Long userId, Long addressId, ShippingAddressRequest request) {
        ensureUser(userId);
        ShippingAddress address = ensureAddress(userId, addressId);
        boolean shouldBeDefault = Boolean.TRUE.equals(request.defaultAddress());
        boolean remainsDefault = Boolean.TRUE.equals(address.getDefaultAddress()) && !shouldBeDefault;

        if (shouldBeDefault) {
            clearDefaultAddress(userId);
        }

        applyRequest(address, request);
        address.setDefaultAddress(shouldBeDefault || remainsDefault);
        return ShippingAddressResponse.from(addressRepository.save(address));
    }

    @Override
    @Transactional
    public void deleteAddress(Long userId, Long addressId) {
        ensureUser(userId);
        ShippingAddress address = ensureAddress(userId, addressId);
        boolean deletedDefault = Boolean.TRUE.equals(address.getDefaultAddress());
        addressRepository.delete(address);
        addressRepository.flush();

        if (deletedDefault) {
            addressRepository.findAllByUserIdOrderByDefaultAddressDescIdAsc(userId)
                    .stream()
                    .findFirst()
                    .ifPresent(nextDefault -> {
                        nextDefault.setDefaultAddress(true);
                        addressRepository.save(nextDefault);
                    });
        }
    }

    private void applyRequest(ShippingAddress address, ShippingAddressRequest request) {
        address.setReceiver(request.receiver().trim());
        address.setPhone(request.phone().trim());
        address.setProvince(request.province().trim());
        address.setCity(request.city().trim());
        address.setDistrict(request.district().trim());
        address.setDetail(request.detail().trim());
    }

    private void clearDefaultAddress(Long userId) {
        List<ShippingAddress> addresses = addressRepository.findAllByUserIdOrderByDefaultAddressDescIdAsc(userId);
        for (ShippingAddress address : addresses) {
            address.setDefaultAddress(false);
        }
        addressRepository.saveAll(addresses);
    }

    private User ensureUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", userId));
    }

    private ShippingAddress ensureAddress(Long userId, Long addressId) {
        return addressRepository.findById(addressId)
                .filter(address -> address.getUser().getId().equals(userId))
                .orElseThrow(() -> new ResourceNotFoundException("ShippingAddress", addressId));
    }
}
