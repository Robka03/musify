package com.musify.projectwork.service;

import java.util.List;
import com.musify.projectwork.OrderEntity;
import com.musify.projectwork.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.musify.projectwork.model.UserEntity;
import com.musify.projectwork.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Read all users
    public List<OrderEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Create a new user
    public OrderEntity createUser(OrderEntity user) {
        return userRepository.save(user);
    }

    // Get a user by ID
    public OrderEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Delete a user by ID
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}