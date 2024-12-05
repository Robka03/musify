package com.musify.projectwork.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.musify.projectwork.dto.LoginRequest;
import com.musify.projectwork.model.UserEntity;
import com.musify.projectwork.security.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // Registration endpoint
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {
        try{
            authService.registerUser(user);
            return ResponseEntity.status(201).body("User registered successfully");
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(400).body(e.getMessage());
        }
        
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        try {
            String token = authService.loginUser(loginRequest.getEmail(), loginRequest.getPassword());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }

    }
}