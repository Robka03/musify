package com.musify.projectwork.controller;
import com.musify.projectwork.OrderEntity;
import com.musify.projectwork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserService userService;

    // Get all users
    @GetMapping
    public List<OrderEntity> getAllUsers() {
        return userService.getAllUsers();
    }

    // Create a new user
    @PostMapping
    public OrderEntity createUser(@RequestBody OrderEntity user) {
        return userService.createUser(user);
    }

    // Get user by ID
    @GetMapping("/{id}")
    public OrderEntity getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    // Delete user by ID
    @DeleteMapping("/{id}")
    public void deleteUserById(@PathVariable Long id) {
        userService.deleteUserById(id);
    }
}