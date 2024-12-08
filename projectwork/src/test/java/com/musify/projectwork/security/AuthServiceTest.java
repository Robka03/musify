package com.musify.projectwork.security;

import com.musify.projectwork.model.UserEntity;
import com.musify.projectwork.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this); // Inicializálja a Mock objektumokat
    }

    @Test
    void registerUser_ShouldSaveUser_WhenEmailIsNotRegistered() {
        // Arrange
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("password123");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(user.getPassword())).thenReturn("hashedPassword");

        // Act
        authService.registerUser(user);

        // Assert
        verify(userRepository, times(1)).save(user);
        assertEquals("hashedPassword", user.getPassword());
    }

    @Test
    void registerUser_ShouldThrowException_WhenEmailIsAlreadyRegistered() {
        // Arrange
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");

        when(userRepository.existsByEmail(user.getEmail())).thenReturn(true);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.registerUser(user);
        });
        assertEquals("Email is already registered", exception.getMessage());
    }

    @Test
    void loginUser_ShouldReturnJwtToken_WhenCredentialsAreValid() {
        // Arrange
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("hashedPassword");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", user.getPassword())).thenReturn(true);
        when(jwtUtil.generateToken(user.getEmail())).thenReturn("jwtToken");

        // Act
        String token = authService.loginUser("test@example.com", "password123");

        // Assert
        assertEquals("jwtToken", token);
    }

    @Test
    void loginUser_ShouldThrowException_WhenEmailIsInvalid() {
        // Arrange
        when(userRepository.findByEmail("invalid@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.loginUser("invalid@example.com", "password123");
        });
        assertEquals("Invalid email or password", exception.getMessage());
    }

    @Test
    void loginUser_ShouldThrowException_WhenPasswordIsInvalid() {
        // Arrange
        UserEntity user = new UserEntity();
        user.setEmail("test@example.com");
        user.setPassword("hashedPassword");

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPassword", user.getPassword())).thenReturn(false);

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            authService.loginUser("test@example.com", "wrongPassword");
        });
        assertEquals("Invalid email or password", exception.getMessage());
    }
}
