package com.musify.projectwork.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.musify.projectwork.service.SpotifyAuthService;
import com.musify.projectwork.service.SpotifyImageDetailsService;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/spotify")

public class SpotifyController {

    @Autowired
    private SpotifyAuthService spotifyAuthService;


    @GetMapping("/track/{id}")
    public ResponseEntity<String> getAccessToken(
            @PathVariable("id") String trackId) {
        try {
            String tokenResponse = spotifyAuthService.getAccessToken();
            String output = SpotifyImageDetailsService.getTrackDetails(trackId, tokenResponse);
            return ResponseEntity.ok(output);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Hiba történt: " + e.getMessage());
        }
    }
}
