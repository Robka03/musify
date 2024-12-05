package com.musify.projectwork.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.musify.projectwork.model.AddressEntity;
import com.musify.projectwork.repository.AddressRepository;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    // Get all addresses
    public List<AddressEntity> getAllAddresses() {
        return addressRepository.findAll();
    }

    // Create a new address
    public AddressEntity createAddress(AddressEntity address) {
        return addressRepository.save(address);
    }

    // Get an address by ID
    public AddressEntity getAddressById(Long id) {
        return addressRepository.findById(id).orElse(null);
    }

    // Delete an address by ID
    public void deleteAddressById(Long id) {
        addressRepository.deleteById(id);
    }
}