package com.musify.projectwork.service;

import java.util.List;
import com.musify.projectwork.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.musify.projectwork.model.UserEntity;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Read all users
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    // Create a new user
    public UserEntity createUser(UserEntity user) {
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Get a user by ID
    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Delete a user by ID
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}