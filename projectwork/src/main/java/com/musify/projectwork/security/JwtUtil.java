package com.musify.projectwork.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.github.cdimascio.dotenv.Dotenv;
import java.util.Date;

@Component
public class JwtUtil {
    Dotenv dotenv = Dotenv.configure()
            .directory("./")
            .load();

    private final String SECRET_KEY = dotenv.get("SECRET_KEY");; // Use a strong, environment-protected key

    // Generate a JWT token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username) // Set username as the subject
                .setIssuedAt(new Date()) // Issued time
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Expire in 10 hours
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Sign with the secret key
                .compact();
    }

    // Validate and extract claims
    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

    // Extract username
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // Check if token is expired
    public boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // Validate token
    public boolean validateToken(String token, UserDetails userDetails) {
        String extractedUsername = extractUsername(token); // Extract username from token
        return (extractedUsername.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}