package com.musify.projectwork.service;

import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SpotifyImageDetailsService {

    private static final String SPOTIFY_TRACK_URL = "https://api.spotify.com/v1/tracks/";

    public static String getTrackDetails(String trackId, String token) {
        RestTemplate restTemplate = new RestTemplate();

        // Construct the Authorization header
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        // Create the HTTP entity with headers
        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        // Construct the full URL
        String url = SPOTIFY_TRACK_URL + trackId;

        try {
            // Make the GET request to the Spotify API
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody(); // Return the track details
            } else {
                throw new RuntimeException("Failed to fetch track details. Status code: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("Error fetching track details: " + e.getMessage(), e);
        }
    }
}