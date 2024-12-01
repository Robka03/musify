package com.musify.projectwork.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SpotifyAuthService {
    @Autowired
    private SpotifyConfig spotifyConfig;

    private static final String SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";

    public String getAccessToken() {
        RestTemplate restTemplate = new RestTemplate();

        // Fejléc beállítása
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Kérés törzsének beállítása
        String body = "grant_type=client_credentials" +
                "&client_id=" + spotifyConfig.getClientId() +
                "&client_secret=" + spotifyConfig.getClientSecret();

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        // API hívás
        ResponseEntity<String> response = restTemplate.exchange(
                SPOTIFY_TOKEN_URL,
                HttpMethod.POST,
                request,
                String.class);

        // Ellenőrzés és válasz visszaadása
        if (response.getStatusCode() == HttpStatus.OK) {
            String json = response.getBody();
            ObjectMapper mapper = new ObjectMapper();
            try {
                JsonNode rootNode = mapper.readTree(json);
                return rootNode.get("access_token").asText();
            } catch (JsonMappingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            } catch (JsonProcessingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            throw new RuntimeException("Hiba történt a JSON feldolgozás során");
        } else {
            throw new RuntimeException("Hiba történt a Spotify API hívás során: " + response.getStatusCode());
        }
    }
}