package com.musify.projectwork.controller;

import com.musify.projectwork.model.AddressEntity;
import com.musify.projectwork.model.UserEntity;
import com.musify.projectwork.repository.AddressRepository;
import com.musify.projectwork.repository.UserRepository;
import com.musify.projectwork.security.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AddressController(JwtUtil jwtUtil, UserRepository userRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Autowired
    private AddressRepository addressRepository;

    // Get all addresses for the authenticated user
    @GetMapping
    public ResponseEntity<?> getUserAddresses(HttpServletRequest request) {
        Long userId = getAuthenticatedUser(request).getId();
        return ResponseEntity.ok(addressRepository.findByUserId(userId));
    }

    // Get a specific address by ID, ensuring it belongs to the authenticated user
    @GetMapping("/{id}")
    public ResponseEntity<?> getAddressById(HttpServletRequest request, @PathVariable Long id) {
        Long userId = getAuthenticatedUser(request).getId();
        Optional<AddressEntity> address = addressRepository.findByIdAndUserId(id, userId);
        if (address.isPresent()) {
            return ResponseEntity.ok(address.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Create a new address for the authenticated user
    @PostMapping
    public ResponseEntity<AddressEntity> createAddress(@RequestBody AddressEntity address, HttpServletRequest request) {
        address.setUseriId(getAuthenticatedUser(request)); // Set the current user as the owner
        AddressEntity savedAddress = addressRepository.save(address);
        return ResponseEntity.ok(savedAddress);
    }

    // Update an address only if it belongs to the authenticated user
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAddress(HttpServletRequest request, @RequestBody AddressEntity addressDetails, @PathVariable Long id) {
        Long userId = getAuthenticatedUser(request).getId();
        Optional<AddressEntity> optionalAddress = addressRepository.findByIdAndUserId(id, userId);
        if (optionalAddress.isPresent()) {
            AddressEntity address = optionalAddress.get();
            address.setZipCode(addressDetails.getZipCode());
            address.setCity(addressDetails.getCity());
            address.setCounty(addressDetails.getCounty());
            address.setAddressLine(addressDetails.getAddressLine());
            AddressEntity updatedAddress = addressRepository.save(address);
            return ResponseEntity.ok(updatedAddress);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an address only if it belongs to the authenticated user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAddress(HttpServletRequest request, @PathVariable Long id) {
        Long userId = getAuthenticatedUser(request).getId();
        Optional<AddressEntity> address = addressRepository.findByIdAndUserId(id, userId);
        if (address.isPresent()) {
            addressRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public UserEntity getAuthenticatedUser(HttpServletRequest request) {
        final String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return null;
        }
        String token = authorizationHeader.substring(7);
        String email = jwtUtil.extractUsername(token); // Extract the username/email from the token

        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return user; // Return the user details
    }
}